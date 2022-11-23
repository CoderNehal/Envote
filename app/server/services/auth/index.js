const {db} = require('../../utils/db')
const AuthService = {
    ValidateUser: (sql) =>{
      // console.log("inside validate user")
         db.query(sql, (err, result) => {
            //Id Invalid
            if (err) {
              console.log(err);
              return false;
            }
            console.log(result.length)
            if(result.length) {  console.log("oppppd"); return true;}
            return false;
          });
    }
}


module.exports = AuthService