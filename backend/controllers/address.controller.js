import AddressModel from "../Model/address.model.js";


export const addAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const data = req.body;

    // If setting as default → remove default from others
    if (data.isDefault) {
      await AddressModel.updateMany(
        { userId },
        { $set: { isDefault: false } }
      );
    }

    const newAddress = new AddressModel({
      ...data,
      userId,
    });

    await newAddress.save();

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      data: newAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserAddresses = async (req, res) => {
  try {
    const userId = req.userId;

    const addresses = await AddressModel.find({ userId }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    res.json({
      success: true,
      data: addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const data = req.body;
  console.log(data)
    // If updating as default → remove other defaults
    if (data.isDefault) {
      await AddressModel.updateMany(
        { userId },
        { $set: { isDefault: false } }
      );
    }

    const updatedAddress = await AddressModel.findOneAndUpdate(
      id,
      data,
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.json({
      success: true,
      message: "Address updated successfully",
      data: updatedAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const deletedAddress = await AddressModel.findOneAndDelete({
      _id:id,
      userId,
    });

    if (!deletedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const setDefaultAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
   console.log(userId)
   console.log(id)
    // Remove old default
    await AddressModel.updateMany(
      { userId },
      { $set: { isDefault: false } }
    );

    // Set new default
    const updated = await AddressModel.findOneAndUpdate(
      { _id: id, userId },
      { $set: { isDefault: true } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.json({
      success: true,
      message: "Default updated",
      data: updated
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
