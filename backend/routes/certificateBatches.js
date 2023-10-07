const express = require("express");
const router = express.Router();
const CertificateHashSchema = require("../models/BatchHashes");
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

router.get(
    "/getBatch/:id", async(req,res)=>{
        try {
            const hashOfCertifcates = await CertificateHashSchema.findById(req.params.id);
            res.json(companies)
        } catch (error) {
            console.log(error.message)
            res.status(500).json("some error occured")
        }
    }
)
router.post(
    "/createBatch",  [
        // Validation Check if user is not providing data in right format
        body("batchName", "Enter a batch name").isLength({ min: 3 }),
        body('arraysOfHash').isArray().notEmpty().custom((value) => {
            // Check that all elements in the array are strings
            if (value.every((item) => typeof item === 'string')) {
              return true;
            } else {
              throw new Error('All elements in arraysOfHash must be strings');
            }
          }),
      ],
      async(req, res)=>{
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                // is there is error then return reponse with error
                success = false;
                return res.status(400).json({ errors: "The batch already exists!", success });
              }
    
            const batch = await CertificateHashSchema.create(
                {
                    batchName:req.body.batchName,
                    arraysOfHash:req.body.arraysOfHash
                },
            )
          res.json({ success:true, batch})
        } catch (error) {
            console.log(error.message)  
        }
    }
)

router.get("/validatecertificate/:id", async (req, res) => {
    try {
      const certificate = await Certificate.findById(req.params.id);
      const isTrue = await validateCertificateOnChain(certificate);
      if (isTrue) {
        res.status(200).json({success:true,certificate})
      } else {
        res.json("Certificate is Corrupt or Expired");
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Eroor Occured");
    }
  });


module.exports = router;
