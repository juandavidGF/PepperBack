import requests

# url = "https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=0.1278&hourly=temperature_2m"
# url = "https://google.com"
# url = "https://logo.artmelon.me/api/hello"
url = "https://randomuser.me/api/"

response = requests.get(url)

print(response.json())