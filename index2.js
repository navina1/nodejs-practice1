const express=require("express");
const bodyParser = require('body-parser');
const PORT=3000;
const app=express();

let avengers = [
    { id: 1, name: 'Iron Man' },
    { id: 2, name: 'Captain America' },
    { id: 3, name: 'Thor' },
  ];
const logger=(req,res,next)=>{
    console.log("New request");
    next();
}
//Middleware logic to find Avenger by id and attach to the requested object
const findAvengerById = (req,res,next)=>{
    let userId=req.params.id;
    let user=avengers.find((user)=>user.id===parseInt(userId));
    if(user){
        req.avenger=user;
        next();
    }else{
        res.status(404).send({ error :"User ID not found!" });
    }
}


// Middleware to parse JSON request bodies
app.use(logger)
app.use(bodyParser.json());

app.get("/avengers",(req,res)=>{
    let name=req.query.name;
    if (name) {
        let queryName=name.toLowerCase();
        let result=avengers.find((user)=>user.name.toLowerCase().includes(queryName));
        return result ? res.json(result) :  res.status(404).send({error : "User not found!"});  // Not Found
    }
    return res.json(avengers);
})
app.get("/avengers/:id",findAvengerById,(req,res)=>{
    res.json(req.avenger)
})

//create new record
app.post("/avengers",(req,res)=>{
    const dataNew=req.body;
    if(!dataNew.id){
        res.status(500).json({error:"id not present"})
    }else{
        avengers.push(dataNew);
        res.status(201).json(dataNew)
    }
})

//updating 
app.put("/avengers/:id",(req,res)=>{
   const id=parseInt(req.params.id);
   const newData=req.body;
   avengers=avengers.map((avenger)=>{
    if(avenger.id==id){
        return {...avenger,...newData}
    }
    return avenger
   }) ;
   res.json(newData);                                                                                                                                                                                                                                                                                                                                    
})
//delete  
app.delete("/avengers/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const removeAvenger = avengers.filter((item)=> item.id !== id )     
    if (!removeAvenger.length) {     
        return res.status(404).json({ error: 'Delete Failed' })    
    }            
    res.status(200).json(removeAvenger)      
})

app.get("*",(req,res)=>{
    res.json({error:"Api not found"})
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})