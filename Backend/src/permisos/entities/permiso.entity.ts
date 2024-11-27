import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BadRequestException } from "@nestjs/common";

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
}
