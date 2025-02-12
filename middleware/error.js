import ErrorHandler from "../utils/ErrorHandler.js";

// Error Handler
export default ((err, req, res, next) => {



      // Duplicate mongoose key error ( Duplicate User)
      if (err.code == 11000) {
        err.statusCode = 400
        err.message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(err.message, err.statusCode)
    }

    // missing path error to create user
    if (err.name == "ValidationError") {
        err.statusCode = 400
    }


    // Wrong JWT error
    if (err.name === "JsonWebTokenError" ) {
        const message = `Invalid JsonWebToken, try again`;
        err = new ErrorHandler(message, 400)
    }





    res.status(err.statusCode || 500).json({
        success: false,
        forDev: "error.js middleware",
        code: err.code,
        message: err.message || "Internal Server Error",
        errName: err.name
    });
  });