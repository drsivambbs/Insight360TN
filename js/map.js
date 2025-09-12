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
    
    const values = chartData.map(d => d[1]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    if (geoJsonLayer) {
        map.removeLayer(geoJsonLayer);
    }
    
    geoJsonLayer = L.geoJSON(geoJsonData, {
        style: function(feature) {
            const districtName = feature.properties.District;
            const mappedDistrict = districtMapping[districtName] || districtName;
            const districtData = chartData.find(d => d[0] === mappedDistrict);
            const value = districtData ? districtData[1] : 0;
            const intensity = (value - min) / (max - min);
            
            return {
                fillColor: getColor(intensity),
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
    
    showLegend(min, max);
}

function getColor(intensity) {
    if (intensity <= 0.33) return '#4caf50';  // Green - Top quartile
    if (intensity <= 0.66) return '#ffeb3b';  // Yellow - Middle quartile
    return '#f44336';  // Red - Low quartile
}

function showLegend(min, max) {
    const legend = document.getElementById('mapLegend');
    const range = max - min;
    const topThreshold = min + (range * 0.66);
    const midThreshold = min + (range * 0.33);
    
    legend.style.display = 'block';
    legend.innerHTML = `
        <div style="font-weight: 500; margin-bottom: 8px; color: #e0e0e0;">Performance Scale (%)</div>
        <div class="legend-item">
            <div class="legend-color" style="background: #4caf50;"></div>
            <span>Top (${topThreshold.toFixed(1)} - ${max.toFixed(1)})</span>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background: #ffeb3b;"></div>
            <span>Middle (${midThreshold.toFixed(1)} - ${topThreshold.toFixed(1)})</span>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background: #f44336;"></div>
            <span>Low (${min.toFixed(1)} - ${midThreshold.toFixed(1)})</span>
        </div>
    `;
}