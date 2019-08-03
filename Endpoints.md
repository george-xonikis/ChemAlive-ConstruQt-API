# Project Endpoints

Endpoints for the ChemALive ConstruQt API website

## The Website has the following Endpoints

### 1. Registration
- POST: Register new user by asking for an email (send email validation code) 
  `/api/registration/`
- POST: Validate a new registered user with validation code sent by email
  `/api/registration/validation/`

### 2. Auth
- POST: Get a new JWT by passing username and password.
  `/api/auth/token/`
- POST: Get a new JWT by passing an old still valid JWT. 
  `/api/auth/token/refresh/`
- POST: Verify a token by passing the token in the body 
  `/api/auth/token/verify/`
- POST: Reset users password by sending a validation code in a email
  `/api/auth/password-reset/`
- POST: Validate password reset token and set new password for the user.
  `/api/auth/password-reset/validate/`

### 3. Users
- GET: get all the User Profiles
  `/api/users/`
- GET/PUT/DESTROY: get or update or delete the User's Profiles
  `/api/users/me/`
- GET/PUT: get or update the User's Profiles
  `/api/users/me/profile/`
- GET/PUT/DESTROY: get or update or delete a User  by user_id
  `/api/users/<int:pk>/`
- GET/PUT: get or update a User Profiles by user_id (also update membership status)
  `/api/users/<int:pk>/profile/`
- GET: search a User Profile by keyword ('username', 'last_name', 'first_name','email','user_company', 'user_phone', 'user_premium_status')
  `/api/users/search/`

### 4. Projects
- GET: get all Projects from all users
  `/api/projects/`
- GET: get all User's Projects
  `/api/projects/user/`
- POST: create a new Project by owner
  `/api/projects/create/`
- GET/UPDATE/DESTROY: get or update or delete a Project
  `/api/projects/<int:pk>/`
- GET/POST: get all project's collaborators or add a collaborator to the Project
  `/api/projects/<int:pk>/collaboration`
- GET: search a Project by keyword (project_name, owner_username, owner_first_name, owner_last_name', owner_company)
  `/api/projects/search/`

### 5. Collaborations
- GET: get all Collaborations
  `/api/collaborations/`
- GET: get all User's Collaborations as guest
  `/api/collaborations/user/`
- GET/DESTROY: get or delete a Collaboration
  `/api/collaborations/<int:pk>/`
- GET: search a Collaborations by keyword (collaborator_email)
  `/api/collaborations/search/`
  
### 6. Contact Form
- POST: post a message from Contact Form
  `/api/contact_form/message`
