import mongoose, { mongo } from "mongoose"

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
  preferences: preferencesSchema,
  // recipes
})

const preferencesSchema = new mongoose.Schema({
  excluded: [String],
  health: String
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema)