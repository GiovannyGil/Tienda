import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BadRequestException } from "@nestjs/common";
import { Role } from "src/roles/entities/role.entity";

@Entity({ name: "permisos" })
export class Permiso {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number

    @Column({ type: "varchar", length: 20, nullable: false, unique: true, name: "nombrePermiso" })
    nombrePermiso: string

    @Column({ type: "varchar", length: 100, nullable: false, name: "descripcion" })
    descripcion: string

    @Column({ type: "int", nullable: false, default: 1, name: "estado" })
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


    @BeforeInsert()
    setCreatedAt() {
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    setUpdatedAt() {
        this.updatedAt = new Date();
    }
}
