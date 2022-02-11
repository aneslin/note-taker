
const express = require('express')

const PORT = process.envPORT || 3001

const path = require('path')

const app = express()

const { notes } = require('./db/db.json')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

console.log(notes)
app.get('/api/notes', (req, res) => {
  const results = notes
  res.json(results)
})

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.listen(PORT, () => {
  console.log(`Server is now on port ${PORT}`)
})
