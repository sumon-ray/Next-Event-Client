
export type TTokenUser = {
    email: string,
    role: 'USER' | 'ADMIN',
    id: string,
    iat: number,
    exp: number
}