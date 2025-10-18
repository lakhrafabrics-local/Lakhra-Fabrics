// Default State Structure
const defaultState = {
    activeSection: 'dashboard',
    yarnItems: [{ quantity: '', description: '', packing: '', weight: 0 }],
    yarnPartyName: '',
    yarnDate: new Date().toISOString().split('T')[0],
    yarnInvoiceNo: '0001', 
    knittingItems: [{ type: 'Cartoons', quantity: '', description: '', weight: '' }],
    knitterName: '',
    knittingDate: new Date().toISOString().split('T')[0],
    knittingChallanNo: '00012', 
    receiptRolls: [{ noOfRolls: '', weightReceived: '' }],
    receiptKnitterName: '',
    receiptDate: new Date().toISOString().split('T')[0],
    receiptChallanNo: '00012', 
    netReceivable: 0, 
    dyingItems: [{ type: 'Rolls', quantity: '', description: '', weight: '' }],
    dyingKnitterName: '', 
    dyingDate: new Date().toISOString().split('T')[0],
    dyingChallanNo: '00001', 
    dyedReceiptRolls: [{ noOfRolls: '', weightReceived: '' }],
    dyedReceiptKnitterName: '', 
    dyedReceiptDate: new Date().toISOString().split('T')[0],
    dyedReceiptChallanNo: '00001', 
    dyedNetReceivable: 0,
    searchType: 'challanNo',
    searchValue: '',
    searchResults: [],
    filterDocType: 'All',
    documentTypes: [
        { value: 'All', label: 'All Documents' },
        { value: 'yarnPurchases', label: 'Yarn Purchases' },
        { value: 'knittingChallans', label: 'Knitting Challans' },
        { value: 'greyReceipts', label: 'Grey Receipts' },
        { value: 'dyingChallans', label: 'Dying Challans' },
        { value: 'dyedReceipts', label: 'Dyed Receipts' }
    ]
};

// Initialize state from localStorage or use default
let state = JSON.parse(localStorage.getItem('appState')) || defaultState;

// Ensure new state properties exist on load
Object.keys(defaultState).forEach(key => {
    if (state[key] === undefined) {
        state[key] = defaultState[key];
    }
});

// Persistence function
function persistState() {
    const stateToPersist = { ...state, activeSection: 'dashboard', searchResults: [] };
    localStorage.setItem('appState', JSON.stringify(stateToPersist));
}

// Export state and functions
window.state = state;
window.defaultState = defaultState;
window.persistState = persistState;