const Blog = require("../models/blog");

// Creating a blog
exports.createBlog = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const newBlog = new Blog({ title, description, category });
    await newBlog.save();
    res
      .status(200)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.log("Error during blog creation:", error);
    res.status(500).json({ message: "Blog creation failed" });
  }
};

// Implementation for getting a blog by ID

exports.getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog Found successfully", blog: blog });
  } catch (error) {
    res.status(500).json({ message: "Blog not found" });
  }
};

// Implementation for getting all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blog = await Blog.find();
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog Found successfully", blog: blog });
  } catch (error) {
    res.status(500).json({ message: "Blog not found" });
  }
};

// Implementation for updating a blog by blogId
exports.updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, description, category } = req.body;
    // Find the blog by ID and update its fields
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { title, description, category },
      { new: true } // Return the updated document
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res
      .status(200)
      .json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    console.log("Error during blog update:", error);
    res.status(500).json({ message: "Failed to update blog" });
  }
};

// Implementation for deleting a blog by blogId
exports.deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    // Find the blog by ID and delete it
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log("Error during blog deletion:", error);
    res.status(500).json({ message: "Failed to delete blog" });
  }
};
