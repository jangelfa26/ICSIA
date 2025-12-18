import { useContext, memo } from "react";
import { ThemeContext } from "../context/ThemeContext";

function ColorPicker() {
  const { estadoTema, dispatch } = useContext(ThemeContext);

  return (
    <input
      type="color"
      value={estadoTema.primaryColor}
      onChange={(e) =>
        dispatch({ type: "SET_PRIMARY_COLOR", payload: e.target.value })
      }
    />
  );
}

export default memo(ColorPicker);
