import React, {useState, useEffect} from 'react'
import { useSearchParams } from 'react-router-dom';
import '../../styles/components/Pagination.css'

function PhotosPagination({photosList}) {

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('currentPage'));

  const photosPerPage = 3;  //how many photos in one page

  let lastIndex = currentPage * photosPerPage; //last index of photo in the current page

  const firstIndex = lastIndex - photosPerPage; //first index of photo in current page

  const photosListPerPage = photosList.slice(firstIndex, lastIndex)

  const npage = Math.ceil(photosList.length / photosPerPage); //number of pages

  const numbers = [...Array(npage+1).keys()].slice(1);  //number to run between pages. start from 1 not from 0.

  useEffect(
        ()=>{
            searchParams.set("currentPage", 1);
            setSearchParams(searchParams);
        }, []
    )

  function prePage(){
    if (currentPage != 1){
        searchParams.set("currentPage", currentPage-1);
        setSearchParams(searchParams);
    }
  }

  function changePage(p){
    searchParams.set("currentPage", p);
    setSearchParams(searchParams);
  }

  function nextPage(){
    if(currentPage!=npage){
        searchParams.set("currentPage", currentPage+1);
        setSearchParams(searchParams);
    }
  }

  return (
    <div>
        <div className = 'photosCards'>
            {photosListPerPage};
        </div>
        <nav>
            <ul className = "pagination">

                <li className = 'page-item'>
                    <a href = '#' className = 'page-link' onClick = {prePage}>Prev</a>
                </li>

                {numbers.map((n, i)=>(
                    <li className = {`page-item ${currentPage == n ? 'active' : ''}`} key = {i}>
                        <a href = '#' className = 'page-link' onClick = {()=>changePage(n)}>{n}</a>
                    </li>
                ))}

                <li className = 'page-item'>
                    <a href = '#' className = 'page-link' onClick = {nextPage}>Next</a>
                </li>

            </ul>
        </nav>
    </div>
  )
}

export default PhotosPagination
