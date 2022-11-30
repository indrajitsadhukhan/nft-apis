
const express = require("express");
const bodyParser = require("body-parser")
const port = process.env.PORT || 3000
const call= require('./call')
// Swagger imports
const swaggerUI=require('swagger-ui-express')
const swaggerJsDoc=require('swagger-jsdoc')
const app = express()

const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"NFT Api",
            version:"1.0.0",
            description:"Api to mint NFTs"
        },
        servers:[
        {
            // Apis are deployed at this url
            url:"http://20.40.49.126:3000"

        },
        {
            // To call api from local server
            url:"http://localhost:3000"

        }
    ],
    },
    apis:["server.js"]
}

// Swagger UI specifications
const specs=swaggerJsDoc(options)
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(specs))
/**
*  @swagger
*   components:
*     schemas:
*       NFT:
*         type: object
*         required:
*           - url
*           - blockNumber
*           - IPFS_hash
*           - message
*         properties:
*           url:
*             type: string
*             description: Transaction URL at etherscan.
*           blockNumber:
*             type: integer
*             description: Block number of the transaction.
*           IPFS_hash:
*             type: string
*             description: IPFS hash of the NFT metadata
*           message:
*             type: string
*             description: status message of the API call
*         example:
*            url: https://sepolia.etherscan.io/tx/0xb847f7ffba0a0b51b7eac4745c406e6cf02cca70602a3d2bfa59c1f5def5ee56
*            blockNumber: 2385098
*            IPFS_hash: QmPCnnX3SnsAtkrNDNhPj9qMBeWGcPuvT6Chgo9DfLGAnp
*            message: NFT minted successfully
 */

/**
 * @swagger
 * /mint:
 *      post:
 *          summary: Mint a NFT
 *          responses:
 *              200:
 *                  description: Minted NFT
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/NFT'
 */


app.use(bodyParser.urlencoded({
	extended:true
}))

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
    res.status(200).send(json)
});

app.listen(port, function(){
console.log("server is running on port ",port);
})
