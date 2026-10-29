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


def test_event_seed_contains_the_published_church_schedule():
    seed = json.loads((Path(__file__).parents[1] / 'seed.json').read_text())
    events = {row['id']: row for row in seed['events']}

    assert set(events) == {
        'midweek-bible-study',
        'sunday-worship',
        'evangelism-outreach-second-sunday',
        'evangelism-outreach-fourth-sunday',
        'cross-over-service-2026',
    }
    assert (events['midweek-bible-study']['title'], events['midweek-bible-study']['time']) == (
        'Digging Deep',
        '7:00 PM – 8:30 PM',
    )
    assert events['sunday-worship']['time'] == '9:00 AM – 11:30 AM'
    assert events['evangelism-outreach-second-sunday']['dayOfWeek'] == '2nd Sunday of Every Month'
    assert events['evangelism-outreach-fourth-sunday']['dayOfWeek'] == '4th Sunday of Every Month'
    assert (
        events['cross-over-service-2026']['dayOfWeek'],
        events['cross-over-service-2026']['time'],
    ) == ('Thursday, December 31, 2026', '9:00 PM – 12:30 AM')
