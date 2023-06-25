import express from 'express'
import { create, globSource } from 'ipfs-http-client';
import { insert, updateOne, count,fetchCids } from './db.js'
// const fileUpload = require('express-fileupload');
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import cors from 'cors'
import fs from "fs"
import CircularJSON from 'circular-json'
import { stringify } from 'querystring';
const app = express()
app.use(fileUpload());

const client = create();
console.log(client.getEndpointConfig());
app.use(express.json())
app.use(cors())
app.listen(3000, () => {
  console.log('Listening on Port 3000');
})

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

// async function insertIPFS(path) {

//   //  read the file from the path given
//   const f = fs.readFileSync(path);

//   // ipfs api to add the file into the ipfs 
//   const file = await client.add(
//     {
//       content: f
//     });

//   console.log(String(file.cid));
//   const hash = 'randomhashfhowelnfsohewoowhlkf';
//   const d = 838;
//   return String(file.cid)
//   // const patient = insert(d,firstName,lastName,DOB,bloodGroup,phoneNumber,email,gender,martialStatus,String(file.cid),"fsdfsd");
//   // return patient._id;
// }

async function insertIPFS(req){
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const file =await req.files.file;

  try {
    const ipfsResponse = await client.add(file.data);
    await client.pin.add(ipfsResponse.cid);
    console.log('pinned successfully')
    // console.log(String(file.cid));
    const ipfsHash = ipfsResponse.cid.toString();
    console.log(ipfsHash,ipfsResponse)
    
    return ipfsHash;
  } catch (error) {
    console.error('Failed to upload file to IPFS:', error);
    throw new Error('Failed to upload file to IPFS.');  
  }
}

app.post('/uploadnew', async (req, res) => {
  console.log('fs');
  var cid;
  try{
    cid = await insertIPFS(req);
    console.log(req.body.pid);
    console.log(cid);
    // res.send(cid);
  }catch(error){
    console.error('Failed to upload file to IPFS:', error);
    res.status(500).send('Failed to upload file to IPFS.');
  }
  //TODO: need to call blockchain here and need to get hash from the file  */
  const hash = 'randomhashfhowelnfsohewoowhlkf';
  const pid = req.body.pid;
  console.log(pid);
  await updateOne(pid, cid, hash);
  const response = {
    cid: cid,
    hash: hash,
    db:"uploaded",
    status:"200 OK",
  }
  res.json(response);
  // await updateOne(req.body.pid, cid, 'fsdfsd');
  
});



app.get('/', (req, res) => {
  res.send('working');
})
app.post('/insert', async (req, res) => {
  const query = req.body
  const path = query.path
  const firstName = query.firstName
  const lastName = query.lastName
  const DOB = query.dob
  const bloodGroup = query.bg
  const phoneNumber = query.phone
  const email = query.email
  const gender = query.gender
  const martialStatus = query.ms
  const phash = query.phash
  const pid = await count()
  // const cid = await insertIPFS(path,firstName,lastName,DOB,bloodGroup,phoneNumber,email,gender,martialStatus)
  const check_response = await insert(pid.toString(), firstName, lastName, DOB, bloodGroup, phoneNumber, email, gender, martialStatus, "cid-ex", phash);
  // console.log(cid,pid)


  res.send(check_response)
  // res.send('fdsfs')
})

app.post('/update', async (req, res) => {
  
  const pid = req.query['pid']
  const cid = req.query['cid']
  const hash = req.query['hash']
  await updateOne(pid, cid, hash)
  res.send('done!')
})

app.get('/getcids', async (req, res) => {

  console.log('hello  this server side code debugging ........')
  const pid = req.query.pid
  console.log('this is pid passed to server',pid)
  const r = await fetchCids(pid)
  console.log('the data is fetched from the database',r);
  res.send(r)
})