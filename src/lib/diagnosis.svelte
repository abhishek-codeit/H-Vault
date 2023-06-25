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

    let defaultModal = false;

    let summary = "";
    let value = "";
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
        weight;

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
    function handleSearch() {
        if (value) {
            showDiv2 = true;
            showDiv3 = true;
        } else {
            showDiv2 = false;
            showDiv3 = false;
        }
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
        };
        console.log(diagObject);
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
                    <TableBodyCell>1</TableBodyCell>
                </TableBodyRow>

                <TableBodyRow>
                    <TableBodyCell>Name</TableBodyCell>
                    <TableBodyCell>Abhishek</TableBodyCell>
                </TableBodyRow>

                <TableBodyRow>
                    <TableBodyCell>DOB</TableBodyCell>
                    <TableBodyCell>01-Nov</TableBodyCell>
                </TableBodyRow>

                <TableBodyRow>
                    <TableBodyCell>Blood Group</TableBodyCell>
                    <TableBodyCell>B -ve</TableBodyCell>
                </TableBodyRow>

                <TableBodyRow>
                    <TableBodyCell>Origin</TableBodyCell>
                    <TableBodyCell>Benagaluru</TableBodyCell>
                </TableBodyRow>
            </TableBody>
        </Table>
    </div>
{/if}

{#if showDiv3}
    <Label for="case_file" class="pb-2">Upload file</Label>
    <Fileupload id="case_file" class="mb-2" />
    <Button pill outline on:click={uploadFile}>Generate Summary</Button>
    <Helper>Only .txt file is accepted</Helper>
    <Modal
        bind:open={defaultModal}
        title="Case Summary"
        on:close={() => (defaultModal = false)}
    >
        {summary}
    </Modal>

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
</style>
