---
name: site-validation
description: Build and inspect the OpenJ GitHub Pages site with the Jekyll container and Chromium across desktop and mobile layouts.
---

# OpenJ Site Validation

The OpenJ site is a modified HTML5 UP Editorial template. GitHub Pages serves the generated static site from `docs/`; Jekyll expands the shared includes before serving it.

## Build with Jekyll

Run from the repository root:

```sh
docker run --rm \
  -v "$PWD:/srv/jekyll" \
  jekyll/jekyll:4.4.1 \
  jekyll build --source /srv/jekyll/docs --destination /srv/jekyll/_site
```

## Serve locally

Start the Jekyll server with the repository `docs` directory mounted:

```sh
docker rm -f openj-jekyll 2>/dev/null || true
docker run --rm --name openj-jekyll \
  -p 4000:4000 \
  -v "$PWD:/srv/jekyll" \
  jekyll/jekyll:4.4.1 \
  jekyll serve --host 0.0.0.0 --source /srv/jekyll/docs --destination /srv/jekyll/_site
```

Open `http://localhost:4000/` in Chromium. Keep the container running while inspecting pages, then stop it with:

```sh
docker rm -f openj-jekyll
```

## Chromium Checks

Render a desktop screenshot:

```sh
chromium --headless --no-sandbox --disable-gpu \
  --window-size=1440,1100 \
  --screenshot=/tmp/openj-desktop.png \
  http://127.0.0.1:4000/index.html
```

Render a mobile screenshot:

```sh
chromium --headless --no-sandbox --disable-gpu \
  --window-size=390,844 \
  --screenshot=/tmp/openj-mobile.png \
  http://127.0.0.1:4000/index.html
```

Check representative pages as well as the homepage, especially pages with long code blocks, images, collapsible navigation, and article layouts:

```text
/index.html
/reckoning.html
/getting-started pages
/thinking.html
/tool-calls.html
/airlock-browser.html
/airlock-cloudops.html
```

Verify both collapsed and expanded states for Airlock, Libraries, and Getting Started. Check that the mobile sidebar does not push the main content off-screen and that desktop spacing remains intact.

## Template Note

OpenJ uses a modified version of the [Editorial template](https://html5up.net/editorial) by HTML5 UP. Preserve its visual language while keeping the OpenJ content, navigation, and examples specific to this project.
