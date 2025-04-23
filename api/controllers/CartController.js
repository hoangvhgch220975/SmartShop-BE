//CartController.js

const Cart = require('../models/CartModel');

// Lấy giỏ hàng của người dùng
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        res.status(200).json(cart || { items: [], totalPrice: 0 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Thêm sản phẩm vào giỏ
exports.addToCart = async (req, res) => {
    const { productId, productType, quantity, price } = req.body;

    try {
        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [], totalPrice: 0 });
        }

        const existingItemIndex = cart.items.findIndex(
            item => item.productId.equals(productId) && item.productType === productType
        );

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, productType, quantity, price });
        }

        // Recalculate total price
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Xóa 1 sản phẩm trong giỏ
exports.removeCartItem = async (req, res) => {
    const { productId, productType } = req.body;

    try {
        const cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.items = cart.items.filter(
            item => !(item.productId.equals(productId) && item.productType === productType)
        );

        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

        await cart.save();
        res.json({ message: 'Item removed', cart });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Xóa toàn bộ giỏ hàng
exports.clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.items = [];
        cart.totalPrice = 0;

        await cart.save();
        res.json({ message: 'Cart cleared' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ Cập nhật số lượng sản phẩm trong giỏ
exports.updateCartItemQuantity = async (req, res) => {
    const { productId, productType, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const itemIndex = cart.items.findIndex(
            item => item.productId.equals(productId) && item.productType === productType
        );

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        if (quantity <= 0) {
            cart.items.splice(itemIndex, 1); // Xóa nếu <= 0
        } else {
            cart.items[itemIndex].quantity = quantity;
        }

        // Cập nhật tổng tiền
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

        await cart.save();
        res.json({ message: 'Cart updated', cart });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
