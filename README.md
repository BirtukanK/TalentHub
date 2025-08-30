## TalentHub: A Mini Job Portal
### A Platform for Job Seekers and Employers
A full-stack job board built with Django (DRF) for the backend and React (Vite) for the frontend.
### Features

- User authentication (register, login, logout) with JWT
- Auth context in React for session management
- Jobs model & API (title, description, created_by)
- Fetch and display jobs on home page

### Stack

- Backend: Django, DRF, SimpleJWT

- Frontend: React (Vite), Axios, React Router

### Setup
Backend
```
cd Backend
python -m venv venv
source venv/bin/activate   # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Frontend
```
cd Frontend
npm install
npm run dev
```
### API

- POST /api/auth/register/ → Register

- POST /api/auth/login/ → Login

- GET /api/jobs/ → List jobs





