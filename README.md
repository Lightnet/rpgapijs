
# Name: rpgapijs

# License: 
- MIT (codes)
- Multiple Licenses ( Contents, Assets, Images, Models and etc...)

# Created By: Lightnet

# Packages:
- gun (database)
- prisma (database helper)
- next (server)
- next-auth (auth checks)
- react (client browser)
- react-dom (client browser)
- sqlite (database)
- uuid (gen id's)

## Notes:
- Work in progress packages trying to keep simple but depend on the builds and testing...


# Code Language:
- javascript
- babeljs

# Informtion:
    By using nextjs with react built in to create simple user interface. To build local pc for users to enjoy role playing game using mobile device is not plan but idea.

    It not does not large scale build server that have not tested.

    Nextjs does different from web server as used pages folder as static render client and pages/api folder is used for request by fetch url call depend on the methods. So it reduce coding structure by a bit or lot depend the structure.

# Database:
 - SQLITE


.env
```
HOST="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
DATABASE_URL="file:./dev.db"
```







