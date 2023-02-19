const cuisineVals = ['american', 'british', 'caribbean', 'centraleurope', 'chinese', 'easterneurope', 'french', 'greek', 'indian', 'italian', 'japanese', 'korean', 'mediterranean', 'mexican', 'middleeastern', 'nordic', 'southamerican', 'southeastasian']
export default function splitData(history) {
    const X = [];
    const Y = [];
    for (const el of history) {
        const { name, ingredients, link, img, rating, ...tmp } = el;
        const { cuisine, ...rest } = tmp;
        console.log(typeof rest)
        const x = [...Object.values(rest), ...cuisineVals.map(val => val==cuisine)]
        X.push(x);
        Y.push(rating);
    }
    return [X, Y]
}