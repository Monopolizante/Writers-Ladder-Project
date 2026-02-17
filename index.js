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
        let palavra = req.body.palavra
        let response = await axios.get(`https://freedictionaryapi.com/api/v1/entries/en/${palavra}`)
        let synonyms = response.data.entries[0].synonyms
        let timing = []
        let i = 0
        let seconds = true
        synonyms.forEach((sinonimo) => {
            if (i === 10) {
                seconds = false;
                i = 0;
            }
            if (seconds) {
                timing.push(`animation-duration:0.${i}s;`);
            } else {
                timing.push(`animation-duration:1.${i}s;`);
            }

            i++;
        })
        res.render("index.ejs", { sinonimos: synonyms, duration: timing, j: 0 })
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`Servidor ligado na porta ${port}`)
})