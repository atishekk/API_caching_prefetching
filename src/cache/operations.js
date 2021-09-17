const cache = require("./index")

exports.get = async (req_data) => {
    const Input = cache.input;
    const Translation = cache.translation;
    let resp;
    try {
        resp = await Input.findOne({
            attributes: ['body', 'source_lang'],
            where: {
                body: req_data.data,
                source_lang: req_data.source,
            },
            include: {
                model: Translation,
                attributes: ['response', 'dest_lang'],
                where: {
                    dest_lang: req_data.destination
                }
            }
        });
    } catch(err) {
        console.log("Error");
        console.log(err);
        return undefined;
    }
    console.log(JSON.stringify(resp));
    return resp.Translations[0].response;

};

exports.test = async (req_data) => {
    console.log(req_data)
    const Input = cache.input;
    const Translation = cache.translation;
    const new_data = await Input.create({body: req_data.data, source_lang: req_data.source});
    const new_translation = await Translation.create({response: "This is the translated text", dest_lang: req_data.destination});
    const another_translation = await Translation.create({response: "This is another translated text", dest_lang: "Hindi"});
    await new_data.addTranslation(new_translation);
    await new_data.addTranslation(another_translation);
}
