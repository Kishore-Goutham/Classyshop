import CategoryModel from "../Model/category.model.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

export async function createCategory(req, res) {
  try {
    let { name,parentId,parentCatName } = req.body;
    let imagesarr = [];
    let image = req.files;
    console.log(image);

    if (!name) {
      return res.status(400).json({
        success: false,
        error: true,
        message:"Provide all fields",
      });
    }
    if(image?.length>0){
    for (let i = 0; i < image.length; i++) {
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: false,
      };
      const img = await cloudinary.uploader.upload(
        image[i].path, //filepath
        options,
        function (error, result) {
          imagesarr.push(result.secure_url);
          fs.unlinkSync(`uploads/${image[i].filename}`);
        },
      );
    }
  }
    let category = new CategoryModel({
      name: name,
      images: imagesarr,
      parentId:parentId,
      parentCatName:parentCatName,
    });

    let saved = await category.save();
    // imagesarr = [];

    return res.status(201).json({
      success: true,
      error: false,
      savedCategory: saved,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getCatogories(req, res) {
  try {
    let categories = await CategoryModel.find();
    let catMap = {};
    categories.forEach((cat) => {
      catMap[cat._id] = { ...cat._doc, children: [] };
    });
    // console.log(catMap);

    let rootCategories = [];
    categories.forEach((cat) => {
      if (cat.parentId) {
        catMap[cat.parentId].children.push(catMap[cat._id]);
      } else {
        rootCategories.push(catMap[cat._id]);
      }
    });
    console.log(catMap);

    return res.status(200).json({
      rootCategories,
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

export async function getCategoriesCount(request, response) {
  try {
    const categoryCount = await CategoryModel.countDocuments({
      parentId: null,
    });

    return response.status(200).json({
      categoryCount,
      success: true,
      error: false,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getSubCategoriesCount(req, res) {
  try {
    const subCategoryCount = await CategoryModel.countDocuments({
      parentId: { $ne: null },
    });

    return res.status(200).json({
      SubCategoryCount: subCategoryCount,
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

export async function getCategory(req, res) {
  try {
    let { id } = req.params;
    let category = await CategoryModel.findById(id);
    if (!category) {
      return res.status(404).json({
        message: "There is no category with this ID",
        success: false,
      });
    }
    return res.status(200).json({
      category,
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



export async function deleteCategory(req, res) {
  try {
    let { id } = req.params;
    let category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    let images = category.images;

    for (let imgURL of images) {
      let urlArr = imgURL.split("/");
      let img = urlArr[urlArr.length - 1];
      let imageName = img.split(".")[0];

      const deleteimg = await cloudinary.uploader.destroy(
        imageName,
        function (error, result) {
          console.log(error, result);
        },
      );
    }
    let subCategory = await CategoryModel.find({ parentId: id });

    for (let subCat of subCategory) {
      let delThirdSubCat = await CategoryModel.deleteMany({
        parentId: subCat._id,
      });
    }

    let delSubCat = await CategoryModel.deleteMany({ parentId: id });

    let delCategory = await CategoryModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Category deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function updateCategory(req, res) {
  try {
    let { id } = req.params;
    //  let imagesarr = [];
    let image = req.files; // from multer
    console.log(image);

    let category = await CategoryModel.findById(id);
    if (!category) {
      return res.status(404).json({
        message: "There is no category with this ID",
        success: false,
      });
    }
    let imagesarr = category.images;
    if (image && image.length > 0) {
      // checking if image exist if no image exist no image sent so no need to delete
      for (let imgURL of imagesarr) {
        let urlArr = imgURL.split("/");
        let img = urlArr[urlArr.length - 1];
        let imageName = img.split(".")[0];

        const deleteimg = await cloudinary.uploader.destroy(
          imageName,
          function (error, result) {
            console.log(error, result);
          },
        );
      }
      imagesarr = [];
      for (let i = 0; i < image.length; i++) {
        const options = {
          use_filename: true,
          unique_filename: false,
          overwrite: false,
        };
        const img = await cloudinary.uploader.upload(
          image[i].path, //filepath
          options,
          function (error, result) {
            imagesarr.push(result.secure_url);
            fs.unlinkSync(`uploads/${image[i].filename}`);
          },
        );
      }
    }

    let updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        images: imagesarr,
        parentId: req.body.parentId,
        parentCatName: req.body.parentCatName,
      },
      { new: true },
    );

    if (!updatedCategory) {
      return res.status(404).json({
        message: "Category cannot be updated",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
