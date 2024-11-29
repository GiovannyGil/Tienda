import { Categoria } from "src/categorias/entities/categoria.entity";
import { Compra } from "src/compras/entities/compra.entity";
import { Venta } from "src/ventas/entities/venta.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    /**
    * Relación N:1 con Categorías
    * Un producto pertenece a una categoría
    */
    @ManyToOne(() => Categoria, (categoria) => categoria.productos)
    categoria: Categoria;

    /**
     * Relación N:M con Ventas
     * Un producto puede estar en múltiples ventas
     */
    @ManyToMany(() => Venta, (venta) => venta.productos)
    ventas: Venta[];

    /**
     * Relación N:M con Compras
     * Un producto puede estar en múltiples compras.
     */
    @ManyToMany(() => Compra, (compra) => compra.productos)
    compras: Compra[];

    @Column({ type: "date", nullable: false })
    createdAt: Date;

    @Column({ type: "date", nullable: true })
    updatedAt: Date;

    @Column({ type: "date", nullable: true })
    deletedAt: Date
}
