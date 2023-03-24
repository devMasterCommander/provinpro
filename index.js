const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.post('/send_mail', (req, res) => {
  const {profesional, codigo, cliente, email_cliente, cuerpo} = req.body

  const transporter = nodemailer.createTransport({
    service: "Outlook365",
    host: 'smtp.office365.com',       //'116.203.146.90',
    port: 587,                        //465,
    secure: true,
    requireTLS: true,
    tls: {
      rejectUnauthorized: false,       //ciphers: 'SSLv3'  //rejectUnauthorized: false
      ciphers: 'SSLv3'
    },
    auth: {
      user: 'info@npro.es',           // 'recomendaciones@npro.es',
      pass: 'Bacterias14!14',         // '%qrSo078'
    }
  })

  let mailOptions = {
    from: 'recomendaciones@npro.es',
    to: email_cliente,
    //bcc: 'recomendaciones@npro.es',
    subject: 'Recomendación profesional - NPro Salud Intestinal',
    html: cuerpo
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message sent:', info.messageId)
    res.send('Received')
  })
})

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at PORT:${port}`)
})