const readline = require('readline');
const { createOrder } = require('./services/orderService');

require('./events/listeners/updateStock');
require('./events/listeners/sendNotification');
require('./events/listeners/logOrder');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askOrder() {
    rl.question('Nama teh: ', handleTeaName);
}

function handleTeaName(teaName) {
    rl.question('Jumlah: ', (quantityStr) => handleQuantity(teaName, quantityStr));
}

function handleQuantity(teaName, quantityStr) {
    const quantity = parseInt(quantityStr, 10);
    if (isNaN(quantity) || quantity <= 0) {
        console.log('❌ Jumlah harus berupa angka positif.');
        return askOrder(); // ulangi input jika jumlah tidak valid
    }
    rl.question('Nama customer: ', (customerName) => handleCustomer(teaName, quantity, customerName));
}

function handleCustomer(teaName, quantity, customerName) {
    const order = createOrder(teaName, quantity, customerName);

    if (!order) {
        console.log('❌ Order gagal dibuat.');
    }

    rl.question('\nIngin buat order lagi? (y/n): ', handleRepeatOrder);
}

function handleRepeatOrder(answer) {
    if (answer.toLowerCase() === 'y') {
        askOrder(); 
    } else {
        console.log('👋 Terima kasih Sudah Order!.');
        rl.close(); 
    }
}

askOrder(); 
