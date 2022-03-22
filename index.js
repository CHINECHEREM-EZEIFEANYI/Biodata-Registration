require('dotenv').config()

const express = require('express')
const app = express()
const uuid = require('uuid')
const QRCode = require('qrcode')
const Joi = require('joi');
const cors = require("cors");

const {propagateData} = require('./hel')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('cors')


app.get('/', (req, res) => {
    res.send('Active')
})


/**
 * 
 * @param  firstName - The first name sent from the client
 * @param lastName - The last name sent from the client
 * This function returns a propagated object
 * @returns 
 */
app.post('/qrcode/image', async (req, res) => {
    const schema = Joi.object({
        firstName: Joi.string()
            .alphanum()
            .min(2)
            .max(50)
            .required(),
        lastName: Joi.string()
            .alphanum()
            .min(2)
            .max(50)
            .required(),
    })

    await schema.validateAsync(req.body).then(() => {
        // Request body validation

        const { firstName, lastName } = req.body
        let dataObject = propagateData(firstName, lastName)

        // Wrapping up the returned data object as a string
        let data = `id: ${dataObject.id}, firstName: ${dataObject.firstName}, 
        lastName: ${dataObject.lastName}, dateCreated: ${dataObject.dateCreated}, 
        registrationUrl: ${dataObject.registrationUrl}`

        // Create a base64 image and sends it to the client
        QRCode.toDataURL(JSON.stringify(data), function (error, data) {
            let base64Image = data.replace(/^data:image\/png;base64,/, '')
            let image = Buffer.from(base64Image, 'base64');
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': image.length
            });
            res.end(image);
        })

    }).catch(err => {
        res.send(err.details)
    })
})


/**
 * 
 * @param  firstName - The first name sent from the client
 * @param lastName - The last name sent from the client
 * This function returns a propagated object
 * @returns 
 */
app.post('/qrcode/link', async (req, res) => {
    const { firstName, lastName } = req.body
    let data = await propagateData(firstName, lastName)

    let filePath = `uploads/${data.id}.png`

    QRCode.toFile(filePath, [{
        data: JSON.stringify(data)
    }])

    let imagePath = `${process.env.HOST}/uploads/${filePath}`
    res.send(imagePath)
})



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Our app is litening on port ${PORT}`)
})