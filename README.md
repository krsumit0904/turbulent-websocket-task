# Turbulent Websocket Task

## Pre-requisite
- docker-compose: To containerise the application
- wscat: To create websocket clients

## Run websocket server
- docker-compose up --build websocket

## Testing Application

### 1. Create some clients
- wscat -c ws://localhost:3000

### 2. Create an Event
- curl -X POST 'http://localhost:3000/events' -H 'Content-Type: application/json' --data-raw '{ "name": "Event name", "timestamp": 1596783000 }'
- Postman Collection: https://www.getpostman.com/collections/170178be6f1657856a21

### 3. Recieve Event
- When the event time occurs websocket will inform the connected clients with the event detail

## Run unit test cases
- docker-compose up --build unit-tests

## Task Aproach
1. Create a wesocket server to listen the clients.
2. Create a express server to serve API request and database operations.
4. Call API to create an event and save it to database.
3. Schedule a Cron Job every second which fetch the event and broadcast it for that timestamp.

## Future Enhancements
- To trigger an event for the reconnected clients after event already gets triggered
