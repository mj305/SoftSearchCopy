# Soft Search

Soft Search is a career search web application specifically created for Software Development.

The application is a personalized job platform that provides the user a career opportunity feed that most approaches the user’s skill set. Users can find career opportunities based on location by displaying the job postings on a map.


## CONTRIBUTORS
Elvis Hernandez
Iman Bashir
Leigh Chin
Maria Beckles


# Technologies used
Ruby →  2.6.0 or higher
Bootstrap 
React-rails
Faker gem to seed the database
postgresql as the database
Mapbox Gl JS

# Proper authentication system 
The API Website: https://bit.ly/MapBoxGL
Sign up with your email.
Get your API Key.
Create environment variable:  MAPBOX_KEY=API_KEY
Place API Key in the .env file.

# Setup To Start
rails db:create
rails db:migrate
bundle
yarn
rails s
Open http://localhost:3000 to view in the browser.

# Deployment
heroku create
git push heroku master
heroku run rake db:migrate
Heroku open


