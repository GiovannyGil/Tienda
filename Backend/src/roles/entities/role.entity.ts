import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Roles' })
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 20, nullable: false })
    nombreRol: string

    @Column({ type: "varchar", length: 100, nullable: false })
    descripcion: string

    @Column({ type: "int", nullable: false })
    estado: number

    @Column({ type: "date", nullable: false })
    createdAt: Date

    @Column({ type: "date", nullable: true })
    updatedAt: Date

    @Column({ type: "date", nullable: true })
    deleteAt: Date

    // relaciones aqui
}
