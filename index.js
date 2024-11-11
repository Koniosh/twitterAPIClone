const express= require("express");
const app=express();
const {v4:uuidv4}=require("uuid");
const methodOverride=require("method-override");
const path=require("path");
let port=8080;
let posts=[
    {
        username:"Shivanshi",
        id: uuidv4(),
        content:"Ilove coding!",
    },
    {
        username:"Saad",
        id: uuidv4(),
        content:"I just got my first internship!",
    },
    {
        username:"Iffat",
        id: uuidv4(),
        content:"Yesterday the night was full of bug fixing and contests, hacakathon!",
    },
];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(express.urlencoded({extended: true}));
//main route
app.get("/posts", (req, res)=>{
    res.render("index.ejs", { posts });
});
//create route

app.get("/posts/new", (req, res)=>{
   res.render("form.ejs");
});
app.post("/posts",(req,res)=>{
   let id=uuidv4();
   let { username, content, } = req.body;
   posts.push({username, content, id});
   res.redirect("/posts");
});
//read route
app.get("/posts/:id",(req,res)=>{
   let {id}=req.params;
   let idis=posts.find((p)=>id===p.id);
   res.render("show.ejs", {idis});
});
//update route
app.patch("/posts/:id",(req, res)=>{
   let { id, username }=req.params;
   let newcontent=req.body.content;
   let idis=posts.find((p)=>id===p.id);
   idis.content=newcontent;
   res.redirect("/posts");
});

app.get("/posts/:id/edit", (req,res)=>{
    let {id}=req.params;
    let idis=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{idis});
});
//delete route
app.delete("/posts/:id", (req, res)=>{
   let {id}=req.params;
   posts=posts.filter((p)=>id!=p.id);
   res.redirect("/posts");
});

app.listen(port, ()=>{
    console.log(`Sever is listening on port ${port}`);
});

