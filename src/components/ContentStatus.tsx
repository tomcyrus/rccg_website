import React from 'react';
export function ContentStatus({ loading, error }: { loading: boolean; error: string }) {
  if (!loading && !error) return null;
  return <p role={error ? 'alert' : 'status'} className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{error || 'Loading church content…'}</p>;
}
