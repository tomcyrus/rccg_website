import os
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=Path(__file__).parents[1] / '.env', extra='ignore')
    supabase_url: str = ''
    supabase_publishable_key: str = ''
    supabase_secret_key: str = ''
    allowed_origins: list[str] = ['http://localhost:3000', 'http://127.0.0.1:3000']
    # Vercel always serves public deployments over HTTPS. Local development
    # remains HTTP-friendly unless COOKIE_SECURE is explicitly enabled.
    cookie_secure: bool = bool(os.getenv('VERCEL'))

    @property
    def configured(self):
        return bool(self.supabase_url and self.supabase_publishable_key and self.supabase_secret_key)


settings = Settings()
