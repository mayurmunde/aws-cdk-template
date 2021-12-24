import { Construct } from "constructs";
import Environment from "./Environment";

export default (Construct: Construct): Environment => {
    let envString = Construct.node.tryGetContext('ENVIRONMENT');
    envString = envString ? envString.toUpperCase() : envString;

    if(!(envString && Object.values(Environment).includes(envString))) {
        let message = 'context env must be specified ';
        message += Object.values(Environment).join(', ');
        message += '. Example --context ENVIRONMENT=DEV';
        throw new Error(message);
    }

    const environment = Environment[envString as keyof typeof Environment ];

    /* if(!accountId) { 
        throw new Error('AccountId')
    }
 */
    return environment;
};