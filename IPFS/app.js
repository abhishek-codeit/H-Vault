import { create, globSource } from 'ipfs-http-client';

const client = create();

console.log(client.getEndpointConfig());

// import { create, globSource } from 'ipfs'

// const ipfs = await create()

// for await (const file of ipfs.addAll(globSource('./docs', '**/*'))) {
//   console.log(file)
// }


const file = await client.add('/home/hdoop/Desktop/New Folder 1/sample.txt');
console.log(file);
