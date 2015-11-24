var deferred = Promise.resolve();

/**
 * Rwrite `from` to `to`.
 *
 * @param {String|RegExp} from
 * @param {String} to
 * @return {Function}
 * @api public
 */
module.exports = function (fns) {
	if (!Array.isArray(fns)) throw new TypeError("@rill/parallel: Middleware must be an array.");
	if (!fns.every(isFn)) throw new TypeError("@rill/parallel: Middleware must be functions.");
	var len = fns.length;

	return function parallel (ctx, next) {
		var promises = new Array(len);
		for (var i = 0; i < len; i++) promises[i] = fns[i](ctx, noop);

		return Promise.all(promises).then(next);
	}
};

/**
 * Test if a value is a function.
 *
 * @param {*} fn
 * @api private
 */
function isFn (fn) { return typeof fn === "function"; }

/**
 * Empty promise noop.
 */
function noop () { return deferred };