import React from 'react'
import Productzoom from '../Components/Productzoom/Productzoom'
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Qtybox from '../Components/Qtybox/Qtybox';
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import Productslider from '../Components/Productslider/Productslider';
import { fetchDataFromApi, postData } from '../utils/api';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext } from 'react';
import { dataContext } from '../context/Context';
import { toast } from 'react-toastify';

function ProductDetails() {
  let{SetcartProducts} = useContext(dataContext)
  let[productActionIndex, SetproductActionIndex] = useState(null)
  let [productData, SetProductData]= useState({})
  let [relatedProduct, SetrelatedProduct]= useState([]);
  let [size,Setsize]= useState(null)
    let[qty, setQty] = useState(1);
  let[ram,Setram] = useState(null)

   let {id}= useParams()
 
  useEffect(()=>{
   async function fetchbyid(){
     let data = await fetchDataFromApi(`/api/product/${id}`);
     if(data.success){
        SetProductData(data.product)
     }
    }
    fetchbyid()
  },[id])

  useEffect(()=>{
    if (!productData.catId) return; 
    async function fetchRelated(){
     let related = await fetchDataFromApi(`/api/product/getProductsByCatId/${productData.catId}`);
      if(related.success){
        SetrelatedProduct(related.Products)
      }
    }
    fetchRelated()
  },[productData.catId])
   
  async function handleCart(){ 
    if(productData.catName==='Fashion' || productData.catName==="Footwear"){
      if(!size){
        toast.error("Please select size",{
          position:'top-center'
        })
        return;
      }
    }
    try{
      let data = await postData('/api/cart/add',{productId:id,quantity:qty,size:size,ram:ram});
      if(data.success){
           toast.success("Item added to the cart")
           SetcartProducts(data.cartItems)
      }
    }catch(err){
      toast.error(err)
    }

  }


  return (
    <section className='py-8 px-5 md:px-7'>
      <div className='md:flex gap-10 container mx-auto'>

         <div className='w-[70%] md:w-[25%]'>
          <Productzoom img={productData.images}/>
         </div>

         <div className=' mt-4 md:w-[60%]'>

            <h1 className='text-xl md:text-3xl font-semibold'>{productData.name}</h1>
            <span className='flex items-center gap-2 mt-4'>
              <span> Brands :</span> <span>{productData.brand}</span> <Rating name="size-small" value={productData.rating || 1} size="small" readOnly />
              <span>Review(5)</span>
            </span>
            <div className='flex mt-4 items-center gap-2'>
               <h1 className='line-through'>${productData.oldPrice}</h1>
               <h1 className='text-[#ff5252] text-lg font-medium'>${productData.price}</h1>
            </div>
            <div className='flex items-center gap-2 mt-4 mb-2'>
              {productData.countInStock===0?<span className='bg-red-500 text-white rounded-full p-1 text-sm'>out of stock</span>:<span className='bg-green-500 text-white rounded-full p-2 text-sm'>In stock</span>}
              {/* <p className='text-xl font-medium'>{ productData.countInStock}</p>  */}
            </div>
            <p className='text-justify mt-4 font-light'>{productData.description}</p>  
       
       {productData.size?.length>0 &&
          <div  className='size mt-5 flex gap-5'>
            <span className='text-lg font-light'>Size: </span>
            {productData.size?.map((size,index)=>{
              return  <Button  key={index} className={productActionIndex===index?'!bg-[#ff5252] !text-white':null} onClick={()=>{
                Setsize(size)
                SetproductActionIndex(index)}}>{size}</Button>
            })}
         </div>}

          {productData.productRam?.length>0 &&
          <div  className='size mt-5 flex gap-5'>
            <span className='text-lg font-light'>RAM: </span>
            {productData.productRam?.map((ram,index)=>{
              return  <Button  key={index} className={productActionIndex===index?'!bg-[#ff5252] !text-white':null} onClick={()=>{
                Setram(ram)
                SetproductActionIndex(index)}}>{ram}</Button>
            })}
         </div>}

         <div className='flex items-center mt-5 gap-5'>
           <Qtybox qty={qty} setQty={setQty}/>
            <div>
              <Button className='flex gap-2 !bg-[#ff5252] !text-white md:!p-2' onClick={handleCart}><MdOutlineShoppingCart className='!text-lg'/><span className='text-xs md:text-base'>Add to Cart</span></Button>
            </div>
            
            <div className='md:text-lg flex gap-1 items-center'>
              <Button className='!text-black !min-w-2 !rounded-full hover:cursor-pointer'><FaRegHeart className='!text-lg' /></Button>
              <span>Add to Wishlist</span>
            </div>
            
         </div>

         </div>
      </div>
       <div className='mt-14'>
              <h3 className='text-xl font-semibold mb-5'>Related Products</h3>
          {<Productslider item={6} data={relatedProduct} />}
         </div>

    </section>
  )
}

export default ProductDetails