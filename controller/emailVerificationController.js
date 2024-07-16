const User = require('../model/userModel')

const emailVerificationController = async(req, res) => {
    console.log(req.params.email)
    let existingUser = await User.findOneAndUpdate({email: req.params.email}, {emailVerify: true}, {new: true});

    if(existingUser == null) {
        return res.send("Email not found")
    }else {
        return res.send ("Email verified successfully")
    }

}

module.exports = emailVerificationController