import { createSlice } from "@reduxjs/toolkit";
import { count } from '@/models/brand';

import brandImg from '@/static/brand-img'

const LandingPage = createSlice({
   name: "LandingPage",
   initialState:{
      topBrand:[{
         title:'',
         value:0,
         img:''
      }],
      discountItems:[{
         title:'',
         discountPercentage:0,
         description:'',
         rating:0,
         price:0,
         thumbnail:'',
         category:'',
         id:0
      }],
      ratingItems:[{
         title:'',
         discountPercentage:0,
         description:'',
         rating:0,
         price:0,
         thumbnail:''
      }],
      categoryItems:[{
         name: '',
         active: false
      }]
   },
   reducers:{
      topBrand: (state, action) =>{
         const data = action.payload
         const brand: string[] = []
         const countBrand = []
         const topBrand: count[] = []
         const brandImage = brandImg
         
         for(let i in data.products) {
            for(let j in data.products[i]){
              if(j == 'brand'){
                brand.push(data.products[i]['brand'])
              }
            }
          }
         for(let i in brand){
            const indexBrand = countBrand.findIndex(item => item.title == brand[i])
            if(indexBrand == -1){
            countBrand.push({
               title: brand[i],
               value: 1,
            })
            }else{
               countBrand[indexBrand].value += 1
               countBrand.sort((a, b) => b.value - a.value);
            }
         }
         
         for(let i = 0; i<8; i++){
            for(let j in brandImage){
               if(j == countBrand[i].title)
               topBrand.push({
                  ...countBrand[i],
                  img: brandImage[j as keyof typeof brandImage].src,
                  name: ""
               })
            }
         }
         state.topBrand = topBrand
      },
      listItem: (state, action) => {
         const data = action.payload.products
         const itemList = []
         let discountItemList: any[] = []
         let ratingItemList: any[] = []
         const topDiscountList = []
         const topRatingList = []
         for(let i in data){
            itemList.push({
               title: data[i].title, 
               discountPercentage: data[i].discountPercentage,
               description: data[i].description,
               rating: data[i].rating,
               price: data[i].price,
               thumbnail: data[i].thumbnail,
               category: data[i].category,
               id: data[i].id
            })
            discountItemList = [...itemList]
            ratingItemList = [...itemList]
            discountItemList.sort((a, b) => b.discountPercentage - a.discountPercentage);
            ratingItemList.sort((a, b) => b.rating - a.rating);
         }
         for( let i = 0; i<8; i++){
            topDiscountList.push(discountItemList[i])
            topRatingList.push(ratingItemList[i])
         }
         state.discountItems = topDiscountList
         state.ratingItems = topRatingList
         
      },
      categoryItem: (state, action) =>{
         const data = action.payload
         let categoryList: any = []
         for(let i in data.products){
            for(let j in data.products[i]){
               if(j == 'category'){
                  let categoryIndex = categoryList.findIndex((item: { name: string; }) => item.name == data.products[i][j])
                  if(categoryIndex == -1){
                     if(data.products[i][j] == 'smartphones'){
                        categoryList.push({name: data.products[i][j], active: true})
                     }else{
                        categoryList.push({name: data.products[i][j], active: false})
                     }
                  }
               }
            }
         }
         state.categoryItems = categoryList
      }
   }
})

export const {topBrand,listItem,categoryItem} = LandingPage.actions
export default LandingPage.reducer