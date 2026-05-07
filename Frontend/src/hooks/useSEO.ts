import { useEffect } from 'react';
import { getSEOMetadata, updateDocumentMeta } from '../lib/seo';

/**
 * Hook to update page SEO metadata
 * Usage: usePageSEO('home')
 */
export const usePageSEO = (pageName: keyof ReturnType<typeof getSEOMetadata>) => {
  useEffect(() => {
    const metadata = getSEOMetadata(pageName as never);
    updateDocumentMeta(metadata);
    
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [pageName]);
};

/**
 * Hook to update SEO with custom metadata
 */
export const useSEO = (metadata: {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}) => {
  useEffect(() => {
    updateDocumentMeta(metadata);
  }, [metadata]);
};
