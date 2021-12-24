#!/usr/bin/env node
import 'source-map-support/register';
import { AwsCdkExampleStack } from './aws-cdk-example-stack';
import dev from './config/dev';
import staging from './config/staging';
import prod from './config/prod';
import Environment from './config/Environment';
import getEnvironment from './config/environment-resolver';
import { App } from 'aws-cdk-lib';


const envConfig = {
  DEV: dev,
  STAGING: staging,
  PROD: prod
}

const getEnvProps = (env: Environment) => {
  return {
      stackProps: { env: { region: 'us-east-1', account: '123456789012' } },
      config: { ...envConfig[env] }
  }
}

const app = new App();
const env = getEnvironment(app)
const props = getEnvProps(env)
new AwsCdkExampleStack(app, `AwsCdkExampleStack-${env}`, { ...props.stackProps, ...props.config });
