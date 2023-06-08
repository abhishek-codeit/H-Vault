
const { create, globSource } = require('ipfs-http-client')
const fs =  require("fs")
// const client = create();
console.log(client.getEndpointConfig());

async function uploadFile() {
  const client = create();
  console.log(client.getEndpointConfig());

  // Read the file from the given path
  const f = fs.readFileSync('C:\Users\Abhishek S\Desktop\mangodbMP\app.js');

  // IPFS API to add the file to IPFS
  const file = await client.add({
    content: f
  });

  // Print the CID, path, and size of the uploaded file in IPFS
  console.log(file);
}

uploadFile();


/**********************************************************************************
const mongoose = require('mongoose');

const uri = "mongodb://127.0.0.1:27017/";
dbName = "patient"

mongoose.connect(uri+dbName, 
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
// we're connected!
console.log("connected");

const patientSchema = new mongoose.Schema({
  name : {
    type : String,
    required :[true , "please check your data no name"]  // validation of name
  },
  age : {
    type : Number 
  },
  doc : {
    type : String
  },
  diagnosis : {
    type : String
  },
  cidhash : {
    file :{
        type: mongoose.Schema.Types.Mixed
    }
  }
});

const Patient = mongoose.model('pid',patientSchema); 
const patient = insert(patientSchema,"chetan",21,"good","good one")


update(patient,"newCID","newHash")
// update(patient,"newCID2","newHash2")
patient.save();


});


function  insert(patientSchema,n,a,d,di,ci,ha){
const Patient = mongoose.model('pid',patientSchema); 

const patient = new Patient({
  name : n,
  age :  a,
  doc : d,
  diagnosis : di,
  cidhash : {
    file: {
      cid:ci,
      hash:ha
    }
  }
})

console.log("inserted")
// patient.save()
return patient
}

function update(patient,cidd,hash){
  const newData = {
    [cidd]: {
    cid:cidd,
    hash:hash
    }
    
  }
  const field = 'cidhash.file'
  patient.cidhash.file= {...patient.get(field), ...newData};
  // patient.save();
}

//**********************************************************************/