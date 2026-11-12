# Security policy

## Reporting a vulnerability

Report security problems privately through GitHub. Open the repository's **Security** tab and choose **Report a vulnerability**:

- [inkbar/inkbar](https://github.com/inkbar/inkbar/security/advisories/new) for the viewer packages
- [inkbar/gloss](https://github.com/inkbar/gloss/security/advisories/new) for the Gloss format and its library
- [inkbar/landing](https://github.com/inkbar/landing/security/advisories/new) for inkbar.dev and its documentation

Please don't open a public issue or pull request for a vulnerability.

Tell us what you found, how to reproduce it, and which versions it affects. A PDF that triggers the problem helps most. Attach it to the private report rather than linking to a public copy.

## What happens next

We reply to the report on GitHub, work on a fix in a private fork, and publish an advisory with the release that fixes it. We credit you in the advisory unless you ask us not to.

## Supported versions

We fix vulnerabilities in the latest release of each package only, so upgrade to get a fix.

## Scope

Inkbar renders PDFs with [PDF.js](https://github.com/mozilla/pdf.js). If the problem is in PDF.js itself, report it to Mozilla as well, and tell us so we can update once they ship a fix.
