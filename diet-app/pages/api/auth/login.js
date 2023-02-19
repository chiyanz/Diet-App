import User from '../../../model/User'
import connect from '@/util/dbConnect'

connect()

export default async function handler(req, res) {
  const {username, password} = req.body
  const user = await User.findOne({username, password})
  if(!user) {
    return res.json({status: 'User not found'})
  }
  else {
    res.redirect('/home')
  }
}