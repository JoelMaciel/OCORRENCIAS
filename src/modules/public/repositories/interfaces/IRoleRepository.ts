import { Role } from "../../entities/Role";

export interface IRoleRepository {
  findByRoleName(roleName: string): Promise<Role>;
}
