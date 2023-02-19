import querystring from 'querystring'
import connect from '@/util/dbConnect'

connect()

export default async function handler(req, res) {
  const body = req.body
  // serves to either 
  // 1. update/initialize user preferences
  // 2. add to the list of user's past 
  console.log(req.user)
  if(body.preferences) {
    
  }
}