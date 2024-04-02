import { validate } from 'jsonschema';

export function validateJson(jsonResponse: JSON, jsonSchema: object) {
    return validate(jsonResponse, jsonSchema).valid;
};

