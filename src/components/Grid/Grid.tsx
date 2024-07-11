import { ReactNode } from "react";
import style from "./Grid.module.css";

interface GridProps {
  children: ReactNode;
}

const Grid: React.FC<GridProps> = ({ children }) => {
  return <ul className={style.list}>{children}</ul>;
};



export default Grid;
