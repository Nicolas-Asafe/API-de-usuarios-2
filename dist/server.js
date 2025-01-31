"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const App = (0, express_1.default)();
const UsersDB = new client_1.PrismaClient();
App.use(express_1.default.json());
App.use((0, cors_1.default)());
App.get('/Users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Users = yield UsersDB.user.findMany();
        res.json(Users).status(200);
    }
    catch (err) {
        res.json({ message: 'Erro ao listar usuários', Error: err }).status(401);
    }
}));
App.get('/User/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserId = req.params.id;
        const Users = yield UsersDB.user.findUnique({ where: { id: UserId } });
        res.json(Users).status(200);
    }
    catch (err) {
        res.json({ message: 'Erro ao listar usuários', Error: err }).status(401);
    }
}));
App.post('/Users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Name, Password, Message } = req.body;
        yield UsersDB.user.create({
            data: { Email, Name, Password, Message }
        });
        res.status(201).json({ message: 'Sucesso ao criar o usuário' });
    }
    catch (err) {
        res.status(400).json({ message: 'Erro ao criar o usuário, verifique os dados', error: err });
    }
}));
App.put('/Users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, Message, id, Password } = req.body;
        yield UsersDB.user.update({
            where: { id: id, Password: Password },
            data: { Name, Message }
        });
        res.status(201).json({ message: 'Sucesso ao editar o usuário' });
    }
    catch (err) {
        res.status(400).json({ message: 'Erro ao editar o usuário, verifique os dados', error: err });
    }
}));
App.delete('/Users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Password, id } = req.body;
        yield UsersDB.user.delete({
            where: {
                Password: Password, id: id
            }
        });
        res.status(201).json({ message: 'Sucesso ao deletar o usuário' });
    }
    catch (err) {
        res.status(400).json({ message: 'Erro ao deletar o usuário, verifique os dados', error: err });
    }
}));
App.listen(2000, () => {
    console.log('Servidor rodando na porta 3000');
});
