import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Compras' })
export class Compra {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    descripcion: string;

    @Column({ type: 'int', nullable: false })
    proveedorId: number;

    @Column({ type: 'int', nullable: false })
    productoId: number;

    @Column({ type: 'int', nullable: false })
    usuarioId: number;

    @Column({ type: 'int', nullable: false })
    montoTotal: number;

    @Column({ type: 'varchar', length: 20, nullable: false })
    metodoPago: string;

    @Column({ type: "date", nullable: false })
    createdAt: Date;

    @Column({ type: "date", nullable: true })
    updatedAt: Date;

    @Column({ type: "date", nullable: true })
    deletedAt: Date
}
