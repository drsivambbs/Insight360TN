# Insight360TN - NFHS Dashboard

Professional interactive dashboard for Tamil Nadu's National Family Health Survey data visualization with intelligent indicator-based ranking system.

## Project Structure

```
Insight360TN/
├── index.html                          # Professional landing page
├── dashboard.html                      # Interactive NFHS dashboard
├── README.md                           # Project documentation
├── Icons/
│   ├── DPH.jpg                        # Directorate of Public Health logo
│   ├── Niti_Ayog.webp                # NITI Aayog logo
│   └── icmr.jpeg                      # ICMR-NIE logo
└── dashboard_files/
    ├── master_nfhs_data.json          # Complete NFHS-4 & NFHS-5 district data
    ├── nfhs_indicator_categories.json # Categorized indicators with types
    └── tn_district.geojson            # Tamil Nadu district boundaries
```

## Key Features

### 🏠 Professional Landing Page
- Clean, government-appropriate design with light theme
- Partnership ecosystem showcasing official sponsors
- Direct access to dashboard and documentation
- Professional typography and branding

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
- Complete district rankings with export functionality
- Interactive bar charts and data visualization
- State average calculations with trend analysis
- Professional KPI cards and performance metrics

### 🔄 Survey Comparison
- NFHS-4 (2015-16) and NFHS-5 (2019-21) data
- Easy survey switching with data preservation
- 128 health indicators across 10 categories
- Advanced search and filtering capabilities

### 🎨 Professional Design
- Light theme with government-appropriate styling
- Responsive layout for all devices
- Material Design icons and modern UI
- Consistent branding across all pages

## Official Partnerships

### 🏛️ Primary Sponsor
- **Directorate of Public Health (DPH)**
- Government of Tamil Nadu

### 📊 Data Partner
- **NITI Aayog**
- Government of India

### 🎓 Knowledge Partner
- **ICMR-National Institute of Epidemiology**
- Chennai

## Data Coverage

- **Total Indicators**: 128 (74 Positive, 47 Negative, 7 Neutral)
- **Categories**: 10 health domains
- **Districts**: 32 (including newly formed districts)
- **Surveys**: NFHS-4 (2015-16) & NFHS-5 (2019-21)
- **Official Documentation**: [Tamil Nadu NFHS Report](https://data.opencity.in/dataset/530ee93a-d24c-43df-b90b-272a067d5a4e/resource/994c9ee4-803c-4891-8897-ab4db4a445ff/download/tamil_nadu-nhfs.pdf)

## Usage

### Landing Page (`index.html`)
1. Professional entry point with project overview
2. Partnership information and official documentation
3. Direct navigation to dashboard and GitHub repository

### Dashboard (`dashboard.html`)
1. Select NFHS-4 or NFHS-5 survey from toggle buttons
2. Search or browse indicators from categorized sidebar
3. Click any indicator to view interactive map visualization
4. Analyze district rankings and export data
5. Use floating menu for navigation and additional features

## Technical Implementation

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Mapping**: Leaflet.js with GeoJSON district boundaries
- **Charts**: Chart.js for interactive data visualization
- **Data Format**: JSON with structured indicator metadata
- **Design System**: Material Design icons with Inter font
- **Responsive Design**: Mobile-friendly interface
- **Performance**: Optimized data loading and rendering
- **Export Features**: CSV download for district rankings

## Quick Start

1. Clone the repository
2. Open `index.html` for the landing page
3. Navigate to `dashboard.html` for the interactive dashboard
4. No build process required - runs directly in browser

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with ES6 support

## Contributing

This project is developed and maintained by Dr. Sivachandran Mathiyazagan (MPH Student, ICMR-NIE, Chennai) under the sponsorship of the Directorate of Public Health, Government of Tamil Nadu.

## License

Open-source project. Please acknowledge the official partners when using or redistributing.

---

**Insight360TN** - Transforming NFHS evidence into spatial decisions for better public health outcomes in Tamil Nadu.