import { Compra } from "src/compras/entities/compra.entity";
import { Role } from "src/roles/entities/role.entity";
import { Venta } from "src/ventas/entities/venta.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity({ name: 'Usuarios' })
export class Usuario {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number

    @Column({ type: "varchar", length: 30, nullable: false, name: 'primerNombre' })
    PrimerNombre: string 

    @Column({ type: "varchar", length: 30, nullable: true, name: 'segundoNombre'})
    SegundoNombre: string

    @Column({ type: "varchar", length: 30, nullable: false, name: 'primerApellido'})
    PrimerApellido: string

    @Column({ type: "varchar", length: 30, nullable: true, name: 'segundoApellido'})
    SegundoApellido: string

    @Column({ type: "varchar", length: 100, nullable: false, unique: true, name: 'nombreUsuario' })
    NombreUsuario: string

    /**
     * Relacion N:1 con Role
     * Un usuario solo tiene un rol
     * Un rol se puede repetir en varios usuarios
    */
    @ManyToOne(() => Role, (role) => role.usuarios) // Relacion N:1 con Role
    @JoinColumn({ name: "rolId" }) // tabla intermedia (detalles) > se pone en la tabla que tiene la llave foranea
    rol: Role

    @Column({ type: "varchar", length: 100, nullable: false, name: 'clave' })
    clave: string

    @Column({ type: "date", nullable: false, name: 'añoNace' })
    añoNace: Date

    @Column({ type: "int", nullable: false, name: 'genero' })
    genero: number

    @Column({ type: "varchar", length: 11, nullable: false, unique: true, name: 'celular'})
    celular: string

    @Column({ type: "varchar", length: 30, nullable: false, unique: true, name: 'correo'})
    correo: string

    /**
     * relacion con ventas - un usuario puede tener varias ventas
     * una venta solo puede tener un usuario
    */

    // @OneToMany(() => Venta, (venta) => venta.usuario, { onDelete: 'CASCADE' }) -> si se elimina un usuario se eliminan todas sus ventas
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

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.clave && !this.clave.startsWith('$2b$')) { // Verifica si no está ya encriptada
            const salt = await bcrypt.genSalt(10);
            this.clave = await bcrypt.hash(this.clave, salt);
        }
    }
}
