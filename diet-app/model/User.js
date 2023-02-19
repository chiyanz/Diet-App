import mongoose, { mongo } from "mongoose"

const preferencesSchema = new mongoose.Schema({
  excluded: [String],
  health: [String]
})

const historySchema = new mongoose.Schema({
  calories: Number,
  time: Number,
  cuisine: String,
  rating: Number
})

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  preferences: {
    type: preferencesSchema,
    require: true
  },
  history: {
    type: [historySchema],
    require: true
  }
})



module.exports = mongoose.models.User || mongoose.model('User', userSchema)