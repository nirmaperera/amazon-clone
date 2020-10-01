const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51HXTdHDFq5Jfszr51GIMtZMqneX3Ay2e7XTHELs11CWHniFbpcu67A0atkOhu38Lj4GNBqvgI8cLO6XV5euFYm6900KaQA17Uv');
//APi

//-App config
const app = express();

//-middlewares
app.use(cors({ origin: true }));
app.use(express.json()); // send data in json

//-API Routes
app.get("/", (request, response) => response.status(200).send("hello world"));
app.post("/payments/create", async (request, response) => {
    const total = request.query.total;
    console.log('payment request received!! => ', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunits of the currency
        currency: "usd",
    });

    response.status(201).send({ //ok- created
        clientSecret: paymentIntent.client_secret,
    });
});

//Listen
exports.api = functions.https.onRequest(app)


