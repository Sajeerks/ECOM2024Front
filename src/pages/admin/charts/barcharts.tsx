import { Fragment } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Skeleton } from "../../../components/Loader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import { useBarQuery } from "../../../redux/api/dashboardApi";
import { RootState } from "../../../redux/store";
import { CustomError } from "../../../types/type";
import { getLastMonths } from "../../../utils/features";


const {last12Months, last6Months} = getLastMonths()

// console.log({last12Months});
// console.log({last6Months});


const Barcharts = () => {




  const {user} = useSelector((state:RootState)=>state.userReducer)
const { error, data, isLoading} =   useBarQuery(user?._id!)

if(error){
  let err = error as CustomError
  toast.error(err.data.message)
}







  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Bar Charts</h1>
             {isLoading?<Skeleton length={10}/>:<Fragment>
              
              
              
              
             <section>
          <BarChart
            data_2={data?.charts.product!}
            data_1={data?.charts.users!}
            title_2="Users"
            title_1="Products"
          
            bgColor_1={`hsl(260, 50%, 30%)`}
            bgColor_2={`hsl(360, 90%, 90%)`}
            labels={last6Months}
          />
          <h2>Top Products & Top Customers</h2>
        </section>

        <section>
          <BarChart
            horizontal={true}
            data_1={data?.charts.order!}
            data_2={[]}
            title_1="Orders"
            title_2=""
            bgColor_1={`hsl(180, 40%, 50%)`}
            bgColor_2=""
            labels={last12Months}
          />
          <h2>Orders throughout the year</h2>
        </section>
              
              </Fragment>}
      </main>
    </div>
  );
};

export default Barcharts;
