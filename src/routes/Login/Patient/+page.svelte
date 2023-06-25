<script>
    import Patientlogin from "$lib/login.svelte";
</script>

<Patientlogin
    title="Patient Login"
    fn_location={() => {
        alert("Patient Login");
    }}
    login_endpoint="/Menu"
/>
```
