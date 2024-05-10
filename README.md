# Recycle Spot ♻️

![image](https://github.com/Felipevhm/recycleSpot/assets/58308361/5161963c-e5c1-446f-b521-9c5716b5a2b7)


## Description

Recycle Spot is a React application for managing recycling collection points. The application allows user registration, login, viewing a dashboard with user data and collection points, as well as allowing editing, deleting, and updating collection points.

## Problem Solved

The application was created to facilitate the management of recycling collection points, allowing users to register and manage these points efficiently.

## Techniques and Technologies Used

- React: A JavaScript library for building user interfaces;
- JSON Server: Used to simulate a RESTful API;
- Private Routes: To protect routes and ensure that only authenticated users can access them;
- React Router DOM: Used to create routes for application pages;
- React Hook Form: Used to create forms for application user register and collect point register.

## How to Run

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the server with `npm run dev`
4. Access `http://localhost` in your browser as indicated in the terminal
5. In addition, the application needs to run the json server with the command `npm run s` or `npx json-server --watch./db/db.json` in a second terminal.

## Future Improvements

- Allow viewing of collection points without the need to log in;
- Add password recovery functionality;
- Improve design with more elements of the recycling theme.

## Contributions

Contributions are always welcome. Feel free to open an issue or send a pull request.

## License

MIT
