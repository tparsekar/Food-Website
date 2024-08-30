import { render,screen } from "@testing-library/react";
import RestCard from "../RestaurantCard";
import MOCK_DATA from "../mocks/resCardMock.json";
import "@testing-library/jest-dom"

test("should render RestuarantCard component with props Data", ()=>{
    render(<RestCard  resData={MOCK_DATA} />);

    const name=screen.getByText("Dum Safar Biryani");

    expect(name).toBeInTheDocument();
});