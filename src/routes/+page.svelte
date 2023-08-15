<script>
  // @ts-nocheck
  import { onMount, setContext } from "svelte";
  import { maindiv } from "../lib/stores";
  import Card from "../lib/components/Card.svelte";

  let mdref;
  onMount(async () => {
    // console.log('main 1=>', maindiv.subscribe)
    maindiv.set(mdref);
  });
</script>

<h1 class="text-4xl font-medium">Peace Pad</h1>
<main bind:this={mdref}>
  <div class="wrapper p-2">
    <Card />
    <Card />
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
