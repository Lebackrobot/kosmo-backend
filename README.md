# kosmo-backend
Backend para porocesso seletivo para Kosmo, gerenciador de carrinho. Para executar o projeto basta instalar as dependências, upar as migrations e rodar o projeto, portando vai para root do projeto e cole o seguindo comando:

```shell
cd config/npx knex migrate:latest; cd ../
npm install && npm start
```

<br> 

## Features implementadas
- [x] Adicionar itens ao carrinho de compra
- [x] Ajustar quantidade de itens no carrinho de compra
- [x] Limpar carrinho de compras
- [x] Confirmar pedido de compra
- [x] Endpoints de usuário
- [x]  Rotas autorizadas no header com JWT
- [x]  Senhas criptografadas (bcrypt)
<br>


## Endpoints
Foram desenvolvidos os endpoins com rotas autenticadas (auth) e não autenticadas (noauth)

#### Rotas não autenticadas (noauth)
Method |  EndPoint | Body Params | Headers |Returns
:---------: | :------ | :-------: | :--------: | :--------:
<strong>POST</strong>| /noauth/signin |  {name, email, password} | -  | { success, message }
<strong>POST</strong>| /noauth/signin |  {email, password} | -  | { success: , data: { `token` }, message} 

<br>

#### Rotas autenticadas (auth)
Method |  EndPoint | Body Params | Headers |Returns
:---------: | :------ | :-------: | :--------: | :--------:
<strong>POST</strong>| /auth/carts |  {productId, quantity}  | Authorization: `token` | `cartModel`
<strong>PUT</strong>| /auth/carts/:cartId |  - | Authorization: `token` | `cartModel`
<strong>DELETE</strong>| /auth/carts/cartId |  - | Authorization: `token` | { success, message }
<strong>GET</strong>| /auth/carts |  - | Authorization: `token` | `cartModel`
<strong>POST</strong>| /auth/sales |  - | Authorization: `token` | `salesModel`



## Database
![Screenshot from 2024-03-19 06-24-07](https://github.com/Lebackrobot/kosmo-backend/assets/49316490/24ffeba9-f576-4524-8a39-c23e3bbbf06b)
