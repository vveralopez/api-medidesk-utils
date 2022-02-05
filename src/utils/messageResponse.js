exports.getMenssageError = (menssage, param, value, location) => {
    return { "errors": [
        { 
            "value": value,
            "msg": menssage, 
            "param": param,
            "location": location
        }
    ]};
}

exports.errorCatch = (code, message, param, value) => {
    var error = new Error();
    error.statusCode = code;
    error.message = message;
    error.param = param;
    error.value = value;
    throw error;
}

exports.dataResponse = (message, data) => {
    return { 
        message: message,
        data: data
    };
}