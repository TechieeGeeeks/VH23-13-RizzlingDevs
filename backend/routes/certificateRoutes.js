const express = require("express");
const router = express.Router();
var fetchUser = require("../middleware/fetchUser");
const Certificate = require("../models/Certificate");
const { body, validationResult } = require("express-validator");
const {
  HashContract_Address,
  HashcontractAbi,
} = require("../web3_backend/contract_files_web2");

// Web3 Integration
const { ethers } = require("ethers");

const provider = new ethers.AlchemyProvider("sepolia", process.env.API_KEY);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const signer = wallet.connect(provider);
const contract = new ethers.Contract(
  HashContract_Address,
  HashcontractAbi,
  signer
);

//Route 1: Getting all Certificate of particular User using GET : /api/certificate/fetchallcertificates
router.get("/fetchallcertificates", fetchUser, async (req, res) => {
  try {
    const certificates = await Certificate.find({ user: req.user.id });
    res.json(certificates);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Eroor Occured");
  }
});

//Route 2: Adding New certificate to a Particular User using POST : /api/certifcate/addcertificate Login is reuired
router.post(
  "/createcertificate",
  fetchUser,
  [
    // Requirements that body data should full fill get full field first
    body("candidateName", "Please Enter Your Name").isLength({ min: 1 }),
    body("orgName", "Please Enter a organisation name").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      // If there is error then it will show in errors
      const errors = validationResult(req);
      const { candidateName, orgName, courseName, duration } = req.body;
      if (!errors.isEmpty()) {
        // is there is error then return reponse with error
        return res.status(400).json({ erros: errors.array() });
      }
      //If there are no errors then create note
      const temp_certificate = new Certificate({
        candidateName,
        orgName,
        courseName,
        duration,
        user: req.user.id,
      });
      const saveCertificate = await temp_certificate.save();
      console.log(saveCertificate);
      await saveCredentialOnBlockchain(saveCertificate);
      res.json(saveCertificate);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Some Eroor Occured");
    }
  }
);

//Route 2: getting a certificate by using object id
router.get("/:id", async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    res.json(certificate);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Eroor Occured");
  }
});

//
router.get("/validatecertificate/:id", async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    const isTrue = await validateCertificateOnChain(certificate);
    if (isTrue) {
      res.status(200).json({sucess:true,certificate})
    } else {
      res.json("Certificate is Corrupt or Expired");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Eroor Occured");
  }
});

const saveCredentialOnBlockchain = async (saveCertificate) => {
  const _id = saveCertificate._id.toString();
  const _candidate_name = saveCertificate.candidateName;
  const _org_name = saveCertificate.orgName;
  const _course_name = saveCertificate.courseName;
  const _expiration_date = saveCertificate.duration;

  try {
    const result = await contract.generateCertificate(
      _id,
      _candidate_name,
      _org_name,
      _course_name,
      _expiration_date
    );
    console.log("Transaction successfull", result.hash);
    console.log("Certificate generated successfully!");
    return result.hash;
  } catch (error) {
    console.error("Error generating certificate:", error);
    return false;
  }
};

const validateCertificateOnChain = async (certificate) => {
  // Database Data
  const responseFromDB = {
    candidateName: certificate.candidateName,
    orgName: certificate.orgName,
    courseName: certificate.courseName,
  };

  const certificateDataOnChain = await contract.getData(certificate._id);
  const responseFromBlockchain = {
    candidateName: certificateDataOnChain[0],
    orgName: certificateDataOnChain[1],
    courseName: certificateDataOnChain[2],
  };

  if (
    JSON.stringify(responseFromBlockchain) === JSON.stringify(responseFromDB)
  ) {
    return true;
  } else {
    return false;
  }
};

module.exports = router;
