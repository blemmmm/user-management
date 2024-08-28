#!/bin/bash

rm -f ./.env

rm -f ./server/.env

echo "--> Creating .env file."

echo "NODE_ENV=development" >> .env

cat ./.env

ln ./.env ./server/.env

sudo rm -rf ./caddy/config/
sudo rm -rf ./caddy/data/
sudo rm -rf ./caddy/logs/

