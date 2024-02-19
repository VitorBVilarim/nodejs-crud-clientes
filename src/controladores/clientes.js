import { conexaoDb } from '../conexao/conexao.js'


export async function consultarCliente(req, res) {
    const { cpf } = req.query
    try {
        if (cpf) {
            const cliente = await conexaoDb('clientes').select().where({ cpf: cpf })

            return res.status(200).json(cliente[0])
        }

        const clientes = await conexaoDb('clientes').select()

        return res.status(200).json(clientes)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: 'Erro interno no servidor' })
    }
}


export async function cadastrarCliente(req, res) {
    const { nome, telefone, cpf, email, cep, rua, cidade, estado } = req.body
    try {

        const verificEmailExistente = await conexaoDb('clientes').select().where({ email: email }).first()
        if (verificEmailExistente) {
            return res.status(400).json({ message: 'Este email já esta em uso por outro cliente!' })
        }

        const verificCpfExistente = await conexaoDb('clientes').select().where({ cpf: cpf }).first()
        if (verificCpfExistente) {
            return res.status(400).json({ message: 'Este cliente já possui cadastro!' })
        }

        const cliente = await conexaoDb('clientes').insert({
            nome, telefone, cpf, email, cep, rua, cidade, estado
        }).returning('*')
        console.log(cliente)
        return res.status(201).json(cliente[0])
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno no servidor' })
    }
}

export async function atualizarDadosCliente(req, res) {
    const { id } = req.params
    const { nome, telefone, cpf, email, cep, rua, cidade, estado } = req.body
    try {
        const verificEmailExistente = await conexaoDb('clientes').select().where({ email: email }).whereNot('id', id).first()
        if (verificEmailExistente) {
            return res.status(400).json({ message: 'Este email já esta em uso por outro cliente!' })
        }

        const verificCpfExistente = await conexaoDb('clientes').select().where({ cpf: cpf }).whereNot('id', id).first()
        if (verificCpfExistente) {
            return res.status(400).json({ message: 'Este cpf já está em uso.' })
        }

        const cliente = await conexaoDb('clientes').where({ id: id }).returning('*').first()

        if (!cliente) {
            return res.status(404).json({ message: 'o Cliente informado não existe.' })
        }

        const clienteAtualizado = await conexaoDb('clientes').update({
            nome, telefone, cpf, email, cep, rua, cidade, estado
        }).where({ id: id }).returning('*')

        return res.status(200).json(clienteAtualizado[0])

    } catch (error) {

        return res.status(500).json({ message: 'Erro interno no servidor' })
    }
}

export async function deletarCliente(req, res) {
    const { id } = req.params
    try {
        const cliente = await conexaoDb('clientes').where({ id: id }).returning('*').first()
        if (!cliente) {
            return res.status(404).json({ message: 'o Cliente informado não existe.' })
        }

        await conexaoDb('clientes').delete().where({ id: id })

        return res.status(204).send()
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno no servidor' })
    }
}