import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RolesEnum } from '../enum/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  role: number;

  @BeforeInsert() //permite que um método seja executado antes de salvar no banco
  async setPassword(password?: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }

  get isCustomer() {
    return this.role === RolesEnum.CUSTOMER;
  }

  async setUser(
    id: number,
    email: string,
    name: string,
    password: string,
    role: number,
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
    this.role = role;
  }
}
