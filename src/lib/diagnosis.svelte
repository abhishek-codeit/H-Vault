<script>
    // UI components
    import {
        Input,
        Label,
        Fileupload,
        Helper,
        Button,
        Search,
        Modal,
        Select,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        Textarea,
    } from "flowbite-svelte";
    import {viewCIDs,fileUpload} from "$lib/ipfsfile.js";
    let defaultModal = false;
    let data;
    let cidhashKeys;
    let summary = "";
    let value = "";
    let showTable = false;
    let showDiv2 = false;
    let showDiv3 = false;
    let blood_pressure,
        blood_sugar,
        diagnosis,
        dosage,
        height,
        medicine,
        pulse,
        symptoms,
        temperature,
        weight,file_name;

    function uploadFile() {
        const fileInput = document.getElementById("case_file");

        const file = fileInput.files[0];

        const formData = new FormData();
        formData.append("file", file);

        fetch("http://127.0.0.1:5000/process_text", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data (JSON object)
                console.log(data);

                // Access specific properties of the JSON object
                summary = data.text;
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
        defaultModal = true;
    }
    async function handleSearch() {
        data = await viewCIDs(value);
        cidhashKeys = data.cidhash ? Object.keys(data.cidhash):[]
        console.log("cidhash", data.cidhash)
        if (value) {
            showDiv2 = true;
            showDiv3 = true;
        } else {
            showDiv2 = false;
            showDiv3 = false;
        }
    }

    async function showFile(cid) {
        try {
            const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
            const text = await response.text();

            const popupWindow = window.open('', 'CID Text File', 'width=600,height=400');
            popupWindow.document.write('<pre>' + text + '</pre>');
            popupWindow.document.close();

            const downloadLink = popupWindow.document.createElement('a');
            downloadLink.href = `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
            downloadLink.download = 'text_file.txt';
            downloadLink.textContent = 'Download Text File';
            popupWindow.document.body.appendChild(downloadLink);
        } catch (error) {
            console.error('Failed to retrieve IPFS text file:', error);
        }
}

function handleButtonClick(cid) {
  showFile(cid);
}

    function encodeData() {
        const height = document.getElementById("height").value;
        const weight = document.getElementById("weight").value;
        const blood_pressure = document.getElementById("blood_pressure").value;
        const temperature = document.getElementById("temperature").value;
        const pulse = document.getElementById("pulse").value;
        const blood_sugar = document.getElementById("blood_sugar").value;
        const symptoms = document.getElementById("symptoms").value;
        const diagnosis = document.getElementById("diagnosis").value;
        const medicine = document.getElementById("medicine").value;
        const dosage = document.getElementById("dosage").value;
        const file_name = document.getElementById("file_name").value;
        let diagObject = {
            Height: height,
            Weight: weight,
            "Blood pressure": blood_pressure,
            Temperature: temperature,
            Pulse: pulse,
            "Blood sugar": blood_sugar,
            Symptoms: symptoms,
            Diagnosis: diagnosis,
            Medicine: medicine,
            Dosage: dosage,
            pid: value,
            name: file_name,
        };
        fileUpload(diagObject);
        console.log(diagObject);
    }

    function handleClick(){
        showTable = !showTable;
    }
</script>


<!-- SEARCH BAR FOR SEARCHING PID -->
<div>
    <div>
        <Label for="height" class="mb-2">Search patient</Label>
        <Search bind:value placeholder="Enter PID" />
        <Button pill color="primary" on:click={handleSearch}>Search</Button>
    </div>
</div>

{#if showDiv2}
    <div>
        <!-- Content for Div 2 -->
        <Table>
            <TableHead>
                <TableHeadCell>Patient parameter</TableHeadCell>
                <TableHeadCell>Values</TableHeadCell>
            </TableHead>

            <TableBody class="divide-y">
                <TableBodyRow>
                    <TableBodyCell>PID</TableBodyCell>
                    <TableBodyCell>{data._id}</TableBodyCell>
                </TableBodyRow>

                <TableBodyRow>
                    <TableBodyCell>Name</TableBodyCell>
                    <TableBodyCell>{data.name}</TableBodyCell>
                </TableBodyRow>

                <TableBodyRow>
                    <TableBodyCell>DOB</TableBodyCell>
                    <TableBodyCell>{data.DOB}</TableBodyCell>
                </TableBodyRow>

                <TableBodyRow>
                    <TableBodyCell>Blood Group</TableBodyCell>
                    <TableBodyCell>{data.bloodGroup}</TableBodyCell>
                </TableBodyRow>

                <TableBodyRow>
                    <TableBodyCell>Gender</TableBodyCell>
                    <TableBodyCell>{data.Gender}</TableBodyCell>
                </TableBodyRow>

                <TableBodyRow>
                    <TableBodyCell>Origin</TableBodyCell>
                    <TableBodyCell>Benagaluru</TableBodyCell>
                </TableBodyRow>
            </TableBody>
        </Table>
        <button class="button" on:click={handleClick}>Show File</button>
<Table>
        {#if showTable && cidhashKeys.length == 0}
        <div>
            <h1 class="text-8xl">No Records Found :(</h1>
        </div>
        {/if}
        {#if showTable && cidhashKeys.length > 0}
        <TableHead>
            <TableHeadCell>File Name:
           </TableHeadCell>
             <TableHeadCell>
                Hash
            </TableHeadCell>
        </TableHead>
        <TableBody>

        {#each cidhashKeys as key}
            <TableBodyRow>
                <TableBodyCell>{key}</TableBodyCell>
                <!-- <TableBodyCell>{data.cidhash[key].cid}</TableBodyCell> -->
                <TableBodyCell>{data.cidhash[key].hash}</TableBodyCell>
                <button class="button" on:click={() => showFile(data.cidhash[key].cid)}>Show File</button>
            </TableBodyRow>
            {/each}
            
        </TableBody>
        {/if}
</Table>
    </div>
{/if}

{#if showDiv3}
    <!-- <Label for="case_file" class="pb-2">Upload file</Label>
    <Fileupload id="case_file" class="mb-2" />
    <Button pill outline on:click={uploadFile}>Generate Summary</Button>
    <Helper>Only .txt file is accepted</Helper>
    <Modal
        bind:open={defaultModal}
        title="Case Summary"
        on:close={() => (defaultModal = false)}
    >
        {summary}
    </Modal> -->

    <form>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
            <!-- Height input -->
            <div>
                <Label for="height" class="mb-2">Height</Label>
                <Input
                    type="text"
                    id="height"
                    bind:height
                    placeholder="Height"
                />
            </div>
            <!-- Weight input  -->
            <div>
                <Label for="weight" class="mb-2">Weight</Label>
                <Input
                    type="text"
                    id="weight"
                    bind:weight
                    placeholder="Weight"
                />
            </div>
            <!-- Blood pressure input -->
            <div>
                <Label for="blood_pressure" class="mb-2">Blood Pressure</Label>
                <Input
                    type="text"
                    id="blood_pressure"
                    bind:blood_pressure
                    placeholder="Blood Pressure"
                />
            </div>
            <!-- Temperature input -->
            <div>
                <Label for="temperature" class="mb-2">Temperature</Label>
                <Input
                    type="text"
                    id="temperature"
                    bind:temperature
                    placeholder="Temperature"
                />
            </div>
            <!-- Pulse input -->
            <div>
                <Label for="pulse" class="mb-2">Pulse</Label>
                <Input type="text" id="pulse" bind:pulse placeholder="Pulse" />
            </div>
            <!-- blood sugar input -->
            <div>
                <Label for="blood_sugar" class="mb-2">Blood Sugar</Label>
                <Input
                    type="text"
                    id="blood_sugar"
                    bind:blood_sugar
                    placeholder="Blood Sugar"
                />
            </div>
            <!-- Symptoms input -->
            <div>
                <Label for="symptoms" class="mb-2">Symptoms</Label>
                <Input
                    type="text"
                    id="symptoms"
                    bind:symptoms
                    placeholder="Symptoms"
                />
            </div>
            <!-- Diagnosis input -->
            <div>
                <Label for="diagnosis" class="mb-4">Diagnosis</Label>
                <Textarea
                    type="text"
                    id="diagnosis"
                    bind:diagnosis
                    placeholder="Diagnosis"
                />
            </div>

            <!-- Medicine input -->
            <div>
                <Label for="medicine" class="mb-2">Medicine</Label>
                <Input
                    type="text"
                    id="medicine"
                    bind:medicine
                    placeholder="Medicine"
                />
            </div>

            <!-- Dosage input -->
            <div>
                <Label for="dosage" class="mb-2">Dosage</Label>
                <Input
                    type="text"
                    id="dosage"
                    bind:dosage
                    placeholder="Dosage"
                />
            </div>
            <!-- Name of file -->
            <div>
                <Label for="file_name" class="mb-2">FileName</Label>
                <Input
                    type="text"
                    id="file_name"
                    bind:file_name
                    placeholder="file_name"
                />
            </div>
        </div>
        <Button
            pill
            color="primary"
            on:click={() => {
                encodeData();
            }}>Upload Diagnosis</Button
        >
    </form>
{/if}

<style>
    .button {
        padding: 12px 20px;
        font-size: 16px;
        border-radius: 4px;
        background-color: #4CAF50;
        color: white;
        border: none;
        cursor: pointer;
    }

    .button:hover {
        background-color: #45a049;
    }
</style>
