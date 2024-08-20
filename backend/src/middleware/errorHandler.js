// Error Handler
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Errore interno del server';

    res.status(statusCode).json({
        success: false,
        message: message,
    });
};

module.exports = errorHandler;