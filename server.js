require("dotenv").config();
const {app, connect_cache} = require("./app");

const port = process.env.NODE_DOCKER_PORT || 8080;

(async () => {
    await connect_cache();
    app.listen(port, () => {
        console.log(`Started the server at http://localhost:${port}`);
    })
})();
