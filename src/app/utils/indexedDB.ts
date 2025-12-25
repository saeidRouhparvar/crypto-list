import { openDB } from "idb";
import { MainListResponse } from "./type";

const DB_NAME = "cryptoDB";
const STORE_NAME = "mainList";

export const getDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

const getKey = (limit: number, start: number) => `mainList-limit${limit}-start${start}`;

export const saveDataToDB = async (data: MainListResponse, limit: number, start: number) => {
  const db = await getDB();
  await db.put(STORE_NAME, data, getKey(limit, start));
  console.log(`✅ Saved to IndexedDB (limit=${limit}, start=${start}):`, data);
};

export const getDataFromDB = async (limit: number, start: number): Promise<MainListResponse | null> => {
  const db = await getDB();
  const data = await db.get(STORE_NAME, getKey(limit, start));
  console.log(`📂 Read from IndexedDB (limit=${limit}, start=${start}):`, data);
  return data ?? null;
};
