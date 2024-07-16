const bcrypt = require('bcrypt');
const User = require("../model/userModel");
const nodemailer = require("nodemailer");

let  registrationController =async (req, res )=> {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    if(name == " " || name == undefined) {
        return res.send("Name is required");
    }
    if(email == " " || email == undefined) {
        return res.send("email is required");
    } 
    if(password == " " || password == undefined) {
        return res.send("passwords is required");
    }

    let existingUser = await User.findOne({email:email})
    if(existingUser!=null) { 
        return res.send("User already exists")
    }

    bcrypt.hash(password, 10, async function(err, hash) {
        let user = new User ({
            name: name,
            email: email,
            password: hash
        });

        user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "sajjadhossin.cse@gmail.com",
                pass: "vgre iper aeem klnf",
            },
            });

            const info = await transporter.sendMail({
                from: 'MyBlog', // sender addressP
                to: user.email, // list of receivers
                subject: "Email Verification Link", // Subject line
                html: `
                <style>body{font-family:Arial,sans-serif;background-color:#f6f6f6;margin:0;padding:0}.email-container{max-width:600px;margin:0 auto;background-color:#fff;padding:20px;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,.1)}.header{text-align:center;padding:20px 0;border-bottom:1px solid #e0e0e0}.content{padding:20px 0}.footer{text-align:center;padding:20px 0;border-top:1px solid #e0e0e0;font-size:12px;color:#888}</style><div class=email-container><div class=header><h1>Hey ! ${user.name} Verify Link: <a href="http://localhost:8000/${user.email}">Click here.</a></h1></div><div class=content><p>Hello,<p>This is a short email template. You can customize the content as needed.<p>Best regards,<p>Sajjad Hossin</div><div class=footer><p>© 2024 Your Company. All rights reserved.<p><a href=#>Unsubscribe</a></div></div>`, // html body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
            

        res.send({
            message: "Registration successful",
            id: user._id,
            name: user.name,
            email: user.email
        });
    });
};

module.exports = registrationController;
