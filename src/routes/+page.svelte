<script>
  // @ts-nocheck
  import Card from "../lib/components/Card.svelte";
  import { setContext } from "svelte";

  let userMouse = {
    dragging: false,

    pos: { x: 0, y: 0 },

    handleMousemove(event) {
      if (true) {
        userMouse.pos.x = event.clientX;
        userMouse.pos.y = event.clientY;
        console.log(userMouse.pos);
      }
    },
    
  };
  setContext("mouse", userMouse);

  function expandDrag() {
    userMouse.dragging = !userMouse.dragging;
    console.log("drag: " + userMouse.dragging);
  }
</script>

<h1 class="text-4xl font-medium">Hello world!</h1>
<main>
  <div class="wrapper p-2">
    <Card on:drag={expandDrag} />
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
