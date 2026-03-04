import CartProductModel from "../Model/cartproduct.model.js";
import UserModel from "../Model/user.model.js";

export async function addToCartItemController(req, res) {
  try {
    let userId = req.userId;
    let { productId, quantity, size, ram } = req.body;
    console.log("userId : ",userId)
    let checkItemCart = await CartProductModel.findOne({
      userId,
      productId,
      size,
      ram,
    });

    if (checkItemCart) {
      return res.status(402).json({
        message: "Product already in cart",
        error: true,
        success: false,
      });
    }

    let cartItem = new CartProductModel({
      quantity,
      userId,
      productId,
      size,
      ram,
    });

    let savedItem = await cartItem.save();

    let cartItems = await CartProductModel.find({ userId }).populate(
      "productId",
    );

    let updateUserCart = await UserModel.updateOne(
      { _id: userId },
      { $push: { shopping_cart: savedItem._id } },
    );

    return res.status(200).json({
      cartItems,
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

export async function getCartItemController(req, res) {
  try {
    let userId = req.userId;
    let cartItems = await CartProductModel.find({ userId }).populate(
      "productId",
    );

    return res.status(200).json({
      cartItems,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function updateCartItemController(req, res) {
  try {
    let userId = req.userId;
    let { _id, qty, size } = req.body;

    if (!_id || !qty) {
      return res.status(400).json({
        message: "Provide quantity and _id",
        error: true,
        success: false,
      });
    }
    let updatedCart = await CartProductModel.updateOne(
      { _id, userId },
      { quantity: qty, size: size },
    );

    return res.status(200).json({
      message: "Cart updated successfully",
      error: true,
      success: false,
      updatedCart,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function deleteCartItemController(req, res) {
  try {
    let userId = req.userId;
    console.log("userId : ",userId)
    let { id } = req.params;

    if (!id) {
      return res.status(404).json({
        message: "Cart not found",
        error: true,
        success: false,
      });
    }

    let deletedcart = await CartProductModel.findOneAndDelete({
      _id: id,
      userId: userId,
    });
    if (!deletedcart) {
      return res.status(404).json({
        message: "Cart not found",
        error: true,
        success: false,
      });
    }

    // removing cartitem in shopping_cart array from user
    let removeUserCart = await UserModel.updateOne(
      { _id: userId },
      { $pull: { shopping_cart: id} },
    );

    return res.status(200).json({
      deletedcart,
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
