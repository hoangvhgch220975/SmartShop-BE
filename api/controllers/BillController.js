// BillController.js
const Bill = require("../models/BillModel");
const DeviceModel = require("../models/DeviceModel");
const ComboModel = require("../models/ComboModel");
const PackageModel = require("../models/PackageModel");

function getModelByType(type) {
    switch (type) {
        case "device":
            return DeviceModel;
        case "combo":
            return ComboModel;
        case "package":
            return PackageModel;
        default:
            return null;
    }
}
// Create a new bill
exports.createBill = async (req, res) => {
    try {
        const { items, totalPrice, shipping, paymentDetails } = req.body;
        const userId = req.user.id;

        for (const item of items) {
            const Model = getModelByType(item.productType);

            if (!Model) {
                return res
                    .status(400)
                    .json({ message: `❌ Unknown product type: ${item.productType}` });
            }

            const product = await Model.findById(item.productId);
            if (!product) {
                return res
                    .status(404)
                    .json({ message: `❌ Product not found: ${item.productId}` });
            }

            if (product.stock < item.quantity) {
                return res
                    .status(400)
                    .json({ message: `⚠️ Not enough stock for ${product.name}` });
            }

            product.stock -= item.quantity;
            await product.save();
        }

        const bill = new Bill({
            userId,
            items,
            totalPrice,
            shipping,
            paymentDetails,
        });

        await bill.save();
        res.status(201).json({ message: "✅ Bill created successfully", bill });
    } catch (error) {
        console.error("Create bill error:", error);
        res.status(500).json({ message: "❌ Failed to create bill", error });
    }
};

// Update bill shipping status
exports.updateShippingStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["pending", "shipping", "completed", "cancelled"];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: "❌ Invalid status value" });
    }

    try {
        const updated = await Bill.findByIdAndUpdate(
            id,
            { shippingStatus: status },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "❌ Bill not found" });
        }

        res.json({
            message: "✅ Shipping status updated successfully",
            bill: updated,
        });
    } catch (error) {
        console.error("Update status error:", error);
        res.status(500).json({ message: "❌ Failed to update status", error });
    }
};

// Get bills of the current user
exports.getUserBills = async (req, res) => {
    try {
        const bills = await Bill.find({ userId: req.user.id }).sort({
            createdAt: -1,
        });
        res.json({ success: true, bills });
    } catch (error) {
        res
            .status(500)
            .json({ success: false, message: "❌ Failed to get user bills", error });
    }
};

// Get all bills (admin)
exports.getAllBills = async (req, res) => {
    try {
        const bills = await Bill.find()
            .populate("userId", "username email")
            .sort({ createdAt: -1 });
        res.json({ success: true, bills });
    } catch (error) {
        res
            .status(500)
            .json({
                success: false,
                message: "❌ Failed to retrieve all bills",
                error,
            });
    }
};

// Get details of a specific bill
exports.getBillById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const bill = await Bill.findById(id).populate("userId", "username email");

        if (!bill) {
            return res
                .status(404)
                .json({ success: false, message: "❌ Bill not found" });
        }

        const isAdmin = req.user.role === "admin"; // optional role check
        if (!isAdmin && bill.userId._id.toString() !== userId) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "🚫 Unauthorized access to this bill",
                });
        }

        res.json({ success: true, bill });
    } catch (error) {
        console.error("Get bill detail error:", error);
        res
            .status(500)
            .json({ success: false, message: "❌ Failed to get bill detail", error });
    }
};

exports.hideUserBill = async (req, res) => {
    try {
        const userId = req.user.id;
        const billId = req.params.id;

        const bill = await Bill.findOne({ _id: billId, userId });

        if (!bill) {
            return res
                .status(404)
                .json({ success: false, message: "Bill not found" });
        }

        bill.isHiddenByUser = true;
        await bill.save();

        res.json({ success: true, message: "Order hidden from user history" });
    } catch (err) {
        res
            .status(500)
            .json({ success: false, message: "Error hiding bill", error: err });
    }
};
