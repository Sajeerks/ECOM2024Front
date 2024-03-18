import AdminSidebar from "../../../components/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
// import data from "../../../assets/data.json";
import { Fragment } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Skeleton } from "../../../components/Loader";
import { usePieQuery } from "../../../redux/api/dashboardApi";
import { RootState } from "../../../redux/store";
import { CustomError } from "../../../types/type";
import { Navigate } from "react-router-dom";

const PieCharts = () => {
  const {user} = useSelector((state:RootState)=>state.userReducer)
const { error, data, isLoading} =   usePieQuery(user?._id!)

if(error){
  let err = error as CustomError
  toast.error(err.data.message)
  return  <Navigate to ={"/admin/dashboard"}/>
}



   
  return (
    <Fragment>
       {isLoading?<Skeleton length={10}/>:<div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Pie & Doughnut Charts</h1>
        <section>
          <div>
            <PieChart
              labels= {  Object.keys(data?.charts.orderFullFillment!)}
              data={  Object.values(data?.charts.orderFullFillment!)}
              backgroundColor={[
                `hsl(110,80%, 80%)`,
                `hsl(110,80%, 50%)`,
                `hsl(110,40%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2>Order Fulfillment Ratio</h2>
        </section>

        <section>
          <div>
            <DoughnutChart
              labels={data?.charts?.productCategories.map((i) => Object.keys(i)[0])!}
              data={data?.charts?.productCategories.map((i) => Object.values(i)[0])!}
              backgroundColor={data?.charts.productCategories.map(
                (i, index) => `hsl(${ Object.values(i)[0] * index}, ${ Object.values(i)[0]}%, 50%)`
              )!}
              legends={false}
              offset={[20, 0, 20, 80]}
            />
          </div>
          <h2>Product Categories Ratio</h2>
        </section>

        <section>
          <div>
            <DoughnutChart
              labels={Object.keys(data?.charts.stockAvaliability!)}
              data={Object.values(data?.charts.stockAvaliability!)}
              backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
              legends={false}
              offset={[0, 80]}
              cutout={"70%"}
            />
          </div>
          <h2> Stock Availability</h2>
        </section>

        <section>
          <div>
            <DoughnutChart
              labels={Object.keys(data?.charts.revenueDistribution!)}
              data={Object.values(data?.charts.revenueDistribution!)}
              backgroundColor={[
                "hsl(110,80%,40%)",
                "hsl(19,80%,40%)",
                "hsl(69,80%,40%)",
                "hsl(300,80%,40%)",
                "rgb(53, 162, 255)",
              ]}
              legends={false}
              offset={[20, 30, 20, 30, 80]}
            />
          </div>
          <h2>Revenue Distribution</h2>
        </section>

        <section>
          <div>
            <PieChart
              labels={Object.keys(data?.charts.usersAgeGroup!)}
              data={Object.values(data?.charts.usersAgeGroup!)}
              backgroundColor={[
                `hsl(10, ${80}%, 80%)`,
                `hsl(10, ${80}%, 50%)`,
                `hsl(10, ${40}%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2>Users Age Group</h2>
        </section>

        <section>
          <div>
            <DoughnutChart
              labels={Object.keys(data?.charts.adminCustomers!)}
              data={Object.values(data?.charts.adminCustomers!)}
              backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
              offset={[0, 50]}
            />
          </div>
        </section>
      </main>
    </div>}
    </Fragment>
  );
};

export default PieCharts;
