const { AuthService } = require('../../services');
const jwt = require('jsonwebtoken');

const { db } = require('../../utils/db');
const AuthController = async (req, res) => {
	// ? Get the data from the request
	const { voter_id, encrypted_key } = req.body;
	// ? Validate the data

	// Match

	
	// return res.send(encrypted);

	// ? Check if the voter exists
	db.query('Select * from election where id=' + voter_id, (err, result) => {
		if (err) {
			console.log(err);
			return false;
		}
		console.log(result);
		// ? Check if the voter exists
		if (result.length == 0) {
			return res.status(404).json({
				status: 404,
				message: 'Voter not found',
			});
		}

    // Encrypt the given string
	  const encrypted = AuthService.encrypt(voter_id);

    // return res.status(200).send(encrypted);

		// ? Check if the voter has the correct key
		if (encrypted_key !== encrypted) {
			return res.status(400).json({
				status: 400,
				message: 'Voter has the wrong key',
			});
		}
		// AuthService.alreadyVoted(voter_id, (result) => {
		// 	if (result) {
		// 		return res.status(400).json({
		// 			status: 400,
		// 			message: 'Voter has already voted',
		// 		});
		// 	}
    db.query("Select * from election where id=" + voter_id, (err, result) => {
      //Id Invalid
      if (err) {
        console.log(err);
        return false;
      }
      console.log(result)
      if(result[0].y_22===1){
        return res.status(400).json({
          status: 400,
          message: 'Voter has already voted',
        });
      }

			// ? Generate a token
			const token = jwt.sign({ voter_id }, 'ANOTHER SECRET', {
				expiresIn: '1h',
			});

			// ? Check if the voter has already voted

			// ? Return the token

			db.query(
				'UPDATE election SET y_22 = 1 WHERE id = ' + voter_id,
				(err, result) => {
					//Id Invalid
					if (err) {
						console.log(err);
						return false;
					}
					// console.log(result)
				}
			);
			return res.status(200).json({
				status: 200,
				message: 'Voter authenticated',
				token,
			});
		});
	});
};

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

module.exports = AuthController;
