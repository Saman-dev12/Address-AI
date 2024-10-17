import re
import pandas as pd
from collections import defaultdict
from sklearn.ensemble import RandomForestClassifier
from fuzzywuzzy import fuzz

INDIAN_ADDRESS_TERMS = {
    "gali",
    "marg",
    "road",
    "street",
    "nagar",
    "sector",
    "block",
    "phase",
    "enclave",
    "market",
    "bazaar",
    "puri",
    "pur",
    "ganj",
    "gunj",
    "mandi",
    "mohalla",
    "villa",
    "complex",
    "society",
    "plaza",
}

SPELLING_CORRECTION_THRESHOLD = 90


class AddressAISystem:
    def __init__(self, dataset_path):
        self.dataset = pd.read_csv(dataset_path)
        self.grouped_data = self.preprocess_dataset(self.dataset)
        self.model = RandomForestClassifier()  # Initialize the machine learning model

    def preprocess_dataset(self, dataset):
        grouped_data = defaultdict(list)
        for _, row in dataset.iterrows():
            grouped_data[row["Place"].lower()].append(
                {
                    "place": row["Place"],
                    "district": row["District"],
                    "state": row["State"],
                    "pincode": row["Pincode"],
                }
            )
        return grouped_data

    def extract_components(self, address):
        address = re.sub(r"\b\d{6}\b", "", address)  # Remove pincode if present
        components = re.findall(r"\b[\w\'-]+\b", address.lower())
        return components

    def find_best_match(self, components):
        best_match = None
        best_score = 0

        for place, details in self.grouped_data.items():
            score = max(
                fuzz.partial_ratio(place, " ".join(components))
                for i in range(len(components))
            )
            if score > best_score:
                best_score = score
                best_match = details[0]

        return best_match

    def construct_corrected_address(self, original_address, best_match):
        match = re.match(
            r"([\w\s-]+?)(\s*,?\s*\w+\s+\w+)$", original_address, re.IGNORECASE
        )
        if match:
            prefix = match.group(1).strip()
        else:
            prefix = original_address.split(",")[0].strip()

        corrected_address = f"{prefix}, {best_match['place']}, {best_match['district']}, {best_match['pincode']}"
        return corrected_address

    def process_address(self, address):
        components = self.extract_components(address)
        best_match = self.find_best_match(components)

        if best_match:
            corrected_address = self.construct_corrected_address(address, best_match)
            return {
                "original_address": address,
                "corrected_address": corrected_address,
                "place": best_match["place"],
                "district": best_match["district"],
                "state": best_match["state"],
                "pincode": best_match["pincode"],
            }
        else:
            return {
                "original_address": address,
                "corrected_address": None,
                "error": "No match found",
            }

    def process_addresses_bulk(self, addresses):
        return [self.process_address(address) for address in addresses]
