# API Caching and Prefetching
## Design Decisions
- The API uses json due to the convinience provided the Node.js libraries like Sequelize (SQL ORM) and Express' json middleware.
- The API has a single endpoint "/". 
  - **POST** Request -> Translation -> Payload format discussed later.
  - **GET** Request -> Dummy Text Response.
- Sequelize is used along with MySQL to act as the cache. The database has two tables:
  - **Input** (storing the source language, query text) and 
  - **Translation** (storing the target language, translated text, references the **Input** table) (Many to One Association).
- The request body is validated using **Joi** and appropriate errors are returned with 400 status code.
- [app/config/prefetch.config.js](https://github.com/atishekk/codeyoung_translation_api/blob/main/app/config/prefetch.config.js) contains the configuration for prefetching other translations based on the target language of the request.
- All the code has been arranged into modules making it easy to extend the application in the future.
- The application is tested using **jest** and **supertest**.

#### Limitations
- Free Version of the Google translate API doesn't support batch translations and has a hard limit of 500 characters/month. Hence only
a small number of additional languages are prefetched.

#### Better Approach
- Using In-memory cache like Redis can provide a better performance than a SQL Databases
- MongoDB can provide a more intutive and flexible implementation because to its similarity with JSON

## Requirements
1. docker - [Installation Guide](https://docs.docker.com/engine/install/)
2. docker-compose - [Installation Guide](https://docs.docker.com/compose/install/)

### 1. Setup
1. Clone the repository
2. Add the `.env` file to the project's root folder

### 2. Run the Server
Before running these commands make sure you are in the project's root folder.
    
    docker-compose up --build
`<Ctrl>+C` to stop the application stack.

### 3. Clean up
    # Remove the stopped containers
    docker-compose down
    # Remove the database volume
    docker volume rm codeyoung_db
### 4. Run Tests
    docker-compose -f docker-compose-dev.yaml up --build
    
## API Documentation
### 1. GET request "/"

### 2. POST request "/"
#### Headers
    Content-Type: application/json
#### Body
    //raw json
    {
      "q": "<String to be translated>",
      "source": "<Source Language Code>",
      "target": "<Target Language Code>"
    }
[Language Codes](https://cloud.google.com/translate/docs/languages) can be found here.
