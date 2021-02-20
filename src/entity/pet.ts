import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import User from "./user"

@Entity()
export default class Pet {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  age: number

  @Column()
  breed?: string

  @ManyToOne(() => User, (user) => user.pets)
  @JoinColumn()
  owner?: Promise<User>
}
