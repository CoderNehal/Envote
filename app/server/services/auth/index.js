const {db} = require('../../utils/db')
const AuthService = {
    ValidateUser: async(sql) =>{
      console.log("inside validate user")
        await db.query(sql, (err, result) => {
            //Id Invalid
            if (err) {
              console.log(err);
              return false;
            }
      
            return true;
          });
    }
}


module.exports = AuthService