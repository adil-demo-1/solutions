import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DynamoDBConstruct } from './dynamodb/dynamodb-construct'
import { LambdaConstruct } from './lambda/lambda-construct'
import { ApiGatewayConstruct } from './apigateway/apigateway-construct'
import { IAMConstruct } from './iam/iam-construct'

export class ProjCdkStack extends cdk.Stack {

    table_name: string = "BooksTable"
    primary_key: string = "isbn"
    project_name: string = "books"

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        this.start()
    }

    start() {
        new IAMConstruct(this, `${this.project_name}-role`)
        new DynamoDBConstruct(this, this.table_name, this.primary_key)

        const books_lambda = new LambdaConstruct(this, this.project_name, this.table_name, this.primary_key)
        const books_get = books_lambda.get()
        const books_put = books_lambda.put()
        const books_delete = books_lambda.delete()
        const books_post = books_lambda.post()

        const apigateway = new ApiGatewayConstruct(this, this.project_name, this.primary_key, books_get)
        apigateway.put(books_put)
        apigateway.delete(books_delete)
        apigateway.post(books_post)
    }
}
