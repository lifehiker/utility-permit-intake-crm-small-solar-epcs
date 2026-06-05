# Human Input Needed

The app runs locally without external credentials. Provide these values for production integrations:

- `AUTH_SECRET`: strong random secret for NextAuth session signing.
- `NEXT_PUBLIC_APP_URL`: public application URL used in customer portal links and Stripe redirects.
- `STRIPE_SECRET_KEY`: Stripe secret key for checkout, billing portal, and webhook handling.
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook signing secret.
- `STRIPE_PRO_PRICE_ID`: Stripe recurring price ID for the Pro plan.
- `STRIPE_TEAM_PRICE_ID`: Stripe recurring price ID for the Team plan.
- `RESEND_API_KEY`: Resend API key for sending customer invite and reminder emails.

Without Stripe keys, billing endpoints return a clear "Stripe not configured" response. Without Resend, invite/reminder flows create portal links and activity log entries instead of sending email.
