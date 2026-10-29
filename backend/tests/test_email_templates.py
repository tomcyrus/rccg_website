from backend.app.email_templates import render_admin_notification, render_campaign
from backend.app.models import EmailCampaignRequest


def test_campaign_template_escapes_admin_content_and_requires_https_actions():
    payload = EmailCampaignRequest.model_validate({
        'templateType': 'event',
        'recipientMode': 'all',
        'memberId': '',
        'subject': 'Church gathering',
        'preheader': 'Join us',
        'heading': '<Welcome>',
        'message': '<script>alert(1)</script>\nEveryone is invited.',
        'actionLabel': 'View event',
        'actionUrl': 'https://www.rccgkfa.org/events',
    })
    html, text = render_campaign(payload)
    assert '<script>' not in html
    assert '&lt;script&gt;' in html
    assert '&lt;Welcome&gt;' in html
    assert '<script>alert(1)</script>' in text


def test_admin_notification_contains_dashboard_link_and_submission_details():
    subject, html, text = render_admin_notification('inquiry', {
        'fullName': 'Website Guest',
        'email': 'guest@example.com',
        'phone': '',
        'inquiryType': 'General Question',
        'message': 'Please contact me.',
    }, 'https://www.rccgkfa.org/admin')
    assert subject == 'New contact message from Website Guest'
    assert 'https://www.rccgkfa.org/admin' in html
    assert 'Please contact me.' in text
