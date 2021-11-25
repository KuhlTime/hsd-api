![Banner](assets/hsd-api-banner.svg)

![Testing](https://github.com/KuhlTime/hsd-exam-schedule/actions/workflows/node.js.yml/badge.svg)

This API should give students the possbility to access, relevant information such as:
- [ ] `Exam Data` (WIP)
- [ ] `Module Information` (WIP)

No user relevant data is ever recorded or stored anywhere!

# 🌟 Endpoints

There is a clear distinction between the administrative endpoints and the publicly available endpoints.

## 🧑‍🎓 Public `/v1/`

**GET `/v1/exams`**:

Returns an array of all the available exams as JSON.

**GET `/v1/exams/:Id`**:

By providing an exam identifier, only one particular exam is getting returned by the API.

## 🥷 Admin `/v1/admin`

The admin endpoints are only available by providing the defined API secret inside the `Authorization` header.

**POST `/v1/admin/exams`**:

This route is used in order to create or update an exam inside the database. The message body contains all the information to describe a single exam.

- `description`: The property is optional and does not need to be set.
- `timestamp`: This has to be an ISO formatted date/time string.

Example Body:
```json
{
  "id": "someUniqueExamId",
  "code": 11011,
  "degree": "Bachelor EI",
  "duration": 120,
  "examiners": [
    "Wrede",
    "Gottkehaskamp"
  ],
  "examType": "KL",
  "name": "Grundlagen der Elektrotechnik I",
  "regulations": 2016,
  "semester": 1,
  "timestamp": "2022-02-01T08:00:00.000Z",
  "week": 2,
  "description": "Optional Description" // optional
}
```

# 🔒 Security

- The API is using a rate limiter to restirct the amount of requests on a per IP basis.
- The admin API is protected by a secret key that can be set inside the environment variables. This key should not be exposed to anyone outside!

# 🚩 Limitations
- The app caches the firestore backend **in-memory** to **increase performance**. In case the data inside the backend gets too big, this could cause memory issues!
