import Link from "next/link";
import { useRouter } from "next/router";
import Burger from "./Burger";
import { useEffect, useState } from "react";

export default function Navigation() {
  const router = useRouter();
  const [active, setActive] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeComplete", (url, { shallow }) => {
      setActive(false);
    });
  }, [router]);

  return (
    <>
      <Burger active={active} onClick={() => setActive(!active)} />
      <div className={"container " + (active ? "active" : "")}>
        <ul>
          <li id="nav-bg-01" key="bg-01">
            <img src="/images/handprint_04.jpeg"/>
          </li>
          <li id="nav-bg-02" key="bg-02">
            <img src="/images/handprint_07.jpeg"/>
          </li>
          <li key="home">
            <Link href="/">
              <a className={router.asPath === "/" ? "active" : null}>Home</a>
            </Link>
          </li>
          <li key="konzept">
            <Link href="/konzept">
              <a className={router.asPath.startsWith("/konzept") ? "active" : null}>Pädagogisches Konzept</a>
            </Link>
          </li>
          <li key="grundsatz">
            <Link href="/grundsatz">
              <a className={router.asPath.startsWith("/grundsatz") ? "active" : null}>Montessori-Grundsätze</a>
            </Link>
          </li>
          <li key="motopaedagogik">
            <Link href="/motopaedagogik">
              <a className={router.asPath.startsWith("/motopaedagogik") ? "active" : null}>Motopädagogik</a>
            </Link>
          </li>
          <li key="piklerpaedagogik">
            <Link href="/piklerpaedagogik">
              <a className={router.asPath.startsWith("/piklerpaedagogik") ? "active" : null}>Piklerpädagogik</a>
            </Link>
          </li>
          <li key="ueber">
            <Link href="/ueber">
              <a className={router.asPath.startsWith("/ueber") ? "active" : null}>Über uns</a>
            </Link>
          </li>
          <li key="infos">
            <Link href="/infos">
              <a className={router.asPath.startsWith("/infos") ? "active" : null}>Infos für Eltern</a>
            </Link>
          </li>
          <li key="fotos">
            <Link href="/fotos">
              <a className={router.asPath.startsWith("/fotos") ? "active" : null}>Fotos</a>
            </Link>
          </li>
        </ul>
        <style jsx>
          {`
            .container {
              width: 0;
              position: relative;
            }
            #nav-bg-01,
            #nav-bg-02 {
              opacity: 0;
              pointer-events: none;
              z-index: -1;
            }
            .active #nav-bg-01,
            .active #nav-bg-02 {
              opacity: 0.3;
            }

            #nav-bg-01 {
              position: absolute;
              bottom: -16vw;
              left: -20vw;
            }
            #nav-bg-01 img {
              max-width: 100vw;
              transform: rotate(131deg);
            }

            #nav-bg-02 {
              position: absolute;
              top: -50vw;
              right: -30vw;
            }
            #nav-bg-02 img {
              max-width: 100vw;
              transform: rotate(-6deg);
            }

            ul {
              opacity: 0;
              width: 100%;
              height: 100vh;
              text-align: right;
              list-style: none;
              margin: 0;
              padding: 0;
              position: fixed;
              top: 0;
              background-color: rgba(255,255,255,0.5);
              display: flex;
              flex-direction: column;
              justify-content: center;
              z-index: 1;
              transform: translateY(100%);
              transition: opacity 200ms;
            }
            .active ul {
              opacity: 1;
              transform: translateY(0);
              background-color: rgba(255,255,255,1)
            }
            li {
              margin-bottom: 1.75rem;
              font-size: 2rem;
              padding: 0 1.5rem 0 0;
            }
            li:last-child {
              margin-bottom: 0;
            }
            .active {
              color: #222;
            }

            a {
              display: inline-block;
              position: relative;
            }
            a::before {
              opacity: 0;
              transition: opacity 0.1s;
            }
            a:hover::before,
            a.active::before {
              content: "";
              width: 100%;
              height: 100%;
              position: absolute;
              left: -0.5rem;
              top: -0.5rem;
              z-index: -1;
              background-image: url("/images/watercolor.jpg");
              background-color: lightblue;
              background-blend-mode: multiply;
              padding: 0.5rem;
              border-radius: 0.5rem;
              opacity: 1;
            }
            a:hover::before {
              opacity: 0.5;
            }

            @media (min-width: 769px) {
              .container {
                width: 7rem;
                display: block;
              }
              ul {
                opacity: 1;
                width: 7rem;
                top: auto;
                display: block;
                transform: translateY(0);
                padding: 1rem 1rem 1rem 2rem;
                border-radius: 1rem;
                height: auto;
              }
              li {
                font-size: 1rem;
                padding: 0;
              }
              #nav-bg-01,
              #nav-bg-02 {
                opacity: 0 !important;
              }
            }
          `}
        </style>
      </div>
    </>
  );
}
