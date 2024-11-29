import { Compra } from "src/compras/entities/compra.entity";
import { Role } from "src/roles/entities/role.entity";
import { Venta } from "src/ventas/entities/venta.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Usuarios' })
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 30, nullable: false })
    PrimerNombre: string 

    @Column({ type: "varchar", length: 30, nullable: true })
    SegundoNombre: string

    @Column({ type: "varchar", length: 30, nullable: false })
    PrimerApellido: string

    @Column({ type: "varchar", length: 30, nullable: true })
    SegundoApellido: string

    @Column({ type: "varchar", length: 100, nullable: false, unique: true })
    NombreUsuario: string

    /**
     * Relacion N:1 con Role
     * Un usuario solo tiene un rol
     * Un rol se puede repetir en varios usuarios
    */
    @ManyToOne(() => Role, (role) => role.usuarios) // Relacion N:1 con Role
    @JoinColumn({ name: "rolId" }) // tabla intermedia (detalles) > se pone en la tabla que tiene la llave foranea
    rol: Role

    @Column({ type: "varchar", length: 100, nullable: false })
    clave: string

    @Column({ type: "date", nullable: false })
    añoNace: Date

    @Column({ type: "int", nullable: false })
    genero: number

    @Column({ type: "varchar", length: 11, nullable: false, unique: true })
    celular: string

    @Column({ type: "varchar", length: 30, nullable: false, unique: true })
    correo: string

    /**
     * relacion con ventas - un usuario puede tener varias ventas
     * una venta solo puede tener un usuario
    */

    @OneToMany(() => Venta, (venta) => venta.usuario)
    ventas: Venta[]

    /**
     * relacion con ventas - un usaario puede tener varias ventas
     * una venta solo puede tener un usuario
    */

    @OneToMany(() => Compra, (compra) => compra.usuario)
    compras: Compra[]

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
