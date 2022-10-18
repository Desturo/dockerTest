const keys = require('./keys')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const { Pool } = require('pg')
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    databas: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
})

pgClient.on('connect', (client) => { 
    client
        .query("CREATE TABLE IF NOT EXISTS values (number INT)")
        .catch(err => console.log('PG ERROR: ', err))
})

app.get('/', (req, res) => { 
    res.send('Hi')
})

app.get('/values/all', async(req, res) => { 
    const values = await pgClient.query('SELECT * FROM values')

    res.send(values)
})

app.post('/values', (req, res) => {
    if(!req.body.value) res.send({ working: false })

    pgClient.query('INSERT INTO values(number) VALUES($1)', [req.body.value])
    res.send({ working: true })
})

app.listen(5000, (err) => {
    console.log('Listenig on port 5000...')
})