import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import "@testing-library/jest-dom";


test("should render header component with a login button", ()=>{
    render(
        <BrowserRouter>
            <Provider store={appStore}> 
                <Header />
            </Provider>
        </BrowserRouter>
    );

    const loginButton=screen.getByRole("button",{name:"Login"});
    //const loginButton=screen.getByText("Login");
    expect(loginButton).toBeInTheDocument();
});

test("should render header component with a cart button", ()=>{
    render(
        <BrowserRouter>
            <Provider store={appStore}> 
                <Header />
            </Provider>
        </BrowserRouter>
    );

    const cartItems=screen.getByText(/🛒/);
    //const loginButton=screen.getByText("Login");
    expect(cartItems).toBeInTheDocument();
});

test("should change login button to logout on click", ()=>{
    render(
        <BrowserRouter>
            <Provider store={appStore}> 
                <Header />
            </Provider>
        </BrowserRouter>
    );

    const loginButton=screen.getByRole("button",{name:"Login"});
    fireEvent.click(loginButton);

    //const loginButton=screen.getByText("Login");
    const logoutButton=screen.getByRole("button",{name:"Logout"});

    expect(logoutButton).toBeInTheDocument();
});