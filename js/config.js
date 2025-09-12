// Global variables and configuration
let categoriesData = {}, nfhsData = {}, geoJsonData = {}, selectedIndicator = null, activeSurvey = 'nfhs4', map = null;

// District mapping for newly formed districts
const districtMapping = {
    'Chengalpattu': 'Kanchipuram',
    'Kallakurichi': 'Villupuram',
    'Mayiladuthurai': 'Nagapattinam',
    'Ranipet': 'Vellore',
    'Tenkasi': 'Tirunelveli',
    'Tirupathur': 'Vellore'
};

let geoJsonLayer = null;
let showLabels = true;
let labelType = 'district';
let currentIndicator = null;