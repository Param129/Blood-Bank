const mongoose = require('mongoose')

const url = "mongodb+srv://arjunm21:arjunm21@cluster0.zaoidt3.mongodb.net/test?retryWrites=true&w=majority";
mongoose.set('strictQuery',false);

const db=()=>{
    mongoose.connect(url).then(()=>{
    console.log("connected");
}).catch(err=>console.error(err));
}

db();

const Rregistrationschema = new mongoose.Schema({
  F_name:{type:String,
    required:true
  },
  L_name:{type:String,
    required:true
  },
  Email:{
    type:String,
  required:true,
  unique:true
},
  Phone_number:String,
  Password:{type:String,
    required:true
  },
  Dob:{type:Date,
    required:true
  },
  Adhar_number:{type:String,
    required:true  
  },
  Gender:{type:String,
    required:true
  },
  Blood_group:{
    type:String,
    required:true
  }

})
// const hospital = "create table hospital(Hospital_Name varchar(50),Email varchar(50),Contact_Number varchar(12),Password varchar(16),Pin_Code varchar(10),Address varchar(50),Unique(Email))";

const Hospital=new mongoose.Schema({
Hospital_name:{
  type:String,
  required:true,
},
Email:{
  type:String,
  required:true,
  unique:true
},
Contact_Numbeer:{
  type:String,
  required:true
},
Password:{
  type:String,
  required:true
},

pincode:{
  type:String,
  required:true
},

Hospital_license_number:{
  type:String,
  require:true,
  unique:true
},
State:{
  type:String,
  required:true
},
District:{
  type:String,
  required:true
},
Address:{
  type:String,
  required:true
},
Bloodgroup:{
  type: mongoose.Schema.Types.ObjectId,
  ref: "hospitalblood"
}

})
const Hospitalblood=new mongoose.Schema({
  Email:{
    type:String,
    required:true,
    unique:true
  },
  Aplus:{
   type:Number,
  required:true
  },
  Aneg:{
    type:Number,
   required:true
   },
  Oneg:{
    type:Number,
  required:true
  },
  Oplus:{
    type:Number,
  required:true
  },
  ABneg:{
    type:Number,
  required:true
  },
  ABplus:{
    type:Number,
  required:true
  },
  Bplus:{
    type:Number,
  required:true
  },
  Bneg:{
    type:Number,
  required:true
  }

})

const Charity=new mongoose.Schema({
  Email:{
    type:String,
  required:true
 
  },
Charity_Name:{
  type:String,
  required:true,
},
Phone:{
  type:String,
  required:true,
  unique:true,
},
Address:{
  type:String,
  required:true,
},
Description:{
  type:String,
  required:true,
}
})
const Donationrequest = new mongoose.Schema({
  Hospital_Email:{
    type:String,
    required:true
  },
  Patient_Name:{
    type:String,
    required:true
  },
  Reque_Email:{
    type:String,
    required:true,
    unique:true
  },
  National_id:{
    type:String,
    required:true,
  },
  Phone:{
    type:String,
    required:true,
    unique:true
  },
  Address:{
    type:String,
    required:true,
  },
  Bloodtype:{
    type:String,
    required:true,
  }
})
const DonationntoHospital =  new mongoose.Schema({
  Hospital_Email:{
    type:String,
    required:true
  },
  DonorName:{
    type:String,
    required:true,
  },
  National_id:{
    type:String,
    required:true,
  },
  Phone:{
    type:String,
    required:true,
  },
  Address:{
    type:String,
    required:true,
  },
  Email:{
    type:String,
    required:true,
  },
  Status:{
    type:Boolean,
    required:true,
    default:false
  },
  Date_of_donation:{
    type:Date,
    default:null
  },
  Blood_group:{
    type:String,
    required:true,
  }
})
const donationrequest =mongoose.model('donationrequest',Donationrequest);
const hospitalblood = mongoose.model('hospitalblood',Hospitalblood);
  const registration =mongoose.model('registration',Rregistrationschema);
  const hospital = mongoose.model('hospital',Hospital);
  const charity =mongoose.model('charity',Charity);
  const donationHospital = mongoose.model('donationHospital',DonationntoHospital);
  module.exports.registration =registration;
  module.exports.hospital =hospital;
  module.exports.hospitalblood=hospitalblood;
  module.exports.charity=charity;
 module.exports.donationrequest=donationrequest;
 module.exports.donationHospital=donationHospital;

  // (async function cerateuser(){
  //     await donationHospital.updateOne({Email:"a@gmail.com"},{ $set:{
  //       Status:false}})
  // })();


  //   (async function cerateuser(){
  //     let p={
  //      Hospital_Email:"sri@gmail.com",
  //      DonorName:"Arjun",
  //      Email:"Ar@gmail.com",
  //      National_id:"12345678901",
  //      Phone:"12345677790",
  //      Address:"Andhra",
  //      Blood_group:"A+",
     
  //   }
  //   let data = await donationHospital.create(p)
  //    console.log(data)
  // })();




//     (async function cerateuser(){
//       let p={
//        Hospital_Email:"sri@gmail.com",
//        Patient_Name:"Arjun",
//        Reque_Email:"Ar@gmail.com",
//        National_id:"12345678901",
//        Phone:"12345677790",
//        Address:"Andhra",
//        Bloodtype:"A+"
//     }
//     let data = await donationrequest.create(p)
//      console.log(data)
//   })();

//   (async function cerateuser(){
//     let p={
//       Patient_Name:"Arjun",
//      Hospital_Email:"sri@gmail.com",
//      Reque_Email:"karan@gmail.com",
//      National_id:"12225378901",
//      Phone:"12345677330",
//      Address:"Andhra",
//      Bloodtype:"A-"
//   }
//   let data = await donationrequest.create(p)
//    console.log(data)
// })();






  //   (async function cerateuser(){
  //     const hosblood = new hospitalblood();
  //     let p={
  //       Email:"An@gmail.com",
  //           Aplus:20,
  //           Aneg:20,
  //           Oplus:20,
  //           Oneg:20,
  //           ABplus:20,
  //           ABneg:20,
  //           Bplus:20,
  //           Bneg:20,
  //     }

  //   let user={
  //     Hospital_name:"Andhra"
  //       ,
  //     Email:"An@gmail.com",
  //     Contact_Numbeer:"12345678901"
  //     ,
  //     Password:"Andhra",
      
  //     pincode:"123456",
      
  //     Hospital_license_number:"Ad123",
  //     State:"Andhra",
  //     District:"sricity",
  //     Address:"Andhara sricity",
     
  //   }




  //   let data = await charity.create(user)
  //    console.log(data)
  // })();
  //   (async function cerateuser(){
  //   let user={
  //     Email:"sri@gmail.com",
  //     Charity_Name:"Up",
  //     Phone:"1234568890",
  //     Address:"Mansoura Near Mansoura Stadium",
  //     Description:"wefh8hf83 3ruhf83iw dcuiwbfuiw ubfuqbf ibuqb uebfubf ib8qbf8 8rbfubw difbuwbf eifubuwerbf ibfuber urbfuqb"

  //   }
  //   let data = await charity.create(user)
  //    console.log(data)
  // })();
  
  //   (async function cerateuser(){
  //   let user={
  //      F_name:'Karan',
  //      L_name:"Kumar",
  //      Email:'A@gmail.com',
  //       Password:'karan1',
  //       Dob:'2002-12-09',
  //       Adhar_number:'123456789012',
  //      Gender:'Male',
  //      Blood_group:'O+'

  //   }
  //   let data = await registration.create(user)
  //    console.log(data)
  // })();

  //   (async function cerateuser(){
  //   let user={
  //     Email:"sricity@gmail.com",
  //     Aplus:20,
  //     Aneg:20,
  //     Oplus:20,
  //     Oneg:20,
  //     ABplus:20,
  //     ABneg:20,
  //     Bplus:20,
  //     Bneg:20,
  //   }
  //   let data = await hospitalblood.create(user)
  //    console.log(data)
  // })();






// // const kittySchema = new mongoose.Schema({
// //     name: String,
// //     age:Number
    
// //   });
//   const kitty = new mongoose.Schema({
//     name: String,
//     age:Number
    
//   });
//   const arjun =mongoose.model('arjun',kitty);
// //   const kitten =mongoose.model('kitten',kittySchema);
// //   const obj = new kitten({name:"jonny",age:20});
// //   console.log(obj.name);



// //  (async function cerateuser(){
// //     let user={
// //         name:'Karan',
// //         password:'karan',
// //         email:'A@gmail.com'

// //     }
// //     let data = await kitten.create(user)
// //      console.log(data)
// //   })();

//  (async function cerateuser(){
    
//     let data = await arjun.find()
//      console.log(data)
//   })();




// (async function cerateuser(){
//   let user={
//      F_name:'Lokesh',
//      L_name:"Sai",
//      Email:'L@gmail.com',
//       Password:'LSai1',
//       Dob:'2003-01-06',
//       Adhar_number:'198657834218',
//      Gender:'Male',
//      Blood_group:'O+'

//   }
//   let data = await registration.create(user)
//   //  console.log(data)
// })();

// (async function cerateuser(){
//   let user={
//      F_name:'Harish',
//      L_name:"Sharma",
//      Email:'HS@gmail.com',
//       Password:'SharmaH1',
//       Dob:'2004-12-01',
//       Adhar_number:'167903456124',
//      Gender:'Male',
//      Blood_group:'O-'

//   }
//   let data = await registration.create(user)
//   //  console.log(data)
// })();

// (async function cerateuser(){
//   let user={
//      F_name:'Arun',
//      L_name:"Reddy",
//      Email:'AR@gmail.com',
//       Password:'AReddy2',
//       Dob:'2002-03-07',
//       Adhar_number:'154678903456',
//      Gender:'Male',
//      Blood_group:'AB+'

//   }
//   let data = await registration.create(user)
//   //  console.log(data)
// })();

// (async function cerateuser(){
//   let user={
//      F_name:'Deepak',
//      L_name:"Singh",
//      Email:'DS@gmail.com',
//       Password:'DSA1',
//       Dob:'2001-11-11',
//       Adhar_number:'156734567890',
//      Gender:'Male',
//      Blood_group:'AB-'

//   }
//   let data = await registration.create(user)
//   //  console.log(data)
// })();

// (async function cerateuser(){
//   let user={
//      F_name:'Rahul',
//      L_name:"Rao",
//      Email:'RR@gmail.com',
//       Password:'RRR1',
//       Dob:'2003-02-11',
//       Adhar_number:'167899353572',
//      Gender:'Male',
//      Blood_group:'O-'

//   }
//   let data = await registration.create(user)
//   //  console.log(data)
// })();

// (async function cerateuser(){
//   let user={
//      F_name:'Amulya',
//      L_name:"Singh",
//      Email:'AS@gmail.com',
//       Password:'ASingh2',
//       Dob:'2004-09-04',
//       Adhar_number:'145632895467',
//      Gender:'Female',
//      Blood_group:'O+'

//   }
//   let data = await registration.create(user)
//   //  console.log(data)
// })();

// (async function cerateuser(){
//   let user={
//      F_name:'Sara',
//      L_name:"Sharma",
//      Email:'SS@gmail.com',
//       Password:'SaraS3',
//       Dob:'2005-11-01',
//       Adhar_number:'167356739725',
//      Gender:'Female',
//      Blood_group:'A+'

//   }
//   let data = await registration.create(user)
//   //  console.log(data)
// })();

// (async function cerateuser(){
//   let user={
//      F_name:'Girish',
//      L_name:"Hegde",
//      Email:'GH@gmail.com',
//       Password:'GHegde1',
//       Dob:'2002-05-07',
//       Adhar_number:'947737383641',
//      Gender:'Male',
//      Blood_group:'B-'

//   }
//   let data = await registration.create(user)
//   //  console.log(data)
// })();

// (async function cerateuser(){
//   let user={
//      F_name:'Karthik',
//      L_name:"Kumar",
//      Email:'KK@gmail.com',
//       Password:'kkk2',
//       Dob:'2004-09-02',
//       Adhar_number:'783456712349',
//      Gender:'Male',
//      Blood_group:'A-'

//   }
//   let data = await registration.create(user)
//   //  console.log(data)
// })();

// (async function cerateuser(){
//   let user={
//      F_name:'Saketh',
//      L_name:"Shetty",
//      Email:'SD@gmail.com',
//       Password:'SSSShetty1',
//       Dob:'2002-08-06',
//       Adhar_number:'783579467103',
//      Gender:'Male',
//      Blood_group:'B+'

//   }
//   let data = await registration.create(user)
//   //  console.log(data)
// })();