import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Ventas' })
export class Venta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: Date, nullable: false })
    fechaVenta: Date;

    @Column({ type: 'int', nullable: false })
    productoid: number;

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
