import querystring from 'querystring'
import connect from '@/util/dbConnect'
import User from '../../../model/User'


connect()

export default async function handler(req, res) {
  const body = req.body
  // serves to either 
  // 1. update/initialize user preferences
  // 2. add to the list of user's past 
  console.log(req.user)
  if(body.preferences) {
    User.updateOne({_id: body._id}, {
      $set: {
        preferences: body.preferences
      }
    })
  }

  if(body.history) {
    User.updateOne({_id: body._id}, {
      $push: {
        history: body.history
      }
    })
  }
}