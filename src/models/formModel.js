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
    formTasks: {
        type: mongoose.Schema.Types.Array,
        required: false,
        deafault: [],
        ref : "Tasks"
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    brandLogo :{
        type : String,
        required : false,
        default : "https://freesvg.org/img/logo-generic.png"
    }
}, {
    timestamps: true
});



const Form = mongoose.model("Forms", formSchema);

export default Form;