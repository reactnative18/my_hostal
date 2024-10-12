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
const firebase_getTenantById = async (tenantId) => {
    try {
        const tenantSnapshot = await database().ref(`/${tableNames.tenant}/${tenantId}`).once('value')
        console.log("tenantSnapshot", tenantSnapshot)
        const tenant = tenantSnapshot.val();
        console.log("tenantSnapshot tenant", tenant)
        return tenant
    } catch (error) {
        
    }
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
            response = tenantId;
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
        rent: shiftData.dueRent,
    }
    await firebase_updateBedData(tableNames.tenant, tenantData.tenantId, updateTenant)
    let shiftBed = {
        "seatAvailable": false,
        tenantId: tenantData.tenantId
    }
    await firebase_updateBedData(tableNames.bed, shiftData.id, shiftBed)
    return true
}
const firebase_swipeBeds = async (tenantData1, tenantData2) => {
    let tenantBed1 = {
        tenantId: tenantData2.tenantId
    }
    let tenantBed2 = {
        tenantId: tenantData1.tenantId
    }
    let updateTenant1 = {
        monthlyRent: tenantData2.monthlyRent,
        bedId: tenantData2.bedId,
        roomId: tenantData2.roomId,
        floorId: tenantData2.floorId,
        hostelId: tenantData2.hostelId,
        rent: tenantData2.dueRent,
    }
    let updateTenant2 = {
        rent: tenantData1.dueRent,
        monthlyRent: tenantData1.monthlyRent,
        bedId: tenantData1.bedId,
        roomId: tenantData1.roomId,
        floorId: tenantData1.floorId,
        hostelId: tenantData1.hostelId,
    }
    await firebase_updateBedData(tableNames.bed, tenantData1.bedId, tenantBed1)
    await firebase_updateBedData(tableNames.bed, tenantData2.bedId, tenantBed2)
    await firebase_updateBedData(tableNames.tenant, tenantData1.tenantId, updateTenant1)
    await firebase_updateBedData(tableNames.tenant, tenantData2.tenantId, updateTenant2)

    return true
}
const firebase_getMasterHostel = async (hostelId) => {

    const allFloor = await database().ref(`/${tableNames.floor}`).once('value')
    const floorList = Object.values(allFloor.val()).filter(u => u.hostelId === hostelId);
    const allRoom = await database().ref(`/${tableNames.room}`).once('value')
    const roomList = Object.values(allRoom.val()).filter(u => u.hostelId === hostelId);
    const allBed = await database().ref(`/${tableNames.bed}`).once('value')
    const bedList = Object.values(allBed.val()).filter(u => u.hostelId === hostelId);

    const MasterData = [];
    const promises = [];
    floorList.map(floorInfo => {
        if (floorInfo.hostelId == hostelId) {
            promises.push(
                (async () => {
                    // room start
                    const RoomData = []
                    const promisesroom = [];
                    roomList.map(roomInfo => {
                        if (floorInfo.id == roomInfo.floorId) {
                            promisesroom.push(
                                (async () => {
                                    // bed start
                                    const BedData = []
                                    let availableBed = 0, filledBed = 0

                                    const promisesbed = [];
                                    bedList.map(bedInfo => {
                                        promisesbed.push(
                                            (async () => {
                                                if (roomInfo.id == bedInfo.roomId) {
                                                    BedData.push(bedInfo)
                                                    if (bedInfo.seatAvailable) {
                                                        availableBed++
                                                    } else {
                                                        filledBed++
                                                    }
                                                }
                                            })()
                                        );
                                    });
                                    await Promise.all(promisesbed)
                                    // bed end
                                    let roomData = { ...roomInfo, 'beds': BedData, availableBed: availableBed, filledBed: filledBed }
                                    RoomData.push(roomData)
                                })()
                            );
                        }
                    });
                    await Promise.all(promisesroom)
                    // room end

                    let availableBed = 0, filledBed = 0
                    const promisescount = [];
                    RoomData.map(roomInfo => {
                        promisescount.push(
                            (async () => {
                                availableBed = availableBed + roomInfo.availableBed
                                filledBed = filledBed + roomInfo.filledBed
                            })()
                        );
                    });
                    await Promise.all(promisescount)
                    let floorData = { ...floorInfo, 'rooms': RoomData, availableBed: availableBed, filledBed: filledBed }
                    MasterData.push(floorData)
                })()
            );
        }
    });
    await Promise.all(promises)

    return MasterData
}
const GetLastTransection = async (tableName, adminId) => {
    const allData = await database().ref(`/${tableName}`).once('value')
    const lastTransectionList1 = Object.values(allData.val()).filter(u => u.userId == adminId);
    const lastTransectionList = lastTransectionList1.filter(u => u.isCurrentMonth == true);
    return lastTransectionList;
}

const getAllHostelData = async (adminId) => {
    try {
        const HostelData = [];
        let transectionList = []
        const allHostel = await database().ref(`/${tableNames.hostel}`).once('value')
        const hostelList = Object.values(allHostel.val()).filter(u => u.userId === adminId);
        const allTransection = await database().ref(`/${tableNames.transectionTenant}`).once('value')
        if (allTransection!=null&& allTransection?.val() !== null && allTransection?.val() !== undefined) {
            transectionList = Object.values(allTransection?.val())?.filter(u => u.userId === adminId);
            transectionList = transectionList?.filter(u => (u.isCurrentMonth == true))
        }
        let allTenant = await database().ref(`/${tableNames.tenant}`).once('value')
      
        if (allTenant && allTenant != null && allTenant?.val() !== null && allTenant?.val() !== undefined){
            allTenant = Object.values(allTenant?.val())
        }
        await Promise.all(hostelList?.map(async (hostelInfo, index) => {
            let totalPaidRent = 0;
            let totalDueRent = 0;
            let tenantList = []
            if (allTenant!=null&&allTenant.length > 0) {
                tenantList = allTenant.filter(u => u.hostelId == hostelInfo.id);
            }
            if (tenantList.length == 0) {
                let hostelObj = {
                    totalPaidRent: totalPaidRent,
                    totalDueRent: totalDueRent,
                    ...hostelInfo
                }
                HostelData.push(hostelObj)
            } else {
                let currentMonthData = transectionList?.filter(item => tenantList?.some(item2 => item2.id == item.tenantId))
                currentMonthData?.forEach((rent) => {
                    totalPaidRent += rent.paidRent;
                    totalDueRent += rent.dueRent;
                });
                let hostelObj = {
                    totalPaidRent: totalPaidRent,
                    totalDueRent: totalDueRent,
                    ...hostelInfo
                }
                HostelData.push(hostelObj)
            }
        }));
        return HostelData
    } catch (error) {
        console.log("getAllHostelData error=>",error)
    }
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
    firebase_shiftBeds,
    firebase_swipeBeds,
    firebase_getMasterHostel,
    GetLastTransection,
    getAllHostelData,
    firebase_getTenantById
}