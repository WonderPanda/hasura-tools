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
