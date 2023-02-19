import User from '../../../model/User'
import connect from '@/util/dbConnect'

connect()

export default async function handler(req, res) {
  const {username, password} = req.body
  const user = await User.findOne({username, password})
  if(!user) {
    return res.status(400).json("Error");
  }
  else {
    return res.status(200).json("OK");
  }
}