from html import escape


CHURCH_NAME = 'RCCG Kingdom First Assembly'
CHURCH_EMAIL = 'rccgkfa@gmail.com'


def _paragraphs(value: str) -> str:
    return ''.join(
        f'<p style="margin:0 0 16px;color:#334155;font-size:16px;line-height:1.7">{escape(line)}</p>'
        for line in value.splitlines() if line.strip()
    )


def _layout(*, subject: str, preheader: str, heading: str, content: str, action_label: str = '', action_url: str = '') -> str:
    action = ''
    if action_label and action_url:
        action = f'''
          <table role="presentation" cellspacing="0" cellpadding="0" style="margin:26px 0 10px">
            <tr><td style="border-radius:999px;background:#007450">
              <a href="{escape(action_url, quote=True)}" style="display:inline-block;padding:13px 24px;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px">{escape(action_label)}</a>
            </td></tr>
          </table>'''
    return f'''<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{escape(subject)}</title></head>
  <body style="margin:0;background:#f7f4ed;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0">{escape(preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f7f4ed;padding:28px 12px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #e7e1d4">
          <tr><td style="background:#005c42;padding:26px 34px;border-bottom:5px solid #f2b719">
            <div style="color:#ffffff;font-size:20px;font-weight:800;letter-spacing:.2px">THE REDEEMED CHRISTIAN CHURCH OF GOD</div>
            <div style="margin-top:5px;color:#fde68a;font-size:14px;font-weight:700">Kingdom First Assembly · Roselle, New Jersey</div>
          </td></tr>
          <tr><td style="padding:36px 34px 30px">
            <div style="color:#b77900;text-transform:uppercase;letter-spacing:2px;font-size:11px;font-weight:800">Putting God's Kingdom First</div>
            <h1 style="margin:10px 0 18px;color:#12372c;font-family:Georgia,serif;font-size:31px;line-height:1.18">{escape(heading)}</h1>
            {content}
            {action}
          </td></tr>
          <tr><td style="background:#f1f7f4;padding:24px 34px;color:#475569;font-size:12px;line-height:1.65">
            <strong style="color:#12372c">RCCG Kingdom First Assembly</strong><br>
            Temporary Worship Location: Sphinx Banquet Center, 121 E 2nd Ave, Roselle, NJ 07203<br>
            (862) 205-5958 · <a href="mailto:{CHURCH_EMAIL}" style="color:#007450">{CHURCH_EMAIL}</a><br>
            <span style="display:inline-block;margin-top:8px">To update your church email preference, reply to this message or contact the church office.</span>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>'''


def render_campaign(payload) -> tuple[str, str]:
    content = _paragraphs(payload.message)
    html = _layout(
        subject=payload.subject,
        preheader=payload.preheader,
        heading=payload.heading,
        content=content,
        action_label=payload.actionLabel,
        action_url=payload.actionUrl,
    )
    text = f'''{payload.heading}\n\n{payload.message}'''
    if payload.actionLabel and payload.actionUrl:
        text += f'\n\n{payload.actionLabel}: {payload.actionUrl}'
    text += f'\n\n{CHURCH_NAME}\n121 E 2nd Ave, Roselle, NJ 07203\n{CHURCH_EMAIL}'
    return html, text


def render_admin_notification(kind: str, submission: dict, dashboard_url: str) -> tuple[str, str, str]:
    if kind == 'prayer':
        name = submission['name']
        subject = f'New prayer request from {name}'
        heading = 'A New Prayer Request Was Received'
        fields = [
            ('Name', name),
            ('Email', submission.get('email') or 'Not provided'),
            ('Phone', submission.get('phone') or 'Not provided'),
            ('Category', submission['category']),
            ('Confidential', 'Yes' if submission.get('isConfidential') else 'No'),
            ('Prayer request', submission['requestText']),
        ]
        preheader = 'A new prayer request is ready for pastoral review.'
    else:
        name = submission['fullName']
        subject = f'New contact message from {name}'
        heading = 'A New Contact Message Was Received'
        fields = [
            ('Name', name),
            ('Email', submission['email']),
            ('Phone', submission.get('phone') or 'Not provided'),
            ('Inquiry type', submission['inquiryType']),
            ('Message', submission['message']),
        ]
        preheader = 'A new website inquiry is ready for follow-up.'

    rows = ''.join(
        f'''<tr><td style="padding:9px 12px;color:#64748b;font-size:13px;font-weight:700;vertical-align:top;width:120px">{escape(label)}</td>
        <td style="padding:9px 12px;color:#1e293b;font-size:14px;line-height:1.55;white-space:pre-wrap">{escape(str(value))}</td></tr>'''
        for label, value in fields
    )
    content = f'''<p style="margin:0 0 18px;color:#334155;font-size:15px;line-height:1.65">This submission has also been saved securely in the church administration dashboard.</p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px">{rows}</table>'''
    html = _layout(
        subject=subject,
        preheader=preheader,
        heading=heading,
        content=content,
        action_label='Open Admin Dashboard',
        action_url=dashboard_url,
    )
    text = heading + '\n\n' + '\n'.join(f'{label}: {value}' for label, value in fields) + f'\n\nAdmin dashboard: {dashboard_url}'
    return subject, html, text
