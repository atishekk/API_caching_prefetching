const qs = require("querystring");
const http = require("https");
const { request_options } = require("../config");

exports.fetch = (data) => {
    const options = request_options;
    return new Promise((resolve, reject) => {
        const req = http.request(options, res => {
            res.setEncoding('utf8');
            let response = '';

            res.on('data', (chunk) => {
                response += chunk;
            });

            res.on('end', () => {
                resolve(JSON.parse(response));
            });
        });
        req.on('error', (err) => {
            reject(err);
        });
        req.write(qs.stringify(data));
        req.end();
    })
}

