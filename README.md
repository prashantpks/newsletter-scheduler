# Newsletter Scheduler

Backend program which schedules the newletters of different topics.

## Technologies Used
* Nodejs
* Express
* Node-cron (For scheduling email)
* Nodemailer (For sending emails)
* Momentjs
* Mongoose
* uuid

### Database
MongoDB Atlas

## Installation
* Create a folder in your local system and open the terminal in VS Code or any editor in this folder.
* Clone this repo in your local machine using command:
``` 
git clone <repository-link>
```
* Install the required packages using command:

```
npm install
```
* Create .env file in root folder and add the following variables

```
PORT=
DATABASE_URL=<mongodb-atlas-url>
DEV_MAIL=<senders' email-id>
DEV_MAIL_PASSWORD=<password of senders' email-id>
```

## Usage
### Starting server
Open the terminal window in VS Code in the root folder and run the command:

```
npm run dev
```
### Adding Subscribers
Subscribers can be added using **API** endpoint: **POST /addsub**
* Send topic and subscriber's email via request body.
* Request body should include keys **"topic"** and **"email"**.
* **"email"** provided should be **valid** email-id.
### Creating contents
Contents can be added using **API** endpoint: **POST /addcontent**
* All details related to content should be sent such as title, topic, content body and sending time.
* Request body must include keys **"topic", "title","content_body"** and **"send_at"**.
* The time in **"send_at"** should be local time of the format **"2022-05-05T17:14:00"**



## Issues

* Cron scheduler is checking to send email for every minute, this makes the scheduling a little less precise in terms of seconds.
* There should be a list of predefined topics to which only subscribers can be added and according to which content should be written.
* Currently, at a time, subscriber is added to a single topic only but there should be feature where subscriber can subscribe to multiple topic at the same time.
* Newsletter is sent as a plain text through email, it can be improved further by using html.

## Author
* LinkedIn: [@Prashant Kumar](https://www.linkedin.com/in/prashant-kumar-7aa9a4203/)
* Email: [@prashant](mailto:prashantrkt2002@gmail.com)

