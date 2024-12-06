import { Producto } from "src/productos/entities/producto.entity";
import { Proveedore } from "src/proveedores/entities/proveedore.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Compras' })
export class Compra {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column({ type: "varchar", length: 100, nullable: false, name: 'descripcion' })
    descripcion: string;

    /**
     * Relación N:M con Proveedores
     * Una compra puede estar asociada a varios proveedores.
     */
    @ManyToMany(() => Proveedore, (proveedor) => proveedor.compras)
    @JoinTable({ name: "proveedores_compras" })
    proveedores: Proveedore[];;

    /**
     * Relación N:M con Productos
     * Una compra puede contener varios productos.
     */
    @ManyToMany(() => Producto, (producto) => producto.compras)
    @JoinTable({ name: "productos_compras" })
    productos: Producto[];

    @Column({ type: 'int', nullable: false, name: 'montoTotal' })
    montoTotal: number;

    @Column({ type: 'varchar', length: 20, nullable: false, name: 'metodoPago' })
    metodoPago: string;

    /**
     * Relacion N:1 con Usuario
     */
    @ManyToOne(() => Usuario, (usuario) => usuario.compras)
    @JoinColumn({ name: "usuarioId" })
    usuario: Usuario;

    @Column({ type: "date", nullable: false })
    createdAt: Date;

    @Column({ type: "date", nullable: true })
    updatedAt: Date;

    @Column({ type: "date", nullable: true })
    deletedAt: Date

    @BeforeInsert()
    setCreatedAt() {
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    setUpdatedAt() {
        this.updatedAt = new Date();
    }
}
