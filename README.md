# Insight360TN - NFHS Dashboard

Interactive dashboard for Tamil Nadu's National Family Health Survey data visualization.

## Project Structure

```
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # All CSS styles
├── js/
│   ├── app.js            # Main application initialization
│   ├── config.js         # Global variables and configuration
│   ├── data-loader.js    # Data fetching functionality
│   ├── map.js            # Leaflet map functionality
│   ├── ui.js             # User interface interactions
│   ├── kpi.js            # KPI dashboard generation
│   └── utils.js          # Utility functions
└── dashboard_files/
    ├── master_nfhs_data.json
    ├── tn_district.geojson
    └── nfhs_indicator_categories.json
```

## Features

- Interactive choropleth map visualization
- NFHS-4 and NFHS-5 data comparison
- Performance analysis with top/bottom districts
- Responsive dark theme design
- District mapping for newly formed districts

## Usage

Open `index.html` in a web browser to launch the dashboard.