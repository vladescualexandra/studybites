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
```


4. În directorul ./backend/config crează un fișier ```db.json``` cu structura indicată în ```db.sample.json```.

5. Adaugă setările pentru baza de date în fișierul ```db.json```

6. În directorul ./backend/config crează un fișier ```secrets.json``` cu structura indicată în ```secrets.sample.json``` și adaugă informațiile necesare pentru testare.

6. Configurează un server MySQL și crează o bază de date (cu numele din db.json).

7. Execută sciptul ```createdb.js``` pentru a realiza structura bazei de date.
```
node createdb.js
```

8. Execută scriptul server.js pentru a porni serverul.
```
node server.js
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

# FAZA 2:
## Documentation
On the first run of the application, no user will be connected to the server (No id, name or content will be displayed).
Text validation is not implemented yet, meaning the user will have to insert the required input without alterations.
For testing purposes, an account was previously created and populated with data.
```
email: test
password: test
```

Functionalities: 
* Clicking on the login will trigger the login/sign up process.
* Typing 'yes' in the 'do you already have an account?' will continue the login process, followed by the 'enter your email' and 'enter your password' prompts. If the credentials are correct, the client will be logged in, account informations and content will be displayed.
* Typing 'no' in the 'do you already have an account?' will continue the sign up process, followed by the 'enter your name', 'enter your email' and 'enter your password' prompts. A new account will be created (if the email adress wasn't previously used) and the user will be connected to its account. The information will be displayed, without any content, since none was created yet.
* Clicking on the username or the 'log out' button will log out of the account.
* The user will remain connected to its account until manually loging out.
* If the user isn't connected to it's account, no content can be created.
* Clicking on Notes/Books/Reminders/Shared buttons will expand the content droppdown list.
* Clicking on any item in the list will display it in the right editor.
* For all types of content, two buttons will be displayed in the top left corner of the editor, 'Delete' and 'Save'. 
* For Notes: a dropdown list with the books is displayed above the title. It's selected by default the book that contains the selected note. Changing the book will move the note in the selected one. -- ISSUE: needs refresh to make the changes visible in the left menu.
* For Shared: abe the title, the collaborators to the selected item will be displayed, each having an 'x' button that will remove it on click. Next to them it's an input that requires the id of the collaborators that the user wants to include, that will be added if the id is correct and the 'Add' button is clicked. The shared note will be available to all collaborators. -- ISSUE: needs refresh to make the changes visible. 
* The user can modify the title/content of any item. Any changes are automatically saved to the database. -- ISSUE: Title won't be updated in the left menu unless clicking on it, refreshing the page or clicking the 'Save' button (might not work on the first click').
* The user can delete an item. -- ISSUE: The user has to click on the item or refresh the page to make it disappearfrom the left menu.
* Clicking the '+ NEW' button will open an expandable list with choices for the type of content to be added. The item will be automatically created in the database.


## Description

* The application must allow students to organise their notes by classes they attend and individual study activities.
* The platform is based on a Single Page Application architecture. It will be accessible on a desktop, mobile or tablet browser (depending on user preferences).
* The note editor is easy to use so that the student can take notes during the class. It will implement a markdown sistem to allow simple text formatting.
* The notes can be organised in folders, every folder being a class, there the student can also store the notes from the seminars.

## Minimal functionalities

* First of all, every student need to login in with their institutional account.
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
get: /user/:email/:password
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
get: /shared/:id/collaborators
post: /users/:id/shared
put: /shared/:id
delete: /shared/:id

get: /collaborators
get: shared/:id/collaborators
post: /collaborators
put: /collaborators/:id
delete: /shared/:sid/collaborators/:cid
```
