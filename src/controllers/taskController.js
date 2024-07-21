import asyncHandler from "express-async-handler";//Para No Usar TryCatches
import Task from "../models/taskModel.js";
import Form from "../models/formModel.js";
//@description Tasks
//route POST /api/tasks/create
//@access Private
const createTask = asyncHandler(async (req, res) => {


    const { assignedUser, data, formId } = req.body;

    console.log(req.body);

    const task = await Task.create({
        assignedUser, data
    });




    if (task) {
        await Form.findByIdAndUpdate(formId, { $push: { formTasks: task._id } });
        res.status(201).json({
            task

        })
    } else {
        res.status(400);
        throw new Error("Fallo Al Crear Tarea");
    }


});


//@description Tasks
//route POST /api/tasks/create
//@access Private
const getTasks = asyncHandler(async (req, res) => {
    try {
        const tasks = await Task.find().populate({ path: 'assignedUser', select: ['firstName', 'lastName', "name -_id"] });
        res.status(201).json({
            tasks
        })
    } catch (error) {
        res.status(400);
        throw new Error("Fallo Al Obtener Tareas");
    }



});


export { createTask, getTasks };