import { useState, useEffect } from 'react';

export type WeddingVariant = 'w' | 'ew' | 'ehw';

function parseVariant(pathname: string, hash: string, search: string): WeddingVariant | null {
  // 1. Check hash route (e.g. #/ehw, #/ew, #/w or #ehw, #ew, #w)
  const hashClean = hash.replace(/^#\/?/, '').toLowerCase().trim();
  if (hashClean === 'ehw' || hashClean === 'ew' || hashClean === 'w') {
    return hashClean;
  }

  // 2. Check pathname (e.g. /ehw, /ew, /w)
  const segments = pathname.toLowerCase().split('/').filter(Boolean);
  for (const seg of segments) {
    if (seg === 'ehw' || seg === 'ew' || seg === 'w') {
      return seg;
    }
  }

  // 3. Check search param (e.g. ?v=ehw or ?variant=ew)
  const searchParams = new URLSearchParams(search);
  const paramVariant = searchParams.get('v') || searchParams.get('variant');
  if (paramVariant) {
    const clean = paramVariant.toLowerCase().trim();
    if (clean === 'ehw' || clean === 'ew' || clean === 'w') {
      return clean;
    }
  }

  // If someone just visits the base URL without a valid route / hash, show nothing
  return null;
}

export function useWeddingVariant(): WeddingVariant | null {
  const [variant, setVariant] = useState<WeddingVariant | null>(() =>
    parseVariant(
      typeof window !== 'undefined' ? window.location.pathname : '',
      typeof window !== 'undefined' ? window.location.hash : '',
      typeof window !== 'undefined' ? window.location.search : ''
    )
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setVariant(
        parseVariant(window.location.pathname, window.location.hash, window.location.search)
      );
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  return variant;
}
