### Build nodejs image
```
docker build -t kuyseng/28th-labs-4 .
docker push kuyseng/28th-labs-4
```

### Run with kubernet
```
kubectl apply -f employee-app.yml
minikube service employee-svc
# delete
kubectl delete -f employee-app.yml
```