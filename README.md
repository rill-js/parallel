# Rill Parallel
Simple utility to run standard Rill middleware in parallel.

# Installation

#### Npm
```console
npm install @rill/parallel
```

## Example

```js
// Run both timeouts in parallel.
app.use(parallel([
	(ctx, next)=> next().then(sleep(1000)),
	(ctx, next)=> sleep(1000).then(next)
]))

function sleep (ms) {
	return new Promise(function (accept) {
		setTimeout(accept, ms);
	});
}
```

---

### Contributions

* Use gulp to run tests.

Please feel free to create a PR!
