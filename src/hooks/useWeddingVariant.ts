import { useState, useEffect } from 'react';

export type WeddingSide = 'b' | 'g';
export type WeddingVariant = 'w' | 'ew' | 'ehw';

export interface WeddingRoute {
  side: WeddingSide;
  variant: WeddingVariant;
}

function normalizeSide(val: string | null | undefined): WeddingSide | null {
  if (!val) return null;
  const clean = val.toLowerCase().trim();
  if (clean === 'b' || clean === 'bride') return 'b';
  if (clean === 'g' || clean === 'groom') return 'g';
  return null;
}

function normalizeVariant(val: string | null | undefined): WeddingVariant | null {
  if (!val) return null;
  const clean = val.toLowerCase().trim();
  if (clean === 'ehw' || clean === 'ew' || clean === 'w') return clean;
  return null;
}

function extractSideAndVariant(segments: string[]): WeddingRoute | null {
  let detectedSide: WeddingSide | null = null;
  let detectedVariant: WeddingVariant | null = null;

  for (const seg of segments) {
    const side = normalizeSide(seg);
    if (side && !detectedSide) {
      detectedSide = side;
      continue;
    }
    const variant = normalizeVariant(seg);
    if (variant && !detectedVariant) {
      detectedVariant = variant;
      continue;
    }
  }

  // If a side is detected (e.g. /b, /g, /b/w, /g/ehw)
  if (detectedSide) {
    return {
      side: detectedSide,
      variant: detectedVariant || 'ehw', // Defaults to full invite if variant is omitted
    };
  }

  return null;
}

export function parseWeddingRoute(
  pathname: string,
  hash: string,
  search: string
): WeddingRoute | null {
  // 1. Check hash route (e.g. #/b/ehw, #/g/w, #b, #g)
  const hashClean = hash.replace(/^#\/?/, '').toLowerCase().trim();
  if (hashClean) {
    const hashSegments = hashClean.split('/').filter(Boolean);
    const hashResult = extractSideAndVariant(hashSegments);
    if (hashResult) return hashResult;
  }

  // 2. Check query params (e.g. ?side=b&variant=ehw, ?s=g&v=w, ?side=b, ?side=g)
  const searchParams = new URLSearchParams(search);
  const paramSide = searchParams.get('side') || searchParams.get('s');
  const paramVariant = searchParams.get('variant') || searchParams.get('v');
  const side = normalizeSide(paramSide);
  const variant = normalizeVariant(paramVariant);
  if (side) {
    return {
      side,
      variant: variant || 'ehw',
    };
  }

  // 3. Check pathname (e.g. /b/ehw, /g/w, /b, /g, /Wedding/b/ehw)
  const segments = pathname.toLowerCase().split('/').filter(Boolean);
  const pathResult = extractSideAndVariant(segments);
  if (pathResult) return pathResult;

  // Only the base URL without any side renders 404
  return null;
}

export function useWeddingRoute(): WeddingRoute | null {
  const [route, setRoute] = useState<WeddingRoute | null>(() =>
    parseWeddingRoute(
      typeof window !== 'undefined' ? window.location.pathname : '',
      typeof window !== 'undefined' ? window.location.hash : '',
      typeof window !== 'undefined' ? window.location.search : ''
    )
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setRoute(
        parseWeddingRoute(window.location.pathname, window.location.hash, window.location.search)
      );
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  return route;
}

// Backwards-compatible hook
export function useWeddingVariant(): WeddingVariant | null {
  const route = useWeddingRoute();
  return route ? route.variant : null;
}
