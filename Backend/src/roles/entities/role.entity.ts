import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BadRequestException } from "@nestjs/common";

export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 20, nullable: false })
    nombreRol: string

    @Column({ type: "varchar", length: 100, nullable: false })
    descripcion: string

    @Column({ type: "int", length: 1, nullable: false })
    estado: number

    @Column({ type: "date", nullable: false })
    createdAt: Date

    @Column({ type: "date", nullable: false })
    updatedAt: Date

    @Column({ type: "date", nullable: false })
    deleteAt: Date

    // relaciones aqui
}
