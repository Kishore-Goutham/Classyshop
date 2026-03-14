import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
        },
        quantity:{
            type:Number
        },
        subTotal:{
            type:Number
        }
      },
    ],

    paymentId: {
      type: String,
      default: "",
    },

    payment_status: {
      type: String,
      default: "",
    },

    delivery_address: {
      type: mongoose.Schema.ObjectId,
      ref: "Address",
    },
    totalAmt: {
      type: Number,
      default: 0,
    },
    date:{
        type:String
    }
  },
  { timestamps: true },
);

const OrderModel = mongoose.model("order", orderSchema);

export default OrderModel;
