const express=require('express')
var cookieParser=require("cookie-parser")
var session=require("express-session")
var morgan=require("morgan")
const path=require('path')
const ejs=require('ejs')
const collection=require("./mongodb")
const app=express()
app.use(express.json())
app.set('view engine','ejs')
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser())
app.use(morgan("dev"))
app.use(
    session({
        key:'user_id',
        secret:"FFSD_PROJECT",
        resave:false,
        saveUninitialized:false,
        cookie:{
            expires:600000,
        },
    })
)

app.use((req,res,next)=>{
    if(!req.session.user && req.cookies.user_id){
        res.clearCookie("user_id")
    }
    next();
})

var sessionCheck =(req,res,next)=>{
    if (req.session.user && req.cookies.user_id) {
        res.redirect('/home');
    }
    else{
        next()
    }
}

const bcrypt = require("bcrypt")
const saltRounds = 10



app.get("/",sessionCheck,(req,res)=>{
    res.render("signup")
})
app.get("/signup",sessionCheck,(req,res)=>{
    res.render("signup")
})

app.post('/signup', (req,res)=>{
    var enpassword=req.body.password;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(enpassword, salt, function(err, hash) {
            
            var data={
                name:req.body.name,
                email:req.body.email,
                password:hash
            }
                req.session.user=data
                collection.insertMany([data])
                req.session.authorized=true
                res.redirect("/home")
                
                
            
        });
      });


})
app.get("/forgot",(req,res)=>{
    res.render("forgotPasswordPage")
})
app.post("/forgot",async(req,res)=>{
    try {
        var check=await collection.findOne({email:req.body.email})
        // console.log(check.email)
        if (!check) {
            alert("email not found")
            res.redirect('/login')
        }

        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt,async function(err, hash) {

                await collection.updateOne({email:req.body.email},{password:hash})
                console.log("changed")
                res.redirect('/login')
            });
        });

        

    } catch (error) {
        console.log()
    }
})

app.get("/login",sessionCheck,(req,res)=>{
    res.render("login")
})

app.post('/login',async (req,res)=>{
    // var email=req.body.email
    console.log("yeh chlra")
    try{
        console.log("yeh chlra2")
        var check=await collection.findOne({email:req.body.email})
        // console.log(check)
            if (!check) {
                console.log("yeh log")
                res.redirect('/login')
            }
            // var data={
            //     name:check.name,
            //     email:check.email,
            //     password:check.password
            // }
            bcrypt.compare(req.body.password, check.password, function(err, result) {
                console.log("reault",result)
                if (err) {
                    console.log("wrroe aara")
                }
                if (!result) {
                    console.log("password glt")
                    res.redirect('/login')
                }
                else{
                    req.session.user=check
                    console.log("pass thik")
                    //   req.session.authorized=true
                      res.redirect('/home')
        
                }
                                
              });
                    
    }
    catch{
        console.log("askbdkas")
    }


})

app.get("/home",(req,res)=>{
    if (req.session.user && req.cookies.user_id) {
        res.render('home')
    }
    else{
        res.redirect('/login')
    }
})



app.get('/logout',(req,res)=>{
    
    if (req.session.user && req.cookies.user_id) {
        res.clearCookie("user_id")
        res.redirect('/')
    }
    else{
        res.redirect('/login')
    }
})

app.use((req,res,next)=>{
    res.status(404).send("Sorry can't find that!");
})

app.listen(200,()=>{
    console.log("port connected")
})