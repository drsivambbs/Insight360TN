import json

# Load the data files
with open('dashboard_files/tn_district.geojson', 'r') as f:
    geojson = json.load(f)

with open('dashboard_files/master_nfhs_data.json', 'r') as f:
    nfhs_data = json.load(f)

# Extract district names from GeoJSON
geojson_districts = []
for feature in geojson['features']:
    props = feature['properties']
    name = props.get('DISTRICT') or props.get('district') or props.get('NAME') or 'Unknown'
    geojson_districts.append(name)

# Extract district names from NFHS data
nfhs_districts = list(nfhs_data['districts'].keys())

print("=== DISTRICT NAME COMPARISON ===")
print(f"GeoJSON districts ({len(geojson_districts)}):")
for d in sorted(geojson_districts):
    print(f"  '{d}'")

print(f"\nNFHS data districts ({len(nfhs_districts)}):")
for d in sorted(nfhs_districts):
    print(f"  '{d}'")

print("\n=== MATCHING ANALYSIS ===")
geojson_lower = [d.lower() for d in geojson_districts]
nfhs_lower = [d.lower() for d in nfhs_districts]

matched = []
unmatched_geojson = []
unmatched_nfhs = []

for d in geojson_districts:
    if d.lower() in nfhs_lower:
        matched.append(d)
    else:
        unmatched_geojson.append(d)

for d in nfhs_districts:
    if d.lower() not in geojson_lower:
        unmatched_nfhs.append(d)

print(f"Matched districts: {len(matched)}")
print(f"Unmatched in GeoJSON: {len(unmatched_geojson)}")
print(f"Unmatched in NFHS: {len(unmatched_nfhs)}")

if unmatched_geojson:
    print(f"\nGeoJSON districts not in NFHS data:")
    for d in unmatched_geojson:
        print(f"  '{d}'")

if unmatched_nfhs:
    print(f"\nNFHS districts not in GeoJSON:")
    for d in unmatched_nfhs:
        print(f"  '{d}'")
