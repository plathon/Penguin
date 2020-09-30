export interface AuthUserLocalRequestDTO {
  email: string,
  password: string
}

export interface AuthUserLocalResponseDTO {
  id: number,
  name: string,
  email: string
}
