import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Productos' })
export class Producto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 20, nullable: false })
    nombre: string;

    @Column({ type: "varchar", length: 100, nullable: false })
    descripcion: string;

    @Column({ type: "int", nullable: false })
    precio: number;

    @Column({ type: "varchar", length: 30, nullable: true })
    marca: string;

    @Column({ type: "int", nullable: false, default: 0 })
    stock: number;

    @Column({ type: "int", nullable: false, default: 1 })
    estado: number;

    @Column({ type: "date", nullable: true })
    fechaVencimiento: Date;

    @Column({ type: "date", nullable: false })
    createdAt: Date;

    @Column({ type: "date", nullable: true })
    updatedAt: Date;

    @Column({ type: "date", nullable: true })
    deletedAt: Date
}
