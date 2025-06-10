function sendNotification(customerName, teaName) {
    console.log(`📨 Notifikasi terkirim ke ${customerName}: "Pesanan ${teaName} kamu sedang diproses."`);
}

module.exports = { sendNotification };
