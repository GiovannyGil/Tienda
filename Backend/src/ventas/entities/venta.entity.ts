import { Usuario } from "src/usuarios/entities/usuario.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Ventas' })
export class Venta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    descripcion: string;

    @Column({ type: 'int', nullable: false })
    productoid: number;

    @Column({ type: 'int', nullable: false })
    usuarioId: number;

    @Column({ type: 'int', nullable: false })
    montoTotal: number;

    @Column({ type: 'varchar', length: 20, nullable: false })
    metodoPago: string;

    /**
     * Relacion N:1 con Usuario
     * Una venta solo puede tener un usuario
     * Un usuario puede tener varias ventas
     */
    @OneToMany(() => Usuario, (usuario) => usuario.ventas)
    @JoinColumn({ name: "usuarioId" })
    usuario: Usuario[];

    @Column({ type: "date", nullable: false })
    createdAt: Date;

    @Column({ type: "date", nullable: true })
    updatedAt: Date;

    @Column({ type: "date", nullable: true })
    deletedAt: Date
}
