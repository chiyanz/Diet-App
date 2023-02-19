import connect from '@/util/dbConnect'
import User from '../../model/User'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from "lib/session";

connect()

export default withIronSessionApiRoute(handler, sessionOptions)

async function handler(req, res) {
  const body = req.body
  console.log(req.session)
  // serves to either 
  // 1. update/initialize user preferences
  // 2. add to the list of user's past 
  if(body.preferences) {
    console.log('updating preferences')
    console.log(typeof body.preferences)
    User.updateOne({_id: body._id}, {
      $set: {
        preferences: body.preferences
      }
    }).then(() => res.status(200).json({message: 'updated user preferences'}))
    const user = await User.findOne({_id: body._id})
    console.log(user)
  }

  if(body.history) {
    console.log('updating history')
    console.log(body.history)
    User.updateOne({_id: body._id}, {
      $push: {
        history: body.history
      }
    }).then(() => res.status(200).json({message: 'updated user history'}))
    const user = await User.findOne({_id: body._id})
    console.log(user)
  }
}