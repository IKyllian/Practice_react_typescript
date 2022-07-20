import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

const saltRounds = 15;

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async getUser(id: number): Promise<User> {
    return await this.repository.findOne({where: {id: id}, relations: ["projects", "projects.todos"] });
  }

  public async signin(email: string, password: string): Promise<User> {
    return await this.repository.findOneBy({email: email}).then(async (user: User) => {
      const match = await bcrypt.compare(password, user.password);
      if (match)
        return user;
      else
        return Promise.reject("Password is not correct");
    }).catch((err: any) => { return Promise.reject("Email not correct") });
  } 

  public async getUserProjects(id: number): Promise<User> {
	  return await this.repository.findOne({where: {id: id}, relations: ["projects"] });
  }

  public async createUser(body: CreateUserDto): Promise<User> {
    const password = body.password;
    const user: User = new User();

    user.username = body.username;
    user.email = body.email;
    const hash = await bcrypt.hash(password, saltRounds);
    if (hash)
      user.password = hash;
    else
      return Promise.reject("Error occured with password hash");
    user.projects = [];
    user.invites = [];
    return await this.repository.save(user);
  }
}