import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from fuzzywuzzy import fuzz
from fuzzywuzzy import process
import logging

INDIAN_ADDRESS_TERMS = {
    "gali",
    "wali",
    "chowk",
    "nagar",
    "marg",
    "road",
    "street",
    "lane",
    "bagh",
    "colony",
    "sector",
    "block",
    "phase",
    "vihar",
    "enclave",
    "market",
    "bazaar",
    "pura",
    "puri",
    "garh",
    "mohalla",
    "tola",
    "sarai",
    "pur",
    "ganj",
    "gunj",
    "mandi",
    "mahal",
    "haveli",
    "chawl",
    "wadi",
    "pada",
    "taluka",
    "district",
    "gram",
    "gaon",
    "basti",
    "wada",
    "pada",
    "pol",
    "peth",
    "nagri",
    "naga",
    "tand",
    "tandi",
    "tola",
    "khurd",
    "kalan",
    "kot",
    "dera",
    "dara",
    "patti",
    "khera",
    "colony",
    "society",
    "apartment",
    "flat",
    "house",
    "building",
    "tower",
    "complex",
    "residency",
    "heights",
    "villa",
    "bungalow",
    "mansion",
    "plaza",
    "arcade",
    "hub",
    "center",
    "point",
}

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


class AddressAISystem:
    def __init__(self, data_file):
        self.data = self.load_data(data_file)
        self.train_data, self.test_data = self.split_data()
        self.vectorizer = self.create_tfidf_vectorizer()
        self.pincode_model = self.train_pincode_model()
        self.known_places = set(self.data["Place"].str.lower())
        self.known_districts = set(self.data["District"].str.lower())
        self.known_states = set(self.data["State"].str.lower())
        self.place_to_pincode = self.create_place_to_pincode_mapping()

    def load_data(self, file_path):
        logger.info(f"Loading data from {file_path}")
        data = pd.read_csv(file_path)
        data["Place"] = data["Place"].str.replace(r"-\d+", "", regex=True).str.lower()
        return data

    def split_data(self):
        logger.info("Splitting data into train and test sets")
        return train_test_split(self.data, test_size=0.2, random_state=42)

    def create_tfidf_vectorizer(self):
        logger.info("Creating TF-IDF vectorizer")
        vectorizer = TfidfVectorizer(
            analyzer="word", ngram_range=(1, 3), min_df=0.01, max_df=0.7
        )
        vectorizer.fit(
            self.train_data["Place"]
            + " "
            + self.train_data["District"]
            + " "
            + self.train_data["State"]
        )
        return vectorizer

    def create_place_to_pincode_mapping(self):
        return dict(zip(self.data["Place"].str.lower(), self.data["Pincode"]))

    def train_pincode_model(self):
        logger.info("Training pincode model")
        X = self.vectorizer.transform(
            self.train_data["Place"]
            + " "
            + self.train_data["District"]
            + " "
            + self.train_data["State"]
        )
        y = self.train_data["Pincode"]
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X, y)
        return model

    def correct_spelling(self, word, known_set):
        if word.lower() in INDIAN_ADDRESS_TERMS:
            return word
        if word.lower() in known_set:
            return word
        closest_match = process.extractOne(
            word, known_set.union(INDIAN_ADDRESS_TERMS), scorer=fuzz.ratio
        )
        return closest_match[0] if closest_match and closest_match[1] > 80 else word

    def extract_address_components(self, address):
        words = address.split()
        place = district = state = ""
        for i in range(len(words)):
            for j in range(i + 1, len(words) + 1):
                phrase = " ".join(words[i:j]).lower()
                if phrase in self.known_places:
                    place = phrase
                elif phrase in self.known_districts:
                    district = phrase
                elif phrase in self.known_states:
                    state = phrase

        if not place:
            closest_place = process.extractOne(
                " ".join(words).lower(), self.known_places, scorer=fuzz.partial_ratio
            )
            if closest_place and closest_place[1] > 80:  # Adjust threshold as needed
                place = closest_place[0]
        return place, district, state

    def process_address(self, address):
        original_address = address
        words = address.split()
        corrected_words = []
        for word in words:
            if word.lower() in INDIAN_ADDRESS_TERMS:
                corrected_words.append(word)
            else:
                corrected_word = self.correct_spelling(
                    word,
                    self.known_places.union(self.known_districts).union(
                        self.known_states
                    ),
                )
                corrected_words.append(corrected_word)

        corrected_address = " ".join(corrected_words)

        place, district, state = self.extract_address_components(corrected_address)

        if not place or place.lower() not in self.known_places:
            return {
                "original_address": original_address,
                "corrected_address": corrected_address,
                "predicted_pincode": None,
                "spelling_corrections": {},
                "status": "Invalid or Incomplete Address",
            }

        if place.lower() in self.place_to_pincode:
            predicted_pincode = self.place_to_pincode[place.lower()]
        else:
            features = self.extract_features(corrected_address)
            predicted_pincode = self.pincode_model.predict([features])[0]

        spelling_corrections = {
            words[i]: corrected_words[i]
            for i in range(len(words))
            if words[i].lower() != corrected_words[i].lower()
        }

        return {
            "original_address": original_address,
            "corrected_address": corrected_address,
            "predicted_pincode": predicted_pincode,
            "spelling_corrections": spelling_corrections,
            "status": "Valid Address",
        }

    def process_addresses_bulk(self, addresses):
        results = []
        for address in addresses:
            result = self.process_address(address)
            results.append(result)
        return results

    def extract_features(self, address):
        return self.vectorizer.transform([address]).toarray()[0]

    def evaluate_model(self):
        logger.info("Evaluating model")
        X_test = self.vectorizer.transform(
            self.test_data["Place"]
            + " "
            + self.test_data["District"]
            + " "
            + self.test_data["State"]
        )
        y_test = self.test_data["Pincode"]
        y_pred = self.pincode_model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        logger.info(f"Pincode prediction accuracy: {accuracy}")
        return accuracy


if __name__ == "__main__":
    data_file = "app/api/address_model/Book2.csv"
    system = AddressAISystem(data_file)

    input_address = "Rithal 1559, kotla"
    result = system.process_address(input_address)
    print(f"Original Address: {result['original_address']}")
    print(f"Corrected Address: {result['corrected_address']}")
    print(f"Predicted Pincode: {result['predicted_pincode']}")
    print("Spelling Corrections:")
    for component, correction in result["spelling_corrections"].items():
        if correction:
            print(f"  {component.capitalize()}: {correction}")

    bulk_addresses = [
        "Rithal 1559, kotla",
        "123 New Colony, Delhi",
        "Vasant Vhar, Delhi",
    ]
    bulk_results = system.process_addresses_bulk(bulk_addresses)

    for i, res in enumerate(bulk_results):
        print(f"\nAddress {i+1}:")
        print(f"Original Address: {res['original_address']}")
        print(f"Corrected Address: {res['corrected_address']}")
        print(f"Predicted Pincode: {res['predicted_pincode']}")
        print("Spelling Corrections:")
        for component, correction in res["spelling_corrections"].items():
            if correction:
                print(f"  {component.capitalize()}: {correction}")

    accuracy = system.evaluate_model()
    print(f"Model Accuracy: {accuracy}")
