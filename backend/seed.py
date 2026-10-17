"""Optionally load original public demo content. Never import pastoral/visitor examples."""
import asyncio
import json
from pathlib import Path
from app.models import MODELS
from app.supabase import Supabase


async def main():
    db = Supabase()
    try:
        data = json.loads(Path(__file__).with_name('seed.json').read_text())
        for kind, records in data.items():
            existing = {row['id'] for row in await db.all_rows(kind)}
            for record in records:
                validated = MODELS[kind].model_validate(record).model_dump(mode='json')
                if record['id'] not in existing:
                    await db.insert(kind, validated)
                    print(f'Added {kind}/{record["id"]}')
        print('Seed complete. Existing records were not overwritten.')
    finally:
        await db.close()


if __name__ == '__main__':
    asyncio.run(main())
