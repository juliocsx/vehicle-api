import { PaginationQuery } from "src/shared/dtos/types";
import { VehicleQueryDto } from "./query-vehicle.dto";

export type VehicleQueryFindAll = PaginationQuery & VehicleQueryDto;