# Robustness of Facial Verification - Attacks

# Facial Authentication

- Use cases
    - Accessing systems
- 3D Face Detection
    - Detection, Adversarial Detection, Feature Extraction
- Passive vs Active Liveliness Detection
    - Discriminating real from fake (3d from 2d pictures)
    - Passive involves various methods to detect depth via multiple sensors or cameras, lasers over the face, etc.
    - Active involves user performing actions

# Depth Forgery Attack

- Assumptions
    - They have access to NN
    - Don’t have access to infrared camera templates
- Attack Process
    - Use whiteboxes and certain colors on paper and distance to fool depth model
    - Exploit model for RGB too
- Verification relies on thresholds
- Illumination of the room helps with the attack
- Distance in any direction matters for success of attack
- Mitigations
    - Randomized scatter templates
- Questions
    - Access to template?  No?
    - White boxes? Helps with RGB model spoofing
    - Active would be making faces? Yes

# Face Auth Spoofing Technique with Custom Display

- Painted skin (Huapi) display
- Anti spoofing involves liveliness in this case
    - some systems use light and skin to detect
- Types of spoofing
    - printed images
    - videos
    - 3d model attacks
        - skin texture
- Types of anti spoofing
    - dynamic
    - static
- Some of these devices can literally be fooled by any depth rather than actual face depth, so placing a ball in front of the system can cause it to accept
- It’s really cheap to fool these detections
- Defective designs:
    - use of depth information is superficial
    - multimodal observations aren’t jointly verified properly together as one piece of data
    - available modalities aren’t properly in use
- Dynamic methods aren’t viable on smartphones, because they are expensive

# Attacks on Facial Recognition Systems

2 types of attacks

- Spoofing Attacks
- Privacy Protection Attacks / Anti-Facial Recognition Attacks

Static and Dynamic

1. 2d attacks
2. 2d+ = 2d with a presence of depth, but not actual features
3. 3d = RGB, depth, and liveliness spoofing