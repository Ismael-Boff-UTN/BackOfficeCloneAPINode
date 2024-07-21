import mongoose from "mongoose";


const taskSchema = mongoose.Schema({

    assignedUser: {
        type: String,
        required: false,
        ref : "User"
    },
    data: {
        type: Object,
        default: {}
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
}, {
    timestamps: true
});



const Task = mongoose.model("Tasks", taskSchema);

export default Task;