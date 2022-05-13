const express = require('express')
const app = express()
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
    abilities: {
        ability: {
            name: String,
            url: String
        },
        is_hidden: Boolean,
        slot: Number
    },
    height: Number,
    id: Number,
    name: String,
    sprites: {
        other: {
            official_artwork: {
                front_default: String
            }
        }
    },
    stats: [{
        base_stat: Number,
        effort: Number,
        stat: {
            name: String,
            url: String
        }
    }],
    types: [{
        slot: Number,
        type: {
            name: String,
            url: String
        }
    }],
    weight: Number
});

// the 's' in 'timelines' is important
const pokemonModel = mongoose.model("pokemons", pokemonSchema);

app.listen(process.env.PORT || 5000, function (err) {
    if (err) console.log(err);
})

// app.use(express.static('./public')

app.get('/',function(req,res){
    res.send("<p>To access pokemon: /api/pokemon/:id</P><br><p>To access type: /api/type/:id</p>")
})

// CRUD

// C
// app.put('/timeline/insert', function (req, res) {
//     console.log(req.body)
//     pokemonModel.create({
//         text: req.body.text,
//         time: req.body.time,
//         hits: req.body.hits
//     }, function (err, data) {
//         if (err) {
//             console.log("Error " + err);
//         } else {
//             console.log("Data " + data);
//         }
//         res.send("Insertion successful!");
//     });
// });

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
        res.send(data);
    });
})

// // U
// app.get('/timeline/incrementHits/:id', function (req, res) {
//     // console.log(req.body)
//     eventModel.updateOne({
//         _id: req.params.id,
//     }, {
//         $inc: {
//             hits: 1
//         }
//     }, function (err, data) {
//         if (err) {
//             console.log("Error " + err);
//         } else {
//             console.log("Data " + data);
//         }
//         res.send("Update successful!");
//     });
// });

// // D
// app.get('/timeline/remove/:id', function (req, res) {
//     // console.log(req.body)
//     eventModel.remove({
//         _id: req.params.id,
//     }, function (err, data) {
//         if (err) {
//             console.log("Error " + err);
//         } else {
//             console.log("Data " + data);
//         }
//         res.send("Delete successful!");
//     });
// });