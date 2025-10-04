import { unstable_cache as nextCache } from 'next/cache';
import { cache as reactCache } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any[]) => Promise<any>;

// # to be used for server-side caching of data fetching functions
// # uses both Next.js and React caching mechanisms
// revalidate option specifies the time in seconds after which the cache should be invalidated
// tags option can be used to group cache entries for easier invalidation
// keyParts is an array of strings that uniquely identify the cache entry
// e.g., for a function fetching product details by ID, keyParts could be ['product', productId]

export function cache<T extends Callback>(
  cb: T,
  keyParts: string[],
  options: { revalidate?: number | false; tags?: string[] }
) {
  return nextCache(reactCache(cb), keyParts, options);
}