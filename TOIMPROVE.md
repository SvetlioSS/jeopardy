# Process

1. First 2 hours:
  - understand the requirements
  - understand the Jeopardy game
  - understand the data
  - translate the requirements into visual design (in my mind only 😊)
  - breakdown tasks
  - breakdown "extended scope" tasks
  - initialize a new repository and create a new Nextjs project
  - normalize the data
  - implement initial backend to serve the Jeopardy data
2. Next 2 hours:
  - implement landing page
  - implement game logic
  - implement OpenAI integration
  - Manual testing

# To improve

## Product

* UX / UI to be more game oriented (more colors, animations etc)
* Responsiveness / mobile version
* Start a game session and show a counter of the session. There should be some time limit.
* Add support for all round types of the Jeopardy game.
* Add a meaningful "finish" to the game.

## Tech

* Tests
* OpenAI integration to be tested
* Re-work backend. Instead of get-categories should be get-game-session which returns the state of the game. Don't save the game state on the client.
* Route 1 should be landing page. After which re-route to a separate page /game?session=123456
* When having multiple pages -> create a reusable layout component
* Invalid / expired session IDs to re-route to the landing page
* Split into components
* Split into hooks
* Add state management solution
* Move UI components to reusable component library ideally managed with Storybook
* get-question shouldn't return the answer as the game can be hacked
* cleanup backend and normalization code
* add internationalization utils or library (too many hardcoded texts...)
* Use formik or another form handling solution
* Fix types everywhere and get rid of "any"
* Use an actual DB instead of all the sync file reading
* Error handling
* Edge case testing
* Fix Vercel deployment issues
* Add Jeopardy ./tools/data to .gitignore
