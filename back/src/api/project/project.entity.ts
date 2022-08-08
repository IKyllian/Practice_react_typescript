import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinTable, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity'
import { Todo } from '../todo/todo.entity'
import { isUppercase } from 'class-validator';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  @PrimaryColumn({ unique: true })
  public id!: number;

  @Column({ type: 'varchar' })
  public name: string;

  @OneToMany(() => Todo, (todo) => todo.project, {onDelete: "CASCADE"})
  public todos: Todo[];

  @ManyToMany(() => User, (user) => user.projects, {onDelete: "CASCADE"})
    users: User[];

  @OneToMany(() => Invites, (invite) => invite.project, {onDelete: "CASCADE"})
    invites: Invites[];

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}

@Entity()
export class Invites {
  @PrimaryGeneratedColumn()
  @PrimaryColumn({ unique: true })
  public id!: number;

  @OneToMany(() => User, (user) => user.id)
  public sender: User;

  @OneToMany(() => User, (user) => user.id)
  public receiver: User;

  @ManyToOne(() => Project, (project) => project.invites, {onDelete: "CASCADE"})
    project: Project;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;
}