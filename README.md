# Gerenciador de Vendas e Estoque Backend
 
Esse é a minha api/backend que eu desenvolvi como um projeto pessoal e também para gerenciamento do meu negócio aqui na região onde eu moro. Totalmente desenvolvido em TypeScript e NodeJs, e isso tem sido um mega desafio, pois nunca tinha desenvolvido uma api desde o 0, ainda mais completa, com Autenticação de Usuário, ecriptação e etc.

Rodo o servidor em uma instância EC2 da aws e o meu orm é o Firebase do Google e o Sequelize, ou melhor 'firestore-sequelize'.

Como rodar:

Após clonar o repositório, terá que criar o seu arquivo .env, e ter a sua key do Firebase, atualize os arquivos(alterações nos nomes, extensões talvez e etc) e então pode rodar o npm install ou yarn install.

Logo depois, você deve entrar na pasta src e rodar o comando "npx nodemon server.ts" e pronto, o servidor estará rodando localmente na porta 8080