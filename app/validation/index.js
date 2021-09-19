const Joi = require('joi');

const Payload = Joi.object({
    q: Joi.string().trim().required(),
    source: Joi.string().pattern(new RegExp('^[a-z]{2}$')).trim().required(),
    target: Joi.string().pattern(new RegExp('^[a-z]{2}$')).trim().required()
});

module.exports = { Payload };
