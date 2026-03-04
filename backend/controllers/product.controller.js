import ProductModel from "../Model/product.model.js";

import CategoryModel from "../Model/category.model.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

export async function createProduct(req, res) {
  try {
    let {
      name,
      description,
      brand,
      price,
      oldPrice,
      catName,
      catId,
      subCat,
      subCatId,
      thirdsubCatId,
      thirdsubCat,
      category,
      countInStock,
      rating,
      isFeatured,
      discount,
      productRam,
      size,
      productWeight,
    } = req.body;

    productRam = productRam ? JSON.parse(productRam) : [];
    size = size ? JSON.parse(size) : [];
    productWeight = productWeight ? JSON.parse(productWeight) : [];

    let imagesarr = [];
    let image = req.files; // from multer
    console.log(image);

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

    const product = new ProductModel({
      name,
      description,
      images: imagesarr,
      brand,
      price,
      oldPrice,
      catName,
      catId,
      subCat,
      subCatId,
      thirdsubCat,
      thirdsubCatId,
      category,
      countInStock,
      rating,
      isFeatured,
      discount,
      productRam,
      size,
      productWeight,
    });

    let savedProduct = await product.save();

    if (!savedProduct) {
      return res.status(400).json({
        message: "Product not created",
        error: true,
        success: false,
      });
    }
    return res.status(201).json({
      message: "Product created successfully",
      error: false,
      success: true,
      savedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}


export async function getAllProducts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 1000;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return res.status(404).json({
        message: "Page not found",
        success: false,
      });
    }

    let products = await ProductModel.find()
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!products) {
      return res.status(404).json({
        message: "No products available",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      Products: products,
      totalPages,
      page,
      perPage,
      totalPosts,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getProductsByCatId(req, res) {
  try {
    let { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 1000;
    const totalPosts = await ProductModel.countDocuments({ catId: id });
    const totalPages = Math.ceil(totalPosts / perPage);

    if (totalPages !== 0) {
      if (page > totalPages) {
        return res.status(404).json({
          message: "Page not found",
          success: false,
        });
      }
    }

    let products = await ProductModel.find({ catId: id })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (products.length === 0) {
      return res.status(404).json({
        message: "No products available",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      Products: products,
      totalPages,
      page,
      perPage,
      totalPosts,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getProductsByCatName(req, res) {
  try {
    let { name } = req.query;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 1000;
    const totalPosts = await ProductModel.countDocuments({ catName: name });
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return res.status(404).json({
        message: "Page not found",
        success: false,
      });
    }

    let products = await ProductModel.find({ catName: name })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (products.length === 0) {
      return res.status(404).json({
        message: "No products available",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      Products: products,
      totalPages,
      page,
      perPage,
      totalPosts,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getProductsBySubCatId(req, res) {
  try {
    let { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 1000;
    const totalPosts = await ProductModel.countDocuments({ subCatId: id });
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return res.status(404).json({
        message: "Page not found",
        success: false,
      });
    }

    let products = await ProductModel.find({ subCatId: id })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (products.length === 0) {
      return res.status(404).json({
        message: "No products available",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      Products: products,
      totalPages,
      page,
      perPage,
      totalPosts,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getProductsBySubCatName(req, res) {
  try {
    let { name } = req.query;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 1000;
    const totalPosts = await ProductModel.countDocuments({ subCat: name });
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return res.status(404).json({
        message: "Page not found",
        success: false,
      });
    }

    let products = await ProductModel.find({ subCat: name })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (products.length === 0) {
      return res.status(404).json({
        message: "No products available",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      Products: products,
      totalPages,
      page,
      perPage,
      totalPosts,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getProductsByThirdSubCatId(req, res) {
  try {
    let { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 1000;
    const totalPosts = await ProductModel.countDocuments({ thirdsubCatId: id });
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return res.status(404).json({
        message: "Page not found",
        success: false,
      });
    }

    let products = await ProductModel.find({ thirdsubCatId: id })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (products.length === 0) {
      return res.status(404).json({
        message: "No products available",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      Products: products,
      totalPages,
      page,
      perPage,
      totalPosts,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getProductsByThirdSubCatName(req, res) {
  try {
    let { name } = req.query;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 1000;
    const totalPosts = await ProductModel.countDocuments({ thirdsubCat: name });
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return res.status(404).json({
        message: "Page not found",
        success: false,
      });
    }

    let products = await ProductModel.find({ thirdsubCat: name })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (products.length === 0) {
      return res.status(404).json({
        message: "No products available",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      Products: products,
      totalPages,
      page,
      perPage,
      totalPosts,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function filterByPrice(req, res) {
  try {
    const { catId, subCatId, thirdsubCatId, min, max } = req.query;

    let filter = {};

    // Category filters
    if (catId) filter.catId = catId;
    if (subCatId) filter.subCatId = subCatId;
    if (thirdsubCatId) filter.thirdsubCatId = thirdsubCatId;

    // Price filter
    if (min || max) {
      filter.price = {
        $gte: parseInt(min) || 0,
        $lte: parseInt(max) || Number.MAX_SAFE_INTEGER,
      };
    }

    // filter = {
    //   catId: "123",
    //   price: { $gte: 500, $lte: 2000 },
    // };
    const products = await ProductModel.find(filter).populate("category");

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getAllProductsByRating(req, res) {
  try {
    const { catId, subCatId, thirdsubCatId, rating } = req.query;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 1000;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return res.status(404).json({
        message: "Page not found",
        success: false,
      });
    }

    let filter = {};

    // Category filters
    if (catId) filter.catId = catId;
    if (subCatId) filter.subCatId = subCatId;
    if (thirdsubCatId) filter.thirdsubCatId = thirdsubCatId;

    let products = await ProductModel.find({ rating: rating, ...filter })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (products.length === 0) {
      return res.status(404).json({
        message: "No products available",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      Products: products,
      totalPages,
      page,
      perPage,
      totalPosts,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getAllProductsCount(req, res) {
  try {
    const totalPosts = await ProductModel.countDocuments();
    return res.status(200).json({
      error: false,
      success: true,
      TotalProducts: totalPosts,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getAllFeaturedProducts(req, res) {
  try {
    let products = await ProductModel.find({ isFeatured: true }).populate(
      "category",
    );

    if (products.length === 0) {
      return res.status(404).json({
        message: "No products available",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      Featuredproducts: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function deleteProduct(req, res) {
  try {
    let { id } = req.params;
    let product = await ProductModel.findOne({ _id: id });
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }
    let images = product.images;

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
    let deletedProduct = await ProductModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({
        message: "Cannot delete product",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Product deleted",
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

export async function getProduct(req, res) {
  try {
    let { id } = req.params;
    let product = await ProductModel.findOne({ _id: id }).populate("category");
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      product,
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


export async function updateProduct(req, res) {
  try {
    console.log(req.body);
    let { id } = req.params;
    //  let imagesarr = [];
    let image = req.files; // from multer
    console.log(image);

    let product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "There is no product with this ID",
        success: false,
      });
    }
    let imagesarr = product.images;
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

    // Destructure fields from body
    const {
      name,
      description,
      brand,
      price,
      oldPrice,
      catName,
      catId,
      subCat,
      subCatId,
      thirdsubCatId,
      thirdsubCat,
      category,
      countInStock,
      rating,
      isFeatured,
      discount,
    } = req.body;

    let productRam = req.body.productRam;
    let size = req.body.size;
    let productWeight = req.body.productWeight;

    if (productRam) productRam = JSON.parse(productRam);
    if (size) size = JSON.parse(size);
    if (productWeight) productWeight = JSON.parse(productWeight);

    // Build update object dynamically
    let updateFields = {};
    updateFields.images = imagesarr;
    if (name !== undefined) updateFields.name = name;
    if (description !== undefined) updateFields.description = description;
    if (brand !== undefined) updateFields.brand = brand;
    if (price !== undefined) updateFields.price = Number(price);
    if (oldPrice !== undefined) updateFields.oldPrice = Number(oldPrice);
    if (catName !== undefined) updateFields.catName = catName;
    if (catId !== undefined) updateFields.catId = catId;
    if (subCat !== undefined) updateFields.subCat = subCat;
    if (subCatId !== undefined) updateFields.subCatId = subCatId;
    if (thirdsubCat !== undefined) updateFields.thirdsubCat = thirdsubCat;
    if (thirdsubCatId !== undefined) updateFields.thirdsubCatId = thirdsubCatId;
    if (category !== undefined) updateFields.category = category;
    if (countInStock !== undefined)
      updateFields.countInStock = Number(countInStock);
    if (rating !== undefined) updateFields.rating = Number(rating);
    if (isFeatured !== undefined) updateFields.isFeatured = isFeatured;
    if (discount !== undefined) updateFields.discount = Number(discount);
    if (productRam !== undefined) updateFields.productRam = productRam;
    if (size !== undefined) updateFields.size = size;
    if (productWeight !== undefined) updateFields.productWeight = productWeight;

    // Update product
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      updateFields,
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function filters(req, res) {
  let { catId, subCatId, minPrice, maxPrice, page, limit } = req.body;

  let limiter = parseInt(limit);

  let filters = {};

  if (catId?.length) {
    filters.catId = { $in: catId };
  }
  if (subCatId?.length) {
    filters.subCatId = { $in: subCatId };
  }
  if (maxPrice || minPrice) {
    filters.price = { $gte: +minPrice || 0, $lte: +maxPrice || Infinity };
  }
  try {
    const products = await ProductModel.find(filters)
      .populate("category")
      .skip((page - 1) * limiter)
      .limit(limiter);
    let total = await ProductModel.countDocuments(filters);

    return res.status(200).json({
      success: true,
      products,
      page: parseInt(page),
      total,
      totalPages: Math.ceil(total / limiter),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function searchProductController(req, res) {
  try {
    let { q, page, limit } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    if (!q) {
      return res.status(404).json({
        message: "Provide query",
        error: true,
        success: false,
      });
    }
    const filter = {
      $or: [
        { name: { $regex: q, $options: "i" } },
        { brand: { $regex: q, $options: "i" } },
        { catName: { $regex: q, $options: "i" } },
        { subCat: { $regex: q, $options: "i" } },
      ],
    };

    const items = await ProductModel.find(filter)
      .populate("category")
      .skip((page - 1) * limit)
      .limit(limit);

    let totalItems = await ProductModel.countDocuments(filter);

    return res.status(200).json({
      products: items,
      success: true,
      totalPages: Math.ceil(totalItems / limit),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
