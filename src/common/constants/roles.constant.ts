import { RolesEnum } from "../enums";

export const RolesConstant = [
  { name: RolesEnum.SUPERADMIN, description: 'Can do anything' },
  { name: RolesEnum.ADMIN, description: 'Can control branch' },
  { name: RolesEnum.CASHIER, description: 'Can use poss terminal' },
  { name: RolesEnum.CUSTOMER },
  { name: RolesEnum.DEALER },
];