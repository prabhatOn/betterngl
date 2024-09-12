import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text
} from '@react-email/components';
interface VerificationEmailProps {
    username: string;
    otp: string;
}
export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>Verification Code</title>

                <Font
                    fontFamily="Roboto"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
                        format: 'woff2',
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>
            <Preview>Here&apos;s your verification code: {otp}</Preview>
            <Section>
                <Row>
                    <Heading as="h2">Hi {username},</Heading>
                </Row>
                <Row>
                    <Text>
                        Thank you for registering with us. Please use the following code to verify your email address.
                    </Text>
                </Row>
                <Row>
                    <Text>
                        {otp}
                    </Text>
                </Row>
                <Row>
                    <Text>
                        If you did not register with us, please ignore this email.
                    </Text>
                </Row>
                {/* <Row>
                    <Button href="https://example.com/verify" align="center">
                        Verify
                    </Button>
                </Row> */}
            </Section>
        </Html>
    );
}