import Product from "../models/product.js";

// CREATE product with image upload
export const createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      mrp: Number(req.body.mrp),
      offerPrice: Number(req.body.offerPrice),
      image: req.file?.filename, // optional chaining in case no file uploaded
    };

    if (!productData.image) {
      return res.status(400).json({ error: "Product image is required" });
    }

    const newProduct = new Product(productData);
    const saved = await newProduct.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all products
export const getAllProducts = async (req, res) => {
  try {
    const { memberCode, memberName, communityName } = req.query;
    const filter = {};
    if (memberCode) filter.memberCode = memberCode;
    if (memberName) filter.memberName = memberName;
    if (communityName) filter.communityName = communityName;

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// GET single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE product with optional image upload
export const updateProduct = async (req, res) => {
  try {
    console.log("Incoming update request:", req.params.id);
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const updateData = {
      ...req.body,
      mrp: req.body.mrp ? Number(req.body.mrp) : undefined,
      offerPrice: req.body.offerPrice ? Number(req.body.offerPrice) : undefined,
    };

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    if (req.file?.filename) {
      updateData.image = req.file.filename;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Product not found" });

    res.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
};


// DELETE product
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
