import mongoose from 'mongoose'
let isConnected =false;
const connectDb =async  () =>{
    if(isConnected){
        return;
    }
    try
    {
        
    const db = await mongoose.connect(process.env.MONGODB_URI,);
    isConnected =db.connections[0].readyState === 1;
    console.log('Connected to the database successfully');

    
    }
    catch(err){
        console.log("Error connecting to database");
    }
}


export default connectDb