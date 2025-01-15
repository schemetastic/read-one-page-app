<script>
    import { currentScreen } from "../stores.js";
</script>

<section autofocus>
    <h1>2. Select a reading mode</h1>
    <div class="optionsContainer">
        <div class="optionBox">
            <h2>Tough-Love</h2>
            <img
                src="/img/tough-love-badge.webp"
                alt="Tough-Love Badge showing an arms with muscles flexing"
            />
            <p>
                The screen will automatically scroll and you only have ~90
                seconds to read the whole article. On finish, with the help of
                AI you'll be asked 3 questions.
            </p>
            <button
                on:click={() => {
                    currentScreen.set("fast-read");
                }}>Start session</button
            >
        </div>
        <div class="optionBox">
            <h2>Self-Paced</h2>
            <img
                src="/img/self-paced-badge.webp"
                alt="Self-Paced Badge showing an illustration of a beautiful natural view"
            />
            <p>
                Read at your own pace. On finish you'll get how much time did
                you spend reading, and then, with the help of AI you'll be asked
                3 questions.
            </p>
            <button
                on:click={() => {
                    currentScreen.set("slow-read");
                }}>Start session</button
            >
        </div>
    </div>
</section>

<style>
    h1 {
        text-align: center;
        padding: 1rem 0;
        font-size: 2.15rem;
    }
    h2 {
        text-align: center;
        padding: 1rem 0;
        font-size: 1.75rem;
    }
    .optionsContainer {
        gap: 1rem;
        display: flex;
        justify-content: center;
        padding: 1rem 0;
        flex-direction: row;
    }
    .optionBox {
        flex-basis: 45%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1rem 1.5rem 1rem;
        border-radius: 10px;
        background-color: #101010;
        border: 1px solid #555555;
        color: white;
        text-align: center;
        transition: all ease-in-out 0.2s;
    }
    .optionBox:hover {
        scale: 1.05;
    }
    .optionBox:hover img {
        opacity: 1;
    }
    .optionBox img {
        width: 95%;
        max-width: 300px;
        opacity: 0.8;
        transition: all ease-in-out 0.2s;
    }
    .optionBox p {
        padding: 1rem 0 1.5rem 0;
        font-size: 1.15rem;
        min-height: 10rem;
    }
    button {
        padding: 0.5rem 1rem;
        border-radius: 5px;
        background-color: #353535;
        color: white;
        border: none;
        cursor: pointer;
        transition: all ease-in-out 0.2s;
        font-size: 1.15rem;
    }
    button:hover {
        background-color: rgb(0, 84, 180);
    }
</style>
