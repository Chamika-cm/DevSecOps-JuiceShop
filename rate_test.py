import requests

url = "http://localhost:3000/rest/user/login"
data = {"email": "admin@juice-sh.op", "password": "admin"}

for i in range(1, 15):
    try:
        response = requests.post(url, json=data, timeout=5)
        print(f"Request {i}: Status Code {response.status_code}")
    except requests.exceptions.ConnectionError:
        print(f"Request {i}: Connection Closed / Blocked (Rate Limited - 429)")