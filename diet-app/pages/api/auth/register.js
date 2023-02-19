import User from '../../../model/User'
import connect from '@/util/dbConnect'

connect()

export default async function handler(req, res) {
  try {
    const user = await User.create(req.body)
    if(!user) {
      return res.status(400)
    }
    else {
      res.status(200)
    }
  }
  catch (err){
    res.status(500)
  }
}