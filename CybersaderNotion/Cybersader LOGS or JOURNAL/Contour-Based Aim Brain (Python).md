# Contour-Based Aim Brain (Python)

Okay below are the current "[viz.py](http://viz.py/)" and "[ow.py](http://ow.py/)" files.  Here's the problems I'm having.

1. Things in the center of the screen should be prioritized more than things towards the outside of the screen.
2. Things that have the relative dimensions as a given number like 1/3 (width height ratio) or some user-given amount should also be prioritized more
3. The green contours (the ones that show up around things that are within the maximum allowed target distance) are becoming segmented and so the "centers" of those green contours which I assume are the "cv2.moments", or how the x,y for the mouse move are found, are jumping around really fast. It would be great to have a way an option could be added to smoothen either the contours and combine close ones or a way to smooth out the moments being changed.

Here are some solutions  I may have that should be tried. First off, I want a system that computes a score based on the distance to the center and the dimensions of the detected contour to decide whether it should be outlined in green or not (I assume this happens in [viz.py](http://viz.py/) or maybe also in [ow.py](http://ow.py/). I also want the ability to change how much these prioritization factors are affected. To do this, use a number for each prioritization factor to where they add up to define how prioritized they are. For instance, the "distance_to_center" factor could be 2 and the "contour_width_height" factor could be 1. This means that the distance to center factor matter twice as much. The distance_to_center score should also be able to be controlled by a variable that defines how much the score is affected by the distance (linear, cubic, exponential, etc.)
If possible try to implement a stateful function that tracking moving contours. This could be called "leading_controller".  Essentially, sometimes when tracking a moving object (in this case, a contour) we want to know where it will be.  It would be helpful if we can implement additional functionality or an additional function which can figure out where to put the ultimate "target" the x,y based on the previous states of located targets. Sometimes these object can be moving and we want to target in front of where they are going to be. Implement another global variable in [ow.py](http://ow.py/) called "LEADING_FACTOR" to control this functionality.

# [viz.py](http://viz.py/)

import cv2
from math import pow, sqrt
import numpy as np

def process(frame, outline_values, min_contour_area, max_width_height_ratio, square_size, target_size):
lower_bound = np.array([outline_values["dark"]["H_LOW"], outline_values["dark"]["S_LOW"], outline_values["dark"]["V_LOW"]])
upper_bound = np.array([outline_values["light"]["H_HIGH"], outline_values["light"]["S_HIGH"], outline_values["light"]["V_HIGH"]])

```
hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
color_range = cv2.inRange(hsv, lower_bound, upper_bound)

res = cv2.bitwise_and(frame, frame, mask=color_range)
res = cv2.cvtColor(res, cv2.COLOR_RGB2GRAY)

thresh = cv2.adaptiveThreshold(res, 1, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 15, 1)

contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
contours = [cv2.convexHull(ct, False) for ct in contours]
contours = sorted(contours, key=cv2.contourArea, reverse=True)

if __debug__:
    cv2.drawContours(frame, contours, -1, (255, 255, 0), 1)

return list(filter(lambda ct: contour_filter(ct, min_contour_area, max_width_height_ratio, square_size, target_size), contours))

```

def contour_filter(ct, min_contour_area, max_width_height_ratio, square_size, target_size):
x, y = contour_distance(ct, square_size)

```
if x == -1 or x > target_size or y > target_size:
    return False

contour_area = cv2.contourArea(ct)
x, y, width, height = cv2.boundingRect(ct)
width_height_ratio = abs(width / height) if height > 0 else -1

return (
    contour_area >= min_contour_area
    and width_height_ratio <= max_width_height_ratio
    and width > 0
    and height > 0
)

```

def contour_distance(ct, square_size):
moment = cv2.moments(ct)
if moment["m00"] == 0:
return -1, None

```
cx = int(moment["m10"] / moment["m00"])
cy = int(moment["m01"] / moment["m00"])

mid = square_size / 2
x = abs(mid - cx)
y = abs(mid - cy)
return x, y

```

# [ow.py](http://ow.py/)

import cv2
from math import pow, sqrt
from mss import mss
import numpy as np
from win32 import win32api
import win32con
from lib.viz import process
import threading
import time

# All configurable variables

SQUARE_SIZE = 700
TARGET_SIZE = 100
botness = 100.0

magenta_outline_values = {
"dark": {
"H_LOW": 140,
"S_LOW": 200,
"V_LOW": 129
},
"light": {
"H_HIGH": 179,
"S_HIGH": 255,
"V_HIGH": 255
}
}

red_outline_values = {
"dark": {
"H_LOW": 0,
"S_LOW": 200,
"V_LOW": 129
},
"light": {
"H_HIGH": 5,
"S_HIGH": 255,
"V_HIGH": 255
}
}

MIN_CONTOUR_AREA = 1500
MAX_WIDTH_HEIGHT_RATIO = 3.0
BEZIER_CONTROL_POINT = 0.9
MOVEMENT_TYPE = 'linear'  # Choose from: 'linear', 'bezier', 'exponential', 'immediate'

# Functions

def mouse_move(x, y):
win32api.mouse_event(win32con.MOUSEEVENTF_MOVE, x, y, 0, 0)

def is_activated():
return win32api.GetAsyncKeyState(0x06) != 0  # change this line for hotkey

def ramped_movement(x, y, distance, max_target_distance):
t = 1 - (distance / max_target_distance)
q0 = 0
q1 = BEZIER_CONTROL_POINT
q2 = 1

```
# Quadratic Bezier curve calculation
Bt = pow((1 - t), 2) * q0 + 2 * (1 - t) * t * q1 + pow(t, 2) * q2

return x * Bt, y * Bt

```

def exponential_movement(x, y, distance, max_target_distance):
factor = pow(distance / max_target_distance, 2)
return x * factor, y * factor

def locate_target(target, max_target_distance):
moment = cv2.moments(target)
if moment["m00"] == 0:
return

```
cx = int(moment["m10"] / moment["m00"])
cy = int(moment["m01"] / moment["m00"])

mid = SQUARE_SIZE / 2
x = -(mid - cx) if cx < mid else cx - mid
y = -(mid - cy) if cy < mid else cy - mid

distance = sqrt(pow(x, 2) + pow(y, 2))
slope = ((1.0 / 3.0) - 1.0) / (max_target_distance / TARGET_SIZE)
multiplier = (((max_target_distance - distance) / TARGET_SIZE) * slope + 1) / (100 / botness)

if is_activated():
    if MOVEMENT_TYPE == 'linear':
        mouse_move(int(x * multiplier), int(y * multiplier))
    elif MOVEMENT_TYPE == 'bezier':
        ramped_x, ramped_y = ramped_movement(x, y, distance, max_target_distance)
        mouse_move(int(ramped_x * multiplier), int(ramped_y * multiplier))
    elif MOVEMENT_TYPE == 'exponential':
        exp_x, exp_y = exponential_movement(x, y, distance, max_target_distance)
        mouse_move(int(exp_x * multiplier), int(exp_y * multiplier))
    elif MOVEMENT_TYPE == 'immediate':
        mouse_move(int(x), int(y))
if __debug__:
    cv2.drawContours(frame, [target], -1, (0, 255, 0), 2)
    cv2.circle(frame, (cx, cy), 7, (255, 255, 255), -1)

```

# Main Program

MAX_TARGET_DISTANCE = sqrt(2 * pow(TARGET_SIZE, 2))
print("MAX_TARGET_DISTANCE (pixels): ", MAX_TARGET_DISTANCE)

sct = mss()
dimensions = sct.monitors[1]
dimensions['left'] = int((dimensions['width'] / 2) - (SQUARE_SIZE / 2))
dimensions['top'] = int((dimensions['height'] / 2) - (SQUARE_SIZE / 2))
dimensions['width'] = SQUARE_SIZE
dimensions['height'] = SQUARE_SIZE

print("Running Contour-Based AimBrain...")

prev_time = time.time()
while True:
frame = np.asarray(sct.grab(dimensions))
contours = process(frame, red_outline_values, MIN_CONTOUR_AREA, \
MAX_WIDTH_HEIGHT_RATIO, SQUARE_SIZE, TARGET_SIZE)
if len(contours) > 1:
locate_target(contours[1], MAX_TARGET_DISTANCE)

```
if __debug__:
    cv2.drawContours(frame, contours, -1, (0, 255, 0), 3)
    cv2.imshow('res', frame)

current_time = time.time()
fps = 1 / (current_time - prev_time)
prev_time = current_time
print(f"FPS: {fps:.2f}", end='\\r')

if cv2.waitKey(1) & 0xFF == ord('q'):
    break

```

sct.close()
cv2.destroyAllWindows()