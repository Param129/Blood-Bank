const express =require('express');
const app= express()
const path =require('path')
const sqlite3 = require('sqlite3').verbose();
const mongoose =require('mongoose')
const collection =require('./mongoose.js');
const seed =require('./seed.js');
const session =require('express-session')
const cookieParser=require("cookie-parser")
var morgan=require("morgan")
const bparser =require('body-parser');
app.set('view engine','ejs');
app.use(bparser.urlencoded({extended: false}));
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,"public")))
// CONNECTION ----->
const url = "mongodb+srv://arjunm21:arjunm21@cluster0.zaoidt3.mongodb.net/test?retryWrites=true&w=majority";
mongoose.set('strictQuery',false);

const db=()=>{
    mongoose.connect(url).then(()=>{
    console.log("connected");
}).catch(err=>console.error(err));
}

db();
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

var sessionCheck =async (req,res,next)=>{
  if (req.session.user && req.cookies.user_id) {
  data =req.session.user.d;
  blooddata=req.session.user.b;
  charit =req.session.user.c;
  patient =req.session.user.e;
  donation =req.session.user.do
res.render('hospital',{model:data,blood:blooddata,char:charit,patient:patient,donation:donation})
  }
  else{
      next()
  }
}


// getmethods---------------->
app.get('/',(req,res)=>{
    res.render('main');
  
  })
  app.get('/connect',(req,res)=>{
   res.render('connectwithus');
 
 })
 app.get('/search',(req,res)=>{
   res.render('t1');
 
 })
 app.get('/staff',(req,res)=>{
   res.render('staff');
 
 })
 app.get('/about',(req,res)=>{
   res.render('about');
 
 })
 app.get('/signup',(req,res)=>{
  res.render('signup');
 })
 app.get('/login',(req,res)=>{
  res.render('login');
 })
 app.get('/hospital',sessionCheck,(req,res)=>{
 
   res.redirect('/hospitallogin')
 })
 app.get('/hospitalregister',(req,res)=>{
  res.render('hospitalregister');
 })
 app.get('/hospitallogin',sessionCheck,(req,res)=>{
  res.render('hospitallogin');
 })
 app.get('/contact',(req,res)=>{
  res.render('contact'); 
 })

 app.get('/take/:type',async (req,res)=>{
  const bloodtype =req.params.type;
  var m=req.session.user.b
  var p=m.Aplus
  if(p-1>=0){
    p=p-1;
  const filter ={Email:m.Email}
  var updateDoc ={};
  if(bloodtype=='Aplus'){
   updateDoc ={$set: {
            Aplus: p
          },}
          req.session.user.b.Aplus=p;
        }
          if(bloodtype=='Aneg'){
            updateDoc ={$set: {
             Aneg: p
   },}
   req.session.user.b.Aneg=p;
  }
   if(bloodtype=='ABplus'){
    updateDoc ={$set: {
             ABplus: p
           },}
           req.session.user.b.ABplus=p;
          }
  if(bloodtype=='ABneg'){
    updateDoc ={$set: {
     ABneg: p
   },}
   req.session.user.b.ABneg=p;
  }

   if(bloodtype=='Oplus'){
    updateDoc ={$set: {
             Oplus: p
           },}
           req.session.user.b.Oplus=p;
          }

     if(bloodtype=='Oneg'){
            updateDoc ={$set: {
                     Oneg: p
    },}
    req.session.user.b.Oneg=p;
  }
  if(bloodtype=='Bneg'){
    updateDoc ={$set: {
             Bneg: p
},}
req.session.user.b.Bneg=p;
}
if(bloodtype=='Bplus'){
  updateDoc ={$set: {
           Bneg: p
},}
req.session.user.b.Bplus=p;
}
          const options = { upsert: true };
  const result = await collection.hospitalblood.updateOne(filter, updateDoc, options);
 

        }
        res.redirect('/hospital');
 })
 app.get('/IN/:type',async (req,res)=>{
  const bloodtype =req.params.type;
  var m=req.session.user.b
  var p=m.Aplus
  if(p){
    p=p+1;
  const filter ={Email:m.Email}
  var updateDoc ={};
  if(bloodtype=='Aplus'){
   updateDoc ={$set: {
            Aplus: p
          },}
          req.session.user.b.Aplus=p;
        }
          if(bloodtype=='Aneg'){
            updateDoc ={$set: {
             Aneg: p
   },}
   req.session.user.b.Aneg=p;
  }
   if(bloodtype=='ABplus'){
    updateDoc ={$set: {
             ABplus: p
           },}
           req.session.user.b.ABplus=p;
          }
  if(bloodtype=='ABneg'){
    updateDoc ={$set: {
     ABneg: p
   },}
   req.session.user.b.ABneg=p;
  }

   if(bloodtype=='Oplus'){
    updateDoc ={$set: {
             Oplus: p
           },}
           req.session.user.b.Oplus=p;
          }

     if(bloodtype=='Oneg'){
            updateDoc ={$set: {
                     Oneg: p
    },}
    req.session.user.b.Oneg=p;
  }
  if(bloodtype=='Bneg'){
    updateDoc ={$set: {
             Bneg: p
},}
req.session.user.b.Bneg=p;
}
if(bloodtype=='Bplus'){
  updateDoc ={$set: {
           Bneg: p
},}
req.session.user.b.Bplus=p;
}
          const options = { upsert: true };
  const result = await collection.hospitalblood.updateOne(filter, updateDoc, options);
 

        }
        res.redirect('/hospital');
 })
 
 app.get('/donation/:Email',(req,res)=>{
  Email=req.params.Email;

  res.render('donationform',{Email:Email})
 })
//  hospitalform kholega 
 app.get('/donationhospital/:Email',(req,res)=>{
  let Email=req.params.Email;
  res.render('donationhospitalform',{Email:Email});
 })
 app.get('/removepatient/:req_email',async (req,res)=>{
  let req_email =req.params.req_email;
        const result = await collection.donationrequest.deleteOne({Reque_Email:req_email});
        const data =await collection.donationrequest.find();
      req.session.user.e=data;
        res.redirect('/hospital');
 })
 app.get('/donationsearch',(req,res)=>{
  res.render('donationsearch');
 })
 app.get('/updatedonation/:Email',async (req,res)=>{
 
let Em =req.params.Email;
await collection.donationHospital.updateMany({Email:Em,Status:false},{ $set:{
  Status:true,
  Date_of_donation: new Date()}})
   let hospem =req.session.user.b.Email;
  //  console.log(hospem)
   let data = await collection.donationHospital.find({Hospital_Email
:hospem   })
  //  console.log(data);
   req.session.user.do=data;
   res.redirect('/hospital');
  
 })
app.get('/donarinformation/:Email',async (req,res)=>{
Em =req.params.Email
  let data = await collection.donationHospital.find({Email:Em});
  res.render('donorinformation',{data:data});
})

app.get('/logout',(req,res)=>{
  req.session.destroy();
  res.render('hospitallogin');
})
app.get('/Addcharity',(req,res)=>{
  res.render('Addcharity')
})

// app.get('/donationreq',(req,res)=>{
//   res.render('donationform');
// })








//<--------------------------- POST REQUEST ------------------------>
app.post('/hospitalpatient',async (req,res)=>{
 let hosp_email =req.body.hospitalemail
 let email=req.body.email
 let p_name=req.body.patientname
 let  nationalid= req.body.nationalid
 let  phoneno =req.body.phoneno
 let  address =req.body.address
 let  bloodgroup =req.body.bloodgroup
   let p={
    Hospital_Email:hosp_email,
    Patient_Name:p_name,
    Reque_Email:email,
    National_id:nationalid,
    Phone:phoneno,
    Address:address,
    Bloodtype:bloodgroup
      }
      let data = await collection.donationrequest.create(p)
      res.send({Message:"Request raised "})

})
 app.post('/register',async (req,res)=>{

      let user={
       F_name:req.body.fname,
       L_name:req.body.lname,
       Phone_number:req.body.phoneNo,
       Email:req.body.email,
        Password:req.body.password,
        Dob:req.body.dob,
        Adhar_number:req.body.aadharNo,
       Gender:req.body.gender,
       Blood_group:req.body.bloodgrp}
    let data = await collection.create(user)
     res.render('login')
})

app.post('/login',async (req,res)=>{
let email = req.body.email
let password = req.body.password
let data = await collection.registration.findOne({Email:email})
// console.log(data)
if(data&&data.Password==password){
res.render('donor',{data:data})
}else{
  res.status(400).json({ error: "Enter valid email password" })
}

})

app.post('/fo',async (req,res)=>{
 let state =req.body.stateCode
 let district =req.body.district
 let k=req.body.bloodgroup
 console.log(k);
 const hos = await collection.hospital.find({State:state,District:district}).populate('Bloodgroup');

  res.render('t2',{model:hos,blood:req.body.bloodgroup});

})

app.post('/hospitalregister',async (req,res)=>{

  // const book = [req.body.name,req.body.email,req.body.phoneNo,req.body.password,req.body.pincode,req.body.add,req.body.Licence_no];

  var Hospital_name=req.body.name
  var Email=req.body.email
  var Contact_Numbeer=req.body.phoneNo
  var Password=req.body.password
  var pincode=req.body.pincode
  var Hospital_license_number=req.body.Licence_no
  var State=req.body.State
  var District=req.body.District
  var Address=req.body.add
     var Aneg= req.body.Aneg
     var Aplus =req.body.Aplus
     var Oneg =req.body.Oneg
     var Oplus =req.body.Oplus
     var ABneg =req.body.ABneg
     var ABplus =req.body.ABplus
     var Bneg =req.body.Bneg
     var Bplus =req.body.Bplus
     seed.seedhelper(Email,Aplus,Aneg,Oplus,Oneg,ABplus,ABneg,Bplus,Bneg,Hospital_name,Contact_Numbeer,Password,pincode,Hospital_license_number,State,District,Address);
// let data = await collection.hospital.create(user);
res.render('hospitallogin')
})


app.post('/hospitallogin',async (req,res)=>{
  let email = req.body.email
let password = req.body.password
let data = await collection.hospital.findOne({Email:email});
let blooddata =await collection.hospitalblood.findOne({Email:email});
let charitydata = await collection.charity.find({Email:email});
let patient = await collection.donationrequest.find({Hospital_Email:email});
let donationreq = await collection.donationHospital.find({Hospital_Email:email});
// console.log(donationreq);
var inf ={d:data,b:blooddata,c:charitydata,e:patient,do:donationreq};
req.session.user=inf;
// console.log(req.session.user);
req.session.authorized=true;
// console.log(data)
if(data&&data.Password==password){
  // console.log(charitydata)
res.render('hospital',{model:data,blood:blooddata,char:charitydata,patient:patient,donation:donationreq })
}else{
  res.status(400).json({ error: "Enter valid email password" })
}
 })
 
 app.post('/donationsearch',async (req,res)=>{
  let state =req.body.stateCode
  let district =req.body.district
    let data =await collection.hospital.find({State:state,District:district});
    res.render('donationhospitals',{data:data});
 })
app.post('/donationform',async(req,res)=>{
d_name =req.body.donorname;
nationalid =req.body.nationalid;
phoneno =req.body.phoneno;
address =req.body.address;
email=req.body.email;
bloodgroup=req.body.bloodgroup;
hospemail=req.body.hospitalemail;

let usr={
Hospital_Email:hospemail,
DonorName:d_name,
National_id:nationalid,
Phone:phoneno,
Address:address,
Email:email,
Blood_group:bloodgroup,
}
let data =await collection.donationHospital.create(usr);
res.send({message:"Request has benn sent"});

})

app.post('/Addcharity',async (req,res)=>{
Ema =req.session.user.b.Email;
let usr={
Email:Ema,
Charity_Name:req.body.charity,
Phone:req.body.phoneNo,
Address:req.body.address,
Description:req.body.desctiption,
}
await collection.charity.create(usr);
const data = await collection.charity.find({Email:Ema})
req.session.user.c=data;
res.redirect('/hospital');
})
app.listen(3000);





