<script>
    import DocLogin from "$lib/login.svelte";
    import { getAccount } from "/src/connect.js";
</script>

<DocLogin
    title="Doctor Login"
    fn_location={() => {
        getAccount();
    }}
    login_endpoint="/Menu"
/>
```
