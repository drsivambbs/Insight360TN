import json

with open('dashboard_files/tn_district.geojson', 'r') as f:
    geojson = json.load(f)

print("=== GEOJSON PROPERTY ANALYSIS ===")
print("First feature properties:")
first_feature = geojson['features'][0]
props = first_feature['properties']
print(json.dumps(props, indent=2))

print(f"\nAll property keys in first feature:")
for key in props.keys():
    print(f"  '{key}': '{props[key]}'")

print(f"\nSample of district names from different features:")
for i in range(min(5, len(geojson['features']))):
    props = geojson['features'][i]['properties']
    print(f"Feature {i}: {dict(props)}")
