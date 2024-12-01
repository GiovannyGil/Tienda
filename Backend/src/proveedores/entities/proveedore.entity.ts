import { Categoria } from "src/categorias/entities/categoria.entity";
import { Compra } from "src/compras/entities/compra.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
