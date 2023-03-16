import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import { PythonFunction, PythonLayerVersion } from '@aws-cdk/aws-lambda-python-alpha';
import { Construct } from 'constructs';

export class LambdaConstruct extends Construct {
    lambda_name: string = ""
    table_name: string = ""
    primary_key: string = ""
    constructor(parent: Construct, lambda_name: string, table_name: string, primary_key: string) {
        super(parent, lambda_name);
        this.lambda_name = lambda_name
        this.table_name = table_name
        this.primary_key = primary_key
    }

    get() {
        const py_function = new PythonFunction(this, this.lambda_name + 'get', {
            entry: "./lib/lambda/code",
            runtime: lambda.Runtime.PYTHON_3_9,
            index: `get-${this.lambda_name}.py`,
            handler: "handler",
            environment: {
                TABLE_NAME: this.table_name,
                PRIMARY_KEY: this.primary_key,
            }
        });

        const statement = new iam.PolicyStatement();
        statement.addActions("dynamodb:GetItem");
        statement.addResources("*");

        py_function.addToRolePolicy(statement)
        return py_function
    }

    put() {
        const py_function = new PythonFunction(this, this.lambda_name + 'put', {
            entry: "./lib/lambda/code",
            runtime: lambda.Runtime.PYTHON_3_9,
            index: `put-${this.lambda_name}.py`,
            handler: "handler",
            environment: {
                TABLE_NAME: this.table_name,
                PRIMARY_KEY: this.primary_key,
            }
        });

        const statement = new iam.PolicyStatement();
        statement.addActions("dynamodb:PutItem");
        statement.addResources("*");

        py_function.addToRolePolicy(statement)
        return py_function
    }

    delete() {
        const py_function = new PythonFunction(this, this.lambda_name + 'delete', {
            entry: "./lib/lambda/code",
            runtime: lambda.Runtime.PYTHON_3_9,
            index: `delete-${this.lambda_name}.py`,
            handler: "handler",
            environment: {
                TABLE_NAME: this.table_name,
                PRIMARY_KEY: this.primary_key,
            }
        });

        const statement = new iam.PolicyStatement();
        statement.addActions("dynamodb:DeleteItem");
        statement.addActions("dynamodb:GetItem");
        statement.addResources("*");

        py_function.addToRolePolicy(statement)
        return py_function
    }

    post() {
        const py_function = new PythonFunction(this, this.lambda_name + 'post', {
            entry: "./lib/lambda/code",
            runtime: lambda.Runtime.PYTHON_3_9,
            index: `post-${this.lambda_name}.py`,
            handler: "handler",
            environment: {
                TABLE_NAME: this.table_name,
                PRIMARY_KEY: this.primary_key,
            }
        });

        const statement = new iam.PolicyStatement();
        statement.addActions("dynamodb:UpdateItem");
        statement.addActions("dynamodb:GetItem");
        statement.addResources("*");

        py_function.addToRolePolicy(statement)
        return py_function
    }
}