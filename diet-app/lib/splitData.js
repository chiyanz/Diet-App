import convertCuisine from "./convertCuisine";

export default function splitData(history) {
    const X = [];
    const Y = [];
    for (const el of history) {
        const { name, ingredients, link, img, rating, ...tmp } = el;
        const { cuisine, ...rest } = tmp;
        console.log(typeof rest)
        const x = [...Object.values(rest), ...convertCuisine(cuisine)]
        X.push(x);
        Y.push(rating);
    }
    return [X, Y]
}