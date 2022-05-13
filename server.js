const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.set('view engine', 'ejs');
const https = require('https');
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
app.use(bodyparser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb+srv://andyhplau:comp1537@cluster-comp1537-assign.679wm.mongodb.net/2537-assignments?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const pokemonSchema = new mongoose.Schema({
    id: Number,
    name: String
});

const pokemonModel = mongoose.model("pokemons", pokemonSchema);
const apiTypeModel = mongoose.model("api_types", pokemonSchema);
const typeModel = mongoose.model("types", pokemonSchema);

app.listen(process.env.PORT || 5000, function (err) {
    if (err) console.log(err);
})

app.get('/', function (req, res) {
    res.send("<p>To access pokemon: /api/pokemon/:id</P><br><p>To access type: /api/type/:id</p>")
})

// CRUD

// R
app.get('/api/pokemon/:id', function (req, res) {
    pokemonModel.find({
        id: req.params.id
    }, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send(data[0]);
    })
})

app.get('/api/pokemon/:name', function (req, res) {
    pokemonModel.find({
        name: req.params.name
    }, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send(data[0]);
    })
})

app.get('/api/type', function (req, res) {
    apiTypeModel.find({}, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send(data[0]);
    });
})

app.get('/api/type/:id', function (req, res) {
    typeModel.find({
        id: req.params.id
    }, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send(data[0]);
    });
})