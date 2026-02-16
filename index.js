import express from 'express'
import axios from 'axios'

const port = 3000
const app = express()
app.use(express.urlencoded({ extended: true}))

app.get("/" , (req, res) =>{
    res.render("index.ejs")
})

app.post("/pesquisar" , async (req, res) => {
    try{
        let palavra = req.body.palavra
        let response = await axios.get(`https://freedictionaryapi.com/api/v1/entries/en/${palavra}`)
        let synonyms = response.data.entries[0].synonyms
        res.render("index.ejs", {sinonimos: synonyms})
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`Servidor ligado na porta ${port}`)
})