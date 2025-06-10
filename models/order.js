module.exports = function createOrder(teaName, quantity, customerName) {
    return {
        teaName,
        quantity,
        customerName,
        timestamp: new Date()
    };
};
