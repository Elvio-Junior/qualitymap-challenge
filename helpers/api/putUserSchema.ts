export const putUserSchema = {
    "type": "object",
    "properties": {
      "nome": {
         "type": "string"
      },
      "email": {
        "type": "string"
      },
      "password": {
        "type": "string"
      },
      "administrador": {
        "type": "string"
      }
    }
};