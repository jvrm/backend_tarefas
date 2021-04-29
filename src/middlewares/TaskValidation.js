const { isPast } = require('date-fns');
const TaskModel = require('../model/TaskModel');

const TaskValidation = async (req, res, next) => {

    const {macaddress, type, title, description, when} = req.body;

    if (!macaddress)
    return res.status(400).json({error: 'macaddress é obrigadótio'});
else if (!type)
    return res.status(400).json({error: 'type é obrigadótio'});
else if (!title)
    return res.status(400).json({error: 'title é obrigadótio'});
else if (!description)
    return res.status(400).json({error: 'description é obrigadótio'});
else if (!when)
    return res.status(400).json({error: 'when é obrigadótio'});
else if (isPast(new Date(when)))
    return res.status(400).json({error: 'when é uma data no passado'});
else{
    let exists;

    if (req.params.id){//verifica se há um ID, se houver é porque dará um update
        exists = await TaskModel.
                    findOne(
                        {
                            '_id' : {'$ne' : req.params.id}, // $ne procura qualquer id que seja diferente do passado, pois ele irá conferir se existe alguma tarefa que já tem a mesma data e hora da tarefa atualizada
                            'when' : {'$eq' : new Date(when)},
                            'macaddress': {'$in' : macaddress}
                        }
                    );
        if (exists){
            return res.status(400).json({ error: 'Não é possível atualizar. Pois já existe uma tarefa nesse dia e horário'});
        }
    } else{
        exists = await TaskModel //Await Task Model FindOne -> Percorre todo a tabela para verificar se existe um desses registros, como um select
        .findOne(
            {
                'when': {'$eq': new Date(when)}, //$eq busca exatamente igual
                'macaddress' : {'$in' : macaddress} //$in verifica se está contido
            }
        );

        if (exists){
            return res.status(400).json({ error: 'Não é possível criar. Existe uma tarefa nesse dia e horário'});
        }
    }
        
}
    next();

}


module.exports = TaskValidation;