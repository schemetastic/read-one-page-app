<script>
    import { onMount } from "svelte";
    import { articles } from "./articles/index.js";
    import {
        currentScreen,
        selectedReadingField,
        selectedReadingTopic,
    } from "../stores.js";

    function handleClick() {
        currentScreen.set("q&a");
    }
</script>

<div class="readingContainer">
    <div class="textWrapper" autofocus>
        {@html articles[$selectedReadingField][$selectedReadingTopic].html}
        <div class="buttonContainer">
            <button on:click={handleClick}>I'm Done!</button>
        </div>
    </div>
</div>

<style>
    .textWrapper {
        padding: 20vh 0;
    }
    .buttonContainer {
        padding: 3rem 0 10vh 0;
        text-align: center;
    }
    button {
        padding: 1rem 2rem;
        border-radius: 10px;
        background-color: #064494;
        color: white;
        border: none;
        font-size: 1.25rem;
        cursor: pointer;
    }
    button:hover {
        background-color: #1c5db3;
    }
</style>
