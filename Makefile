REPORTER = spec

test-server:
		mocha	--reporter $(REPORTER) \
			server/test/*.js
test-client:

test-all: test-server test-client

.PHONY: test-all
