var assert   = require("assert");
var agent    = require("supertest");
var Rill     = require("rill");
var parallel = require("../");

describe("Rill/Parallel", function () {
	it("should run in parallel", function (done) {
		var request = agent(
			Rill()
				.use(function (ctx, next) {
					ctx.res.body = new Date;
					return next();
				})
				.use(parallel([
					function (ctx, next) {
						return next().then(sleep(1000));
					},
					function (ctx, next) {
						return sleep(1000).then(next);
					}
				]))
				.use(function (ctx) {
					ctx.res.body = {
						ms: +new Date - ctx.res.body
					};
				})
				.listen()
		);

		request
			.get("/")
			.expect(200)
			.expect(function (res) {
				assert(res.body.ms < 1100);
			})
			.end(done)
	});
});

function respond (status, test) {
	return function (ctx) {
		ctx.res.status = status;
		if (typeof test === "function") test(ctx);
	};
}

function sleep (ms) {
	return new Promise(function (accept) {
		setTimeout(accept, ms);
	});
}