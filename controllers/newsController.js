
import News from "../models/newsModel.js";
import path from "path";

// ✅ Create News
export const createNews = async (req, res) => {
  try {
  
    const { title, description, imageName, videoUrl, category, communityName, adminName, memberCode, communityId } = req.body;
    const image = req.file?.filename;

    if (!title || !description || !category) {
      console.log("❌ Missing required fields");
      return res.status(400).json({
        error: "Title, Description, and Category are required.",
      });
    }

    const newNews = new News({
     title,
  description,
  image,
  imageName,
  videoUrl,
  category,
  communityName,
  adminName,
  memberCode,
  communityId,
    });

    await newNews.save();
    console.log("✅ News Created Successfully:", newNews);
    res.status(201).json(newNews);
  } catch (err) {
    console.error("❌ Create News Error:", err);
    res.status(500).json({ error: err.message || "Server Error" });
  }
};

// ✅ Get All News
export const getAllNews = async (req, res) => {
  try {
    const newsList = await News.find().sort({ createdAt: -1 });
    console.log("Fetched All News:", newsList.length);
    res.json(newsList);
  } catch (err) {
    console.error("Get All News Error:", err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
};

// ✅ Get News by Category
export const getNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const news = await News.find({ category }); // filter by category
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch news", error });
  }
};

// ✅ Update News
export const updateNews = async (req, res) => {
  try {
    const { title, description, imageName, videoUrl, category } = req.body;
    const image = req.file?.filename;

    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        imageName,
        videoUrl,
        category,
        ...(image && { image }),
      },
      { new: true }
    );

    console.log("News Updated:", updatedNews);
    res.json(updatedNews);
  } catch (err) {
    console.error("Update News Error:", err);
    res.status(500).json({ error: "Failed to update news" });
  }
};

// ✅ Delete News
export const deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    console.log("News Deleted:", req.params.id);
    res.json({ message: "News deleted" });
  } catch (err) {
    console.error("Delete News Error:", err);
    res.status(500).json({ error: "Failed to delete news" });
  }
};
