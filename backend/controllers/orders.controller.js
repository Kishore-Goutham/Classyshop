import OrderModel from "../Model/order.model.js";
import ProductModel from "../Model/product.model.js";

export async function createOrder(req, res) {
  try {
    let userId = req.userId;

    let {
      products,
      paymentId,
      payment_status,
      delivery_address,
      totalAmt,
      date,
    } = req.body;

    const eachProduct = await Promise.all(
      products.map(async (item) => {
        const product = await ProductModel.findById(item.productId);

        const subTotal = product.price * item.quantity;

        return {
          productId: product._id,
          quantity: item.quantity,
          subTotal: subTotal,
        };
      }),
    );

    let order = new OrderModel({
      userId,
      products: eachProduct,
      paymentId,
      payment_status,
      delivery_address,
      totalAmt,
      date,
    });

    let savedOrder = await order.save();

    return res.status(200).json({
      savedOrder,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getOrders(req, res) {
  try {
    let userId = req.userId;

    let orders = await OrderModel.find({ userId })
      .populate("products.productId")
      .populate("delivery_address");

    return res.status(200).json({
      orders,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
