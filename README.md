# Nest Auth

This is user/customer manager.

- [Nest Auth](#motrix-Playwright)
  - [Before you use](#before-you-use)
  - [How to use](#how-to-use)
  - [E2E](#e2e)
  - [SMTP](#smtp)
  - [Kibana](#kibana)

## Before you use

You must have these environment variables defined in your project to use password reset or e2e:

```
E2E_ADMIN_USER=
E2E_ADMIN_PASSWORD=

E2E_EMPLOYER_USER=
E2E_EMPLOYER_PASSWORD=

E2E_CUSTOMER_USER=
E2E_CUSTOMER_PASSWORD=

SMTP_HOSTNAME=
SMTP_USERNAME=
SMTP_PASS=
```

## How to use

With the enviroments configured, you'll need to install the dependencies:

```bash
pnpm install
```

Run docker:

```bash
docker-compose up -d
```

Then, run the project:

```bash
pnpm start
```

## E2E

To run E2E, you need to configure environments and create 3 users: admin, employer, and customer.

Then you need to run

```bash
pnpm test:e2e-ui
```

## SMTP

If you need to use password reset, you need to configure SMTP and add it in the environments:

## Kibana

After running the Docker Compose, you can access the Kibana app at your localhost:

http://localhost:5601/