import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity'

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'boolean', default: false})
  public isActive: boolean;

  @Column({ type: 'boolean', default: false })
  public isComplete: boolean;

  @Column({ type: 'integer', default: 0})
  public pos: number;

  @ManyToOne(() => User, (user) => user.todos, {onDelete: "CASCADE"})
    user: User;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}