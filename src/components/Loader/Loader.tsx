import { ReactElement } from "react";
import { RotatingLines } from "react-loader-spinner";
interface LoaderProps {
  loading: boolean;
}

const Loader = ({ loading }: LoaderProps): ReactElement => {
  return (
    <>
      <RotatingLines
        visible={loading}
        // width='96' // Строковое значение
        // height='96' // Строковое значение
        // color='grey'
        // strokeWidth='5' // Строковое значение
        // animationDuration='0.75' // Строковое значение
        // ariaLabel='rotating-lines-loading'
        // wrapperStyle={{}}
        // wrapperClass=''
      />
    </>
  );
};

export default Loader;