<!-- markdownlint-disable -->
<p align="center">
    <img width="240" src="https://saf.mitre.org/_nuxt/safLogo.2eddc71f.svg" style="text-align: center;">
</p>
<h1 align="center">MITRE Security Automation Framework Training Site</h1>
<h4 align="center">A comprehensive collection of security training classes with numerous features✨</h4>

# Overview

The MITRE Security Automation Framework (SAF) Training Site is a collaborative effort between the SAF Team, our partners, and the broader security community. It offers a wide range of classes and resources.

For a comprehensive view of the courses we provide, we invite you to visit one of the deployment locations listed below.

Our content includes:
- Comprehensive guides on using the MITRE SAF Tooling, Framework, and applications
- Step-by-step instructions for writing effective InSpec compliance tests
- Both basic and advanced classes on writing InSpec-based security validation profiles
- Detailed courses on advanced InSpec resource development
- And much more!

# Hosting

The MITRE SAF Training sites are hosted on:

- GitHub Pages: https://mitre.github.io/saf-training/
- Netlify: https://mitre-saf-training.netlify.app/

## Special Thanks

We extend our special thanks to the author of this VuePress theme - A New Hope, Mr. Hope! Check out the original work of the theme that powers our training site at <https://theme-hope.vuejs.press/>

# Building, Development & Hacking

## Requirements

- Node v22.18+

## Running in Dev

```shell
npm ci
npm run docs:dev
```

To clear the development cache, use `npm run docs:dev -- --clean-cache`.

## Building

```shell
npm run docs:build
```

Preview the build with `npm run docs:serve` at <http://127.0.0.1:8080>.

## Running Cypress Tests

```shell
npm run test:e2e
```

Builds once, serves production files, runs Cypress, and stops the server. Leave `GITHUB_DEPLOY` unset.

With `docs:serve` already running, use `npm run cypress:run` to rerun tests or `npm run cypress:open` to debug interactively.

### Continuous integration and deployment

Cypress tests the root (`/`) layout. A separate workflow builds and deploys the GitHub Pages (`/saf-training/`) layout on pushes to `main`.

## Submitting a Pull Request or Additional Content

We welcome your contributions! Feel free to fork the project and submit a Pull Request to provide updates, content fixes, or even entirely new topics and courses.

If you find something that needs fixing, please open an Issue on the project's issue board (PRs are welcome!).

### NOTICE

© 2018-2024 The MITRE Corporation.

Approved for Public Release; Distribution Unlimited. Case Number 18-3678.

### NOTICE

MITRE grants express written permission to use, reproduce, distribute, modify, and otherwise leverage this software to the extent permitted by the licensed terms provided in the LICENSE.md file included with this project.

### NOTICE

This software was produced for the U. S. Government under Contract Number HHSM-500-2012-00008I, and is subject to Federal Acquisition Regulation Clause 52.227-14, Rights in Data-General.

No other use other than that granted to the U. S. Government, or to those acting on behalf of the U. S. Government under that Clause, is authorized without the express written permission of The MITRE Corporation.

For further information, please contact The MITRE Corporation, Contracts Management Office, 7515 Colshire Drive, McLean, VA 22102-7539, (703) 983-6000. 
