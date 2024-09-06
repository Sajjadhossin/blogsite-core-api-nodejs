let Blog = require("../model/blogModel")

let blogPostController = (req, res) => {
    const {title, description, postedBy, tags, category} = req.body

    let tagArr = tags.split(',') // split for each tag

    if(tagArr.length > 5) {
        return res.send("Maximum 5 tags you can add");
    }else {
        let blog = new Blog({
            title: title,
            description: description,
            image: req.file.path,
            tags: tagArr,
            category: category,
            postedBy: postedBy 
        })
        
        blog.save();
    
        res.send({message: "Blog post Sucesscull"})
    }
}

module.exports = blogPostController