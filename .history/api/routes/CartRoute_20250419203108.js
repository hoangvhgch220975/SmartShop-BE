const CartController = require('../controllers/CartController');
const authMiddleware = require('../middleware/auth');

const CartRoute = (app) => {
  app.get('/api/cart', authMiddleware, CartController.getCart);
  app.post('/api/cart/add', authMiddleware, CartController.addToCart);
  app.delete('/api/cart/item', authMiddleware, CartController.removeCartItem);
  app.delete('/api/cart/clear', authMiddleware, CartController.clearCart);
  app.put('/api/cart/update-quantity', authMiddleware, CartController.updateCartItemQuantity); // ✅ thêm route này
};

module.exports = CartRoute;
