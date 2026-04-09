import os
import re

src_path = r"d:\My USB\Portfolio-\src\App.jsx"

with open(src_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace legacy tokens
content = content.replace("text-text-main", "text-white")
content = content.replace("text-text-muted", "text-slate-300")

with open(src_path, "w", encoding="utf-8") as f:
    f.write(content)

print("✓ Legacy tokens replaced successfully")
