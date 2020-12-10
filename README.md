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

## Configurare frontend în mod dezvoltare

1. Navighează în directorul frontend și pornește aplicația de React
```
npm start 
```
Aplicația react va rula pe portul 300, iar serverul pe portul 3001

## Description

* The application must allow students to organise their notes by classes they attend and individual study activities.
* The platform is based on a Single Page Application architecture. It will be accessible on a desktop, mobile or tablet browser (depending on user preferences).
* The note editor is easy to use so that the student can take notes during the class. It will implement a markdown sistem to allow simple text formatting.
* The notes can be organised in folders, every folder being a class, there the student can also store the notes from the seminars.

## Minimal functionalities

* First of all, every student need to login in with their istitutional account.
* Second, the notes can be shared with other students, a particularity important especially when you have a project with other classmates.
* Third, the app allow you to add attachments and you have also a section dedicated for tutorials (with the links) with their notes.
* Then you can search over the app using keywords as to find everything you need in short time
* Also you can have a private group of classmates where you can share your notes


## Examples

StuDocu
https://www.studocu.com/

Evernote
https://evernote.com/

Keep
https://keep.google.com/u/0/

Microsof Office Word

Google docs

## Design Sketch 
![Sketch](https://github.com/vladescualexandra/studybites/blob/master/studybites.png)

## Short description about the components 

* We want our app to be easy to use for our customers, therefore we arranged our components in a simple layout:
 
 * on the left side you can find a menu which includes: username, a search bar (you can search within your notes), a 'new' button to add notes or folders, the actual folders and our logo
 
 * on the right side you'll see the folder name, the title, a blank space to insert your note and tools to write however you like.

## How we'll work:

* To develop this app we will use the Kanban method.
* Roles will be allocated as follows:
* All of us will be working as web developers;
* Adriana & Ionela will be the UI/UX designers, Bianca the tester and Codruta will handle the optimization.

## API Calls:
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



