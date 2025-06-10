const eventBus = require('../index');
const { reduceStock } = require('../../models/stock');

eventBus.on('order:created', (order) => {
    console.log(`🔄 Mengurangi stok untuk teh ${order.teaName} sebanyak ${order.quantity}`);
    const success = reduceStock(order.teaName, order.quantity);

    if (!success) {
        console.error('❌ Gagal mengurangi stok.'); // hanya untuk safety, ini harusnya tidak terjadi
    }
});
