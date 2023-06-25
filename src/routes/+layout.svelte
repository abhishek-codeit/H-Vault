<script>
	import "../app.postcss";

	import NavBar from "$lib/navBar.svelte";
	import Footer from "$lib/footer.svelte";
</script>

<NavBar />

<slot />

<Footer />
