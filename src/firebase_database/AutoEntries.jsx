import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns'; // Optional for date formatting
import { firebase_addDataToTable, firebase_updateBedData, GetLastTransection } from '.';
import tableNames from './constrains';

// Utility to get next month date in DD-MM-YYYY format
function getNextMonthDate(dateString) {
    let [day, month, year] = dateString.split('-').map(Number);
    let date = new Date(year, month - 1, day);
    date.setMonth(date.getMonth() + 1);
    let newDay = String(date.getDate()).padStart(2, '0');
    let newMonth = String(date.getMonth() + 1).padStart(2, '0');
    let newYear = date.getFullYear();
    return `${newDay}-${newMonth}-${newYear}`;
}
 
// Function to check if a month has passed and trigger new entry
async function checkAndTriggerNewEntry(data,isStaff) {
    const today = new Date();
    data.forEach(record => {

        const recordMonthDate = new Date(getNextMonthDate(record.month).split('-').reverse().join('-'));

        // If today's date is after the record's month
        console.log(`A month has completed for record ${today , recordMonthDate}`);
        if (today > recordMonthDate) {
            console.log(`A month has completed for record ${record.id}. Triggering new entry...`);
            triggerNewEntry(record, isStaff);
        }
    });
}

// Function to create a new entry
async function triggerNewEntry(record, isStaff) {
    const updateLastTransection = {
        isCurrentMonth: false
    }
    firebase_updateBedData(tableNames.transectionTenant, record.id, updateLastTransection)
    const nextMonthDate = getNextMonthDate(record.month);

    const newEntry = {
        dueRent: record.monthlyRent,
        month: nextMonthDate,
        paidRent: 0, 
        tenantId: record.tenantId,
        userId: record.userId,
        monthlyRent: record.monthlyRent,
        isCurrentMonth:true
    };
    await firebase_addDataToTable(isStaff?tableNames.transectionStaff:tableNames.transectionTenant, newEntry)
    // Here you would save the newEntry in your state or backend
    console.log("New entry created:", newEntry);
}

const getTenantData = async (adminId)=>{
    let data = await GetLastTransection(tableNames.transectionTenant,adminId)
    await checkAndTriggerNewEntry(data,false);
}
const getStaffData = async (adminId) => {
    let data = await GetLastTransection(tableNames.transectionStaff, adminId)
    await checkAndTriggerNewEntry(data,true);
}

// Custom hook to check last date in AsyncStorage and trigger rent check if needed
function useCheckRentOncePerDay(adminId) {
    useEffect(() => {
        const checkLastRun = async () => {
            const today = new Date();
            const todayFormatted = format(today, 'dd-MM-yyyy'); // Optional date formatting

            // Get the last checked date from AsyncStorage
            const lastCheckDate = await AsyncStorage.getItem('lastCheckDate');

            // If no last date found or it's a new day, run the check and update the date
            if (!lastCheckDate || lastCheckDate !== todayFormatted) {
                console.log("Performing daily rent check...");
                getTenantData(adminId)
                getStaffData(adminId)
                await AsyncStorage.setItem('lastCheckDate', todayFormatted);
            } else {
                console.log("Rent check already performed today.");
            }
        };

        checkLastRun();
    }, []);
}

export default useCheckRentOncePerDay