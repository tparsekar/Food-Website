import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";

const RestCard=(props)=>{
  
    const {resData}=props;
    //console.log(resData);
    const {loggedInUser}=useContext(UserContext);

    const {
      cloudinaryImageId,
      name,
      cuisines,
      avgRating,
      costForTwo,
      sla,deliveryTime,
    }= resData?.info; 

    return (
        <div data-testid="resCard" className="rest-card p-4 m-4 w-[250px] rounded-lg bg-orange-200 hover:bg-orange-300 border border-black ">
            <img className="res-logo rounded-md"
                alt="res-logo"
                src={CDN_URL + 
                  cloudinaryImageId
                } 
            />
            <h3 className="font-bold py-2 text-lg">{name}</h3>
            <h4>{cuisines.join(", ")}</h4> 
            <h4>⭐{avgRating}</h4>
            <h4>Rs.{costForTwo }</h4>
            <h4>{sla.deliveryTime} mins</h4>
            <h4>User: {loggedInUser}</h4>
        </div>
    );
};

export default RestCard;