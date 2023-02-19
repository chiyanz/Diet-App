import convertCuisine from "./convertCuisine";

export default function splitData(history) {
    const X = [];
    const Y = [];
    for (const i in Object.getOwnPropertyNames(history)) {
        const el = history[i];
        if (!el) continue;
        
        const { rating, cuisine, calories, time } = el;
        // console.log(el.constructor);
        const x = [ calories, time, ...convertCuisine(cuisine)]
        X.push(x);
        Y.push(rating);
    }
    return [X, Y]
}