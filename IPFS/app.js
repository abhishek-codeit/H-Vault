import { create, globSource } from 'ipfs-http-client';
import fs from "fs"
const client = create();
console.log(client.getEndpointConfig());


const f = fs.readFileSync("/home/hdoop/Desktop/New Folder 1/sample.txt")

const file = await client.add(
    {
       content:f
    });


console.log(file)
