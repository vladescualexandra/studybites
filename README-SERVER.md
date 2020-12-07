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
```

4. În directorul ./backend/config crează un fișier ```db.json``` cu structura indicată în ```db.sample.json```.

5. Adaugă setările pentru baza de date în fișierul ```db.json```

6. Configurează un server MySQL și crează o bază de date (cu numele din db.json).

7. Execută sciptul ```createdb.js``` pentru a realiza structura bazei de date.
```
node createdb.js
```

8. Execută scriptul server.js pentru a porni serverul.
```
node server.js
```


## Testare request-uri HTTP folosind Postman
```
get: /users/:id
post: /users

get: /users/:id/notes
get: /notes/:id
post: /users/:id/notes
put: /notes/:id
delete: /notes/:id

get: /users/:id/books
get: /books/:id
post: /users/:id/books
put: /books/:id
delete: /books/:id

get: /users/:id/reminders
get: /reminders/:id
post: /users/:id/reminders
put: /reminders/:id
delete: /reminders/:id

get: /users/:id/shared
get: /shared/:id
post: /users/:id/shared
put: /shared/:id
delete: /shared/:id
```
