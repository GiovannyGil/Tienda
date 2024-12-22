import { Usuario } from "src/usuarios/entities/usuario.entity";
export declare class Role {
    id: number;
    nombreRol: string;
    descripcion: string;
    estado: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    usuarios: Usuario[];
    setCreatedAt(): void;
    setUpdatedAt(): void;
}
