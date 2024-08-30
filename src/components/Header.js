import { useState ,useContext } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header=()=>
    {
        const [btnReact, setBtnReact] = useState("Login");

        const OnlineStatus=useOnlineStatus();

        const {loggedInUser} = useContext(UserContext);
        console.log(loggedInUser);

        //Subscribing to the store using a Selector
        const cartItems =useSelector((store)=>store.cart.items);

    //console.log(resData.data.cards[1].card.card.gridElements.infoWithStyle.restaurants[1].info.name)
    return (
        <div className="flex justify-between bg-orange-500 shadow-lg"> 
            
            <div className="logo-continer">
                <img
                 className="w-36 "
                 src={LOGO_URL} alt="Logo" />
            </div>

            <div className="flex items-center">
                <ul className="flex p-4 m-4 ">
                    <li className="px-4">
                        Online Status: {OnlineStatus?"✔":"🔴"}
                    </li>
                    <li className="px-4"><Link to="/">Home</Link></li>
                    <li className="px-4"><Link to="/about">About Us</Link></li>
                    <li className="px-4"><Link to="/contact">Contact Us</Link></li>
                    <li className="px-4"><Link to="/grocery">Grocery</Link></li>
                    <li className="px-4 font-bold text-xl"><Link to="/cart">🛒 - {cartItems.length}</Link> </li>

                    <button className="login" 
                    onClick={()=>{
                        btnReact==="Login"
                        ? setBtnReact("Logout")
                        : setBtnReact("Login");
                    }}
                    >
                    {btnReact}
                    </button>

                    <li className="px-4 font-bold ">
                        {loggedInUser}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;