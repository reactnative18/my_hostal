import database from '@react-native-firebase/database';
 
const firebase_login = async ({ email, password }) => {
    var response
    await database()
        .ref('/users')
        .orderByChild('email')
        .equalTo(email)
        .once('value')
        .then(snapshot => {
            if (snapshot.exists()) {
                snapshot.forEach(userSnapshot => {
                    const userData = userSnapshot.val();
                    if (userData.password === password) {
                        response = userData
                    } else {
                        response={
                            isError: true,
                            message:"Incorrect password"
                        }
                        console.log('Incorrect password');
                    }
                });
            } else {
                response = {
                    isError: true,
                    message: "User not found"
                }
                console.log('User not found');
            }
        })
        .catch(error => console.error('Error:', error));
    return response
}

const firebase_signup = async (data) => {
    var response
    await database()
        .ref('/users')
        .push(data)
        .then((res) => { 
            response = res
            console.log('Firebase Login Data pushed.', res)
         });
    return response
}


export {
    firebase_login,
    firebase_signup
}