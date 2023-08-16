<script>
  // @ts-nocheck
  import { afterUpdate, onMount } from "svelte";
  import { gsap } from "gsap";
  import { maindiv } from "../stores";
  import { IconArrowBarBoth } from "@tabler/icons-svelte";

  export let newSizeW;
  export let newSizeH;

  let width = 28,
    height = 15,
    expand = false;
  let text_width, fade_tl;
  let p_maindiv;

  //LC
  onMount(() => {
    // maindiv.subscribe((e) => {
    //   p_maindiv = e;
    // });

    //Animation
    fade_tl = gsap
      .timeline({
        paused: false,
        defaults: { duration: 1 },
      })
      .fromTo(text_width, { opacity: 1 }, { opacity: 0 });
  });

  afterUpdate(() => {
    if (expand) {
      width = newSizeW;
      height = newSizeH;
    }
  });

  //Expand control
  function pushR() {
    if (width <= 98) {
      if (width + 10 <= 98) width += 10;
      else width = 98;
    }
  }

  function onDragStart(e) {
    expand = true;
    fade_tl.pause();
    text_width.style.opacity = 1;
    setDragCursor(true);
  }

  function onDragEnd(e) {
    expand = false;
    setDragCursor(false);
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
  class="relative rounded overflow-hidden shadow-lg bg-slate-400 p-2 m-1 min-h-44"
  style="width: {width}%; height: {height}px"
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

  <div
    id="sizeText"
    bind:this={text_width}
    class="
  font-bold text-xl text-slate-200
  absolute top-1/2 left-1/2
  -translate-y-1/2 -translate-x-1/2
  opacity-0
  "
  >
    {width + 2 + "%"}
    <br />
    {height + 2 + "px"}
  </div>

  <input
    type="text"
    id="title"
    name="title"
    class="
  w-full rounded outline-none bg-transparent
  border-b-2 border-slate-500 border-opacity-50 pl-1 pr-1
  font-semibold
  "
  />

  <div
    id="content"
    data-text="Every beginning is a new day"
    contentEditable="true"
    class="
    w-full rounded outline-none bg-transparent
  pl-1 pr-1 pt-2 h-full"
  />
</div>

<style lang="postcss">
  textarea {
    resize: none;
  }

  [contentEditable="true"]:empty:not(:focus):before {
    content: attr(data-text);
    font-style: italic;
    opacity: 0.5;
  }
</style>
