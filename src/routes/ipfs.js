import { create, globSource } from 'ipfs-http-client';
import fs from "fs"
async function insertIPFS(path) {

    //  read the file from the path given
    const f = fs.readFileSync(path);
  
    // ipfs api to add the file into the ipfs 
    const file = await client.add(
      {
        content: f
      });
  
    console.log(String(file.cid));
    const hash = 'randomhashfhowelnfsohewoowhlkf';
    const d = 838;
    return String(file.cid)
    // updateOne()
    // const patient = insert(d,firstName,lastName,DOB,bloodGroup,phoneNumber,email,gender,martialStatus,String(file.cid),"fsdfsd");
    // return patient._id;
  }