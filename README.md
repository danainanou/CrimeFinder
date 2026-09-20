# CrimeFinder

A UK area crime finder and a 2 hour React build challenge

## How to run the app

`cd CrimeFinder-challenge`

This is the real project. My setup is fun like that, woop woop...

`npm i`

To install the node modules

`npm run dev`

To run the application.

Please ensure you are running node version 20+!

## Intro

Oh boy, yeah I get it, this was never about succeeding the challenge, 2h was not enough - not by a long shot!
Well played, gg.

As a mainly Vue developer learned a lot about React before and during the challenge though and I appreciate that!

I went a few minutes over the 2h goal because of issues I was having with the set up (all my fault...) but the real first commit was `Install react & npm packages`. Unless we're not counting the set up? :D

Also this read.me will come afterwards because, dinner. Om nom nom.

## The one thing I'm not happy with

There are a **lot** of things I'm not happy with but if I had to pick just one it would be the lack of lazy loading results, pagination and general performance optimisation. Currently it's an absolute nightmare for large data sets. Try `SW1A 1AA` and look at that table expand into orbit... Yuck.

Ok one more, sorry. The lack of a loading message and poor error handling in the UI just irks me.

## Trade offs

I've managed to mostly tick off the core features of the task but there were some good and bad decisions involved. Let's begin:

### The good:

- Ignored all the stretch goals. I think this was a wise decision. I'm fast _(-ish)_ but I'm not that fast.

- I decided on MUI for the date picker and react table for the table. It would be madness not to use already made UI components considering the 2h mark.

- Using a form submit for the search was the best decision I took so that API calls are minimised (and also it's the only good UX in this project _eyeroll_)

### The bad:

- Decided to focus on the multiple postcodes for the search input without AI. I selfishly wanted to challenge myself and prioritised that which, to be honest, took up more time than I estimated and led to a domino effect of bad decisions. I didn't even manage to include the search query bit. Hindsight is a cruel mistress...

- All the API calls and logic is happening in App.tsx. This could have been managed muuuuuch more cleanly. Alas...

- We don't talk about the bundle size. Mostly because I didn't add a bundle analyzer.

### The ugly:

- Used AI for styling so that it'll be fast. The app doesn't look great. Can I _please_ go back and change it? The designer in me is dying a little every time I look at it. :'(

- Even though I added Vitest and React Router I had already decided that these two were nice to haves. I'm a strong beliver in always adding unit and integration tests but this time it was just not happening. I did attempt to add tests using Copilot but I hadn't configured it beforehand (mistake!!!) so it was failing at the first hurdle and I didn't have the time to deal with it properly.

- Do you remember saying `If the user clicks on postcode, crime type, or outcome status filter the data based on that selection.`. I 'member.

- _What is accessibility?_

### The lessons

- Don't overestimate your abilities. Just use the darn AI when you need it.

- Don't panic! Everything is getting nicely out of control.
