const { get, test } = require("../cache/operations");
/*
 * data: String to be translated
 * source: Source language
 * dest: translated language
 * Flow:
    -> Check cache
    -> Search by body, source, and dest if exists then return it
    -> Cache miss - fetch from the translation api along with similar languages in 
        config.similar object and add to the database 
*/
exports.Translation = async (req, res) => {
    console.log(req.body);
    await test(req.body);
    const resp = await get(req.body);
    res.json({value: resp});
}
