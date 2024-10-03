import database from '@react-native-firebase/database';

const firebase_login = async ({ email, password }) => {
    var response
    await database()
        .ref('/users')
        .once('value')
        .then(snapshot => {
            const users = snapshot.val();
            const user = Object.values(users).find(u => u.email === email);
            if (user) { 
                if (user.password === password) {
                    response = user
                } else {
                    response = {
                        isError: true,
                        message: "Incorrect password"
                    } 
                }
            } else {
                response = {
                    isError: true,
                    message: "User not found."
                } 
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

const firebase_getAllDataFromTable = async (table) => {
    var response
    await database()
        .ref(`/${table}`)
        .once('value')
        .then(snapshot => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                response = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key],
                }));

            } else {
                response = []
                console.log('Hostel not found');
            }
        })
        .catch(error => console.error('Error:', error));
    return response
}
const firebase_addDataToTable = async (table, data) => {
    var response
    const newRowRef = await database().ref(`/${table}`).push();
    const uniqueId = newRowRef.key;
    let param = {
        id: uniqueId,
        ...data
    }
    await newRowRef
        .set(param)
        .then(() => {
            response = true
        })
        .catch(error => {
            response = false
        });
    return response
}
const firebase_removeDataToTable = async (table, key) => {
    var response
    const newRowRef = await database().ref(`/${table}/${key}`)
        .remove()
        .then(() => {
            response=true;
        })
        .catch(error => {
            response = false;
        });
    return response
}



export {
    firebase_login,
    firebase_signup,
    firebase_getAllDataFromTable,
    firebase_addDataToTable,
    firebase_removeDataToTable
}