let Blog = require("../model/blogModel")

let getAllBlogController = async(req, res) => {

    let data = await Blog.find({}).populate("postedBy")

    res.send(data)
}

module.exports = getAllBlogController