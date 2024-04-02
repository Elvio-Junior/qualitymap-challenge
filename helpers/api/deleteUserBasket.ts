export const deleteUserBasket = {
    "type": "object",
    "properties": {
      "message": {
        "type": "string"
      },
      "idCarrinho": {
        "type": "string"
      }
    },
    "required": [
      "message",
      "idCarrinho"
    ]
};