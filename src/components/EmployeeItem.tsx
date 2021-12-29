import { EmployeeContent } from "../lib/employees";
import Date from "./Date";
import Link from "next/link";
import { parseISO } from "date-fns";

type Props = {
  employee: EmployeeContent;
};
export default function EmployeeItem({ employee }: Props) {
  let style = {
    backgroundPositionX: (Math.random() * 100) + "px",
    backgroundPositionY: (Math.random() * 100) + "px"
  };
  return (
    <Link href={"/employees/" + employee.slug}>
      <a style={style}>
        <img src={employee.portrait} className="employee-portrait"/>
        <h2>{employee.name}</h2>
        <style jsx>
          {`
            a {
              color: black;
              display: flex;
              position: relative;
              height: 7rem;
              margin: 1rem;
              width: 100%;
              border-radius: 1rem;
              overflow: hidden;
              background-image: url("/images/watercolor.jpg");
              // background-color: yellow;
              // background-blend-mode: multiply;
            }

            a:hover {
              opacity: 0.8;
            }

            h2 {
              margin: 0;
              font-weight: 500;
              border-radius: 1rem;
              padding: 0.3rem 1rem;
              margin: auto 0;
              text-align: center;
              flex: 1;
            }

            .employee-portrait {
              width: 50%;
              height: 100%;
              object-fit: cover;
            }

            @media (min-width: 769px) {
              a {
                width: calc(50% - 2rem);
                box-sizing: border-box;
              }
            }
          `}
        </style>
      </a>
    </Link>
  );
}
