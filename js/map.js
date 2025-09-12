// Map functionality
function initMap() {
    map = L.map('map').setView([10.8, 78.6569], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    if (geoJsonData && geoJsonData.features) {
        loadDefaultDistricts();
    }
}

function loadDefaultDistricts() {
    if (geoJsonLayer) {
        map.removeLayer(geoJsonLayer);
    }
    
    geoJsonLayer = L.geoJSON(geoJsonData, {
        style: {
            fillColor: 'transparent',
            weight: 0.9,
            opacity: 1,
            color: 'black',
            fillOpacity: 0
        },
        onEachFeature: function(feature, layer) {
            const districtName = feature.properties.District;
            layer.bindPopup(`<b>${districtName}</b><br/>Select an indicator to view data`);
        }
    }).addTo(map);
}

function loadMapData(indicator) {
    if (!map || !geoJsonData) return;
    
    const chartData = getChartData(indicator);
    if (!chartData || chartData.length === 0) return;
    
    const values = chartData.map(d => d[1]).sort((a, b) => a - b);
    const tertile1 = values[Math.floor(values.length / 3)];
    const tertile2 = values[Math.floor((values.length * 2) / 3)];
    
    if (geoJsonLayer) {
        map.removeLayer(geoJsonLayer);
    }
    
    geoJsonLayer = L.geoJSON(geoJsonData, {
        style: function(feature) {
            const districtName = feature.properties.District;
            const mappedDistrict = districtMapping[districtName] || districtName;
            const districtData = chartData.find(d => d[0] === mappedDistrict);
            const value = districtData ? districtData[1] : 0;
            
            return {
                fillColor: getColor(value, tertile1, tertile2),
                weight: 0.9,
                opacity: 1,
                color: 'black',
                fillOpacity: 0.7
            };
        },
        onEachFeature: function(feature, layer) {
            const districtName = feature.properties.District;
            const mappedDistrict = districtMapping[districtName] || districtName;
            const districtData = chartData.find(d => d[0] === mappedDistrict);
            const value = districtData ? districtData[1] : 'No data';
            layer.bindPopup(`<b>${districtName}</b><br/>${indicator}<br/>Value: ${value}%`);
        }
    }).addTo(map);
    
    showLegend(Math.min(...values), Math.max(...values), tertile1, tertile2);
}

function getColor(value, tertile1, tertile2) {
    if (value >= tertile2) return '#4caf50';  // Green - Top tertile
    if (value >= tertile1) return '#ffeb3b';  // Yellow - Middle tertile
    return '#f44336';  // Red - Bottom tertile
}

function showLegend(min, max, tertile1, tertile2) {
    const legend = document.getElementById('mapLegend');
    
    legend.style.display = 'block';
    legend.innerHTML = `
        <div style="font-weight: 500; margin-bottom: 8px; color: #e0e0e0;">Performance Tertiles (%)</div>
        <div class="legend-item">
            <div class="legend-color" style="background: #4caf50;"></div>
            <span>Top (${tertile2.toFixed(1)} - ${max.toFixed(1)})</span>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background: #ffeb3b;"></div>
            <span>Middle (${tertile1.toFixed(1)} - ${tertile2.toFixed(1)})</span>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background: #f44336;"></div>
            <span>Bottom (${min.toFixed(1)} - ${tertile1.toFixed(1)})</span>
        </div>
    `;
}