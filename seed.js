const mongoose = require('mongoose')

const url = "mongodb+srv://arjunm21:arjunm21@cluster0.zaoidt3.mongodb.net/test?retryWrites=true&w=majority";
mongoose.set('strictQuery',false);

const db=()=>{
    mongoose.connect(url).then(()=>{
    console.log("connected");
}).catch(err=>console.error(err));
}

db();

const collection =require('./mongoose.js');

const seedhelper = async function(email,aplus,aneg,oplus,oneg,abplus,abneg,bplus,bneg,hosName,contNum,hosPass,pincd,hosLic,state,dist,address){
    const hosblood = new collection.hospitalblood();
                  let j= email
            hosblood.Email = j;
            hosblood.Aplus=  parseInt(aplus)
            hosblood.Aneg=  parseInt(aneg)
            hosblood.Oplus= parseInt(oplus)
            hosblood.Oneg=  parseInt(oneg)
            hosblood.ABplus=  parseInt(abplus)
            hosblood.ABneg=  parseInt(abneg)
            hosblood.Bplus=  parseInt(bplus)
            hosblood.Bneg=  parseInt(bneg)

             const hos = new collection.hospital();
            hos.Bloodgroup = hosblood;
            hos.Email = email;
            hos.Hospital_name=hosName
            hos.Contact_Numbeer=contNum
            hos.Password=hosPass
            hos.pincode=pincd
            hos.Hospital_license_number=hosLic
            hos.State=state
            hos.District=dist
            hos.Address=address
    
    await hosblood.save();
    await hos.save();
        
}
// seedhelper();
// const fetching = async function(){
//     const hos = await collection.hospital.findOne().populate('Bloodgroup');
//     console.log(hos.Bloodgroup.ABneg);
// }
// fetching()


// seedhelper('johndoe@example.com', 50, 30, 70, 40, 10, 30, 20, 60, 'St. Mary Hospital', '9576543210', 'hospass123', '400001', 'MH123456', 'Maharashtra', 'Mumbai', '123 Main St.')
// seedhelper('janedoe@example.com', 20, 60, 40, 50, 30, 10, 80, 20, 'Apollo Hospital', '9988776655', 'hospass456', '500001', 'TL654321', 'Telangana', 'Hyderabad', '456 Elm St.')
// seedhelper('samsmith@example.com', 10, 20, 30, 40, 50, 60, 70, 80, 'Fortis Hospital', '9856543210', 'hospass789', '600001', 'TN987654', 'Tamil Nadu', 'Chennai', '789 Oak St.')
// seedhelper('sarahlee@example.com', 80, 20, 20, 30, 40, 50, 60, 70, 'Max Hospital', '9988776555', 'hospass012', '700001', 'WB321098', 'West Bengal', 'Kolkata', '321 Maple St.')
// seedhelper('michaelng@example.com', 60, 10, 50, 20, 10, 30, 40, 70, 'AIIMS Hospital', '5876543210', 'hospass345', '110001', 'DL765432', 'Delhi', 'New Delhi', '567 Pine St.')
// seedhelper('johncarter@example.com', 40, 20, 80, 30, 10, 10, 50, 70, 'Global Hospital', '9876543210', 'hospass678', '400069', 'MH789012', 'Maharashtra', 'Mumbai', '789 Broadway')
// seedhelper('alicelee@example.com', 30, 50, 60, 40, 10, 20, 80, 20, 'Fortune Hospital', '9988776655', 'hospass345', '600096', 'TN234567', 'Tamil Nadu', 'Chennai', '234 Main St.')
// seedhelper('peterwang@example.com', 70, 20, 10, 60, 30, 30, 80, 50, 'Max Health Care', '9876543210', 'hospass901', '110023', 'DL123456', 'Delhi', 'New Delhi', '345 Second St.')
// seedhelper('sarajones@example.com', 20, 40, 70, 10, 50, 30, 80, 60, 'KIMS Hospital', '9588776655', 'hospass234', '500032', 'TS456789', 'Telangana', 'Hyderabad', '567 Third St.')
// seedhelper('davidtan@example.com', 50, 30, 40, 60, 40, 10, 80, 20, 'Columbia Hospital', '9876543250', 'hospass567', '700027', 'WB890123', 'West Bengal', 'Kolkata', '789 Fourth St.')

module.exports.seedhelper=seedhelper;