const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var fetchUser = require("../middleware/fetchUser");
const Certificate = require("../models/Certificate");

//Route 1: Creating user using POST: /api/auth/createUser <= post request, Dosent require authentication

const JWT_SECRET = "This Is a Super Special Secret Key";

router.post(
  "/createCompany",
  [
    // Validation Check if company data is provided in the right format
    body("companyName", "Please Enter a valid Company Name").isLength({
      min: 3,
    }),
    body("description", "Please Enter a Valid Description")
      .optional()
      .isString(),
    body("email", "Please Enter a Valid Email").isEmail(),
    body("phoneNumber", "Please Enter a Valid Phone Number")
      .optional()
      .isString(),
    body(
      "socialMediaLinks.linkedin",
      "Please Enter a Valid LinkedIn Link"
    )
      .optional()
      .isString(),
    body("socialMediaLinks.X", "Please Enter a Valid X Link")
      .optional()
      .isString(),
    body(
      "socialMediaLinks.facebook",
      "Please Enter a Valid Facebook Link"
    )
      .optional()
      .isString(),
    body(
      "providedCertificates",
      "Please Provide an Array of Certificates"
    ).isArray(),
    body(
      "certifiedUsersByCompany",
      "Please Provide an Array of Certified Users"
    ).isArray(),
    body("logo", "Please Provide a Logo URL").optional().isString(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // is there is error then return reponse with error
      success = false;
      return res.status(400).json({ erros: errors.array(), success });
    }

    try {
      let company = await Company.findOne({
        email: req.body.email,
      });
      if (company) {
        success = false;
        return res
          .status(400)
          .json({ errors: "The company already exists!", success });
      }
      const salt = await bcrypt.genSalt(10); // The 10 mwans 10 rounds the function will be applied
      // secPass = await bcrypt.hash(req.body.password, salt); // here salt will be added

      company = await Company.create({
        companyName: req.body.companyName,
        email: req.body.email,
        phoneNumber:req.body.phoneNumber,
        providedCertificates:req.body.providedCertificates,
        certifiedUsersByCompany:req.body.certifiedUsersByCompany
      });

      success = true;
      res.json({ success });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Eroor Occured");
    }
  }
);

// get all companies 

router.get(
    "/getAllCompanies", async(req,res)=>{
        try {
            const companies = await Company.find();
            res.json(companies)
        } catch (error) {
            console.log(error.message)
            res.status(500).json("some error occured")
        }
    }
)

module.exports = router;
