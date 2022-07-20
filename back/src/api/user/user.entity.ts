import { Entity, PrimaryColumn,  PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Project } from '../project/project.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @PrimaryColumn({ unique: true })
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public username: string;

  @Column({ type: 'varchar', length: 120 })
  public email: string;

  @Column({type: 'varchar'})
  public password: string;

  @ManyToMany(() => Project, (project) => project.users, {onDelete: "CASCADE"})
  @JoinTable({
    name: "user_projects",
    joinColumn: {
      name: "project",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "user",
      referencedColumnName: "id"
    }
  })
  public projects: Project[];

  @ManyToMany(() => Project, (project) => project.invites, {onDelete: "CASCADE"})
  @JoinTable({
    name: "user_invites",
    joinColumn: {
      name: "invite",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "user",
      referencedColumnName: "id"
    }
  })
  public invites: Project[];

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}