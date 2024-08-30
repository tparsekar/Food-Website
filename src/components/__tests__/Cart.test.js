import { fireEvent, render, screen } from "@testing-library/react";
import MOCK_DATA_NAME from "../mocks/mockResMenu.json"
import { act } from "react";
import RestaurantMenu from "../RestaurantMenu";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Cart from "../Cart";

global.fetch=jest.fn(()=>
    Promise.resolve({
        json:()=>Promise.resolve(MOCK_DATA_NAME),
    })
);

test("should load restuarant menu component",async()=>{
    await act(async ()=>
        render (
            <BrowserRouter>
                <Provider store={appStore}>
                    <Header />
                    <RestaurantMenu />
                    <Cart />
                </Provider>
            </BrowserRouter>
        ));

    const accordianHeader=screen.getByText("Recommended (20)");
    fireEvent.click (accordianHeader);

    expect(screen.getAllByTestId("foodItems").length).toBe(20);

    //find add+ buttons
    const addBtns=screen.getAllByRole("button",{name:"Add +"});
    fireEvent.click(addBtns[0]); //when clicked on 1st btn header should update

    expect(screen.getByText("🛒 - 0 ")).toBeInTheDocument();

    fireEvent.click(addBtns[1]);

    expect(screen.getByText("🛒 - 2 ")).toBeInTheDocument();

    expect(screen.getAllByTestId("fooditems").length).toBe(22);

    //clear cart
    fireEvent.click(screen.getByRole("button", {name:"Clear Cart "}));

    expect(screen.getByText("Oops!! Cart is Empty. Add items to cart")).toBeInTheDocument();
});