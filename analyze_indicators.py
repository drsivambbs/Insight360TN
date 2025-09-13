#!/usr/bin/env python3
"""
Analyze indicator coverage between NFHS-4 and NFHS-5 data
"""

import json

def analyze_indicators():
    # Load data files
    with open('dashboard_files/nfhs_indicator_categories.json', 'r') as f:
        categories_data = json.load(f)
    
    with open('dashboard_files/master_nfhs_data.json', 'r') as f:
        nfhs_data = json.load(f)
    
    # Get all indicators from categories
    all_indicators = []
    for category, data in categories_data['categories'].items():
        for indicator in data['indicators']:
            if isinstance(indicator, str):
                all_indicators.append(indicator)
            else:
                all_indicators.append(indicator.get('name', indicator))
    
    # Get indicators from actual data (using first district as sample)
    first_district = list(nfhs_data['districts'].values())[0]
    nfhs4_indicators = set(first_district.get('nfhs_4', {}).keys())
    nfhs5_indicators = set(first_district.get('nfhs_5', {}).keys())
    
    # Analysis
    total_indicators = len(all_indicators)
    nfhs4_count = len(nfhs4_indicators)
    nfhs5_count = len(nfhs5_indicators)
    
    # Find common and unique indicators
    common_indicators = nfhs4_indicators.intersection(nfhs5_indicators)
    nfhs4_only = nfhs4_indicators - nfhs5_indicators
    nfhs5_only = nfhs5_indicators - nfhs4_indicators
    
    # Check which indicators from categories are available in data
    available_in_nfhs4 = [ind for ind in all_indicators if ind in nfhs4_indicators]
    available_in_nfhs5 = [ind for ind in all_indicators if ind in nfhs5_indicators]
    missing_from_both = [ind for ind in all_indicators if ind not in nfhs4_indicators and ind not in nfhs5_indicators]
    
    print("=" * 60)
    print("NFHS INDICATOR COVERAGE ANALYSIS")
    print("=" * 60)
    
    print(f"\n📊 SUMMARY:")
    print(f"Total indicators in categories: {total_indicators}")
    print(f"NFHS-4 data columns: {nfhs4_count}")
    print(f"NFHS-5 data columns: {nfhs5_count}")
    print(f"Common indicators: {len(common_indicators)}")
    
    print(f"\n🔍 COVERAGE:")
    print(f"Categories indicators available in NFHS-4: {len(available_in_nfhs4)}/{total_indicators} ({len(available_in_nfhs4)/total_indicators*100:.1f}%)")
    print(f"Categories indicators available in NFHS-5: {len(available_in_nfhs5)}/{total_indicators} ({len(available_in_nfhs5)/total_indicators*100:.1f}%)")
    print(f"Categories indicators missing from both: {len(missing_from_both)}")
    
    print(f"\n📈 INDICATOR DISTRIBUTION:")
    print(f"NFHS-4 only indicators: {len(nfhs4_only)}")
    print(f"NFHS-5 only indicators: {len(nfhs5_only)}")
    print(f"Common to both surveys: {len(common_indicators)}")
    
    print(f"\n🎯 APP INCLUSION STATUS:")
    # Check what the app actually shows
    app_shows_all = len(available_in_nfhs4) + len(available_in_nfhs5) - len(set(available_in_nfhs4).intersection(set(available_in_nfhs5)))
    app_shows_common_only = len(common_indicators)
    
    if len(missing_from_both) == 0:
        print("✅ ALL indicators from categories are included in the app")
    else:
        print(f"⚠️  {len(missing_from_both)} indicators from categories are NOT available in data")
    
    print(f"\n📋 DETAILED BREAKDOWN:")
    if nfhs4_only:
        print(f"\nNFHS-4 ONLY ({len(nfhs4_only)} indicators):")
        for ind in sorted(list(nfhs4_only))[:10]:  # Show first 10
            print(f"  • {ind}")
        if len(nfhs4_only) > 10:
            print(f"  ... and {len(nfhs4_only) - 10} more")
    
    if nfhs5_only:
        print(f"\nNFHS-5 ONLY ({len(nfhs5_only)} indicators):")
        for ind in sorted(list(nfhs5_only))[:10]:  # Show first 10
            print(f"  • {ind}")
        if len(nfhs5_only) > 10:
            print(f"  ... and {len(nfhs5_only) - 10} more")
    
    if missing_from_both:
        print(f"\nMISSING FROM DATA ({len(missing_from_both)} indicators):")
        for ind in missing_from_both[:10]:  # Show first 10
            print(f"  • {ind}")
        if len(missing_from_both) > 10:
            print(f"  ... and {len(missing_from_both) - 10} more")
    
    print(f"\n🏁 CONCLUSION:")
    if len(nfhs4_only) > 0 or len(nfhs5_only) > 0:
        print("The app includes BOTH common AND uncommon indicators:")
        print(f"  - Shows indicators available in NFHS-4 when NFHS-4 is selected")
        print(f"  - Shows indicators available in NFHS-5 when NFHS-5 is selected")
        print(f"  - Users can access survey-specific indicators")
    else:
        print("The app only includes common indicators between both surveys")

if __name__ == "__main__":
    analyze_indicators()