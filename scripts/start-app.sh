docker compose -f docker-compose.yaml build bracketfrontend;
docker compose -f docker-compose.yaml build bracketbackend;
docker compose up --build;