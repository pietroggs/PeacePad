<script>
  // @ts-nocheck
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import { IconArrowBarBoth } from "@tabler/icons-svelte";[]

  let width = 28;
  let wMax = 88,
    wMin = 28;
    
  function pushL(a) {
    isNaN(a) ? a = 10 : null
    console.log("Push L Amount: ", a)
    if (width >= wMin) {
      if (width - a >= wMin) width -= a;
      else width = wMin;
    }
  }

  function pushR(a) {
    isNaN(a) ? a = 10 : null
    console.log("Push R Amount: ", a)
    if (width <= wMax) {
      if (width + a <= wMax) width += a;
      else width = wMax;
    }
  }

  let tdir = true,
    ti = 0;
  function trackMouse(e) {
    if (tdir) {
      ti = e.pageX;
    } else {
      let dif = e.pageX - ti;
      let cw = document.querySelector("main").clientWidth;
      let dvalue = ~~((Math.abs(dif) / cw) * 10) * 10;

      console.log(`dif ${dif} \n dv ${dvalue}`);
      if (dif >= 0) pushR(dvalue);
      else pushL(dvalue);
    }
    tdir = !tdir;
  }

  function handleDragStart(e) {
    console.log("start");
    // dispatch("drag");
    document
    .querySelector("main")
    .addEventListener("mousemove", trackMouse(e));
  }

  function handleDragEnd(e) {
    console.log("end");
    // dispatch("drag");
    document
      .querySelector("main")
      .removeEventListener("mousemove", trackMouse(e));
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="relative rounded overflow-hidden shadow-lg bg-slate-400 p-2 m-1 h-44"
  style="width: {width}%"
>

  {#if width < 90}
    <div
      class="
        absolute top-1/2 right-0 -translate-y-1/2
        w-1/12 max-w-24
        h-full min-w-18
        bg-transparent hover:bg-opacity-10 hover:bg-slate-300
        hover:cursor-col-resize
        opacity-0 hover:opacity-100
        flex items-center
        transition ease-in-out duration-300
        "
      on:click={pushR}
      draggable="true"
      on:dragstart={handleDragStart}
      on:dragend={handleDragEnd}
    >
      <IconArrowBarBoth color={"white"} />
    </div>
  {/if}

  <div class="font-bold text-xl mb-2">
    Hi, my width is: {width}
  </div>
</div>

<style lang="postcss">
</style>
