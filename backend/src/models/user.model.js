import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userModel = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    contactNo: {type: String, unique: true, required: true},
    active: {type: Boolean, default: true}
});

const UserModel = mongoose.model("user", userModel);

export default UserModel;