import express from 'express'
import dotenv from 'dotenv/config.js'
import cors from 'cors'
import { rotas } from './rotas/rotas.js'

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use(rotas)

app.listen(port, () => console.log(`Servidor inicializado na porta ${port}`))