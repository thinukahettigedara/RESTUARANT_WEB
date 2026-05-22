
const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema(
    {
        orderNumber: {
            type: String,
            required: true,
            unique: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        deliveryPersonId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        items: [
            {
                food: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Food',
                    required: true,
                },
                name: String,
                image: String,
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],

        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            enum: ['pending', 'preparing', 'delivered', 'cancelled'],
            default: 'pending',
        },
        paymentMethod: {
            type: String,
            enum: ['cash', 'card', 'online'],
            default: 'cash',
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'processing', 'paid', 'failed'],
            default: 'pending',
        },
        paymentReference: {
            type: String,
            default: '',
        },
        deliveryAddress: {
            type: String,
            default: '',
        },
        deliveryLocation: {
            latitude: {
                type: Number,
                default: null,
            },
            longitude: {
                type: Number,
                default: null,
            },
            mapUrl: {
                type: String,
                default: '',
            },
        },
        specialInstructions: {
            type: String,
            default: '',
        },
        estimatedDeliveryTime: {
            type: Number,
            default: 30,
        },
    },
    { timestamps: true }
);

// Pre-save hook to generate unique order number
orderSchema.pre('save', async function(next) {
    if (this.isNew && !this.orderNumber) {
        // Generate order number like ORD-YYYYMMDD-XXXX where XXXX is random 4 digits
        const date = new Date();
        const dateStr = date.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
        const randomStr = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit random number
        this.orderNumber = `ORD-${dateStr}-${randomStr}`;
    }
    next();
});

module.exports = mongoose.model('Order', orderSchema);
