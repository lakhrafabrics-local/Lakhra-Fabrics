// Utility Functions

function calculateYarnWeight(quantity, packing) {
    const q = parseFloat(quantity) || 0;
    const p = parseFloat(packing) || 0;
    return q * p;
}

function sanitizeInput(value, isNumber = false) {
    if (isNumber) {
        const num = parseFloat(value);
        return isNaN(num) ? '' : num;
    }
    return String(value || '').trim();
}

function getTotalYarnWeight() {
    return state.yarnItems.reduce((sum, item) => sum + (parseFloat(item.weight) || 0), 0).toFixed(2);
}

function getTotalKnittingWeight() {
    return state.knittingItems.reduce((sum, item) => sum + (parseFloat(item.weight) || 0), 0).toFixed(2);
}

function getTotalDyingWeight() {
    return state.dyingItems.reduce((sum, item) => sum + (parseFloat(item.weight) || 0), 0).toFixed(2);
}

function getGrossTotal() {
    return parseFloat(getTotalKnittingWeight());
}

function getNetReceivable() {
    const gross = getGrossTotal();
    const WASTAGE_RATE = 0.01; 
    const wastage = gross * WASTAGE_RATE;
    return (gross - wastage).toFixed(2);
}

function getDyingNetReceivable() {
    const gross = parseFloat(getTotalDyingWeight());
    const WASTAGE_RATE = 0.0; 
    const wastage = gross * WASTAGE_RATE;
    return (gross - wastage).toFixed(2);
}

function getTotalWeightReceived() {
    return state.receiptRolls.reduce((sum, roll) => sum + (parseFloat(roll.weightReceived) || 0), 0).toFixed(2);
}

function getTotalDyedWeightReceived() {
    return state.dyedReceiptRolls.reduce((sum, roll) => sum + (parseFloat(roll.weightReceived) || 0), 0).toFixed(2);
}

function getBalanceReceivable() {
    const netRec = parseFloat(state.netReceivable) || 0;
    const totalRec = parseFloat(getTotalWeightReceived());
    return (netRec - totalRec).toFixed(2);
}

function getDyedBalanceReceivable() {
    const netRec = parseFloat(state.dyedNetReceivable) || 0;
    const totalRec = parseFloat(getTotalDyedWeightReceived());
    return (netRec - totalRec).toFixed(2);
}

function getDyedWastagePercentage() {
    const receivable = parseFloat(state.dyedNetReceivable);
    const received = parseFloat(getTotalDyedWeightReceived());
    if (receivable <= 0) return '0.00';
    const difference = receivable - received;
    const percentage = (difference / receivable) * 100;
    return percentage.toFixed(2);
}

// Export functions
window.calculateYarnWeight = calculateYarnWeight;
window.sanitizeInput = sanitizeInput;
window.getTotalYarnWeight = getTotalYarnWeight;
window.getTotalKnittingWeight = getTotalKnittingWeight;
window.getTotalDyingWeight = getTotalDyingWeight;
window.getGrossTotal = getGrossTotal;
window.getNetReceivable = getNetReceivable;
window.getDyingNetReceivable = getDyingNetReceivable;
window.getTotalWeightReceived = getTotalWeightReceived;
window.getTotalDyedWeightReceived = getTotalDyedWeightReceived;
window.getBalanceReceivable = getBalanceReceivable;
window.getDyedBalanceReceivable = getDyedBalanceReceivable;
window.getDyedWastagePercentage = getDyedWastagePercentage;