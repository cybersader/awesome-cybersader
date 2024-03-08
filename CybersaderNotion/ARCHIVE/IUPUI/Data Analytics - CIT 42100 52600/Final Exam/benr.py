import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import LabelEncoder
import sklearn.feature_selection as fs
from sklearn.model_selection import train_test_split
from sklearn import metrics
from sklearn.tree import DecisionTreeClassifier

bank_df = pd.read_csv('bank.csv', low_memory=False, thousands=',')

Le = LabelEncoder()

# continuous values into a dataframe
df_nums = bank_df.select_dtypes(exclude=['category', 'object'])

# discrete and string values into a dataframe
df_disc = bank_df.select_dtypes(include=['object'])
for (df_column, df_data) in df_disc.iteritems():
    df_disc[df_column] = Le.fit_transform(df_disc[df_column])

# quick testing before information gain preparation
# print("\nNumeric: \n", df_nums.dtypes)
# print("\nDiscrete: \n", df_disc.dtypes)
# print("\nCONTINUOUS :::\n")
# df_nums.info(verbose=True)
# print("\nDISCRETE :::\n")
# df_disc.info(verbose=True)

X = pd.concat([df_nums, df_disc], axis=1)
X = X.drop(['y'], axis=1)
X = X.fillna(0)
y = bank_df['y']
y = Le.fit_transform(bank_df['y'])

# print("\nY :::\n")
# print(y)
# print("\nX :::\n")
# print(X)

# Getting top ten features into a dataframe
# res = dict(zip(X.columns, fs.mutual_info_classif(X, y)))
# sorted_res = sorted(res.items(), key=lambda x: x[1], reverse=True)
# top_ten_res = sorted_res[:10]
# top_deposit_columns = [item[0] for item in top_ten_res]
# # print(top_deposit_columns)
# features_df = X[top_deposit_columns]
# plt.barh(*zip(*sorted_res[:10]))
# plt.show()

# drop the duration column if doing automated version
# (FINAL wants custom chosen features from information gain)....so not using this step
# features_df = features_df.drop(columns=['duration'])
# print("\nFEATURES :::\n")
# features_df.info(verbose=True)

# Using 6 features calculated in commented out steps
# I could use the data automatically from the previous step.  However, I'm manually choosing
# the features from previous results now as the final wants
X = X[['pdays', 'poutcome', 'previous', 'month', 'contact', 'age']]

# Decision Tree stuff
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=1)
d_tree = DecisionTreeClassifier(criterion="entropy", max_depth=3)
d_tree = d_tree.fit(X_train,y_train)
y_pred = d_tree.predict(X_test)

print('\n\nDecision Tree')
print('confusion matrix\n', metrics.confusion_matrix(y_test, y_pred))
print('Recall: %.3f' % metrics.recall_score(y_test, y_pred))
print('Precision: %.3f' % metrics.precision_score(y_test, y_pred))
print('F1-score: %.3f' % metrics.f1_score(y_test, y_pred))
print('Accuracy:',  metrics.accuracy_score(y_test, y_pred))

y_score = d_tree.fit(X_train, y_train).predict(X_test)
fpr, tpr, _ = metrics.roc_curve(y_test,  y_score)

#create ROC curve
plt.plot(fpr,tpr)
plt.ylabel('True Positive Rate')
plt.xlabel('False Positive Rate')
plt.show()
