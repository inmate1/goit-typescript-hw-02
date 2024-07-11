import { ReactElement } from 'react';
import style from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn = ({ onClick }: LoadMoreBtnProps): ReactElement => {
  return (
    <button className={style.button} onClick={onClick}>
      Search more images
    </button>
  );
};

export default LoadMoreBtn;
