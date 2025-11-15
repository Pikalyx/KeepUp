// Entry Point - start server (turn on your server)
const express = require("express"); //imports the express web framework (tool) to create a server
const transactionController = require("./0_Presentation/transaction_controller"); // imports the Presentation layer

const app = express(); // Created an express app instance (server)
const PORT = 3000;


// This part was recommended budring debugging phase by ChatGPT

// Allows Express to parse form submissions (from HTML <form> POSTs)
app.use(express.urlencoded({ extended: true }));

// Allows Express to parse JSON payloads (for API use or AJAX)
app.use(express.json());

// General Journal Routing
// Route prameters; any user request (e.g., /orders/1) is passed to orderController.getOrder
app.get("/journal", transactionController.showJournal); // node app.jsDefines a route for retrieving transactions

// Starts the Server
// Confirms that it's running at http://localhost:3000
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
