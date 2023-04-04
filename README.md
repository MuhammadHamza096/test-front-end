# Dashboard Application

This is a responsive dashboard application that displays data from a REST API. The API provides information about users and games. The Application feature includes

- Users can be added , deleted, updated and displays in the table
- Games can be added, deleted, updated and displays in the table
- Pie chart and bar chart for clear data visualiztion and also shows the count of users and games 

## Installation

- Clone this repository to your local machine.
- Navigate to the project directory.
- Install dependencies with `npm install`.
- Create the .env file in the project directory.
- Paste the url with 
`REACT_APP_API_URL=https://test-backend-repo-84ptfx5y3-muhammadhamza096.vercel.app/api/v1/`
- `npm start` 

## Mock Data

I have created the backend using MongoDB and designed the APIs for this project, which I have deployed on Vercel at the following URL: `https://test-backend-repo-84ptfx5y3-muhammadhamza096.vercel.app/api/v1/`.

However, since this is a free service, there is a possibility that it could create issues while testing the application. To run the backend locally, you can clone the repository from GitHub at the following `URL: https://github.com/MuhammadHamza096/test_backend_repo`. After cloning, run 'npm i' and 'npm start' to start the server.

To use this local backend with the frontend, you will need to add the following line to the .env file in the frontend directory: `REACT_APP_API_URL=http://localhost:4000/api/v1/`.

## Project Structure

- src/api: contains all the APIs call 
- src/assets: contains the images
- src/components: contains the common components used thorugh out the project
- src/pages: contains the pages displays on browser
- src/routes: routing for the whole project. 

## Libraries used 

- Material Ui 
- react-datepicker
- react-router-dom
- victory (for data visualization)
- qs 
- axios
 




