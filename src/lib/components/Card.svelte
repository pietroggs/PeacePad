<script>
  // @ts-nocheck
  import {
    afterUpdate,
    createEventDispatcher,
    getContext,
    onMount,
  } from "svelte";
  import { gsap } from "gsap";
  import { maindiv } from "../stores";
  import { IconArrowBarBoth } from "@tabler/icons-svelte";

  // const dispatch = createEventDispatcher();
  let width = 28,
    wMax = 98,
    wMin = 28;
  let text_width, fade_tl;
  let p_maindiv;

  //LC
  onMount(() => {
    maindiv.subscribe((e) => {
      p_maindiv = e;
    });

    document.ondragover = (e) => {
      e = e || window.event;
      e.preventDefault();
      resizeCard(e);
      console.log(e.target)
    };

    //Animation
    fade_tl = gsap
      .timeline({
        paused: false,
        defaults: { duration: 1 },
      })
      .fromTo(text_width, { opacity: 1 }, { opacity: 0 });
  });

  //Expand control

  function pushR() {
    if (width <= wMax) {
      if (width + 10 <= wMax) width += 10;
      else width = wMax;
    }
  }

  function resizeCard(e) {
    let dvalue = ~~((e.pageX / p_maindiv.clientWidth) * 100);
    if (dvalue <= wMax && dvalue >= wMin) width = dvalue;
  }

  function onDragStart(e) {
    text_width.style.opacity = 1;
    setDragCursor(true)
  }

  function onDragEnd(e) {
    setDragCursor(false)
    fade_tl.restart();
  }

  const setDragCursor = (d) => {
    //This thing is cursed and dont work
    const html = document.querySelector("body");
    html.classList.toggle("grabbing", d);
  };

  //Write funcs
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
        hover:cursor-grab
        opacity-0 hover:opacity-100
        flex items-center
        transition ease-in-out duration-300
        "
    draggable="true"
    on:click={pushR}
    on:dragstart={onDragStart}
    on:dragend={onDragEnd}
  >
    <IconArrowBarBoth color={"white"} />
  </div>

  <div id="sizeText"
    bind:this={text_width}
    class="
  font-bold text-xl text-slate-200
  absolute top-1/2 left-1/2
  -translate-y-1/2 -translate-x-1/2
  opacity-0
  ">
    {width + 2 + "%"}
  </div>

  <input type="text" id="title" name="title" class="
  w-full rounded outline-none bg-transparent
  border-b-2 border-slate-500 pl-1 pr-1
  font-semibold
  "/>
</div>

<style lang="postcss">
</style>
