#kubectl delete -f k8s
#docker build -t someonesgarden/spotifire-client:latest -t someonesgarden/spotifire-client:$SHA -f ./client/Dockerfile ./client
#docker build -t someonesgarden/spotifire-api:latest -t someonesgarden/spotifire-api:$SHA -f ./api/Dockerfile ./api
#docker push someonesgarden/spotifire-client:latest
#docker push someonesgarden/spotifire-api:latest
#docker push someonesgarden/spotifire-client:$SHA
#docker push someonesgarden/spotifire-api:$SHA
#
#kubectl apply -f k8s
#kubectl set image deployments/api-deployment api=someonesgarden/spotifire-api:$SHA
#kubectl set image deployments/client-deployment client=someonesgarden/spotifire-client:$SHA

docker build -t gcr.io/spotifire-tokyo/spotifire-docker:latest  -f ./server/Dockerfile ./server
docker push gcr.io/spotifire-tokyo/spotifire-docker:latest
