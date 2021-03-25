npx nyc --silent npx jasmine --fail-fast=false --stop-on-failure=false &&^
npx nyc check-coverage --exclude spec &&^
npx nyc check-coverage --include spec/ --statements 100 --branches 100 --functions 100
