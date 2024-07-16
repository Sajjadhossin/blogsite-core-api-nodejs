const User = require("../model/userModel");
const bcrypt = require('bcrypt');

let login =async (req, res)=>{
    let {email, password} = req.body;

    if(email == '' || email == undefined) {
        return res.send("Email is required");
    }
    if(password == '' || password == undefined) {
        return res.send("Password is required");
    }

    let existingUser = await User.findOne({email:email})

    if(existingUser == null) {
        return res.send("Not found any account with the given email")
    }

    bcrypt.compare(password, existingUser.password, function(err, result) {
        if(result) {
            console.log(existingUser)
            if(existingUser.emailVerify){
                return  res.send({
                    message: "Login successful",
                    id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email
                });
            }else {
                return  res.send("please verify your email")
            }
        }else{
            res.send("Wrong  Password")
        }
    });
}

module.exports = login;