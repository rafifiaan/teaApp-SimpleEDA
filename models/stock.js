const fs = require('fs');
const path = require('path');

const logSuccessPath = path.join(__dirname, '../../log_success.txt');

const initialStock = {
    'Teh Hijau': 10,
    'Teh Melati': 5,
    'Teh Susu': 8,
    'Teh Tarik': 12,
};

function getCurrentStock() {
    const currentStock = { ...initialStock };

    if (!fs.existsSync(logSuccessPath)) return currentStock;

    const logContent = fs.readFileSync(logSuccessPath, 'utf-8');
    const lines = logContent.split('\n');

    for (const line of lines) {
        const match = line.match(/SUKSES: .* pesan (\d+) (.+)/);
        if (match) {
        const qty = parseInt(match[1], 10);
        const teaName = match[2];
        if (currentStock[teaName] !== undefined) {
            currentStock[teaName] -= qty;
        }
        }
    }

    return currentStock;
}

function reduceStock(teaName, quantity, customerName) {
    const currentStock = getCurrentStock();

    if (!(teaName in currentStock)) {
        console.log(`🚫 Jenis teh "${teaName}" tidak tersedia.`);
        return false;
    }

    if (currentStock[teaName] < quantity) {
        console.log(`⚠️ Stok ${teaName} tidak cukup. Sisa: ${currentStock[teaName]}`);
        return false;
    }

    const logMessage = `[${new Date().toISOString()}] SUKSES: ${customerName} pesan ${quantity} ${teaName}\n`;
    fs.appendFileSync(logSuccessPath, logMessage);

    console.log(`✅ Stok ${teaName} berhasil dikurangi. Sisa: ${currentStock[teaName] - quantity}`);
    return true;
}

module.exports = { getCurrentStock, reduceStock };
