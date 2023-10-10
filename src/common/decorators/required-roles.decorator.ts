import { SetMetadata } from "@nestjs/common";

import { ROLES_KEY } from "../constants";

export const RequiredRoles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);