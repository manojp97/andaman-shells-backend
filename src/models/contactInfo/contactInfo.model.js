const mongoose = require("mongoose");

const contactInfoSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      default: "",
    },

    whatsapp: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    addressLine1: {
      type: String,
      default: "",
    },

    addressLine2: {
      type: String,
      default: "",
    },

    mapsLink: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ContactInfo",
  contactInfoSchema
);