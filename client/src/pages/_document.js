import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html className="h-full bg-gray-100">
            <Head>
                <title>Notes 1.0</title>
                <meta name= "author" content="Alex Ramos"/>
                <meta name="description" content="NextJS and Node application."/>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <body className="h-full">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}