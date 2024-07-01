#!/bin/bash
yarn dev & PID=$!
wait-on http://localhost:3000
yarn test
kill $PID