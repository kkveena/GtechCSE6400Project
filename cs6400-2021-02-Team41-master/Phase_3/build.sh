#!/bin/bash
cd "$(dirname "$0")"
#docker build -o webapp/src/main/resources/static  -t  local.io/npm-install:1.0.0-snapshot -f Dockerfile.npm .
#docker build -o out  -t  local.io/npm-install:1.0.0-snapshot -f Dockerfile .
docker build  -t  local.io/team-41:1.0.0-snapshot -f Dockerfile .
docker rm -f team-41
docker run --network=team-41 --name team-41 -p 8080:8080 local.io/team-41:1.0.0-snapshot
#docker run -e NODE_ENV=dev -v webpack-app:/tmp -w /tmp   local.io/npm-install:1.0.0-snapshot npm run build