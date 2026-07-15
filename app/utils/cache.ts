type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

class APICache {
  private static instance: APICache;
  private cache: Map<string, CacheEntry<any>>;
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

  private constructor() {
    this.cache = new Map();
  }

  public static getInstance(): APICache {
    if (!APICache.instance) {
      APICache.instance = new APICache();
    }
    return APICache.instance;
  }

  /**
   * Set a value in the cache with an optional TTL
   * @param key Cache key
   * @param value Value to cache
   * @param ttl Time to live in milliseconds (optional)
   */
  public set<T>(key: string, value: T, ttl?: number): void {
    this.cache.set(key, {
      data: value,
      timestamp: Date.now() + (ttl || this.DEFAULT_TTL),
    });
  }

  /**
   * Get a value from the cache
   * @param key Cache key
   * @returns Cached value or null if expired/not found
   */
  public get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    if (Date.now() > entry.timestamp) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  /**
   * Check if a key exists in the cache and is not expired
   * @param key Cache key
   * @returns boolean indicating if the key exists and is valid
   */
  public has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) {
      return false;
    }
    
    if (Date.now() > entry.timestamp) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  /**
   * Remove a key from the cache
   * @param key Cache key
   */
  public delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all entries from the cache
   */
  public clear(): void {
    this.cache.clear();
  }

  /**
   * Get all valid keys in the cache
   * @returns Array of valid cache keys
   */
  public keys(): string[] {
    const validKeys: string[] = [];
    this.cache.forEach((entry, key) => {
      if (Date.now() <= entry.timestamp) {
        validKeys.push(key);
      }
    });
    return validKeys;
  }
}

export const apiCache = APICache.getInstance(); 