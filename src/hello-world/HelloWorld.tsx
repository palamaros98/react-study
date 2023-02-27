import './HelloWorld.css';
import {Header} from "./Header";
import {Chess} from "../Chess/Chess";

export const NewHelloWorld = (): JSX.Element => {
    return (
      <>
          <Header/>
          <Chess/>
      </>
    );
}
