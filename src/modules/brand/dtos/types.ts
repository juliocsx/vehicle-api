import { PaginationQuery } from "src/shared/dtos/types";
import { BrandQueryDto } from "./query-brand.dto";

export type BrandQueryFindAll = PaginationQuery & BrandQueryDto;