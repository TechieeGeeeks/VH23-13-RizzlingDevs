const crypto = require('crypto');
const express = require("express");
const router = express.Router();
const CertificateHashSchema = require("../models/BatchHashes");
const { body, validationResult } = require("express-validator");
const {contract_BatchCertificates_ABI,contract_BatchCertificates_Address} = require("../web3_backend/contract_Batch");

// Web3 Integration
const { ethers } = require("ethers");

const provider = new ethers.AlchemyProvider("sepolia", process.env.API_KEY);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const signer = wallet.connect(provider);
const contract = new ethers.Contract(
  contract_BatchCertificates_Address,
  contract_BatchCertificates_ABI,
  signer
);

router.get("/getBatch/:id", async (req, res) => {
  try {
    const hashOfCertifcates = await CertificateHashSchema.findById(
      req.params.id
    );
    res.json(companies);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("some error occured");
  }
});
router.post(
  "/createBatch",
  [
    // Validation Check if user is not providing data in right format
    body("batchName", "Enter a batch name").isLength({ min: 3 }),
    body("arraysOfHash")
      .isArray()
      .notEmpty()
      .custom((value) => {
        // Check that all elements in the array are strings
        if (value.every((item) => typeof item === "string")) {
          return true;
        } else {
          throw new Error("All elements in arraysOfHash must be strings");
        }
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        // is there is error then return reponse with error
        success = false;
        return res
          .status(400)
          .json({ errors: "The batch already exists!", success });
      }

      const batch = await CertificateHashSchema.create({
        batchName: req.body.batchName,
        arraysOfHash: req.body.arraysOfHash,
      });

      const arraysOfHash = batch.arraysOfHash;

      // Step 1: Join array elements into a single string
      const combinedString = arraysOfHash.join("");

      // Step 2: Calculate SHA-256 hash
      const sha256Hash = crypto
        .createHash("sha256")
        .update(combinedString)
        .digest("hex");
      
      console.log("SHA-256 Hash:", sha256Hash,batch._id);
      
      try {
        const result = await contract.addHashes(
          batch._id.toString(),sha256Hash.toString()
        );
        console.log("Transaction successfull", result.hash);
        console.log("Certificate generated successfully!");
        res.json({ success: true, batch,result});
      } catch (error) {
        console.error("Error generating certificate:", error);
        return res.json({success:false})
      }
      console.log(batch);
    } catch (error) {
      console.log(error.message);
    }
  }
);


module.exports = router;
