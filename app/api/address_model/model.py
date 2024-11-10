import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder
from typing import Tuple
import joblib

# Read data
df = pd.read_csv("./Book2.csv")

# Drop rows where key columns are missing
df = df.dropna(subset=["Place", "District", "State", "Pincode"])

# Encoding categorical features using LabelEncoder
label_encoder = LabelEncoder()

df["Place_encoded"] = label_encoder.fit_transform(df["Place"])
df["District_encoded"] = label_encoder.fit_transform(df["District"])
df["State_encoded"] = label_encoder.fit_transform(df["State"])

# Use encoded columns as features and 'Place' as the target
X = df[["District_encoded", "State_encoded", "Pincode"]]  # Features
y = df["Place_encoded"]  # Target

# Split data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train a Random Forest model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Make predictions and calculate accuracy
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

# Print accuracy
print(f"Model accuracy: {accuracy}")

# Save the trained model to a file
joblib.dump(model, "address_model.pkl")
joblib.dump(
    label_encoder, "label_encoder.pkl"
)  # Save LabelEncoder for reverse transformations
