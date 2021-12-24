import { Stage, StageProps, Tags } from "aws-cdk-lib";
import { Construct } from "constructs";
import { AwsCdkExampleStack } from "../aws-cdk-example-stack";

interface EnvironmentStageProps extends StageProps {
    tags: Record<string, unknown>
}

export default class EnvironmentStage extends Stage {
    constructor(scope: Construct, id: string, props: EnvironmentStageProps) {
        super(scope, id, props);

        const branchName = process.env.BRANCH_NAME?.split('/').pop()?.replace('_', '-');
        const stackName = process.env.BRANCH_NAME === 'main' ? undefined : `${branchName}`;

        new AwsCdkExampleStack(this, `${stackName}-exampleStack`);

        Object.entries(props.tags).forEach(([key, value]) => Tags.of(this).add(key, value as string));

    }
}