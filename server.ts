import {PrismaClient} from '@prisma/client'
import express from 'express'
import cors from 'cors'

const App = express()
const UsersDB = new PrismaClient()

App.use(express.json());
App.use(cors())

App.get('/Users', async (req,res)=>{
    try{
        const Users = await UsersDB.user.findMany()
        res.json(Users).status(200)
    }catch(err){
        res.json({message:'Erro ao listar usuários',Error:err}).status(401)
    }
})
  
App.get('/User/:id', async (req,res)=>{
    try{
        const UserId = req.params.id
        const Users = await UsersDB.user.findUnique({where:{id:UserId}})
        res.json(Users).status(200)
    }catch(err){
        res.json({message:'Erro ao listar usuários',Error:err}).status(401)
    }
})

App.post('/Users', async (req, res) => {
    try {
        const { Email, Name, Password,Message } = req.body;
        await UsersDB.user.create({
            data: { Email, Name, Password,Message }
        });
        res.status(201).json({ message: 'Sucesso ao criar o usuário' });
    } catch (err) {
        res.status(400).json({ message: 'Erro ao criar o usuário, verifique os dados', error: err });
    }
});


App.put('/Users', async (req, res) => {
    try {
        const { Name,Message,id,Password } = req.body;
        await UsersDB.user.update({
            where:{id:id,Password:Password},
            data: { Name,Message }
        });
        res.status(201).json({ message: 'Sucesso ao editar o usuário' });
    } catch (err) {
        res.status(400).json({ message: 'Erro ao editar o usuário, verifique os dados', error: err });
    }
});

App.delete('/Users', async (req, res) => {
    try {
        const {Password,id} = req.body;
        await UsersDB.user.delete({
            where:{
                Password:Password,id:id
            }
        });
        res.status(201).json({ message: 'Sucesso ao deletar o usuário' });
    } catch (err) {
        res.status(400).json({ message: 'Erro ao deletar o usuário, verifique os dados', error: err });
    }
});



App.listen(2000,()=>{
    console.log('Servidor rodando na porta 2000')
})