"use strict";

import express from "express";
import cors from "cors";

function rollDie(request, response) {
    let result = Math.floor(Math.random() * 6) + 1
    return response.json({ roll: result });
}

const app = express();     
app.use(cors());
app.use(express.json());

app.get('/roll/', rollDie);

app.listen(3000, () => {
  console.log("API listening on port 3000");
});
