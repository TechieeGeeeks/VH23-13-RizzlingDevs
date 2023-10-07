const mongoose = require("mongoose");
const { Schema } = mongoose;
const certificateHashSchema = new Schema({
  batchName: {
    type: String,
    required: true,
  },
  arraysOfHash:[{type:String,required:true}],

  date: {
    type: Date,
    default: Date.now,
  },
});
const CertificateHashSchema = mongoose.model("hashSchema", certificateHashSchema);
module.exports = CertificateHashSchema;