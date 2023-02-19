import mongoose, { mongo } from "mongoose"

const preferencesSchema = new mongoose.Schema({
  excluded: [String],
  health: [String]
})

const historySchema = new mongoose.Schema({
  name: String,
  calories: Number,
  time: Number,
  ingredients: [String],
  cuisine: String
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