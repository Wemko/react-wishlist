import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Product from "./Product";

const mockProduct = {
    id: 1,
    name: "some name",
    description: "some description",
    image: "images/7.jfif"
}

describe('Product', () => {
    test('should render the name', () => {
        render(<Product product={mockProduct} />)
        expect(screen.getByText(mockProduct.name)).toContainHTML('<span');
    });

    test('should render the description', () => {
        render(<Product product={mockProduct} />)
        expect(screen.getByText(mockProduct.name)).toContainHTML('<span');
    });
});