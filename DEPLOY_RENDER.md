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
- `POST /api/payments/checkout`
- `POST /api/payments/confirm`
- `POST /api/stripe/webhook`

## Render setup

1. Push this repo to GitHub.
2. In Render, create a new Blueprint deployment from the repo.
3. Confirm the `loopgame` web service and `loopgame-db` PostgreSQL database.
4. Deploy.

Set these environment variables before enabling live payments:

- `APP_BASE_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_STARTER`
- `STRIPE_PRICE_BOOST`
- `STRIPE_PRICE_VAULT`

## Notes

- The frontend keeps `localStorage` save data as a local fallback.
- After Supabase login, the game loads the user's cloud save if one exists.
- Future saves are written locally and synced to the API automatically.
- Save data is stored in PostgreSQL, while authentication is delegated to Supabase.
- Stripe Checkout now expects dashboard-managed live `Price ID` values instead of inline `price_data`.

## Recommended next steps before release

- Add password reset flow
- Decide whether to require email confirmation in Supabase Auth
- Add a visible "last synced" timestamp in the account modal
- Add server-side rate limiting for save routes
