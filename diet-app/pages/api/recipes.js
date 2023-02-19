import querystring from 'querystring'
import rankData from '@/lib/knn'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from "lib/session";
import connect from '@/util/dbConnect'
import User from '../../model/User'

const appId = process.env.NEXT_PUBLIC_APP_ID
const appKey = process.env.NEXT_PUBLIC_APP_KEY
const cuisineVals = ['american', 'british', 'caribbean', 'centraleurope', 'chinese', 'easterneurope', 'french', 'greek', 'indian', 'italian', 'japanese', 'korean', 'mediterranean', 'mexican', 'middleeastern', 'nordic', 'southamerican', 'southeastasian']

connect()

export default withIronSessionApiRoute(handler, sessionOptions)

async function handler(req, res) {
  const query = req.query
  const userHistory = await User.findOne({_id: req.session.user._id})
  const endpoint = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}&cuisine=chinese`
  let paramStr = querystring.stringify(query)
  if(!query.time) {
    paramStr += "&time=1%2B"
  }
  paramStr += "&health=alcohol-free&random=true"
  const response = await fetch(endpoint + '&' + paramStr)
  const data = await response.json()
  console.log(endpoint + "&" + paramStr)
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
      cuisine: details.cuisineType[0],
      img: details.images.REGULAR.url // url of the image 
    })
  }
  
  const test = filteredRecipeInfo.map((obj) => {
    return {calories: obj.calories, time: obj.time, cuisine: obj.cuisine}
  })
  const results = await rankData(userHistory.history, test)

  
  // default to 20 pages fetched 
  // console.log(filteredRecipeInfo)
  res.status(200).json(filteredRecipeInfo)
}