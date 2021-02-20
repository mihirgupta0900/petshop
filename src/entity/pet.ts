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

  @ManyToOne(() => User, (user) => user.pet)
  @JoinColumn()
  owner?: Promise<User>
}
