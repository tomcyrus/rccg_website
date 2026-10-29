import React, { useMemo, useState } from 'react';
import {
  BellRing,
  CheckCircle2,
  Edit3,
  HeartHandshake,
  Mail,
  Megaphone,
  Plus,
  Send,
  Trash2,
  UserPlus,
  Users,
} from 'lucide-react';
import {
  ChurchMemberRecord,
  EmailCampaignRecord,
  EmailDeliveryStatus,
  MemberEmailRequest,
  MemberEmailTemplate,
} from '../types';

interface AdminCommunicationsProps {
  members: ChurchMemberRecord[];
  campaigns: EmailCampaignRecord[];
  emailStatus: EmailDeliveryStatus;
  busy: boolean;
  searchTerm: string;
  onSaveMembers: (members: ChurchMemberRecord[]) => Promise<boolean>;
  onSend: (payload: MemberEmailRequest) => Promise<EmailCampaignRecord | null>;
}

const TEMPLATE_DEFAULTS: Record<MemberEmailTemplate, Pick<MemberEmailRequest, 'subject' | 'preheader' | 'heading' | 'message' | 'actionLabel' | 'actionUrl'>> = {
  sermon: {
    subject: 'Watch This Week’s Sermon | RCCG Kingdom First Assembly',
    preheader: 'Be strengthened by the latest message from Kingdom First Assembly.',
    heading: 'A New Sermon Is Ready to Watch',
    message: 'Dear church family,\n\nJoin us as we receive God’s Word through this week’s sermon. We pray the message strengthens your faith and helps you put God’s Kingdom first in every area of life.',
    actionLabel: 'Watch the Sermon',
    actionUrl: 'https://www.rccgkfa.org/sermons',
  },
  event: {
    subject: 'Upcoming Church Event | RCCG Kingdom First Assembly',
    preheader: 'Save the date and join the Kingdom First Assembly family.',
    heading: 'You’re Invited to Our Upcoming Event',
    message: 'Dear church family,\n\nWe would love for you and your family to join us for this upcoming church event. Please review the details and invite someone to come with you.',
    actionLabel: 'View Event Details',
    actionUrl: 'https://www.rccgkfa.org/events',
  },
  service: {
    subject: 'Church Service Reminder | RCCG Kingdom First Assembly',
    preheader: 'We look forward to worshipping with you in Roselle.',
    heading: 'Join Us for Worship',
    message: 'Dear church family,\n\nThis is a warm reminder to join us for worship, prayer, fellowship, and the Word of God. Come expectant and bring a friend or family member.',
    actionLabel: 'Plan Your Visit',
    actionUrl: 'https://www.rccgkfa.org/connect',
  },
  general: {
    subject: 'Church Family Update | RCCG Kingdom First Assembly',
    preheader: 'An important update for the Kingdom First Assembly family.',
    heading: 'Church Family Update',
    message: 'Dear church family,\n\nWe are grateful to share this update with you. Thank you for staying connected and serving faithfully as we put God’s Kingdom first and become like Christ everywhere.',
    actionLabel: 'Visit Our Website',
    actionUrl: 'https://www.rccgkfa.org',
  },
};

const newMember = (): ChurchMemberRecord => ({
  id: `member-${Date.now()}`,
  fullName: '',
  email: '',
  phone: '',
  ministry: '',
  membershipStatus: 'active',
  emailOptIn: true,
  joinedAt: '',
  notes: '',
  createdAt: new Date().toISOString(),
});

const initialCampaign = (): MemberEmailRequest => ({
  templateType: 'sermon',
  recipientMode: 'all',
  memberId: '',
  ...TEMPLATE_DEFAULTS.sermon,
});

export const AdminCommunications: React.FC<AdminCommunicationsProps> = ({
  members,
  campaigns,
  emailStatus,
  busy,
  searchTerm,
  onSaveMembers,
  onSend,
}) => {
  const [editingMember, setEditingMember] = useState<ChurchMemberRecord | null>(null);
  const [campaign, setCampaign] = useState<MemberEmailRequest>(initialCampaign);

  const visibleMembers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return members.filter(member => !query || JSON.stringify(member).toLowerCase().includes(query));
  }, [members, searchTerm]);
  const eligibleMembers = members.filter(member => member.membershipStatus === 'active' && member.emailOptIn);
  const recipientCount = campaign.recipientMode === 'all'
    ? eligibleMembers.length
    : eligibleMembers.filter(member => member.id === campaign.memberId).length;

  const selectTemplate = (templateType: MemberEmailTemplate) => {
    setCampaign(current => ({ ...current, templateType, ...TEMPLATE_DEFAULTS[templateType] }));
  };

  const saveMember = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingMember) return;
    const exists = members.some(member => member.id === editingMember.id);
    const updated = exists
      ? members.map(member => member.id === editingMember.id ? editingMember : member)
      : [editingMember, ...members];
    if (await onSaveMembers(updated)) setEditingMember(null);
  };

  const removeMember = async (member: ChurchMemberRecord) => {
    if (confirm(`Remove ${member.fullName} from the church member directory?`)) {
      await onSaveMembers(members.filter(item => item.id !== member.id));
    }
  };

  const emailMember = (member: ChurchMemberRecord) => {
    setCampaign(current => ({ ...current, recipientMode: 'individual', memberId: member.id }));
    document.getElementById('member-email-composer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const sendCampaign = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!recipientCount) return;
    const audience = campaign.recipientMode === 'all' ? `${recipientCount} opted-in members` : 'the selected member';
    if (!confirm(`Send “${campaign.subject}” to ${audience}?`)) return;
    await onSend(campaign);
  };

  return (
    <div className="space-y-8">
      <div className={`rounded-2xl border p-5 ${emailStatus.configured ? 'border-emerald-200 bg-emerald-50' : 'border-amber-300 bg-amber-50'}`}>
        <div className="flex items-start gap-3">
          {emailStatus.configured ? <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-700" /> : <BellRing className="mt-0.5 h-5 w-5 text-amber-700" />}
          <div>
            <h2 className="font-bold text-[#0A192F]">{emailStatus.configured ? 'Church email delivery is active' : 'Email delivery needs activation'}</h2>
            <p className="mt-1 text-xs text-stone-600">
              Contact and Prayer submissions are always saved in this dashboard. {emailStatus.configured
                ? `New submissions also notify ${emailStatus.adminAddress}. Member campaigns send from ${emailStatus.fromAddress}.`
                : 'Add the server-side email delivery key and verified sender address before sending messages.'}
            </p>
          </div>
        </div>
      </div>

      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col justify-between gap-4 border-b border-stone-200 pb-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold font-serif text-[#0A192F]"><Users className="h-5 w-5 text-emerald-700" /> Church Member Directory</h2>
            <p className="mt-1 text-xs text-stone-500">Register essential contact details and record each member’s email consent.</p>
          </div>
          <button type="button" onClick={() => setEditingMember(newMember())} className="flex items-center gap-2 self-start rounded-full bg-emerald-800 px-4 py-2.5 text-xs font-bold text-white">
            <UserPlus className="h-4 w-4" /> Register Member
          </button>
        </div>

        {editingMember && (
          <form onSubmit={saveMember} className="mt-6 grid grid-cols-1 gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 sm:grid-cols-2">
            <label className="text-xs font-semibold text-stone-700">Full name *<input aria-label="Member full name" required value={editingMember.fullName} onChange={event => setEditingMember({ ...editingMember, fullName: event.target.value })} className="mt-1 block w-full rounded-xl border border-stone-300 bg-white p-2.5" /></label>
            <label className="text-xs font-semibold text-stone-700">Email address *<input aria-label="Member email" type="email" required value={editingMember.email} onChange={event => setEditingMember({ ...editingMember, email: event.target.value })} className="mt-1 block w-full rounded-xl border border-stone-300 bg-white p-2.5" /></label>
            <label className="text-xs font-semibold text-stone-700">Phone<input aria-label="Member phone" value={editingMember.phone || ''} onChange={event => setEditingMember({ ...editingMember, phone: event.target.value })} className="mt-1 block w-full rounded-xl border border-stone-300 bg-white p-2.5" /></label>
            <label className="text-xs font-semibold text-stone-700">Ministry / department<input aria-label="Member ministry" value={editingMember.ministry || ''} onChange={event => setEditingMember({ ...editingMember, ministry: event.target.value })} className="mt-1 block w-full rounded-xl border border-stone-300 bg-white p-2.5" /></label>
            <label className="text-xs font-semibold text-stone-700">Membership status<select aria-label="Member status" value={editingMember.membershipStatus} onChange={event => setEditingMember({ ...editingMember, membershipStatus: event.target.value as ChurchMemberRecord['membershipStatus'] })} className="mt-1 block w-full rounded-xl border border-stone-300 bg-white p-2.5"><option value="active">Active</option><option value="inactive">Inactive</option></select></label>
            <label className="text-xs font-semibold text-stone-700">Date joined<input aria-label="Member date joined" type="date" value={editingMember.joinedAt || ''} onChange={event => setEditingMember({ ...editingMember, joinedAt: event.target.value })} className="mt-1 block w-full rounded-xl border border-stone-300 bg-white p-2.5" /></label>
            <label className="sm:col-span-2 flex items-start gap-3 rounded-xl border border-stone-200 bg-white p-3 text-xs text-stone-700"><input aria-label="Member email consent" type="checkbox" checked={editingMember.emailOptIn} onChange={event => setEditingMember({ ...editingMember, emailOptIn: event.target.checked })} className="mt-0.5" /><span><strong>Email permission recorded</strong><br />This member has agreed to receive church sermons, event notices, and service reminders.</span></label>
            <label className="sm:col-span-2 text-xs font-semibold text-stone-700">Private admin notes<textarea aria-label="Member notes" rows={2} value={editingMember.notes || ''} onChange={event => setEditingMember({ ...editingMember, notes: event.target.value })} className="mt-1 block w-full rounded-xl border border-stone-300 bg-white p-2.5" /></label>
            <div className="sm:col-span-2 flex gap-2"><button className="rounded-full bg-emerald-800 px-5 py-2.5 text-xs font-bold text-white">Save Member</button><button type="button" onClick={() => setEditingMember(null)} className="rounded-full border border-stone-300 px-5 py-2.5 text-xs font-bold">Cancel</button></div>
          </form>
        )}

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {visibleMembers.map(member => (
            <article key={member.id} className="rounded-2xl border border-stone-200 bg-stone-50/60 p-4">
              <div className="flex items-start justify-between gap-3">
                <div><h3 className="font-bold text-[#0A192F]">{member.fullName}</h3><p className="text-xs text-stone-500">{member.ministry || 'Member'} · {member.membershipStatus}</p></div>
                <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${member.emailOptIn ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'}`}>{member.emailOptIn ? 'EMAIL OPT-IN' : 'NO EMAIL'}</span>
              </div>
              <div className="mt-3 space-y-1 text-xs text-stone-600"><div>{member.email}</div>{member.phone && <div>{member.phone}</div>}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" disabled={!member.emailOptIn || member.membershipStatus !== 'active'} onClick={() => emailMember(member)} className="flex items-center gap-1 rounded-lg bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-800 disabled:opacity-40"><Mail className="h-3.5 w-3.5" /> Email</button>
                <button type="button" onClick={() => setEditingMember({ ...member })} className="rounded-lg bg-stone-200 p-2 text-stone-700" title="Edit member"><Edit3 className="h-3.5 w-3.5" /></button>
                <button type="button" onClick={() => void removeMember(member)} className="rounded-lg bg-red-50 p-2 text-red-700" title="Remove member"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </article>
          ))}
          {!visibleMembers.length && <p className="text-sm text-stone-500">No church members match this search.</p>}
        </div>
      </section>

      <section id="member-email-composer" className="scroll-mt-32 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="border-b border-stone-200 pb-5">
          <h2 className="flex items-center gap-2 text-xl font-bold font-serif text-[#0A192F]"><Megaphone className="h-5 w-5 text-amber-700" /> Church Email Composer</h2>
          <p className="mt-1 text-xs text-stone-500">Send a branded sermon, event, service, or general update to one opted-in member or the full active list.</p>
        </div>

        <form onSubmit={sendCampaign} className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {(['sermon', 'event', 'service', 'general'] as MemberEmailTemplate[]).map(type => (
                <button key={type} type="button" onClick={() => selectTemplate(type)} className={`rounded-xl border px-3 py-2 text-xs font-bold capitalize ${campaign.templateType === type ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-stone-200 bg-stone-50'}`}>{type}</button>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-xs font-semibold">Recipients<select aria-label="Email recipients" value={campaign.recipientMode} onChange={event => setCampaign({ ...campaign, recipientMode: event.target.value as MemberEmailRequest['recipientMode'] })} className="mt-1 block w-full rounded-xl border p-2.5"><option value="all">All active opted-in members ({eligibleMembers.length})</option><option value="individual">One member</option></select></label>
              {campaign.recipientMode === 'individual' && <label className="text-xs font-semibold">Select member<select aria-label="Email member" required value={campaign.memberId} onChange={event => setCampaign({ ...campaign, memberId: event.target.value })} className="mt-1 block w-full rounded-xl border p-2.5"><option value="">Choose a member</option>{eligibleMembers.map(member => <option key={member.id} value={member.id}>{member.fullName} — {member.email}</option>)}</select></label>}
            </div>
            <label className="block text-xs font-semibold">Email subject *<input aria-label="Email subject" required maxLength={200} value={campaign.subject} onChange={event => setCampaign({ ...campaign, subject: event.target.value })} className="mt-1 block w-full rounded-xl border p-2.5" /></label>
            <label className="block text-xs font-semibold">Preview text<input aria-label="Email preview text" maxLength={300} value={campaign.preheader} onChange={event => setCampaign({ ...campaign, preheader: event.target.value })} className="mt-1 block w-full rounded-xl border p-2.5" /></label>
            <label className="block text-xs font-semibold">Email heading *<input aria-label="Email heading" required value={campaign.heading} onChange={event => setCampaign({ ...campaign, heading: event.target.value })} className="mt-1 block w-full rounded-xl border p-2.5" /></label>
            <label className="block text-xs font-semibold">Message *<textarea aria-label="Email message" required rows={7} value={campaign.message} onChange={event => setCampaign({ ...campaign, message: event.target.value })} className="mt-1 block w-full rounded-xl border p-3" /></label>
            <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs font-semibold">Button label<input aria-label="Email action label" value={campaign.actionLabel} onChange={event => setCampaign({ ...campaign, actionLabel: event.target.value })} className="mt-1 block w-full rounded-xl border p-2.5" /></label><label className="text-xs font-semibold">Button link (HTTPS)<input aria-label="Email action URL" type="url" pattern="https://.*" value={campaign.actionUrl} onChange={event => setCampaign({ ...campaign, actionUrl: event.target.value })} className="mt-1 block w-full rounded-xl border p-2.5" /></label></div>
            <button disabled={busy || !emailStatus.configured || recipientCount === 0} className="flex items-center gap-2 rounded-full bg-[#ed1234] px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"><Send className="h-4 w-4" /> Send to {recipientCount} {recipientCount === 1 ? 'member' : 'members'}</button>
          </div>

          <div>
            <div className="sticky top-32 overflow-hidden rounded-3xl border border-stone-200 bg-[#f7f4ed] p-4">
              <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="border-b-4 border-amber-400 bg-[#005c42] p-5 text-white"><div className="text-sm font-extrabold">THE REDEEMED CHRISTIAN CHURCH OF GOD</div><div className="mt-1 text-xs font-bold text-amber-200">Kingdom First Assembly · Roselle, New Jersey</div></div>
                <div className="p-6"><div className="text-[10px] font-bold uppercase tracking-[.2em] text-amber-700">Putting God&apos;s Kingdom First</div><h3 className="mt-2 font-serif text-2xl font-bold text-[#12372c]">{campaign.heading}</h3><div className="mt-4 whitespace-pre-line text-sm leading-6 text-stone-600">{campaign.message}</div>{campaign.actionLabel && campaign.actionUrl && <span className="mt-5 inline-block rounded-full bg-[#007450] px-5 py-2.5 text-xs font-bold text-white">{campaign.actionLabel}</span>}</div>
                <div className="bg-emerald-50 p-5 text-[10px] leading-5 text-stone-500">RCCG Kingdom First Assembly<br />121 E 2nd Ave, Roselle, NJ 07203<br />rccgkfa@gmail.com</div>
              </div>
            </div>
          </div>
        </form>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5"><div className="flex items-center gap-2 font-bold text-blue-950"><Mail className="h-4 w-4" /> Contact Us Notification</div><p className="mt-2 text-xs leading-5 text-blue-900/70">Automatically emails the admin address with the visitor’s name, contact information, inquiry type, and message after saving it to Guest Desks &amp; Visits.</p></div>
        <div className="rounded-2xl border border-purple-200 bg-purple-50 p-5"><div className="flex items-center gap-2 font-bold text-purple-950"><HeartHandshake className="h-4 w-4" /> Prayer Request Notification</div><p className="mt-2 text-xs leading-5 text-purple-900/70">Automatically emails the admin address with the prayer details and confidentiality marker after saving it to the Prayer Pipeline.</p></div>
      </section>

      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-bold font-serif text-[#0A192F]">Recent Email Campaigns</h2>
        <div className="mt-4 space-y-3">{campaigns.slice(0, 10).map(item => <div key={item.id} className="flex flex-col justify-between gap-2 rounded-xl border border-stone-200 p-4 sm:flex-row sm:items-center"><div><div className="font-semibold text-sm">{item.subject}</div><div className="text-xs text-stone-500">{new Date(item.sentAt).toLocaleString()} · {item.sentBy}</div></div><div className="text-xs"><span className={`rounded-full px-2 py-1 font-bold uppercase ${item.status === 'sent' ? 'bg-emerald-100 text-emerald-800' : item.status === 'partial' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>{item.status}</span><span className="ml-2 text-stone-500">{item.sentCount}/{item.recipientCount} sent</span></div></div>)}{!campaigns.length && <p className="text-sm text-stone-500">No church email campaigns have been sent yet.</p>}</div>
      </section>
    </div>
  );
};
