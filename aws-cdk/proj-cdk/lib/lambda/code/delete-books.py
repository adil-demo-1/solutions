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

    not_delete = []

    for i in body:
        if not 'isbn' in i:
            return {
                'statusCode': 422,
                'body': json.dumps('You must send `isbn`')
            }
        result = table.get_item(Key={"isbn": i['isbn']})
        if not 'Item' in result:
            not_delete.append(i['isbn'])

        table.delete_item(Key={"isbn": i["isbn"]})

    if not_delete:
        not_delete_str = ' '.join(not_delete)
        return {
            'statusCode': 404,
            'body': json.dumps(f"These do not exist: {not_delete_str}. "
                               f"Others have been deleted.")
        }

    return {
        'statusCode': 200,
        'body': json.dumps('Deleted')
    }
