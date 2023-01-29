import { MembershipsBoolExp, MembershipsSelectColumn, OrganizationsBoolExp, OrganizationsSelectColumn, PostsBoolExp, PostsSelectColumn, UsersBoolExp, UsersSelectColumn } from "@pandaverse/graphql-types";

export type SessionVariables = 'now()' | 'X-Hasura-Org-Id' | 'X-Hasura-User-Id';
export interface InsertPermission<TBoolExp, TSelectColumn extends string> {
  check: TBoolExp;
  columns: TSelectColumn[] | '*';
  set?: Partial<Record<TSelectColumn, string>>;
  backend_only?: boolean;
}


export interface SelectPermission<TBoolExp, TSelectColumn extends string> {
  filter: TBoolExp;
  columns: TSelectColumn[] | '*';

  /**
   * Set limit on number of rows fetched per request
   */
  limit?: number;

  /**
   * Allow queries with aggregate functions like sum, count, avg, max, min, etc
   */
  allow_aggregations?: boolean;
}


export interface UpdatePermission<
  TBoolExp,
  TSelectColumn extends string,
  TSessionVariables extends string | number = string | number
> {
  /** Pre-update check */
  filter?: TBoolExp;
  /** Post-update check */
  check?: TBoolExp;
  columns: TSelectColumn[] | '*';
  backend_only?: boolean;
  set?: Partial<Record<TSelectColumn, TSessionVariables>>;
}


export interface DeletePermission<TBoolExp> {
  filter?: TBoolExp;
  backend_only?: boolean;
}


export interface InsertPermissionForRole<
  TRoles extends string,
  TBoolExp,
  TSelectColumn extends string
> {
  role: TRoles;
  permission: InsertPermission<TBoolExp, TSelectColumn>;
}


export interface SelectPermissionForRole<
  TRoles extends string,
  TBoolExp,
  TSelectColumn extends string
> {
  role: TRoles;
  permission: SelectPermission<TBoolExp, TSelectColumn>;
}


export interface UpdatePermissionForRole<
  TRoles extends string,
  TBoolExp,
  TSelectColumn extends string
> {
  role: TRoles;
  permission: UpdatePermission<TBoolExp, TSelectColumn>;
}


export interface DeletePermissionForRole<TRoles extends string, TBoolExp> {
  role: TRoles;
  permission: DeletePermission<TBoolExp>;
}


export interface EntityPermissions<
  TRoles extends string,
  TBoolExp,
  TSelectColumn extends string
> {
  insert_permissions?: InsertPermissionForRole<
    TRoles,
    TBoolExp,
    TSelectColumn
  >[];
  select_permissions?: SelectPermissionForRole<
    TRoles,
    TBoolExp,
    TSelectColumn
  >[];
  update_permissions?: UpdatePermissionForRole<
    TRoles,
    TBoolExp,
    TSelectColumn
  >[];
  delete_permissions?: DeletePermissionForRole<TRoles, TBoolExp>[];
}


export interface PermissionsExport<
  TFileName extends string,
  TPermissions extends Record<string, any>
> {
  fileName: TFileName;
  permissions: TPermissions;
}

export type ValidRoles = 'user' | 'org-admin';
/** Insert permissions that can be applied to the Memberships table */
export type MembershipsInsertPermission = InsertPermission<MembershipsBoolExp, MembershipsSelectColumn>;
export type MembershipsSelectPermission = SelectPermission<MembershipsBoolExp, MembershipsSelectColumn>;
export type MembershipsUpdatePermission = UpdatePermission<MembershipsBoolExp, MembershipsSelectColumn, SessionVariables>;
export type MembershipsDeletePermission = DeletePermission<MembershipsBoolExp>;
export type MembershipsPermissions = EntityPermissions<ValidRoles, MembershipsBoolExp, MembershipsSelectColumn>;
export type MembershipsExportablePermission = PermissionsExport<'public_memberships.yaml', MembershipsPermissions>;
/** Insert permissions that can be applied to the Organizations table */
export type OrganizationsInsertPermission = InsertPermission<OrganizationsBoolExp, OrganizationsSelectColumn>;
export type OrganizationsSelectPermission = SelectPermission<OrganizationsBoolExp, OrganizationsSelectColumn>;
export type OrganizationsUpdatePermission = UpdatePermission<OrganizationsBoolExp, OrganizationsSelectColumn, SessionVariables>;
export type OrganizationsDeletePermission = DeletePermission<OrganizationsBoolExp>;
export type OrganizationsPermissions = EntityPermissions<ValidRoles, OrganizationsBoolExp, OrganizationsSelectColumn>;
export type OrganizationsExportablePermission = PermissionsExport<'public_organizations.yaml', OrganizationsPermissions>;
/** Insert permissions that can be applied to the Posts table */
export type PostsInsertPermission = InsertPermission<PostsBoolExp, PostsSelectColumn>;
export type PostsSelectPermission = SelectPermission<PostsBoolExp, PostsSelectColumn>;
export type PostsUpdatePermission = UpdatePermission<PostsBoolExp, PostsSelectColumn, SessionVariables>;
export type PostsDeletePermission = DeletePermission<PostsBoolExp>;
export type PostsPermissions = EntityPermissions<ValidRoles, PostsBoolExp, PostsSelectColumn>;
export type PostsExportablePermission = PermissionsExport<'public_posts.yaml', PostsPermissions>;
/** Insert permissions that can be applied to the Users table */
export type UsersInsertPermission = InsertPermission<UsersBoolExp, UsersSelectColumn>;
export type UsersSelectPermission = SelectPermission<UsersBoolExp, UsersSelectColumn>;
export type UsersUpdatePermission = UpdatePermission<UsersBoolExp, UsersSelectColumn, SessionVariables>;
export type UsersDeletePermission = DeletePermission<UsersBoolExp>;
export type UsersPermissions = EntityPermissions<ValidRoles, UsersBoolExp, UsersSelectColumn>;
export type UsersExportablePermission = PermissionsExport<'public_users.yaml', UsersPermissions>;
