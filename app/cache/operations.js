const { cache } = require("./index")

exports.get = async (req_data) => {
    const Input = cache.input;
    const Translation = cache.translation;
    let resp;
    try {
        resp = await Input.findOne({
            attributes: ['q', 'source'],
            where: {
                q: req_data.q,
                source: req_data.source,
            },
            include: {
                model: Translation,
                attributes: ['response', 'target'],
                where: {
                    target: req_data.target
                }
            }
        });
    } catch(err) {
        console.log("Error");
        console.log(err);
        return undefined;
    }
    return resp !== null ? resp.Translations[0].response : undefined;

};

exports.write = async (req_data, translated) => {
    const Input = cache.input;
    const Translation = cache.translation;
    //check if the input already exists
    let object = await Input.findOne({
        where: {
            q: req_data.q,
            source: req_data.source
        }
    });
    if(object === null) {
        object = await Input.create({q: req_data.q, source: req_data.source});
    } 
    const new_translation = await Translation.create({response: translated, target: req_data.target});
    await new_translation.setInput(object);
}

////testing 
//exports.test = async (req_data) => {
//    console.log(req_data)
//    const Input = cache.input;
//    const Translation = cache.translation;
//    const new_data = await Input.create({q: req_data.q, source: req_data.source});
//    const new_translation = await Translation.create({response: "This is the translated text", target: req_data.target});
//    const another_translation = await Translation.create({response: "This is another translated text", target: "Hindi"});
//    await new_data.addTranslation(new_translation);
//    await new_data.addTranslation(another_translation);
//}
