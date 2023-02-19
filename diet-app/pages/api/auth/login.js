import User from '../../../model/User'
import connect from '@/util/dbConnect'
import { withIronSessionApiRoute } from "iron-session/next"
import { sessionOptions } from "lib/session";



connect()

// export default async function handler(req, res) {
//   const {username, password} = req.body
//   const user = await User.findOne({username, password})
//   if(!user) {
//     return res.status(400).json("Error");
//   }
//   else {
//     req.session.user = user
//     await req.session.save()
//     console.log("successful login")
//     return res.status(200).json("OK");
//   }
// }

export default withIronSessionApiRoute(async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({username, password})
    // const user = { isLoggedIn: true, login, avatarUrl: avatar_url };
    if(!user) {
      return res.status(400).json("Error")
    }
    user.isLoggedIn = true
    req.session.user = user
    await req.session.save()
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}, sessionOptions)