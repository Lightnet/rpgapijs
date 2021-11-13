
# Name: rpgapijs

# License: 
- MIT (codes)
- Multiple Licenses ( Contents, Assets, Images, Models and etc...)

# Stage Dev:
- Idea design
- Prototype build.

# Created By: Lightnet

# Code Languages:
- Javascript
- Babel.js

# Softwares / Programs:
- Node.js v16.13.0
- MonogoDB v5.0.3
- VScode (Optional)

# Informtion:
  To create simple role playing game with text and 2D image.

  By using nextjs with react built in to create simple user interface. To build local pc for users.

# Builds:
- browser (work in progress)
- desktop (work in progress)
- mobile (not build)

## Notes:
- Work in progress packages trying to keep simple but depend on the builds and testing...

# Packages:
- next (server / prerender react for client / components)
- next-auth (auth checks)
- react (client browser)
- uuid (gen id's)
- nanoid (gen id's)
- mongoose (graph database)
## Not used:
- prisma (database helper)
- gun (database)
- react-dom (client browser)
- sqlite (database)
- graphql (graph database)

## Testing battle types:
- Turn base click. Since it used logic check on the server side to simulate simple battle calculate.

- Tick time base is base on cpu time to get logic run every few seconds. That does not need to render every frame for reduce cpu used.

# Next.js
It is not tested on large scale build server as building stand alone desktop browser game for friends co-op or simulate testing world.

Nextjs does different from web server as used pages folder as static render client and pages/api folder is used for request by fetch url call depend on the methods. So it reduce coding structure by a bit or lot depend the structure.

# Layout:
- pages (folder / pre-render client browser)
- pages/index.js (entry point browser like home page)
- pages/game.js ( this is where game logic application )
- pages/api (folder / server api [response / request ])
- pages/api/auth (folder / auth api )
- public (folder for host "/" for assets)
- style (folder css)
- lib (folder [ server / client ] helper and setup database)

This is base on the next.js server packages. Check for more information. Just the lib folder is custom for not conflict with the pages and api.

https://nextjs.org/

# Database:
- MongoDB
  -  Work in progress.
- SQLITE
  - prisma helper
- graphql
  - not build just tests.

.env
```
HOST="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
DATABASE_URL="mongodb://127.0.0.1/rpg"
```








