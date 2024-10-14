import re
from fuzzywuzzy import fuzz
import pandas as pd
from collections import defaultdict

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


class AddressAISystem:
    def __init__(self, dataset_path):
        self.dataset = pd.read_csv(dataset_path)
        self.grouped_data = self.preprocess_dataset(self.dataset)

    def preprocess_dataset(self, dataset):
        grouped_data = defaultdict(list)
        for _, row in dataset.iterrows():
            address = (
                f"{row['Place']} {row['Sub-District']} {row['District']} {row['State']}"
            )
            address_normalized = address.lower()
            grouped_data[row["Pincode"]].append(
                {
                    "address": address_normalized,
                    "place": row["Place"],
                    "sub_district": row["Sub-District"],
                    "district": row["District"],
                    "state": row["State"],
                }
            )
        return grouped_data

    def calculate_match_score(self, input_address, dataset_address):
        exact_match_bonus = sum(
            30 for word in input_address.split() if word in dataset_address.split()
        )
        ratio = fuzz.token_set_ratio(input_address, dataset_address)
        term_boost = sum(
            5 for term in INDIAN_ADDRESS_TERMS if term in input_address.split()
        )
        return ratio + exact_match_bonus + term_boost

    def construct_corrected_address(self, original_address_parts, best_match):
        corrected_address = f"{original_address_parts[0]} {best_match['place']}, {best_match['district']}, {best_match['state']}"
        return corrected_address

    def find_best_match(self, address, threshold=70):
        address_normalized = address.lower()
        original_address_parts = address.split()
        best_match = None
        best_score = 0
        spelling_corrections = {}

        for pincode, addresses in self.grouped_data.items():
            for addr_data in addresses:
                score = self.calculate_match_score(
                    address_normalized, addr_data["address"]
                )
                if score > best_score:
                    best_score = score
                    best_match = addr_data
                    best_match["pincode"] = pincode
                    best_match["score"] = score

        status = (
            "Valid" if best_match and best_match["score"] >= threshold else "Invalid"
        )

        if best_match:
            for word in original_address_parts:
                if word.lower() != best_match["place"].lower() and not any(
                    fuzz.ratio(word.lower(), correct_word.lower()) > 80
                    for correct_word in spelling_corrections.values()
                ):
                    spelling_corrections[word] = best_match["place"]

            corrected_address = self.construct_corrected_address(
                original_address_parts, best_match
            )

        return {
            "corrected_address": corrected_address if best_match else None,
            "original_address": address,
            "predicted_pincode": int(best_match["pincode"]) if best_match else None,
            "spelling_corrections": spelling_corrections,
            "status": status,
        }

    def process_address(self, address):
        return self.find_best_match(address)

    def process_addresses_bulk(self, addresses):
        results = []
        for address in addresses:
            result = self.find_best_match(address)
            results.append(result)
        return results
