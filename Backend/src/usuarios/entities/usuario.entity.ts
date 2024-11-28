import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Usuarios' })
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 30, nullable: false })
    PrimerNombre: string 

    @Column({ type: "varchar", length: 30, nullable: true })
    SegundoNombre: string

    @Column({ type: "varchar", length: 30, nullable: false })
    PrimerApellido: string

    @Column({ type: "varchar", length: 30, nullable: true })
    SegundoApellido: string

    @Column({ type: "varchar", length: 100, nullable: false, unique: true })
    NombreUsuario: string

    @Column({ type: "int", nullable: false })
    rolId: number

    @Column({ type: "varchar", length: 20, nullable: false })
    clave: string

    @Column({ type: "date", nullable: false })
    añoNace: Date

    @Column({ type: "int", nullable: false })
    genero: number

    @Column({ type: "varchar", length: 11, nullable: false, unique: true })
    celular: string

    @Column({ type: "varchar", length: 30, nullable: false, unique: true })
    correo: string

    @Column({ type: "date", nullable: false })
    createdAt: Date

    @Column({ type: "date", nullable: true })
    updatedAt: Date

    @Column({ type: "date", nullable: true })
    deleteAt: Date
}
