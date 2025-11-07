export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  SHOP_OWNER = 'shop_owner',
  MANAGER = 'manager',
  STAFF = 'staff',
  ACCOUNTANT = 'accountant',
  SALES_PERSON = 'sales_person',
}

export const ROLES = Object.values(UserRole);

