<h1 align="center">
  <!-- Logo -->
  <img src="https://raw.githubusercontent.com/rill-js/rill/master/Rill-Icon.jpg" alt="Rill"/>
  <br/>
  @rill/parallel
	<br/>

  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-stable-brightgreen.svg?style=flat-square" alt="API stability"/>
  </a>
  <!-- Standard -->
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Standard"/>
  </a>
  <!-- NPM version -->
  <a href="https://npmjs.org/package/@rill/parallel">
    <img src="https://img.shields.io/npm/v/@rill/parallel.svg?style=flat-square" alt="NPM version"/>
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/@rill/parallel">
    <img src="https://img.shields.io/npm/dm/@rill/parallel.svg?style=flat-square" alt="Downloads"/>
  </a>
  <!-- Gitter Chat -->
  <a href="https://gitter.im/rill-js/rill">
    <img src="https://img.shields.io/gitter/room/rill-js/rill.svg?style=flat-square" alt="Gitter Chat"/>
  </a>
</h1>

Simple utility to run standard Rill middleware in parallel.

# Installation

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
	return new Promise((accept)=> setTimeout(accept, ms))
}
```

---

### Contributions

* Use `npm test` to run tests.

Please feel free to create a PR!
