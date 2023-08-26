<script>
  // @ts-nocheck
  import { afterUpdate, onMount } from "svelte";
  import { gsap } from "gsap";
  import { maindiv } from "../stores";
  import {
    IconFoldDown,
    IconArrowsMoveVertical,
    IconArrowsMoveHorizontal,
  } from "@tabler/icons-svelte";

  //#region Control vars
  let pad_infos = {
    id: "pad1",
    title: "",
    content: "",
  };
  //#endregion

  //#region Expand vars
  export let newSizeW;
  export let newSizeH;

  let width = 28,
    height = 15,
    expand = false;
  let text_width, fade_tl;
  //#endregion

  //#region Lifecycle
  onMount(() => {
    //Animation
    fade_tl = gsap
      .timeline({
        paused: false,
        defaults: { duration: 1 },
        onComplete: ()=>{text_width.style.display = 'none'}
      })
      .fromTo(
        text_width,
        { opacity: 1 },
        { opacity: 0 }
      );
  });

  afterUpdate(() => {
    if (expand) {
      if (newSizeH <= 0 || newSizeW <= 0) return;
      width = newSizeW;
      height = newSizeH;
    }
    // console.log(pad_infos);
  });
  //#endregion

  //#region Expand methods
  function pushR() {
    if (width <= 98) {
      if (width + 10 <= 98) width += 10;
      else width = 98;
    }
  }

  function onDragStart(e) {
    text_width.style.opacity = 1;
    text_width.style.display = 'flex'
    expand = true;
    fade_tl.pause();
  }

  function onDragEnd(e) {
    expand = false;
    fade_tl.restart();
  }
  //#endregion
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
        absolute bottom-0 right-0
        w-8 h-8
        bg-transparent
        hover:cursor-grab
        opacity-40 -rotate-45
        flex items-center
        transition ease-in-out duration-300
        "
    draggable="true"
    on:click={pushR}
    on:dragstart={onDragStart}
    on:dragend={onDragEnd}
  >
    <IconFoldDown color={"white"} class="w-full h-full" />
  </div>

  <div
    id="sizeText"
    bind:this={text_width}
    class="
  font-bold text-xl text-slate-200
  absolute top-1/2 left-1/2
  -translate-y-1/2 -translate-x-1/2
  opacity-0 w-1/2 h-1/2
  flex-center
  "
  >
    <IconArrowsMoveHorizontal class="p-1" />{width + 2 + "%"}
    <IconArrowsMoveVertical class="p-1" />{height + 2 + "px"}
  </div>

  <input
    type="text"
    id="title"
    name="title"
    bind:value={pad_infos.title}
    placeholder="Enter the title"
    class="w-full rounded outline-none bg-transparent
  border-b-2 border-slate-500 border-opacity-50 pl-1 pr-1
  font-semibold
  "
  />
  <div
    contenteditable
    id="content"
    bind:textContent={pad_infos.content}
    data-text="Every beginning is a new day"
    class="w-full rounded outline-none bg-transparent
  pl-1 pr-1 pt-2 h-full"
  />

  <p style="display: none;">{pad_infos.content}</p>
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

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
</style>
