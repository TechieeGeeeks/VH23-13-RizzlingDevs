const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var fetchUser = require("../middleware/fetchUser");
const Certificate = require("../models/Certificate");
const nodemailer = require("nodemailer");

//Route 1: Creating user using POST: /api/auth/createUser <= post request, Dosent require authentication

const JWT_SECRET = "This Is a Super Special Secret Key";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "atharvalolzzz96@gmail.com",
    pass: "cpknpwooqdjulvop",
  },
});

router.post(
  "/createuser",
  [
    // Validation Check if user is not providing data in right format
    body("name", "Please Enter A valid Name").isLength({ min: 3 }),
    body("email", "Please Enter a Valid Email").isEmail(),
    body("password", "Please Enter a Strong Password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    // If there is error then it will stores in errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // is there is error then return reponse with error
      success = false;
      return res.status(400).json({ erros: errors.array(), success });
    }
    //If there are no errors then create user
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res
          .status(300)
          .json({ error: "A person with this email already exist", success });
      }

      //Securing PassWord
      // The bcrypt library which will help us to add some psudo random bits and will hash password which will be stored in DB
      const salt = await bcrypt.genSalt(10); // The 10 mwans 10 rounds the function will be applied
      secPass = await bcrypt.hash(req.body.password, salt); // here salt will be added

      // Creating a New User After All Conditions Get Satisfied
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const mailOptions = {
        from: "theshaikhasif03@gmail.com",
        to: req.body.email,
        subject: "Registration Successful",
        html: `
          <html>
          <head>
            <style>
              /* Add your CSS styles here for a professional and attractive look */
              body {
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #333333;
              }
              p {
                color: #555555;
              }
              ul {
                list-style-type: none;
                padding: 0;
              }
              li {
                margin-bottom: 10px;
              }
              .contact {
                font-weight: bold;
                color: #007BFF;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Dear [User's Name],</h1>
              <p>Welcome to our platform!</p>
              <p>Your registration has been successfully completed, and we are thrilled to have you on board.</p>
              <p>Here are your registration details:</p>
              <ul>
                <li><strong>Name:</strong> ${req.body.name} </li>
                <li><strong>Email:</strong> ${req.body.email}</li>
                <li><strong>Password:</strong> ${req.body.password}</li>
              </ul>
              <p>You now have access to our services and can start exploring all the exciting features we offer.</p>
              <p>If you have any questions or need assistance, please don't hesitate to contact our <span class="contact">customer support</span> team at support@example.com.</p>
              <p>Thank you for choosing us!</p>
              <p>Best regards,</p>
              <p>Your Company Name</p>
            </div>
          </body>
          </html>
        `,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email: ", error);
        } else {
          console.log("Email sent: ", info.response);
        }
      });
      // Then Configuring our data which will be provided as data input
      // The user Id from below user.id is MongoDb's Unique Indexing id which helps in fast retrieval of data
      // example _id
      // 6483bdccc4fbb85362f37fbb
      const data = {
        user: {
          id: user.id,
        },
      };
      // This authtoken will be used for login
      const authToken = jwt.sign(data, JWT_SECRET); // This is signing with our secret key so that next time he can check the euth token whether it was from me only or not?
      /*console.log(jwtData);
        I got this token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4M2MyMDM4OThkNTNkNmUxNDdmM2I2In0sImlhdCI6MTY4NjM1NjQ4M30.i7XoKzFbnTVKwjSTKay7sRhZVZXijHzW882d_hX2hnU
        Its is divided in three section x.y.z
        The x is algorithm used in encrypted form which is eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
        The Y is Data user id which we provided eyJ1c2VyIjp7ImlkIjoiNjQ4M2MyMDM4OThkNTNkNmUxNDdmM2I2In0sImlhdCI6MTY4NjM1NjQ4M30
        The Z is Signature means only user can access it eyJ1c2VyIjp7ImlkIjoiNjQ4M2MyMDM4OThkNTNkNmUxNDdmM2I2In0sImlhdCI6MTY4NjM1NjQ4M30
        */

      // We will be using Auth Token as Response To user from which he can access the app
      success = true;
      res.json({ authToken, success });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Eroor Occured");
    }
    //check whether he user with same email exist already
  }
);

//Route 2 :  Authenticating a user for login Fot this endpoint no login required before authenticating
// I am writing no authentication require because In crud operation we will require a authentication
// POST "/api/auth/login"

router.post(
  "/login",
  [
    // Validation Check if user is not providing data in right format
    body("email", "Please Enter a Valid Email").isEmail(),
    body("password", "Password Cannot be Blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // is there is error then return reponse with error
      success = false;
      return res.status(400).json({ erros: errors.array(), success });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({
          error: "Please Try To Login With Right Credentials",
          success,
        });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          error: "Please Try To Login With Right Credentials",
          success,
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ authToken, success });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Eroor Occured");
    }
  }
);

// Route 3 : Getting User Details using POST: /api/auth/getuser.Login Required

router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password"); // This -password will make sure that from DataBase the pwssword wont get Back
    res.send(user);
  } catch (error) {
    success = false;
    console.error(error.message);
    res.status(500).send("Some Eroor Occured", success);
  }
});

router.post(
  "/adminlogin",
  [
    // Validation Check if user is not providing data in the right format
    body("email", "Please Enter a Valid Email").isEmail(),
    body("password", "Password Cannot be Blank").exists(),
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const admin = await User.findOne({ email, role: 1 });

      if (!admin) {
        return res.status(400).json({
          error: "admin with the provided credentials not found",
        });
      }

      const passwordCheck = await bcrypt.compare(password, admin.password);

      if (!passwordCheck) {
        return res.status(400).json({
          error: "Invalid Credentails",
        });
      }
      const data = {
        user: {
          id: admin.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occurred");
    }
  }
);

router.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find();
    const usersWithoutPassword = users.map((user) => {
      const { password, ...usersWithoutPassword } = user.toObject();
      return usersWithoutPassword;
    });

    res.json(usersWithoutPassword);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured!");
  }
});

router.get("/getAllCertificate", async (req, res) => {
  try {
    const certificate = await Certificate.find();

    res.json(certificate);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occurred");
  }
});

module.exports = router;
