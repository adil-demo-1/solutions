import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class IAMConstruct extends Construct {

    constructor(parent: Construct, name: string) {
        super(parent, `${name}-IAM`);
        const lambdaRole = new iam.Role(this, name, {
          assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
          managedPolicies: [
            iam.ManagedPolicy.fromAwsManagedPolicyName(
              'AmazonDynamoDBFullAccess',
            ),
          ],
        });
    }
}