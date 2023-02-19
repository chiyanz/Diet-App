import connect from '@/util/dbConnect'
import User from '../../model/User'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from "lib/session";

connect()

export default withIronSessionApiRoute(handler, sessionOptions)

async function handler(req, res) {
  if(req.method == "GET") {
    const user = await User.findOne({_id: req.query._id})
    if(user) {
      res.json({user})
    }
  }
  const body = req.body
  // serves to either 
  // 1. update/initialize user preferences
  // 2. add to the list of user's past 
  if(body.preferences) {
    console.log('updating preferences')
    User.updateOne({_id: req.session.user._id}, {
      $set: {
        preferences: body.preferences
      }
    }).then(() => res.status(200).json({message: 'updated user preferences'}))
  }
  console.log(body.history);
  if(body.history) {
    console.log('updating history')
    await User.updateOne({_id: req.session.user._id}, {
      $push: {
        history: {$each: body.history}
      }
    })
    res.status(200).json({message: 'updated user history'});
  }
}