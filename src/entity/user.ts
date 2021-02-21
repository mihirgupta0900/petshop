import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import Pet from "./pet"

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => Pet, (pet) => pet.owner, { cascade: true })
  pets: Promise<Pet[]>
}
