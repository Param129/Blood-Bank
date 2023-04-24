// BLOODBANK DATABASE =--------->


const mongoose = require('mongoose')

const url = "mongodb+srv://arjunm21:arjunm21@cluster0.zaoidt3.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery',false);

const db=()=>{
    mongoose.connect(url).then(()=>{
    console.log("connected");
}).catch(err=>console.error(err));
}

db();

const kittySchema = new mongoose.Schema({
    name: String,
    age:Number
    
  });
  const kitten =mongoose.model('kitten',kittySchema);
  const obj = new kitten({name:"jonny",age:20});
  console.log(obj.name);









// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://arjunm21:arjunm21@cluster0.zaoidt3.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
// //   const collection = client.db("test").collection("arjun");
//   // perform actions on the collection object
//   if(err){
//    console.log(err);
//   }
//  console.log('c')
// });

// app.get('/',(req,res)=>{
//     db.collection('')
// })


// connection -------
// const db = new sqlite3.Database(db_name,err=>{
//        if(err){
//           console.log(err.message);
//        }
//        console.log("connected");
//      })
// CREATION QUERRY------------------->

// const delet = "drop table bloodbank";
// db.run(delet,err=>{
//    if(err){
//       console.log(err.message);
//    }
//    console.log('Table deleted');
// })


//  const query ="create table  bloodbank(S_NO integer primary key autoincrement,State varchar(50),District varchar(50),Type varchar(5),Address varchar(50),Contact_Number varchar(12),Empty Varchar(16))";
    
//  code for runnig  the query -----

//   db.run(query,err=>{
//     if(err){
//        console.log(err.message);
//     }
//     console.log('Table created');
//  })


// const Registration ="create table Registration( F_name varchar(50) ,L_name varchar(50),Email varchar(50) ,Phone_number varchar(12),Password varchar(20),Dob date,Adhar_number varchar(20),Blood_group varchar(5),Gender varchar(7), Unique(Email))";
//   db.run(Registration,err=>{
//     if(err){
//        console.log(err.message);
//     }
//     console.log('Table created for registration');
//  })

// const hospital = "create table hospital(Hospital_Name varchar(50),Email varchar(50),Contact_Number varchar(12),Password varchar(16),Pin_Code varchar(10),Address varchar(50),Unique(Email))";
//   db.run(hospital,err=>{
//     if(err){
//        console.log(err.message);
//     }
//     console.log('Table created for hospital');
//  })


// INSERCTION QUERRY---------------->

// const inser = "insert into bloodbank values(1,'Bihar','Patna','A+','Boring road patna 800023','1234567890','') ";
// const inser2 = "insert into bloodbank values(2,'Bihar','Gaya','A+','Jalal road gaya 800024','1234567690','AB-'),(3,'Delhi','Central','O+','cp Delhi 600123','1234467890',''),(4,'Delhi','North East','O-','GIP Mall 500143','1236567890','AB+')";

//   db.run(inser,err=>{
//     if(err){
//        console.log(err.message);
//     }
//     console.log('inserted');
//  })

//   db.run(inser2,err=>{
//     if(err){
//        console.log(err.message);
//     }
//     console.log('inserted');
//  })

// const gdata="select *from bloodbank "
// code for returning---
// in rows output will get stored -------->
   //  db.all(gdata,(err,rows)=>{
   //     if(err){
   //        console.log(err.message);
   //     }
   //     console.log(rows);
       
   //  })

//  (S_NO,State,District,Type,Address,Contact_Number) 
















 //  <th>S.No.</th>
    //       <th>State</th>    
    //       <th> District </th>
    //       <th>Type</th>
    //       <th>Address</th>
    //       <th> contact number</th>