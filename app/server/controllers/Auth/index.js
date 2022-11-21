const { AuthService } = require('../../services')
const jwt = require('jsonwebtoken')
const AuthController =  async (req, res) => {
    const { session_id, voter_id } = req.body;
    console.log("Inside Auth Controller")
    // Session validation
    const session_isValid = true;

    // Session Invalid

    // Id Decrypt

    //Id validations
    const id_isValid = AuthService.ValidateUser("Select * from Voters where id=" + voter_id);

    if (id_isValid && session_isValid) {
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


module.exports = AuthController;
