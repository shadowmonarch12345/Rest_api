const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser")
const app=express();
mongoose.connect("mongodb://127.0.0.1:27017/Sample",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("conntd")
}).catch((err)=>{
    console.log(err)
})
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
const productSchema=new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
})
const Product=new mongoose.model("Product",productSchema)
app.post("/api/v1/product/new",async(req,res)=>{
    const product=await Product.create(req.body);
    res.status(200).json({
        succes:true,
        product
    })
})
app.get("/api/v1/products",async(req,res)=>{
    const products=await Product.find();
    res.status(200).json({succes:true,products})
})

app.put("/api/v1/product/:id",async(req,res)=>{
    let product=await Product.findById(req.params.id);
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,
    useFindAndModify:false,
    runValidators:true
})
res.status(200).json({
    succes:true,
    product
})
})
app.delete("/api/v1/product/:id",async(req,res)=>{
   
})

app.listen(4500,()=>{
    console.log("server is working http://localhost:4500")
})