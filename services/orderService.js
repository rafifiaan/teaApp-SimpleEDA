const Order = require('../models/order');
const { emitOrderCreated, emitOrderFailed } = require('../events/orderEvents');
const { getCurrentStock, reduceStock } = require('../models/stock');

const fs = require('fs');
const path = require('path');

function createOrder(teaName, quantity, customerName) {
    const order = new Order(teaName, quantity, customerName);
    const currentStock = getCurrentStock();
    
    // Cek apakah teh tersedia
    if (!currentStock.hasOwnProperty(teaName)) {
        console.log(`🚫 Stok untuk ${teaName} tidak ditemukan.`);
        logFailed(order, 'Stok tidak ditemukan');
        return null;
    }
    
    // Cek apakah stok cukup
    if (currentStock[teaName] < quantity) {
        console.log(`⚠️ Stok ${teaName} tidak cukup. Sisa: ${currentStock[teaName]}`);
        logFailed(order, `Stok tidak cukup (tersisa ${currentStock[teaName]})`);
        return null;
    }

    const success = reduceStock(teaName, quantity);
    if (!success) {
        console.log('❌ Gagal mengurangi stok.');
        logFailed(order, 'Gagal mengurangi stok');
        emitOrderFailed(order);
        return null;
    }

    console.log(`✅ Order dibuat: ${order.teaName}, ${order.quantity} pcs`);
    emitOrderCreated(order);
    return order;
}

function logFailed(order, reason) {
  const logPath = path.join(__dirname, '../log_failed.txt');
  const message = `[${new Date().toISOString()}] GAGAL: ${order.customerName} pesan ${order.quantity} ${order.teaName} - Alasan: ${reason}\n`;
  fs.appendFileSync(logPath, message);
}

module.exports = { createOrder };
