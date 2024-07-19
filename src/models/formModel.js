import mongoose from "mongoose";


const formSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    properties: {
        type: Array,
        required: false,
        default: []
    },
    formFields: {
        type: Array,
        required: true,
        deafault: [],
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
}, {
    timestamps: true
});



const Form = mongoose.model("Forms", formSchema);

export default Form;