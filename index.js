require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const secureApi = require("./middleware/secureApi")
const registrationController = require("./controller/registrationController");
const loginController = require("./controller/loginController");
const dbConnection = require("./helper/dbConnection");
const emailVerificationController = require('./controller/emailVerificationController');
const blogPostController = require('./controller/blogPostController');
const getAllBlogController = require('./controller/getAllBlogController');
const multer  = require('multer')
const path = require('path');
const categoryController = require('./controller/categoryController');
const categoryDeleteController = require('./controller/categoryDeleteController');
const categoryEditController = require('./controller/categoryEditController');
const allDeleteController = require('./controller/allDeleteController');
const blogEditController = require('./controller/blogEditController');
const blogDeleteController = require('./controller/blogDeleteController');

dbConnection();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './uploads')
    },
    filename: function (req, file, cb) { 
        console.log("file",file);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + "_" + file.originalname )
    }
})

const upload = multer({ storage: storage })

app.post('/registration', secureApi, registrationController);
app.post("/login", secureApi, loginController);
app.post("/blogPost", upload.single('avatar'), blogPostController);
app.post("/createCategory", secureApi, categoryController);
app.delete("/categorydelete/:id", secureApi, categoryDeleteController); //here is shown how to delete dynamic. here id will be shown in route
app.post("/categoryedit", secureApi, categoryEditController);
app.post("/alldelete", secureApi, allDeleteController);
app.get("/blogPost", getAllBlogController);
app.post("/blogedit", upload.single('avatar'), blogEditController);
app.post("/blogdelete", blogDeleteController); // here is shown how to delete from post use it for bank related application. id will be hidden in route
app.get("/:email", emailVerificationController);
app.listen(8000)