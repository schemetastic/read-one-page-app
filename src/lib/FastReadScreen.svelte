<script>
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { articles } from "./articles/index.js";
    import {
        currentScreen,
        selectedReadingField,
        selectedReadingTopic,
    } from "../stores.js";
    let hasStarted = false;
    let cueText = "Get ready!";
    onMount(() => {
        setTimeout(() => {
            currentScreen.set("q&a");
        }, 85000);
        setTimeout(() => {
            hasStarted = true;
        }, 3500);
        setTimeout(() => {
            cueText = "Set!";
        }, 1500);
        setTimeout(() => {
            cueText = "Go!";
        }, 3000);
    });
</script>

<div class="readingContainer">
    <div class="textWrapper" autofocus>
        {@html articles[$selectedReadingField][$selectedReadingTopic].html}
    </div>
</div>
{#if !hasStarted}
    <div class="visualCue" transition:fade>{cueText}</div>
{/if}

<style>
    .readingContainer {
        overflow: hidden;
    }
    .textWrapper {
        padding: 20vh 0;
        animation-name: slideUp;
        animation-duration: 90s;
        animation-delay: 4s;
        animation-timing-function: linear;
    }
    .visualCue {
        position: fixed;
        top: 1.5rem;
        left: 50%;
        transform: translateX(-50%);
        background-color: white;
        color: #252525;
        font-weight: 500;
        padding: 1rem;
        border-radius: 5px;
        font-size: 2rem;
    }
    @keyframes slideUp {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(-95%);
        }
    }
</style>
