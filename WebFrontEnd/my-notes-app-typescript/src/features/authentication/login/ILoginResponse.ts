export interface ILoginResponse { 
    success: boolean;
    validationErrors: string[];
    loginResponseDto: ILoginResponseDto;
}

export interface ILoginResponseDto {
    userId: string;
    email: string;
    success: Boolean;
    token: string;
}