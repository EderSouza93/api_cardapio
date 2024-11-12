# Digital Menu - API

This project is an API for a digital menu system that manages restaurant orders, both for in-house tables and delivery.

## Features

- Order management for tables and delivery
- Order status tracking
- Admin panel for order management

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Project Structure
```
/projeto-cardapio-digital
|-- /src
|   |-- /config
|   |   |-- cors.js
|   |   |-- database.js
|   |-- /models
|   |   |-- order.model.js
|   |   |-- user.model.js
|   |-- /controllers
|   |   |-- auth.controller.js
|   |   |-- order.controller.js
|   |-- /routes
|   |   |-- auth.routes.js
|   |   |-- order.routes.js
|   |-- /middleware
|   |   |-- auth.middleware.js
|   |-- /utils
|   |   |-- errorHandler.js
|-- server.js
|-- .env
|-- package.json
|-- README.md
```

## Installation

1. Clone the repository:

git clone https://github.com/EderSouza93/api_cardapio

2. Install dependencies:

cd api-cardapio
npm install

3. Set up environment variables:
   Create a .env file in the project root and add:

MONGO_URI=sua_string_de_conexao_mongodb
PORT=3000

4. Start the server:

npm start 

## Usage

### Create an Order

POST `/api/orders`

- Example request body for a table order:
```json
{
"orderType": "table",
"mesa": "12",
"items": [
 {
   "name": "Pizza Margherita",
   "quantity": 1,
   "price": 25.99
 }
]
}
````
- Example for a delivery order::
```json
{
  "orderType": "delivery",
  "enderecoEntrega": {
    "rua": "Rua Exemplo",
    "numero": "123",
    "complemento": "Apto 456",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "cep": "12345-678"
  },
  "items": [
    {
      "name": "Hambúrguer",
      "quantity": 2,
      "price": 18.50
    }
  ]
}
```

### List Orders 

GET `/api/orders`
Optional query parameters:

- `orderType`: "table" ou "delivery"
- `status`: "pending", "preparing", "ready", "delivered", "on the way"

Update Order Status
PATCH `/api/orders/:id/status`

Example request body:

```json
{
  "status": "Preparing"
}
````
### Contribution

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

### License
This project is licensed under the MIT License - see the LICENSE.md file for details.
Contact
Eder Souza - ederdev93@gmail.com

Project Link: https://github.com/EderSouza93/api_cardapio
