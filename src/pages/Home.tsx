import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { CartItem } from "../types/type";
import { addToCart } from "../redux/cartReducer";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const addToCarthandler = (cartItem:CartItem) => {

    if(cartItem.stock<1)  return toast.error("Out of Stock")
      dispatch(addToCart(cartItem))
 toast.success("product added to cart ")

  };

  const { data, isLoading, isError } = useLatestProductsQuery("")
  ;


if(isError) toast.error("cannot fetch products")
  return (
    <div className="home">
      <section></section>
      <h1>
        Latest products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>

      <main>

        {isLoading ?<Skeleton width ={"100%"} /> :
           data?.latestProducts.map((i)=>(
            <ProductCard
            key={i._id}
            productId={i._id}
            photo={i.photo}
            name={i.name}
            price={i.price}
            stock={i.stock}
            handler={addToCarthandler}
          />
          ))
        }
    
      </main>
    </div>
  );
};

export default Home;
