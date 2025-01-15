import { json } from "@sveltejs/kit";
import { articles } from "$lib/articles/index.js";

export async function GET({ url }) {
    const field = url.searchParams.get("field");
    const topic = url.searchParams.get("topic");
    let hasError = false;

    const promptArticle = articles[field][topic].text;

    const content = `{% $QUESTION: What is one key principle mentioned for creating intuitive UI/UX? $ANSWERS: [$RIGHT: Consistency $; $WRONG: Animation $; $WRONG: Color Variety $; $WRONG: Complexity] /}

{% $QUESTION: How should effective UI/UX design start according to the article? $ANSWERS: [$RIGHT: By understanding the user's needs and behaviors $; $WRONG: By choosing vibrant color schemes $; $WRONG: By adopting the latest design trends $; $WRONG: By following competitor designs] /}

{% $QUESTION: What should designers prioritize to enhance user satisfaction in UI/UX design? $ANSWERS: [$RIGHT: Function and user satisfaction $; $WRONG: Aesthetics over functionality $; $WRONG: Complicated interfaces $; $WRONG: Heavy use of animations] /}`

    const questions = splitQuestions(content);

    if (questions.length !== 3) {
        return json({
            data: "Error: Incorrect number of questions",
            hasError: true,
        });
    }

    const questionsWithAnswers = getQuestionsWithAnswers(questions);

    return json({
        data: questionsWithAnswers,
        hasError: hasError,
    });
}
function splitQuestions(data) {
    return data.match(/\{%.*?\/\}/g).map(question => question.replace(/\n/g, ""));
}



function getQuestionsWithAnswers(questions) {
    return questions.map((question) => {
        const questionParts = question.split("$ANSWERS:");
        const questionText = questionParts[0].replace(/^\{% \$QUESTION: /, "").replace(/ \$ANSWERS:.+/, "");
        const answers = questionParts[1].split("$;");
        const rightAnswer = answers[0].replace(/^\[$RIGHT: /, "");
        const wrongAnswers = answers.slice(1).map((answer) => answer.replace(/^\[$WRONG: /, "").replace(/ \$;/, ""));
        const answersArr = shuffleArray([{ text: rightAnswer, isRight: true }, ...wrongAnswers.map((answer) => ({ text: answer, isRight: false }))]);

        return {
            question: questionText,
            answers: answersArr,
        };
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
