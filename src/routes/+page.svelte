<script>
  // @ts-nocheck
  import Card from "../lib/components/Card.svelte";
  import { onMount, setContext } from "svelte";

  let maindiv;
  onMount(async () => {
    console.log('main 1=>', maindiv)
  });
</script>

<h1 class="text-4xl font-medium">Hello world!</h1>
<main bind:this={maindiv}>
  <div class="wrapper p-2">
    <Card maindiv={maindiv}/>
    <!-- <Card /> -->
  </div>
</main>

<style lang="postcss">
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
    justify-content: flex-start;
    align-items: stretch;
  }
</style>
