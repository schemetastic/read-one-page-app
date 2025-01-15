<script>
    import "../global.css";
    import { fade } from "svelte/transition";
    import { posts } from "$lib/posts";
    import { currentScreen, dialogBoxVisible } from "../stores";
    import HomeScreen from "$lib/HomeScreen.svelte";
    import MenuScreen from "$lib/MenuScreen.svelte";
    import FastReadScreen from "$lib/FastReadScreen.svelte";
    import SlowReadScreen from "$lib/SlowReadScreen.svelte";
    import ReadingFactsScreen from "$lib/ReadingFactsScreen.svelte";
    import DialogBox from "$lib/DialogBox.svelte";
</script>

<head>
    <title>ReadOnePage</title>
</head>

<main class="mainContainer">
    {#if $currentScreen === "home"}
        <div transition:fade={{ duration: 300 }}>
            <HomeScreen />
        </div>
    {/if}
    {#if $currentScreen === "menu"}
        <div transition:fade={{ duration: 300 }}>
            <MenuScreen />
        </div>
    {/if}
    {#if $currentScreen === "fast-read"}
        <div transition:fade={{ duration: 300 }}>
            <FastReadScreen />
        </div>
    {/if}
    {#if $currentScreen === "slow-read"}
        <div transition:fade={{ duration: 300 }}>
            <SlowReadScreen />
        </div>
    {/if}
    {#if $currentScreen === "reading-facts"}
        <div transition:fade={{ duration: 300 }}>
            <ReadingFactsScreen />
        </div>
    {/if}
</main>

{#if $dialogBoxVisible}
    <div class="dialogBoxWrapper" transition:fade={{ duration: 300 }}>
        <DialogBox />
    </div>
{/if}
