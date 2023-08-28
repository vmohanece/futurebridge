import Joi from "joi";

export const uservalidate = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName:Joi.string().required(),
    email:Joi.string().email({ minDomainSegments: 2}).required(),
    contactNo: Joi.string().required(),

});

export const userUpdatevalidate = Joi.object().keys({
    id: Joi.string().required(),
    firstName: Joi.string(),
    lastName:Joi.string(),
});

export const userDeletevalidate = Joi.object().keys({
    id: Joi.string().required(),
})