// Data loading functionality
function loadData() {
    Promise.all([
        fetch('./dashboard_files/nfhs_indicator_categories.json').then(r => r.json()),
        fetch('./dashboard_files/master_nfhs_data.json').then(r => r.json()),
        fetch('./dashboard_files/tn_district.geojson').then(r => r.json())
    ]).then(([categories, nfhs, geojson]) => {
        categoriesData = categories;
        nfhsData = nfhs;
        geoJsonData = geojson;
        renderCategoryTree();
        if (map) {
            loadDefaultDistricts();
        }
    }).catch(error => console.error('Error loading data:', error));
}