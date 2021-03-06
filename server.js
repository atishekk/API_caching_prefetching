require("dotenv").config();
const {app, connect_cache} = require("./app");

const port = process.env.NODE_DOCKER_PORT || 8080;

// Start the server instance
(async () => {
    await connect_cache();
    console.log("Connected with the cache");
    app.listen(port, () => {
        console.log(`Started the server at http://localhost:${port}`);
    })
})();
