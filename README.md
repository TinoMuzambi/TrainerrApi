# Clean Next.js with TypeScript, Sass and MongoDB Boilerplate

## Usage

1. `git clone https://github.com/TinoMuzambi/CleanNext.jsBoilerplate .`
2. Switch to the `with-typescript-sass-mongodb` branch
3. `rm -rf .git`
4. `git init`
5. `yarn`
6. Create an .env file and enter your MongoDB connection string in an environment variable named `MONGO_URI`
7. In any file you need to work with your database, import db from the `utils/db.ts` file then run `await db()` then proceed with the rest of your code.
