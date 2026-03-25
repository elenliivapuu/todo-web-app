# 📝 Todo Web App

A simple full-stack task management application built with **Flask** and **vanilla JavaScript**, demonstrating RESTful API design and frontend–backend integration.

---

## 🚀 Tech Stack
- Backend: Flask, Flask-CORS  
- Frontend: HTML, CSS, JavaScript  
- Storage: JSON file  

---

## ⚙️ Run Locally

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Frontend
```bash
cd frontend
python3 -m http.server 5500
```

Open: 
```bash
http://127.0.0.1:5500
```

---

## 🔌 API
- `GET /tasks` — fetch all tasks  
- `POST /tasks` — create a task  
- `PUT /tasks/<id>` — update a task  
- `DELETE /tasks/<id>` — delete a task  

---

## 💡 Notes
- Frontend and backend run on separate ports (CORS configured)  
- Data is persisted in `backend/tasks.json`  
- Backend runs on port `5001`  