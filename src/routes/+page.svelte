<script>
    // You can add any necessary logic here
    import { Button, A, List, Li, Heading } from "flowbite-svelte";
</script>

<div class="hero">
    <h1>
        <header>
            Welcome to H-Vault: Your Secure Electronic Health Record Storage
            Solution
        </header>
    </h1>

    <p class="text-black-500 dark:text-gray-300">
        Securely store and manage your electronic health records (EHR) with
        H-Vault, the leading provider of secure storage solutions using
        cutting-edge technologies such as InterPlanetary File System (IPFS) and
        Blockchain. With H-Vault, you can trust that your sensitive medical
        information is protected, easily accessible, and tamper-proof.
    </p>
    <p class="text-8xl dark:text-white">Why Choose H-Vault?</p>
    <List list="disc">
        <Li>Unmatched Security</Li>
        <Li>Decentralized Storage with IPFS</Li>
        <Li>Immutable Records with Blockchain</Li>
        <Li>Easy Accessibility and Sharing</Li>
        <Li>Compliance and Regulatory Support</Li>
        <Li>Reliable Customer Support</Li>
    </List>
    <Button color="primary"><a href="/Pricing">Secure Your EHR Now</a></Button>
</div>

<style>
    .hero {
        /* color: #fff; */

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    h1 {
        font-size: 32px;
        margin-bottom: 20px;
        color: #ffa500;
    }

    p {
        font-size: 18px;
        margin-bottom: 20px;
    }

    .cta-button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #1f2937;
        color: #fff;
        font-size: 16px;
        text-decoration: none;
        border-radius: 5px;
        transition: background-color 0.3s ease;
    }

    .cta-button:hover {
        background-color: #111;
    }
</style>
