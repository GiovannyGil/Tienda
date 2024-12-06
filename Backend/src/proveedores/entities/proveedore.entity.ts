import { Categoria } from "src/categorias/entities/categoria.entity";
import { Compra } from "src/compras/entities/compra.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Proveedores' })
export class Proveedore {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number

    @Column({ type: "varchar", length: 30, nullable: false, name: "nombreAsesor" })
    nombreAsesor: string

    @Column({ type: "varchar", length: 100, nullable: false, unique: true, name: "nombreEmpresa" })
    nombreEmpresa: string

    @Column({ type: "varchar", length: 30, nullable: false, name: "nombreContacto", unique: true })
    email: string

    @Column({ type: "varchar", length: 11, nullable: false, unique: true, name: "celular" })
    celular: string

    @Column({ type: "varchar", length: 11, nullable: false, unique: true, name: "telefono" })
    telefono: string

    @Column({ type: "varchar", length: 100, nullable: false, name: "direccion" })
    direccion: string

    /**
     * Relación N:M con Compras
     * Un proveedor puede estar asociado a varias compras.
     */
    @ManyToMany(() => Compra, (compra) => compra.proveedores)
    compras: Compra[];

    /**
     * Relación N:M con Categorías
     * Un proveedor puede estar asociado a varias categorías.
     */
    @ManyToMany(() => Categoria, (categoria) => categoria.proveedores)
    @JoinTable({ name: "categorias_proveedores" })
    categorias: Categoria[];

    @Column({ type: "date", nullable: false })
    createdAt: Date

    @Column({ type: "date", nullable: true })
    updatedAt: Date

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
