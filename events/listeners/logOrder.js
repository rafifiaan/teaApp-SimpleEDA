const fs = require('fs');
const path = require('path');
const eventBus = require('../index');

const logSuccessPath = path.join(__dirname, '../../log_success.txt');

eventBus.on('order:created', (order) => {
    const logMessage = `[${new Date().toISOString()}] SUKSES: ${order.customerName} pesan ${order.quantity} ${order.teaName}\n`;

    fs.appendFile(logSuccessPath, logMessage, (err) => {
        if (err) {
        console.error('❌ Gagal menulis log:', err);
        } else {
        console.log('🧾 Order dicatat dan disimpan ke log_success.txt');
        }
    });
});
