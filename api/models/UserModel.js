const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "User name cannot be blank"],
      unique: true,
      minLength: 2,
      maxLength: 50,
    },
    password: {
      type: String,
      required: [true, "Password cannot be blank"],
      minLength: 6,
      maxLength: 100,
    },
    email: {
      type: String,
      required: [true, "Email cannot be blank"],
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email"],
      maxLength: 100,
    },

    // Optional fields for later (regist-info step)
    fullname: {
      type: String,
      default: "",
      maxLength: 100,
    },
    dob: {
      type: Date,
      default: null,
    },
    address: {
      type: String,
      default: "",
      maxLength: 200,
    },
    avatar: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    collection: "Users",
    versionKey: false, // remove __v field
  }
);

const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;
