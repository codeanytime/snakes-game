import SnakesGame from "./SnakesGame";
import { AwsRum, AwsRumConfig } from 'aws-rum-web';

declare global {
    interface Window {
        awsRum?: AwsRum;
    }
}

try {
    const config: AwsRumConfig = {
        sessionSampleRate: 1 ,
        identityPoolId: "ap-southeast-1:c621b075-37ab-4979-a0c8-5a12d2905509" ,
        endpoint: "https://dataplane.rum.ap-southeast-1.amazonaws.com" ,
        telemetries: ["performance","errors","http"] ,
        allowCookies: true ,
        enableXRay: false ,
        signing: true // If you have a public resource policy and wish to send unsigned requests please set this to false
    };

    const APPLICATION_ID: string = '02f4700a-b0dd-4dbd-b836-3cc435279d96';
    const APPLICATION_VERSION: string = '1.0.0';
    const APPLICATION_REGION: string = 'ap-southeast-1';

    const awsRum: AwsRum = new AwsRum(
        APPLICATION_ID,
        APPLICATION_VERSION,
        APPLICATION_REGION,
        config
    );

    // mark as used
    window.awsRum = awsRum;
} catch (error) {
    // Ignore errors thrown during CloudWatch RUM web client initialization
}

function App() {
  return <SnakesGame />;
}

export default App;
