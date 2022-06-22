.PHONY: start, test

start:
	source ./.env && yarn run start

test:
	/usr/bin/time yarn run test
