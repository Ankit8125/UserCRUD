import mongoose from "mongoose"

const connectToDB = async() => {
    const url = 'mongodb+srv://syncing284:Jh58wFEPyIqPRIlI@cluster0.jdz01je.mongodb.net/'

    mongoose
    .connect(url)
    .then(()=>console.log('Database connection is successful'))
    .catch((e)=>console.log(e))
}

export default connectToDB