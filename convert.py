import csv
import json

data = []
with open('sheet.csv', newline='', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for row in reader:
        entry = {
            "month": int(row["month"]),
            "day": int(row["day"]),
            "cakeName": row["cakeName"],
            "cakeWord": row["cakeWord"],
            "description": row["description"]
        }
        data.append(entry)

# JSON を標準出力へ
print(json.dumps(data, ensure_ascii=False, indent=2))
