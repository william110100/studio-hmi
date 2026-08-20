## What

<!-- One or two sentences: what this PR adds/changes -->

## Why

<!-- Link to the milestone/ticket. Why now, why this approach. -->

## Screenshots / recording

<!-- Required for anything touching app/ or components/ -->

## How to verify

<!-- Exact steps a reviewer runs locally to see this work -->

## Checklist

- [ ] Follows screen/hook/service boundaries (no fetch/store access in a `.screen.tsx`)
- [ ] No hardcoded UI strings — all copy through `t()`
- [ ] New/changed logic has a unit test
- [ ] Loading, empty, and error states considered (if data-driven)
- [ ] Verified on both iOS and Android simulators
- [ ] Verified in at least one non-English locale
- [ ] No new `any`, no `// eslint-disable` without a comment explaining why
- [ ] Lint, typecheck, and tests pass locally
