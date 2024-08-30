//import { useEffect,useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
import useRestuarantMenu from "../utils/useRestuarantMenu";
import RestuarantCategory from "./RestuarantCategory";
import { useState } from "react";

const RestaurantMenu =()=>{
    //const [resInfo,setResInfo]=useState(null);

    const {resId}=useParams();

    const resInfo=useRestuarantMenu(resId);

    const [showIndex,setShowIndex]=useState(null);

    // useEffect(()=>{
    //     fetchMenu();
    // },[]);

    // const fetchMenu=async ()=>{
    //     const data=await fetch(MENU_API+resId);
    //     const json=await data.json();

    //     console.log(json);

    //     setResInfo(json.data);
    // };

    console.log(resInfo);

    if (resInfo === null)
        {return ( <Shimmer />);}

    // //const {name,cuisines,costForTwoMessage}=resInfo?.cards[2]?.card?.card;
    const name=resInfo?.cards?.[2]?.card?.card.info.name;
    const cuisines=resInfo?.cards?.[2]?.card?.card.info.cuisines;
    const costForTwoMessage=resInfo?.cards?.[2]?.card?.card.info.costForTwoMessage;

    const itemCards=resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards;
    // console.log(resInfo);

    const categories=
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c)=>
            c.card?.["card"]?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"  
            // ||
            // "type.googleapis.com/swiggy.presentation.food.v2.MenuVegFilterAndBadge" ||
            // "type.googleapis.com/swiggy.presentation.food.v2.MenuCarousel" ||
            // "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
    );
    console.log(categories);
    // console.log(resInfo.cards[4].groupedCard.cardGroupMap.REGULAR.cards.card.card)

    // if (resInfo === null)
    //     {return ( <Shimmer />);}

    return(
        <div className="menu text-center">
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold text-6lg">{cuisines.join(",")} - {costForTwoMessage}</p>
            
            {/* catergories accodian */}
            {categories.map((category,index)=>(
                //controlled component :does not wrk on its own
                <RestuarantCategory
                key={category?.card?.card?.title}
                 data={category?.card?.card}
                 showItems={index===showIndex ? true : false} 
                 setShowIndex={()=>setShowIndex(index)}
                 />
             ))}
            
            
            {/* <h2>Menu</h2>
        
            <ul>
                {itemCards.map((item)=>(
                    <li key={item.card.info.id}>
                        {item.card.info.name} - {"Rs."}  {item.card.info.price/100}</li>
                ))}
                {/* <li>{itemCards[0].card.info.name}</li>
                <li>{itemCards[1].card.info.name}</li>
                <li>{itemCards[2].card.info.name}</li>
            </ul>*/}
        
        </div>  
    );
};

export default RestaurantMenu;