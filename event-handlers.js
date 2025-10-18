// Event Handlers and State Mutators

function changeSection(section) {
    if(state.activeSection === 'dashboard' && section !== 'dashboard') {
        history.pushState({ section: state.activeSection }, '', `#${section}`);
    } else if (section === 'dashboard') {
        history.replaceState({ section: 'dashboard' }, '', '#dashboard');
    } else {
         history.pushState({ section: section }, '', `#${section}`);
    }

    state.activeSection = section;
    persistState(); 
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Yarn Item Handlers
function updateYarnItem(index, field, value) {
    if (field === 'quantity' || field === 'packing') {
        state.yarnItems[index][field] = sanitizeInput(value, true);
    } else {
        state.yarnItems[index][field] = sanitizeInput(value, false);
    }
    
    const q = state.yarnItems[index].quantity;
    const p = state.yarnItems[index].packing;
    state.yarnItems[index].weight = calculateYarnWeight(q, p);
    
    persistState();
    render();
}

function addYarnItem() {
    state.yarnItems.push({ quantity: '', description: '', packing: '', weight: 0 });
    persistState();
    render();
}

function removeYarnItem(index) {
    state.yarnItems.splice(index, 1);
    if (state.yarnItems.length === 0) addYarnItem(); 
    persistState();
    render();
}

// Knitting Item Handlers
function updateKnittingItem(index, field, value) {
    if (field === 'quantity' || field === 'weight') {
        state.knittingItems[index][field] = sanitizeInput(value, true);
    } else {
        state.knittingItems[index][field] = sanitizeInput(value, false);
    }
    persistState();
    render();
}

function addKnittingItem() {
    state.knittingItems.push({ type: 'Cartoons', quantity: '', description: '', weight: '' });
    persistState();
    render();
}

function removeKnittingItem(index) {
    state.knittingItems.splice(index, 1);
    if (state.knittingItems.length === 0) addKnittingItem(); 
    persistState();
    render();
}

// Receipt Roll Handlers
function updateReceiptRoll(index, field, value) {
    state.receiptRolls[index][field] = sanitizeInput(value, true);
    persistState();
    render();
}

function addReceiptRoll() {
    state.receiptRolls.push({ noOfRolls: '', weightReceived: '' });
    persistState();
    render();
}

function removeReceiptRoll(index) {
    state.receiptRolls.splice(index, 1);
    if (state.receiptRolls.length === 0) addReceiptRoll(); 
    persistState();
    render();
}

// Dying Item Handlers
function updateDyingItem(index, field, value) {
    if (field === 'quantity' || field === 'weight') {
        state.dyingItems[index][field] = sanitizeInput(value, true);
    } else {
        state.dyingItems[index][field] = sanitizeInput(value, false);
    }
    persistState();
    render();
}

function addDyingItem() {
    state.dyingItems.push({ type: 'Rolls', quantity: '', description: '', weight: '' });
    persistState();
    render();
}

function removeDyingItem(index) {
    state.dyingItems.splice(index, 1);
    if (state.dyingItems.length === 0) addDyingItem(); 
    persistState();
    render();
}

// Dyed Receipt Roll Handlers
function updateDyedReceiptRoll(index, field, value) {
    state.dyedReceiptRolls[index][field] = sanitizeInput(value, true);
    persistState();
    render();
}

function addDyedReceiptRoll() {
    state.dyedReceiptRolls.push({ noOfRolls: '', weightReceived: '' });
    persistState();
    render();
}

function removeDyedReceiptRoll(index) {
    state.dyedReceiptRolls.splice(index, 1);
    if (state.dyedReceiptRolls.length === 0) addDyedReceiptRoll(); 
    persistState();
    render();
}

// Export functions to global scope
window.changeSection = changeSection;
window.updateYarnItem = updateYarnItem;
window.addYarnItem = addYarnItem;
window.removeYarnItem = removeYarnItem;
window.updateKnittingItem = updateKnittingItem;
window.addKnittingItem = addKnittingItem;
window.removeKnittingItem = removeKnittingItem;
window.updateReceiptRoll = updateReceiptRoll;
window.addReceiptRoll = addReceiptRoll;
window.removeReceiptRoll = removeReceiptRoll;
window.updateDyingItem = updateDyingItem;
window.addDyingItem = addDyingItem;
window.removeDyingItem = removeDyingItem;
window.updateDyedReceiptRoll = updateDyedReceiptRoll;
window.addDyedReceiptRoll = addDyedReceiptRoll;
window.removeDyedReceiptRoll = removeDyedReceiptRoll;