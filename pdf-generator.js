// PDF Generation and Watermark Functions

function addWatermark() {
    const printArea = document.querySelector('.print-area');
    if (printArea) {
        const watermark = document.createElement('div');
        watermark.className = 'watermark';
        watermark.id = 'print-watermark'; 
        watermark.textContent = 'NOT VALID FOR COURT OR LEGAL PURPOSE';
        printArea.style.position = 'relative'; 
        printArea.appendChild(watermark);
    }
}

function removeWatermark() {
    const watermark = document.getElementById('print-watermark');
    if (watermark) {
        const printArea = document.querySelector('.print-area');
        if(printArea) {
            printArea.style.position = '';
        }
        watermark.remove();
    }
}

function promptShare(fileName) {
    if (navigator.share) {
        navigator.share({
            title: fileName,
            text: `Sharing Lakhra Fabrics Document: ${fileName}`,
        })
        .catch((error) => {
            if (error.name !== 'AbortError') {
                console.error('Error sharing:', error);
                alert(`PDF "${fileName}" saved successfully! Please find it in your device Downloads folder to share via WhatsApp.`);
            }
        });
    } else {
        alert(`PDF "${fileName}" saved successfully! Please find it in your device Downloads folder to share via WhatsApp.`);
    }
}

async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const element = document.querySelector('.print-area');
    
    if (!element) return alert('Cannot generate PDF: Print area not found.');

    document.body.classList.add('is-printing'); 
    addWatermark();

    try {
        const partyNameContainer = element.querySelector('.party-name-container');
        const partyNameValue = element.querySelector('.party-name-value');
        
        const originalPartyDisplay = partyNameContainer ? partyNameContainer.style.display : null;
        if (partyNameContainer && partyNameValue && partyNameValue.value.trim() === '') {
            partyNameContainer.style.display = 'none';
        }

        const canvas = await html2canvas(element, {
            scale: 3, 
            useCORS: true,
            logging: false
        });

        if (partyNameContainer) {
            partyNameContainer.style.display = originalPartyDisplay;
        }
        
        removeWatermark();
        document.body.classList.remove('is-printing');
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= -10) { 
            position = height Left - imgHeight;
pdf.addPage();
pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
heightLeft -= pageHeight;
}
const rawFileName = state.activeSection === 'yarn' ? `Yarn_Invoice_${state.yarnInvoiceNo}_${state.yarnPartyName || 'Party'}.pdf` :
                    state.activeSection === 'knitting' ? `Knitting_Challan_${state.knittingChallanNo}_${state.knitterName || 'Knitter'}.pdf` :
                    state.activeSection === 'receipt' ? `Grey_Receipt_${state.receiptChallanNo}_${state.receiptKnitterName || 'Knitter'}.pdf` :
                    state.activeSection === 'dying' ? `Dying_Challan_${state.dyingChallanNo}_${state.dyingKnitterName || 'Dyer'}.pdf` :
                    `Dyed_Receipt_${state.dyedReceiptChallanNo}_${state.dyedReceiptKnitterName || 'Dyer'}.pdf`;
    
    const sanitizedFileName = rawFileName.replace(/\s/g, '_').replace(/[^a-zA-Z0-9_\-\.]/g, '');
    
    pdf.save(sanitizedFileName); 
    promptShare(sanitizedFileName); 
} catch (error) {
    console.error('Error generating PDF:', error);
    removeWatermark();
    document.body.classList.remove('is-printing');
    alert('Error generating PDF. Please ensure all details are correct and try again. Alternatively, use the Print option.');
}
}
window.printDocument = function() {
const printArea = document.querySelector('.print-area');
if (!printArea) return;
const partyNameContainer = printArea.querySelector('.party-name-container');
const partyNameValue = partyNameContainer ? partyNameContainer.querySelector('.party-name-value') : null;

const originalPartyDisplay = partyNameContainer ? partyNameContainer.style.display : null;
let shouldHideParty = false;
if (partyNameContainer && partyNameValue && partyNameValue.value.trim() === '') {
    partyNameContainer.style.display = 'none';
    shouldHideParty = true;
}

addWatermark();

setTimeout(() => {
    window.print();
    removeWatermark();
    if (shouldHideParty) {
       if (partyNameContainer) partyNameContainer.style.display = originalPartyDisplay;
    }
}, 50);
}
// Export functions
window.addWatermark = addWatermark;
window.removeWatermark = removeWatermark;
window.generatePDF = generatePDF;
### 8. js/event-handlers.js

```javascript
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

// Export functions
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