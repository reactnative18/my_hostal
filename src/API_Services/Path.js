const Path = {
    login: 'api/admin/login',
    signup: 'api/admin/signup',
    getUser: 'api/admin/getProfile',
    addHostel: 'api/addHostel',
    getHostels: 'api/getHostels',
    deleteHostel: 'api/deleteHostel',
    addFloor: 'api/addFloor',
    getFloors: 'api/getFloors',
    deleteFloor: 'api/deleteFloor',
    getRooms: 'api/getRooms',
    addRoom: 'api/addRoom',
    deleteRoom: 'api/deleteRoom',
    getBeds: 'api/getBeds',
    addBed: 'api/addBed',
    deleteBed: 'api/deleteBed',
    getAvailableRoom: 'api/getAllRooms'

}

export default {
    ...Path,
}
