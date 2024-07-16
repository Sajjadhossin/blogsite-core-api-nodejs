let Category = require("../model/categoryModel")

let categoryEditController = async(req, res) => {
    const {id, name, description} = req.body

    let existingCategory = await Category.findOne({ _id: id });

    if(existingCategory == null) {
        return res.send("Category not found");
    }

    let updateData = {
        name: name || existingCategory.name,
        description: description || existingCategory.description
    }

    let update = await Category.findByIdAndUpdate({_id:id}, updateData, {new:true})
    res.send(update)
}

module.exports = categoryEditController;