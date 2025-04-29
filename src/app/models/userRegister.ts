import { UserRole } from "./UserEnum";

export interface UserRegister {
    id: number;
    nom: string;
    email: string;
    motDePasse: string; 
    role: UserRole
}