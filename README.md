# Insight360TN - NFHS Dashboard

Professional interactive dashboard for Tamil Nadu's National Family Health Survey data visualization with intelligent indicator-based ranking system.

## Project Structure

```
Insight360TN/
├── index.html                          # Main HTML file
├── README.md                           # Project documentation
├── css/
│   └── styles.css                     # All CSS styles and themes
├── js/
│   ├── app.js                        # Main application initialization
│   ├── config.js                     # Global variables and configuration
│   ├── data-loader.js                # Data fetching functionality
│   ├── indicator-ranking.js          # Smart ranking system based on indicator types
│   ├── kpi.js                        # Performance dashboard generation
│   ├── map.js                        # Leaflet map with intelligent color coding
│   ├── ui.js                         # User interface interactions
│   └── utils.js                      # Utility functions
└── dashboard_files/
    ├── master_nfhs_data.json          # Complete NFHS-4 & NFHS-5 district data
    ├── nfhs_indicator_categories.json # Categorized indicators with types
    └── tn_district.geojson            # Tamil Nadu district boundaries
```

## Key Features

### 🎯 Smart Indicator System
- **Positive Indicators**: Higher values = Better performance (Green)
- **Negative Indicators**: Lower values = Better performance (Green)
- **Neutral Indicators**: Demographic/descriptive data

### 🗺️ Interactive Map
- Choropleth visualization with intelligent color coding
- Dynamic legend showing "Best/Medium/Worst" based on indicator type
- District-wise data visualization for 32 districts
- Support for newly formed districts with parent district mapping

### 📊 Performance Analytics
- Top 5 and Bottom 5 district rankings
- Proper ranking system (Rank #1 = Best performer regardless of indicator type)
- State average calculations
- Professional dashboard with expandable sidebar

### 🔄 Survey Comparison
- NFHS-4 (2015-16) and NFHS-5 (2019-21) data
- Easy survey switching with data preservation
- 128 health indicators across 10 categories

### 🎨 Professional Design
- Dark theme with modern UI
- Responsive layout
- Material Design icons
- Professional gradient styling

## Data Coverage

- **Total Indicators**: 128 (74 Positive, 47 Negative, 7 Neutral)
- **Categories**: 10 health domains
- **Districts**: 32 (including newly formed districts)
- **Surveys**: NFHS-4 (2015-16) & NFHS-5 (2019-21)

## Usage

1. Open `index.html` in a web browser
2. Select NFHS-4 or NFHS-5 survey
3. Choose a category from the left sidebar
4. Select an indicator to view map and performance data
5. Analyze district rankings and performance metrics

## Technical Implementation

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Mapping**: Leaflet.js with GeoJSON
- **Data Format**: JSON with structured indicator metadata
- **Responsive Design**: Mobile-friendly interface
- **Performance**: Optimized data loading and rendering