// Rendering Functions

function renderHeader(title) {
    const historyButton = state.activeSection === 'dashboard'
        ? `<button onclick="changeSection('customers')" class="text-orange-500 hover:text-orange-700 font-bold text-sm no-print flex items-center p-2 rounded-lg bg-white shadow-md">
            <span class="mr-1">📜</span> All Documents
           </button>`
        : `<button onclick="changeSection('dashboard')" class="text-blue-500 hover:text-blue-700 font-bold text-sm no-print flex items-center p-2 rounded-lg bg-white shadow-md">
            <span class="mr-1">🏠</span> Home
           </button>`;

    return `
        <div class="bg-white rounded-lg shadow-xl p-4 mb-4 flex justify-between items-center no-print">
            <div>
                <h1 class="text-xl font-bold text-blue-800">${title}</h1>
                <p class="text-gray-600 text-xs mt-1">Lakhra Fabrics Mgt System</p>
            </div>
            ${historyButton}
        </div>
    `;
}

function renderDashboard() {
    return `
        <div class="space-y-4">
            <div class="bg-white p-4 rounded-lg shadow-lg">
                <h2 class="text-lg font-bold text-blue-700 mb-3">Yarn & Knitting</h2>
                <div class="grid grid-cols-2 gap-3">
                    <button onclick="changeSection('yarn')" class="bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 shadow-md">
                        🧶 Yarn Purchase
                    </button>
                    <button onclick="changeSection('knitting')" class="bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 shadow-md">
                        🧵 Knitting Challan
                    </button>
                    <button onclick="changeSection('receipt')" class="bg-purple-500 text-white font-semibold py-3 rounded-lg hover:bg-purple-600 shadow-md col-span-2">
                        📦 Grey Fabric Receipt
                    </button>
                </div>
            </div>

            <div class="bg-white p-4 rounded-lg shadow-lg">
                <h2 class="text-lg font-bold text-red-700 mb-3">Dying & Finish Fabric</h2>
                <div class="grid grid-cols-2 gap-3">
                    <button onclick="changeSection('dying')" class="bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 shadow-md">
                        🎨 Dying Challan
                    </button>
                    <button onclick="changeSection('dyedReceipt')" class="bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 shadow-md">
                        🏷️ Dyed Fabric Receipt
                    </button>
                </div>
            </div>

            <div class="bg-white p-4 rounded-lg shadow-lg">
                <h2 class="text-lg font-bold text-orange-700 mb-3">System Utilities</h2>
                 <button onclick="changeSection('customers')" class="bg-gray-500 text-white font-semibold py-3 rounded-lg hover:bg-gray-600 shadow-md w-full">
                    📜 All Documents (History)
                </button>
            </div>
        </div>
    `;
}

function renderYarnPurchase() {
    return `
        <div class="bg-white p-4 rounded-lg shadow-lg print-area">
            <div class="mb-4 pb-3 border-b-2 border-blue-600">
                <div class="flex justify-between items-start">
                    <h2 class="text-lg font-bold text-blue-700">Yarn Purchase Invoice</h2>
                    <div class="text-right">
                        <h1 class="text-xl font-bold text-blue-800">Lakhra Fabrics</h1>
                        <p class="text-xs mt-1">(+92)-324-2479096</p>
                        <p class="text-xs">lakhrafabrics@gmail.com</p>
                    </div>
                </div>
            </div>
            
            <div class="mb-4 space-y-2">
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label class="block text-xs font-medium mb-1">Invoice No:</label>
                        <input type="text" value="${state.yarnInvoiceNo}" readonly class="border rounded px-2 py-1 bg-gray-100 w-full text-sm">
                    </div>
                    <div>
                        <label class="block text-xs font-medium mb-1">Date:</label>
                        <input type="date" value="${state.yarnDate}" onchange="state.yarnDate = this.value; persistState()" class="border rounded px-2 py-1 w-full text-sm">
                    </div>
                </div>
                <div class="party-name-container">
                    <label class="block text-xs font-medium mb-1 party-name-label">Party Name:</label>
                    <input type="text" value="${state.yarnPartyName}" onchange="state.yarnPartyName = sanitizeInput(this.value); persistState()" class="border rounded px-2 py-1 w-full text-sm party-name-value" placeholder="Required">
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full border-collapse border table-mobile">
                    <thead>
                        <tr class="bg-blue-100">
                            <th class="border p-1" style="width: 15%;">Qty</th>
                            <th class="border p-1" style="width: 40%;">Desc</th>
                            <th class="border p-1" style="width: 15%;">Pack(kg)</th>
                            <th class="border p-1" style="width: 20%;">Wt(kg)</th>
                            <th class="border p-1 no-print" style="width: 10%;"></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${state.yarnItems.map((item, i) => `
                            <tr key=${i}>
                                <td class="border p-1">
                                    <input type="number" step="1" value="${item.quantity}" onchange="updateYarnItem(${i}, 'quantity', this.value)" class="w-full border rounded text-right">
                                </td>
                                <td class="border p-1">
                                    <input type="text" value="${item.description}" onchange="updateYarnItem(${i}, 'description', this.value)" class="w-full border rounded" placeholder="Yarn Type">
                                </td>
                                <td class="border p-1">
                                    <input type="number" step="0.1" value="${item.packing}" onchange="updateYarnItem(${i}, 'packing', this.value)" class="w-full border rounded text-right">
                                </td>
                                <td class="border p-1 bg-gray-50 text-right font-semibold">${item.weight.toFixed(2)}</td>
                                <td class="border p-1 no-print text-center">
                                    <button onclick="removeYarnItem(${i})" class="text-red-500 hover:text-red-700 font-bold leading-none p-0 text-lg" title="Remove">×</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <button onclick="addYarnItem()" class="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 no-print text-sm">+ Add Item</button>

            <div class="mt-4 border-t-2 pt-3 flex justify-end">
                <div class="text-base font-bold">Net Total: <span class="text-blue-700">${getTotalYarnWeight()} kg</span></div>
            </div>

            <div class="flex gap-2 mt-4 no-print fixed bottom-0 left-0 right-0 p-2 bg-white shadow-2xl border-t">
                <button onclick="saveYarnPurchase()" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm flex-1">💾 Save & Go Home</button>
                <button onclick="generatePDF()" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm flex-1">📄 PDF/Share</button>
                <button onclick="window.printDocument()" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm flex-1">🖨️ Print</button>
            </div>
        </div>
    `;
}

function renderKnittingChallan() {
    const netReceivable = getNetReceivable();
    const grossTotal = getGrossTotal();
    const wastage = (grossTotal * 0.01).toFixed(2);

    return `
        <div class="bg-white p-4 rounded-lg shadow-lg print-area">
            <div class="mb-4 pb-3 border-b-2 border-green-600">
                <div class="flex justify-between items-start">
                    <div>
                        <h2 class="text-lg font-bold text-green-700">Knitting Yarn Issue Challan</h2>
                        <p class="text-xs text-gray-600">Job Work & Expected Grey Receipt</p>
                    </div>
                    <div class="text-right">
                        <h1 class="text-xl font-bold text-blue-800">Lakhra Fabrics</h1>
                        <p class="text-xs mt-1">(+92)-324-2479096</p>
                        <p class="text-xs">lakhrafabrics@gmail.com</p>
                    </div>
                </div>
            </div>
            
            <div class="mb-4 space-y-2">
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label class="block text-xs font-medium mb-1">Challan No:</label>
                        <input type="text" value="${state.knittingChallanNo}" readonly class="border rounded px-2 py-1 bg-gray-100 w-full text-sm">
                    </div>
                    <div>
                        <label class="block text-xs font-medium mb-1">Date:</label>
                        <input type="date" value="${state.knittingDate}" onchange="state.knittingDate = this.value; persistState()" class="border rounded px-2 py-1 w-full text-sm">
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-medium mb-1">Knitter Name:</label>
                    <input type="text" value="${state.knitterName}" onchange="state.knitterName = sanitizeInput(this.value); persistState()" class="border rounded px-2 py-1 w-full text-sm" placeholder="Required">
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full border-collapse border table-mobile">
                    <thead>
                        <tr class="bg-green-100">
                            <th class="border p-1" style="width: 20%;">Type</th>
                            <th class="border p-1" style="width: 15%;">Qty</th>
                            <th class="border p-1" style="width: 35%;">Desc</th>
                            <th class="border p-1" style="width: 20%;">Wt(kg)</th>
                            <th class="border p-1 no-print" style="width: 10%;"></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${state.knittingItems.map((item, i) => `
                            <tr key=${i}>
                                <td class="border p-1">
                                    <select onchange="updateKnittingItem(${i}, 'type', this.value)" class="w-full border rounded no-print-input">
                                        <option ${item.type === 'Cartoons' ? 'selected' : ''}>Cartoons</option>
                                        <option ${item.type === 'Bags' ? 'selected' : ''}>Bags</option>
                                    </select>
                                     <span class="print-only">${item.type}</span>
                                </td>
                                <td class="border p-1">
                                    <input type="number" step="1" value="${item.quantity}" onchange="updateKnittingItem(${i}, 'quantity', this.value)" class="w-full border rounded text-right">
                                </td>
                                <td class="border p-1">
                                    <input type="text" value="${item.description}" onchange="updateKnittingItem(${i}, 'description', this.value)" class="w-full border rounded" placeholder="Yarn Count/Specs">
                                </td>
                                <td class="border p-1">
                                    <input type="number" step="0.1" value="${item.weight}" onchange="updateKnittingItem(${i}, 'weight', this.value)" class="w-full border rounded text-right">
                                </td>
                                <td class="border p-1 no-print text-center">
                                    <button onclick="removeKnittingItem(${i})" class="text-red-500 hover:text-red-700 font-bold leading-none p-0 text-lg" title="Remove">×</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <button onclick="addKnittingItem()" class="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 no-print text-sm">+ Add Item</button>

            <div class="mt-4 border-t-2 pt-3 space-y-1 text-sm">
                <div class="flex justify-between">
                    <span>Gross Yarn Weight:</span>
                    <span class="font-bold">${grossTotal} kg</span>
                </div>
                <div class="flex justify-between text-red-600">
                    <span>Less Wastage (1%):</span>
                    <span class="font-bold">-${wastage} kg</span>
                </div>
                <div class="flex justify-between text-base font-bold text-green-700 border-t pt-1">
                    <span>Net Fabric Receivable:</span>
                    <span class="text-2xl">${netReceivable} kg</span>
                </div>
            </div>

            <div class="flex gap-2 mt-4 no-print fixed bottom-0 left-0 right-0 p-2 bg-white shadow-2xl border-t">
                <button onclick="saveKnittingChallan()" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm flex-1">💾 Save & Go Home</button>
                <button onclick="generatePDF()" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm flex-1">📄 PDF/Share</button>
                <button onclick="window.printDocument()" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm flex-1">🖨️ Print</button>
            </div>
        </div>
    `;
}

function renderGreyReceipt() {
    const totalReceived = getTotalWeightReceived();
    const balance = getBalanceReceivable();
    
    const receivable = parseFloat(state.netReceivable) || 0;
    const received = parseFloat(totalReceived) || 0;
    let wastagePercentage = '0.00';
    let balanceColor = 'text-green-600';

    if (receivable > 0) {
        const difference = receivable - received;
        const percentage = (difference / receivable) * 100;
        wastagePercentage = percentage.toFixed(2);
        if (parseFloat(balance) > 0) { 
            balanceColor = 'text-red-600';
        } else if (parseFloat(balance) < 0) { 
            balanceColor = 'text-blue-600';
        }
    } else if (received > 0) {
        wastagePercentage = 'N/A';
    }
    const wastageColor = parseFloat(wastagePercentage) > 0 ? 'text-red-600' : (parseFloat(wastagePercentage) < 0 ? 'text-blue-600' : 'text-green-600');

    return `
        <div class="bg-white p-4 rounded-lg shadow-lg print-area">
            <div class="mb-4 pb-3 border-b-2 border-purple-600">
                <div class="flex justify-between items-start">
                    <div>
                        <h2 class="text-lg font-bold text-purple-700">Grey Fabric Receipt</h2>
                        <p class="text-xs text-gray-600">Return Against Yarn Issued</p>
                    </div>
                    <div class="text-right">
                        <h1 class="text-xl font-bold text-blue-800">Lakhra Fabrics</h1>
                        <p class="text-xs mt-1">(+92)-324-2479096</p>
                        <p class="text-xs">lakhrafabrics@gmail.com</p>
                    </div>
                </div>
            </div>
            
            <div class="mb-4 space-y-2">
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label class="block text-xs font-medium mb-1">Challan No:</label>
                        <input type="number" step="1" value="${state.receiptChallanNo}" onchange="state.receiptChallanNo = sanitizeInput(this.value, true); persistState()" class="border rounded px-2 py-1 w-full text-sm" placeholder="e.g. 00012">
                    </div>
                    <div>
                        <label class="block text-xs font-medium mb-1">Date:</label>
                        <input type="date" value="${state.receiptDate}" onchange="state.receiptDate = this.value; persistState()" class="border rounded px-2 py-1 w-full text-sm">
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-medium mb-1">Knitter Name:</label>
                    <input type="text" value="${state.receiptKnitterName}" onchange="state.receiptKnitterName = sanitizeInput(this.value); persistState()" class="border rounded px-2 py-1 w-full text-sm" placeholder="Required">
                </div>
                <div>
                    <label class="block text-xs font-medium mb-1">Net Receivable (kg):</label>
                    <input type="text" pattern="[0-9]*\.?[0-9]*" inputmode="decimal" value="${state.netReceivable}" onchange="state.netReceivable = sanitizeInput(this.value, true); render(); persistState()" class="border rounded px-2 py-1 w-full text-sm bg-purple-50" placeholder="Enter Net Receivable from Challan">
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full border-collapse border table-mobile">
                    <thead>
                        <tr class="bg-purple-100">
                            <th class="border p-1" style="width: 40%;">No. of Rolls</th>
                            <th class="border p-1" style="width: 40%;">Weight Received (kg)</th>
                            <th class="border p-1 no-print" style="width: 20%;"></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${state.receiptRolls.map((roll, i) => `
                            <tr key=${i}>
                                <td class="border p-1">
                                    <input type="number" step="1" value="${roll.noOfRolls}" onchange="updateReceiptRoll(${i}, 'noOfRolls', this.value)" class="w-full border rounded text-right">
                                </td>
                                <td class="border p-1">
                                    <input type="number" step="0.1" value="${roll.weightReceived}" onchange="updateReceiptRoll(${i}, 'weightReceived', this.value)" class="w-full border rounded text-right">
                                </td>
                                <td class="border p-1 no-print text-center">
                                    <button onclick="removeReceiptRoll(${i})" class="text-red-500 hover:text-red-700 font-bold leading-none p-0 text-lg" title="Remove">×</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <button onclick="addReceiptRoll()" class="mt-2 bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 no-print text-sm">+ Add Roll</button>

            <div class="mt-4 border-t-2 pt-3 space-y-1 text-sm">
                <div class="flex justify-between">
                    <span>Net Receivable:</span>
                    <span class="font-bold">${state.netReceivable} kg</span>
                </div>
                 <div class="flex justify-between text-base font-bold">
                    <span>Wastage/Gain Percentage:</span>
                    <span class="text-xl ${wastageColor}">${wastagePercentage}%</span>
                </div>
                <div class="flex justify-between text-lg font-bold text-green-700">
                    <span>Total Received:</span>
                    <span class="text-xl">${totalReceived} kg
                    <div class="flex gap-2 mt-4 no-print fixed bottom-0 left-0 right-0 p-2 bg-white shadow-2xl border-t">
            <button onclick="saveGreyReceipt()" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm flex-1">💾 Save & Go Home</button>
            <button onclick="generatePDF()" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm flex-1">📄 PDF/Share</button>
            <button onclick="window.printDocument()" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm flex-1">🖨️ Print</button>
        </div>
    </div>
`;
}
function renderDyingChallan() {
const netReceivable = getDyingNetReceivable();
const grossTotal = getTotalDyingWeight();
const wastage = (grossTotal * 0.0).toFixed(2);
return `
    <div class="bg-white p-4 rounded-lg shadow-lg print-area">
        <div class="mb-4 pb-3 border-b-2 border-red-600">
            <div class="flex justify-between items-start">
                <div>
                    <h2 class="text-lg font-bold text-red-700">Dying Job Work Challan</h2>
                    <p class="text-xs text-gray-600">Job Work & Expected Finish Fabric Receipt</p>
                </div>
                <div class="text-right">
                    <h1 class="text-xl font-bold text-blue-800">Lakhra Fabrics</h1>
                    <p class="text-xs mt-1">(+92)-324-2479096</p>
                    <p class="text-xs">lakhrafabrics@gmail.com</p>
                </div>
            </div>
        </div>
        
        <div class="mb-4 space-y-2">
            <div class="grid grid-cols-2 gap-2">
                <div>
                    <label class="block text-xs font-medium mb-1">Challan No:</label>
                    <input type="text" value="${state.dyingChallanNo}" readonly class="border rounded px-2 py-1 bg-gray-100 w-full text-sm">
                </div>
                <div>
                    <label class="block text-xs font-medium mb-1">Date:</label>
                    <input type="date" value="${state.dyingDate}" onchange="state.dyingDate = this.value; persistState()" class="border rounded px-2 py-1 w-full text-sm">
                </div>
            </div>
            <div>
                <label class="block text-xs font-medium mb-1">Dyer Name:</label>
                <input type="text" value="${state.dyingKnitterName}" onchange="state.dyingKnitterName = sanitizeInput(this.value); persistState()" class="border rounded px-2 py-1 w-full text-sm" placeholder="Required">
            </div>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full border-collapse border table-mobile">
                <thead>
                    <tr class="bg-red-100">
                        <th class="border p-1" style="width: 20%;">Type</th>
                        <th class="border p-1" style="width: 15%;">Qty</th>
                        <th class="border p-1" style="width: 35%;">Desc</th>
                        <th class="border p-1" style="width: 20%;">Wt(kg)</th>
                        <th class="border p-1 no-print" style="width: 10%;"></th>
                    </tr>
                </thead>
                <tbody>
                    ${state.dyingItems.map((item, i) => `
                        <tr key=${i}>
                            <td class="border p-1">
                                <select onchange="updateDyingItem(${i}, 'type', this.value)" class="w-full border rounded no-print-input">
                                    <option ${item.type === 'Rolls' ? 'selected' : ''}>Rolls</option>
                                    <option ${item.type === 'Bags' ? 'selected' : ''}>Bags</option>
                                </select>
                                <span class="print-only">${item.type}</span>
                            </td>
                            <td class="border p-1">
                                <input type="number" step="1" value="${item.quantity}" onchange="updateDyingItem(${i}, 'quantity', this.value)" class="w-full border rounded text-right">
                            </td>
                            <td class="border p-1">
                                <input type="text" value="${item.description}" onchange="updateDyingItem(${i}, 'description', this.value)" class="w-full border rounded" placeholder="Fabric Specs/Color">
                            </td>
                            <td class="border p-1">
                                <input type="number" step="0.1" value="${item.weight}" onchange="updateDyingItem(${i}, 'weight', this.value)" class="w-full border rounded text-right">
                            </td>
                            <td class="border p-1 no-print text-center">
                                <button onclick="removeDyingItem(${i})" class="text-red-500 hover:text-red-700 font-bold leading-none p-0 text-lg" title="Remove">×</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <button onclick="addDyingItem()" class="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 no-print text-sm">+ Add Item</button>

        <div class="mt-4 border-t-2 pt-3 space-y-1 text-sm">
            <div class="flex justify-between">
                <span>Gross Fabric Weight:</span>
                <span class="font-bold">${grossTotal} kg</span>
            </div>
            <div class="flex justify-between text-base font-bold text-red-700 border-t pt-1">
                <span>Net Fabric Receivable:</span>
                <span class="text-2xl">${netReceivable} kg</span>
            </div>
        </div>

        <div class="flex gap-2 mt-4 no-print fixed bottom-0 left-0 right-0 p-2 bg-white shadow-2xl border-t">
            <button onclick="saveDyingChallan()" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm flex-1">💾 Save & Go Home</button>
            <button onclick="generatePDF()" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm flex-1">📄 PDF/Share</button>
            <button onclick="window.printDocument()" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm flex-1">🖨️ Print</button>
        </div>
    </div>
`;
}
function renderDyedReceipt() {
const totalReceived = getTotalDyedWeightReceived();
const balance = getDyedBalanceReceivable();
const wastagePercentage = getDyedWastagePercentage();
let balanceColor = 'text-green-600';
if (parseFloat(balance) > 0) { 
    balanceColor = 'text-red-600';
} else if (parseFloat(balance) < 0) { 
    balanceColor = 'text-blue-600';
}

const wastageColor = parseFloat(wastagePercentage) > 0 ? 'text-red-600' : (parseFloat(wastagePercentage) < 0 ? 'text-blue-600' : 'text-green-600');

return `
    <div class="bg-white p-4 rounded-lg shadow-lg print-area">
        <div class="mb-4 pb-3 border-b-2 border-orange-600">
            <div class="flex justify-between items-start">
                <div>
                    <h2 class="text-lg font-bold text-orange-700">Dyed Finish Fabric Receipt</h2>
                    <p class="text-xs text-gray-600">Return Against Dying Challan</p>
                </div>
                <div class="text-right">
                    <h1 class="text-xl font-bold text-blue-800">Lakhra Fabrics</h1>
                    <p class="text-xs mt-1">(+92)-324-2479096</p>
                    <p class="text-xs">lakhrafabrics@gmail.com</p>
                </div>
            </div>
        </div>
        
        <div class="mb-4 space-y-2">
            <div class="grid grid-cols-2 gap-2">
                <div>
                    <label class="block text-xs font-medium mb-1">Challan No:</label>
                    <input type="number" step="1" value="${state.dyedReceiptChallanNo}" onchange="state.dyedReceiptChallanNo = sanitizeInput(this.value, true); persistState()" class="border rounded px-2 py-1 w-full text-sm" placeholder="e.g. 00001">
                </div>
                <div>
                    <label class="block text-xs font-medium mb-1">Date:</label>
                    <input type="date" value="${state.dyedReceiptDate}" onchange="state.dyedReceiptDate = this.value; persistState()" class="border rounded px-2 py-1 w-full text-sm">
                </div>
            </div>
            <div>
                <label class="block text-xs font-medium mb-1">Dyer Name:</label>
                <input type="text" value="${state.dyedReceiptKnitterName}" onchange="state.dyedReceiptKnitterName = sanitizeInput(this.value); persistState()" class="border rounded px-2 py-1 w-full text-sm" placeholder="Required">
            </div>
            <div>
                <label class="block text-xs font-medium mb-1">Net Receivable (kg):</label>
                <input type="text" pattern="[0-9]*\.?[0-9]*" inputmode="decimal" value="${state.dyedNetReceivable}" onchange="state.dyedNetReceivable = sanitizeInput(this.value, true); render(); persistState()" class="border rounded px-2 py-1 w-full text-sm bg-orange-50" placeholder="Enter Net Receivable from Challan">
            </div>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full border-collapse border table-mobile">
                <thead>
                    <tr class="bg-orange-100">
                        <th class="border p-1" style="width: 40%;">No. of Rolls</th>
                        <th class="border p-1" style="width: 40%;">Weight Received (kg)</th>
                        <th class="border p-1 no-print" style="width: 20%;"></th>
                    </tr>
                </thead>
                <tbody>
                    ${state.dyedReceiptRolls.map((roll, i) => `
                        <tr key=${i}>
                            <td class="border p-1">
                                <input type="number" step="1" value="${roll.noOfRolls}" onchange="updateDyedReceiptRoll(${i}, 'noOfRolls', this.value)" class="w-full border rounded text-right">
                            </td>
                            <td class="border p-1">
                                <input type="number" step="0.1" value="${roll.weightReceived}" onchange="updateDyedReceiptRoll(${i}, 'weightReceived', this.value)" class="w-full border rounded text-right">
                            </td>
                            <td class="border p-1 no-print text-center">
                                <button onclick="removeDyedReceiptRoll(${i})" class="text-red-500 hover:text-red-700 font-bold leading-none p-0 text-lg" title="Remove">×</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <button onclick="addDyedReceiptRoll()" class="mt-2 bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 no-print text-sm">+ Add Roll</button>

        <div class="mt-4 border-t-2 pt-3 space-y-1 text-sm">
            <div class="flex justify-between">
                <span>Net Receivable:</span>
                <span class="font-bold">${state.dyedNetReceivable} kg</span>
            </div>
            <div class="flex justify-between text-base font-bold">
                <span>Wastage/Gain Percentage:</span>
                <span class="text-xl ${wastageColor}">${wastagePercentage}%</span>
            </div>
            <div class="flex justify-between text-lg font-bold text-green-700">
                <span>Total Received:</span>
                <span class="text-xl">${totalReceived} kg</span>
            </div>
            <div class="flex justify-between text-lg font-bold text-orange-700 border-t pt-2">
                <span>Balance Receivable:</span>
                <span class="text-xl ${balanceColor}">${balance} kg</span>
            </div>
        </div>

        <div class="flex gap-2 mt-4 no-print fixed bottom-0 left-0 right-0 p-2 bg-white shadow-2xl border-t">
            <button onclick="saveDyedReceipt()" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm flex-1">💾 Save & Go Home</button>
            <button onclick="generatePDF()" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm flex-1">📄 PDF/Share</button>
            <button onclick="window.printDocument()" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm flex-1">🖨️ Print</button>
        </div>
    </div>
`;
}
function renderCustomers() {
return `


All Documents (History & Reports)

<div class="space-y-3 no-print">
            <div class="grid grid-cols-2 gap-2">
                <div>
                    <label class="block text-xs font-medium mb-1">Search By:</label>
                    <select id="searchType" onchange="state.searchType = this.value; render()" class="border rounded px-2 py-1 w-full text-sm">
                        <option value="challanNo" ${state.searchType === 'challanNo' ? 'selected' : ''}>Challan/Invoice No.</option>
                        <option value="partyName" ${state.searchType === 'partyName' ? 'selected' : ''}>Party/Knitter/Dyer Name</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-medium mb-1">Filter Type:</label>
                    <select id="filterDocType" onchange="state.filterDocType = this.value; searchDocuments()" class="border rounded px-2 py-1 w-full text-sm">
                        ${state.documentTypes.map(doc => `<option value="${doc.value}" ${state.filterDocType === doc.value ? 'selected' : ''}>${doc.label}</option>`).join('')}
                    </select>
                </div>
            </div>
            
            <input type="text" id="searchValue" value="${state.searchValue}" oninput="state.searchValue = this.value" class="border rounded px-2 py-1 w-full text-sm" placeholder="Enter number or name to search...">
            <button onclick="searchDocuments()" class="mt-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm w-full font-bold">🔍 View/Filter Documents</button>
        </div>

        <div id="searchResults" class="space-y-2 mt-4 pt-4 border-t border-gray-200">
            ${renderSearchResults()}
        </div>
    </div>
`;
}
function renderSearchResults() {
if (state.searchResults.length === 0) {
return 'Use the search/filter options above to load documents.';
}
return state.searchResults.map(doc => {
    const docNo = doc.invoiceNo || doc.challanNo;
    const party = doc.partyName || doc.knitterName;
    const collectionDisplay = state.documentTypes.find(d => d.value === doc.collection).label.replace('s', '');
    
    return `
        <div class="p-3 border rounded-lg shadow-sm flex justify-between items-center bg-white">
            <div>
                <p class="font-bold text-sm text-blue-800">${collectionDisplay}</p>
                <p class="text-xs text-gray-600">
                    No: ${docNo} | ${party} | ${doc.date}
                </p>
            </div>
            <div class="flex space-x-2 no-print">
                <button onclick="viewDocument('${doc.collection}', '${doc.id}')" class="bg-blue-500 text-white px-2 py-1 text-xs rounded hover:bg-blue-600">📝 Edit</button>
                <button onclick="generatePDFForDoc('${doc.collection}', '${doc.id}')" class="bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600">📄 PDF</button>
                <button onclick="deleteDocument('${doc.collection}', '${doc.id}')" class="bg-gray-500 text-white px-2 py-1 text-xs rounded hover:bg-gray-600">🗑️ Del</button>
            </div>
        </div>
    `;
}).join('');
}
// Export functions
window.renderHeader = renderHeader;
window.renderDashboard = renderDashboard;
window.renderYarnPurchase = renderYarnPurchase;
window.renderKnittingChallan = renderKnittingChallan;
window.renderGreyReceipt = renderGreyReceipt;
window.renderDyingChallan = renderDyingChallan;
window.renderDyedReceipt = renderDyedReceipt;
window.renderCustomers = renderCustomers;
window.renderSearchResults = renderSearchResults;
### 10. js/main.js

```javascript
// Main Application Logic

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

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    if (location.hash === '' || location.hash === '#dashboard') {
        history.replaceState({ section: 'dashboard' }, '', '#dashboard');
    } else {
         const hashSection = location.hash.substring(1);
         if (hashSection) {
             state.activeSection = hashSection;
             history.replaceState({ section: hashSection }, '', location.hash);
         }
    }
    loadNextNumbers().then(render); 
});