import requests

url = "http://localhost:3000/rest/products/search?q=apple"

print("Starting Rate Limit Test...")
for i in range(1, 101):
    response = requests.get(url)
    print(f"Request {i}: Status Code {response.status_code}")