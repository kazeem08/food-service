import config from 'config';

// export default function() {
//   if (!config.get("jwtPrivateKey")) {
//     throw new Error("FATAL ERROR: jwtPrivateKey is not defined");
//   }
// }

//Validating jwt key
function jwtKey() {
	if (!config.get('jwtPrivateKey')) {
		throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
	}
}

export { jwtKey };
