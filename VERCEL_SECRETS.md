# Vercel Deployment - Required GitHub Secrets

Add these secrets to GitHub repository settings: https://github.com/awfixers-stuff/websites/settings/secrets/actions

## Global Secrets (Required for All Projects)

### VERCEL_TOKEN
**Description:** Personal access token for Vercel API
**How to get:**
1. Go to https://vercel.com/account/tokens
2. Log in as: business@awfixer.com
3. Click "Create Token"
4. Name: "GitHub Actions - awfixer websites"
5. Scope: Full Account
6. Copy the token

**Value:** `<your-vercel-token-here>`

---

### VERCEL_ORG_ID
**Description:** Your Vercel organization/team ID
**How to get:**
1. Go to https://vercel.com/account
2. Log in as: business@awfixer.com
3. Under "Your ID", copy the ID value
4. Alternatively, run: `vercel whoami` in terminal (shows team ID)

**Value:** `<your-vercel-org-id-here>`

---

## Per-Project Secrets (Create Vercel Projects First)

### How to Create Vercel Projects

For each website:
```bash
cd <project-directory>
vercel link
# Follow prompts:
# - Scope: awfixer (business@awfixer.com)
# - Link to existing project? No
# - Project name: <use suggested>
# - Directory: ./ (current directory)
```

This creates `.vercel/project.json` with the project ID.

### Project-Specific Secret Format

For each project, add a secret named `VERCEL_PROJECT_ID_<PROJECT>`:

#### VERCEL_PROJECT_ID_BLOG
**Project:** awfixer.blog
**Vercel URL:** https://awfixer.blog
**Value:** `<from .vercel/project.json>`

#### VERCEL_PROJECT_ID_COM
**Project:** awfixer.com
**Vercel URL:** https://awfixer.com
**Value:** `<from .vercel/project.json>`

#### VERCEL_PROJECT_ID_VIP
**Project:** awfixer.vip
**Vercel URL:** https://awfixer.vip
**Value:** `<from .vercel/project.json>`

#### VERCEL_PROJECT_ID_ME
**Project:** awfixer.me
**Vercel URL:** https://awfixer.me
**Value:** `<from .vercel/project.json>`

#### VERCEL_PROJECT_ID_WIKI
**Project:** awfixerwiki
**Vercel URL:** https://awfixerwiki.com
**Value:** `<from .vercel/project.json>`

#### VERCEL_PROJECT_ID_ACADEMY
**Project:** awfixer.academy
**Vercel URL:** https://awfixer.academy
**Value:** `<from .vercel/project.json>`

---

## Environment Variables Per Project

Each project may need additional environment variables. Add these to Vercel project settings:

### awfixer.blog
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_BROWSER_TOKEN`
- `NEXT_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_SENTRY_DSN`
- (See awfixer.blog/.env.example for complete list)

### awfixer.vip
- `BETTER_AUTH_SECRET`
- `NEXT_PUBLIC_BASE_URL`
- `DATABASE_URL`
- (See awfixer.vip/.env.example for complete list)

### awfixer.academy
- (Add as needed from .env.example)

---

## Git Configuration

**User:** awfixer
**Email:** git@awfixer.me
**Vercel Account:** business@awfixer.com

---

## Quick Setup Checklist

- [ ] Generate `VERCEL_TOKEN` from https://vercel.com/account/tokens
- [ ] Get `VERCEL_ORG_ID` from Vercel account settings
- [ ] Link each project with `vercel link`
- [ ] Extract project IDs from `.vercel/project.json` files
- [ ] Add all secrets to GitHub repo
- [ ] Configure environment variables in Vercel dashboard
- [ ] Test deployment with a test commit
