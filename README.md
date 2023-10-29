# microbasic
This project shows implementation of microservices using node and react


Docker Commands:
docker pull <image_name>: Pulls an image or a repository from a registry.

docker build <path_to_Dockerfile>: Builds an image from a Dockerfile.

docker run <image_name>: Runs a command in a new container based on the provided image.

docker ps: Lists the running containers.

docker ps -a: Lists all containers, including the ones that are not running.

docker images: Lists all locally stored Docker images.

docker stop <container_id>: Stops a running container.

docker rm <container_id>: Removes a container.

docker rmi <image_id>: Removes an image.

docker exec -it <container_id> /bin/bash: Executes a new command inside a running container.

Kubernetes Commands (kubectl):
kubectl get pods: Lists all pods in the current namespace.

kubectl get deployments: Lists all deployments in the current namespace.

kubectl get services: Lists all services in the current namespace.

kubectl create -f <filename>: Creates a resource from a file.

kubectl apply -f <filename>: Applies a configuration to a resource by filename.

kubectl delete <resource_type> <resource_name>: Deletes a specific resource.

kubectl describe <resource_type> <resource_name>: Provides detailed information about a resource.

kubectl logs <pod_name>: Prints the logs from a container in a pod.

kubectl scale --replicas=<number> deployment/<deployment_name>: Scales a deployment to the specified number of replicas.

kubectl rollout restart deployment/<deployment_name>: Restarts a deployment by creating a new replica set and scaling it down.
