import { json } from "@sveltejs/kit";

export async function GET({ params }) {
    const { slug } = params;
    const res = await fetch(`https://api.example.com/questions/${slug}`);
    const data = await res.json();

    if (res.ok) {
        return { body: data };
    }

    return {
        status: res.status,
        body: data,
    };
}