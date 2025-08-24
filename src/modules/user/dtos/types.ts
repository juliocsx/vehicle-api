import { PaginationQuery } from "src/shared/dtos/types";
import { UserQueryDto } from "./query-user.dto";

export type UserQueryFindAll = PaginationQuery & UserQueryDto;