// Firebase Operations

async function loadNextNumbers() {
    try {
        const yarnQuery = await db.collection('yarnPurchases').orderBy('createdAt', 'desc').limit(1).get();
        if (!yarnQuery.empty) {
            const lastInvoice = yarnQuery.docs[0].data().invoiceNo;
            state.yarnInvoiceNo = String(parseInt(lastInvoice) + 1).padStart(4, '0');
        } else {
            state.yarnInvoiceNo = defaultState.yarnInvoiceNo;
        }

        const knittingQuery = await db.collection('knittingChallans').orderBy('createdAt', 'desc').limit(1).get();
        if (!knittingQuery.empty) {
            const lastChallan = knittingQuery.docs[0].data().challanNo;
            state.knittingChallanNo = String(parseInt(lastChallan) + 1).padStart(5, '0');
        } else {
            state.knittingChallanNo = defaultState.knittingChallanNo;
        }

        const dyingQuery = await db.collection('dyingChallans').orderBy('createdAt', 'desc').limit(1).get();
        if (!dyingQuery.empty) {
            const lastChallan = dyingQuery.docs[0].data().challanNo;
            state.dyingChallanNo = String(parseInt(lastChallan) + 1).padStart(5, '0');
        } else {
            state.dyingChallanNo = defaultState.dyingChallanNo;
        }

    } catch (error) {
        console.warn("Could not load latest numbers from Firebase. Using defaults.", error);
    }
    if(state.activeSection === 'dashboard') render();
}

async function saveYarnPurchase() {
    if (!state.yarnPartyName) return alert('Please enter the Party Name.');
    if (state.yarnItems.every(item => item.quantity === '' && item.description === '')) return alert('Please add at least one item.');

    try {
        await db.collection('yarnPurchases').add({
            invoiceNo: state.yarnInvoiceNo,
            date: state.yarnDate,
            partyName: state.yarnPartyName,
            items: state.yarnItems.filter(item => item.quantity > 0),
            totalWeight: getTotalYarnWeight(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert(`Yarn Purchase Invoice ${state.yarnInvoiceNo} saved successfully!`);
        changeSection('dashboard');
        await loadNextNumbers();
        state.yarnItems = [{ quantity: '', description: '', packing: '', weight: 0 }];
        state.yarnPartyName = '';
        persistState();
        render();
    } catch (error) {
        console.error('Error saving Yarn Purchase:', error);
        alert('Error saving purchase: ' + error.message);
    }
}

async function saveKnittingChallan() {
    if (!state.knitterName) return alert('Please enter the Knitter Name.');
    if (state.knittingItems.every(item => item.quantity === '' && item.description === '')) return alert('Please add at least one yarn item.');

    try {
        const netRec = getNetReceivable();
        await db.collection('knittingChallans').add({
            challanNo: state.knittingChallanNo,
            date: state.knittingDate,
            knitterName: state.knitterName,
            items: state.knittingItems.filter(item => item.quantity > 0),
            grossTotal: getGrossTotal(),
            netReceivable: netRec,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert(`Knitting Challan ${state.knittingChallanNo} saved successfully! Net Receivable: ${netRec} kg`);
        changeSection('dashboard');
        await loadNextNumbers();
        state.netReceivable = parseFloat(netRec); 
        state.knittingItems = [{ type: 'Cartoons', quantity: '', description: '', weight: '' }];
        state.knitterName = '';
        persistState();
        render();
    } catch (error) {
        console.error('Error saving Knitting Challan:', error);
        alert('Error saving challan: ' + error.message);
    }
}

async function saveGreyReceipt() {
    if (!state.receiptKnitterName) return alert('Please enter the Knitter Name.');
    if (!state.receiptChallanNo || String(state.receiptChallanNo) === defaultState.receiptChallanNo) return alert('Please link to a valid Challan No.');
    if (state.receiptRolls.every(roll => roll.noOfRolls === '' && roll.weightReceived === '')) return alert('Please add at least one roll receipt.');

    try {
        await db.collection('greyReceipts').add({
            challanNo: state.receiptChallanNo,
            date: state.receiptDate,
            knitterName: state.receiptKnitterName,
            rolls: state.receiptRolls.filter(roll => roll.noOfRolls > 0 || roll.weightReceived > 0),
            totalReceived: getTotalWeightReceived(),
            netReceivable: state.netReceivable,
            balance: getBalanceReceivable(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert(`Grey Fabric Receipt for Challan ${state.receiptChallanNo} saved successfully! Balance: ${getBalanceReceivable()} kg`);
        changeSection('dashboard');
        state.receiptRolls = [{ noOfRolls: '', weightReceived: '' }];
        state.receiptKnitterName = '';
        state.netReceivable = 0;
        state.receiptChallanNo = defaultState.receiptChallanNo;
        persistState();
        render();
    } catch (error) {
        console.error('Error saving Grey Receipt:', error);
        alert('Error saving receipt: ' + error.message);
    }
}

async function saveDyingChallan() {
    if (!state.dyingKnitterName) return alert('Please enter the Dyer Name.');
    if (state.dyingItems.every(item => item.quantity === '' && item.description === '')) return alert('Please add at least one grey fabric item.');

    try {
        const netRec = getDyingNetReceivable();
        await db.collection('dyingChallans').add({
            challanNo: state.dyingChallanNo,
            date: state.dyingDate,
            knitterName: state.dyingKnitterName, 
            items: state.dyingItems.filter(item => item.quantity > 0),
            grossTotal: getTotalDyingWeight(),
            netReceivable: netRec,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert(`Dying Job Work Challan ${state.dyingChallanNo} saved successfully! Net Receivable: ${netRec} kg`);
        changeSection('dashboard');
        await loadNextNumbers();
        state.dyedNetReceivable = parseFloat(netRec); 
        state.dyingItems = [{ type: 'Rolls', quantity: '', description: '', weight: '' }];
        state.dyingKnitterName = '';
        persistState();
        render();
    } catch (error) {
        console.error('Error saving Dying Challan:', error);
        alert('Error saving challan: ' + error.message);
    }
}

async function saveDyedReceipt() {
    if (!state.dyedReceiptKnitterName) return alert('Please enter the Dyer Name.');
    if (!state.dyedReceiptChallanNo || String(state.dyedReceiptChallanNo) === defaultState.dyedReceiptChallanNo) return alert('Please link to a valid Challan No.');
    if (state.dyedReceiptRolls.every(roll => roll.noOfRolls === '' && roll.weightReceived === '')) return alert('Please add at least one roll receipt.');

    try {
        await db.collection('dyedReceipts').add({
            challanNo: state.dyedReceiptChallanNo,
            date: state.dyedReceiptDate,
            knitterName: state.dyedReceiptKnitterName, 
            rolls: state.dyedReceiptRolls.filter(roll => roll.noOfRolls > 0 || roll.weightReceived > 0),
            totalReceived: getTotalDyedWeightReceived(),
            netReceivable: state.dyedNetReceivable,
            balance: getDyedBalanceReceivable(),
            wastagePercentage: getDyedWastagePercentage(), 
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert(`Dyed Finish Fabric Receipt for Challan ${state.dyedReceiptChallanNo} saved successfully! Balance: ${getDyedBalanceReceivable()} kg`);
        changeSection('dashboard');
        state.dyedReceiptRolls = [{ noOfRolls: '', weightReceived: '' }];
        state.dyedReceiptKnitterName = '';
        state.dyedNetReceivable = 0;
        state.dyedReceiptChallanNo = defaultState.dyedReceiptChallanNo;
        persistState();
        render();
    } catch (error) {
        console.error('Error saving Dyed Receipt:', error);
        alert('Error saving receipt: ' + error.message);
    }
}

async function searchDocuments() {
    const searchType = state.searchType;
    const searchValue = state.searchValue.trim();
    const filterDocType = state.filterDocType;
    
    state.searchResults = [];
    render();
    const resultsDiv = document.getElementById('searchResults');
    if (resultsDiv) resultsDiv.innerHTML = '<div class="text-center py-4 text-orange-500 text-sm">Searching...</div>';

    const collections = filterDocType === 'All' 
        ? ['yarnPurchases', 'knittingChallans', 'greyReceipts', 'dyingChallans', 'dyedReceipts']
        : [filterDocType];

    let allResults = [];
    
    try {
        for (const collection of collections) {
            let currentSearchField = searchType;

            if (searchType === 'partyName') {
                currentSearchField = collection === 'yarnPurchases' ? 'partyName' : 'knitterName';
            } else if (searchType === 'challanNo') {
                currentSearchField = collection === 'yarnPurchases' ? 'invoiceNo' : 'challanNo';
            }
            
            let query = db.collection(collection).orderBy('createdAt', 'desc');

            if (searchValue) {
                query = db.collection(collection).where(currentSearchField, '==', searchValue);
            }
            
            const snapshot = await query.get();
            snapshot.forEach(doc => {
                if (!searchValue || String(doc.data()[currentSearchField]) === searchValue) {
                    allResults.push({ id: doc.id, collection: collection, ...doc.data(), date: doc.data().date || 'N/A' });
                }
            });
        }

        state.searchResults = allResults;
        render();

    } catch (error) {
        console.error("Error searching documents:", error);
        state.searchResults = [];
        if (resultsDiv) resultsDiv.innerHTML = '<div class="text-center py-4 text-red-500 text-sm">Error searching documents.</div>';
        render();
    }
}

function viewDocument(collection, docId) {
    alert(`VIEW/EDIT Functionality (STUB): This feature would fetch the document data from Firestore (${collection}/${docId}), load it into the form state, and switch to the relevant form view for editing.`);
}

function generatePDFForDoc(collection, docId) {
    alert(`PDF Generation (STUB): This feature would fetch the saved document data (${collection}/${docId}), temporarily populate the state with it, call 'generatePDF()', and then revert the state.`);
}

async function deleteDocument(collection, docId) {
    if (confirm(`Are you sure you want to PERMANENTLY delete the document with ID: ${docId} from ${collection}?`)) {
        try {
            await db.collection(collection).doc(docId).delete();
            alert("Document deleted successfully!");
            state.searchResults = state.searchResults.filter(doc => doc.id !== docId || doc.collection !== collection);
            render(); 
        } catch (error) {
            console.error("Error deleting document:", error);
            alert("Error deleting document: " + error.message);
        }
    }
}

// Export functions
window.loadNextNumbers = loadNextNumbers;
window.saveYarnPurchase = saveYarnPurchase;
window.saveKnittingChallan = saveKnittingChallan;
window.saveGreyReceipt = saveGreyReceipt;
window.saveDyingChallan = saveDyingChallan;
window.saveDyedReceipt = saveDyedReceipt;
window.searchDocuments = searchDocuments;
window.viewDocument = viewDocument;
window.generatePDFForDoc = generatePDFForDoc;
window.deleteDocument = deleteDocument;