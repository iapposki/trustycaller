# TrustyCaller

To run the code :
- Run ```npm install``` in the root folder
- Run ```npx prisma migrate dev```.
- Run ```npm start``` to start the server. The server runs on teh port ```3001```.

## Endpoints 
- POST `/auth/signup` - create a new user - BODY : { "name" : \<name\>,"phoneNumber" : \<phone number\>,"email" : \<email optional\>,"password" : \<password\>,"confirmPassword" : \<confirm password\> }. Gives back a token. Use this token in header as ```Bearer <token>```.
- POST `/auth/login` - authenticates the user - BODY : {"phoneNumber" :  \<phone number\>,"password" : \<password\>}. Again gives back a token to be used in header.
- POST `/spamreport` - requires token in header, adds a number as spam - BODY : {"spamNumber": \<phone number without country code\>, "countryCode": \<country code\>}
- GET `/search/byname/?name=<name>` - requires token in header, searches if name present in spam table according to the specific ordering
- GET `/search/bynumber/?spamNumber=<number>` - requires token in header, searches the user table first for spam history than checks for possibly multiple spammers in spam table if present.

Notes : 
- Feel free to add custom entries in the table using the prisma studio. Simply run ```npx run prisma studio``` in the root folder and add values as needed for testing purposes.
- DB is hosted externally so migration is not needed. The db might take some time to start initially.
 
