/* Taken from: https://www.youtube.com/watch?v=2I7uX8m0Ta0*/

const template = document.createElement("template")
template.innerHTML = 
`
<style>
    label {
        color: pink;
        display: block;
        font-size: 40px;
    }

    .description {
        font-size: 1rem;
        font-weight: lighter;
        color: blue;
    }
</style>

<label>
    <input type="checkbox" name="checkbox"/>
    <slot></slot>
        <span class="description">
            <slot name="description"></slot>
        </span>
</label>
`

class TodoItem extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({mode: "open"})
        shadow.append(template.content.cloneNode(true))

        this.checkbox = shadow.querySelector('input[type="checkbox"]')
    }

    static get observedAttributes() {
        return ["checked"]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === "checked") this.updateChecked(newValue)
//        console.log(name, oldValue, newValue)
    }

    connectedCallback() {
        console.log("connected")
    }

    /*
    disconnectedCallback() {
        console.log("disconnected")
    } */

    updateChecked(value) {
        this.checkbox.checked = value != null && value !== "false"
    }
}

customElements.define("todo-item", TodoItem)

/*
const item = document.querySelector("todo-item")
let checked = true 
setInterval(() => {
    checked = !checked
    item.setAttribute("checked", checked)
}, 500) */

/*
const item = document.querySelector("todo-item")
item.remove() */