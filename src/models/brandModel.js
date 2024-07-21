import mongoose from "mongoose";


const brandSchema = mongoose.Schema({

    name: {
        type: String,
        required: false,
        default: ""
    },
    cuitCuil: {
        type: String,
        required: false,
        default: ""
    },
    email: {
        type: String,
        required: false,
        default: ""
    },
    address: {
        type: String,
        required: false,
        default: ""
    },
    phone: {
        type: String,
        required: false,
        default: ""
    },
    theme: {
        type: String,
        required: false,
        default: ""
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
}, {
    timestamps: true
});



const Brand = mongoose.model("Brands", brandSchema);

export default Brand;