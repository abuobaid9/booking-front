import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading } = useFetch("https://rose-lucky-dolphin.cyclic.app/api/hotels?featured=true&limit=5");
console.log(data,"hereeee");


  return (
    <div className="fp">
      {loading ? (
       <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id} >
              <img
                src={item.photos[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
              <div className="fpRating">
                <button >{(Math.random() * (5.0 - 2.7 ) + 2.5).toFixed(1)}</button>
                <span>Excellent</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
