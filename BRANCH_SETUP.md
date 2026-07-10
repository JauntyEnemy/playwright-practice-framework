# Branch Setup Guide

This repository keeps three implementations of the User Inyerface tests. Each
branch answers a different interpretation of the supplied test cases and the
current website behavior.

## Branch overview

| Branch | Primary purpose | Navigation before TC2-TC4 | Feature ownership | Interests selected | Expected current result |
| --- | --- | --- | --- | --- | --- |
| `main` | Follow the current website behavior | Opens the Welcome page and then enters the registration game | `GamePage` owns help, cookies, timer, and the card indicator | 3 | 4 tests pass |
| `Code-Logic-Change` | Follow the screenshot steps while retaining current-site page ownership | Opens only the Welcome page | `GamePage` still owns help, cookies, timer, and the card indicator | 2 | 4 intentional failures |
| `welcome-page-remodeling` | Follow the screenshot as the product requirement | Opens only the Welcome page | `WelcomePage` owns help, cookies, and timer; card 3 has `PersonalDetailsCardPage` | 2 | 4 intentional failures |

The only remote branch currently available is `origin/main`, which points to
the original `main` implementation.

## Shared framework setup

All three branches use the same core framework:

- Playwright with JavaScript ES modules.
- Chromium through the Desktop Chrome device profile.
- Base URL: `https://userinyerface.com`.
- Page Object Model with `BasePage`, reusable element wrappers, and card page
  objects.
- JSON-backed test data with dynamically generated login information and
  randomly selected interests.
- Failure screenshots, retained failure videos, and retained failure traces.
- CI retries and both list and HTML reporting in CI.

## `main`

Reference commit: `19ab4af`

This branch models the website as it currently behaves. Its shared setup:

1. Opens the Welcome page.
2. Verifies the Welcome page.
3. Clicks the `HERE` registration link before every test.

As a result, TC2, TC3, and TC4 execute on the registration/game screen even
though the supplied screenshot does not explicitly include that navigation.

Key characteristics:

- Spec file: `tests/userinyerface.spec.js`.
- `GamePage` owns the help form, cookie form, timer, and card indicator.
- The data configuration selects 3 interests, matching the current website's
  validation.
- The timer assertion expects the full value `00:00:00`.
- The cookie action is represented as closing the form with the current
  `Not really, no` button.

Use this branch when the expected solution should accommodate the current
website and passing execution is the deciding requirement.

## `Code-Logic-Change`

Reference commit: `07fa26a`

This branch follows the screenshot's execution order but preserves the
current implementation-oriented page ownership.

Key characteristics:

- Spec file: `tests/userinyerface.exact.spec.js`.
- Shared setup only opens the Welcome page.
- TC1 explicitly verifies Welcome, clicks `HERE`, and verifies cards 1, 2,
  and 3 in sequence.
- TC2-TC4 remain on the Welcome page because the screenshot does not instruct
  the test to enter the registration game.
- `GamePage` still owns help, cookies, timer, and the card indicator.
- The data configuration selects exactly 2 interests.
- The timer assertion checks that the value starts with `00:00`.

Expected failures on the current website:

- TC1 remains on card 2 because the current website requires 3 interests.
- TC2 cannot find the help control on the Welcome page.
- TC3 cannot find the cookie control on the Welcome page.
- TC4 cannot find the timer on the Welcome page.

Use this branch to demonstrate that constructing a page object does not cause
navigation, or when page-object ownership should mirror the current DOM while
the test flow must remain faithful to the supplied steps.

## `welcome-page-remodeling`

Reference commits: `16aa580` and `27010a2`

This is the fully requirement-driven interpretation. It assumes the supplied
test cases describe the intended product design, even when the current website
does not implement that design.

Key characteristics:

- Spec file: `tests/userinyerface.exact.spec.js`.
- Shared setup only opens the Welcome page.
- `WelcomePage` owns the help form, cookie form, timer, and registration link.
- `LoginCardPage`, `InterestCardPage`, and `PersonalDetailsCardPage` represent
  cards 1, 2, and 3 respectively.
- The generic `GamePage` no longer exists.
- The data configuration selects exactly 2 interests.
- The timer assertion checks that the value starts with `00:00`.

The four failures are intentional requirement signals:

- TC1 proves that selecting the specified 2 interests does not open card 3.
- TC2 proves that the expected help feature is missing from Welcome.
- TC3 proves that the expected cookie feature is missing from Welcome.
- TC4 proves that the expected timer is missing from Welcome.

Use this branch when the test cases are the source of truth and the page-object
model should describe the intended product rather than the current defective
placement of features.

## Switching branches

Confirm that the working tree is clean before switching:

```bash
git status --short
```

Switch to the live-site-aligned setup:

```bash
git switch main
```

Switch to exact steps with current-site ownership:

```bash
git switch Code-Logic-Change
```

Switch to exact steps with requirement-driven ownership:

```bash
git switch welcome-page-remodeling
```

Run the active branch's suite with:

```bash
npm test
```

On the two exact-step branches, failures should be reviewed as evidence of a
requirement/implementation mismatch rather than automatically "fixed" by
adding navigation or changing the required values.
