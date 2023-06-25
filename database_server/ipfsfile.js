// HTML file input element
const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const viewButton = document.getElementById('viewDocs');

async function fileUpload(){
  

  const file = fileInput.files[0];
  const pid_c = document.getElementById('pid').value;

  if (file && pid_c) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('pid', pid_c);
    console.log(formData);
    try {
      const response = await fetch('http://127.0.0.1:3000/uploadnew', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const ipfsHash = await response.text();
        console.log('File uploaded to IPFS with hash:', ipfsHash);
      } else {
        console.error('Failed to upload file:', response.status, response.statusText);
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }


}

async function viewCIDs() {
  console.log('viewCIDs');
  var data;
    const pid = document.getElementById('pid').value;
    console.log(pid);
    console.log(data,'data............')
    const url = `http://127.0.0.1:3000/getcids?pid=${encodeURIComponent(pid)}`;

    try{
      const response = await fetch(url,{
        method:'GET',
      });
      if(response.ok){
        data = await response.json();
        console.log(data);
      }
    }catch(error){
      console.log('error in fetching cids make sure server and ipfs instance are running')
    }
    
 
  const cidhash = data.cidhash;
  const cids = Object.values(cidhash).map(obj => obj.cid);
  
  const cidsContainer = document.getElementById('cidsContainer');
  cidsContainer.innerHTML = '';
  console.log(
    'fsd'
  )
  cids.forEach(cid => {
      const cidElement = document.createElement('p');
      cidElement.textContent = cid;
      cidElement.classList.add('cid-element');
  
      cidElement.addEventListener('click', () => {
        fetch(`https://ipfs.io/ipfs/${cid}`)
          .then(response => response.text())
          .then(text => {
            const popupWindow = window.open('', 'CID Text File', 'width=600,height=400');
            popupWindow.document.write('<pre>' + text + '</pre>');
            popupWindow.document.close();
            
            const downloadLink = popupWindow.document.createElement('a');
            downloadLink.href = `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
            downloadLink.download = 'text_file.txt';
            downloadLink.textContent = 'Download Text File';
            popupWindow.document.body.appendChild(downloadLink);
          })
          .catch(error => {
            console.error('Failed to retrieve IPFS text file:', error);
          });
        });
        
        cidsContainer.appendChild(cidElement);
      });
    
  }
// Event listener for file input change
uploadButton.addEventListener('click', fileUpload);
viewButton.addEventListener('click',viewCIDs);