import { GIFItem, Pagination } from "../../types";

export interface GiphyResponse {
  data: GIFItem[];
  pagination: Pagination;
  meta: {
      status: number;
      msg: string;
      response_id: string;
  };
}
