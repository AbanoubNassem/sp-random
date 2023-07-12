import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Like, Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOrCreateOne(name: string): Promise<User> {
    let user = await this.usersRepository.findOneBy({ name });

    if (user === null) {
      user = this.usersRepository.create({ name, points: 1000 });
      user = await this.usersRepository.save(user);
    }
    return user;
  }

  async update(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async cpusSeed() {
    for (let i = 0; i < 4; i++) {
      const cpu = await this.findOrCreateOne(`CPU${i + 1}`);
      cpu.points = 1000;
      await this.usersRepository.save(cpu);
    }
  }

  getCPUs() {
    return this.usersRepository.find({
      where: {
        name: Like("CPU%"),
      },
    });
  }

  async getTopUsers() {
    return await this.usersRepository.find({
      order: {
        points: "DESC",
      },
      take: 5,
    });
  }
}
