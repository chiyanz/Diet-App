import User from '../../../model/User'
import connect from '@/util/dbConnect'

connect()

export default async function handler(req, res) {
  try {
    const user = await User.create(req.body)
    if(!user) {
      return res.json({code: 'User not created'})
    }
    else {
      res.redirect('/')
    }
  }
  catch (err){
    res.status(400).json({status: 'Not able to create a new user'})
  }
}