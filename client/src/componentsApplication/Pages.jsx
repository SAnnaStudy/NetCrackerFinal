import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";

const Pages = observer(() => {
    const {recipe} = useContext(Context)
    //посчитаем оббщее количество страниц:
    const pageCount = Math.ceil(recipe.totalCount / recipe.limit); //делим общее кол-во товаров на кол-во товаров на одной странице
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        //в массив добавляем текущий счетчик в цикле +1 (номер страницы)
        pages.push(i + 1);
    }


    return (
        <Pagination className="mt-5">
            {pages.map(page => 
                <Pagination.Item
                    key={page}
                    active={recipe.page === page} //страница, которая находится в recipe.page равна текущей явл. активной
                    onClick={() => recipe.setPage(page)} //при нажатии будем выделять эту страницу
                >
                    {page}
                </Pagination.Item>
                )}
        </Pagination>
    );
});

export default Pages;