

const Loader = () => {
  return (
    <div>Loader</div>
  )
}

export default Loader


interface SkeletonProps{
  width?:string;
  length?:number;
}
export const Skeleton =({width ="unset", length=1}:SkeletonProps)=>{
  return(
      <div className="skeleton-loader" style={{width:width}}>
        {new Array(length).map((_v, idx)=>(
          <div key={idx} className="skeleton-shape"></div>
        ))}
            
           

      </div>
  )
}