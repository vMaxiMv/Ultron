import React from 'react';
import tb from "./ToolBar.module.css";
import ToolBarCommonComponent from "./ToolBarCommonComponent";

function ToolBar(props) {

    return (
        <div className={tb.menu}>
            <ToolBarCommonComponent/>
        </div>
    );
}

export default ToolBar;