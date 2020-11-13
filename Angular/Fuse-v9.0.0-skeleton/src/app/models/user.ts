export interface User {
    _id?: string,
    name: string,
    password?: string,
    age?: number,
    dob?: string,
	email: string,
    details? : string
    type: string
}

export interface Auth {
    email: string,
    type: string,
    token: string,
    _id: string
}
