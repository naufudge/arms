export type UserPublic = {
    username: string;
    email: string;
    userRole: string;
    avatar: string;
}

export type UserRole = {
    id: number
    name: string
}

export type UserTokenType = {
    id: string,
    username: string,
    email: string,
    userRoleId: number
}