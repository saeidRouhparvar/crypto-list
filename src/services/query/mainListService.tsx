import axiosApiInstance from "@/src/app/api/axios-config";

export type MainListParams = {
  start?: number;
  limit?: number;
  sortBy?: string;
  sortType?: "asc" | "desc";
};
const INTERNAL_API = "/api/crypto";

export const listService = async (params?: MainListParams) => {
  const { data } = await axiosApiInstance.get(INTERNAL_API, {
    params: {
      start: 1,
      limit: 100,
      sortBy: "rank",
      sortType: "desc",
      convert: "USD,BTC,ETH",
      cryptoType: "all",
      tagType: "all",
      audited: false,
      aux:
        "ath,atl,high24h,low24h,num_market_pairs,cmc_rank,date_added,max_supply,circulating_supply,total_supply,volume_7d,volume_30d,self_reported_circulating_supply,self_reported_market_cap",
      ...params, 
    },
  });

  return data;
};
