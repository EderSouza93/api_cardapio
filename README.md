# Cardápio Digital - API

Este projeto é uma API para um sistema de cardápio digital que gerencia pedidos de restaurante, tanto para mesas no local quanto para delivery.

## Funcionalidades

- Gerenciamento de pedidos para mesas e delivery
- Controle de status dos pedidos
- Painel administrativo para gerenciamento de pedidos

## Tecnologias Utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose

## Estrutura do Projeto
```
/projeto-cardapio-digital
|-- /src
|   |-- /config
|   |   |-- database.js
|   |-- /models
|   |   |-- order.model.js
|   |-- /controllers
|   |   |-- order.controller.js
|   |-- /routes
|   |   |-- order.routes.js
|   |-- /middlewares
|   |   |-- errorHandler.js
|-- server.js
|-- .env
|-- package.json
|-- README.md
```

## Instalação

1. Clone o repositório:

git clone https://github.com/EderSouza93/api_cardapio

2. Instale as dependências:

cd api-cardapio
npm install

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto e adicione:

MONGO_URI=sua_string_de_conexao_mongodb
PORT=3000

4. Inicie o servidor:

npm start 

## Uso

### Criar um Pedido

POST `/api/orders`

- Exemplo de corpo da requisição para pedido na mesa:
```json
{
"orderType": "mesa",
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
- Exemplo para pedido de delivery:
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

### Listar Pedidos

GET `/api/orders`
Parâmetros de consulta opcionais:

- `orderType`: "mesa" ou "delivery"
- `status`: "pendente", "preparando", "pronto", "entregue", "a caminho"

Atualizar Status do Pedido
PATCH `/api/orders/:id/status`

Exemplo de corpo da requisição:

```json
{
  "status": "preparando"
}
````
### Contribuição

Contribuições são bem-vindas! Por favor, siga estes passos:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Faça commit das suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

### Licença
Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE.md para detalhes.
Contato
Eder Souza - ederdev93@gmail.com

Link do Projeto: https://github.com/EderSouza93/api_cardapio