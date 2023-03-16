import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { LambdaConstruct } from '../lambda/lambda-construct'
import { Construct } from 'constructs';
import { PythonFunction } from '@aws-cdk/aws-lambda-python-alpha';

export class ApiGatewayConstruct extends Construct {

    api: any
    items: any

    constructor(parent: Construct, name: string, parameter: string, lambda: PythonFunction) {
        super(parent, `${name}-Api`);
        const api = new apigateway.RestApi(this, name, {
            restApiName: name,
        });

        const items = api.root.addResource(name);
        const getItemIntegration = new apigateway.LambdaIntegration(lambda);
        items.addMethod("GET", getItemIntegration, {
            requestParameters: {
                'method.request.querystring.title': true
            },
        });

        this.api = api
        this.items = items
    }
    put(lambda: PythonFunction) {
        const getItemIntegration = new apigateway.LambdaIntegration(lambda);
        this.items.addMethod("PUT", getItemIntegration);
    }

    delete(lambda: PythonFunction) {
        const getItemIntegration = new apigateway.LambdaIntegration(lambda);
        this.items.addMethod("DELETE", getItemIntegration);
    }

    post(lambda: PythonFunction) {
        const getItemIntegration = new apigateway.LambdaIntegration(lambda);
        this.items.addMethod("POST", getItemIntegration);
    }
}