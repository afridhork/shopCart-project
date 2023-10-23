import React,{ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSearchProductQuery } from '@/store/api/product';

import Star from '../Star/page';

import './index.css';

export default function SearchBar() {
  const [productName, setProductName] = useState('')
  const {data,isSuccess} = useSearchProductQuery(productName)
  const [searchBar, setSearchBar] = useState(false)
  const refNav = useRef<HTMLDivElement>(null)
  const Router = useRouter()
  const pathname = usePathname()
  const path = pathname.split('/')
  useEffect(() => {
    if(path[1] == 'search'){
      let element = document.querySelector('input')
      if(element){
        element.value = path[2]
      }
    }
  },[])
  
  
  function searchProduct(e: ChangeEvent<HTMLInputElement>){
    setProductName(e.target.value)
  }

  useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
	});

  
  function handleClickSearchBar(){
    setSearchBar(prev=>!prev)
  }

   const handleClickOutside: Parameters<Document['addEventListener']>[1] = (event) => {
		if (refNav && !refNav.current?.contains(event.target as HTMLDivElement)) {
			setSearchBar(false)
		}
	};

  function handleClickItem(category: string, id: number){
    Router.push(`/detailCategory/${category}/${id}`)
    setSearchBar(false)
  }

  function startSearch(e: KeyboardEvent<HTMLInputElement>){
    if(productName.length > 0){
      if(e.key === 'Enter'){
        if(searchBar){
          handleClickSearchBar()
        }
        Router.push(`/search/${productName}`)
        // if(data?.products.length > 0){
        //   router.push(`/search/${productName}`)
        // }else{
        //   router.push(`/search/item-not-found`)
        // }
      }
    }
  }
  
  return (
    <>
    <div className="search-wrapper" ref={refNav}>
      <div className={`input-wrapper ${searchBar ? 'active' : ''}`}>
      {/* <div className={`input-wrapper ${search ? 'active' : ''}`}> */}
        {/* <input onClick={onClick} type="search" placeholder='Search Product'/> */}
        <input 
          className={`${searchBar ? 'active' : ''}`} 
          onClick={handleClickSearchBar} 
          onChange={searchProduct} 
          onKeyDown={startSearch}
          type="search" 
          name="search-bar" 
          placeholder='Search Product'
        />
        <div className="search-append">
          <span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </span>
        </div>
      </div>
      {
        searchBar && (
          <div dir="ltr" className='search-section mt-0 sm:mt-4'>
            <h2 className='font-semibold p-4 border-b mb-3'>Search</h2>
            <div className="grid grid-cols-1 gap-2">
              {
                isSuccess && (
                  data.products.length > 0 ? (
                    data.products.map((item: any,index: React.Key | null | undefined) => {
                      return(
                        <div className='items-search-wrapper' onClick={()=>handleClickItem(item.category, item.id)} key={index}>
                          <div className='flex items-center'>
                            <div className='search-img-wrapper'>
                              <img src={item.thumbnail} width="60" height="60" alt="" />
                            </div>
                            <h4 className='img-text mr-3 text-left'>{item.title}</h4>
                          </div>
                          <div className='flex items-center'>
                            <div className='flex mr-8'>
                              <Star value={item.rating} height={20} width={20} spacing={0} />
                              <h5>({item.rating})</h5>
                            </div>
                          </div>
                          <div className='flex items-center'>
                            <h4 className="text-right" style={{minWidth:'49px'}}>${item.price}</h4>
                          </div>
                        </div>
                      )
                    })
                  ): (
                    <div className="mb-3">
                      <h3 className="search-notFound">Hasil pencarian tidak ditemukan</h3>
                    </div>
                  )

                )
              }
            </div>
          </div>
        )
      }
    </div>
    </>
  )
}
