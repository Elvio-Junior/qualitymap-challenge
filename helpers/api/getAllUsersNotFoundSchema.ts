export const getAllUsersNotFoundSchema = {
    "type": "object",
    "properties": {
      "quantidade": {
        "type": "number"
      },
      "usuarios": {
        "type": "array",
        "items": {}
      }
    },
    "required": [
      "quantidade",
      "usuarios"
    ]
};