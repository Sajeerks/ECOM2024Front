// import toast from "react-hot-toast";
import { BiMaleFemale } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
// import { useSelector } from "react-redux";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { BarChart, DoughnutChart } from "../../components/admin/Charts";
import Table from "../../components/admin/DashboardTable";
// import Loader from "../../components/admin/Loader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Skeleton } from "../../components/Loader";
import { useStatsQuery } from "../../redux/api/dashboardApi";
import { RootState } from "../../redux/store";
import { StatsType } from "../../types/api-types";
import { CustomError } from "../../types/type";

// import { useAllCategoriesQuery } from "../../redux/api/productApi";
// import { CustomError } from "../../types/type";
// import { Fragment } from "react";
// import { Skeleton } from "../../components/Loader";

// const userImg =
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp";

const Dashboard = () => {

 const {user} = useSelector((state:RootState)=>state.userReducer)

 const {isLoading, error, isError, data} = useStatsQuery(user?._id!)

 const [statsState, setstatsState] = useState<StatsType | null>( null)

 if(isError) return <Navigate to={"/"} />

if(error){
  let err = error as CustomError
  toast.error(err.data.message)
}





useEffect(() => {
  setstatsState(data?.stats!)
  // console.log(data);

}, [data])

// if(statsState){
//   console.log(Object.keys( statsState.userRatio));

// }

  return (
 <>
 
  {isLoading?<Skeleton length={10}/>:<div className="admin-container">
<AdminSidebar />
<main className="dashboard">
  <div className="bar">
    <BsSearch />
    <input type="text" placeholder="Search for data, users, docs" />
    <FaRegBell />
    <img src={user?.photo!} alt="User" />
  </div>

  <section className="widget-container">
    <WidgetItem
      percent={ statsState?.changePercent.orders!  && statsState?.changePercent.orders }
      amount={true}
      value={statsState?.count?.orders! && statsState?.count.orders}
      heading="Revenue"
      color="rgb(0, 115, 255)"
    />
    <WidgetItem
      percent={statsState?.changePercent.users!}
      value={statsState?.count?.user! && statsState?.count.user}
      color="rgb(0 198 202)"
      heading="Users"
    />
    <WidgetItem
      percent={-80000}
      value={23000}
      color="rgb(255 196 0)"
      heading="Transactions"
    />

    <WidgetItem
      percent={statsState?.changePercent.products!}
      value={statsState?.count?.product! && statsState?.count.product}
      color="rgb(76 0 255)"
      heading="Products"
    />
  </section>

  <section className="graph-container">
    <div className="revenue-chart">
      <h2>Revenue & Transaction</h2>
      <BarChart
        data_2={statsState?.chart.order!}
        data_1={statsState?.chart.revenue!}
        title_1="Revenue"
        title_2="Transaction"
        bgColor_1="rgb(0, 115, 255)"
        bgColor_2="rgba(53, 162, 235, 0.8)"
      />
    </div>

    <div className="dashboard-categories">
      <h2>Inventory</h2>

      <div>
        {statsState &&  statsState.cartegoryCount &&  statsState.cartegoryCount.map((i) => (
          <CategoryItem
            key={Object.keys(i)[0]}
            value={Object.values(i)[0]}
            heading={Object.keys(i)[0]}
            color={`hsl(${Object.values(i)[0] * 4}, ${Object.values(i)[0]}%, 50%)`}
          />
        ))}
      </div>
    </div>
  </section>

  <section className="transaction-container">
    <div className="gender-chart">
      <h2>Gender Ratio</h2>
      <DoughnutChart
        labels={["Female", "Male"]}
        // labels={Object.keys( statsState!.userRatio)}

        data={[statsState?.userRatio.female!, statsState?.userRatio.male!,]}
        backgroundColor={[
          "hsl(340, 82%, 56%)",
          "rgba(53, 162, 235, 0.8)",
        ]}
        cutout={90}
      />
      <p>
        <BiMaleFemale />
      </p>
    </div>
    {statsState && statsState.latestTransactions  && <Table data={ statsState.latestTransactions} />}
    
  </section>
</main>
</div>}
 </>
 )
    
    

};

interface WidgetItemProps {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const WidgetItem = ({
  heading,
  value,
  percent,
  color,
  amount = false,
}: WidgetItemProps) => (
  <article className="widget">
    <div className="widget-info">
      <p>{heading}</p>
      <h4>{amount ? `₹${value}` : value}</h4>
      {percent > 0 ? (
        <span className="green">
          <HiTrendingUp /> +  { `${percent > 10000?999:percent}%`}
        </span>
      ) : (
        <span className="red">
          <HiTrendingDown /> {`${percent < -10000?-999:percent}%`}
        </span>
      )}
    </div>

    <div
      className="widget-circle"
      style={{
        background: `conic-gradient(
        ${color} ${(Math.abs(percent) / 100) * 360}deg,
        rgb(255, 255, 255) 0
      )`,
      }}
    >
      <span
        style={{
          color,
        }}
      >
        {percent > 0 && `${percent > 10000?999:percent}%`}
        {percent < 0 && `${percent < -10000?-999:percent}%`}

      </span>
    </div>
  </article>
);

interface CategoryItemProps {
  color: string;
  value: number;
  heading: string;
}

const CategoryItem = ({ color, value, heading }: CategoryItemProps) => (
  <div className="category-item">
    <h5>{heading}</h5>
    <div>
      <div
        style={{
          backgroundColor: color,
          width: `${value}%`,
        }}
      ></div>
    </div>
    <span>{value}%</span>
  </div>
);

export default Dashboard;
