const { AuthService } = require('../../services')
const jwt = require('jsonwebtoken')


const {db} = require('../../utils/db')
const AuthController =  async (req, res) => {
    const { session_id, voter_id } = req.body;
    console.log("Inside Auth Controller")
    // Session validation
    const session_isValid = true;

    // Session Invalid

    // Id Decrypt

    //Id validations
   // let id_isValid = false;
    //  id_isValid = AuthService.ValidateUser("Select * from Voters where id=" + voter_id);
     db.query("Select * from Voters where id=" + voter_id, (err, result) => {
      //Id Invalid
      if (err) {
        console.log(err);
        return false;
      }
      console.log()
      if(session_isValid && result.length>0) {  

          console.log("User is valid")
          const token = jwt.sign(session_id + voter_id, "Secret here");
          res.cookie("session_token", token, {
            maxAge: 2.5 * 60 * 60,
            httpOnly: true,
          });
          return res.json({ success: true, message: "user and session is valid" });
        } else {
          return res.json({
            success: false,
            message: "Either session or user is invalid",
          });
        }


      }
    );
   
  }


module.exports = AuthController;
