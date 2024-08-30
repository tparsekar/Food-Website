import { render,screen} from "@testing-library/react";
import Contact from "../Contact";
import '@testing-library/jest-dom'

describe("contact us page test cases",()=>{
    // beforeAll(()=>{
    //     console.log("Before All");
    // });

    // beforeEach(()=>{
    //     console.log("Before Each");
    // });

    // afterAll(()=>{
    //     console.log("After All");
    // });

    // afterEach(()=>{
    //     console.log("After Each");
    // });
    
    test("Should load Contact us component",()=>{
        render(<Contact />);

        const heading=screen.getByRole("heading");

        //Assertion
        expect(heading).toBeInTheDocument();
    });

    test("Should load button inside Contact component",()=>{
        render(<Contact />);

        const button=screen.getByRole("button");

        //Assertion
        expect(button).toBeInTheDocument();
    });

    test("Should load input name inside Contact component",()=>{
        render(<Contact />);

        const inputName=screen.getByPlaceholderText("Name");

        //Assertion
        expect(inputName).toBeInTheDocument();
    });

    test("Should load 2 input boxes in Contact component",()=>{
        render(<Contact />);

        const inputBoxes=screen.getAllByRole("textbox");
        console.log(inputBoxes.length);

        //Assertion
        expect(inputBoxes.length).toBe(2);
    });
});
