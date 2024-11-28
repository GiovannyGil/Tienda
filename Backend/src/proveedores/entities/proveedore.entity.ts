import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Proveedores' })
export class Proveedore {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 30, nullable: false })
    nombreAccesor: string

    @Column({ type: "varchar", length: 100, nullable: false, unique: true })
    nombreEmpresa: string

    @Column({ type: "varchar", length: 30, nullable: false })
    email: string

    @Column({ type: "varchar", length: 11, nullable: false })
    celular: string

    @Column({ type: "varchar", length: 11, nullable: false })
    telefono: string

    @Column({ type: "varchar", length: 100, nullable: false })
    direccion: string

    @Column({ type: "date", nullable: false })
    createdAt: Date

    @Column({ type: "date", nullable: true })
    updatedAt: Date

    @Column({ type: "date", nullable: true })
    deleteAt: Date

    // relaciones aqui
}
