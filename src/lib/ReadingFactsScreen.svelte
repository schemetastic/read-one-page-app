<script>
    import Page from "../routes/+page.svelte";
    import {
        score,
        currentScreen,
        selectedReadingField,
        selectedReadingTopic,
        questionsWithAnswers,
    } from "../stores";
    function handleClick() {
        selectedReadingField.set(null);
        selectedReadingTopic.set(null);
        questionsWithAnswers.set(null);
        score.set(0);
        currentScreen.set("home");
    }
</script>

<div class="container">
    <h1>Your results:</h1>
    <div class="resultsContainer">
        <div class="results">
            <strong>{$score}/3</strong>
        </div>
    </div>
    <h3>
        {#if $score === 3}
            You got all the answers right! 🎉
        {:else if $score === 2}
            You got 2 answers right! 😄
        {:else if $score === 1}
            You got 1 answer right 😑
        {:else}
            You got no answers right, try again! 🫂
        {/if}
    </h3>
    <p>
        Did you know that if you read 1 page at 90 seconds per page, you could
        read an entire book of 200 pages in 5 hours? Doesn't sound too bad
        right?
    </p>
    <button on:click={handleClick}>Keep Reading!</button>
</div>

<style>
    h1 {
        font-size: 2.5rem;
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
    .resultsContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        background-color: white;
        color: #101010;
        font-size: 2rem;
        border-radius: 10px;
        gap: 1rem;
    }
    p {
        font-size: 1.5rem;
        text-align: center;
    }
    .container {
        min-height: 90vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 2rem;
    }
</style>
