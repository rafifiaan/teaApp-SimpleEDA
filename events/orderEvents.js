const eventBus = require('./index');

function emitOrderCreated(orderData) {
    eventBus.emit('order:created', orderData);
}

function emitOrderFailed(orderData) {
    eventBus.emit('order:failed', orderData);
}

module.exports = {
    emitOrderCreated,
    emitOrderFailed
};