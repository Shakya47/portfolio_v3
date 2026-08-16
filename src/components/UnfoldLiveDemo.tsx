import React, { useState, useEffect } from 'react';
import { Depth, DepthLevel, DepthCode } from '@unfold-mdx/react';
import { createShikiHighlighter } from '@unfold-mdx/react/shiki';
import '@unfold-mdx/react/theme.css';
import { RefreshCw, Layout, Eye, Code } from 'lucide-react';

let shikiHighlighter: any = null;
if (typeof window !== 'undefined') {
  shikiHighlighter = createShikiHighlighter({
    theme: 'vitesse-dark',
    langs: ['typescript', 'javascript'],
  });
}

export default function UnfoldLiveDemo() {
  const [isMounted, setIsMounted] = useState(false);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  const [showPane, setShowPane] = useState<'both' | 'prose' | 'code'>('both');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full p-8 brutal-border flex flex-col gap-3 bg-zinc-50 dark:bg-zinc-950 font-mono text-xs text-center border-dashed border-current">
        <span>Loading Progressive Disclosure Demo...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full text-light-border dark:text-dark-border">
      {/* Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-current pb-4">
        <div className="flex flex-wrap gap-2">
          {/* Orientation Toggle */}
          <button
            onClick={() => setOrientation(o => o === 'horizontal' ? 'vertical' : 'horizontal')}
            disabled={showPane !== 'both'}
            className="brutal-border-sm brutal-shadow-sm brutal-btn-hover bg-white dark:bg-zinc-900 px-3 py-1.5 font-mono text-[10px] font-black uppercase border-current flex items-center gap-1.5 disabled:opacity-40 disabled:pointer-events-none disabled:transform-none disabled:box-shadow-none"
            title="Toggle Split Direction"
          >
            <Layout className="w-3.5 h-3.5" />
            <span>{orientation === 'horizontal' ? 'HORIZONTAL SPLIT' : 'VERTICAL SPLIT'}</span>
          </button>

          {/* Pane View Toggle */}
          <div className="flex brutal-border-sm border-current rounded-none overflow-hidden font-mono text-[10px] font-black uppercase">
            <button
              onClick={() => setShowPane('both')}
              className={`px-3 py-1.5 border-r border-current transition-colors ${showPane === 'both' ? 'bg-[#2563EB] text-white' : 'bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            >
              BOTH
            </button>
            <button
              onClick={() => setShowPane('prose')}
              className={`px-3 py-1.5 border-r border-current transition-colors ${showPane === 'prose' ? 'bg-[#2563EB] text-white' : 'bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            >
              <Eye className="inline w-3 h-3 mr-1 align-middle" /> PROSE ONLY
            </button>
            <button
              onClick={() => setShowPane('code')}
              className={`px-3 py-1.5 transition-colors ${showPane === 'code' ? 'bg-[#2563EB] text-white' : 'bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            >
              <Code className="inline w-3 h-3 mr-1 align-middle" /> CODE ONLY
            </button>
          </div>
        </div>

        <span className="font-mono text-[9px] text-zinc-400 font-extrabold uppercase tracking-wide">
          Step through depth levels to trigger diffs
        </span>
      </div>

      {/* Main Depth Component Container */}
      <div className="brutal-border border-current p-4 md:p-6 bg-zinc-50 dark:bg-zinc-900/40 relative">
        <Depth
          show={showPane}
          orientation={orientation}
          ratio={0.45}
          indicators={true}
          buttonVariant="arrow"
          highlighter={shikiHighlighter}
          highlight={true}
        >
          {/* STEP 1 */}
          <DepthLevel label="Basic Fetch">
            This fetches data from an API when the component mounts.
            It stores the result in local state.
            The empty dependency array ensures it runs just once.
          </DepthLevel>
          <DepthCode lang="javascript" label="useFetch.js">
{`function useFetch(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setData(data));
  }, [url]);

  return data;
}`}
          </DepthCode>

          {/* STEP 2 */}
          <DepthLevel label="Race Condition Guard">
            This fetches data from an API when the component mounts.
            It stores the result in local state.
            The empty dependency array ensures it runs just once.
            To prevent race conditions when requests finish out of order, we add an ignore flag.
            We set the flag to true in the cleanup function.
          </DepthLevel>
          <DepthCode lang="javascript" label="useFetch.js">
{`function useFetch(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let ignore = false;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (!ignore) setData(data);
      });

    return () => {
      ignore = true;
    };
  }, [url]);

  return data;
}`}
          </DepthCode>

          {/* STEP 3 */}
          <DepthLevel label="Add Loading & Error State">
            This fetches data from an API when the component mounts.
            It stores the result in local state.
            The empty dependency array ensures it runs just once.
            To prevent race conditions when requests finish out of order, we add an ignore flag.
            We set the flag to true in the cleanup function.
            We also track loading and error states so the UI handles slow networks and network errors cleanly.
          </DepthLevel>
          <DepthCode lang="javascript" label="useFetch.js">
{`function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (!ignore) {
          setData(data);
          setError(null);
        }
      })
      .catch(err => {
        if (!ignore) setError(err);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [url]);

  return { data, loading, error };
}`}
          </DepthCode>
        </Depth>
      </div>

      {/* Styled Override CSS for Brutalist Theme Sync */}
      <style dangerouslySetInnerHTML={{ __html: `
        [data-unfold-root] {
          --unfold-highlight: #2563EB;
          --unfold-highlight-bg: rgba(37, 99, 235, 0.08);
          --unfold-dot-active: #2563EB;
          --unfold-code-bg: #0D0D0E;
          --unfold-code-border: var(--color-light-border);
          --unfold-btn-bg: var(--color-light-bg);
          --unfold-btn-border: var(--color-light-border);
          --unfold-btn-text: var(--color-light-border);
          --unfold-btn-hover-bg: #F4F4F5;
          --unfold-dot-bg: #D4D4D8;
        }
        
        .dark [data-unfold-root] {
          --unfold-code-border: var(--color-dark-border);
          --unfold-btn-bg: #18181B;
          --unfold-btn-border: var(--color-dark-border);
          --unfold-btn-text: var(--color-dark-border);
          --unfold-btn-hover-bg: #27272A;
          --unfold-dot-bg: #3F3F46;
        }

        [data-unfold-controls] > button {
          border-radius: 0px !important;
          border-width: 2px !important;
          border-color: currentColor !important;
          font-family: var(--font-mono) !important;
          font-weight: 900 !important;
          text-transform: uppercase !important;
          font-size: 10px !important;
        }

        [data-unfold-pane="prose"] {
          font-family: var(--font-mono) !important;
          font-size: 11px !important;
          line-height: 1.6 !important;
          color: inherit !important;
        }
        
        [data-unfold-pane="code"] {
          border-radius: 0px !important;
          border-width: 2px !important;
          border-color: currentColor !important;
        }
        
        [data-unfold-dot] {
          border-radius: 0px !important;
          width: 6px !important;
          height: 6px !important;
        }
      `}} />
    </div>
  );
}
