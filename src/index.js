const express = require('express'); //carrega o pacote express
const cors = require('cors');
const server = express(); //inicializa o express dentro da variavel serer
server.use(cors()); // Permite o Backend aceitar conexão com os projetos
server.use(express.json()) //diz ao servidor que vamos devolver e receber informações json


const TaskRoutes = require('./routes/TaskRoutes');
server.use('/task', TaskRoutes) //Quando chegar uma requisição no servidor /task, ele executa o TaskRoutes

server.listen(3000, () => { //Escuta a porta 3000 e executa a arrow function
    console.log('API ONLINE'); //Starta o servidor localhost na porta 3000
})





//server.get('/teste', (req, res) =>{ //utiliza o server.get para realizar um chamado na API req é a requisição que já vem preenchida, res é a resposta
  //  res.send('Mudei a Api Denovo!!'); //envia uma resposta para o requisitante
//}) //Cria a rota localhost:3000/teste , ao entrar, é recebido a resposta do servidor