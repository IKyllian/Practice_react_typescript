import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { Project } from '../project/project.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public username: string;

  @Column({ type: 'varchar', length: 120 })
  public email: string;

  @Column({type: 'varchar'})
  public password: string;

  @ManyToMany(() => Project, (project) => project.users, {onDelete: "CASCADE"})
  public projects: Project[];

  @ManyToMany(() => Project, (project) => project.invites, {onDelete: "CASCADE"})
  public invites: Project[];


  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}