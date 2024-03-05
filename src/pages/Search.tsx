import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import { useAllCategoriesQuery, useSearchProductsQuery } from "../redux/api/productApi"
import { CartItemType, CustomError } from "../types/type"
import toast from "react-hot-toast"
import { server } from "../App"
import { Skeleton } from "../components/Loader"
import { addToCart } from "../redux/cartReducer"
import { useDispatch } from "react-redux"


const Search = () => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("")
  const [maxprice, setmaxprice] = useState(100000)
  const [category, setCategory] = useState("")
  const [page, setPage] = useState(1)

const {isLoading:searchProductsLoading, error:serarchError,  data:searchProductData,} =useSearchProductsQuery({price:maxprice,
  page,
  category,
  search,
  sort })


  console.log({searchProductData});
const  { isLoading:loadingCatergories, data:categoryResponseData, error,} = useAllCategoriesQuery("")
const addToCarthandler = (cartItem:CartItemType) => {

  if(cartItem.stock<1)  return toast.error("Out of Stock")
    dispatch(addToCart(cartItem))
toast.success("product added to cart ")

};
let  isPrevPage = page > 1
let  isNextPage : boolean = false


if(searchProductData &&  searchProductData?.totalPages){

  isNextPage = page < searchProductData?.totalPages
}

// console.log({isNextPage});
// console.log({isPrevPage});


// console.log({page});
if(error){
  const err  = error as CustomError
  toast.error(err.data.message)
}

if(serarchError){
  const err  = serarchError as CustomError
  toast.error(err.data.message)
}
useEffect(() => {


}, [categoryResponseData])




  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e)=>setSort(e.target.value)}>

            <option value="">None</option>
            <option value="asc">Price {"Low to High"}</option>
            <option value="dsc"> Price{"High to Low"}</option>

          </select>
        </div>

        <div>
          <h4>Max Price :{ maxprice || ""}</h4>
      <input type="range" 
      min={100}
      max={100000}
      value={maxprice}
      onChange={(e)=>setmaxprice(Number(e.target.value))}
       
      />
        </div>

        <div>
          <h4>Category</h4>
          <select value={category} onChange={(e)=>setCategory(e.target.value)}>

            <option value="">None</option>
      {!loadingCatergories  && categoryResponseData?.categories.map((i, idx)=>(
               <option key={i} value={i}>{i.toUpperCase()}</option>
      ))  }

          </select>
        </div>

      </aside>

<main>
     <h1>Products</h1>
     <input type="text" placeholder="Searh by product name" value={search}
     
     onChange={(e)=>setSearch(e.target.value)}
     />

     {searchProductsLoading?<Skeleton width="80vw" length={10}/>:<div className="search-product-list">
     {searchProductData?.products.map((i)=>(
             
          <ProductCard
          
          
          key={i._id}
          productId ={i._id}
          photo={`${i.photo}`}
          name={i.name}
          price={i.price}
          stock={i.stock} handler ={addToCarthandler}
        
                  />
     ))}
     </div> }
    

{searchProductData &&  searchProductData?.totalPages >=1 && (

<article>
        <button disabled={!isPrevPage} onClick={()=>{setPage((prev)=>prev-1)}} >Prev</button>
        <span>{page} of {searchProductData && searchProductData.totalPages}</span>
        <button disabled={!isNextPage} onClick={()=>{setPage((prev)=>prev+1)}}>Next</button>
    </article>

) }
    
</main>

    </div>
  )
}

export default Search