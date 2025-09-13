// Data loading functionality
function loadData() {
    console.log('Starting data load...');
    Promise.all([
        fetch('./dashboard_files/nfhs_indicator_categories.json').then(r => r.json()),
        fetch('./dashboard_files/master_nfhs_data.json').then(r => r.json()),
        fetch('./dashboard_files/tn_district.geojson').then(r => r.json())
    ]).then(([categories, nfhs, geojson]) => {
        console.log('All data loaded successfully');
        categoriesData = categories;
        nfhsData = nfhs;
        geoJsonData = geojson;
        dataLoaded = true;
        
        // Render categories after data is loaded
        setTimeout(() => {
            console.log('Rendering categories...');
            renderCategoryTree();
            if (map) {
                loadDefaultDistricts();
            }
        }, 100);
        
    }).catch(error => {
        console.error('Error loading data:', error);
        dataLoaded = false;
        // Retry after 2 seconds
        setTimeout(loadData, 2000);
    });
}
