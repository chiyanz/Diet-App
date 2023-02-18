const appId = process.env.NEXT_PUBLIC_APP_ID
const appKey = process.env.NEXT_PUBLIC_APP_KEY

export default async function handler(req, res) {
  let filters = {}
  const query = req.query
  const validParams = ['q', 'excluded', 'ingr', 'diet', 'health', 'cuisineType', 'mealType', 'calories', 'time']

  const endpoint = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}`
  let paramStr = ""
  for(const key in query) {
    if(validParams.includes(key)) {
      console.log("valid param")
      paramStr += `&${key}=${query[key]}`
    }
  }
  const response = await fetch(endpoint.concat(paramStr))
  const data = await response.json()
  console.log(endpoint + paramStr)
  res.status(200).json(data.hits[1]) 
  // console.log(data.hits[1].recipe)
  let filteredRecipeInfo = []
  for(const recipe of data.hits) {
    const details = recipe.recipe
    filteredRecipeInfo.push({
      name: details.label, // name of the product
      calories: details.calories, // total number of calories
      time: details.totalTime, // total prep time required
      ingredients: details.ingredientLines, // list of ingredients required and their respecive amount
      link: details.url, // link to the recipe URL for execution directions 
      img: details.images.REGULAR.url // url of the image 
    })
  } 
  // default to 20 pages fetched 
  console.log(filteredRecipeInfo)
}