import json

# Load the master data file
with open('dashboard_files/master_nfhs_data.json', 'r') as f:
    data = json.load(f)

# Check structure
print("Data structure:")
print(f"Number of districts: {len(data)}")

# Get first district to check structure
first_district = list(data.keys())[0]
print(f"\nFirst district: {first_district}")
print(f"Keys in first district: {list(data[first_district].keys())}")

# Check NFHS-4 and NFHS-5 data
if 'nfhs_4' in data[first_district]:
    print(f"\nNFHS-4 indicators count: {len(data[first_district]['nfhs_4'])}")
    print("First 5 NFHS-4 indicators:")
    for i, key in enumerate(list(data[first_district]['nfhs_4'].keys())[:5]):
        print(f"  {i+1}. {key}")

if 'nfhs_5' in data[first_district]:
    print(f"\nNFHS-5 indicators count: {len(data[first_district]['nfhs_5'])}")
    print("First 5 NFHS-5 indicators:")
    for i, key in enumerate(list(data[first_district]['nfhs_5'].keys())[:5]):
        print(f"  {i+1}. {key}")

# Check a specific indicator
test_indicator = "Women Age Group 15 To 49 Years Who Are Anaemic (%)"
print(f"\nChecking indicator: {test_indicator}")
for district in list(data.keys())[:3]:
    nfhs4_val = data[district].get('nfhs_4', {}).get(test_indicator, 'Not found')
    nfhs5_val = data[district].get('nfhs_5', {}).get(test_indicator, 'Not found')
    print(f"{district}: NFHS-4={nfhs4_val}, NFHS-5={nfhs5_val}")