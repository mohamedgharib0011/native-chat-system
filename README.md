
# Native-Chat-System
A chat application that lets people chat in their native language. It automatically translates the other participants messages, and vice versa, so you can have lengthy conversations without using a translation dictionary.

# Built with
1. Nodejs
2. Angular 6
3. Mongo
4. Socket.IO
5. Google Translate API
6. JWT(Json Web Token)

# Configuration
### DB configuration: 
Adjust db configuration at ChatBack/config/index.js

### Google API Key: 
Replace '#####' in params = params.append('key','#####'); (ChatFront/src/app/services/translate.service.ts) with your Key


# Installation
1. 'npm install' at ChatBack/
2. 'npm install' at ChatFront/

# Run
1. nodemon app.js
2. ng serve at ChatFront/
3. http://localhost:4200/login

 
 
 
