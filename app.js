const express = require('express')
const app = express()
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer({storage: storage})

const port = process.env.port || 3000

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.post('/api/upload', upload.single('file'), (req, res) => {
    res.json(req.file)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})