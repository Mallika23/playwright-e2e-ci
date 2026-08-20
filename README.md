# P7 — Playwright E2E Suite + CI 🟡 Medium

A cross-browser end-to-end suite in **Playwright + TypeScript** against a demo storefront, with Page Object Model, trace-on-failure debugging, and a 3-browser GitHub Actions matrix.

**Why recruiters love it:** Playwright + TypeScript is the single most-requested UI automation stack in 2026 job posts. Your profile is strong on Java, Perl, API and cloud — this is the one gap that costs you shortlists.

## Tech
Playwright · TypeScript · Node 18+ · Page Object Model · custom fixtures · GitHub Actions matrix · practice site: [saucedemo.com](https://www.saucedemo.com) (`standard_user` / `secret_sauce`)

---

## Session 0 — Setup (30 min)

- [ ] Check `node -v` (need 18+)
- [ ] Create empty **public** GitHub repo `playwright-e2e-ci` — no README / .gitignore / license
- [ ] `npm init playwright@latest` → **TypeScript**, tests folder `tests`, **yes** to GitHub Actions, **yes** to install browsers
- [ ] `npx playwright test` — sample test passes
- [ ] `npx playwright show-report` — look at the HTML report
- [ ] Commit + push the scaffold **before writing anything**

**Search:** `npm init playwright@latest` · `Playwright getting started TypeScript`

**✅ Done when:** sample test green locally and pushed.

---

## Session 1 — First real tests + locators (2 hrs)

- [ ] Delete the sample tests
- [ ] `npx playwright codegen https://saucedemo.com` — click through a login, read the generated code, then **write your own** (don't keep it)
- [ ] `tests/login.spec.ts` — valid login asserts you land on the inventory page
- [ ] Negative case: `locked_out_user` asserts the error message
- [ ] Refactor every locator to `getByRole` / `getByLabel` / `getByPlaceholder` — no CSS, no XPath

**Search:** `Playwright locators best practices` · `Playwright getByRole` · `Playwright web first assertions` · `Playwright auto waiting actionability` · `Playwright codegen`

**Understand before moving on:** why Playwright needs no `sleep()` — it auto-waits for elements to be *actionable*. This is the #1 "why not Selenium" interview question.

**✅ Done when:** 2 tests pass, zero waits, zero CSS selectors.

---

## Session 2 — Page Object Model (2–3 hrs)

- [ ] `pages/LoginPage.ts`, `pages/InventoryPage.ts`, `pages/CartPage.ts`
- [ ] Each class takes `page: Page` in the constructor; locators as readonly properties, actions as methods
- [ ] Rewrite both tests to use the page objects — specs should read like English
- [ ] Add a custom fixture in `fixtures.ts` so tests receive a pre-logged-in page

**Search:** `Playwright Page Object Model TypeScript` · `Playwright test.extend custom fixtures` · `Playwright fixtures vs beforeEach`

**✅ Done when:** no locator appears in any `.spec.ts` file.

---

## Session 3 — Coverage + config + debugging (2 hrs)

- [ ] Add 3 specs: add-to-cart, full checkout flow, product sort/filter
- [ ] `playwright.config.ts`: `trace: 'on-first-retry'`, `screenshot: 'only-on-failure'`, `video: 'retain-on-failure'`, `retries: 1`
- [ ] Enable all 3 browser projects (chromium, firefox, webkit)
- [ ] **Deliberately break a locator** → run → `npx playwright show-trace` → step the timeline → screenshot it for the README
- [ ] Fix it, confirm green

**Search:** `Playwright trace viewer` · `Playwright config projects browsers` · `Playwright retries flaky tests` · `Playwright --ui mode`

**✅ Done when:** 5 specs × 3 browsers green, and you can explain a trace file out loud.

---

## Session 4 — CI + README (1 hr)

- [ ] Read `.github/workflows/playwright.yml` line by line
- [ ] Add a matrix across the 3 browsers
- [ ] Upload the HTML report as a CI artifact (`actions/upload-artifact`)
- [ ] Add the badge to your README
- [ ] README: what it tests, how to run, architecture, trace screenshot

**Search:** `Playwright GitHub Actions CI` · `GitHub Actions matrix strategy` · `actions/upload-artifact playwright report`

**✅ Done when:** green badge, Actions tab shows the matrix, README explains the design.

---

## Reference

- [playwright.dev/docs/intro](https://playwright.dev/docs/intro) — official docs, best resource by far
- [playwright.dev/docs/best-practices](https://playwright.dev/docs/best-practices) — read this one properly, interviewers quote it
- [playwright.dev/docs/actionability](https://playwright.dev/docs/actionability)
- [playwright.dev/docs/trace-viewer](https://playwright.dev/docs/trace-viewer)

## Two traps

- [ ] **Don't over-build.** 5 tests, then stop. No visual regression, no Allure, no API layer. Over-building is why p1/p2/p4 are still empty folders.
- [ ] **Commit at the end of every session**, even if incomplete. Green history beats perfect history.

## Interview talking point
"I built a cross-browser Playwright + TypeScript suite with Page Object Model and web-first assertions — no explicit waits anywhere, because Playwright waits for actionability. Trace-on-retry means a CI failure gives me a full timeline instead of a screenshot, which is how I'd cut triage time on a real suite."
