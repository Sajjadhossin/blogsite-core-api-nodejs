let Category = require("../model/categoryModel")

let categoryController = async (req, res) => {
    let {name , description} = req.body

    console.log(name.toLowerCase())

    let existingCategory = await Category.findOne({ name: name.toLowerCase() });

    if(existingCategory != null) {
        return res.send("Category already exists");
    }

    let cateogry = new Category({
        name: name.toLowerCase(),
        description: description
    })

    cateogry.save();
    
    res.send({message: "Category Create Successfully"})


}

module.exports = categoryController