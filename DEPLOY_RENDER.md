# Render Deployment

## What this setup does

- Serves the game and API from one Render web service
- Uses Supabase Auth for sign up / login
- Stores game save data in PostgreSQL
- Lets players log in on another device and continue from the same save

## Files added

- `server.js`: Express API + static hosting + Supabase token verification
- `package.json`: Node dependencies and start script
- `render.yaml`: Render Blueprint for web service + Postgres

## API endpoints

- `GET /api/config`
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
- After Supabase login, the game loads the user's cloud save if one exists.
- Future saves are written locally and synced to the API automatically.
- Save data is stored in PostgreSQL, while authentication is delegated to Supabase.

## Recommended next steps before release

- Add password reset flow
- Decide whether to require email confirmation in Supabase Auth
- Add a visible "last synced" timestamp in the account modal
- Add server-side rate limiting for save routes
