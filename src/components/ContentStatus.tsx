import React from 'react';
export function ContentStatus({ loading, error }: { loading: boolean; error: string }) {
  if (error.trim().toLowerCase() === 'not found') return null;
  if (!loading && !error) return null;
  return <p role={error ? 'alert' : 'status'} className="mx-auto max-w-7xl rounded-xl border border-[#ded6c5] bg-[#fffdf8] p-4 text-sm text-[#6e5532]">{error || 'Loading church content…'}</p>;
}
