const express = require('express');
const router = express.Router(); //Função para identificar as rotas que estão chegando no servidor

const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middlewares/TaskValidation');

router.post('/', TaskValidation, TaskController.create); //Escuta o método post no caminho '/' , e executa o método Create dentro da TaskController

router.put('/:id', TaskController.update);

router.get('/filter/all/:macaddress', TaskController.all);

router.get('/:id/:macaddress', TaskController.show);

router.delete('/:id', TaskController.delete);

router.put('/:id/:done', TaskController.done);

router.get('/filter/late/:macaddress', TaskController.late);

router.get('/filter/today/:macaddress', TaskController.today);

router.get('/filter/week/:macaddress', TaskController.week);

router.get('/filter/month/:macaddress', TaskController.month);

router.get('/filter/year/:macaddress', TaskController.year);

module.exports = router; //exporta a rota 