// Map functionality
function initMap() {
    map = L.map('map').setView([10.8, 78.6569], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add home button
    const homeButton = L.control({ position: 'topleft' });
    homeButton.onAdd = function() {
        const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        div.innerHTML = '<span class="material-icons" style="font-size: 18px; padding: 5px; cursor: pointer; background: white; border-radius: 2px;">home</span>';
        div.onclick = function() {
            map.setView([10.8, 78.6569], 7);
        };
        return div;
    };
    homeButton.addTo(map);
    
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

async function loadMapData(indicator) {
    if (!map || !geoJsonData) return;
    
    currentIndicator = indicator;
    await loadIndicatorCategories();
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
                fillColor: getColor(value, tertile1, tertile2, indicator),
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
    
    showLegend(Math.min(...values), Math.max(...values), tertile1, tertile2, indicator);
}

function getColor(value, tertile1, tertile2, indicatorName) {
    const indicatorType = getIndicatorType(indicatorName);
    return getMapColor(value, tertile1, tertile2, indicatorType);
}

function showLegend(min, max, tertile1, tertile2, indicator) {
    const legend = document.getElementById('mapLegend');
    const indicatorType = getIndicatorType(indicator);
    
    let labels, ranges;
    if (indicatorType === 'Negative') {
        labels = ['Best', 'Medium', 'Worst'];
        ranges = [
            `${min.toFixed(1)} - ${tertile1.toFixed(1)}%`,
            `${tertile1.toFixed(1)} - ${tertile2.toFixed(1)}%`,
            `${tertile2.toFixed(1)} - ${max.toFixed(1)}%`
        ];
    } else {
        labels = ['Best', 'Medium', 'Worst'];
        ranges = [
            `${tertile2.toFixed(1)} - ${max.toFixed(1)}%`,
            `${tertile1.toFixed(1)} - ${tertile2.toFixed(1)}%`,
            `${min.toFixed(1)} - ${tertile1.toFixed(1)}%`
        ];
    }
    
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
                    <div class="legend-label">${labels[0]}</div>
                    <div class="legend-range">${ranges[0]}</div>
                </div>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background: #ffeb3b;"></div>
                <div class="legend-text">
                    <div class="legend-label">${labels[1]}</div>
                    <div class="legend-range">${ranges[1]}</div>
                </div>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background: #f44336;"></div>
                <div class="legend-text">
                    <div class="legend-label">${labels[2]}</div>
                    <div class="legend-range">${ranges[2]}</div>
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