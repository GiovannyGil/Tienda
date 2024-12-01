import { Permiso } from "src/permisos/entities/permiso.entity";
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
    permisos: Permiso[];
    setCreatedAt(): void;
    setUpdatedAt(): void;
}
