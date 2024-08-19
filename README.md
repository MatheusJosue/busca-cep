![image](https://github.com/user-attachments/assets/56fec6a2-373f-4dd9-9812-8797883e3e0f)

Getting Started with Create React App
This project was bootstrapped with Create React App.

Prerequisites
Before you start, ensure you have the following installed on your machine:

Node.js (version 14.x or later)
npm (version 6.x or later)
You will also need a Google API Key to enable map visualization in the application.

Setting Up the Project
Follow these steps to set up the project on your local machine:

Clone the Repository:

bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
Install Dependencies:

In the project directory, run:

bash
npm install
Configure the Google API Key:

Generate a Google API Key from the Google Cloud Console.

Enable the "Maps JavaScript API" for your project.

Once you have the API Key, create a file at src/assets/environments/environments.json with the following content:

json
{
  "googleApiKey": "YOUR_GOOGLE_API_KEY"
}
Replace YOUR_GOOGLE_API_KEY with the API Key you generated.

Available Scripts
In the project directory, you can run:

npm start
Runs the app in development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

npm test
Launches the test runner in interactive watch mode.
See the section about running tests for more information.

npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information.

npm run eject
Note: this is a one-way operation. Once you eject, you can’t go back!

If you aren’t satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point, you’re on your own.

You don’t have to ever use eject. The curated feature set is suitable for small and medium deployments, and you shouldn’t feel obligated to use this feature. However, we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

Learn More
You can learn more in the Create React App documentation.

To learn React, check out the React documentation.

This README now includes clear instructions for setting up and running the project, as well as configuring the Google API Key for map functionality.
