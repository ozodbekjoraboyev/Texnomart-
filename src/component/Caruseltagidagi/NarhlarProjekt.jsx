import React, { Children, useState } from "react";
import SortByUp02Icon from "../../assets/ikonkalar/SortTop";
import SortByDown02Icon from "../../assets/ikonkalar/Sort";
import DashboardSquare01Icon from "../../assets/ikonkalar/dashboard-square-01-stroke-rounded";

function NarhlarProjekt({ name, hozirgi, setHozirgi, tartibi }) {
  return (
    <div>
      <div className="flex justify-between gap-4 pb-5 select-none">
        <div
          onClick={() => {
            setHozirgi(name);
          }}
          className="flex items-center gap-3 cursor-pointer"
        >
          {name}
          <span className=" cursor-pointer">
            {hozirgi === name ? (
              <>{tartibi ? <SortByUp02Icon /> : <SortByDown02Icon />}</>
            ) : null}
          </span>
        </div>
      </div>
    </div>
  );
}

export default NarhlarProjekt;
