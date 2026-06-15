const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    role: {
      type: String,
      enum: ["admin", "superadmin"],
      default: "admin",
    },

    permissions: [
      {
        type: String,
        enum: [
          "manage_users",
          "manage_packages",
          "manage_gallery",
          "manage_faq",
          "manage_testimonials",
          "manage_admins",
        ],
      },
    ],

    tokenVersion: {
      type: Number,
      default: 0,
    },

    refreshToken: {
      type: String,
      select: false,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);


// Hash password before saving
adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

// Compare password method
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// Remove sensitive fields from response
adminSchema.methods.toJSON = function () {
  const { password, refreshToken, ...rest } = this.toObject();
  return rest;
};

module.exports = mongoose.model("Admin", adminSchema);