#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

with open(r"d:\My USB\Portfolio-\src\App.jsx", "rb") as f:
    raw_bytes = f.read()

# Decode to see current encoding
try:
    content = raw_bytes.decode("utf-8")
except:
    content = raw_bytes.decode("latin-1")

# Replace tokens
content = content.replace("text-text-main", "text-white")
content = content.replace("text-text-muted", "text-slate-300")

# Write back
with open(r"d:\My USB\Portfolio-\src\App.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Done!")
