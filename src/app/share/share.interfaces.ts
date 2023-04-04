export interface AuthResponseData {
  id: string,
  name: string,
  email: string,
  authToken:string,
  refreshToken: string,
  expiresIn: string,
  registered?: boolean
}
