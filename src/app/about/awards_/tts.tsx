
import { ReactNode } from "react";
import AwardsContainer from "./AwardsContainer";


export default async function Achievements({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  

  return (
    <div>
      {children}
      <AwardsContainer />
    </div>
  );
}