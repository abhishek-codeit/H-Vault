<script>
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

    let showDiv1 = true,
        showDiv2 = true,
        Pdata;
    async function getData(query) {
        const customConfig = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const Datobj = await axios.get(
            "http://127.0.0.1:3000/getcids",
            query,
            customConfig
        );
        Pdata = Datobj;
    }
</script>

<!-- Search bar DIV -->

<div>
    <div>
        <Label for="height" class="mb-2">Search patient</Label>
        <Search placeholder="Enter PID" />
        <Button pill color="primary">Search</Button>
    </div>
</div>

<!-- Basic Info DIV-->
{#if showDiv1}
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

<div />
<!-- FILE VERIFY Table  -->
{#if showDiv2}
    <div>
        <!-- Content for Div 2 -->
        <Table>
            <TableHead>
                <TableHeadCell>File Modified Date</TableHeadCell>
                <TableHeadCell>View File</TableHeadCell>
                <TableHeadCell>Verify File Orginality</TableHeadCell>
            </TableHead>

            <TableBody class="divide-y">
                <TableBodyRow>
                    <TableBodyCell>20-Oct-2002</TableBodyCell>
                    <TableBodyCell
                        ><Button outline color="yellow">View</Button
                        ></TableBodyCell
                    >
                    <TableBodyCell
                        ><Button color="green">Verify</Button></TableBodyCell
                    >
                </TableBodyRow>
            </TableBody>
        </Table>
    </div>
{/if}

<div />
