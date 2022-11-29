require("dotenv").config()
var axios = require('axios');
const FormData = require('form-data')
const fs = require('fs')
const JWT = 'Bearer PASTE_YOUR_PINATA_JWT'
// Authentication testing
async function getData()
{
    var config = {
        method: 'get',
        url: 'https://api.pinata.cloud/data/testAuthentication',
        headers: { 
          'pinata_api_key': process.env.PINATA_API_KEY,
          'pinata_secret_api_key':process.env.PINATA_API_SECRET
        }
      };
      
    const res = await axios(config)
    console.log(res.data)
}


async function pinFileToIPFS()
 {
    const formData = new FormData();
    const src = "meta2.json";
    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
    const metadata = JSON.stringify({
      name: 'meta2.json',
    });
    formData.append('pinataMetadata', metadata);
    
    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'pinata_api_key': process.env.PINATA_API_KEY,
          'pinata_secret_api_key':process.env.PINATA_API_SECRET
        }
      });
      console.log(res.data);
      return {"status":200,"IPFS_hash":res.data.IpfsHash}
    } catch (error) {
      console.log(error);
    }
    return {"status":400}
}

module.exports={
    pinFileToIPFS
}
