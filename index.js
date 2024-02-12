const express=require("express");
const PORT=8080;
const app=express();

const users=[{id:1,name:"Navina"},{id:2,name:"Neo"}]
//route parameter only for primary key

app.get("/users",(req,res)=>{
    //query parameter for feild except primary key
    let name=req.query.name;
    if(name){
        let result=users.find((user)=>user.name==name);
        console.log(result)
        return res.json(result)
    }
    return res.json(users)
})
app.get("/users/:id",(req,res)=>{
    let id=req.params.id;
    let result = users.find((user) => user.id === parseInt(id));
    console.log(result)
    if (!result){
        return res.status(404).send({error : "User not found!"});  // Not Found
    }
    return res.json(result);
})

//fallback route
app.get("*",(req,res)=>{
    res.status(404).send({ error : 'Not found!' });
})
app.listen(PORT,()=>{
    console.log("server started");
})