import Head from "next/head";
import Navigation from "./Navigation";

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <div className="root">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-touch-icon.png?v=1"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png?v=1"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png?v=1"/>
        <link rel="manifest" href="/favicon/site.webmanifest?v=1"/>
        <link rel="shortcut icon" href="/favicon/favicon.ico?v=1"/>
        <meta name="msapplication-TileColor" content="#ffffff"/>
        <meta name="msapplication-config" content="/favicon/browserconfig.xml?v=1"/>
        <meta name="theme-color" content="#ffffff"/>


        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
      <nav>
        <Navigation />
      </nav>
      <main>{children}</main>
      <style jsx>
        {`
          .root {
            display: block;
            padding: 4rem 0;
            box-sizing: border-box;
            height: 100%;
          }
          main {
            display: flex;
            min-height: 100%;
          }
          @media (min-width: 769px) {
            .root {
              display: flex;
              flex: 1 0 auto;
            }
            main {
              flex: 1 0 auto;
            }
          }
        `}
      </style>
    </div>
  );
}
