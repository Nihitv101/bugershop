import app from "./app.js";
import connectDB from "./config/database.js";
import Razorpay from 'razorpay';


const PORT = process.env.PORT || 5000;

connectDB();

console.log(process.env.RAZORPAY_API_KEY, process.env.RAZORPAY_API_SECRET)

export const instance = new Razorpay({
    key_id:process.env.RAZORPAY_API_KEY,
    key_secret:process.env.RAZORPAY_API_SECRET,

})



app.listen(PORT, ()=>{
    console.log(`server is listening on http://localhost:${PORT}, In ${process.env.NODE_ENV}`)
})