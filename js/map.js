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
    const colors = ['#ffebee', '#ffcdd2', '#ef9a9a', '#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c'];
    return colors[Math.floor(intensity * (colors.length - 1))];
}

function showLegend(min, max) {
    const legend = document.getElementById('mapLegend');
    legend.style.display = 'block';
    legend.innerHTML = `
        <div style="font-weight: 500; margin-bottom: 8px; color: #333;">Performance Scale (%)</div>
        <div class="legend-item">
            <div class="legend-color" style="background: #b71c1c;"></div>
            <span>High (${max.toFixed(1)})</span>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background: #ef5350;"></div>
            <span>Medium</span>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background: #ffebee;"></div>
            <span>Low (${min.toFixed(1)})</span>
        </div>
    `;
}