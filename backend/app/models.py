from typing import Annotated, Literal
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

Short = Annotated[str, Field(max_length=300)]
Text = Annotated[str, Field(max_length=20000)]
Required = Annotated[str, Field(min_length=1, max_length=300)]


class Model(BaseModel):
    model_config = ConfigDict(extra='forbid', str_strip_whitespace=True)


class Login(Model):
    email: EmailStr
    password: Annotated[str, Field(min_length=1, max_length=1024)]

    # Passwords may intentionally contain surrounding spaces.
    model_config = ConfigDict(extra='forbid', str_strip_whitespace=False)


class PasswordChange(Model):
    model_config = ConfigDict(extra='forbid', str_strip_whitespace=False)
    currentPassword: Annotated[str, Field(min_length=1, max_length=1024)]
    newPassword: Annotated[str, Field(min_length=12, max_length=128)]


class Record(Model):
    id: Annotated[str, Field(pattern=r'^[a-zA-Z0-9_-]{1,100}$')]
    revision: int = Field(default=1, ge=1)


class DateBadge(Model):
    month: Short
    day: Short
    subtext: Short = ''


class Event(Record):
    title: Required
    category: Literal['bible-study', 'outreach', 'worship', 'special']
    categoryLabel: Short
    dateBadge: DateBadge
    dayOfWeek: Short
    time: Short
    frequency: Short
    location: Short
    isOnlineAvailable: bool = False
    onlinePlatform: Short = ''
    scriptureRef: Short = ''
    description: Text
    highlights: list[Short] = Field(default_factory=list, max_length=100)
    coordinator: Short = ''
    audience: Short = ''
    rsvpRequired: bool = False
    status: Literal['scheduled', 'live', 'completed', 'postponed'] = 'scheduled'


class Video(Record):
    youtubeId: Annotated[str, Field(pattern=r'^[a-zA-Z0-9_-]{11}$')]
    youtubeUrl: Short
    title: Required
    seriesTitle: Short = ''
    speaker: Short
    speakerRole: Short = ''
    category: Literal['sunday-service', 'bible-study', 'worship', 'holy-ghost', 'youth', 'prayer-revival']
    categoryLabel: Short
    date: Short
    duration: Short
    scriptureRef: Short = ''
    description: Text
    keyPoints: list[Short] = Field(default_factory=list, max_length=100)
    isFeatured: bool = False
    isCustomAdded: bool = False

    @field_validator('youtubeUrl')
    @classmethod
    def youtube_url(cls, value):
        from urllib.parse import urlparse
        url = urlparse(value)
        if url.scheme != 'https' or url.hostname not in {'youtube.com', 'www.youtube.com', 'youtu.be', 'm.youtube.com'}:
            raise ValueError('Use an HTTPS YouTube URL')
        return value


class Chapter(Model):
    chapterNumber: int = Field(ge=1)
    title: Short
    keyScripture: Text
    paragraphs: list[Text] = Field(max_length=100)
    reflectionQuestions: list[Text] = Field(max_length=100)
    prayerOfDedication: Text


class Ebook(Record):
    title: Required
    subtitle: Short = ''
    author: Required
    authorRole: Short = ''
    category: Literal['devotionals', 'kingdom-living', 'prayer-fasting', 'discipleship', 'faith-encouragement', 'family-marriage', 'spiritual-growth']
    categoryLabel: Short
    accentColor: Annotated[str, Field(pattern=r'^#[0-9a-fA-F]{6}$')]
    coverTheme: Literal['navy-gold', 'emerald-gold', 'royal-amber', 'burgundy-gold', 'slate-gold']
    badge: Short = ''
    description: Text
    fullSynopsis: Text
    pages: int = Field(ge=1, le=10000)
    format: Short
    readTimeEst: Short
    publicationYear: int = Field(ge=1900, le=2200)
    rating: float = Field(ge=0, le=5)
    reviewCount: int = Field(ge=0)
    keyTakeaways: list[Text] = Field(max_length=100)
    tableOfContents: list[Short] = Field(max_length=100)
    sampleChapter: Chapter
    isFeatured: bool = False


class Announcement(Record):
    isActive: bool
    message: Annotated[str, Field(max_length=2000)]
    type: Literal['notice', 'urgent', 'celebration', 'broadcast']
    actionLabel: Short = ''
    actionUrl: Short = ''
    targetTab: Literal['home', 'about', 'videos', 'gallery', 'ebooks', 'connect', 'admin'] | None = None

    @field_validator('actionUrl')
    @classmethod
    def safe_url(cls, value):
        if value and not value.startswith('https://'):
            raise ValueError('Action URL must use HTTPS')
        return value


class PrayerSubmission(Model):
    name: Required
    email: EmailStr | Literal[''] = ''
    phone: Short = ''
    category: Required
    requestText: Annotated[str, Field(min_length=1, max_length=10000)]
    isConfidential: bool = True


class InquirySubmission(Model):
    fullName: Required
    email: EmailStr
    phone: Short = ''
    inquiryType: Literal['Plan a Visit', 'First-Time Guest', 'Prayer Request', 'Bible Study / Fellowship', 'Serve With Us', 'General Question', 'Event RSVP', 'Newsletter Subscription']
    message: Annotated[str, Field(min_length=1, max_length=10000)]


class Prayer(PrayerSubmission, Record):
    status: Literal['new', 'interceding', 'answered', 'archived'] = 'new'
    submittedAt: Short
    pastoralNotes: Text = ''


class Inquiry(InquirySubmission, Record):
    status: Literal['new', 'contacted', 'welcomed', 'followed-up'] = 'new'
    submittedAt: Short
    assignedTo: Short = ''
    pastoralNotes: Text = ''


class Member(Record):
    fullName: Required
    email: EmailStr
    phone: Short = ''
    ministry: Short = ''
    membershipStatus: Literal['active', 'inactive'] = 'active'
    emailOptIn: bool = True
    joinedAt: Short = ''
    notes: Text = ''
    createdAt: Short


class EmailCampaignRequest(Model):
    templateType: Literal['sermon', 'event', 'service', 'general']
    recipientMode: Literal['all', 'individual']
    memberId: Short = ''
    subject: Annotated[str, Field(min_length=1, max_length=200)]
    preheader: Short = ''
    heading: Required
    message: Annotated[str, Field(min_length=1, max_length=10000)]
    actionLabel: Short = ''
    actionUrl: Short = ''

    @field_validator('actionUrl')
    @classmethod
    def safe_action_url(cls, value):
        if value and not value.startswith('https://'):
            raise ValueError('Action URL must use HTTPS')
        return value


class EmailCampaign(EmailCampaignRequest, Record):
    recipientCount: int = Field(ge=1, le=500)
    sentCount: int = Field(ge=0, le=500)
    failedCount: int = Field(ge=0, le=500)
    status: Literal['sent', 'partial', 'failed']
    sentAt: Short
    sentBy: EmailStr


MODELS = {
    'events': Event,
    'videos': Video,
    'ebooks': Ebook,
    'announcements': Announcement,
    'prayers': Prayer,
    'inquiries': Inquiry,
    'members': Member,
    'email_campaigns': EmailCampaign,
}
PUBLIC_KINDS = {'events', 'videos', 'ebooks', 'announcements'}
