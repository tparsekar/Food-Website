import RestCard from "./RestaurantCard";
//import { resList } from "../utils/mockData";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body=()=>
    {
//local state var
const [listOfRestuarants, setListOfRestaurant]=useState([]);
const [filteredRestaurant, setFilteredRestaurant]=useState([]);

const [searchText, setSearchText]=useState("");

// console.log(listOfRestuarants);

useEffect(()=>{
    fetchData();
}, []);

// featch data from API n convert into json
const fetchData=async ()=>{
    const data=await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.61610&lng=73.72860&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json=await data.json();

    // console.log(json);
    setListOfRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
};

//checks whether there is internet
const OnlineStatus=useOnlineStatus();
if(OnlineStatus===false)
return (
    <h1>
        Looks like your offline!! Please check your internet connection
    </h1>
);

const {loggedInUser,setUserName}=useContext(UserContext);

//conditional rendring with ternary opraator

      return listOfRestuarants.length===0 ?<Shimmer /> : (
          <div className="body">
            {/* overall container wch contains seearch n filter */}
            <div className="filter flex"> 

                {/* Search bar */}
                <div className="search m-4 p-4">
                    <input 
                    type="text" 
                    data-testid="searchInput"
                    className="border border-solid border-black" 
                    value={searchText}
                    onChange={(e)=>{
                        setSearchText(e.target.value);
                    }}
                    />
                    <button className="px-4 py-1 bg-orange-500 m-4 rounded-lg"
                        onClick={()=>{
                        //filter the restaurant cards n update the UI
                        //searchText
                        const filteredRestaurant=listOfRestuarants.filter(
                            (res)=>res.info.name.toLowerCase().includes(searchText.toLowerCase())
                        );

                        setFilteredRestaurant(filteredRestaurant);
                    }}
                    >
                    Search
                    </button>
                </div>
                
                <div>
                    <div className="filter-div m-4 p-4 flex items-center">
                        <label>UserName: </label>
                        <input 
                            className="border border-black p-2 rounded-md"
                            value={loggedInUser}
                            onChange={(e)=>setUserName(e.target.value)} />

                        <button className="filter-btn px-4 py-1 bg-orange-500 rounded-lg"
                                    onClick={()=>{
                                        const filteredList=listOfRestuarants.filter(
                                        (res)=>res.info.avgRating > 4
                            );
                                setFilteredRestaurant (filteredList);  //updates list
                            }}>
                                Top rated Restaurants 
                        </button>
                    </div>
                </div>



            </div>
              
              <div className="res-container flex flex-wrap mx-2 justify-between">
                {
                //   resList.map((restaurant)=><RestCard key={restaurant.info.id} resData={restaurant}/>)
                filteredRestaurant.map((restaurant)=>(
                    <Link 
                    key={restaurant.info.id}
                    to={"/restuarants/"+ restaurant.info.id}
                    >
                        <RestCard resData={restaurant}/>
                    </Link>
                    )
                )}
                  {/* <RestCard  resData={resList[0]}/>
                  <RestCard  resData={resList[1]}/>
                  <RestCard  resData={resList[2]}/>
                  <RestCard  resData={resList[3]}/>
                  <RestCard  resData={resList[5]}/>
                  <RestCard  resData={resList[6]}/>
                  <RestCard  resData={resList[7]}/>  */}
                  
              </div>
          </div>
      );
  };

  export default Body;