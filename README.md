
# Name: rpgapijs

# License: 
- MIT (codes)
- Multiple Licenses ( Contents, Assets, Images, Models and etc...)

# Stage Dev:
- idea design
- prototype build.

# Created By: Lightnet

# Code Language:
- javascript
- babeljs

# Informtion:
  To create simple role playing game with text and 2D image.

  By using nextjs with react built in to create simple user interface. To build local pc for users.

# builds:
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
## not used:
- prisma (database helper)
- gun (database)
- react-dom (client browser)
- sqlite (database)
- graphql (graph database)

## Testing battle type:
- Turn base click. Since it used logic check on the server side to simulate simple battle calculate.

- Tick time base is base on cpu time to get logic run every few seconds. That does not need to render every frame for reduce cpu used.

It not does not large scale build server that have not tested.

  Nextjs does different from web server as used pages folder as static render client and pages/api folder is used for request by fetch url call depend on the methods. So it reduce coding structure by a bit or lot depend the structure.

# Database:

## SQLITE
- prisma helper

## graphql:
  Work in progress, testing...

.env
```
HOST="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
DATABASE_URL="file:./dev.db"
```








