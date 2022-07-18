import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinTable, OneToMany, ManyToMany } from 'typeorm';
import { User } from '../user/user.entity'
import { Todo } from '../todo/todo.entity'

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public name: string;

  @OneToMany(() => Todo, (todo) => todo.project, {onDelete: "CASCADE"})
  public todos: Todo[];

  @ManyToMany(() => User, (user) => user.projects, {onDelete: "CASCADE"})
    users: User[];

  @ManyToMany(() => User, (user) => user.invites, {onDelete: "CASCADE"})
    invites: User[];

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}