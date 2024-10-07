import database from '@react-native-firebase/database';
import ToastMessage from '../Components/ToastMessage';
import tableNames from './constrains';
import { Alert } from 'react-native';

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
                    ToastMessage.FailureShowToast("Incorrect password")
                    response = {
                        isError: true,
                        message: "Incorrect password"
                    }
                }
            } else {
                ToastMessage.FailureShowToast("User not found..")
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
            }
        })
        .catch(error => console.error('Error:', error));
    return response
}
const firebase_getAllDataFromTableById = async (table, key, id) => {
    var response
    await database()
        .ref(`/${table}`)
        .once('value')
        .then(snapshot => {
            const users = snapshot.val();
            console.log("Condition=>", table, key, id)
            console.log("all data=>", users)
            const userList = Object.values(users).filter(u => u[key] === id);
            if (userList) {
                response = userList
            } else {
                ToastMessage.WarningShowToast("No record found...")
                response = []

            }
        })
        .catch(error => { });
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
    await database().ref(`/${table}/${key}`)
        .remove()
        .then(() => {
            response = true;
        })
        .catch(error => {
            response = false;
        });
    return response
}

const firebase_createTenantProfile = async (table, data, isStaff = false) => {
    var response
    try {
        // Reference to the new user profile in the database
        const newUserProfileRef = database().ref(`/${table}`).push();
        const tenantId = newUserProfileRef.key;
        let param = {
            id: tenantId,
            ...data
        }
        let bedDataUpdate = {
            seatAvailable: false,
            tenantId: tenantId
        }
        if (!isStaff) {
            firebase_updateBedData(tableNames.bed, data.bedId, bedDataUpdate)
        }
        // Store the profile data in Firebase Realtime Database
        await newUserProfileRef.set(param).then(() => {
            response = true;
        }).catch(e => {
            response = false;
        });

        return response
    } catch (error) {
        console.error('Error creating profile:', error);
    }
}

const fetchAllAvailableBeds = async (isAvalable) => {
    try {
        var availableBedsList = [];
        const response = await database().ref(`/${tableNames.bed}`)
            .orderByChild('seatAvailable')
            .equalTo(isAvalable)
            .once('value');

        if (response.exists()) {
            const data = Object.values(response.val());
            const promises = [];
            data.map(bedInfo => {
                promises.push(
                    (async () => {
                        const hostelSnapshot = await database().ref(`/${tableNames.hostel}/${bedInfo.hostelId}`).once('value')
                        const hostel = hostelSnapshot.val();
                        const floorSnapshot = await database().ref(`/${tableNames.floor}/${bedInfo.floorId}`).once('value')
                        const floor = floorSnapshot.val();
                        const roomSnapshot = await database().ref(`/${tableNames.room}/${bedInfo.roomId}`).once('value')
                        const room = roomSnapshot.val();
                        if (isAvalable) {
                            let beddata = { ...hostel, ...floor, ...room, ...bedInfo }
                            availableBedsList.push(beddata)
                        } else {
                            const tenantSnapshot = await database().ref(`/${tableNames.tenant}/${bedInfo.tenantId}`).once('value')
                            const tenant = tenantSnapshot.val();
                            let beddata = { ...hostel, ...floor, ...room, ...tenant, ...bedInfo }
                            availableBedsList.push(beddata)
                        }
                    })()
                );
            });
            await Promise.all(promises)
            return availableBedsList
        } else {
            ToastMessage.FailureShowToast("No available bed found...")
        }
        return availableBedsList

    } catch (error) {
        console.error('Error creating profile:', error);
    }
    finally {

    }
};
const firebase_updateBedData = async (table, bedId, updatedData) => {
    try {
        // Reference to the specific bed node in the database using bedId
        const bedRef = database().ref(`/${table}/${bedId}`);

        // Update the bed data with the provided updatedData object
        await bedRef.update(updatedData);

        console.log('Bed data updated successfully.');
    } catch (error) {
        console.error('Error updating bed data:', error);
        throw error;
    }
};
const firebase_shiftBeds = async (tenantData, shiftData) => {
    let releaseCurrentBed = {
        "seatAvailable": true,
        tenantId: null
    }
    await firebase_updateBedData(tableNames.bed, tenantData.bedId, releaseCurrentBed)
    let updateTenant = {
        monthlyRent: shiftData.amont,
        bedId: shiftData.id,
        roomId: shiftData.roomId,
        floorId: shiftData.floorId,
        hostelId: shiftData.hostelId,
    }
    await firebase_updateBedData(tableNames.tenant, tenantData.tenantId, updateTenant)
    let shiftBed = {
        "seatAvailable": false,
        tenantId: tenantData.tenantId
    }
    await firebase_updateBedData(tableNames.bed, shiftData.id, shiftBed)
    return true
}

export {
    firebase_login,
    firebase_signup,
    firebase_getAllDataFromTable,
    firebase_addDataToTable,
    firebase_removeDataToTable,
    firebase_createTenantProfile,
    firebase_getAllDataFromTableById,
    fetchAllAvailableBeds,
    firebase_updateBedData,
    firebase_shiftBeds
}