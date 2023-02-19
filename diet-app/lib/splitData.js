import convertCuisine from "./convertCuisine";

export default function splitData(history) {
    const X = [];
    const Y = [];
    for (const el of history) {
        const { rating, ...tmp } = el;
        const { cuisine, calories, time } = tmp;
        const x = [ calories, time, ...convertCuisine(cuisine)]
        X.push(x);
        Y.push(rating);
    }
    return [X, Y]
}