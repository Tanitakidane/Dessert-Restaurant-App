var express=require('express');
var path=require("path");
var app=express();

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'i2cpbxbi4neiupid.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      user: "ixaikiwnox3d5l3d",
    password: "frho4fhq7hzcg59p",
    database : "h5yfkr5ixjcgtlrn",
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

app.listen(process.env.PORT || 3000,()=>{
  console.log("Server started");
})