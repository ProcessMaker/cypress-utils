export default {
    // Tabs - Using more specific nav/tab selectors
    linkedInstancesTab: '.nav-tabs .nav-item:nth-child(1)',
    localBundlesTab: '.nav-tabs .nav-item:nth-child(2)',
    sharedAssetsTab: '.nav-tabs .nav-item:nth-child(3)',
    
    // Buttons - Using button text and class combinations
    addInstanceButton: '.top-options button:contains("Add Instance"), [id="devlink"] .top-options button.btn-primary',
    createBundleButton: 'button.btn-secondary:contains("Create Bundle")',
    accessTokenButton: 'button:contains("Access Token")',
    
    // Modal fields - Using modal-specific selectors
    instanceModal: {
        title: '.modal-title',
        urlField: '.modal-body input[type="url"]',
        nameField: '.modal-body input[name="name"]',
        descriptionField: '.modal-body textarea[name="description"]'
    },
    
    // Search - Using common search input attributes
    searchField: 'input[type="search"], input[placeholder*="Search"]',
    
    // Table - Using table structure selectors
    tableHeaders: 'table > thead > tr > th',
    
    // Messages - Using content-specific selectors
    noLinkedInstancesMsg: '.alert:contains("No linked instances")',
    noBundlesMsg: '.alert:contains("No bundles")',
    sharedAssetsMsg: '.alert:contains("Shared assets")',
    
    // Breadcrumb - Using standard breadcrumb classes
    breadcrumb: '.breadcrumb, nav[aria-label="breadcrumb"]'
}