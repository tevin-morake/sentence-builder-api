# Sentence Builder API

This is a NodeJS backend API for a sentence builder app.
This API integrates with MongoDB .

The entire application is contained within the `src` folder.

# Get started

### Clone the repo

```shell
git clone https://github.com/tevin-morake/sentence-builder-api/.git
cd sentence-builder-api
```

## Run the api locally
    node index.js

# REST API

Below are a set of examples of the restapi calls that run

## Get list of Sentences

### Request

`GET /api/get/sentences`

    curl -i -H 'Accept: application/json' http://localhost:3000/api/get/sentences

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 3

    [
    {
        "_id": "5f27fe7bcd85180017a19004",
        "sentence": "Aha! accommodation from her can stop"
    },
    {
        "_id": "5f27ff05cd85180017a19005",
        "sentence": "I have become"
    },
    {
        "_id": "5f27ff59cd85180017a19006",
        "sentence": "Armour"
    }
]

## Create a new sentence

### Request

`POST /api/post/sentence`

    curl -i -H 'Accept: application/json' -d 'name=Foo&status=new' http://localhost:3000/api/post/sentence

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 Ok
    Connection: close
    Content-Type: application/json
    Location: /api/poost/sentence
    Content-Length: 36

    {{"message":"sentence 5f280911cd85180017a19007 saved successfully","status":200}

