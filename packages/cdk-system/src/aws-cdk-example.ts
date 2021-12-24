#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import accounts from './utils/accounts';
import Environment from './utils/Environment';
import EnvironmentStage from './utils/environment-stage';

class App extends cdk.App {

  constructor() {
    super();

    const tags = {
      'tag1': 'tag1',
      'tag2': 'tag2'
    };

    const dev = new EnvironmentStage(this, Environment.DEV.toLocaleLowerCase(), {
      tags: { ...tags },
      env: {
        account: accounts[Environment.DEV],
        region: 'us-east-1'
      }
    });

  }
}

const app = new App();
