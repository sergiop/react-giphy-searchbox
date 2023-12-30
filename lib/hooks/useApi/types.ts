import { GIFItem, Pagination } from '../../types/api';

export interface GiphyResponse {
  data: GIFItem[];
  pagination: Pagination;
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
}
