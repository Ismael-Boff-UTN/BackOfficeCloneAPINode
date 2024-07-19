//Manejador de errores custom, ya que el errorhandler de express devuelve un HTML 
//y necesito obtener errores en formato JSON para desplegar desde el Front-End

const notFound = (req, res, next) => {

    const error = new Error(`Not Found : ${req.originalUrl}`);
    res.status(404);
    next(error);

}


const errorhandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    //Validacion Custom Para Errores De MongoDB
    if (err.name === "CastError" && err.kind === "ObjectId") {
        statusCode = 404;
        message = "Recurso No Encontrado!"
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    })
}

export {notFound, errorhandler};