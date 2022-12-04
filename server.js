const express = require('express');
const app = express();
const upload = require("multer")();
const next = require('next');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(bodyParser.json());




const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const mailer = require("nodemailer");

nextApp.prepare().then(() => {

  app.post('/sendmail', upload.single('anexo'), (req, res) => { 
    const nome = req.body.nome;
    const email = req.body.email;
    const mensagem = req.body.mensagem;
    const indicado = req.body.indicado;
    const anexo = req.file;
    const smtpTransport = mailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        secure: false, //SSL/TLS
        auth: {
            user: "974fa162d843a6",
            pass: "6cb1abf13ced8a"
        }
    })

  
    
    const mail = {
        from: 'Pessoas',
        subject: 'Indicação',
        to: 'email@novatics.com.br',
      html: `<h3>Indicação</h3>
      <p>Pessoa que indicou: ${nome}</p>
      <p>Indicado: ${indicado}</p>
      <p>E-mail de quem indicou: ${email}</p>
      <p>Comentários: ${mensagem}</p>
      `,
    };
    
    if(anexo){
        console.log(anexo);
        mail.attachments = [];
        mail.attachments.push({
            filename: anexo.originalname,
            content: anexo.buffer
        })
    }
    
    return  smtpTransport.sendMail(mail).then((trans) => {
        res.status(200).send('Obrigado');
    }).catch((error) => {
        res.status(500).send('Houve um erro ao enviar e-mail. Detalhe: '+error);
    });
        
}) 

  // Message Sending


  app.get("*", nextHandler);
  app.post('*', nextHandler);



  
  app.listen(port, err => {
    if (err) throw err
    console.log(`Listening on port ${port}`)
  })
})
