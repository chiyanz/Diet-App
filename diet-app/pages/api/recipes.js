import { filter } from '@chakra-ui/react'
import querystring from 'querystring'

const appId = process.env.NEXT_PUBLIC_APP_ID
const appKey = process.env.NEXT_PUBLIC_APP_KEY

export default async function handler(req, res) {
  const query = req.query
  const endpoint = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}`
  let paramStr = querystring.stringify(query)
  const response = await fetch(endpoint + '&' + paramStr)
  const data = await response.json()
  console.log(endpoint + paramStr)
  // console.log(data)

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
  // console.log(filteredRecipeInfo)
  res.status(200).json(filteredRecipeInfo)
}