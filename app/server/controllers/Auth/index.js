const { AuthService } = require('../../services')
const jwt = require('jsonwebtoken')


const {db} = require('../../utils/db')
const AuthController =  async (req, res) => {
  // ? Get the data from the request
  const { voter_id, encrypted_key } = req.body;
  // ? Validate the data

  // Match 
  const encrypted = jwt.sign({voter_id}, "SECRET_KEY");
  console.log("Enc:",encrypted)
  const decrypted =  jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2b3Rlcl9pZCI6IjEiLCJpYXQiOjE2NjkxMjc5NDh9.lWkAtDWBJQQyPrV8_-cy1pFLPkUV5T6eeRWpFoPWVhj","SECRET_KEY");
  console.log("dec:",decrypted);
  // if(decrypted===voter_id)
  // {
   
  //   console.log("Matched");

  // }else{
  //   console.log("Not Matched");
  // }



  //   const { session_id, voter_id } = req.body;
  //   console.log("Inside Auth Controller")
  //   // Session validation
  //   const session_isValid = true;

  //   // Session Invalid

  //   // Id Decrypt

  //   //Id validations
  //  // let id_isValid = false;
  //   //  id_isValid = AuthService.ValidateUser("Select * from Voters where id=" + voter_id);
  //    db.query("Select * from Voters where id=" + voter_id, (err, result) => {
  //     //Id Invalid
  //     if (err) {
  //       console.log(err);
  //       return false;
  //     }
  //     console.log()
  //     if(session_isValid && result.length>0) {  

  //         console.log("User is valid")
  //         const token = jwt.sign(session_id + voter_id, "Secret here");
  //         res.cookie("session_token", token, {
  //           maxAge: 2.5 * 60 * 60,
  //           httpOnly: true,
  //         });
  //         return res.json({ success: true, message: "user and session is valid" });
  //       } else {
  //         return res.json({
  //           success: false,
  //           message: "Either session or user is invalid",
  //         });
  //       }


  //     }
  //   );
   
  }


module.exports = AuthController;
