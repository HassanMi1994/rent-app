export class Login {
    email: string;
    password: string;
}

export class UserInfo {
    isLoggedIn: boolean = false;
    fullName: string;
    jwtKey: string;
    storeName: string;
    userID: number;
    storeID: number;
    email: string;
    isAdmin: boolean;
}