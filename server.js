const express = require("express");
const bodyParser = require("body-parser")
const port = process.env.PORT || 3000
const call= require('./call')

const app = express();
app.use(bodyParser.urlencoded({
	extended:true
}));

app.get("/", function(req, res) {
    var response={}
res.send(response)
});
app.get("/nfts", function(req, res) {
    var response={}
    
res.send(response)
});

app.post("/mint", async function(req, res) {
   var json=await call.mintNFTs()
    res.send(json)
});

app.listen(port, function(){
console.log("server is running on port ",port);
})
