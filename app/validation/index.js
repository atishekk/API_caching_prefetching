const Joi = require('joi');

const Payload = Joi.object({
    q: Joi.string().required(),
    source: Joi.string().pattern(new RegExp('^[a-z]{2}$')),
    target: Joi.string().pattern(new RegExp('^[a-z]{2}$')).required()
});

module.exports = { Payload };
