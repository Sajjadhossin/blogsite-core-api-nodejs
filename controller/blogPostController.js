let Blog = require("../model/blogModel")

let blogPostController = (req, res) => {
    const {title, description, postedBy} = req.body

    let blog = new Blog({
        title: title,
        description: description,
        image: req.file.path, 
        postedBy: postedBy 
    })

    blog.save();

    res.send({message: "Blog post Sucesscull"})
}

module.exports = blogPostController