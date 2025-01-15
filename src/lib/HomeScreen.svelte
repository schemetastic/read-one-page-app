<script>
    import { articles } from "./articles/index.js";
    import {
        selectedReadingField,
        selectedReadingTopic,
        currentScreen,
    } from "../stores.js";

    function handleLinkClick(field, topic) {
        event.preventDefault();
        selectedReadingField.set(field);
        selectedReadingTopic.set(topic);
        currentScreen.set("loading");
    }
</script>

<div class="logoContainer">
    <img src="/img/logo.webp" alt="logo of ReadOnePage" />
</div>

<div class="description">
    <p>
        Having problems to focus is becoming more common, we are getting used to
        consume very short amounts of information due to social media and
        entertainment, this is reducing our attention span.
    </p>
    <p>
        ReadOnePage helps you to give the first step, <strong
            >each article has near 300 words, that's about 1 page of a book.</strong
        > Select an article and start an interactive reading session.
    </p>
</div>

<h1>1. Select an article that you find interesting</h1>
<p class="descriptionAfter">
    After each reading, <strong>
        with the help of AI you'll be asked 3 questions of the reading.
    </strong>
</p>

<section class="articlesContainer">
    {#each Object.keys(articles) as field}
        <div class="articleField">
            <h2>{field}:</h2>
            <ul>
                {#each Object.keys(articles[field]) as article}
                    <li>
                        <a
                            on:click={() => {
                                handleLinkClick(field, article);
                            }}
                            href="#!">{article}</a
                        >
                    </li>
                {/each}
            </ul>
        </div>
    {/each}
</section>

<style>
    .logoContainer {
        text-align: center;
        padding: 3rem 0 2rem 0;
    }
    img {
        width: 100%;
        max-width: 450px;
    }
    .description {
        text-align: center;
        padding: 0.75rem 1rem;
        border-radius: 10px;
        background-color: white;
        color: #252525;
    }
    .description p {
        padding: 0.5rem 0;
        font-size: 1.15rem;
    }
    h1 {
        padding: 2rem;
        text-align: center;
        font-size: 2.25rem;
    }
    h2 {
        padding: 1rem 0;
        text-align: left;
        font-size: 1.85rem;
    }
    .descriptionAfter {
        font-size: 1.15rem;
        padding: 0 0 2rem 0;
        text-align: center;
    }
    .articlesContainer {
        padding: 1rem 0;
    }
    ul {
        display: block;
        border-radius: 5px;
        border: 2px solid white;
        list-style: none;
        width: 95%;
        padding: 0;
        margin-left: 2rem;
    }
    li {
        display: block;
    }
    li:not(:last-child) {
        border-bottom: 2px solid white;
    }
    li a {
        display: block;
        padding: 1rem 1rem;
        color: white;
        text-decoration: none;
        text-decoration: none;
        width: 100%;
        font-size: 1.25rem;
        transition: all ease-in-out 0.15s;
    }
    li a:hover {
        background-color: white;
        text-decoration: underline;
        color: #151515;
    }
</style>
