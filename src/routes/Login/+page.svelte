<script>
    import { Button, Card } from "flowbite-svelte";
</script>

<div class="login_card">
    <Card>
        <a href="Login/Doctor"
            ><Button pill size="xl" outline color="yellow">Doctor Login</Button
            ></a
        >
        <br />
        <a href="Login/Patient">
            <Button pill size="xl" outline color="yellow">Patient Login</Button
            ></a
        >
        <br />
        <a href="Login/Insurance_provider"
            ><Button pill size="xl" outline color="yellow"
                >Insurance Provider Login</Button
            ></a
        >
    </Card>
</div>

<style>
    .login_card {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
