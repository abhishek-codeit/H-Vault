<script>
	import Insurancelogin from '$lib/login.svelte';
</script>

<Insurancelogin
	title="Insurance Login"
	fn_location={() => {
		alert('Insurance Login');
	}}
	login_endpoint="/Verify"
/>
```
