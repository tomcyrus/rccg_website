import React, { useState, useEffect } from 'react';
import { 
  ChurchEvent, 
  PrayerRequestRecord, 
  VisitorInquiryRecord, 
  AnnouncementBanner, 
  YouTubeVideoItem, 
  EbookItem,
  PageTab,
  EventStatus
} from '../types';
import { api, ApiError, errorMessage, contentChanged } from '../utils/api';
import { EbookEditor, newEbook } from '../components/EbookEditor';
import { extractYouTubeId, getYouTubeThumbnailUrl } from '../utils/youtube';
import { 
  ShieldCheck, 
  Calendar as CalendarIcon, 
  Tv, 
  BookOpen, 
  HeartHandshake, 
  UserCheck, 
  Bell, 
  Download, 
  Trash2, 
  Edit3, 
  Plus, 
  Search, 
  Check, 
  AlertCircle, 
  LogOut, 
  KeyRound, 
  Save, 
  RefreshCw, 
  ExternalLink,
  Phone,
  Mail,
  Sparkles,
  Clock,
  MapPin,
  X,
  Eye,
  Star
} from 'lucide-react';

interface AdminPageProps {
  onNavigateHome: () => void;
  onSelectTab: (tab: PageTab) => void;
}

type AdminTab = 'events' | 'videos' | 'ebooks' | 'prayers' | 'inquiries' | 'announcements' | 'backup';

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigateHome, onSelectTab }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [busy, setBusy] = useState(false);
  const [dataError, setDataError] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('events');
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [prayers, setPrayers] = useState<PrayerRequestRecord[]>([]);
  const [inquiries, setInquiries] = useState<VisitorInquiryRecord[]>([]);
  const [announcement, setAnnouncement] = useState<AnnouncementBanner>({ id: 'main', isActive: false, message: '', type: 'notice', targetTab: 'home' });
  const [videos, setVideos] = useState<YouTubeVideoItem[]>([]);
  const [ebooks, setEbooks] = useState<EbookItem[]>([]);

  const clearPrivateData = () => { setPrayers([]); setInquiries([]); };
  const loadData = async () => {
    const [ev, pr, iq, an, vi, eb] = await Promise.all([
      api<ChurchEvent[]>('/admin/events'), api<PrayerRequestRecord[]>('/admin/prayers'),
      api<VisitorInquiryRecord[]>('/admin/inquiries'), api<AnnouncementBanner[]>('/admin/announcements'),
      api<YouTubeVideoItem[]>('/admin/videos'), api<EbookItem[]>('/admin/ebooks'),
    ]);
    setEvents(ev); setPrayers(pr); setInquiries(iq); setVideos(vi); setEbooks(eb);
    setAnnouncement(an[0] || { id: 'main', isActive: false, message: '', type: 'notice', targetTab: 'home' });
    setDataError('');
  };
  useEffect(() => {
    let active = true;
    api('/auth/me').then(() => {
      if (active) { setIsAuthenticated(true); return loadData(); }
    }).catch(err => {
      if (active) { setIsAuthenticated(false); clearPrivateData(); if (!(err instanceof ApiError && [401, 403].includes(err.status))) setAuthError(errorMessage(err)); }
    }).finally(() => { if (active) setCheckingSession(false); });
    return () => { active = false; };
  }, []);
  useEffect(() => { setStatusFilter('all'); setSearchTerm(''); }, [activeTab]);

  // UI Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Modal edit states
  const [editingEvent, setEditingEvent] = useState<ChurchEvent | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const [editingVideo, setEditingVideo] = useState<YouTubeVideoItem | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const [editingEbook, setEditingEbook] = useState<EbookItem | null>(null);
  const [isEbookModalOpen, setIsEbookModalOpen] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleFailure = (err: unknown) => {
    setDataError(errorMessage(err));
    if (err instanceof ApiError && [401, 403].includes(err.status)) {
      clearPrivateData(); setIsAuthenticated(false); setAuthError(errorMessage(err));
    }
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setAuthError('');
    try {
      await api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password: passcode }) });
      setPasscode('');
      await loadData();
      setIsAuthenticated(true);
    } catch (err) { setAuthError(errorMessage(err)); }
    finally { setBusy(false); }
  };
  const handleLogout = async () => {
    setBusy(true);
    try { await api('/auth/logout', { method: 'POST' }); }
    catch (err) { setAuthError(errorMessage(err)); }
    finally { clearPrivateData(); setIsAuthenticated(false); setBusy(false); }
  };
  const reload = async () => {
    setBusy(true);
    try { await loadData(); triggerToast('Church records refreshed.'); }
    catch (err) { handleFailure(err); }
    finally { setBusy(false); }
  };

  // Write only the changed record; never replace a collection or erase new submissions.
  const saveCollection = async <T extends { id: string; revision?: number },>(kind: string, before: T[], after: T[], setter: (rows: T[]) => void) => {
    if (busy) return false;
    setBusy(true); setDataError('');
    try {
      const removed = before.filter(old => !after.some(item => item.id === old.id));
      const changed = after.filter(item => JSON.stringify(item) !== JSON.stringify(before.find(old => old.id === item.id)));
      if (removed.length + changed.length === 0) return true;
      if (removed.length + changed.length !== 1) throw new Error('Please save one record at a time.');
      for (const item of removed) await api(`/admin/${kind}/${item.id}`, { method: 'DELETE', headers: { 'If-Match': String(item.revision) } });
      for (const item of changed) {
        const exists = before.some(old => old.id === item.id);
        await api(`/admin/${kind}${exists ? `/${item.id}` : ''}`, {
          method: exists ? 'PUT' : 'POST', headers: exists ? { 'If-Match': String(item.revision) } : {}, body: JSON.stringify(item),
        });
      }
      setter(await api<T[]>(`/admin/${kind}`));
      contentChanged(); triggerToast('Changes saved.'); return true;
    } catch (err) { handleFailure(err); return false; }
    finally { setBusy(false); }
  };
  const handleSaveEvents = (updated: ChurchEvent[]) => saveCollection('events', events, updated, setEvents);
  const handleSavePrayers = (updated: PrayerRequestRecord[]) => saveCollection('prayers', prayers, updated, setPrayers);
  const handleSaveInquiries = (updated: VisitorInquiryRecord[]) => saveCollection('inquiries', inquiries, updated, setInquiries);
  const handleSaveVideos = (updated: YouTubeVideoItem[]) => saveCollection('videos', videos, updated, setVideos);
  const handleSaveEbooks = (updated: EbookItem[]) => saveCollection('ebooks', ebooks, updated, setEbooks);
  const handleSaveAnnouncement = async (updated: AnnouncementBanner) => {
    setBusy(true); setDataError('');
    try {
      setAnnouncement(await api<AnnouncementBanner>(`/admin/announcements${updated.revision ? `/${updated.id}` : ''}`, {
        method: updated.revision ? 'PUT' : 'POST', headers: updated.revision ? { 'If-Match': String(updated.revision) } : {}, body: JSON.stringify(updated),
      }));
      contentChanged(); triggerToast('Announcement saved.');
    } catch (err) { handleFailure(err); }
    finally { setBusy(false); }
  };

  // Event Handlers
  const handleToggleEventStatus = (eventId: string, newStatus: EventStatus) => {
    const updated = events.map(e => e.id === eventId ? { ...e, status: newStatus } : e);
    handleSaveEvents(updated);
  };

  const handleDeleteEvent = (eventId: string) => {
    if (confirm('Are you sure you want to remove this church activity from the calendar?')) {
      const updated = events.filter(e => e.id !== eventId);
      handleSaveEvents(updated);
    }
  };

  const handleSaveEventForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;
    const exists = events.some(ev => ev.id === editingEvent.id);
    const updated = exists
      ? events.map(ev => ev.id === editingEvent.id ? editingEvent : ev)
      : [editingEvent, ...events];
    if (await handleSaveEvents(updated)) {
      setIsEventModalOpen(false); setEditingEvent(null);
    }
  };

  // Video Handlers
  const handleDeleteVideo = (videoId: string) => {
    if (confirm('Are you sure you want to delete this video from the gallery?')) {
      const updated = videos.filter(v => v.id !== videoId);
      handleSaveVideos(updated);
    }
  };

  const handleToggleFeaturedVideo = (videoId: string) => {
    const updated = videos.map(v => v.id === videoId ? { ...v, isFeatured: !v.isFeatured } : v);
    handleSaveVideos(updated);
  };

  // Prayer Handlers
  const handleUpdatePrayerStatus = (prayerId: string, status: PrayerRequestRecord['status']) => {
    const updated = prayers.map(p => p.id === prayerId ? { ...p, status } : p);
    handleSavePrayers(updated);
  };

  const handleUpdatePrayerNotes = (prayerId: string, notes: string) => {
    const updated = prayers.map(p => p.id === prayerId ? { ...p, pastoralNotes: notes } : p);
    handleSavePrayers(updated);
  };

  const handleDeletePrayer = (prayerId: string) => {
    if (confirm('Remove this prayer request from record?')) {
      const updated = prayers.filter(p => p.id !== prayerId);
      handleSavePrayers(updated);
    }
  };

  // Inquiry Handlers
  const handleUpdateInquiryStatus = (inquiryId: string, status: VisitorInquiryRecord['status']) => {
    const updated = inquiries.map(i => i.id === inquiryId ? { ...i, status } : i);
    handleSaveInquiries(updated);
  };

  const handleUpdateInquiryHost = (inquiryId: string, host: string) => {
    const updated = inquiries.map(i => i.id === inquiryId ? { ...i, assignedTo: host } : i);
    handleSaveInquiries(updated);
  };

  const handleDeleteInquiry = (inquiryId: string) => {
    if (confirm('Remove this guest record?')) {
      const updated = inquiries.filter(i => i.id !== inquiryId);
      handleSaveInquiries(updated);
    }
  };

  const handleExportBackup = async () => {
    setBusy(true);
    try {
      const payload = await api('/admin/backup');
      const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }));
      const a = document.createElement('a'); a.href = url;
      a.download = `RCCG_KFA_Backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.click(); URL.revokeObjectURL(url); triggerToast('Backup downloaded. Keep this file private.');
    } catch (err) { handleFailure(err); }
    finally { setBusy(false); }
  };

  if (checkingSession) return <div role="status" className="p-16 text-center">Checking admin session…</div>;

  // Unauthenticated Gate Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#071324] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0A192F] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg">
              <ShieldCheck className="w-9 h-9" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold">
                RCCG Kingdom First Assembly
              </div>
              <h1 className="text-2xl font-serif font-bold text-white tracking-tight">
                Church Administration Portal
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Manage services, calendar, YouTube streams, e-books, prayers, and visitor desks.
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block text-xs text-amber-300">Admin email
              <input type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-xl bg-black/40 border border-white/20 p-3 text-white" />
            </label>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setAuthError('');
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
              </div>
              {authError && (
                <div className="text-xs text-red-400 flex items-center gap-1.5 pt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{authError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={busy}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{busy ? 'Signing in…' : 'Sign in to Admin Console'}</span>
              <ShieldCheck className="w-4 h-4" />
            </button>

            <p className="text-xs text-slate-400">Access is limited to accounts approved by the church administrator. Contact the project owner if you need access or a password reset.</p>
          </form>

          <div className="pt-4 border-t border-white/10 text-center">
            <button
              onClick={onNavigateHome}
              className="text-xs text-slate-400 hover:text-amber-300 transition-colors"
            >
              ← Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Portal View
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#0A192F] font-sans pb-20">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0A192F] text-amber-300 border border-amber-400/40 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm animate-in slide-in-from-bottom duration-300">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Admin Top Header Navigation */}
      <div className="bg-[#0A192F] text-white border-b border-amber-500/20 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-amber-300 font-bold">
                RCCG KFA Operations Console
              </div>
              <h1 className="text-base sm:text-lg font-serif font-bold text-white tracking-tight">
                Church Activities Administration
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onNavigateHome}
              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Live Site</span>
            </button>

            <button
              onClick={handleLogout}
              disabled={busy}
              className="px-3.5 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock / Exit</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto scrollbar-none py-2 text-xs">
          {[
            { key: 'events', label: 'Calendar & Services', count: events.length, icon: CalendarIcon },
            { key: 'videos', label: 'YouTube Videos', count: videos.length, icon: Tv },
            { key: 'ebooks', label: 'E-Books & Manuals', count: ebooks.length, icon: BookOpen },
            { key: 'prayers', label: 'Prayer Pipeline', count: prayers.filter(p => p.status === 'new').length, icon: HeartHandshake, badgeNew: true },
            { key: 'inquiries', label: 'Guest Desks & Visits', count: inquiries.filter(i => i.status === 'new').length, icon: UserCheck, badgeNew: true },
            { key: 'announcements', label: 'Live Banner Alert', active: announcement.isActive, icon: Bell },
            { key: 'backup', label: 'Backup & Settings', icon: Download },
          ].map((tab) => {
            const isActive = activeTab === tab.key;
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as AdminTab)}
                className={`px-3.5 py-2 rounded-xl font-medium whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {typeof tab.count === 'number' && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? 'bg-slate-950 text-amber-300' : 'bg-white/10 text-slate-300'
                  }`}>
                    {tab.count}
                  </span>
                )}
                {tab.active && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-4 flex flex-wrap items-center gap-3">
        <button type="button" disabled={busy} onClick={reload} className="rounded-lg border border-stone-300 px-4 py-2 text-sm">Reload data</button>
        {busy && <span role="status">Saving / loading…</span>}
        {dataError && <p role="alert" className="text-red-700">{dataError}</p>}
      </div>
      {['events', 'videos', 'ebooks', 'prayers', 'inquiries'].includes(activeTab) && <div className="max-w-7xl mx-auto px-4 pt-3"><input aria-label="Search records" placeholder="Search records…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full max-w-md border border-stone-300 rounded-xl px-4 py-2" /></div>}
      <fieldset disabled={busy} className="disabled:opacity-70">
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Scheduled Events</div>
            <div className="text-2xl font-serif font-bold text-emerald-900 mt-1">{events.length}</div>
            <div className="text-[10px] text-stone-400">Services &amp; Programs</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">YouTube Sermons</div>
            <div className="text-2xl font-serif font-bold text-red-600 mt-1">{videos.length}</div>
            <div className="text-[10px] text-stone-400">Streamed &amp; Archived</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">E-Books Library</div>
            <div className="text-2xl font-serif font-bold text-amber-700 mt-1">{ebooks.length}</div>
            <div className="text-[10px] text-stone-400">Active Publications</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Prayer Requests</div>
            <div className="text-2xl font-serif font-bold text-blue-900 mt-1">{prayers.length}</div>
            <div className="text-[10px] text-amber-600 font-semibold">{prayers.filter(p => p.status === 'new').length} need intercession</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Guest Inquiries</div>
            <div className="text-2xl font-serif font-bold text-purple-900 mt-1">{inquiries.length}</div>
            <div className="text-[10px] text-emerald-600 font-semibold">{inquiries.filter(i => i.status === 'new').length} new visits planned</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Alert Banner</div>
            <div className={`text-base font-bold mt-2 flex items-center gap-1.5 ${announcement.isActive ? 'text-emerald-700' : 'text-stone-400'}`}>
              <span className={`w-2.5 h-2.5 rounded-full ${announcement.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-stone-300'}`} />
              <span>{announcement.isActive ? 'Broadcasting' : 'Muted'}</span>
            </div>
            <div className="text-[10px] text-stone-400">Site Header Strip</div>
          </div>
        </div>

        {/* ----------------- TAB 1: CALENDAR & EVENTS ----------------- */}
        {activeTab === 'events' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#0A192F]">
                  Church Calendar &amp; Service Activities
                </h2>
                <p className="text-xs text-stone-500">
                  Manage Sunday worship, midweek Bible study, vigils, community outreaches, and special conferences.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingEvent({
                    id: `event-${Date.now()}`,
                    title: '',
                    category: 'worship',
                    categoryLabel: 'Worship Service',
                    dateBadge: { month: 'SUN', day: '25', subtext: 'WEEKLY' },
                    dayOfWeek: 'Every Sunday',
                    time: '10:00 AM – 12:30 PM EST',
                    frequency: 'Weekly Gathering',
                    location: '121 E 2nd Ave, Roselle, NJ',
                    description: '',
                    highlights: ['Family ministry available', 'Fellowship reception'],
                    coordinator: 'Pastoral Team',
                    status: 'scheduled'
                  });
                  setDataError(''); setIsEventModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wide shadow-md flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Activity</span>
              </button>
            </div>

            {/* Events List */}
            <div className="space-y-4">
              {events.filter(item => JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())).map((evt) => (
                <div
                  key={evt.id}
                  className="p-5 rounded-2xl border border-stone-200 hover:border-amber-400/50 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-stone-50/50"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                        {evt.categoryLabel}
                      </span>
                      <span className="text-xs font-semibold text-stone-500">
                        {evt.dayOfWeek} · {evt.time}
                      </span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        evt.status === 'live' 
                          ? 'bg-red-500 text-white animate-pulse'
                          : evt.status === 'completed'
                          ? 'bg-stone-200 text-stone-600'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {evt.status || 'scheduled'}
                      </span>
                    </div>

                    <h3 className="text-base font-serif font-bold text-[#0A192F]">
                      {evt.title}
                    </h3>

                    <div className="text-xs text-stone-600 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>{evt.location}</span>
                      </span>
                      {evt.coordinator && (
                        <span>Lead: <strong>{evt.coordinator}</strong></span>
                      )}
                      {evt.scriptureRef && (
                        <span className="text-amber-800 italic">({evt.scriptureRef})</span>
                      )}
                    </div>

                    <p className="text-xs text-stone-500 line-clamp-2">
                      {evt.description}
                    </p>
                  </div>

                  {/* Actions & Status Controls */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-stone-200">
                    <select
                      value={evt.status || 'scheduled'}
                      onChange={(e) => handleToggleEventStatus(evt.id, e.target.value as EventStatus)}
                      className="px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 bg-white font-medium cursor-pointer"
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="live">🔴 Live Today</option>
                      <option value="completed">Completed</option>
                      <option value="postponed">Postponed</option>
                    </select>

                    <button
                      onClick={() => {
                        setEditingEvent({ ...evt });
                        setDataError(''); setIsEventModalOpen(true);
                      }}
                      className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                      title="Edit Event"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteEvent(evt.id)}
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                      title="Delete Event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- TAB 2: YOUTUBE VIDEOS ----------------- */}
        {activeTab === 'videos' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#0A192F]">
                  YouTube Video Gallery &amp; Sermons
                </h2>
                <p className="text-xs text-stone-500">
                  Manage livestreams, Sunday sermon recordings, and praise sessions. Featured video appears on the homepage.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingVideo({
                    id: `vid-${Date.now()}`,
                    youtubeId: '',
                    youtubeUrl: '',
                    title: '',
                    speaker: 'Resident Pastor & Ministers',
                    category: 'sunday-service',
                    categoryLabel: 'SUNDAY CELEBRATION',
                    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                    duration: '1 hr 15 min',
                    description: '',
                    isCustomAdded: true,
                  });
                  setDataError(''); setIsVideoModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-semibold text-xs tracking-wide shadow-md flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add YouTube Stream</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.filter(item => JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())).map((vid) => (
                <div key={vid.id} className="border border-stone-200 rounded-2xl overflow-hidden bg-stone-50/50 flex flex-col justify-between">
                  <div>
                    <div className="aspect-video bg-black relative">
                      <img
                        src={getYouTubeThumbnailUrl(vid.youtubeId)}
                        alt={vid.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
                        {vid.duration}
                      </div>
                      {vid.isFeatured && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold">
                          ★ Featured Hero
                        </div>
                      )}
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="text-[10px] uppercase font-bold text-amber-700">{vid.categoryLabel}</div>
                      <h4 className="text-sm font-serif font-bold text-[#0A192F] line-clamp-2">{vid.title}</h4>
                      <div className="text-xs text-stone-600">Speaker: <strong>{vid.speaker}</strong></div>
                      {vid.scriptureRef && <div className="text-xs text-amber-800 italic truncate">{vid.scriptureRef}</div>}
                    </div>
                  </div>

                  <div className="p-4 pt-2 border-t border-stone-200 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleToggleFeaturedVideo(vid.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                        vid.isFeatured ? 'bg-amber-100 text-amber-800' : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${vid.isFeatured ? 'fill-amber-500 text-amber-500' : ''}`} />
                      <span>{vid.isFeatured ? 'Featured' : 'Make Featured'}</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button title="Edit video" onClick={() => { setEditingVideo(vid); setDataError(''); setIsVideoModalOpen(true); }} className="p-2 rounded-lg bg-stone-100"><Edit3 className="w-3.5 h-3.5" /></button>
                      <a
                        href={vid.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600"
                        title="Watch on YouTube"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleDeleteVideo(vid.id)}
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                        title="Delete video"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- TAB 3: E-BOOKS ----------------- */}
        {activeTab === 'ebooks' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#0A192F]">
                  Spiritual Library &amp; E-Books
                </h2>
                <p className="text-xs text-stone-500">
                  Manage devotionals, study guides, and discipleship manuals. Readers can preview chapter 1 and download study guides.
                </p>
              </div>

              <div className="text-xs text-stone-500">
                <strong>{ebooks.length}</strong> Publications Published
                <button onClick={() => { setEditingEbook(newEbook()); setDataError(''); setIsEbookModalOpen(true); }} className="ml-3 rounded-full bg-emerald-800 px-4 py-2 text-white">Add e-book</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ebooks.filter(item => JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())).map((bk) => (
                <div key={bk.id} className="border border-stone-200 rounded-2xl overflow-hidden bg-stone-50/50 flex flex-col justify-between">
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      {bk.categoryLabel}
                    </span>
                    <h4 className="text-sm font-serif font-bold text-[#0A192F] line-clamp-2">{bk.title}</h4>
                    <div className="text-xs text-stone-600 font-medium">By {bk.author}</div>
                    <div className="text-xs text-stone-400">{bk.pages} Pages · {bk.format} · Rating: {bk.rating}★</div>
                    <p className="text-xs text-stone-500 line-clamp-3 pt-1">{bk.description}</p>
                  </div>

                  <div className="p-4 pt-2 border-t border-stone-200 flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-800">
                      <button onClick={() => { setEditingEbook(bk); setDataError(''); setIsEbookModalOpen(true); }} className="mr-2 underline">Edit</button>
                      <button className="text-red-700" onClick={() => { if (confirm('Delete this e-book?')) void handleSaveEbooks(ebooks.filter(b => b.id !== bk.id)); }}>Delete</button>
                    </span>
                    <button
                      onClick={() => {
                        const updated = ebooks.map(b => b.id === bk.id ? { ...b, isFeatured: !b.isFeatured } : b);
                        handleSaveEbooks(updated);
                      }}
                      className={`p-1.5 rounded-lg ${bk.isFeatured ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-stone-200 text-stone-600'}`}
                      title="Toggle Featured on Library"
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- TAB 4: PRAYER PIPELINE ----------------- */}
        {activeTab === 'prayers' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#0A192F]">
                  Pastoral Prayer Request Pipeline
                </h2>
                <p className="text-xs text-stone-500">
                  Review and intercede for community petitions, health healing requests, and answered praise testimonies.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-stone-600">Filter Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white font-medium"
                >
                  <option value="all">All ({prayers.length})</option>
                  <option value="new">New ({prayers.filter(p => p.status === 'new').length})</option>
                  <option value="interceding">In Intercession ({prayers.filter(p => p.status === 'interceding').length})</option>
                  <option value="answered">Answered Testimonies ({prayers.filter(p => p.status === 'answered').length})</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {prayers
                .filter(p => (statusFilter === 'all' || p.status === statusFilter) && JSON.stringify(p).toLowerCase().includes(searchTerm.toLowerCase()))
                .map((pr) => (
                  <div
                    key={pr.id}
                    className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-serif font-bold text-base text-[#0A192F]">
                          {pr.name}
                        </span>
                        <span className="text-xs text-stone-400">· {new Date(pr.submittedAt).toLocaleString()}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                          {pr.category}
                        </span>
                        {pr.isConfidential && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-stone-200 text-stone-700">
                            🔒 Confidential
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={pr.status}
                          onChange={(e) => handleUpdatePrayerStatus(pr.id, e.target.value as PrayerRequestRecord['status'])}
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${
                            pr.status === 'new'
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : pr.status === 'interceding'
                              ? 'bg-blue-100 text-blue-900 border-blue-300'
                              : pr.status === 'answered'
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                              : 'bg-stone-100 text-stone-700 border-stone-300'
                          }`}
                        >
                          <option value="new">New Request</option>
                          <option value="interceding">Under Intercession</option>
                          <option value="answered">Answered / Testimony</option>
                          <option value="archived">Archived</option>
                        </select>

                        <button
                          onClick={() => handleDeletePrayer(pr.id)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete prayer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-700 italic bg-white p-3.5 rounded-xl border border-stone-200/80">
                      "{pr.requestText}"
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1">
                      <div className="flex items-center gap-3 text-stone-500">
                        {pr.email && (
                          <a href={`mailto:${pr.email}`} className="hover:text-emerald-800 flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5" />
                            <span>{pr.email}</span>
                          </a>
                        )}
                        {pr.phone && (
                          <a href={`tel:${pr.phone}`} className="hover:text-emerald-800 flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5" />
                            <span>{pr.phone}</span>
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-2 flex-1 max-w-md">
                        <span className="text-[10px] font-bold uppercase text-stone-400 shrink-0">Pastoral Note:</span>
                        <input
                          type="text"
                          placeholder="Add pastoral notes..."
                          aria-label={`Pastoral note for ${pr.name}`}
                          key={`${pr.id}-${pr.revision}`}
                          defaultValue={pr.pastoralNotes || ''}
                          onBlur={(e) => { if (e.target.value !== (pr.pastoralNotes || '')) void handleUpdatePrayerNotes(pr.id, e.target.value); }}
                          className="w-full px-2.5 py-1 text-xs rounded-lg border border-stone-300 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ----------------- TAB 5: GUEST DESK & INQUIRIES ----------------- */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#0A192F]">
                  Visitor Inquiries &amp; "Plan a Visit" Desk
                </h2>
                <p className="text-xs text-stone-500">
                  Track first-time guests, ministry inquiries, and welcome coordination for upcoming Sunday services.
                </p>
              </div>

              <div className="text-xs text-stone-500">
                <strong>{inquiries.filter(i => i.status === 'new').length}</strong> uncontacted visitors
              </div>
            </div>

            <div className="space-y-4">
              {inquiries.filter(i => JSON.stringify(i).toLowerCase().includes(searchTerm.toLowerCase())).map((inq) => (
                <div
                  key={inq.id}
                  className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-serif font-bold text-base text-[#0A192F]">
                        {inq.fullName}
                      </span>
                      <span className="text-xs text-stone-400">· {new Date(inq.submittedAt).toLocaleString()}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                        {inq.inquiryType}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={inq.status}
                        onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as VisitorInquiryRecord['status'])}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${
                          inq.status === 'new'
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : inq.status === 'contacted'
                            ? 'bg-blue-100 text-blue-900 border-blue-300'
                            : inq.status === 'welcomed'
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : 'bg-stone-100 text-stone-700 border-stone-300'
                        }`}
                      >
                        <option value="new">New Submission</option>
                        <option value="contacted">Welcome Call Made</option>
                        <option value="welcomed">Welcomed in Sanctuary</option>
                        <option value="followed-up">Followed Up</option>
                      </select>

                      <button
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete guest"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 bg-white p-3.5 rounded-xl border border-stone-200/80">
                    "{inq.message || 'Expressed desire to attend Sunday worship with family.'}"
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                    <div className="flex items-center gap-4 text-stone-600">
                      {inq.email && (
                        <a href={`mailto:${inq.email}`} className="hover:text-emerald-800 flex items-center gap-1 font-medium">
                          <Mail className="w-3.5 h-3.5 text-stone-400" />
                          <span>{inq.email}</span>
                        </a>
                      )}
                      {inq.phone && (
                        <a href={`tel:${inq.phone}`} className="hover:text-emerald-800 flex items-center gap-1 font-medium">
                          <Phone className="w-3.5 h-3.5 text-stone-400" />
                          <span>{inq.phone}</span>
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-xs">Pastoral note<input key={`note-${inq.id}-${inq.revision}`} aria-label={`Pastoral note for ${inq.fullName}`} defaultValue={inq.pastoralNotes || ''} onBlur={e => { if (e.target.value !== (inq.pastoralNotes || '')) void handleSaveInquiries(inquiries.map(i => i.id === inq.id ? { ...i, pastoralNotes: e.target.value } : i)); }} className="block border rounded p-1" /></label>
                      <span className="text-[10px] font-bold uppercase text-stone-400">Assigned Host:</span>
                      <input
                        type="text"
                        placeholder="e.g. Deaconess Ade"
                        aria-label={`Assigned host for ${inq.fullName}`}
                        key={`${inq.id}-${inq.revision}`}
                        defaultValue={inq.assignedTo || ''}
                        onBlur={(e) => { if (e.target.value !== (inq.assignedTo || '')) void handleUpdateInquiryHost(inq.id, e.target.value); }}
                        className="px-2.5 py-1 text-xs rounded-lg border border-stone-300 bg-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- TAB 6: LIVE ANNOUNCEMENT BANNER ----------------- */}
        {activeTab === 'announcements' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm max-w-3xl">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#0A192F]">
                Website Live Alert &amp; Announcement Strip
              </h2>
              <p className="text-xs text-stone-500">
                Display a priority announcement banner right at the very top of the website for all visitors.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveAnnouncement(announcement);
              }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <div>
                  <div className="text-sm font-bold text-stone-900">Broadcast Alert Banner</div>
                  <div className="text-xs text-stone-500">Enable or disable banner visibility across all pages.</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={announcement.isActive}
                    onChange={(e) => setAnnouncement({ ...announcement, isActive: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                  Announcement Message Text
                </label>
                <textarea
                  rows={3}
                  required
                  value={announcement.message}
                  onChange={(e) => setAnnouncement({ ...announcement, message: e.target.value })}
                  placeholder="e.g. Special Holy Communion Service this Wednesday at 7:00 PM!"
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                    Banner Theme Style
                  </label>
                  <select
                    value={announcement.type}
                    onChange={(e) => setAnnouncement({ ...announcement, type: e.target.value as AnnouncementBanner['type'] })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-sm"
                  >
                    <option value="celebration">Celebration (Emerald &amp; Gold)</option>
                    <option value="notice">Standard Ministry Notice (Midnight Navy)</option>
                    <option value="urgent">Urgent Schedule Change (Amber Gold)</option>
                    <option value="broadcast">Live Stream / Broadcast (Crimson Red)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                    Action Button Label (Optional)
                  </label>
                  <input
                    type="text"
                    value={announcement.actionLabel || ''}
                    onChange={(e) => setAnnouncement({ ...announcement, actionLabel: e.target.value })}
                    placeholder="e.g. View Calendar or Watch Live"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="text-xs">Link to page<select aria-label="Announcement target page" className="block w-full border rounded-lg p-2" value={announcement.targetTab || 'home'} onChange={e => setAnnouncement({ ...announcement, targetTab: e.target.value as PageTab })}>{['home', 'about', 'videos', 'ebooks', 'gallery', 'connect'].map(tab => <option key={tab} value={tab}>{tab}</option>)}</select></label>
                <label className="text-xs">External link (optional, overrides page)<input type="url" placeholder="https://…" className="block w-full border rounded-lg p-2" value={announcement.actionUrl || ''} onChange={e => setAnnouncement({ ...announcement, actionUrl: e.target.value })} /></label>
              </div>
              {/* Live Preview of Banner */}
              <div className="space-y-1.5 pt-2">
                <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">Live Banner Preview:</div>
                <div className={`p-3 rounded-xl text-xs font-medium flex items-center justify-between gap-3 text-white ${
                  announcement.type === 'celebration'
                    ? 'bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 border border-emerald-500/30'
                    : announcement.type === 'urgent'
                    ? 'bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 text-amber-100 border border-amber-500/30'
                    : announcement.type === 'broadcast'
                    ? 'bg-gradient-to-r from-red-800 via-red-700 to-red-800 border border-red-500/30'
                    : 'bg-[#0A192F] border border-amber-500/20'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>{announcement.message}</span>
                  </div>
                  {announcement.actionLabel && (
                    <span className="underline font-bold text-amber-300 shrink-0">{announcement.actionLabel} →</span>
                  )}
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wide shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Banner Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ----------------- TAB 7: BACKUP & SYSTEM ----------------- */}
        {activeTab === 'backup' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm max-w-2xl">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#0A192F]">
                Data Management &amp; System Backup
              </h2>
              <p className="text-xs text-stone-500">
                Export current church records anytime. Backups contain confidential pastoral information; store them securely.
              </p>
            </div>

            <form className="space-y-3 rounded-xl border p-5" onSubmit={async e => {
              e.preventDefault(); setBusy(true); setDataError('');
              try {
                await api('/auth/password', { method: 'POST', body: JSON.stringify({ currentPassword, newPassword }) });
                setCurrentPassword(''); setNewPassword(''); triggerToast('Your password has been changed.');
              } catch (err) { handleFailure(err); }
              finally { setBusy(false); }
            }}>
              <h3 className="font-semibold">Change your password</h3>
              <label className="block text-sm">Current password<input type="password" autoComplete="current-password" required value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="block w-full rounded-lg border p-2" /></label>
              <label className="block text-sm">New password (12 characters minimum)<input type="password" autoComplete="new-password" required minLength={12} maxLength={128} value={newPassword} onChange={e => setNewPassword(e.target.value)} className="block w-full rounded-lg border p-2" /></label>
              <button className="rounded-full bg-emerald-800 px-5 py-2 text-white text-sm">Change password</button>
            </form>
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="font-bold text-sm text-[#0A192F] flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-700" />
                  <span>Export Full Church Data Backup (JSON)</span>
                </div>
                <p className="text-xs text-stone-600">
                  Downloads a complete snapshot of all calendar events, prayer petitions, guest records, and video archives.
                </p>
                <button
                  onClick={handleExportBackup}
                  className="px-5 py-2.5 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Backup File</span>
                </button>
              </div>

              <p className="text-xs text-stone-600">Ask the project owner to add or remove approved administrator accounts. Use Reload data to retrieve the latest changes.</p>
            </div>
          </div>
        )}
      </div>

      {/* Event Add/Edit Modal */}
      {isEventModalOpen && editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden my-auto">
            <div className="bg-[#0A192F] text-white px-6 py-4 flex items-center justify-between border-b border-amber-500/20">
              <h3 className="font-serif font-bold text-lg text-white">
                {editingEvent.id ? 'Edit Church Activity' : 'Add New Church Activity'}
              </h3>
              <button
                onClick={() => setIsEventModalOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEventForm} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              {dataError && <p role="alert" className="text-red-700">{dataError}</p>}
              <div className="space-y-1">
                <label className="font-semibold uppercase tracking-wider text-stone-700">Event / Activity Title *</label>
                <input
                  type="text"
                  required
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  placeholder="e.g. Sunday Celebration Worship Service"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold uppercase tracking-wider text-stone-700">Category</label>
                  <select
                    value={editingEvent.category}
                    onChange={(e) => {
                      const cat = e.target.value as ChurchEvent['category'];
                      const labels: Record<ChurchEvent['category'], string> = {
                        worship: 'Worship Service',
                        'bible-study': 'Bible Study',
                        outreach: 'Community Outreach',
                        special: 'Special Gathering'
                      };
                      setEditingEvent({ ...editingEvent, category: cat, categoryLabel: labels[cat] });
                    }}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white"
                  >
                    <option value="worship">Worship Service</option>
                    <option value="bible-study">Bible Study &amp; Discipleship</option>
                    <option value="outreach">Community Outreach &amp; Food Pantry</option>
                    <option value="special">Special Conference / Vigil / Youth</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold uppercase tracking-wider text-stone-700">Status</label>
                  <select
                    value={editingEvent.status || 'scheduled'}
                    onChange={(e) => setEditingEvent({ ...editingEvent, status: e.target.value as EventStatus })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="live">🔴 Live Today</option>
                    <option value="completed">Completed</option>
                    <option value="postponed">Postponed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold uppercase tracking-wider text-stone-700">Day / Frequency</label>
                  <input
                    type="text"
                    required
                    value={editingEvent.dayOfWeek}
                    onChange={(e) => setEditingEvent({ ...editingEvent, dayOfWeek: e.target.value })}
                    placeholder="e.g. Every Sunday or 1st Friday"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold uppercase tracking-wider text-stone-700">Time</label>
                  <input
                    type="text"
                    required
                    value={editingEvent.time}
                    onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                    placeholder="e.g. 10:00 AM – 12:30 PM EST"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold uppercase tracking-wider text-stone-700">Location</label>
                  <input
                    type="text"
                    required
                    value={editingEvent.location}
                    onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                    placeholder="e.g. 121 E 2nd Ave, Roselle, NJ"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold uppercase tracking-wider text-stone-700">Ministry Coordinator</label>
                  <input
                    type="text"
                    value={editingEvent.coordinator || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, coordinator: e.target.value })}
                    placeholder="e.g. Pastoral Team or Youth Band"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {(['month', 'day', 'subtext'] as const).map(key => <label key={key}>Date badge {key}<input aria-label={`Date badge ${key}`} className="w-full border rounded p-2" value={editingEvent.dateBadge[key] || ''} onChange={e => setEditingEvent({ ...editingEvent, dateBadge: { ...editingEvent.dateBadge, [key]: e.target.value } })} /></label>)}
              </div>
              <label className="block"><input type="checkbox" checked={!!editingEvent.rsvpRequired} onChange={e => setEditingEvent({ ...editingEvent, rsvpRequired: e.target.checked })} /> Accept event RSVPs</label>
              <div className="space-y-1">
                <label className="font-semibold uppercase tracking-wider text-stone-700">Description</label>
                <textarea
                  rows={2}
                  required
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  placeholder="Details about what takes place during this activity..."
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-stone-900"
                />
              </div>

              <div className="pt-3 border-t flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="px-4 py-2 rounded-full text-stone-600 hover:text-stone-900 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-emerald-800 text-white font-bold shadow-md cursor-pointer"
                >
                  Save Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Add/Edit Modal */}
      {isVideoModalOpen && editingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden my-auto">
            <div className="bg-[#0A192F] text-white px-6 py-4 flex items-center justify-between border-b border-amber-500/20">
              <h3 className="font-serif font-bold text-lg text-white">YouTube Video / Livestream</h3>
              <button onClick={() => setIsVideoModalOpen(false)} className="p-1 text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const detectedId = extractYouTubeId(editingVideo.youtubeUrl);
                if (!detectedId) {
                  alert('Please enter a valid YouTube URL (e.g. https://www.youtube.com/watch?v=...)');
                  return;
                }
                const newVid = {
                  ...editingVideo,
                  youtubeId: detectedId,
                  isCustomAdded: true,
                };
                const updated = videos.some(v => v.id === newVid.id) ? videos.map(v => v.id === newVid.id ? newVid : v) : [newVid, ...videos];
                if (await handleSaveVideos(updated)) { setIsVideoModalOpen(false); setEditingVideo(null); }
              }}
              className="p-6 space-y-4 text-xs"
            >
              {dataError && <p role="alert" className="text-red-700">{dataError}</p>}
              <div className="space-y-1">
                <label className="font-semibold uppercase tracking-wider text-stone-700">YouTube URL *</label>
                <input
                  type="text"
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={editingVideo.youtubeUrl}
                  onChange={(e) => setEditingVideo({ ...editingVideo, youtubeUrl: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold uppercase tracking-wider text-stone-700">Sermon / Message Title *</label>
                <input
                  type="text"
                  required
                  placeholder="Title of service or sermon"
                  value={editingVideo.title}
                  onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold uppercase tracking-wider text-stone-700">Speaker</label>
                  <input
                    type="text"
                    value={editingVideo.speaker}
                    onChange={(e) => setEditingVideo({ ...editingVideo, speaker: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold uppercase tracking-wider text-stone-700">Duration</label>
                  <input
                    type="text"
                    value={editingVideo.duration}
                    onChange={(e) => setEditingVideo({ ...editingVideo, duration: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <label className="block">Category<select aria-label="Video category" className="w-full border rounded p-2" value={editingVideo.category} onChange={e => setEditingVideo({ ...editingVideo, category: e.target.value as YouTubeVideoItem['category'], categoryLabel: e.target.selectedOptions[0].text })}>{['sunday-service', 'bible-study', 'worship', 'holy-ghost', 'youth', 'prayer-revival'].map(c => <option key={c} value={c}>{c.replaceAll('-', ' ')}</option>)}</select></label>
              <label className="block">Date<input aria-label="Video date" className="w-full border rounded p-2" value={editingVideo.date} onChange={e => setEditingVideo({ ...editingVideo, date: e.target.value })} /></label>
              <label className="block">Description<textarea aria-label="Video description" className="w-full border rounded p-2" value={editingVideo.description} onChange={e => setEditingVideo({ ...editingVideo, description: e.target.value })} /></label>
              <label className="block">Scripture<input aria-label="Video scripture" className="w-full border rounded p-2" value={editingVideo.scriptureRef || ''} onChange={e => setEditingVideo({ ...editingVideo, scriptureRef: e.target.value })} /></label>
              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="px-4 py-2 rounded-full text-stone-600 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-red-600 text-white font-bold shadow-md cursor-pointer"
                >
                  Save Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isEbookModalOpen && editingEbook && <EbookEditor book={editingEbook} busy={busy} error={dataError} onClose={() => setIsEbookModalOpen(false)} onSave={async book => {
        const updated = ebooks.some(b => b.id === book.id) ? ebooks.map(b => b.id === book.id ? book : b) : [book, ...ebooks];
        if (await handleSaveEbooks(updated)) { setIsEbookModalOpen(false); setEditingEbook(null); }
      }} />}
      </fieldset>
    </div>
  );
};
