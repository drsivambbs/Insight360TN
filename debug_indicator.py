import json

# Load the master data file
with open('dashboard_files/master_nfhs_data.json', 'r') as f:
    data = json.load(f)

# Check for the specific indicator
indicator = "Men Age Group 15 To 49 Years Who Are Literate (%)"
districts = data.get('districts', {})

print(f"Looking for indicator: {indicator}")
print(f"Total districts: {len(districts)}")

found_in_nfhs4 = 0
found_in_nfhs5 = 0

for district_name, district_data in districts.items():
    if 'nfhs_4' in district_data and indicator in district_data['nfhs_4']:
        found_in_nfhs4 += 1
        print(f"NFHS-4 {district_name}: {district_data['nfhs_4'][indicator]}")
    
    if 'nfhs_5' in district_data and indicator in district_data['nfhs_5']:
        found_in_nfhs5 += 1
        print(f"NFHS-5 {district_name}: {district_data['nfhs_5'][indicator]}")

print(f"\nFound in NFHS-4: {found_in_nfhs4} districts")
print(f"Found in NFHS-5: {found_in_nfhs5} districts")

# Check what indicators are actually available
print("\nFirst few indicators in NFHS-4:")
first_district = list(districts.keys())[0]
for i, key in enumerate(list(districts[first_district]['nfhs_4'].keys())[:5]):
    print(f"  {key}")

print("\nFirst few indicators in NFHS-5:")
for i, key in enumerate(list(districts[first_district]['nfhs_5'].keys())[:5]):
    print(f"  {key}")