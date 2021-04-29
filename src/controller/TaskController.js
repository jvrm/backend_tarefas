const TaskModel = require('../model/TaskModel'); //importa o modelo de banco de dados criado no TaskModel

const { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear} = require('date-fns');

const current = new Date();

class TaskController { //Cria a classe para executar a função create
    async create(req, res){
        const task = new TaskModel(req.body); //Espera o corpo da requisição
        await task
        .save()
        .then(response => {
            return res.status(200).json(response);
        }) //try
        .catch(error =>{
            return res.status(500).json(error);
        }) //catch 
    }


// Função acha o registro pelo ID e dá um update na tabela, primeiro ele busca o parâmetro _id recebendo o parâmetro da requisição.id, 
//que está definido em rotas, depois recebe o body da requisição. 
//O mongo verifica quais parâmetros mudaram e dá um update. New:true serve para retornar os dados do novo registro

    async update(req,res){
        await TaskModel.findByIdAndUpdate({'_id': req.params.id}, req.body, {new: true}) 
        .then(response =>{
            return res.status(200).json(response);
        })
        .catch(error =>{
            return res.status(500).json(error);
        })
    }

    async all (req, res){
        await TaskModel.find({ macaddress : {'$in' : req.params.macaddress}})
                .sort('when')
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(500).json(error);
                })
    }

    async show (req, res){
        await TaskModel.findById(req.params.id)
        .then(response => {
            if (response)
                return res.status(200).json(response)
            else
                return res.status(404).json({error: 'tarefa não encontrada'});
        })
        .catch(error => {
            return res.status(500).json(error);
        })
    }

    async delete (req, res){
        await TaskModel.deleteOne({'_id' : req.params.id})
        .then(response => {
            if (response)
                return res.status(200).json(response);
            else
                return res.status(500).json({error: 'Tarefa não encontrada'})
        })
        .catch(error => {
            return res.status(500).json(error);
        })

    }

    async done(req, res){
        await TaskModel.findByIdAndUpdate(
            {'_id' : req.params.id},
            {'done' : req.params.done},
            {new: true})
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
        
    }

    async late (req, res){
        await TaskModel
        .find({
            'when' : {'$lt' : current}, // $lt = lass then (menor do que)
            'macaddress' : {'$in' : req.params.macaddress}
        })

        .sort('when')
        .then( response => {
            return res.status(200).json(response);
        }) 
        .catch(error => {
            return res.status(500).json(error);
        })
    }

    async today (req, res){
        await TaskModel
        .find({
            'macaddress' : {'$in' : req.params.macaddress},
            'when' : {'$gte' : startOfDay(current), '$lt': endOfDay(current)}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        })
    }

    async week (req, res){
        await TaskModel
        .find({
            'macaddress' : {'$in' : req.params.macaddress},
            'when' : {'$gte' : startOfWeek(current), '$lt': endOfWeek(current)}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        })
    }

    async month (req, res){
        await TaskModel
        .find({
            'macaddress' : {'$in' : req.params.macaddress},
            'when' : {'$gte' : startOfMonth(current), '$lt': endOfMonth(current)}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        })
    }

    async year (req, res){
        await TaskModel
        .find({
            'macaddress' : {'$in' : req.params.macaddress},
            'when' : {'$gte' : startOfYear(current), '$lt': endOfYear(current)}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        })
    }
}

    

module.exports = new TaskController(); //Exporta um Task Controller já inicializado