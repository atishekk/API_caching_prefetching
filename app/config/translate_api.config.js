const request_options = {
    "method": "POST",
    "hostname": "google-translate1.p.rapidapi.com",
    "port": null,
    "path": "/language/translate/v2",
    "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "accept-encoding": "application/gzip",
        "x-rapidapi-host": "google-translate1.p.rapidapi.com",
        "x-rapidapi-key": process.env.API_KEY,
        "useQueryString": true
    }
};

module.exports = request_options;
