#Users Management API

##Getting Started

### Step 1: Initial Setup

- Clone the repository: `git clone https://github.com/Weslait/users-management-hetic.git`
- Navigate to the project directory: `cd users-management`
- Install depedencides: `npm install`

### Step 2: Environment Variables

- Creae `.env`.
- Add `PORT`variable example: `3000`.
- Add `DATABASE_URL` variable example `file:./dev.db`.

### Database setup

- Run `npx prisma generate`.
- Run `npx prisma db push`.

### Running the app

- Run `npm run dev`.

## Managing packages with `npm`

- `npm install <package-name>`
- `npm install -D <package-name>`
- `npm uninstall <package-name>`
- `npm update <package-name>`

## Prisma commands

- `npx prisma studio` : Opens Prisma Studio to browse database.
