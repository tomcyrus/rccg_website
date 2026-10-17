import json
from pathlib import Path
from backend.app.models import MODELS


def test_public_seed_matches_api_contract_and_contains_no_private_records():
    seed = json.loads((Path(__file__).parents[1] / 'seed.json').read_text())
    assert set(seed) == {'events', 'ebooks', 'videos'}
    for kind, rows in seed.items():
        assert len({row['id'] for row in rows}) == len(rows)
        for row in rows:
            MODELS[kind].model_validate(row)
