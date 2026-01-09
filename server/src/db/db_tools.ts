/* eslint-disable @typescript-eslint/no-explicit-any */
import { PoolConnection } from "mysql2/promise";
import { IDbResponse } from "../interfaces/db";
import { IUser } from "../interfaces/user";
import pool from "./db_connection";
export type TTableNames =

  | "reviews"
  | "sales"
  | "sales_items"
  | "brands"
  | "units"
  | "products"
  | "users"
  | "user_logs"
  | "email_notifications"
  | "category";
async function getConnection(): Promise<PoolConnection | undefined> {
  let conn: PoolConnection | undefined;

  try {
    conn = await pool.getConnection();
  } catch (error: any) {
    console.error("getConnection error:", error.message);
  }

  return conn;
}

function parseSqlQuery(query: string) {
  const paramRegex = /:(\w+)/g; // Regular expression to match parameter placeholders

  let parsedQuery = query;
  const params = [];

  // Find all occurrences of parameter placeholders in the query
  let match;
  while ((match = paramRegex.exec(query)) !== null) {
    const paramName = match[1];

    params.push(paramName);

    // Replace parameter placeholder with a placeholder that can be used with prepared statements
    parsedQuery = parsedQuery.replace(match[0], "?");
  }

  return {
    query: parsedQuery,
    params: params,
  };
}

export interface IDbTools {
  connection: PoolConnection | undefined;
  release: () => void;

  beginTransaction: () => void;
  commit: () => void;
  rollback: () => void;

  select: (query: string, params?: any) => Promise<IDbResponse>;
  selectSingle: (query: string, params?: any) => Promise<unknown | null>;

  insert: (table_name: TTableNames, params: any) => Promise<IDbResponse>;
  insert_or_update: (table_name: TTableNames, params: any) => Promise<IDbResponse>;
  getUserByEmail: (email: string) => Promise<IUser | null>;
  getUserByUid: (uid: number) => Promise<IUser | null>;

  insert_with_query: (query: string, params?: any, table_name?: string) => Promise<IDbResponse>;

  update: (table_name: TTableNames, params: any, where?: string) => Promise<IDbResponse>;
  update_with_query: (query: string, params?: any) => Promise<IDbResponse>;

  delete: (query: string, params?: any) => Promise<IDbResponse>;

  queryNonResponse: (query: string, params?: any) => Promise<IDbResponse>;
}

export async function getDbTools(): Promise<IDbTools> {
  const connection: PoolConnection | undefined = await getConnection();

  function release() {
    connection?.release();
  }

  let isTransactionStarted: boolean = false;
  async function beginTransaction() {
    if (isTransactionStarted) return;
    connection?.beginTransaction();
    isTransactionStarted = true;
  }

  async function commit() {
    if (!isTransactionStarted) return;
    connection?.commit();
    isTransactionStarted = false;
  }

  async function rollback() {
    if (!isTransactionStarted) return;
    connection?.rollback();
    isTransactionStarted = false;
  }

  async function select(query: string, params?: any): Promise<IDbResponse> {
    const parsedQuery = parseSqlQuery(query);
    const listParams: any[] = [];
    if (params) {
      parsedQuery.params.forEach((p) => listParams.push(params[p]));
    }

    try {
      const [rows] = await connection!.query(parsedQuery.query, listParams);
      return {
        list: (rows as any[]) || [],
      };
    } catch (error: any) {
      console.error("select error:", error.message);
      return {
        error: { message: error.message },
      };
    }
  }

  async function selectSingle(query: string, params?: any): Promise<unknown | null> {
    const dbRes: IDbResponse | null = await select(query, params);
    if (dbRes.list && dbRes.list?.length > 0) return dbRes.list[0];
    else return null;
  }

  async function insert_with_query(
    query: string,
    params?: any,
    table_name?: string,
  ): Promise<IDbResponse> {
    const parsedQuery = parseSqlQuery(query);
    const listParams: any[] = [];
    if (params) {
      parsedQuery.params.forEach((p) => listParams.push(params[p]));
    }

    try {
      const [result] = await connection!.execute(parsedQuery.query, listParams);
      const lastInsertId = (result as any).insertId as number;
      return {
        uid: lastInsertId,
      };
    } catch (error: any) {
      console.error(`insert error: in ${table_name}`, error.message);
      return {
        error: { message: error.message },
      };
    }
  }

  async function insert(table_name: TTableNames, params: any): Promise<IDbResponse> {
    const keys: string[] = Object.keys(params);
    const keysForValues: string[] = keys.map((k) => `:${k}`);
    const query = `insert into ${table_name} (${keys.join(
      ",",
    )}) values (${keysForValues.join(",")})`;
    return await insert_with_query(query, params, table_name);
  }

  async function insert_or_update(table_name: TTableNames, params: any): Promise<IDbResponse> {
    const keys: string[] = Object.keys(params);
    const keysForValues: string[] = keys.map((k) => `:${k}`);
    const keysForUpdate: string[] = keys.map((k) => `${k}=:${k}`);
    const query = `insert into ${table_name} (${keys.join(",")}) values (${keysForValues.join(
      ",",
    )}) on duplicate key update ${keysForUpdate.join(",")}`;
    return await insert_with_query(query, params, table_name);
  }

  async function update(
    table_name: TTableNames,
    params: any,
    where: string = "uid=:uid",
  ): Promise<IDbResponse> {
    const keys: string[] = Object.keys(params);
    const keysForUpdate: string[] = keys.map((k) => `${k}=:${k}`);
    const query = `update ${table_name} set ${keysForUpdate.join(",")} where ${where}`;
    return await queryNonResponse(query, params);
  }

  async function update_with_query(query: string, params?: any): Promise<IDbResponse> {
    return await queryNonResponse(query, params);
  }

  async function queryNonResponse(query: string, params?: any): Promise<IDbResponse> {
    const parsedQuery = parseSqlQuery(query);
    const listParams: any[] = [];
    if (params) {
      parsedQuery.params.forEach((p) => listParams.push(params[p]));
    }

    try {
      await connection!.query(parsedQuery.query, listParams);
      return {};
    } catch (error: any) {
      console.error("queryNonResponse1 error:", error.message);
      return {
        error: { message: error.message },
      };
    }
  }

  async function del(query: string, params?: any): Promise<IDbResponse> {
    const parsedQuery = parseSqlQuery(query);
    const listParams: any[] = [];
    if (params) {
      parsedQuery.params.forEach((p) => listParams.push(params[p]));
    }

    try {
      const [rows] = await connection!.query(parsedQuery.query, listParams);
      return {
        list: (rows as any[]) || [],
      };
    } catch (error: any) {
      console.error("delete error:", error.message);
      return {
        error: { message: error.message },
      };
    }
  }

  async function getUserByEmail(email: string): Promise<IUser | null> {
    const user: IUser | null = (await selectSingle("select * from users where email = :email", {
      email,
    })) as IUser | null;
    return user;
  }
  async function getUserByUid(uid: number): Promise<IUser | null> {
    const user: IUser | null = (await selectSingle("select * from users where uid = :uid", {
      uid,
    })) as IUser | null;
    return user;
  }
  return {
    connection,
    release,

    beginTransaction,
    commit,
    rollback,

    select,
    selectSingle,

    insert,
    insert_or_update,
    insert_with_query,

    update: update,
    update_with_query,

    queryNonResponse,
    getUserByEmail,
    getUserByUid,
    delete: del,
  };
}
