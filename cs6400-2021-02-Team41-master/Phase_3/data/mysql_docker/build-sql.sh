#!/bin/bash
cd "$(dirname "$0")"
docker-compose down
docker network rm team-41
docker network create team-41
docker-compose up -d
