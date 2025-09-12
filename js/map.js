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
            
            if (showLabels && labelType === 'district') {
                layer.bindTooltip(districtName, { permanent: true, direction: 'center', className: 'district-label' });
            }
        }
    }).addTo(map);
}

function loadMapData(indicator) {
    if (!map || !geoJsonData) return;
    
    currentIndicator = indicator;
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
            
            if (showLabels) {
                const labelText = labelType === 'district' ? districtName : (value !== 'No data' ? `${value}%` : 'N/A');
                layer.bindTooltip(labelText, { permanent: true, direction: 'center', className: 'district-label' });
            }
        }
    }).addTo(map);
    
    showLegend(Math.min(...values), Math.max(...values), tertile1, tertile2);
}

function getColor(value, tertile1, tertile2) {
    if (value === 0 || value === null || value === undefined) return '#757575';  // Grey - No data
    if (value >= tertile2) return '#4caf50';  // Green - Top tertile
    if (value >= tertile1) return '#ffeb3b';  // Yellow - Middle tertile
    return '#f44336';  // Red - Bottom tertile
}

function showLegend(min, max, tertile1, tertile2) {
    const legend = document.getElementById('mapLegend');
    
    legend.style.display = 'block';
    legend.innerHTML = `
        <div class="legend-header">
            <span class="material-icons">palette</span>
            Legend
        </div>
        <div class="legend-items">
            <div class="legend-item">
                <div class="legend-color" style="background: #4caf50;"></div>
                <div class="legend-text">
                    <div class="legend-label">High</div>
                    <div class="legend-range">${tertile2.toFixed(1)} - ${max.toFixed(1)}%</div>
                </div>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background: #ffeb3b;"></div>
                <div class="legend-text">
                    <div class="legend-label">Medium</div>
                    <div class="legend-range">${tertile1.toFixed(1)} - ${tertile2.toFixed(1)}%</div>
                </div>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background: #f44336;"></div>
                <div class="legend-text">
                    <div class="legend-label">Low</div>
                    <div class="legend-range">${min.toFixed(1)} - ${tertile1.toFixed(1)}%</div>
                </div>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background: #757575;"></div>
                <div class="legend-text">
                    <div class="legend-label">No Data</div>
                    <div class="legend-range">Data unavailable</div>
                </div>
            </div>
        </div>
    `;
}