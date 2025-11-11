import { ChangeEvent, useEffect, useState } from 'react';
import Link from 'next/link'

import logo from '@/assets/images/icon-logo/logo.svg'
import SearchBar from '@/part/SearchBar/page';
import DropdownNav from '@/part/DropdownNav/page';
import ctgImg from '@/static/ctg-img';

import { useCategoryListQuery } from '@/store/api/category';
import Modal from '@/part/Modal/page';
import InputText from '@/part/FormInput/inputText/page';
import Button from '@/part/Button/page';
import { useSigninMutation } from '@/store/api/auth';
import HamburgerSwitch from '@/part/HamburgerSwitch/page';
import Cart from '@/part/Cart/page';
import Skeleton from 'react-loading-skeleton';

interface product{
  name: string,
  slug: string,
  img: string
}

export default function Header() {
  const {data,isSuccess} = useCategoryListQuery()
  const categoryPackList: product[] = []
  const [categoryPack, setCategoryPack] = useState<any>('')
  const categoryImg = ctgImg
  const [login, setLogin] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const [authData, setAuthData] = useState({
    email:'',
    firstName:'',
    gender:'',
    id:0,
    image: '',
    lastName:'',
    token:'',
    username:''
  })

  const [accountDropdown, setAccountDropdown] = useState(false)
  
  const [formPayload, setFormPayload] = useState({
    username: '',
    password: '',
  })
  const [signin] = useSigninMutation()

  useEffect(() => {
    const checkAuth = JSON.parse(localStorage.getItem('auth data') as any)
    if(checkAuth){
      setAuthData(checkAuth.data)
      setLogin(true)
    }else{
      setAuthData({
        email:'',
        firstName:'',
        gender:'',
        id:0,
        image: '',
        lastName:'',
        token:'',
        username:''
      })
    }
  },[])
  
  function handleClickAccount(){
    setAccountDropdown(prev => !prev)
  }

  function handleClickSignIn(){
    if(!authData.username){
      signin(formPayload).then((payload) => {
        setLogin(prev => !prev)
        localStorage.setItem('auth data', JSON.stringify(payload))
        setOpenModal(prev => !prev)
        window.location.reload()
      })
    }else{
      setLogin(prev => !prev)
      localStorage.removeItem("auth data");
      window.location.reload()
    }
  }

  function handleClickModal(){
    setOpenModal(prev => !prev)
  }

  function updateData(e:ChangeEvent<HTMLInputElement>){
    setFormPayload(prev => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }

  
  const contentModal = () => {
    return(
      <div className="relative transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all h-80 sm:w-full sm:max-w-xs">
        <div className="flex justify-between items-center p-3">
          <h2>Masuk</h2>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={handleClickModal}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div className='p-3'>
          <div className="mb-3">
            <h6 className='font-semibold text-start'>Username*</h6>
            <InputText 
              type="text" 
              name="username"
              value={formPayload.username}
              onChange={updateData}
            />
          </div>
          <div className='mb-3'>
            <h6 className='font-semibold text-start'>Password*</h6>
            <InputText 
              type="password" 
              name="password"
              value={formPayload.password} 
              onChange={updateData}
            />
          </div>
          <p>Test Account</p>
          <p>Username: ariam</p>
          <p>password: ariampass</p>
          <div className='mt-[20px]'>
            <Button name="Sign in" isPrimary isBlock onClick={handleClickSignIn}/>
          </div>
        </div>
      </div>
    )
  }
  useEffect(() => {
    for(let i in data){
      for(let j in categoryImg){
        if(data[i as any].slug == j){
          console.log('cek', data[i as any].slug);
          categoryPackList.push({
            'name': data[i as any].name,
            'slug': data[i as any].slug,
            'img': categoryImg[j as keyof typeof categoryImg].src
          })
        }
      }
    }
    setCategoryPack(categoryPackList)
    // return () => {
    //   categoryPack
    //  }
  },[data])

  return (
    <>
      {
        isSuccess ? (
          <>
            <nav>
              <div className='container fixed mx-auto bg-white flex items-center justify-between z-20 px-2 py-3 sm:px-10'>
                <Link href="/">
                  <img
                    className='mr-7 hidden sm:inline'
                    src={logo.src} 
                    width="200" 
                    height=""
                    style={{minWidth: '175px'}}
                  />
                </Link>
                <div className='flex contents jus'>
                  <ul className="hidden sm:flex">
                    <li className='cursor-pointer'>
                      {
                        isSuccess && (
                          <DropdownNav data={categoryPack}/>
                        )
                      }
                    </li>
                    {/* <li className={`cursor-pointer`}>Deals</li>
                    <li className={`cursor-pointer`} style={{minWidth:'82px'}}>What's new</li>
                    <li className={`cursor-pointer`}>Delivery</li> */}
                  </ul>
                  <SearchBar />
                  <ul className='flex'>
                    <li className='cursor-pointer mr-0'>
                      {
                        login ? (
                          <>
                            <div className='flex items-center w-8 sm:w-36' onClick={handleClickAccount}>
                              <img className='rounded-full mr-1' src={authData.image} width="30" />
                              <h6 className='hidden sm:inline'>{`${authData.firstName + " " + authData.lastName}`}</h6>
                            </div>
                            {
                              accountDropdown && (
                              <div className='account-section mt-4' onClick={handleClickSignIn}>
                                <h6>Sign Out</h6>
                              </div>
                              )
                            }
                          </>
                        ):(
                          <div className='flex items-center'  style={{minWidth:'61px'}} onClick={handleClickModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                            <p>Sign in</p>
                          </div>
                        )
                      }
                    </li>
                    <li className='items-center cursor-pointer'>
                      <Cart/>
                    </li>
                    <li className='static mt-1 sm:hidden ml-0 items-center cursor-pointer'>
                      <HamburgerSwitch data={categoryPack}/>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            {
              openModal && (<Modal content={contentModal()}/>)
            }
          </>
        ) : (
            <Skeleton width="100%" height="50px"/>
        )
      }
    </>
  )
}
