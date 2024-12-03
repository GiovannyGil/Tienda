import { Compra } from "src/compras/entities/compra.entity";
import { Role } from "src/roles/entities/role.entity";
import { Venta } from "src/ventas/entities/venta.entity";
export declare class Usuario {
    id: number;
    PrimerNombre: string;
    SegundoNombre: string;
    PrimerApellido: string;
    SegundoApellido: string;
    NombreUsuario: string;
    rol: Role;
    clave: string;
    añoNace: Date;
    genero: number;
    celular: string;
    correo: string;
    ventas: Venta[];
    compras: Compra[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    setCreatedAt(): void;
    setUpdatedAt(): void;
    hashPassword(): Promise<void>;
}
