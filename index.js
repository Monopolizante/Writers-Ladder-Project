import express from 'express'
import axios from 'axios'

const port = 3000
const app = express()

app.listen(port, () => {
    console.log(`Servidor ligado na porta ${port}`)
})