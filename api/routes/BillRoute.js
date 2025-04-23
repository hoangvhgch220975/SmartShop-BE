const BillController = require('../controllers/BillController');
const authMiddleware = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');


const BillRoute = (app) => {
    // ✅ Các route dành cho người dùng
    app.post('/api/checkout', authMiddleware, BillController.createBill);
    app.get('/api/bills/me', authMiddleware, BillController.getUserBills);
    app.get('/api/bills/:id', authMiddleware, BillController.getBillById);
    app.put('/api/bills/:id/hide', authMiddleware, BillController.hideUserBill);


    // 🔐 Chỉ admin
    app.get('/api/bills', authMiddleware, isAdmin, BillController.getAllBills);
    app.put('/api/checkout/:id/status', authMiddleware, isAdmin, BillController.updateShippingStatus);
};

module.exports = BillRoute;
