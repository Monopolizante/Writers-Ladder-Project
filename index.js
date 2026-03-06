import express from 'express'
import axios from 'axios'

const port = 3000
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.post("/pesquisar", async (req, res) => {
    try {
        
        let palavra = req.body.palavra.toLowerCase().trim();//Vai Tirar espaços em branco e pesquisar em minúsculo (as palvras)
        let response = await axios.get(`https://freedictionaryapi.com/api/v1/entries/en/${palavra}`)
        let synonyms = response.data.entries[0].synonyms
        res.render("index.ejs", { sinonimos: synonyms })
    } catch (error) {
        console.log("Erro na pesquisa:", error.message);
        // Enviamos uma variável 'erro' para o HTML avisando o que aconteceu
        res.render("index.ejs", { erro: "Oops! We couldn't find synonyms for that word." });
    }
})

app.listen(port, () => {
    console.log(`Servidor ligado na porta ${port}`)
})