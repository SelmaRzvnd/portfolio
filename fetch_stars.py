import pandas as pd
import json
import requests
import os

if not os.path.exists('./public'):
    os.makedirs('./public')

url = "https://raw.githubusercontent.com/eudoxia0/astro-eog581/master/hygdata_v3.csv"

print("Downloading and processing stellar data...")

try:
    response = requests.get(url)
    
    if response.status_code != 200:
        raise Exception(f"Download failed! Status {response.status_code}")

    with open('temp_stars.csv', 'wb') as f:
        f.write(response.content)

    df = pd.read_csv('temp_stars.csv')

    # Filter: Naked eye visibility (mag <= 6) and exclude the Sun
    bright_stars = df[(df['mag'] <= 6.5) & (df['id'] != 0)].copy()

    star_list = []
    for _, row in bright_stars.iterrows():
        star_list.append({
            "ra": row['ra'],
            "dec": row['dec'],
            "mag": row['mag']
        })

    with open('./public/stars.json', 'w') as f:
        json.dump(star_list, f)

    os.remove('temp_stars.csv')
    print(f"✅ Success! {len(star_list)} stars saved to ./public/stars.json")

except Exception as e:
    print(f"❌ Error: {e}")