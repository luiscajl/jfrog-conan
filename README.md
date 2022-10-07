# jfrog-conan

## Backend

Application using AWS SAM and DynamoDB. Node is the main programming language on this part. The other part is the configuration using yaml.
Deployed on your AWS account using sam cli.

```
sam build
sam deploy
```

## Frontend

Angular application with chartjs and primeng as main dependencies.
The website is hosted using github actions on s3 with this url: http://jfrog-conan.es.s3-website-eu-west-1.amazonaws.com/

### Future dependencies

- Backend can be refactored for support location and consume another weather API
- Website can use location to send it to the backend and check another data.
