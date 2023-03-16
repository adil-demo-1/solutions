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

    not_update = []
    for i in body:
        if not 'isbn' in i:
            return {
                'statusCode': 422,
                'body': json.dumps('You must send `isbn`')
            }
        result = table.get_item(Key={"isbn": i['isbn']})
        if not 'Item' in result:
            not_update.append(i['isbn'])
        try:
            table.update_item(
                Key={
                    "isbn": i["isbn"],
                },
                UpdateExpression="SET title = :title, authors = :authors, "
                                 "languages = :languages, countries = "
                                 ":countries, numberOfPages = :numberOfPages, "
                                 "releaseDate = :releaseDate",
                ConditionExpression='isbn = :isbn',
                ExpressionAttributeValues={
                    ':isbn': i['isbn'],
                    ':title': i['title'],
                    ':authors': i['authors'],
                    ':languages': i['languages'],
                    ':countries': i['countries'],
                    ':numberOfPages': i['numberOfPages'],
                    ':releaseDate': i['releaseDate']
                })
        except:
            not_update.append(i['isbn'])

    if not_update:
        not_update_str = ' '.join(not_update)
        return {
            'statusCode': 404,
            'body': json.dumps(
                f"These do not exist: {not_update_str}. Others have been "
                f"updated.")
        }

    return {
        'statusCode': 200,
        'body': json.dumps('Updated')
    }
