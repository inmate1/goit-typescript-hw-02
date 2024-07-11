
import { ReactNode } from "react";
import style from "./GridItem.module.css"

interface GridProps {
  children: ReactNode;
}
const GridItem: React.FC<GridProps> = ({ children }) => {
  return <li className={style.item}>{children}</li>;
};



export default GridItem;
