import { json } from "@sveltejs/kit";
import { articles } from "$lib/articles/index.js";
import OpenAI from "openai";



export async function GET({ url }) {
    const field = url.searchParams.get("field");
    const topic = url.searchParams.get("topic");
    let hasError = false;
    const token = process.env["GITHUB_TOKEN"];
    const endpoint = "https://models.inference.ai.azure.com";
    const modelName = "gpt-4o-mini";

    const promptArticle = articles[field][topic].text;
    const prompt = `From the article next ahead I want you to give me 3 questions, and each question most have 4 possible options being only 1 the correct answer, please don't make the right answer way too obvious, return the questions and answers in this format: {% QUESTION: the-question $ANSWERS: [ RIGHT: answer-1 $; $WRONG: answer-2 $; $WRONG: answer-3 $; $WRONG: answer-4] /}. The answer 1 will always be the correct;

This is the article: ${promptArticle}`;

    const client = new OpenAI({ baseURL: endpoint, apiKey: token });

    const response = await client.chat.completions.create({
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt }
        ],
        temperature: 1.0,
        top_p: 1.0,
        max_tokens: 1000,
        model: modelName
    });

    console.log(response);

    const content = response.choices[0].message.content;
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
