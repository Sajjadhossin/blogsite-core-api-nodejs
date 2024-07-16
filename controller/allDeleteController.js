const Category = require("../model/categoryModel")

let allDeleteController = async(req, res) => {
    let {ids} = req.body

    await Category.deleteMany({_id: {$in:ids}})
}
module.exports = allDeleteController