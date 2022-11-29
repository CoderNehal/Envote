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

          });
    },
    encrypt: (voter_id,date_of_birth) => {
      const token  = jwt.sign({voter_id,date_of_birth},'SECRET KEY');
      return token;
    },
    decrypt: (token) => {
      const data = jwt.verify(token,'SECRET KEY');
      console.log(data);  
      // const {voter_id,date_of_birth} = jwt.decode(token,'SECRET KEY');
      return {voter_id:1,date_of_birth:1};
    },
    alreadyVoted: (voter_id,cb) => {
      db.query("Select * from elections where id=" + voter_id, (err, result) => {
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