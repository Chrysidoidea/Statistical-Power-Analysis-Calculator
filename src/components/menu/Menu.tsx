import { useAppContext } from "../../context/AppContext";
import { transitionEffect } from "../../lib/handleAnimation";

const Menu = () => {
  const { setInputType, fade, setFade } = useAppContext();
  
  return (
    <section>
      <button
        className={"switcher" + (fade ? " fade" : "")}
        onClick={() => {
          transitionEffect({ setFade });
          setTimeout(() => {
            setInputType("manual");
          }, 100);
        }}
      >
        Enter Data Manually
      </button>
      <button
        className={"switcher" + (fade ? " fade" : "")}
        onClick={() => {
          transitionEffect({ setFade });
          setTimeout(() => {
            setInputType("upload");
          }, 100);
        }}
      >
        Upload CSV/Excel
      </button>
      <button
        className={"switcher" + (fade ? " fade" : "")}
        onClick={() => {
          transitionEffect({ setFade });
          setTimeout(() => {
            setInputType("about");
          }, 100);
        }}
      >
        About
      </button>
    </section>
  );
};

export default Menu;
