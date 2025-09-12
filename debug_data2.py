import json

# Load the master data file
with open('dashboard_files/master_nfhs_data.json', 'r') as f:
    data = json.load(f)

# Check the districts structure
districts = data.get('districts', {})
print(f"Number of districts: {len(districts)}")

if districts:
    # Get first district
    first_district = list(districts.keys())[0]
    print(f"\nFirst district: {first_district}")
    print(f"Keys in first district: {list(districts[first_district].keys())}")
    
    # Check NFHS data structure
    if 'nfhs_4' in districts[first_district]:
        print(f"\nNFHS-4 indicators: {len(districts[first_district]['nfhs_4'])}")
        print("Sample NFHS-4 indicators:")
        for i, key in enumerate(list(districts[first_district]['nfhs_4'].keys())[:3]):
            value = districts[first_district]['nfhs_4'][key]
            print(f"  {key}: {value}")
    
    if 'nfhs_5' in districts[first_district]:
        print(f"\nNFHS-5 indicators: {len(districts[first_district]['nfhs_5'])}")
        print("Sample NFHS-5 indicators:")
        for i, key in enumerate(list(districts[first_district]['nfhs_5'].keys())[:3]):
            value = districts[first_district]['nfhs_5'][key]
            print(f"  {key}: {value}")