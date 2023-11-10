import { SnakeCase, SnakeCasedPropertiesDeep } from "type-fest";
import { MembershipsBoolExp, MembershipsSelectColumn, OrganizationsBoolExp, OrganizationsSelectColumn, PostsBoolExp, PostsSelectColumn, UsersBoolExp, UsersSelectColumn } from "@pandaverse/graphql-types";

export type SessionVariables = 'now()' | 'X-Hasura-Org-Id' | 'X-Hasura-User-Id';
export interface InsertPermission<TBoolExp, TSelectColumn extends string> {
  check: TBoolExp;
  columns: TSelectColumn[] | '*';
  set?: Partial<Record<TSelectColumn, string>>;
  backend_only?: boolean;
}


export interface SelectPermission<
  TBoolExp,
  TSelectColumn extends string,
  TComputedFields extends string = never
> {
  filter: TBoolExp;

  /**
   * The columns that should be selectable. If '*' is provided, all columns will be selectable.
   * If an array of columns is provided, only those columns will be selectable.
   * If an object with an 'exclude' property is provided, all columns except those listed will be selectable.
   */
  columns: TSelectColumn[] | '*' | { exclude: TSelectColumn[] };

  /**
   * The computed fields that this role should be allowed to select
   */
  computed_fields?: TComputedFields[];
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
  TSelectColumn extends string,
  TComputedFields extends string = never
> {
  role: TRoles;
  permission: SelectPermission<TBoolExp, TSelectColumn, TComputedFields>;
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
  TSelectColumn extends string,
  TComputedFields extends string = never
> {
  insert_permissions?: InsertPermissionForRole<
    TRoles,
    TBoolExp,
    TSelectColumn
  >[];
  select_permissions?: SelectPermissionForRole<
    TRoles,
    TBoolExp,
    TSelectColumn,
    TComputedFields
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
export type MembershipsInsertPermission = InsertPermission<SnakeCasedPropertiesDeep<MembershipsBoolExp>, SnakeCase<MembershipsSelectColumn>>;
export type MembershipsSelectPermission = SelectPermission<SnakeCasedPropertiesDeep<MembershipsBoolExp>, SnakeCase<MembershipsSelectColumn>, never>;
export type MembershipsUpdatePermission = UpdatePermission<SnakeCasedPropertiesDeep<MembershipsBoolExp>, SnakeCase<MembershipsSelectColumn>, SessionVariables>;
export type MembershipsDeletePermission = DeletePermission<SnakeCasedPropertiesDeep<MembershipsBoolExp>>;
export type MembershipsPermissions = EntityPermissions<ValidRoles, SnakeCasedPropertiesDeep<MembershipsBoolExp>, SnakeCase<MembershipsSelectColumn>, never>;
export type MembershipsExportablePermission = PermissionsExport<'public_memberships.yaml', MembershipsPermissions>;
/** Insert permissions that can be applied to the Organizations table */
export type OrganizationsInsertPermission = InsertPermission<SnakeCasedPropertiesDeep<OrganizationsBoolExp>, SnakeCase<OrganizationsSelectColumn>>;
export type OrganizationsSelectPermission = SelectPermission<SnakeCasedPropertiesDeep<OrganizationsBoolExp>, SnakeCase<OrganizationsSelectColumn>, never>;
export type OrganizationsUpdatePermission = UpdatePermission<SnakeCasedPropertiesDeep<OrganizationsBoolExp>, SnakeCase<OrganizationsSelectColumn>, SessionVariables>;
export type OrganizationsDeletePermission = DeletePermission<SnakeCasedPropertiesDeep<OrganizationsBoolExp>>;
export type OrganizationsPermissions = EntityPermissions<ValidRoles, SnakeCasedPropertiesDeep<OrganizationsBoolExp>, SnakeCase<OrganizationsSelectColumn>, never>;
export type OrganizationsExportablePermission = PermissionsExport<'public_organizations.yaml', OrganizationsPermissions>;
/** Insert permissions that can be applied to the Posts table */
export type PostsInsertPermission = InsertPermission<SnakeCasedPropertiesDeep<PostsBoolExp>, SnakeCase<PostsSelectColumn>>;
export type PostsSelectPermission = SelectPermission<SnakeCasedPropertiesDeep<PostsBoolExp>, SnakeCase<PostsSelectColumn>, never>;
export type PostsUpdatePermission = UpdatePermission<SnakeCasedPropertiesDeep<PostsBoolExp>, SnakeCase<PostsSelectColumn>, SessionVariables>;
export type PostsDeletePermission = DeletePermission<SnakeCasedPropertiesDeep<PostsBoolExp>>;
export type PostsPermissions = EntityPermissions<ValidRoles, SnakeCasedPropertiesDeep<PostsBoolExp>, SnakeCase<PostsSelectColumn>, never>;
export type PostsExportablePermission = PermissionsExport<'public_posts.yaml', PostsPermissions>;
/** Insert permissions that can be applied to the Users table */
export type UsersInsertPermission = InsertPermission<SnakeCasedPropertiesDeep<UsersBoolExp>, SnakeCase<UsersSelectColumn>>;
export type UsersSelectPermission = SelectPermission<SnakeCasedPropertiesDeep<UsersBoolExp>, SnakeCase<UsersSelectColumn>, never>;
export type UsersUpdatePermission = UpdatePermission<SnakeCasedPropertiesDeep<UsersBoolExp>, SnakeCase<UsersSelectColumn>, SessionVariables>;
export type UsersDeletePermission = DeletePermission<SnakeCasedPropertiesDeep<UsersBoolExp>>;
export type UsersPermissions = EntityPermissions<ValidRoles, SnakeCasedPropertiesDeep<UsersBoolExp>, SnakeCase<UsersSelectColumn>, never>;
export type UsersExportablePermission = PermissionsExport<'public_users.yaml', UsersPermissions>;
