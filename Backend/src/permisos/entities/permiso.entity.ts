import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BadRequestException } from "@nestjs/common";
import { Role } from "src/roles/entities/role.entity";

@Entity({ name: "permisos" })
export class Permiso {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 20, nullable: false })
    nombrePermiso: string

    @Column({ type: "varchar", length: 100, nullable: false })
    descripcion: string

    @Column({ type: "int", nullable: false })
    estado: number

    @Column({ type: "date", nullable: false })
    createdAt: Date

    @Column({ type: "date", nullable: true })
    updatedAt: Date

    @Column({ type: "date", nullable: true })
    deletedAt: Date

    // relaciones aqui
    /**
     * Relacion N:M con Role
     * Un permiso puede estar asociado a varios roles
     * Un rol puede tener varios permisos
     */
    @ManyToMany(() => Role, (role) => role.permisos)
    roles: Role[]
}
