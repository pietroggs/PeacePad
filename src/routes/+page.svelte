<script>
  // @ts-nocheck
  import { onMount, setContext } from "svelte";
  import { maindiv } from "../lib/stores";
  import Card from "../lib/components/Card.svelte";

  //Expand control
  let mdref,
    wMax = 98,
    wMin = 28,
    newSizeW = 0,
    newSizeH = 0;


  function resizeCard(e) {
    let dvW = ~~((e.pageX / mdref.clientWidth) * 100);
    if (dvW <= wMax && dvW >= wMin) newSizeW = dvW;

    newSizeH = e.pageY
    // console.log(`${dvH}% \n pY: ${e.pageY} \n cH: ${mdref.clientHeight}`)
  }

  //LC
  onMount(async () => {
    maindiv.set(mdref);

    document.ondragover = (e) => {
      e = e || window.event;
      e.preventDefault();
      resizeCard(e);
    };
  });
</script>

<h1 class="text-4xl font-medium">Peace Pad</h1>
<main bind:this={mdref}>
  <div class="wrapper p-2">
    <Card newSizeW="{newSizeW}" newSizeH="{newSizeH}"/>
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
