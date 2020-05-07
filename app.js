var express=require('express');
var path=require("path");
var app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'Joshuaj8!',
      database : 'restaurant'
    }
  });


app.get("/",function(req,res){
    res.sendFile(path.join(__dirname+'/views/index.html'));
})



app.post("/neworder",async(req,res)=>{
try {
    let order=req.body.ordername;
  //  console.log(req.body);
    let _data=await knex('order').insert({ordername:order});
    res.json(_data);
} catch (error) {
    console.log(error);
    
}



})


app.post("/getorder",async(req,res)=>{

let _data=await knex.select("idorder","ordername").from("order");


res.json(_data);

})

app.get("/hello",function(req,res){
    res.json({"message":"Hi world"})
})


app.get("/data",(req,res)=>{

res.json({message:"I am data"})

})

app.listen(3000,()=>{
    console.log("server started");
})