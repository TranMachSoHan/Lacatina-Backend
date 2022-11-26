const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
  
exports.transferCreditToBlockChain = async(req, res) =>{
  try{
    const user = await User.findOne({ _id: req.body.user.id})
    if(!user){
      return res.status(404).send();
    }
    console.log("user "+ user);
    if(user["awardPoint"] > 50){
      return res.status(200).send(user["walletAddress"]);
    }
    else{
      return res.status(400).send("User is not alloweed to trade point")
    }
  }
  catch{

  }
}