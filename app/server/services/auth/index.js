const jwt = require('jsonwebtoken');
const {db} = require('../../utils/db')

const AuthService = {
  getVoter:  (voter_id) =>{
          db.query("Select * from voter_info where id=" + voter_id, (err, result) => {
            //Id Invalid
            if (err) {
              console.log(err);
              return false;
            }
            console.log(result)
            return result.length>0;
          });
    },
    encrypt: (voter_id) => {
      const token  = jwt.sign(voter_id,'SECRET KEY');
      return token;
    },
    decrypt: (token) => {
      const voter_id = jwt.verify(token,'SECRET KEY');
      return voter_id;
    },
    alreadyVoted: (voter_id,cb) => {
      db.query("Select * from election where id=" + voter_id, (err, result) => {
        //Id Invalid
        if (err) {
          console.log(err);
          return false;
        }
        console.log(result)
        if(result[0]?.y_22===1)  cb(true);
        else  cb(true);
      });
    }
}


module.exports = AuthService