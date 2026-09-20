# mayur's academic website

Static personal site for GitHub Pages: plain HTML, one CSS file, one JS file. No framework, no build step.

```
index.html                  banner · about · stats · news · research focus · timeline · papers · contact
publications.html           4 papers, grouped by year, with BibTeX
projects.html               5 research projects (text only, no figures)
cv.html                     full web CV (links to assets/cv.pdf)
404.html
assets/css/site.css         design tokens + all styles
assets/js/main.js           theme toggle, mobile menu, timeline filters, BibTeX, scroll reveal
assets/img/mark.svg         favicon
assets/img/portrait-placeholder.svg   stand-in for your photo — the only image on the site
```

## Before you share the link

Search the project for `EDIT` and `MMM`. Every placeholder is marked with one of them.

- [ ] **Your photo** — add `assets/img/mayur.jpg` (4:5 crop, ~800×1000px) and update the `src` in `index.html`
- [ ] **Profile links** — every `href="#"` (Google Scholar, GitHub, LinkedIn)
- [ ] **Paper links** — PDFs and code repos on `publications.html`
- [ ] **News months** — two items still say `MMM`
- [ ] **`assets/cv.pdf`** — replace with your real CV PDF
- [ ] **MICCAI banner link** must be publicly shareable, or visitors will hit an access wall
- [ ] Check on a phone and in dark mode

## Editing the timeline

In `index.html`, copy an `<li class="tl-item">` block inside `#timeline-list`.

- `data-type` is one of `research`, `paper`, `industry`, `education`. It sets the colour and the filter.
- Add `is-featured` to the class list to highlight an entry.
- Filter counts update automatically; a category with no entries hides its button.

## News

`<ul class="news">` in `index.html`. Newest first, six items is a good length. The green dot marks the
top item — move the `<span class="dot">` when you add a newer one.

## Theme

All colours are tokens at the top of `assets/css/site.css`. The dark palette appears twice: once under
`prefers-color-scheme` and once under `[data-theme="dark"]`. Edit both. Dark mode follows the OS and the
header toggle overrides it.

## Preview locally

```powershell
python -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages

```powershell
git init
git add -A
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/USERNAME/USERNAME.github.io.git
git push -u origin main
```

Then **Settings → Pages → Deploy from a branch → `main` / root**. Live at `https://USERNAME.github.io`.

`404.html` uses root-relative paths, correct for a `USERNAME.github.io` repo. `.nojekyll` makes GitHub
serve the files as-is.
