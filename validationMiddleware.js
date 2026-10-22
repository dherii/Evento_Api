const Joi = require('joi');

const validateEvent = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        date: Joi.date().iso().required(),
        capacity: Joi.number().integer().min(1).required()
    });
    
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    next();
};

const validateRegistration = (req, res, next) => {
    const schema = Joi.object({
        participantName: Joi.string().required(),
        email: Joi.string().email().required()
    });
    
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    next();
};

module.exports = { validateEvent, validateRegistration };