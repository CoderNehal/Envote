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
            console.log(result[0]?.id)
            if(result[0]?.id!==undefined) {  console.log("oppppd"); return true;}
            return false;
          });
    }
}


module.exports = AuthService