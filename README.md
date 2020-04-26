### NuutrEd

- Live app: https://nuutred.now.sh
- Live serer: https://sheltered-stream-40763.herokuapp.com/
- Test user:
  - username: Test
  - password: P@ssw0rd

### API Docs:

- POST /auth/login
  - https://sheltered-stream-40763.herokuapp.com/api/auth/login
  - allows users to login to their account
- POST
  - https://sheltered-stream-40763.herokuapp.com/api/users
  - allows a user to sign up for an account
- POST
  - https://sheltered-stream-40763.herokuapp.com/api/biometrics
  - allows users to post their biometrics information into the database based on user_id
- GET
  - https://sheltered-stream-40763.herokuapp.com/api/biometrics
  - retrieves biometric information for the currently logged in user
- GET
  - https://sheltered-stream-40763.herokuapp.com/api/biometrics/weights
  - retrieves weight data for the currently logged in user

### Summary

- This app allows users to register/sign into their account
- This app collects basic user biometric data to analyze
- This app allows users to see their current biometrics on a dashboard and current caloric TDEE
- This app has a nav bar linking to 2 pages of interpreted data of user biometrics
- The user can see 4 seperate goal charts for different diet endpoints, each with percentages of CHO, PRO, and FATS, as well as an adjusted BMR. Additionally, this break down includes the total number of grams of macronutrient are required to meet that daily goal.
- The user can update their weight on the dashboard
- The user can track on a line graph how their progress in weight has changed overtime

### Screenshots

![Landing](/images/NuutredLanding.PNG "Optional Title")
![Login](/images/NDlogin.PNG "Optional Title")
![biometric](/images/NDbiometricgather.PNG "Optional Title")
![dashboard](/images/NDdashboard.PNG "Optional Title")
![update](/images/NDupdateweight.PNG "Optional Title")
![weightgraph](/images/NDweightgraph.PNG "Optional Title")
![caloric charts](/images/NDcaloricchart.PNG "Optional Title")

### Tech Used

- ReactJS
- Postgres
- SQL
- HTML
- JSX
- CSS
- NodeJS
- Express
