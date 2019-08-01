import joi from "joi";

const idschema = joi.string().length(36);
const nameschema = joi.string().min(3);

export { idschema, nameschema };
