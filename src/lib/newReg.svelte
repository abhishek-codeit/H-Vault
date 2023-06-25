<script>
	import {
		Input,
		Label,
		Helper,
		Button,
		Checkbox,
		A,
		Select,
	} from "flowbite-svelte";
	import { createPatient, AddFile } from "/src/connect.js";
	import axios from "axios";

	async function createData() {
		name = fname + lname;

		let blockchain_data = {
			pid: 14,
			name: name,
			dob: dob,
			bloodgroup: bloodgroup,
			gender: gender,
			origin: origin,
		};

		const patienthash = await createPatient(blockchain_data);
		// const patienthash = "T4HAeonfrdh9jcrTt7XcBraPqZbu4hhgbGzGVMqBdbT";
		const url = "http://127.0.0.1:3000/insert";

		const query = {
			path: "/home/hdoop/Desktop/Mini project/localminiproject/H-Vault/fsd.json",
			firstName: fname,
			lastName: lname,
			dob: 26,
			bg: bloodgroup,
			phone: 99999,
			email: email_addr,
			gender: gender,
			ms: mart_status,
			phash: patienthash,
		};
		const customConfig = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const res = await axios.post(
			"http://127.0.0.1:3000/insert",
			query,
			customConfig
		);
		alert("Patient added successfully");

		console.log(res);
	}

	const url = "http://127.0.0.1:3000/insert";

	// Define the data for the POST request

	async function ins() {
		const query = {
			path: "/home/hdoop/Desktop/Mini project/localminiproject/H-Vault/fsd.json",
			firstName: fname,
			lastName: lname,
			dob: 26,
			bg: bloodgroup,
			phone: 99999,
			email: email_addr,
			gender: gender,
			ms: mart_status,
		};
		const customConfig = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		// fetch(url, {
		// 	method: 'POST',
		// 	body: JSON.stringify(query),
		// 	headers: {
		// 	'Content-Type': 'application/json'
		// 	}
		// }).then(res => {console.log(res)})

		console.log(query.firstName);
		console.log(query.lastName);
		console.log(query.dob);
		// Send the POST request using Axios
		const res = await axios.post(
			"http://127.0.0.1:3000/insert",
			query,
			customConfig
		);

		console.log(res);
	}

	// let mstatus_selected, gender_selected, blood_selected;
	let name,
		fname,
		lname,
		dob,
		bloodgroup,
		phonenum,
		mart_status,
		email_addr,
		gender,
		origin;
	let gender_items = [
		{ value: "M", name: "MALE" },
		{ value: "F", name: "FEMALE" },
		{ value: "X", name: "Others" },
	];
	let blood_items = [
		{ value: "A+", name: "A +ve" },
		{ value: "A-", name: "A -ve" },
		{ value: "B+", name: "B +ve" },
		{ value: "B-", name: "B -ve" },
		{ value: "AB+", name: "AB +ve" },
		{ value: "AB-", name: "AB -ve" },
		{ value: "O+", name: "O +ve" },
		{ value: "O-", name: "O -ve" },
	];
	let mstat_items = [
		{ value: "Ma", name: "Married" },
		{ value: "Un", name: "Unmaaried" },
		{ value: "Div", name: "Divorced" },
	];
</script>

<form>
	<div class="grid gap-6 mb-6 md:grid-cols-2">
		<div>
			<Label for="first_name" class="mb-2">First name</Label>
			<Input
				type="text"
				id="first_name"
				placeholder="John"
				bind:value={fname}
			/>
		</div>
		<div>
			<Label for="last_name" class="mb-2">Last name</Label>
			<Input
				type="text"
				id="last_name"
				placeholder="Doe"
				bind:value={lname}
			/>
		</div>
		<div>
			<Label for="company" class="mb-2">DOB</Label>
			<Input
				type="date"
				id="company"
				placeholder="DD/MM/YYY"
				bind:value={dob}
			/>
		</div>
		<div>
			<Label for="bloodgroup" class="mb-2">Blood group</Label>
			<Select class="mt-2" items={blood_items} bind:value={bloodgroup} />
		</div>
		<div>
			<div>
				<Label for="phone" class="mb-2">Phone number</Label>
				<Input
					type="tel"
					id="phone"
					placeholder="123-45-678"
					bind:value={phonenum}
				/>
			</div>
		</div>
		<div class="mb-6">
			<Label for="mstatus" class="mb-2">Maritial Status</Label>
			<Select class="mt-2" items={mstat_items} bind:value={mart_status} />
		</div>
		<div class="mb-6">
			<Label for="email" class="mb-2">Email address</Label>
			<Input
				type="email"
				id="email"
				placeholder="john.doe@company.com"
				bind:value={email_addr}
			/>
		</div>
		<div class="mb-6">
			<Label for="gender" class="mb-2">Gender</Label>
			<Select class="mt-2" items={gender_items} bind:value={gender} />
		</div>
		<div>
			<Label for="origin" class="mb-2">Origin</Label>
			<Input
				type="text"
				id="origin"
				placeholder="State your origin"
				bind:value={origin}
			/>
		</div>

		<Checkbox class="mb-6 space-x-1"
			>I agree with the <A href="/">terms and conditions</A>.</Checkbox
		>
		<Button type="submit" color="primary" on:click={() => createData()}
			>Submit</Button
		>
	</div>
</form>
