# Render Deployment

## What this setup does

- Serves the game and API from one Render web service
- Stores user accounts and save data in PostgreSQL
- Lets players log in on another device and continue from the same save

## Files added

- `server.js`: Express API + static hosting
- `package.json`: Node dependencies and start script
- `render.yaml`: Render Blueprint for web service + Postgres

## API endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/save`
- `PUT /api/save`

## Render setup

1. Push this repo to GitHub.
2. In Render, create a new Blueprint deployment from the repo.
3. Confirm the `loopgame` web service and `loopgame-db` PostgreSQL database.
4. Deploy.

## Notes

- The frontend keeps `localStorage` save data as a local fallback.
- After login, the game loads the user's cloud save if one exists.
- Future saves are written locally and synced to the API automatically.
- Usernames are normalized to lowercase on the backend.

## Recommended next steps before release

- Add password reset flow
- Add email-based account recovery
- Add a visible "last synced" timestamp in the account modal
- Add server-side rate limiting for auth routes
