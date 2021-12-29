import Link from "next/link";
import { useRouter } from "next/router";
import Burger from "./Burger";
import { useState } from "react";

export default function Navigation() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  return (
    <>
      <Burger active={active} onClick={() => setActive(!active)} />
      <div className={"container " + (active ? "active" : "")}>
        <ul>
          <li id="nav-bg-01">
            <img src="/images/handprint_04.jpeg"/>
          </li>
          <li id="nav-bg-02">
            <img src="/images/handprint_07.jpeg"/>
          </li>
          <li>
            <Link href="/">
              <a className={router.pathname === "/" ? "active" : null}>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/konzept">
              <a className={router.pathname.startsWith("/konzept") ? "active" : null}>Pädagogisches Konzept</a>
            </Link>
          </li>
          <li>
            <Link href="/grundsatz">
              <a className={router.pathname.startsWith("/grundsatz") ? "active" : null}>Montessori-Grundsätze</a>
            </Link>
          </li>
          <li>
            <Link href="/montessori">
              <a className={router.pathname.startsWith("/montessori") ? "active" : null}>Maria Montessori</a>
            </Link>
          </li>
          <li>
            <Link href="/ueber">
              <a className={router.pathname.startsWith("/ueber") ? "active" : null}>Über uns</a>
            </Link>
          </li>
          <li>
            <Link href="/infos">
              <a className={router.pathname.startsWith("/infos") ? "active" : null}>Infos für Eltern</a>
            </Link>
          </li>
          <li>
            <Link href="/fotos">
              <a className={router.pathname.startsWith("/fotos") ? "active" : null}>Fotos</a>
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
            }
          `}
        </style>
      </div>
    </>
  );
}
