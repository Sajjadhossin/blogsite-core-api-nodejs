const Blog = require("../model/blogModel")
const blogDeleteController = async (req, res) => {
    const {id}= req.body;
    await Blog.findByIdAndDelete(id);
    res.send("Delete successfully completed")
}

module.exports = blogDeleteController