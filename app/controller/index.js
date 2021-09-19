const { get, write } = require("../cache/operations");
const { fetch, get_similar } = require("../utils");
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
    //validate the data - joi
    let resp;
    try {
        const cleaned_req = await Payload.validateAsync(req.body)
        resp = await get(cleaned_req);
        if(resp === undefined) {
            const api_resp = await fetch(cleaned_req);
            if(api_resp.error) {
                throw new Error("Error: Invalid payload")
            } else if(api_resp.message) {
                resp = api_resp.message
            }
            else {
                resp = api_resp.data.translations[0].translatedText;
                //write to the cache
                await write(cleaned_req, resp);
                res.json({value: resp});
                await prefetch_and_cache(cleaned_req);
                return;
            }
        } else return res.json({value: resp});
    } catch (error) {
        console.log(error);
        resp = error.details[0].message || "Error: Invalid Payload";
    }
    return res.status(400).json({error: resp});
}

const prefetch_and_cache = async (req_data) => {
    const similar_langs = get_similar(req_data);
    for(let i = 0; i < similar_langs.length; i++) {
        req_data.target = similar_langs[i];
        const api_resp = await fetch(req_data);
        if(api_resp.error || api_resp.message) {
            return;
        } else {
            const resp = api_resp.data.translations[0].translatedText;
            await write(req_data, resp);
        }
    }
}
