const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { urlencoded } = require("express");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());
app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://admin-bekki:Test123@cluster0.yi31cuu.mongodb.net/mathGameDB");

const validator = (v)=>{return v.length>0}
const mathGameSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: [validator, "It should be word"],
        required: [true, "Name is necessary"]
    },
    score: {
        type: Number 
    }
})
const PlayerList = mongoose.model("listPlayer", mathGameSchema);




app.get('/', (req, res)=>{
    PlayerList.find((err, data)=>{
        
        // data.forEach((tempData)=>{
        //     console.log(tempData.name, tempData.score);
        // })
        if(err){
            console.log("Error while finding");
        }
        else{
            res.render('game', {data: data});
        }
    }).sort({score: -1});
});

app.post('/', (req,res)=>{
    //console.log(req.body);
    const playerList = new PlayerList({
        name: (req.body.name),
        score: (req.body.score)
    })
    
    playerList.save();
    res.redirect('/');
})




var port = process.env.PORT;
if(port == null || port == "")
{
	port=3000;
}
app.listen(port, ()=>{
    console.log("Listening on "+ port)
});