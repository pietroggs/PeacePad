import { writable } from 'svelte/store';

const pads_store = writable('')
var pads = [{id: "pad1", title: "", content: ""}, {id: "pad2", title: "", content: ""}]

// @ts-ignore
function updateNote(pad_id) {
    pads.find(x=> x.id === pad_id)
}

export {pads_store}