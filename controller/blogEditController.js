const Blog = require("../model/blogModel");
const blogEditController = async(req, res)=> {
    const {id, title, description, image} = req.body

    let imagedata = req.file.path ? req.file.path : image

    await Blog.findByIdAndUpdate({_id:id}, {title:title, description:description, image:imagedata})

    console.log(id, title, description, req.file.path);

    res.send("Updated");
}
module.exports = blogEditController
