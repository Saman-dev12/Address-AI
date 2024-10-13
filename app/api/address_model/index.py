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


def preprocess_dataset(dataset):
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


def calculate_match_score(input_address, dataset_address):
    exact_match_bonus = sum(
        30 for word in input_address.split() if word in dataset_address.split()
    )
    ratio = fuzz.token_set_ratio(input_address, dataset_address)
    term_boost = sum(
        5 for term in INDIAN_ADDRESS_TERMS if term in input_address.split()
    )
    return ratio + exact_match_bonus + term_boost


def construct_corrected_address(original_address_parts, best_match):
    # Only include the best match's place and drop the wrong spelling
    corrected_address = f"{original_address_parts[0]} {best_match['place']}, {best_match['district']}, {best_match['state']}"
    return corrected_address


def find_best_match(address, grouped_data, threshold=70):
    address_normalized = address.lower()
    original_address_parts = address.split()
    best_match = None
    best_score = 0
    spelling_corrections = {}

    for pincode, addresses in grouped_data.items():
        for addr_data in addresses:
            score = calculate_match_score(address_normalized, addr_data["address"])
            if score > best_score:
                best_score = score
                best_match = addr_data
                best_match["pincode"] = pincode
                best_match["score"] = score

    status = "Valid" if best_match and best_match["score"] >= threshold else "Invalid"

    if best_match:
        # Check for spelling corrections
        for word in original_address_parts:
            # Only add the misspelled word to corrections if it doesn't match the correct place
            if word.lower() != best_match["place"].lower() and not any(
                fuzz.ratio(word.lower(), correct_word.lower()) > 80
                for correct_word in spelling_corrections.values()
            ):
                spelling_corrections[word] = best_match["place"]

        corrected_address = construct_corrected_address(
            original_address_parts, best_match
        )

    return {
        "corrected_address": corrected_address if best_match else None,
        "original_address": address,
        "predicted_pincode": int(best_match["pincode"]) if best_match else None,
        "spelling_corrections": spelling_corrections,
        "status": status,
    }


# Load dataset and preprocess
dataset = pd.read_csv("app/api/address_model/Book2.csv")
grouped_data = preprocess_dataset(dataset)

# Test addresses
test_addresses = [
    "42 Vasnt Kunj Dlhi",
    "Mayur Vihar Phase 1 Delhi",
    "Connaught Place New Delhi",
    "Greater Kailash 2 Delhi",
    "D-238 Mohn Gaden dehi",
    "Gali-3 Badarpur Delhi",
]

for address in test_addresses:
    result = find_best_match(address, grouped_data)
    print(f"\nInput Address: {address}")
    print("OutputAddress = {")
    print(f"  corrected_address: '{result['corrected_address']}',")
    print(f"  original_address: '{result['original_address']}',")
    print(f"  predicted_pincode: {result['predicted_pincode']},")
    print(f"  spelling_corrections: {result['spelling_corrections']},")
    print(f"  status: '{result['status']}'")
    print("}")
