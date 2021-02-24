# Pet Shop API

## Installation
1. Clone this repository
2. Install the modules using `npm install` or `yarn`
3. Create the build using `tsc`
4. Put the database (postgres) url in a `.env` file with the same structure as `.env.sample`
5. To run migrations, run the command `npm run migrate` or `yarn migrate`
6. Start the server using `npm start` or `yarn start`

## Routes

### Pets
- GET /pets
  - Get all pets
- GET /pets/:id
  - Get a single pet
- POST /pets/new
  - Create a new pet
  - Body:
    ```typescript
    interface CreatePetBody {
        name: string
        age: string
        breed: string
    }
    ```
- PATCH /pets/:id
  - Change details a pet
  - Body:
    ```ts
    interface PetUpdateBody {
        name?: string
        age?: number
        user?: {
          id: number
        }
    }
    ```

### Owner

- GET /owners
  - Get all owners
- GET /owners/:id
  - Get a single owner
- POST /owners/new
  - Create a new owner
  - Body:
    ```typescript
    interface CreateOwnerBody {
        name: string
    }
    ```
- PATCH /owners/:id
  - Change details an owner
  - Body:
    ```ts
    interface UserUpdateBody {
      name?: string
      pets?: {
        id: number
      }[]
    }
    ```

## Tech stack
- Language: Typescript/Javascript
- Backend Framework: Express
- Database: Postgres
- ORM: Typeorm
- Hosting: Heroku