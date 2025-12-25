export type Coin = {
  id: number;
  name: string;
  symbol: string;
  circulatingSupply: number;
  quotes: Quote[];
  logoUrl?: string;
};

export type MainListParams = {
  start?: number;
  limit?: number;
  sortBy?: string;
  sortType?: "asc" | "desc";
  convert?: string[];
  cryptoType?: string;
  tagType?: string;
  audited?: boolean;
  aux?: string;
};


export interface Quote {
  name: string;
  price: number;
  volume24h: number;
  volume7d: number;
  volume30d: number;
  volumePercentChange: number;
  marketCap: number;
  selfReportedMarketCap: number;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  percentChange30d?: number;
  percentChange60d?: number;
  percentChange90d?: number;
  percentChange1y?: number;
  lastUpdated: string;
  fullyDilluttedMarketCap: number;
  marketCapByTotalSupply: number;
  dominance: number;
  turnover: number;
  ytdPriceChangePercentage: number;
}

export interface CryptoCurrency {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmcRank?: number;
  marketPairCount: number;
  circulatingSupply: number;
  selfReportedCirculatingSupply: number;
  totalSupply: number;
  maxSupply?: number;
  ath: number;
  atl: number;
  high24h: number;
  low24h: number;
  isActive: number;
  lastUpdated: string;
  dateAdded?: string;
  quotes: Quote[];
  isAudited: boolean;
  badges?: number[];
  wrappedStakedMcRank?: number;
  isCmc20Sponsored?: boolean;
}

export interface MainListResponse {
  data: {
    cryptoCurrencyList: CryptoCurrency[];
    totalCount: string;
  };
  status: {
    timestamp: string;
    error_code: string;
    error_message: string;
    elapsed: string | number;
    credit_count: number;
  };
}
