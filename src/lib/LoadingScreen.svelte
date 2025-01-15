<script>
    import { onMount } from "svelte";
    import {
        currentScreen,
        selectedReadingField,
        selectedReadingTopic,
        questionsWithAnswers,
    } from "../stores";
    import { articles } from "./articles/index.js";

    let loadText = "Loading...";
    onMount(async () => {
        const data = await fetch(
            `/get-questions/?field=${$selectedReadingField}&topic=${$selectedReadingTopic}`
        )
            .then((res) => res.json())
            .catch((err) => "error");
        if (data.hasError) {
            loadText = "There was an error, please try again";
            setTimeout(() => {
                currentScreen.set("home");
            }, 3000);
        }
        questionsWithAnswers.set(data);
        currentScreen.set("menu");
    });
</script>

<div autofocus class="loadingScreen">
    <div class="loadingContainer">
        <div>
            <img src="/img/spinner.webp" alt="Loading Spinner" />
        </div>
        <h1>{loadText}</h1>
    </div>
</div>

<style>
    .loadingScreen {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .loadingScreen img {
        animation: spin 2s linear infinite;
    }
    .loadingContainer {
        text-align: center;
    }
    h1 {
        padding-top: 2rem;
    }
</style>
