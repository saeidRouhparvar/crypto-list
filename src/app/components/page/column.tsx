import Image from "next/image";
import { Column } from "../ui-kit/table/type";
import { Coin } from "../../utils/type";

const format = (n: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(n);

const color = (n: number) => (n >= 0 ? "text-green-500" : "text-red-500");

export const coinColumns: Column<Coin>[] = [
  {
    key: "name",
    title: "Coin",
    render: (coin) => {
      const logo =
        coin.logoUrl ??
        `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`;

      return (
        <div className="flex items-center gap-3">
          <div className="relative w-6 h-6">
            <Image src={logo} alt={coin.name} fill className="rounded-full" />
          </div>
          <div>
            <div className="font-semibold">{coin.name}</div>
            <div className="text-xs text-gray-500">{coin.symbol}</div>
          </div>
        </div>
      );
    },
  },

  {
    key: "price",
    title: "Price",
    align: "right",
    render: (coin) => {
      const usd = coin.quotes.find(q => q.name === "USD");
      return usd ? `$${format(usd.price)}` : "-";
    },
  },

  {
    key: "change1h",
    title: "1h",
    align: "center",
    render: (coin) => {
      const usd = coin.quotes.find(q => q.name === "USD");
      return (
        <span className={usd ? color(usd.percentChange1h) : ""}>
          {usd ? `${usd.percentChange1h.toFixed(2)}%` : "-"}
        </span>
      );
    },
  },
  {
    key: "change24h",
    title: "24h",
    align: "center",
    render: (coin) => {
      const usd = coin.quotes.find(q => q.name === "USD");
      return (
        <span className={usd ? color(usd.percentChange24h) : ""}>
          {usd ? `${usd.percentChange24h.toFixed(2)}%` : "-"}
        </span>
      );
    },
  },
  {
    key: "change7d",
    title: "7d",
    align: "center",
    render: (coin) => {
      const usd = coin.quotes.find(q => q.name === "USD");
      return (
        <span className={usd ? color(usd.percentChange7d) : ""}>
          {usd ? `${usd.percentChange7d.toFixed(2)}%` : "-"}
        </span>
      );
    },
  },

  {
    key: "marketCap",
    title: "Market Cap",
    align: "right",
    render: (coin) => {
      const usd = coin.quotes.find(q => q.name === "USD");
      return usd ? `$${format(usd.marketCap)}` : "-";
    },
  },
  {
    key: "volume7d",
    title: "Volume (7d)",
    align: "right",
    render: (coin) => {
      const usd = coin.quotes.find(q => q.name === "USD");
      return usd ? `$${format(usd.volume7d)}` : "-";
    },
  },
  {
    key: "circulatingSupply",
    title: "Circulating Supply",
    align: "right",
    render: (coin) => format(coin.circulatingSupply),
  },
];
