export const getAllUsersSchema = {
    "type": "object",
    "properties": {
      "quantidade": {
        "type": "number"
      },
      "usuarios": {
        "type": "array",
        "items": {
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
            },
            "_id": {
              "type": "string"
            }
          },
          "required": [
            "nome",
            "email",
            "password",
            "administrador",
            "_id"
          ]
        }
      }
    },
    "required": [
      "quantidade",
      "usuarios"
    ]
};