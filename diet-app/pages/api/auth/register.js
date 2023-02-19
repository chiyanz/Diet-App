import User from '../../../model/User'
import connect from '@/util/dbConnect'
connect()

export default async function handler(req, res) {
  try {
    const {username, password} = req.body
    const user = await User.create({username, password, preferences: {excluded: [], health: []}, history: [{}]})
    if(!user) {
      return res.status(400).json("400")
    }
    else {
      res.status(200).json("OK")
    }
  }
  catch (err){
    console.log(err);
    res.status(500).json("500")
  }
}