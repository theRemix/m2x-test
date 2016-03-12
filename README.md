
```
cp .env-sample .env
```

edit .env


```
env $(cat .env | xargs) node .
```
