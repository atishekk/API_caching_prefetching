const { get, write } = require("../cache/operations");
const { fetch } = require("../utils");
const { Payload } = require("../validation");
/*
 * data: String to be translated
 * source: Source language
 * dest: translated language
 * Flow:
    -> Check cache
    -> Search by body, source, and dest if exists then return it
    -> Cache miss - fetch from the translation api, send the result
    -> Get the translation for similar languages as in
        config.similar object and add to the cache
        */

exports.Translation = async (req, res) => {
    console.log(req.body);
    //validate the data - joi
    let resp;
    try {
        const cleaned_req = await Payload.validateAsync(req.body)
        resp = await get(cleaned_req);
        if(resp === undefined) {
            const api_resp = await fetch(cleaned_req);
            console.log(api_resp);
            if(api_resp.error) {
                throw new Error("Error: Invalid payload")
            } else if(api_resp.message) {
                resp = api_resp.message
            }
            else {
                resp = api_resp.data.translations[0].translatedText;
                //write to the cache
                await write(cleaned_req, resp);
            }
        }
    } catch (error) {
        console.log(error);
        resp = "Error: Invalid Payload";
    }
    //get from the cache
    //if undefined(cache miss) fetch from google translate and send the 
    res.json({value: resp});
    //prefetch here
    console.log("This is code is executed after the response");
}
