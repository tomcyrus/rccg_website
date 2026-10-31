import httpx

from .config import settings


class EmailDeliveryError(RuntimeError):
    pass


class EmailSender:
    def __init__(self):
        self.client = httpx.AsyncClient(timeout=20)

    @property
    def configured(self):
        return settings.email_configured

    async def close(self):
        await self.client.aclose()

    def _message(self, recipient: str, subject: str, html: str, text: str, reply_to: str = ''):
        message = {
            'from': settings.email_from_address,
            'to': [recipient],
            'subject': subject,
            'html': html,
            'text': text,
        }
        if reply_to:
            message['reply_to'] = reply_to
        return message

    async def _post(self, path: str, payload):
        if not self.configured:
            raise EmailDeliveryError('Church email delivery is not configured.')
        try:
            response = await self.client.post(
                'https://api.resend.com' + path,
                headers={'Authorization': f'Bearer {settings.resend_api_key}', 'Content-Type': 'application/json'},
                json=payload,
            )
        except httpx.RequestError as exc:
            raise EmailDeliveryError('The email service is temporarily unavailable.') from exc
        if response.is_error:
            raise EmailDeliveryError('The email service rejected this delivery.')
        return response.json()

    async def send_one(self, recipient: str, subject: str, html: str, text: str, reply_to: str = ''):
        await self._post('/emails', self._message(recipient, subject, html, text, reply_to))

    async def send_many(self, recipients: list[str], subject: str, html: str, text: str) -> tuple[int, int]:
        sent = 0
        failed = 0
        for index in range(0, len(recipients), 100):
            batch = recipients[index:index + 100]
            try:
                await self._post('/emails/batch', [self._message(address, subject, html, text) for address in batch])
                sent += len(batch)
            except EmailDeliveryError:
                failed += len(batch)
        return sent, failed
