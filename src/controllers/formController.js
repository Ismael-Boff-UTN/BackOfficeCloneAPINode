import asyncHandler from "express-async-handler";//Para No Usar TryCatches
import Form from "../models/formModel.js";



//@description Forms
//route POST /api/forms
//@access Private
const createForm = asyncHandler(async (req, res) => {


    const { name, description, properties, formFields } = req.body;

    const form = await Form.create({
        name, description, properties, formFields
    });

    if (form) {

        res.status(201).json({
            form
        })
    } else {
        res.status(400);
        throw new Error("Fallo Al Crear Nuevo Formulario");
    }


});




//@description Eliminar Formulario
//route DELETE /api/forms/create/:id
//@access Private
const deleteForm = asyncHandler(async (req, res) => {

    try {
        const { id } = req.params;

        const formularioEncontrado = await Form.findById(id);

        if (formularioEncontrado.isActive === true) {
            const formulario = await Form.findByIdAndUpdate(id, {
                isActive: false,
            });

            res.status(200).json({
                message: `Formulario : ${formulario.name}, Desctivado!`,
            });
        } else {
            const formulario = await Form.findByIdAndUpdate(id, {
                isActive: true,
            });

            res.status(200).json({
                message: `Formulario : ${formulario.name}, Reestrablecido!`,
            });
        }
    } catch (error) {

        res.status(400);
        throw new Error("Falla Al Eliminar Formulario");
    }

});


//@description Actualizar Formulario
//route PUT /api/forms/update/:id
//@access Private
const updateForm = asyncHandler(async (req, res) => {

    try {
        const { id } = req.params;


        const { name, description, properties, formFields } = req.body;

        const newData = { name, description, properties, formFields }
        await Form.findByIdAndUpdate(id, newData);

        res.status(200).json({
            message: "Formulario Modificado Correctamente!",
        });
    } catch (error) {

        res.status(400);
        throw new Error("Falla Al Actualizar Formulario");
    }

});


//@description Obtener Todos Los Formularios
//route GET /api/froms/list
//@access Private
const getAllForms = asyncHandler(async (req, res) => {

    try {
        //Si No Se Pasa Un Limite (null) Retorna TODOS Los Usuarios
        //Ej. http://localhost:4000/api/froms/list?limite=5&desde=4
        const { limite = null, desde = 0 } = req.query;
        //Retorna todos los usuarios en la base de datos, tanto activos como no activos
        const forms = await Form.find()
            .skip(Number(desde))
            .limit(Number(limite));
        res.status(200).json({
            forms,
            quantity: forms.length

        });
    } catch (error) {
        res.status(400);
        throw new Error("Falla al obtener formularios");
    }

});


export { createForm, deleteForm, updateForm, getAllForms };