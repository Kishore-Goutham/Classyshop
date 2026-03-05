import MyListModel from "../Model/myList.model.js";

export async function addToMyListController(req, res) {
  try {
    let userId = req.userId;
    let { productId } = req.body;

    let item = await MyListModel.findOne({ userId, productId });

    if (item) {
      return res.status(400).json({
        message: "Product already in List",
        error: true,
        success: false,
      });
    }

    const myList = new MyListModel({
      productId,
      userId,
    });

    let savedItem = await myList.save();

    return res.status(200).json({
      savedItem,
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

export async function getMyListController(req, res) {
  try {
    let userId = req.userId;
    let listItems = await MyListModel.find({ userId }).populate("productId");

    return res.status(200).json({
      listItems,
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

export async function deleteMyListController(req, res) {
  try {
    let userId = req.userId;
    let { id } = req.params;
    let deletedItem = await MyListModel.findOneAndDelete({_id:id,userId});

    if (!deletedItem) {
      return res.status(400).json({
        message: "Cannot delete item",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      deletedItem,
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
