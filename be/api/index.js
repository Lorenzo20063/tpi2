const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3080;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Array globale per salvare gli utenti
const utenti = [];

app.get(`/`, (req, res) => {
  res.send("Ciao Mondo!")
});

app.get(`/utente`, (req, res) => {
  res.send("Ciao utente")
});

app.post(`/utente`, (req, res) => {
  const { nome, cognome, sesso, skills, dataNascita  } = req.body;
  if (!nome || !cognome || !sesso || !dataNascita ) {
    return res.status(400).json({
      error: "Dati mancanti"
    });
    }
  
  const nuovoUtente = { nome, cognome, sesso, skills,dataNascita  };
  utenti.push(nuovoUtente);
  
  res.json({
    message: `Utente ${nome} ${cognome} creato!`,
    utenti // restituisci l'intera lista degli utenti
  });
});

app.listen(PORT, () => {
  console.log('Server is running');
});
