import mongoose from 'mongoose'

export const connect = () => {
  // Connect to MongoDB with Mongoose.
  console.log('CONNECT: ', process.env.MONGODB_URL)

  mongoose.connect(process.env.MONGODB_URL, {  useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))
}
