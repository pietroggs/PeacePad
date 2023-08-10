<script>
  // @ts-nocheck
  import Card from "../lib/components/Card.svelte";
  import { setContext } from "svelte";

  setContext("mouse", userMouse);
</script>

<h1 class="text-4xl font-medium">Hello world!</h1>
<main>
  <div class="wrapper p-2">
    <Card />
    <Card />
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
