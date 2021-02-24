# Web app for taking notes during courses/labs

## Goal

To develop a web app that allows students to take notes during courses/labs
 The thinking behind this is that note-taking requires effort. Rather than passively taking information in, the act of encoding the information into words or pictures forms new pathways in the brain, which stores it more firmly in long-term memory. On top of that, having the information stored in a new place gives students the opportunity to revisit it later and reinforce the learning that happened the first time around.
 
 
 # Instrucțiuni instalare, pornire și testare server

## Configurare backend

1. Pentru a clona codul sursă:
```
git clone https://github.com/vladescualexandra/studybites.git
```
2. Navighează în directorul *backend*
```
cd backend
```
3. Instalează modulele npm
```
npm install
npm install express
npm install --save sequelize
npm install --save mysql2
npm install --save cors
npm install pm2@latest -g
```


4. În directorul ./backend/config crează un fișier ```db.json``` cu structura indicată în ```db.sample.json```.

5. Adaugă setările pentru baza de date în fișierul ```db.json```

6. În directorul ./backend/config crează un fișier ```secrets.json``` cu structura indicată în ```secrets.sample.json``` și adaugă informațiile necesare pentru testare.

7. Configurează un server MySQL și crează o bază de date (cu numele din db.json).
```
mysql -u <username> -p
create database <db-name>;
```

8. Execută sciptul ```createdb.js``` pentru a realiza structura bazei de date.
```
node createdb.js
```

9. Execută scriptul server.js pentru a porni serverul.
```
node server.js
```
sau
```
pm2 start server.js
```
## Configurare frontend
1. Navighează în directorul frontend
```
cd frontend
```
2. Instalează modulele npm
```
npm install
```
3. Adăugați setările pentru mediu în fișierul .env
```
REACT_APP_API_BASEURL="http://127.0.0.1:8080"
REACT_APP_BASEURL="http://127.0.0.1:3000"
```
   ATENȚIE: Fără slash(/) la final.
## Pornire aplicație în mod dezvoltare

1. Navighează în directorul frontend și pornește aplicația de React
```
npm start 
```
Aplicația react va rula pe portul 3000, iar serverul pe portul 8080.



