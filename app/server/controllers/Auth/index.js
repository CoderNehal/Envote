const { AuthService } = require('../../services');
const jwt = require('jsonwebtoken');

const { db } = require('../../utils/db');
const AuthController = async (req, res) => {
	// ? Get the data from the request
	const { voter_id, encrypted_key, date_of_birth } = req.body;
	

	// ? Check if the voter exists

	db.query('Select * from elections where id=' + voter_id, (err, result) => {
		if (err) { // syntatic error
			return res.json({ success: false, message: 'User validation failed!!!' });
		}
		// ? Check if the voter exists
		const id = jwt.verify(encrypted_key, 'SECRET KEY').id;
		console.log(voter_id);
		if (result.length == 0 || !id || result[0].id!==id) {
			return res.status(404).json({
				status: 404,
				success: false,
				message: 'Voter not found',
			});
		}
		const encrypted = AuthService.encrypt(voter_id, date_of_birth);
		// return res.json({encrypted})
		//  const dob = AuthService.decrypt(encrypted_key).date_of_birth;
		const dob = jwt.decode(encrypted_key,'SECRET KEY').dob.split('T')[0];
		console.log(dob)
		if(!dob){
			return res.json({ success: false, message: 'Incorrect key' });
		}
		// ? check if user has entered the correct date of birth
		if (dob != date_of_birth) {
			return res.status(401).json({
				status: 401,
				success: false,
				message: 'Invalid date of birth',
			});
		}
		console.log(result[0]);
		// ? Check if the voter has already voted
		db.query('Select * from elections where id=' + voter_id, (err, result) => {
			//Id Invalid
			if (err) {
				console.log(err);
				return false;
			}
			if (result[0].y_2022 === 1) {
				return res.status(400).json({
					status: 400,
					success: false,
					message: 'Voter has already voted',
				});
			}
			console.log("Ithhh parayant")
			// ? Generate a token
			
			// ? Send the token to the voter

			db.query(
				'UPDATE elections SET y_2022 = 1 WHERE id = ' + voter_id,
				(err, result) => {
					//Id Invalid
					if (err) {
						return res.json({
							success: false,
							message: 'Voting failed',
						
						})
					}
				}
			);
			const token = jwt.sign({ voter_id ,date_of_birth }, 'ANOTHER SECRET', {
				expiresIn: '1h',
			});

			return res.status(200).json({
				status: 200,
				success: true,
				message: 'Voter authenticated',
				token,
			});
		});
	});
};

// if(decrypted===voter_id)
// {

// }else{
// }

//   const { session_id, voter_id } = req.body;
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
//       return false;
//     }
//     if(session_isValid && result.length>0) {

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
