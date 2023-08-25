import React, {useEffect, useState} from 'react';
import tb from "./ToolBar.module.css";
import ToolBarCommonComponent from "./ToolBarCommonComponent";

function ToolBar(props) {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
        }, 1500); // Показываем панель на 1 секунду при загрузке страницы

        return () => {
            // Возвращаем видимость панели обратно перед выходом со страницы
            setVisible(true);
        };
    }, []);
    return (
        <div className={`${tb.menu} ${visible ? tb.menuVisible : ''}`}>
            <ToolBarCommonComponent/>
        </div>
    );
}

export default ToolBar;