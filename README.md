# ui-router-dom-leak-test
UI-Router DOM nodes leak (Testing app)

This is a test harness to find leaking DOM nodes in UI-Router.

The test harness is available by cloning the repository, then running:

```
npm install
npm start
```

Or, use the online version:

https://christopherthielen.github.io/ui-router-dom-leak-test/#/leaktest-instructions

This harness is designed to rapidly trigger state changes over a long period of time.
The Chrome Dev Tools (Timeline or Performance tabs) can be used to monitor memory and DOM node usage.

### Be sure to collect garbage *AFTER STARTING* and *BEFORE STOPPING* the profiler.
