import { Schema, model } from "mongoose";

const registerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    hireDate: {
        type: Date,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    dui: {
        type: String,
        required: true,
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    issNumber:{
        type: String,
        required: true
    },
},{
    timestamps: true,
    strict: false
}
);

export default model("registers", registerSchema);