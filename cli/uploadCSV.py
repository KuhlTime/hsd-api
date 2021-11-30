import os
from pandas import read_csv
import requests
import json
from dateutil import parser
import hashlib

url = 'https://hsd-api.herokuapp.com/v1/admin'

csv = read_csv('data.csv')

updated = parser.parse('25.11.2021')


def toString(x):
    return str(x).replace(' ', '_')


url = "https://hsd-api.herokuapp.com/v1/admin/exams"


def generate_unique_id(row):
    unique_id_items = map(
        toString, [row['Code'], row['Studiengang'], row['PO'], row['Prüfer']])
    unique_text = '-'.join(unique_id_items)
    return hashlib.md5(unique_text.encode('utf-8')).hexdigest()[:10]


# Check for dublicated ids
ids = []
dublicated = []
for index, row in csv.iterrows():
    unique_id = generate_unique_id(row)
    if unique_id in ids:
        print('Dublicated Unique Id: ' + unique_id)
        dublicated.append(unique_id)
    else:
        ids.append(unique_id)

if len(dublicated) == 0:
    print('No dublicated ids found')
else:
    exit(1)

for index, row in csv.iterrows():
    # For Testing
    # if index != 0:
    #   break

    unique_id = generate_unique_id(row)

    duration = None
    timestamp = None

    try:
        duration_array = row['Dauer'].split(':')
        duration = int(duration_array[0]) * 60 + int(duration_array[1])

        timestamp = parser.parse(row['Prüfdatum'] + ' ' + row['Beginn'])
    except:
        print('Skipped: ' + unique_id)
        continue

    payload = json.dumps({
        "id": unique_id,
        "code": row['Code'],
        "degree": row['Studiengang'],
        "duration": duration,
        "examiners": [
            row['Prüfer'],
            row['Zweitprüfer']
        ],
        "examType": row['Prüfungsform'],
        "name": row['Prüfung'],
        "regulations": row['PO'],
        "semester": row['Sem.'],
        "timestamp": timestamp.isoformat(),
        "week": row['Prüfwoche'],
        "updated": updated.isoformat()
    })
    headers = {
        'Authorization': os.environ['API_TOKEN'],
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    if response.status_code == 200:
        print('Uploaded: ' + unique_id)
    else:
        print(response.text)
        print('Error Uploading: ' + unique_id)
