const PORT = 8000
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(express.json())
app.use(cors())

const LANGUAGE_MODEL_API_KEY = process.env.LANGUAGE_MODEL_API_KEY
const LANGUAGE_MODEL_URL = `https://generativelanguage.googleapis.com/v1beta1/models/chat-bison-001:generateMessage?key=${LANGUAGE_MODEL_API_KEY}`
// const LANGUAGE_MODEL_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${LANGUAGE_MODEL_API_KEY}`


const usersTable = [ 'John', 'Sally', 'Andre'
]
const db = {users: usersTable}





app.get('/', (req, res) => {
    res.json(db.users);
    console.log(res.json(db.users))
})

// app.post('/signin', (req, res) => {
    // db.select('email', 'hash').from('login')
    // .where('email', '=', req.body.email)
    // .then(data => {
    //     const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
    //     if (isValid) {
    //         return db.select('*').from('users')
    //         .where('email', '=', req.body.email)
    //         .then(user => {
    //             res.json(user[0])
    //         })
    //         .catch(err => res.status(400).json('unable to get user'))
    //     } else {
    //         res.status(400).json('wrong credentials')
    //     }
    // })
    // .catch(err => res.status(400).json('wrong credentials'))
// })


// app.post('/register', (req, res) => {
    // const {name, email, password} = req.body;
    // const hash = bcrypt.hashSync(password);
    // db.transaction(trx => {
    //     trx.insert({
    //         hash: hash,
    //         email: email
    //     })
    //     .into('login')
    //     .returning('email')
    //     .then(loginEmail => {
    //         return trx('users')
    //         .returning('*')
    //         .insert({
    //             email: loginEmai[0],
    //             name: name,
    //             joined: new Date()
    //         })
    //         .then( user => {
    //             res.json(user[0]);
    //         })
    //     })
    //     .then(trx.commit)
    //     .catch(trx.rollback)
    // })
    // .catch(error => re.status(400).json('unable to register!'))

// app.get('/profile/:id', (req, res) => {
    // const { id } = req.params;
    // let found = false;
    // db.select('*').from('users').where({id})
    // .then(users => {
    //     if (user.length) {
    //         res.json(user[0])
    //     } else {
    //         res.status(400).json('Not found')
    //     }
    // })
    //     if (user.id === id) {
    //         found = true;
    //         return res.json(user);
    //     }
    // })
    // .catch(err => res.status(400).json('error getting user'))
// })

app.get('/prompt/:text', async (req, res) => {
    const text = req.params.text

    const payload = {
        prompt: { "messages": [{ "content": text }]},
        temperature: 0.1,
        candidate_count: 1,
    }
    const response = await fetch(LANGUAGE_MODEL_URL, {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        method: "POST",
    })
    const data = await response.json()
    console.log(data)
    res.send(data)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))


