import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import resData from "../data.json"
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
//import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
//import Grocery from "./components/Grocery";
  
// const resObj=
// {
        
//                   "info": {
//                     "id": "765152",
//                     "name": "Pizza Hut",
//                     "cloudinaryImageId": "RX_THUMBNAIL/IMAGES/VENDOR/2024/7/18/95189a93-5dc8-49ea-9a4b-986687ddc7a8_765152.jpg",
//                     "locality": "Pimpri chinchwad",
//                     "areaName": "Punawale",
//                     "costForTwo": "₹350 for two",
//                     "cuisines": [
//                       "Pizzas"
//                     ],
//                     "avgRating": 4,
//                     "parentId": "721",
//                     "avgRatingString": "4.0",
//                     "totalRatingsString": "500+",
//                     "sla": {
//                       "deliveryTime": 33,
//                       "lastMileTravel": 3.7,
//                       "serviceability": "SERVICEABLE",
//                       "slaString": "30-35 mins",
//                       "lastMileTravelString": "3.7 km",
//                       "iconType": "ICON_TYPE_EMPTY"
//                     },
//                     "availability": {
//                       "nextCloseTime": "2024-08-14 00:00:00",
//                       "opened": true
//                     },
//                     "badges": {
//                       "imageBadges": [
//                         {
//                           "imageId": "Rxawards/_CATEGORY-Pizza.png",
//                           "description": "Delivery!"
//                         }
//                       ]
//                     },
//                     "isOpen": true,
//                     "type": "F",
//                     "badgesV2": {
//                       "entityBadges": {
//                         "imageBased": {
//                           "badgeObject": [
//                             {
//                               "attributes": {
//                                 "description": "Delivery!",
//                                 "imageId": "Rxawards/_CATEGORY-Pizza.png"
//                               }
//                             }
//                           ]
//                         },
//                         "textBased": {
                          
//                         },
//                         "textExtendedBadges": {
                          
//                         }
//                       }
//                     },
//                     "aggregatedDiscountInfoV3": {
//                       "header": "ITEMS",
//                       "subHeader": "AT ₹189"
//                     },
//                     "differentiatedUi": {
//                       "displayType": "ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT",
//                       "differentiatedUiMediaDetails": {
//                         "mediaType": "ADS_MEDIA_ENUM_IMAGE",
//                         "lottie": {
                          
//                         },
//                         "video": {
                          
//                         }
//                       }
//                     },
//                     "reviewsSummary": {
                      
//                     },
//                     "displayType": "RESTAURANT_DISPLAY_TYPE_DEFAULT",
//                     "restaurantOfferPresentationInfo": {
                      
//                     },
//                     "externalRatings": {
//                       "aggregatedRating": {
//                         "rating": "--"
//                       }
//                     },
//                     "ratingsDisplayPreference": "RATINGS_DISPLAY_PREFERENCE_SHOW_SWIGGY"
//                   },
//                   "analytics": {
                    
//                   },
//                   "cta": {
//                     "link": "https://www.swiggy.com/restaurants/pizza-hut-pimpri-chinchwad-punawale-pune-765152",
//                     "type": "WEBLINK"
//                   }
//                 }
const Grocery=lazy(() => import("./components/Grocery"));

const About=lazy(() => import("./components/About"));

 const AppLayout=()=>{

    //authentication code
    const [userName,setUserName]=useState();

    //authentication
    useEffect(()=>{
        //make an API call n call username n password
        const data={
            name:"Tanvi Parsekar",
        };
        setUserName(data.name); //update userInfo
    },[]);

    return (
        <Provider store={appStore}>
            <UserContext.Provider value={{ loggedInUser: userName, setUserName}}>
            <div className="app">
                <Header />
                <Outlet />
            </div>
            </UserContext.Provider>
        </Provider>
    )
 };

 const appRouter=createBrowserRouter([
    {
        path:"/",
        element:<AppLayout />,
        children:[
            {
                path:"/",
                element:<Body />,
            },
            {
                path:"/about",
                element:(
                    <Suspense fallback={<h1>Loading...</h1>}>
                        <About /> 
                    </Suspense>
                ),
            },
            {
                path:"/contact",
                element:<Contact />,
            },
            {
                path:"/grocery",
                element:(
                    <Suspense fallback={<h1>Loading...</h1>}>
                        <Grocery /> 
                     </Suspense>
                ),
            },
            {
                path:"/restuarants/:resId",
                element:<RestaurantMenu />,
            },
            {
                path:"/cart",
                element:<Cart />,
            },
        ],
        errorElement:<Error />,
    },
 ]);

const root=ReactDOM.createRoot(document.getElementById("root"));

//root.render(jsxheading);  //render element
root.render(<RouterProvider router={appRouter} />);

//createElement- creates an obj
//renderDOM- renders tht obj 
//sibling- create arr of obj