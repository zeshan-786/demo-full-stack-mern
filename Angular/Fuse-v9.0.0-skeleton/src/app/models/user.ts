export interface User {
    _id?: string,
    name: string,
    password?: string,
    age?: number,
    dob?: string,
	email: string,
    details? : string
    type?: string,
    __userType?: string,
    createdAt: string,
    updatedAt: string,

}

export interface Doctor extends User {
    // Doctor
    speciality?: string,
    clinic?: object,
} 

export interface Client extends User {
    // Client
    pets?: []

} 

export interface Clinic extends User {
    // Client
    doctors?: [],
    website?: string
}

export interface Auth {
    email: string,
    type: string,
    token: string,
    _id: string
}
