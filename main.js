// Main Application Logic and Render Function

window.render = function() {
    const app = document.getElementById('app');
    let mainContent = '';

    switch (state.activeSection) {
        case 'yarn':
            mainContent = renderYarnPurchase();
            break;
        case 'knitting':
            mainContent = renderKnittingChallan();
            break;
        case 'receipt':
            mainContent = renderGreyReceipt();
            break;
        case 'dying': 
            mainContent = renderDyingChallan();
            break;
        case 'dyedReceipt': 
            mainContent = renderDyedReceipt();
            break;
        case 'customers':
            mainContent = renderCustomers();
            break;
        case 'dashboard':
        default:
            mainContent = renderDashboard();
            break;
    }
    
    // Get title for the header
    const headerTitle = state.activeSection === 'yarn' ? 'Yarn Purchase Invoice' :
                        state.activeSection === 'knitting' ? 'Knitting Challan' :
                        state.activeSection === 'receipt' ? 'Grey Fabric Receipt' :
                        state.activeSection === 'dying' ? 'Dying Challan' :
                        state.activeSection === 'dyedReceipt' ? 'Dyed Fabric Receipt' :
                        state.activeSection === 'customers' ? 'Document History' :
                        'Lakhra Fabrics Dashboard';

    app.innerHTML = `
        <div class="container-mobile">
            ${renderHeader(headerTitle)}
            ${mainContent}
        </div>
    `;
}

// Browser history management
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.section) {
        state.activeSection = event.state.section;
        persistState();
        render();
    } else if (location.hash === '' || location.hash === '#dashboard') {
        if (state.activeSection !== 'dashboard') {
            state.activeSection = 'dashboard';
            persistState();
            render();
        }
    } else {
        if (state.activeSection !== 'dashboard') {
            changeSection('dashboard');
        }
    }
});

// Initial load and setup
document.addEventListener('DOMContentLoaded', () => {
    // Handle initial hash/route
    if (location.hash === '' || location.hash === '#dashboard') {
        history.replaceState({ section: 'dashboard' }, '', '#dashboard');
    } else {
         const hashSection = location.hash.substring(1);
         if (hashSection) {
             state.activeSection = hashSection;
             history.replaceState({ section: hashSection }, '', location.hash);
         }
    }
    
    // Load next document numbers from Firebase and render
    loadNextNumbers().then(render); 
});