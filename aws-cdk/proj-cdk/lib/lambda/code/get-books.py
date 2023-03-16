import os
import json
import boto3


def handler(event, context):
    if not 'isbn' in event['multiValueQueryStringParameters']:
        return {
            'statusCode': 403,
            'body': json.dumps('The search key must be `isbn`')
        }

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['TABLE_NAME'])
    output = []
    for i in event['multiValueQueryStringParameters']['isbn']:
        result = table.get_item(Key={"isbn": i})
        if 'Item' in result:
            output.append(result['Item'])

    if output:
        return {
            'statusCode': 200,
            'body': json.dumps(output)
        }

    return {
        'statusCode': 404,
        'body': json.dumps('Not found')
    }