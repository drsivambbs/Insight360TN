#!/usr/bin/env python3
"""
Check which NFHS survey has Rural & Urban data breakdown
"""

import json

def check_rural_urban():
    # Load data files
    with open('dashboard_files/master_nfhs_data.json', 'r') as f:
        nfhs_data = json.load(f)
    
    # Get sample district data
    first_district = list(nfhs_data['districts'].values())[0]
    nfhs4_indicators = set(first_district.get('nfhs_4', {}).keys())
    nfhs5_indicators = set(first_district.get('nfhs_5', {}).keys())
    
    # Search for rural/urban indicators
    rural_urban_keywords = ['rural', 'urban', 'residence']
    
    nfhs4_rural_urban = []
    nfhs5_rural_urban = []
    
    # Check NFHS-4
    for indicator in nfhs4_indicators:
        if any(keyword in indicator.lower() for keyword in rural_urban_keywords):
            nfhs4_rural_urban.append(indicator)
    
    # Check NFHS-5
    for indicator in nfhs5_indicators:
        if any(keyword in indicator.lower() for keyword in rural_urban_keywords):
            nfhs5_rural_urban.append(indicator)
    
    print("=" * 60)
    print("RURAL & URBAN DATA BREAKDOWN ANALYSIS")
    print("=" * 60)
    
    print(f"\n📊 SUMMARY:")
    print(f"NFHS-4 Rural/Urban indicators: {len(nfhs4_rural_urban)}")
    print(f"NFHS-5 Rural/Urban indicators: {len(nfhs5_rural_urban)}")
    
    if nfhs4_rural_urban:
        print(f"\n🏘️ NFHS-4 RURAL/URBAN INDICATORS ({len(nfhs4_rural_urban)}):")
        for indicator in sorted(nfhs4_rural_urban):
            print(f"  • {indicator}")
    else:
        print(f"\n❌ NFHS-4: No Rural/Urban breakdown found")
    
    if nfhs5_rural_urban:
        print(f"\n🏙️ NFHS-5 RURAL/URBAN INDICATORS ({len(nfhs5_rural_urban)}):")
        for indicator in sorted(nfhs5_rural_urban):
            print(f"  • {indicator}")
    else:
        print(f"\n❌ NFHS-5: No Rural/Urban breakdown found")
    
    print(f"\n🏁 CONCLUSION:")
    if nfhs4_rural_urban and nfhs5_rural_urban:
        print("✅ Both NFHS-4 and NFHS-5 have Rural/Urban data breakdown")
    elif nfhs4_rural_urban:
        print("✅ Only NFHS-4 has Rural/Urban data breakdown")
    elif nfhs5_rural_urban:
        print("✅ Only NFHS-5 has Rural/Urban data breakdown")
    else:
        print("❌ Neither NFHS-4 nor NFHS-5 has Rural/Urban data breakdown")
        print("💡 The data appears to be aggregated at district level only")

if __name__ == "__main__":
    check_rural_urban()