<script>
    import {
        dialogBoxDescription,
        dialogBoxVisible,
        dialogBoxTitle,
    } from "../stores";

    let focusEnabled = true;

    function handleModalBoxClose(event) {
        if (event && event.target.id === "dialog-box") {
            return;
        }
        focusEnabled = true;
        dialogBoxVisible.set(false);
    }
    function handleKeydown(event) {
        if (event.key === "Escape") {
            handleModalBoxClose(event);
        }
    }
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
    class={`dialogBoxContainer ${$dialogBoxVisible ? "dialogBoxContainer-visible" : ""}`}
    on:keydown={handleKeydown}
    id="dialog-box-container"
    on:click={() => {
        handleModalBoxClose(event);
    }}
    role="dialog"
    autofocus
>
    <div class="dialogBox" id="dialog-box">
        <button
            class="closeBtn"
            on:click={() => {
                handleModalBoxClose(event);
            }}
        >
            X
        </button>
        <h2>{$dialogBoxTitle}</h2>
        <p>{$dialogBoxDescription}</p>
        <div class="okayButtonContainer">
            <button
                class="okayButton"
                on:click={() => {
                    handleModalBoxClose(event);
                }}
            >
                Okay
            </button>
        </div>
    </div>
</div>

<style>
    .dialogBoxContainer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
        visibility: hidden;
        opacity: 0;
        transition:
            opacity ease-in-out 500ms,
            visibility ease-in-out 500ms;
        backdrop-filter: blur(7px);
    }
    .dialogBoxContainer-visible {
        visibility: visible;
        opacity: 1;
    }
    .dialogBox {
        position: relative;
        background-color: white;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        width: 90%;
        min-height: 150px;
        max-width: 780px;
    }
    .closeBtn {
        background-color: #252525;
        color: white;
        font-weight: 600;
        font-size: 1.2rem;
        border-radius: 50%;
        border: none;
        width: 2.5rem;
        height: 2.5rem;
        position: absolute;
        right: 1rem;
        top: 1rem;
        cursor: pointer;
    }
    .closeBtn:hover {
        background-color: #101010;
    }
    h2 {
        padding-top: 1rem;
        font-size: 2rem;
        text-align: center;
    }
    p {
        font-size: 1.25rem;
        text-align: center;
        padding: 1rem 0 0 0;
    }
    .okayButtonContainer {
        display: flex;
        justify-content: center;
        padding: 1.5rem 0;
    }
    .okayButton {
        background-color: #252525;
        color: white;
        font-weight: 600;
        font-size: 1.2rem;
        border: none;
        border-radius: 5px;
        padding: 0.5rem 1rem;
        cursor: pointer;
    }
    .okayButton:hover {
        background-color: #101010;
    }
    :global(.dialogBoxWrapper) {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
