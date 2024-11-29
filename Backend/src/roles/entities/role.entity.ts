import { Permiso } from "src/permisos/entities/permiso.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Roles' })
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 20, nullable: false })
    nombreRol: string

    @Column({ type: "varchar", length: 100, nullable: false })
    descripcion: string

    @Column({ type: "int", nullable: false })
    estado: number

    @Column({ type: "date", nullable: false })
    createdAt: Date

    @Column({ type: "date", nullable: true })
    updatedAt: Date

    @Column({ type: "date", nullable: true })
    deleteAt: Date

    // relaciones aqui
    /* relación con usuario (un rol por usuario) 
    - un usuario solo tiene un rol
    - un rol se puede repetir en varios usuarios
    */
    @OneToMany(() => Usuario, (usuario) => usuario.rol)
    usuarios: Usuario[]

    /*
    Relacion N:M con Permiso
    - Un rol puede tener varios permisos
    - Un permiso puede estar asociado a varios roles
    */
    @ManyToMany(() => Permiso, (permiso) => permiso.roles)
    @JoinTable({ name: 'roles_permisos' }) // tabla intermedia (detalles) > se pone en la tabla que tiene la llave foranea
    permisos: Permiso[]

}
