
# --- ここを必要に応じて変更 ---
_SHEET_ID="16E7np1nxzMqCoRXHXzjIn3i1CnWggfGRH0oTnvQv8Fw"
_GID="2117055021"

# ---------------------------------

# シートが「公開」または「Publish to web」されていることを確認してください
URL="https://docs.google.com/spreadsheets/d/${_SHEET_ID}/export?format=csv&gid=${_GID}"

# -L (--location) でリダイレクトを追う
curl -sL "${URL}" > sheet.csv
python3 convert.py > data/cakeWords.json

