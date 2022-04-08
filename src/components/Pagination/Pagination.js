import React from 'react'
import { Pagination as PaginationAntd} from 'antd'
import './Pagination.scss'
export const Pagination = (props) => {
    const {posts, location, history} = props
    // Creamos una variable de la pagina extraida de posts
    const currentPage = parseInt(posts.page)

    // Evento al cambiar de pagina mandandole al location.pathname la nueva page
    const onChangePage = (newPage) => {
        history.push(`${location.pathname}?page=${newPage}`)
    }
    return (
        <PaginationAntd 
            defaultCurrent={currentPage}
            total = {posts.total}
            pageSize = {posts.limit} //pageSize: Elementos por pagina
            onChange = {newPage => onChangePage(newPage)}
            className = "pagination"
        />
    )
}
