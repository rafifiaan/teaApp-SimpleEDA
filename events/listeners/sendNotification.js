const eventBus = require('../index');
const { sendNotification } = require('../../utils/notifier');

eventBus.on('order:created', (order) => {
    sendNotification(order.customerName, order.teaName);
});