<script>
  // @ts-nocheck
  import { createEventDispatcher, getContext, onMount } from "svelte";
  const dispatch = createEventDispatcher();
  import { IconArrowBarBoth } from "@tabler/icons-svelte";

  let width = 28,
    wMax = 98,
    wMin = 28;
  let text_width;
  let maindiv;
  onMount(async () => {
    console.log('main 2=>', maindiv)
  });

  function pushL(a) {
    isNaN(a) ? (a = 10) : null;
    console.log("Push L Amount: ", a);
    if (width >= wMin) {
      if (width - a >= wMin) width -= a;
      else width = wMin;
    }
  }

  function pushR(a) {
    isNaN(a) ? (a = 10) : null;
    console.log("Push R Amount: ", a);
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
      let cw = maindiv.clientWidth;
      let dvalue = ~~((Math.abs(dif) / cw) * 10) * 10;
      // console.log(`dif ${dif} \n dv ${dvalue}`);

      if (dif >= 0) pushR(dvalue);
      else pushL(dvalue);
    }
    tdir = !tdir;
  }

  function handleDragStart(e) {
    console.log("start");
    maindiv.addEventListener("mousemove", trackMouse(e));
  }

  function handleDragEnd(e) {
    console.log("end");
    maindiv.removeEventListener("mousemove", trackMouse(e));

    if (text_width.classList.contains("className")) {
      text_width.style.webkitAnimation = "none";
      setTimeout(function () {
        text_width.style.webkitAnimation = "";
      }, 100);
    } else {
      text_width.classList.add("fadeOutAnim");
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="relative rounded overflow-hidden shadow-lg bg-slate-400 p-2 m-1 h-44"
  style="width: {width}%"
>
  <div
    id="dragbar"
    class="
        absolute top-1/2 right-0 -translate-y-1/2
        w-5
        h-full min-w-18
        bg-transparent hover:bg-opacity-10 hover:bg-slate-300
        hover:cursor-col-resize
        opacity-0 hover:opacity-100
        flex items-center
        transition ease-in-out duration-300
        "
    draggable="true"
    on:click={pushR}
    on:dragstart={handleDragStart}
    on:dragend={handleDragEnd}
  >
    <IconArrowBarBoth color={"white"} />
  </div>

  <div
    bind:this={text_width}
    class="
  font-bold text-xl text-slate-200
  absolute top-1/2 left-1/2
  -translate-y-1/2 -translate-x-1/2
  "
  >
    Hi, my width is: {width + 2 + "%"}
  </div>
</div>

<style lang="postcss">
  .fadeOutAnim {
    animation: fadeOut 4s 1;
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
