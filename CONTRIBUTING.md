# Contributing

Thanks for helping improve AutoTest Studio.

## Development setup

```powershell
npm install
npm.cmd run desktop
```

Web/API only (no Electron):

```powershell
npm start
```

Open `http://localhost:3050`. Built-in demo users: `tester` / `Tester123!`, `admin` / `Admin123!`.

Copy `.env.example` to `.env` if you need local overrides. Do not commit `.env`.

## Checks before a PR

```powershell
npm test
```

Keep changes focused. Prefer Chinese or English in UI/docs consistently with nearby files.

## Pull requests

1. Describe what and why.
2. Note how you tested (desktop / web / unit).
3. Do not include secrets, internal IPs, customer data, or binary installers.
