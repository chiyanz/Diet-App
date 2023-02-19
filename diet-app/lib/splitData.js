const cuisineVals = ['american', 'british', 'caribbean', 'centraleurope', 'chinese', 'easterneurope', 'french', 'greek', 'indian', 'italian', 'japanese', 'korean', 'mediterranean', 'mexican', 'middleeastern', 'nordic', 'southamerican', 'southeastasian']
export default function splitData(history) {
    const X = [];
    const Y = [];
    for (el of history) {
        const { rating, ...tmp } = el;
        const { cuisine, ...rest } = tmp;
        const x = [rest.values(), ...cuisineVals.map(val => val==ciusine)]
        X.push(x);
        Y.push(rating);
    }
    return [X, Y]
}