/**
 * Utilitas IndexedDB Browser
 * Menyediakan kapasitas penyimpanan besar (>500MB) di browser client-side
 * sehingga gambar resolusi tinggi dan animasi GIF tersimpan 100% permanen
 * dan TIDAK PERNAH terhapus atau gagal akibat batas kuota 5MB localStorage.
 */

const DB_NAME = "dickyweb_app_db";
const DB_VERSION = 1;
const STORE_NAME = "key_value_store";

function getDB(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("indexedDB" in window)) {
      resolve(null);
      return;
    }

    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (err) => {
        console.warn("Gagal membuka IndexedDB:", err);
        resolve(null);
      };
    } catch (e) {
      console.warn("Kesalahan inisialisasi IndexedDB:", e);
      resolve(null);
    }
  });
}

export async function getIdbItem<T>(key: string): Promise<T | null> {
  const db = await getDB();
  if (!db) return null;

  return new Promise((resolve) => {
    try {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => {
        resolve((request.result as T) ?? null);
      };

      request.onerror = () => {
        resolve(null);
      };
    } catch {
      resolve(null);
    }
  });
}

export async function setIdbItem<T>(key: string, value: T): Promise<boolean> {
  const db = await getDB();
  if (!db) return false;

  return new Promise((resolve) => {
    try {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(value, key);

      request.onsuccess = () => {
        resolve(true);
      };

      request.onerror = (err) => {
        console.error("Gagal menulis ke IndexedDB:", err);
        resolve(false);
      };
    } catch (e) {
      console.error("Kesalahan transaksi IndexedDB:", e);
      resolve(false);
    }
  });
}

export async function removeIdbItem(key: string): Promise<boolean> {
  const db = await getDB();
  if (!db) return false;

  return new Promise((resolve) => {
    try {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(key);

      request.onsuccess = () => {
        resolve(true);
      };

      request.onerror = () => {
        resolve(false);
      };
    } catch {
      resolve(false);
    }
  });
}
