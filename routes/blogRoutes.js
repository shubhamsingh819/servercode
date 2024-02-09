const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");

router.post("/createBlog", blogController.createBlog);
router.get("/getBlogBy/:blogId", blogController.getBlogById);
router.get("/getAllBlog", blogController.getAllBlogs);
router.put("/updateBlog/:blogId", blogController.updateBlog);
router.delete("/deleteBlog/:blogId", blogController.deleteBlog);

module.exports = router;
