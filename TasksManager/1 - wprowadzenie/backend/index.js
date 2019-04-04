import express from 'express'
import bodyParser from 'body-parser'
import 'dotenv/config'
import cors from 'cors'
import fs from 'fs'

const app = express(),
    PORT = process.env.PORT || 3000

//umożliwia użycie biblioteki qs zamiast querystring, jest to po prostu bardziej bogatsza wersja biblioteki do obsługi
//extended true umożliwia dostęp do req.body bez konieczności parsowania obiektu ze stringa lub tablicy
//ponieważ podczas odbierania wartość może być String lub Array, natomiast w bibliotece querystring może być dowolnym typem
app.use(bodyParser.urlencoded({ extended: true }))

//automatyczne parsowanie req.body na Content Type - JSON
app.use(bodyParser.json())

//ustawienia polityki Cross Origin Resource Sharing - zabezpieczenie przed atakami
//możliwość wykluczenia niektórych stron i adresów, lub po prostu wpisanie listy adresów, które
//mają możliwość wysłania żądania TCP
//umożliwia również blokadę niektórych portów
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["POST"]
    })
)

let tab = []

fs.readFile("data/people.json", (err, data) => {
    tab = []
    if (err) {
        throw err
    }
    tab = JSON.parse(data)
})


app.get("/", (req, res) => {
    res.send(tab)
})

app.listen(PORT, () => {
    console.log(`Application is running on port: ${PORT}`)
})