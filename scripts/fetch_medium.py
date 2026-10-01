"""Fetch the Medium RSS feed and write posts.json for the site.

Runs daily from .github/workflows/medium.yml. Standard library only.
"""
import html
import json
import re
import urllib.request
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime
from pathlib import Path

FEED_URL = "https://medium.com/feed/@ercanvari"
OUT = Path(__file__).resolve().parent.parent / "posts.json"
NS = {"content": "http://purl.org/rss/1.0/modules/content/"}


def text_excerpt(body, limit=180):
    text = html.unescape(re.sub(r"<[^>]+>", " ", body))
    text = re.sub(r"\s+", " ", text).strip()
    return text if len(text) <= limit else text[:limit].rsplit(" ", 1)[0] + "…"


def main():
    req = urllib.request.Request(FEED_URL, headers={"User-Agent": "sahinercan.com feed sync"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        root = ET.fromstring(resp.read())

    posts = []
    for item in root.iter("item"):
        body = item.findtext("content:encoded", default="", namespaces=NS)
        image = re.search(r'<img[^>]+src="([^"]+)"', body)
        posts.append({
            "title": item.findtext("title", "").strip(),
            "url": item.findtext("link", "").split("?")[0],
            "date": parsedate_to_datetime(item.findtext("pubDate")).date().isoformat(),
            "tags": [c.text for c in item.findall("category") if c.text],
            "image": image.group(1) if image else "",
            "excerpt": text_excerpt(body),
        })

    OUT.write_text(json.dumps(posts, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(posts)} posts to {OUT.name}")


if __name__ == "__main__":
    main()
