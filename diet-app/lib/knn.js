const tf = require('@tensorflow/tfjs');
const knnClassifier = require('@tensorflow-models/knn-classifier');

const NUM_CLASSES = 3
const cuisineVals = ['american', 'british', 'caribbean', 'centraleurope', 'chinese', 'easterneurope', 'french', 'greek', 'indian', 'italian', 'japanese', 'korean', 'mediterranean', 'mexican', 'middleeastern', 'nordic', 'southamerican', 'southeastasian']

export default async function rankData(train, test) {
  const classifier = knnClassifier.create();
  train.forEach((obj, i) => {
    classifier.addExample(tf.tensor(Object.values(obj)), obj.rating)
  })

  let predictions = await Promise.all(test.map(async (arr) => {
    const result = await classifier.predictClass(tf.tensor(arr), 3)
    return result.label
  }))
  return predictions
}

// const train = [
//   [10, 15],
//   [100, 15],
//   [10, 30],
//   [100, 30]
// ]

// const train_results = [0,1,0,1]

// const test = [
//   [10, 20],
//   [10, 20]
// ]
// console.log(rankData(train, train_results, test))
