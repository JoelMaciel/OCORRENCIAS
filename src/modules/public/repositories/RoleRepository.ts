import { AppDataSource } from "../../../../ormconfig";
import { Role } from "../entities/Role";
import { RoleType } from "../enums/RoleType";
import { IRoleRepository } from "./interfaces/IRoleRepository";

export class RoleRepository implements IRoleRepository {
  constructor(private readonly roleRepository = AppDataSource.getRepository(Role)) {}

  public async findByRoleName(roleName: string): Promise<Role> {
    const roleTypeEnum = roleName as RoleType;
    return this.roleRepository.findOneOrFail({ where: { role: roleTypeEnum } });
  }
}
