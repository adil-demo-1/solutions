import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from 'constructs';

export class DynamoDBConstruct extends Construct {

    constructor(parent: Construct, name: string, primary_key: string) {
        super(parent, `${name}-DB`);
        const dynamoTable = new dynamodb.Table(this, name, {
            partitionKey: {
                name: primary_key,
                type: dynamodb.AttributeType.STRING,
            },
            tableName: name,
        });
    }
}