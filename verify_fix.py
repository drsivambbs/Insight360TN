import json

with open('dashboard_files/tn_district.geojson', 'r') as f:
    geojson = json.load(f)

with open('dashboard_files/master_nfhs_data.json', 'r') as f:
    nfhs_data = json.load(f)

# Extract district names using correct property
geojson_districts = []
for feature in geojson['features']:
    props = feature['properties']
    name = props.get('District', 'Unknown')
    geojson_districts.append(name)

nfhs_districts = list(nfhs_data['districts'].keys())

print("=== FIXED DISTRICT MATCHING ===")
print(f"GeoJSON districts: {sorted(set(geojson_districts))}")
print(f"NFHS districts: {sorted(nfhs_districts)}")

# Check matching
geojson_lower = [d.lower() for d in geojson_districts]
nfhs_lower = [d.lower() for d in nfhs_districts]

matched = 0
for d in geojson_districts:
    if d.lower() in nfhs_lower:
        matched += 1

print(f"\nMatched: {matched}/{len(set(geojson_districts))}")

# Show any mismatches
geojson_set = set(d.lower() for d in geojson_districts)
nfhs_set = set(d.lower() for d in nfhs_districts)

unmatched_geo = geojson_set - nfhs_set
unmatched_nfhs = nfhs_set - geojson_set

if unmatched_geo:
    print(f"GeoJSON not in NFHS: {unmatched_geo}")
if unmatched_nfhs:
    print(f"NFHS not in GeoJSON: {unmatched_nfhs}")
