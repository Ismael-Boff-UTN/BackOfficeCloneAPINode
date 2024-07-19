import asyncHandler from "express-async-handler";//Para No Usar TryCatches
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


//@description Auth user/set token
//route POST /api/users/auth
//@access Public
const authUser = asyncHandler(async (req, res) => {
    const { loginName, password } = req.body;


    const user = await User.findOne({ loginName }).populate("userForms");

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePicture: user.profilePicture,
            language: user.language,
            userForms: user.userForms,
            email: user.email,
            brand: user.brand,
            loginName: user.loginName,
            roles : user.roles,

        })
    } else {
        res.status(401);
        throw new Error("Credenciales No Validas!");
    }


});


//@description Registrar Nuevo Usuario
//route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {

    const { loginName, firstName, lastName, email, password, profilePicture, roles, userForms } = req.body;
    const userExist = await User.findOne({ loginName });

    if (userExist) {
        res.status(400);
        throw new Error("El Usuario Ya Existe");//Muestro Error Usando Mi Custom ErrHandler

    }

    const user = await User.create({
        loginName,
        firstName,
        lastName,
        email,
        profilePicture,
        password,
        roles, 
        userForms
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            user
        })
    } else {
        res.status(400);
        throw new Error("Datos De Usuario No Validos");
    }



    //res.status(200).json({ message: "Register User" });

});


//@description Desloguear Usuario
//route POST /api/users/logout
//@access Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ message: "Logged Out" });

});


//@description Obtener Perfil del Usuario
//route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {

    const user = {
        _id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        language: req.user.language,

    }
    res.status(200).json(user);

});


//@description Actualizar Perfil del Usuario
//route PUT /api/users/updateUserProfile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);
    console.log(user);
    if (user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.language = req.body.language || user.language;
        user.profilePicture = req.body.profilePicture || user.profilePicture;
        user.loginName = req.body.loginName || user.loginName;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            language: updatedUser.language,
            email: updatedUser.email,
            profilePicture: updatedUser.profilePicture,
            loginName: updatedUser.loginName,
        })

    } else {
        res.status(404);
        throw new Error("Falla al actualizar");
    }





    //res.status(200).json({ message: "Update Profile User" });

});


//@description Obtener Todos Los Usuarios
//route GET /api/users/list
//@access Private
const getAllUsers = asyncHandler(async (req, res) => {

    try {
        //Si No Se Pasa Un Limite (null) Retorna TODOS Los Usuarios
        //Ej. http://localhost:4000/api/users/list?limite=5&desde=4
        const { limite = null, desde = 0 } = req.query;
        //Retorna todos los usuarios en la base de datos, tanto activos como no activos
        const users = await User.find().populate("userForms")
            .skip(Number(desde))
            .limit(Number(limite));
        res.status(200).json({
            users,
            quantity: users.length

        });
    } catch (error) {

        res.status(400);
        throw new Error("Falla al obtener usuarios");
    }

});

//@description Eliminar Usuario
//route DELETE /api/users/:id
//@access Private
const deleteUser = asyncHandler(async (req, res) => {

    try {
        const { id } = req.params;

        const usuarioEncontrado = await User.findById(id);

        if (usuarioEncontrado.isActive === true) {
            const usuario = await User.findByIdAndUpdate(id, {
                isActive: false,
            });

            res.status(200).json({
                message: `Usuario : ${usuario.loginName}, Desctivado!`,
            });
        } else {
            const usuario = await User.findByIdAndUpdate(id, {
                isActive: true,
            });

            res.status(200).json({
                message: `Usuario : ${usuario.loginName}, Reestrablecido!`,
            });
        }
    } catch (error) {

        res.status(400);
        throw new Error("Falla Al Eliminar Usuario");
    }

});


//@description Actualizar Perfil de un Usuario por Id
//route PUT /api/users/update/:id
//@access Private
const updateUserById = asyncHandler(async (req, res) => {


    const { id } = req.params;
    const user = await User.findById(id);

    

    if (user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.language = req.body.language || user.language;
        user.profilePicture = req.body.profilePicture || user.profilePicture;
        user.loginName = req.body.loginName || user.loginName;
        user.userForms = req.body.userForms || user.userForms;
        user.roles = req.body.roles || user.roles;

        if (req.body.password) {
            user.password = req.body.password;
        }

        console.log(user.userForms);
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            language: updatedUser.language,
            email: updatedUser.email,
            profilePicture: updatedUser.profilePicture,
            loginName: updatedUser.loginName,
            userForms : updatedUser.userForms,
            roles : updatedUser.roles,
        })

    } else {
        res.status(404);
        throw new Error("Falla Al Actualizar Usuario");
    }

});


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    deleteUser,
    updateUserById
};