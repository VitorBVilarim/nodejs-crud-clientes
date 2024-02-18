import express from 'express'

import {
    atualizarDadosCliente,
    cadastrarCliente,
    consultarCliente,
    deletarCliente
} from '../controladores/clientes.js'

import { validarCorpoRequisicao } from '../schemas/validar-requisicao.js'
import { schemaCliente } from '../schemas/schema-cliente.js'

export const rotas = express()

rotas.get('/clientes', consultarCliente)
rotas.post('/clientes', validarCorpoRequisicao(schemaCliente), cadastrarCliente)
rotas.put('/clientes/:id', validarCorpoRequisicao(schemaCliente), atualizarDadosCliente)
rotas.delete('/clientes/:id', deletarCliente)