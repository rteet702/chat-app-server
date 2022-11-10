module.exports = (app) => {
    app.get("/api/test", (request, response) => {
        response.status(200).json({
            message: "Test completed successfully!",
        });
    });
};
