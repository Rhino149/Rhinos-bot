const Discord = require("discord.js");
const DBL = require('dblapi.js');
const express = require('express');
const http = require('http');
const client = new Discord.Client({})
const app = express();
const server = http.createServer(app);
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjMxMTY2NzIzOTU1MTAwNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTkxMDI3NzkxfQ.p-3Gr55LmVqaPcAaDOPuy0L_bUIvYXRne_c4tPn1NME', { webhookAuth: 'rhinos', webhookServer: server });

dbl.webhook.on('ready', hook => {
  console.log(`Webhook running with path ${hook.path}`);
});
dbl.webhook.on('vote', vote => {
  console.log(`User with ID ${vote.user} just voted!`);
});

app.get('/dblwebhook', (req, res) => {
  console.log("Ping received!");
});

server.listen(5000, () => {
  console.log('Listening');
});
