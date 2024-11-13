const express= require('express');
const cors= require('cors');
const dotenv= require('dotenv');
dotenv.config();
const stripe=require('stripe')
(process.env.STRIPE_KEY)
const app =express();
app.use(cors({orgin:true}))
app.use(express.json());
app.get('/', (req, res)=>{
res.status(200).json({
    message:"sucessfully recived"
})

})
app.post("/payment/create",async(req, res)=>{
    const total= req.query.total;
if(total>0){
    const payment= await stripe.paymentIntents.create({
        amount:total,
        currency:"usd"
              
    })
    console.log(payment)
    res.status(200).json({
        clientSecret:payment.client_secret,
    });
}
else{
    res.status(404).json("paymments not working");
}
})

app.listen(5000,(err)=>{
if(err) throw err
console.log("the servr is running at port https://localhost:5000");
})