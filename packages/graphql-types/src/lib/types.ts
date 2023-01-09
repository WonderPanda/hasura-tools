export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bigint: string;
  citext: string;
  timestamptz: string;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type BigintComparisonExp = {
  _eq?: InputMaybe<Scalars['bigint']>;
  _gt?: InputMaybe<Scalars['bigint']>;
  _gte?: InputMaybe<Scalars['bigint']>;
  _in?: InputMaybe<Array<Scalars['bigint']>>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['bigint']>;
  _lte?: InputMaybe<Scalars['bigint']>;
  _neq?: InputMaybe<Scalars['bigint']>;
  _nin?: InputMaybe<Array<Scalars['bigint']>>;
};

/** Boolean expression to compare columns of type "citext". All fields are combined with logical 'AND'. */
export type CitextComparisonExp = {
  _eq?: InputMaybe<Scalars['citext']>;
  _gt?: InputMaybe<Scalars['citext']>;
  _gte?: InputMaybe<Scalars['citext']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['citext']>;
  _in?: InputMaybe<Array<Scalars['citext']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['citext']>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['citext']>;
  _lt?: InputMaybe<Scalars['citext']>;
  _lte?: InputMaybe<Scalars['citext']>;
  _neq?: InputMaybe<Scalars['citext']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['citext']>;
  _nin?: InputMaybe<Array<Scalars['citext']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['citext']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['citext']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['citext']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['citext']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['citext']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['citext']>;
};

/** ordering argument of a cursor */
export type CursorOrdering =
  /** ascending ordering of the cursor */
  | 'ASC'
  /** descending ordering of the cursor */
  | 'DESC';

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** columns and relationships of "memberships" */
export type Memberships = {
  __typename?: 'Memberships';
  createdAt: Scalars['timestamptz'];
  /** An object relationship */
  organization: Organizations;
  organizationId: Scalars['bigint'];
  /** An object relationship */
  user: Users;
  userId: Scalars['bigint'];
};

/** aggregated selection of "memberships" */
export type MembershipsAggregate = {
  __typename?: 'MembershipsAggregate';
  aggregate?: Maybe<MembershipsAggregateFields>;
  nodes: Array<Memberships>;
};

/** aggregate fields of "memberships" */
export type MembershipsAggregateFields = {
  __typename?: 'MembershipsAggregateFields';
  avg?: Maybe<MembershipsAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<MembershipsMaxFields>;
  min?: Maybe<MembershipsMinFields>;
  stddev?: Maybe<MembershipsStddevFields>;
  stddevPop?: Maybe<MembershipsStddev_PopFields>;
  stddevSamp?: Maybe<MembershipsStddev_SampFields>;
  sum?: Maybe<MembershipsSumFields>;
  varPop?: Maybe<MembershipsVar_PopFields>;
  varSamp?: Maybe<MembershipsVar_SampFields>;
  variance?: Maybe<MembershipsVarianceFields>;
};


/** aggregate fields of "memberships" */
export type MembershipsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<MembershipsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "memberships" */
export type MembershipsAggregateOrderBy = {
  avg?: InputMaybe<Memberships_Avg_Order_By>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<Memberships_Max_Order_By>;
  min?: InputMaybe<Memberships_Min_Order_By>;
  stddev?: InputMaybe<Memberships_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Memberships_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Memberships_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Memberships_Sum_Order_By>;
  var_pop?: InputMaybe<Memberships_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Memberships_Var_Samp_Order_By>;
  variance?: InputMaybe<Memberships_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "memberships" */
export type MembershipsArrRelInsertInput = {
  data: Array<MembershipsInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<MembershipsOnConflict>;
};

/** aggregate avg on columns */
export type MembershipsAvgFields = {
  __typename?: 'MembershipsAvgFields';
  organizationId?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "memberships". All fields are combined with a logical 'AND'. */
export type MembershipsBoolExp = {
  _and?: InputMaybe<Array<MembershipsBoolExp>>;
  _not?: InputMaybe<MembershipsBoolExp>;
  _or?: InputMaybe<Array<MembershipsBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  organization?: InputMaybe<OrganizationsBoolExp>;
  organizationId?: InputMaybe<BigintComparisonExp>;
  user?: InputMaybe<UsersBoolExp>;
  userId?: InputMaybe<BigintComparisonExp>;
};

/** unique or primary key constraints on table "memberships" */
export type MembershipsConstraint =
  /** unique or primary key constraint on columns "user_id", "organization_id" */
  | 'memberships_pkey';

/** input type for incrementing numeric columns in table "memberships" */
export type MembershipsIncInput = {
  organizationId?: InputMaybe<Scalars['bigint']>;
  userId?: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "memberships" */
export type MembershipsInsertInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  organization?: InputMaybe<OrganizationsObjRelInsertInput>;
  organizationId?: InputMaybe<Scalars['bigint']>;
  user?: InputMaybe<UsersObjRelInsertInput>;
  userId?: InputMaybe<Scalars['bigint']>;
};

/** aggregate max on columns */
export type MembershipsMaxFields = {
  __typename?: 'MembershipsMaxFields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  organizationId?: Maybe<Scalars['bigint']>;
  userId?: Maybe<Scalars['bigint']>;
};

/** aggregate min on columns */
export type MembershipsMinFields = {
  __typename?: 'MembershipsMinFields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  organizationId?: Maybe<Scalars['bigint']>;
  userId?: Maybe<Scalars['bigint']>;
};

/** response of any mutation on the table "memberships" */
export type MembershipsMutationResponse = {
  __typename?: 'MembershipsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Memberships>;
};

/** on_conflict condition type for table "memberships" */
export type MembershipsOnConflict = {
  constraint: MembershipsConstraint;
  update_columns?: Array<MembershipsUpdateColumn>;
  where?: InputMaybe<MembershipsBoolExp>;
};

/** Ordering options when selecting data from "memberships". */
export type MembershipsOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  organization?: InputMaybe<OrganizationsOrderBy>;
  organizationId?: InputMaybe<OrderBy>;
  user?: InputMaybe<UsersOrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: memberships */
export type MembershipsPkColumnsInput = {
  organizationId: Scalars['bigint'];
  userId: Scalars['bigint'];
};

/** select columns of table "memberships" */
export type MembershipsSelectColumn =
  /** column name */
  | 'createdAt'
  /** column name */
  | 'organizationId'
  /** column name */
  | 'userId';

/** input type for updating data in table "memberships" */
export type MembershipsSetInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  organizationId?: InputMaybe<Scalars['bigint']>;
  userId?: InputMaybe<Scalars['bigint']>;
};

/** aggregate stddev on columns */
export type MembershipsStddevFields = {
  __typename?: 'MembershipsStddevFields';
  organizationId?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type MembershipsStddev_PopFields = {
  __typename?: 'MembershipsStddev_popFields';
  organizationId?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type MembershipsStddev_SampFields = {
  __typename?: 'MembershipsStddev_sampFields';
  organizationId?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type MembershipsSumFields = {
  __typename?: 'MembershipsSumFields';
  organizationId?: Maybe<Scalars['bigint']>;
  userId?: Maybe<Scalars['bigint']>;
};

/** update columns of table "memberships" */
export type MembershipsUpdateColumn =
  /** column name */
  | 'createdAt'
  /** column name */
  | 'organizationId'
  /** column name */
  | 'userId';

export type MembershipsUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<MembershipsIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<MembershipsSetInput>;
  where: MembershipsBoolExp;
};

/** aggregate var_pop on columns */
export type MembershipsVar_PopFields = {
  __typename?: 'MembershipsVar_popFields';
  organizationId?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type MembershipsVar_SampFields = {
  __typename?: 'MembershipsVar_sampFields';
  organizationId?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type MembershipsVarianceFields = {
  __typename?: 'MembershipsVarianceFields';
  organizationId?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** column ordering options */
export type OrderBy =
  /** in ascending order, nulls last */
  | 'ASC'
  /** in ascending order, nulls first */
  | 'ASC_NULLS_FIRST'
  /** in ascending order, nulls last */
  | 'ASC_NULLS_LAST'
  /** in descending order, nulls first */
  | 'DESC'
  /** in descending order, nulls first */
  | 'DESC_NULLS_FIRST'
  /** in descending order, nulls last */
  | 'DESC_NULLS_LAST';

/** columns and relationships of "organizations" */
export type Organizations = {
  __typename?: 'Organizations';
  createdAt: Scalars['timestamptz'];
  id: Scalars['bigint'];
  /** An array relationship */
  memberships: Array<Memberships>;
  /** An aggregate relationship */
  membershipsAggregate: MembershipsAggregate;
  name?: Maybe<Scalars['citext']>;
  /** An array relationship */
  posts: Array<Posts>;
  /** An aggregate relationship */
  postsAggregate: PostsAggregate;
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "organizations" */
export type OrganizationsMembershipsArgs = {
  distinctOn?: InputMaybe<Array<MembershipsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MembershipsOrderBy>>;
  where?: InputMaybe<MembershipsBoolExp>;
};


/** columns and relationships of "organizations" */
export type OrganizationsMembershipsAggregateArgs = {
  distinctOn?: InputMaybe<Array<MembershipsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MembershipsOrderBy>>;
  where?: InputMaybe<MembershipsBoolExp>;
};


/** columns and relationships of "organizations" */
export type OrganizationsPostsArgs = {
  distinctOn?: InputMaybe<Array<PostsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PostsOrderBy>>;
  where?: InputMaybe<PostsBoolExp>;
};


/** columns and relationships of "organizations" */
export type OrganizationsPostsAggregateArgs = {
  distinctOn?: InputMaybe<Array<PostsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PostsOrderBy>>;
  where?: InputMaybe<PostsBoolExp>;
};

/** aggregated selection of "organizations" */
export type OrganizationsAggregate = {
  __typename?: 'OrganizationsAggregate';
  aggregate?: Maybe<OrganizationsAggregateFields>;
  nodes: Array<Organizations>;
};

/** aggregate fields of "organizations" */
export type OrganizationsAggregateFields = {
  __typename?: 'OrganizationsAggregateFields';
  avg?: Maybe<OrganizationsAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<OrganizationsMaxFields>;
  min?: Maybe<OrganizationsMinFields>;
  stddev?: Maybe<OrganizationsStddevFields>;
  stddevPop?: Maybe<OrganizationsStddev_PopFields>;
  stddevSamp?: Maybe<OrganizationsStddev_SampFields>;
  sum?: Maybe<OrganizationsSumFields>;
  varPop?: Maybe<OrganizationsVar_PopFields>;
  varSamp?: Maybe<OrganizationsVar_SampFields>;
  variance?: Maybe<OrganizationsVarianceFields>;
};


/** aggregate fields of "organizations" */
export type OrganizationsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<OrganizationsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type OrganizationsAvgFields = {
  __typename?: 'OrganizationsAvgFields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "organizations". All fields are combined with a logical 'AND'. */
export type OrganizationsBoolExp = {
  _and?: InputMaybe<Array<OrganizationsBoolExp>>;
  _not?: InputMaybe<OrganizationsBoolExp>;
  _or?: InputMaybe<Array<OrganizationsBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<BigintComparisonExp>;
  memberships?: InputMaybe<MembershipsBoolExp>;
  memberships_aggregate?: InputMaybe<Memberships_Aggregate_Bool_Exp>;
  name?: InputMaybe<CitextComparisonExp>;
  posts?: InputMaybe<PostsBoolExp>;
  posts_aggregate?: InputMaybe<Posts_Aggregate_Bool_Exp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "organizations" */
export type OrganizationsConstraint =
  /** unique or primary key constraint on columns "id" */
  | 'organizations_pkey';

/** input type for incrementing numeric columns in table "organizations" */
export type OrganizationsIncInput = {
  id?: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "organizations" */
export type OrganizationsInsertInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['bigint']>;
  memberships?: InputMaybe<MembershipsArrRelInsertInput>;
  name?: InputMaybe<Scalars['citext']>;
  posts?: InputMaybe<PostsArrRelInsertInput>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type OrganizationsMaxFields = {
  __typename?: 'OrganizationsMaxFields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['bigint']>;
  name?: Maybe<Scalars['citext']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type OrganizationsMinFields = {
  __typename?: 'OrganizationsMinFields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['bigint']>;
  name?: Maybe<Scalars['citext']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "organizations" */
export type OrganizationsMutationResponse = {
  __typename?: 'OrganizationsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Organizations>;
};

/** input type for inserting object relation for remote table "organizations" */
export type OrganizationsObjRelInsertInput = {
  data: OrganizationsInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<OrganizationsOnConflict>;
};

/** on_conflict condition type for table "organizations" */
export type OrganizationsOnConflict = {
  constraint: OrganizationsConstraint;
  update_columns?: Array<OrganizationsUpdateColumn>;
  where?: InputMaybe<OrganizationsBoolExp>;
};

/** Ordering options when selecting data from "organizations". */
export type OrganizationsOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  membershipsAggregate?: InputMaybe<MembershipsAggregateOrderBy>;
  name?: InputMaybe<OrderBy>;
  postsAggregate?: InputMaybe<PostsAggregateOrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: organizations */
export type OrganizationsPkColumnsInput = {
  id: Scalars['bigint'];
};

/** select columns of table "organizations" */
export type OrganizationsSelectColumn =
  /** column name */
  | 'createdAt'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'updatedAt';

/** input type for updating data in table "organizations" */
export type OrganizationsSetInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['bigint']>;
  name?: InputMaybe<Scalars['citext']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type OrganizationsStddevFields = {
  __typename?: 'OrganizationsStddevFields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type OrganizationsStddev_PopFields = {
  __typename?: 'OrganizationsStddev_popFields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type OrganizationsStddev_SampFields = {
  __typename?: 'OrganizationsStddev_sampFields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type OrganizationsSumFields = {
  __typename?: 'OrganizationsSumFields';
  id?: Maybe<Scalars['bigint']>;
};

/** update columns of table "organizations" */
export type OrganizationsUpdateColumn =
  /** column name */
  | 'createdAt'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'updatedAt';

export type OrganizationsUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<OrganizationsIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<OrganizationsSetInput>;
  where: OrganizationsBoolExp;
};

/** aggregate var_pop on columns */
export type OrganizationsVar_PopFields = {
  __typename?: 'OrganizationsVar_popFields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type OrganizationsVar_SampFields = {
  __typename?: 'OrganizationsVar_sampFields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type OrganizationsVarianceFields = {
  __typename?: 'OrganizationsVarianceFields';
  id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "posts" */
export type Posts = {
  __typename?: 'Posts';
  content: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  id: Scalars['bigint'];
  /** An object relationship */
  organization: Organizations;
  organizationId: Scalars['bigint'];
  updatedAt: Scalars['timestamptz'];
};

/** aggregated selection of "posts" */
export type PostsAggregate = {
  __typename?: 'PostsAggregate';
  aggregate?: Maybe<PostsAggregateFields>;
  nodes: Array<Posts>;
};

/** aggregate fields of "posts" */
export type PostsAggregateFields = {
  __typename?: 'PostsAggregateFields';
  avg?: Maybe<PostsAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<PostsMaxFields>;
  min?: Maybe<PostsMinFields>;
  stddev?: Maybe<PostsStddevFields>;
  stddevPop?: Maybe<PostsStddev_PopFields>;
  stddevSamp?: Maybe<PostsStddev_SampFields>;
  sum?: Maybe<PostsSumFields>;
  varPop?: Maybe<PostsVar_PopFields>;
  varSamp?: Maybe<PostsVar_SampFields>;
  variance?: Maybe<PostsVarianceFields>;
};


/** aggregate fields of "posts" */
export type PostsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<PostsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "posts" */
export type PostsAggregateOrderBy = {
  avg?: InputMaybe<Posts_Avg_Order_By>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<Posts_Max_Order_By>;
  min?: InputMaybe<Posts_Min_Order_By>;
  stddev?: InputMaybe<Posts_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Posts_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Posts_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Posts_Sum_Order_By>;
  var_pop?: InputMaybe<Posts_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Posts_Var_Samp_Order_By>;
  variance?: InputMaybe<Posts_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "posts" */
export type PostsArrRelInsertInput = {
  data: Array<PostsInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<PostsOnConflict>;
};

/** aggregate avg on columns */
export type PostsAvgFields = {
  __typename?: 'PostsAvgFields';
  id?: Maybe<Scalars['Float']>;
  organizationId?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "posts". All fields are combined with a logical 'AND'. */
export type PostsBoolExp = {
  _and?: InputMaybe<Array<PostsBoolExp>>;
  _not?: InputMaybe<PostsBoolExp>;
  _or?: InputMaybe<Array<PostsBoolExp>>;
  content?: InputMaybe<StringComparisonExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<BigintComparisonExp>;
  organization?: InputMaybe<OrganizationsBoolExp>;
  organizationId?: InputMaybe<BigintComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "posts" */
export type PostsConstraint =
  /** unique or primary key constraint on columns "id", "organization_id" */
  | 'posts_pkey';

/** input type for incrementing numeric columns in table "posts" */
export type PostsIncInput = {
  id?: InputMaybe<Scalars['bigint']>;
  organizationId?: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "posts" */
export type PostsInsertInput = {
  content?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['bigint']>;
  organization?: InputMaybe<OrganizationsObjRelInsertInput>;
  organizationId?: InputMaybe<Scalars['bigint']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type PostsMaxFields = {
  __typename?: 'PostsMaxFields';
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['bigint']>;
  organizationId?: Maybe<Scalars['bigint']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type PostsMinFields = {
  __typename?: 'PostsMinFields';
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['bigint']>;
  organizationId?: Maybe<Scalars['bigint']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "posts" */
export type PostsMutationResponse = {
  __typename?: 'PostsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Posts>;
};

/** on_conflict condition type for table "posts" */
export type PostsOnConflict = {
  constraint: PostsConstraint;
  update_columns?: Array<PostsUpdateColumn>;
  where?: InputMaybe<PostsBoolExp>;
};

/** Ordering options when selecting data from "posts". */
export type PostsOrderBy = {
  content?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  organization?: InputMaybe<OrganizationsOrderBy>;
  organizationId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: posts */
export type PostsPkColumnsInput = {
  id: Scalars['bigint'];
  organizationId: Scalars['bigint'];
};

/** select columns of table "posts" */
export type PostsSelectColumn =
  /** column name */
  | 'content'
  /** column name */
  | 'createdAt'
  /** column name */
  | 'id'
  /** column name */
  | 'organizationId'
  /** column name */
  | 'updatedAt';

/** input type for updating data in table "posts" */
export type PostsSetInput = {
  content?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['bigint']>;
  organizationId?: InputMaybe<Scalars['bigint']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type PostsStddevFields = {
  __typename?: 'PostsStddevFields';
  id?: Maybe<Scalars['Float']>;
  organizationId?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type PostsStddev_PopFields = {
  __typename?: 'PostsStddev_popFields';
  id?: Maybe<Scalars['Float']>;
  organizationId?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type PostsStddev_SampFields = {
  __typename?: 'PostsStddev_sampFields';
  id?: Maybe<Scalars['Float']>;
  organizationId?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type PostsSumFields = {
  __typename?: 'PostsSumFields';
  id?: Maybe<Scalars['bigint']>;
  organizationId?: Maybe<Scalars['bigint']>;
};

/** update columns of table "posts" */
export type PostsUpdateColumn =
  /** column name */
  | 'content'
  /** column name */
  | 'createdAt'
  /** column name */
  | 'id'
  /** column name */
  | 'organizationId'
  /** column name */
  | 'updatedAt';

export type PostsUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<PostsIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<PostsSetInput>;
  where: PostsBoolExp;
};

/** aggregate var_pop on columns */
export type PostsVar_PopFields = {
  __typename?: 'PostsVar_popFields';
  id?: Maybe<Scalars['Float']>;
  organizationId?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type PostsVar_SampFields = {
  __typename?: 'PostsVar_sampFields';
  id?: Maybe<Scalars['Float']>;
  organizationId?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type PostsVarianceFields = {
  __typename?: 'PostsVarianceFields';
  id?: Maybe<Scalars['Float']>;
  organizationId?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'Users';
  createdAt: Scalars['timestamptz'];
  email: Scalars['citext'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['bigint'];
  lastName?: Maybe<Scalars['String']>;
  /** An array relationship */
  memberships: Array<Memberships>;
  /** An aggregate relationship */
  membershipsAggregate: MembershipsAggregate;
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "users" */
export type UsersMembershipsArgs = {
  distinctOn?: InputMaybe<Array<MembershipsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MembershipsOrderBy>>;
  where?: InputMaybe<MembershipsBoolExp>;
};


/** columns and relationships of "users" */
export type UsersMembershipsAggregateArgs = {
  distinctOn?: InputMaybe<Array<MembershipsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MembershipsOrderBy>>;
  where?: InputMaybe<MembershipsBoolExp>;
};

/** aggregated selection of "users" */
export type UsersAggregate = {
  __typename?: 'UsersAggregate';
  aggregate?: Maybe<UsersAggregateFields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type UsersAggregateFields = {
  __typename?: 'UsersAggregateFields';
  avg?: Maybe<UsersAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<UsersMaxFields>;
  min?: Maybe<UsersMinFields>;
  stddev?: Maybe<UsersStddevFields>;
  stddevPop?: Maybe<UsersStddev_PopFields>;
  stddevSamp?: Maybe<UsersStddev_SampFields>;
  sum?: Maybe<UsersSumFields>;
  varPop?: Maybe<UsersVar_PopFields>;
  varSamp?: Maybe<UsersVar_SampFields>;
  variance?: Maybe<UsersVarianceFields>;
};


/** aggregate fields of "users" */
export type UsersAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<UsersSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type UsersAvgFields = {
  __typename?: 'UsersAvgFields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type UsersBoolExp = {
  _and?: InputMaybe<Array<UsersBoolExp>>;
  _not?: InputMaybe<UsersBoolExp>;
  _or?: InputMaybe<Array<UsersBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  email?: InputMaybe<CitextComparisonExp>;
  firstName?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<BigintComparisonExp>;
  lastName?: InputMaybe<StringComparisonExp>;
  memberships?: InputMaybe<MembershipsBoolExp>;
  memberships_aggregate?: InputMaybe<Memberships_Aggregate_Bool_Exp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "users" */
export type UsersConstraint =
  /** unique or primary key constraint on columns "email" */
  | 'users_email_key'
  /** unique or primary key constraint on columns "id" */
  | 'users_pkey';

/** input type for incrementing numeric columns in table "users" */
export type UsersIncInput = {
  id?: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "users" */
export type UsersInsertInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['citext']>;
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['bigint']>;
  lastName?: InputMaybe<Scalars['String']>;
  memberships?: InputMaybe<MembershipsArrRelInsertInput>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type UsersMaxFields = {
  __typename?: 'UsersMaxFields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['citext']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['bigint']>;
  lastName?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type UsersMinFields = {
  __typename?: 'UsersMinFields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['citext']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['bigint']>;
  lastName?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "users" */
export type UsersMutationResponse = {
  __typename?: 'UsersMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type UsersObjRelInsertInput = {
  data: UsersInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<UsersOnConflict>;
};

/** on_conflict condition type for table "users" */
export type UsersOnConflict = {
  constraint: UsersConstraint;
  update_columns?: Array<UsersUpdateColumn>;
  where?: InputMaybe<UsersBoolExp>;
};

/** Ordering options when selecting data from "users". */
export type UsersOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  firstName?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  lastName?: InputMaybe<OrderBy>;
  membershipsAggregate?: InputMaybe<MembershipsAggregateOrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: users */
export type UsersPkColumnsInput = {
  id: Scalars['bigint'];
};

/** select columns of table "users" */
export type UsersSelectColumn =
  /** column name */
  | 'createdAt'
  /** column name */
  | 'email'
  /** column name */
  | 'firstName'
  /** column name */
  | 'id'
  /** column name */
  | 'lastName'
  /** column name */
  | 'updatedAt';

/** input type for updating data in table "users" */
export type UsersSetInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['citext']>;
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['bigint']>;
  lastName?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type UsersStddevFields = {
  __typename?: 'UsersStddevFields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type UsersStddev_PopFields = {
  __typename?: 'UsersStddev_popFields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type UsersStddev_SampFields = {
  __typename?: 'UsersStddev_sampFields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type UsersSumFields = {
  __typename?: 'UsersSumFields';
  id?: Maybe<Scalars['bigint']>;
};

/** update columns of table "users" */
export type UsersUpdateColumn =
  /** column name */
  | 'createdAt'
  /** column name */
  | 'email'
  /** column name */
  | 'firstName'
  /** column name */
  | 'id'
  /** column name */
  | 'lastName'
  /** column name */
  | 'updatedAt';

export type UsersUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<UsersIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<UsersSetInput>;
  where: UsersBoolExp;
};

/** aggregate var_pop on columns */
export type UsersVar_PopFields = {
  __typename?: 'UsersVar_popFields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type UsersVar_SampFields = {
  __typename?: 'UsersVar_sampFields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type UsersVarianceFields = {
  __typename?: 'UsersVarianceFields';
  id?: Maybe<Scalars['Float']>;
};

export type Memberships_Aggregate_Bool_Exp = {
  count?: InputMaybe<Memberships_Aggregate_Bool_Exp_Count>;
};

export type Memberships_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<MembershipsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<MembershipsBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "memberships" */
export type Memberships_Avg_Order_By = {
  organizationId?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "memberships" */
export type Memberships_Max_Order_By = {
  createdAt?: InputMaybe<OrderBy>;
  organizationId?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "memberships" */
export type Memberships_Min_Order_By = {
  createdAt?: InputMaybe<OrderBy>;
  organizationId?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "memberships" */
export type Memberships_Stddev_Order_By = {
  organizationId?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "memberships" */
export type Memberships_Stddev_Pop_Order_By = {
  organizationId?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "memberships" */
export type Memberships_Stddev_Samp_Order_By = {
  organizationId?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "memberships" */
export type Memberships_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Memberships_StreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Memberships_StreamCursorValueInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  organizationId?: InputMaybe<Scalars['bigint']>;
  userId?: InputMaybe<Scalars['bigint']>;
};

/** order by sum() on columns of table "memberships" */
export type Memberships_Sum_Order_By = {
  organizationId?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "memberships" */
export type Memberships_Var_Pop_Order_By = {
  organizationId?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "memberships" */
export type Memberships_Var_Samp_Order_By = {
  organizationId?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "memberships" */
export type Memberships_Variance_Order_By = {
  organizationId?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "memberships" */
  deleteMemberships?: Maybe<MembershipsMutationResponse>;
  /** delete single row from the table: "memberships" */
  deleteMembershipsByPk?: Maybe<Memberships>;
  /** delete data from the table: "organizations" */
  deleteOrganizations?: Maybe<OrganizationsMutationResponse>;
  /** delete single row from the table: "organizations" */
  deleteOrganizationsByPk?: Maybe<Organizations>;
  /** delete data from the table: "posts" */
  deletePosts?: Maybe<PostsMutationResponse>;
  /** delete single row from the table: "posts" */
  deletePostsByPk?: Maybe<Posts>;
  /** delete data from the table: "users" */
  deleteUsers?: Maybe<UsersMutationResponse>;
  /** delete single row from the table: "users" */
  deleteUsersByPk?: Maybe<Users>;
  /** insert data into the table: "memberships" */
  insertMemberships?: Maybe<MembershipsMutationResponse>;
  /** insert a single row into the table: "memberships" */
  insertMembershipsOne?: Maybe<Memberships>;
  /** insert data into the table: "organizations" */
  insertOrganizations?: Maybe<OrganizationsMutationResponse>;
  /** insert a single row into the table: "organizations" */
  insertOrganizationsOne?: Maybe<Organizations>;
  /** insert data into the table: "posts" */
  insertPosts?: Maybe<PostsMutationResponse>;
  /** insert a single row into the table: "posts" */
  insertPostsOne?: Maybe<Posts>;
  /** insert data into the table: "users" */
  insertUsers?: Maybe<UsersMutationResponse>;
  /** insert a single row into the table: "users" */
  insertUsersOne?: Maybe<Users>;
  /** update data of the table: "memberships" */
  updateMemberships?: Maybe<MembershipsMutationResponse>;
  /** update single row of the table: "memberships" */
  updateMembershipsByPk?: Maybe<Memberships>;
  /** update multiples rows of table: "memberships" */
  updateMembershipsMany?: Maybe<Array<Maybe<MembershipsMutationResponse>>>;
  /** update data of the table: "organizations" */
  updateOrganizations?: Maybe<OrganizationsMutationResponse>;
  /** update single row of the table: "organizations" */
  updateOrganizationsByPk?: Maybe<Organizations>;
  /** update multiples rows of table: "organizations" */
  updateOrganizationsMany?: Maybe<Array<Maybe<OrganizationsMutationResponse>>>;
  /** update data of the table: "posts" */
  updatePosts?: Maybe<PostsMutationResponse>;
  /** update single row of the table: "posts" */
  updatePostsByPk?: Maybe<Posts>;
  /** update multiples rows of table: "posts" */
  updatePostsMany?: Maybe<Array<Maybe<PostsMutationResponse>>>;
  /** update data of the table: "users" */
  updateUsers?: Maybe<UsersMutationResponse>;
  /** update single row of the table: "users" */
  updateUsersByPk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  updateUsersMany?: Maybe<Array<Maybe<UsersMutationResponse>>>;
};


/** mutation root */
export type Mutation_RootDeleteMembershipsArgs = {
  where: MembershipsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteMembershipsByPkArgs = {
  organizationId: Scalars['bigint'];
  userId: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDeleteOrganizationsArgs = {
  where: OrganizationsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteOrganizationsByPkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDeletePostsArgs = {
  where: PostsBoolExp;
};


/** mutation root */
export type Mutation_RootDeletePostsByPkArgs = {
  id: Scalars['bigint'];
  organizationId: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDeleteUsersArgs = {
  where: UsersBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteUsersByPkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootInsertMembershipsArgs = {
  objects: Array<MembershipsInsertInput>;
  onConflict?: InputMaybe<MembershipsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertMembershipsOneArgs = {
  object: MembershipsInsertInput;
  onConflict?: InputMaybe<MembershipsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertOrganizationsArgs = {
  objects: Array<OrganizationsInsertInput>;
  onConflict?: InputMaybe<OrganizationsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertOrganizationsOneArgs = {
  object: OrganizationsInsertInput;
  onConflict?: InputMaybe<OrganizationsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertPostsArgs = {
  objects: Array<PostsInsertInput>;
  onConflict?: InputMaybe<PostsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertPostsOneArgs = {
  object: PostsInsertInput;
  onConflict?: InputMaybe<PostsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertUsersArgs = {
  objects: Array<UsersInsertInput>;
  onConflict?: InputMaybe<UsersOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertUsersOneArgs = {
  object: UsersInsertInput;
  onConflict?: InputMaybe<UsersOnConflict>;
};


/** mutation root */
export type Mutation_RootUpdateMembershipsArgs = {
  _inc?: InputMaybe<MembershipsIncInput>;
  _set?: InputMaybe<MembershipsSetInput>;
  where: MembershipsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateMembershipsByPkArgs = {
  _inc?: InputMaybe<MembershipsIncInput>;
  _set?: InputMaybe<MembershipsSetInput>;
  pk_columns: MembershipsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateMembershipsManyArgs = {
  updates: Array<MembershipsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateOrganizationsArgs = {
  _inc?: InputMaybe<OrganizationsIncInput>;
  _set?: InputMaybe<OrganizationsSetInput>;
  where: OrganizationsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateOrganizationsByPkArgs = {
  _inc?: InputMaybe<OrganizationsIncInput>;
  _set?: InputMaybe<OrganizationsSetInput>;
  pk_columns: OrganizationsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateOrganizationsManyArgs = {
  updates: Array<OrganizationsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdatePostsArgs = {
  _inc?: InputMaybe<PostsIncInput>;
  _set?: InputMaybe<PostsSetInput>;
  where: PostsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdatePostsByPkArgs = {
  _inc?: InputMaybe<PostsIncInput>;
  _set?: InputMaybe<PostsSetInput>;
  pk_columns: PostsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdatePostsManyArgs = {
  updates: Array<PostsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateUsersArgs = {
  _inc?: InputMaybe<UsersIncInput>;
  _set?: InputMaybe<UsersSetInput>;
  where: UsersBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateUsersByPkArgs = {
  _inc?: InputMaybe<UsersIncInput>;
  _set?: InputMaybe<UsersSetInput>;
  pk_columns: UsersPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateUsersManyArgs = {
  updates: Array<UsersUpdates>;
};

/** Streaming cursor of the table "organizations" */
export type Organizations_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Organizations_StreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Organizations_StreamCursorValueInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['bigint']>;
  name?: InputMaybe<Scalars['citext']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

export type Posts_Aggregate_Bool_Exp = {
  count?: InputMaybe<Posts_Aggregate_Bool_Exp_Count>;
};

export type Posts_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<PostsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<PostsBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "posts" */
export type Posts_Avg_Order_By = {
  id?: InputMaybe<OrderBy>;
  organizationId?: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "posts" */
export type Posts_Max_Order_By = {
  content?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  organizationId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "posts" */
export type Posts_Min_Order_By = {
  content?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  organizationId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "posts" */
export type Posts_Stddev_Order_By = {
  id?: InputMaybe<OrderBy>;
  organizationId?: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "posts" */
export type Posts_Stddev_Pop_Order_By = {
  id?: InputMaybe<OrderBy>;
  organizationId?: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "posts" */
export type Posts_Stddev_Samp_Order_By = {
  id?: InputMaybe<OrderBy>;
  organizationId?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "posts" */
export type Posts_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Posts_StreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Posts_StreamCursorValueInput = {
  content?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['bigint']>;
  organizationId?: InputMaybe<Scalars['bigint']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** order by sum() on columns of table "posts" */
export type Posts_Sum_Order_By = {
  id?: InputMaybe<OrderBy>;
  organizationId?: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "posts" */
export type Posts_Var_Pop_Order_By = {
  id?: InputMaybe<OrderBy>;
  organizationId?: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "posts" */
export type Posts_Var_Samp_Order_By = {
  id?: InputMaybe<OrderBy>;
  organizationId?: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "posts" */
export type Posts_Variance_Order_By = {
  id?: InputMaybe<OrderBy>;
  organizationId?: InputMaybe<OrderBy>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** An array relationship */
  memberships: Array<Memberships>;
  /** An aggregate relationship */
  membershipsAggregate: MembershipsAggregate;
  /** fetch data from the table: "memberships" using primary key columns */
  membershipsByPk?: Maybe<Memberships>;
  /** fetch data from the table: "organizations" */
  organizations: Array<Organizations>;
  /** fetch aggregated fields from the table: "organizations" */
  organizationsAggregate: OrganizationsAggregate;
  /** fetch data from the table: "organizations" using primary key columns */
  organizationsByPk?: Maybe<Organizations>;
  /** An array relationship */
  posts: Array<Posts>;
  /** An aggregate relationship */
  postsAggregate: PostsAggregate;
  /** fetch data from the table: "posts" using primary key columns */
  postsByPk?: Maybe<Posts>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  usersAggregate: UsersAggregate;
  /** fetch data from the table: "users" using primary key columns */
  usersByPk?: Maybe<Users>;
};


export type Query_RootMembershipsArgs = {
  distinctOn?: InputMaybe<Array<MembershipsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MembershipsOrderBy>>;
  where?: InputMaybe<MembershipsBoolExp>;
};


export type Query_RootMembershipsAggregateArgs = {
  distinctOn?: InputMaybe<Array<MembershipsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MembershipsOrderBy>>;
  where?: InputMaybe<MembershipsBoolExp>;
};


export type Query_RootMembershipsByPkArgs = {
  organizationId: Scalars['bigint'];
  userId: Scalars['bigint'];
};


export type Query_RootOrganizationsArgs = {
  distinctOn?: InputMaybe<Array<OrganizationsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrganizationsOrderBy>>;
  where?: InputMaybe<OrganizationsBoolExp>;
};


export type Query_RootOrganizationsAggregateArgs = {
  distinctOn?: InputMaybe<Array<OrganizationsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrganizationsOrderBy>>;
  where?: InputMaybe<OrganizationsBoolExp>;
};


export type Query_RootOrganizationsByPkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootPostsArgs = {
  distinctOn?: InputMaybe<Array<PostsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PostsOrderBy>>;
  where?: InputMaybe<PostsBoolExp>;
};


export type Query_RootPostsAggregateArgs = {
  distinctOn?: InputMaybe<Array<PostsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PostsOrderBy>>;
  where?: InputMaybe<PostsBoolExp>;
};


export type Query_RootPostsByPkArgs = {
  id: Scalars['bigint'];
  organizationId: Scalars['bigint'];
};


export type Query_RootUsersArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Query_RootUsersAggregateArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Query_RootUsersByPkArgs = {
  id: Scalars['bigint'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** An array relationship */
  memberships: Array<Memberships>;
  /** An aggregate relationship */
  membershipsAggregate: MembershipsAggregate;
  /** fetch data from the table: "memberships" using primary key columns */
  membershipsByPk?: Maybe<Memberships>;
  /** fetch data from the table in a streaming manner: "memberships" */
  membershipsStream: Array<Memberships>;
  /** fetch data from the table: "organizations" */
  organizations: Array<Organizations>;
  /** fetch aggregated fields from the table: "organizations" */
  organizationsAggregate: OrganizationsAggregate;
  /** fetch data from the table: "organizations" using primary key columns */
  organizationsByPk?: Maybe<Organizations>;
  /** fetch data from the table in a streaming manner: "organizations" */
  organizationsStream: Array<Organizations>;
  /** An array relationship */
  posts: Array<Posts>;
  /** An aggregate relationship */
  postsAggregate: PostsAggregate;
  /** fetch data from the table: "posts" using primary key columns */
  postsByPk?: Maybe<Posts>;
  /** fetch data from the table in a streaming manner: "posts" */
  postsStream: Array<Posts>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  usersAggregate: UsersAggregate;
  /** fetch data from the table: "users" using primary key columns */
  usersByPk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  usersStream: Array<Users>;
};


export type Subscription_RootMembershipsArgs = {
  distinctOn?: InputMaybe<Array<MembershipsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MembershipsOrderBy>>;
  where?: InputMaybe<MembershipsBoolExp>;
};


export type Subscription_RootMembershipsAggregateArgs = {
  distinctOn?: InputMaybe<Array<MembershipsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MembershipsOrderBy>>;
  where?: InputMaybe<MembershipsBoolExp>;
};


export type Subscription_RootMembershipsByPkArgs = {
  organizationId: Scalars['bigint'];
  userId: Scalars['bigint'];
};


export type Subscription_RootMembershipsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Memberships_StreamCursorInput>>;
  where?: InputMaybe<MembershipsBoolExp>;
};


export type Subscription_RootOrganizationsArgs = {
  distinctOn?: InputMaybe<Array<OrganizationsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrganizationsOrderBy>>;
  where?: InputMaybe<OrganizationsBoolExp>;
};


export type Subscription_RootOrganizationsAggregateArgs = {
  distinctOn?: InputMaybe<Array<OrganizationsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrganizationsOrderBy>>;
  where?: InputMaybe<OrganizationsBoolExp>;
};


export type Subscription_RootOrganizationsByPkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootOrganizationsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Organizations_StreamCursorInput>>;
  where?: InputMaybe<OrganizationsBoolExp>;
};


export type Subscription_RootPostsArgs = {
  distinctOn?: InputMaybe<Array<PostsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PostsOrderBy>>;
  where?: InputMaybe<PostsBoolExp>;
};


export type Subscription_RootPostsAggregateArgs = {
  distinctOn?: InputMaybe<Array<PostsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PostsOrderBy>>;
  where?: InputMaybe<PostsBoolExp>;
};


export type Subscription_RootPostsByPkArgs = {
  id: Scalars['bigint'];
  organizationId: Scalars['bigint'];
};


export type Subscription_RootPostsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Posts_StreamCursorInput>>;
  where?: InputMaybe<PostsBoolExp>;
};


export type Subscription_RootUsersArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Subscription_RootUsersAggregateArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Subscription_RootUsersByPkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootUsersStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Users_StreamCursorInput>>;
  where?: InputMaybe<UsersBoolExp>;
};

/** Streaming cursor of the table "users" */
export type Users_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Users_StreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_StreamCursorValueInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['citext']>;
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['bigint']>;
  lastName?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};
