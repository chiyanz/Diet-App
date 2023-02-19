import User from '../../../model/User'
import connect from '@/util/dbConnect'
connect()

export default async function handler(req, res) {
  try {
    console.log(req.body)
    console.log(typeof req.body)
    const user = await User.create(req.body)
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