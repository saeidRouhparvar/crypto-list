'use client'

import { useEffect, useState } from "react";
import { useGetMainList } from "../hooks/api/useGetMainList";
import { Coin, MainListResponse } from "./utils/type";
import { saveDataToDB, getDataFromDB } from "./utils/indexedDB";
import Table from "./components/ui-kit/table/Table";
import { coinColumns } from "./components/page/column";
import FadeLoader from "./components/ui-kit/FadeLoader"; 

const REFRESH_INTERVAL = 30_000;

const Home = () => {
  const [limit, setLimit] = useState<number>(0); 
  const [itemPerPage, setItemPerPage] = useState<number>(() => {
    if (typeof window === "undefined") return 10;
    return Number(localStorage.getItem("itemPerPage")) || 10;
  });

  useEffect(() => {
    localStorage.setItem("itemPerPage", String(itemPerPage));
  }, [itemPerPage]);

  const [data, setData] = useState<MainListResponse | null>(null);

  const { refetch, isLoading } = useGetMainList({
    start: limit + 1,
    limit: itemPerPage,
    sortBy: "rank",
    sortType: "asc",
  });

  // Load data (cache first)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = await getDataFromDB(itemPerPage, limit);
        if (cachedData) {
          setData(cachedData);
          console.log("📂 Loaded from IndexedDB:", cachedData);
        } else {
          const result = await refetch();
          if (result.data) {
            setData(result.data);
            await saveDataToDB(result.data, itemPerPage, limit);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    void fetchData();
  }, [itemPerPage, limit, refetch]);

  // Refresh interval
  useEffect(() => {
    const interval = setInterval(() => {
      void (async () => {
        try {
          const result = await refetch();
          if (result.data) {
            setData(result.data);
            await saveDataToDB(result.data, itemPerPage, limit);
          }
        } catch (err) {
          console.error(err);
        }
      })();
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [itemPerPage, limit, refetch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-[5rem]">
        <FadeLoader />
      </div>
    );
  }

  const cryptoData = data?.data;
  const currentPage = Math.floor(limit / itemPerPage) + 1;

  return (
    <div className="p-2 w-full h-dvh">
      {isLoading ? <FadeLoader /> :
        <Table<Coin>
          data={cryptoData?.cryptoCurrencyList || []}
          columns={coinColumns}
          totalCount={Number(cryptoData?.totalCount)}
          page={currentPage}
          itemPerPage={itemPerPage}
          onPageChange={(p) => setLimit((p - 1) * itemPerPage)}
          onItemPerPageChange={(limit) => {
            setItemPerPage(limit);
            setLimit(0);
          }}
        />
      }
    </div>
  );
};

export default Home;
