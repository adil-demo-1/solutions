import os
import json
from json import JSONDecodeError

import boto3


def handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['TABLE_NAME'])
    try:
        body = json.loads(event["body"])
    except JSONDecodeError:
        return {
            'statusCode': 403,
            'body': json.dumps('Not a valid input')
        }
    for i in body:
        table.put_item(
            Item={
                "title": i["title"],
                "isbn": i["isbn"],
                "authors": i["authors"],
                "languages": i["languages"],
                "countries": i["countries"],
                "numberOfPages": i["numberOfPages"],
                "releaseDate": i["releaseDate"],
            }
        )
    return {
        'statusCode': 200,
        'body': json.dumps('Added')
    }
