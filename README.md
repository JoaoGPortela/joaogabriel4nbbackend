Documentação do projeto backend

Fizemos um backend focado em registro e login de usuário, fornecendo um token jwt como o desejado.

-----------------------------------------------------------------------------------------

Funções dos arquivos

.env - Conexão com banco de dados, porta utilizada e token de segurança.

packages e afins são as configurações globais do projeto incluindo o tsconfig

server - Sincroniza com o banco e roda o servidor para que o mesmo seja utilizado e consumido.

database - Utilizamos o Sequelize para configurar o banco de dados corretamente.

authController / authServices- Controlador das funções de users, usando os serviços de Services para o padrão MVC.

models - Modelo dos atributos do banco e uma lógica de como se espera que os dados sejam recebidos.

UserRepository - Usado para as funções que realizam buscas no banco de dados do sistema.

Devido a dificuldades com o projeto conseguimos um meio de realiza-lo utilizando a pasta dist, que seria um js complementar para transpilar o código e o manda-lo para produção.

-----------------------------------------------------------------------------------------

Como usar

Após instalação do projeto realize um npm install em seu terminal dentro do projeto para instalação das dependências de node_modules e execute o servidor
compila caso precise
npm run build
starta o server
npm start
criar usuario
curl -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d "{\"username\":\"newuser\", \"password\":\"securepassword\"}"

login
curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d "{\"username\":\"newuser\", \"password\":\"securepassword\"}"

-----------------------------------------------------------------------------------------

    Estrutura do Projeto

    dist
        config
            database.js
        controllers
            authController.js
        models
            user.js
        repositories
            UserRepository.js
        routes
            AuthRoutes.js
        services
            AuthServices.js
        server.js
    node_modules
    src
        config
            database.ts
        controllers
            authController.ts
        models
            user.ts
        repositories
            UserRepository.ts
        routes
            AuthRoutes.ts
        services
            AuthServices.ts
        server.ts
    .env
    package-lock.json
    package.json
    README.md
    tsconfig.json