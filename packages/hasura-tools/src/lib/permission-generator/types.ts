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
}

export interface PermissionsExport<
  TFileName extends string,
  TPermissions extends Record<string, any>
> {
  fileName: TFileName;
  permissions: TPermissions;
}
