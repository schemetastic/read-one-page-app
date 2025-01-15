<script>
    import { currentScreen, questionsWithAnswers, score } from "../stores";
    let questionOneRes = -1;
    let questionTwoRes = -1;
    let questionThreeRes = -1;

    console.log($questionsWithAnswers.data);
    function handleClick(questionNum, answer) {
        console.log(questionNum, answer);
        if (questionNum === 0) {
            questionOneRes = answer;
        }
        if (questionNum === 1) {
            questionTwoRes = answer;
        }
        if (questionNum === 2) {
            questionThreeRes = answer;
        }
    }

    function handleSubmit() {
        let scoreCount = 0;
        if (
            questionOneRes === -1 ||
            questionTwoRes === -1 ||
            questionThreeRes === -1
        ) {
            return;
        }
        if ($questionsWithAnswers.data[0].answers[questionOneRes].isRight) {
            scoreCount++;
        }
        if ($questionsWithAnswers.data[1].answers[questionTwoRes].isRight) {
            scoreCount++;
        }
        if ($questionsWithAnswers.data[2].answers[questionThreeRes].isRight) {
            scoreCount++;
        }
        score.set(scoreCount);
        currentScreen.set("reading-facts");
    }
</script>

<h1>Let's see how much you've got from that reading!</h1>
<div autofocus>
    {#each $questionsWithAnswers.data as item, questionIndex}
        <div class="questionContainer">
            <h2>{item.question}</h2>
            {#each item.answers as answer, answerIndex}
                <button
                    class="optionBtn"
                    on:click={() => {
                        handleClick(questionIndex, answerIndex);
                    }}
                    aria-pressed={questionIndex === 0 &&
                    questionOneRes === answerIndex
                        ? true
                        : questionIndex === 1 && questionTwoRes === answerIndex
                          ? true
                          : questionIndex === 2 &&
                              questionThreeRes === answerIndex
                            ? true
                            : false}
                    >{answer.text
                        .replace(/^ \[/g, "")
                        .replace(/]/g, "")
                        .replaceAll("$RIGHT: ", "")
                        .replaceAll("$WRONG: ", "")
                        .replaceAll("/}", "")}</button
                >
            {/each}
        </div>
    {/each}
</div>

<div class="submitBtnContainer">
    <button
        class="submitBtn"
        on:click={handleSubmit}
        disabled={questionOneRes === -1 ||
            questionTwoRes === -1 ||
            questionThreeRes === -1}>Get Results!</button
    >
</div>

<style>
    .questionContainer {
        padding: 1rem;
        border: 1px solid white;
        margin: 2rem 0;
        border-radius: 10px;
    }
    .submitBtnContainer {
        text-align: center;
        padding: 2rem 0;
    }
    .submitBtn {
        padding: 1rem 2rem;
        border-radius: 10px;
        background-color: #064494;
        color: white;
        border: none;
        font-size: 1.25rem;
        cursor: pointer;
    }
    .submitBtn:hover {
        background-color: #1c5db3;
    }
    .submitBtn[disabled] {
        cursor: not-allowed;
        background-color: #555555;
    }
    h2 {
        padding-bottom: 1rem;
    }
    .optionBtn {
        padding: 1rem 2rem;
        border-radius: 10px;
        background-color: #101010;
        border: 1px solid #555555;
        color: white;
        font-size: 1.25rem;
        cursor: pointer;
        margin: 0.5rem;
    }
    .optionBtn:hover {
        background-color: #252525;
    }
    .optionBtn[aria-pressed="true"] {
        background-color: white;
        color: #101010;
    }
</style>
