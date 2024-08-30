import { fireEvent, render,screen} from "@testing-library/react";
import Body from "../Body";
//import { json } from "react-router-dom";
import MOCK_DATA from "../mocks/mockResListData.json";
import { BrowserRouter } from "react-router-dom";
import { act } from "react";
import "@testing-library/jest-dom";
import RestCard from "../RestaurantCard";

global.fetch =jest.fn(()=>{
    return Promise.resolve({
        json: ()=>{
            return Promise.resolve(MOCK_DATA);
        },
    });
});

test("should search resList for Burger text input", async ()=>{
    await act(async ()=>
        render(
            <BrowserRouter>
                <Body />
            </BrowserRouter>
        )
    );

    const cardsBeforeSearch=screen.getAllByTestId("resCard");
    expect(cardsBeforeSearch.length).toBe(20);

    //searchbtn exist karta kai na
    const searchBtn=screen.getByRole("button",{name:"Search"});

    const searchInput=screen.getByTestId("searchInput");
    fireEvent.change(searchInput, {target: {value:"burger"}});
    fireEvent.click(searchBtn);

    //screen should load 3 res card
    const cardsAfterSearch= screen.getAllByTestId("resCard");
    expect(cardsAfterSearch.length).toBe(2);

    //expect(searchBtn).toBeInTheDocument();
});

test("should filter top rated restauarants", async ()=>{
    await act(async ()=>
        render(
            <BrowserRouter>
                <Body />
            </BrowserRouter>
        )
    );

    const cardsBeforeFilter=screen.getAllByTestId("resCard");
    expect(cardsBeforeFilter.length).toBe(20);

    const topRatedBtn=screen.getByRole("button", {name: "Top rated Restaurants"});
    fireEvent.click(topRatedBtn);

    const cardsAfterFilter=screen.getAllByTestId("resCard");
    expect(cardsAfterFilter.length).toBe(16);
});