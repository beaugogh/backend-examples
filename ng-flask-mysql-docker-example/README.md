# ng-flask-mysql-docker-example

[![Codeship Status for beaugogh/ng-flask-mysql-docker-example](https://app.codeship.com/projects/968611b0-759d-0137-4236-3aefec942851/status?branch=master)](https://app.codeship.com/projects/349643)

## Development

`docker-compose up -d --build`

* Frontend is available with live reload at: http://localhost:4200/
* Backend is available with live reload at: http://localhost:5000/

## Frontend unit testing
`docker-compose exec frontend ng test --watch=false`

## Frontend e2e testing
`docker-compose exec frontend ng e2e --port 4202`

## Backend unit testing
`docker-compose exec backend python test.py`

## Connecting to MySQL database container:
```
host: localhost
port: 3306
user: root
password: root
```
