import { Producto } from "src/productos/entities/producto.entity";
import { Proveedore } from "src/proveedores/entities/proveedore.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Categorias" })
export class Categoria {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number

    @Column({ type: "varchar", length: 50, nullable: false, unique: true, name: "nombre" })
    nombre: string

    @Column({ type: "varchar", length: 100, nullable: false, name: "descripcion" })
    descripcion: string

    @Column({ type: "int", nullable: false, name: "estado" })
    estado: number

    /**
     * Relación 1:N con Productos
     * Una categoría puede tener múltiples productos
     */
    @ManyToMany(() => Producto, (producto) => producto.categoria)
    productos: Producto[];

    /**
     * Relación N:M con Proveedores
     * Una categoría puede estar asociada a varios proveedores.
     */
    @ManyToMany(() => Proveedore, (proveedor) => proveedor.categorias)
    proveedores: Proveedore[];

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
