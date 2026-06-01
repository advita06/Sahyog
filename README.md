# Sahyog — NGO Collaboration Platform

Live demo:https://sahyog-20f9.onrender.com

Sahyog means collaboration in Hindi. That one word captures everything this platform stands for.
In India alone, there are thousands of NGOs doing incredible work — planting trees, educating children, feeding the hungry, rescuing animals. But most of them work alone. They do not know who else is working on the same cause in the same city. Volunteers do not know where to go. Resources get wasted. Impact stays small.
Sahyog was built to fix that.
It is a full-stack web application where NGOs can create profiles, discover each other, collaborate on campaigns, and volunteers can find opportunities that actually matter to them.
---
## What You Can Do On Sahyog

If you are a volunteer, you can explore hundreds of NGOs, filter them by cause, read their mission, and directly reach out to join their work.
If you are an NGO, you can create your profile, post your mission, and send collaboration requests to other NGOs working in similar spaces. You can accept or reject incoming requests right from your dashboard.

| Feature | Description |
|---|---|
| Authentication | Secure signup and login with role selection — user or NGO |
| NGO Profiles | NGOs can create and manage a public profile with description, mission, location, and contact |
| Explore and Search | Browse all NGOs, search by name, filter by category |
| Collaboration System | Send, accept, or reject collaboration requests between NGOs |
| NGO Dashboard | A personal space for NGOs to manage their profile and requests |
| Responsive Design | Works cleanly on both desktop and mobile |
---
## How It Is Built

This project was built entirely from scratch — no templates, no shortcuts.
Frontend: HTML, CSS, and Vanilla JavaScript. Every page, every card, every form was hand-coded.
Backend: Node.js and Express.js. REST APIs handle everything from user auth to NGO creation to collaboration requests.
Database: MongoDB Atlas. All data — users, NGO profiles, collaboration requests — is stored in the cloud.

Authentication: JWT tokens keep users logged in securely. Passwords are hashed using bcrypt so they are never stored in plain text.
---
## Running It Locally

Clone the repository
```bash
git clone https://github.com/advita06/sahyog.git
cd sahyog
```
Install dependencies
```bash
npm install
```
Create a .env file in the root folder and add your credentials
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Start the server
```bash
node server.js
```
Open your browser and visit
http://localhost:3000
---

## API Reference

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/signup | Register a new user or NGO |
| POST | /api/auth/login | Login and receive a JWT token |

### NGO
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/ngo | Fetch all registered NGOs |
| POST | /api/ngo/create | Create a new NGO profile |
| GET | /api/ngo/:id | Get details of a single NGO |
| PUT | /api/ngo/:id | Update an existing NGO profile |
| DELETE | /api/ngo/:id | Delete an NGO profile |

### Collaboration
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/collaboration/send | Send a collaboration request to another NGO |
| GET | /api/collaboration/requests/:ngoId | View all incoming collaboration requests |
| PUT | /api/collaboration/accept/:id | Accept a collaboration request |
| PUT | /api/collaboration/reject/:id | Reject a collaboration request |

---

## Pages

Home — The landing page. Includes a hero section, platform stats, how it works, NGO categories, featured NGOs, testimonials, and active campaigns.
Explore — A searchable, filterable list of all NGOs on the platform.
NGO Details — The full profile of an NGO with their mission, location, contact, and a button to request collaboration.
Dashboard — A private space for NGOs to create their profile and manage incoming collaboration requests.
Login and Signup — Simple, clean forms with role-based access for users and NGOs.

---
## What Building This Taught Me

This was not just a project. It was the first time I built something end to end — from the database to the API to the UI.
I learned how to design and build REST APIs, how authentication actually works under the hood, how data flows from a browser form all the way into a cloud database and back, and how to make a multi-page frontend feel like a real product without using any framework.
Most importantly, I learned that building something real is the best way to learn anything.
---
## Developer
Built by Advita — from scratch, with curiosity and a lot of determination.
---
## License
This project is open source and available under the MIT License.
