import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    loginName: {
        type: String,
        required: true,
        unique: true,
    },
    profilePicture: {
        type: String,
        required: true,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjdLBPtVBiGPQ4LrKanWvkPFbQTTcnvGoOEg&s"
    },

    userForms: {
        type: Array,
        required: false,
        default: [],
    },
    language: {
        type: String,
        required: false,
        default: "es"
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    roles: {
        type: String,
        required: false,
        default: "ROLE_ADMIN",
        enum: ["ROLE_ADMIN", "ROLE_USER", "ROLE_MANAGER"],
    },
    brand :{
        type : mongoose.Schema.Types.Mixed,
        required : true,
        default : ""
    }



}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);


});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;