const mongoose = require("mongoose");
const { Schema } = mongoose;
const companySchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    require: false,
  },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: String,
    socialMediaLinks: {
      linkedin: String,
      X: String,
      facebook: String,
    },

  providedCertificates: [{ type: String }],

  certifiedUsersByCompany: [{ type: String }],

  logo: String,

  date: {
    type: Date,
    default: Date.now,
  },
});
const Company = mongoose.model("company", companySchema);
module.exports = Company;
