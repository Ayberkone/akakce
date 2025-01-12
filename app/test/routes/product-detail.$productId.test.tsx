import { render, waitFor, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter as Router, BrowserRouterProps } from "react-router-dom"
import ProductDetail from "~/routes/product-detail.$productId"
import { useLoaderData } from "@remix-run/react"
import { jest } from "@jest/globals"
import "@testing-library/jest-dom"

jest.mock("@remix-run/react", () => {
  return {
    ...(jest.requireActual("@remix-run/react") as object),
    useLoaderData: jest.fn()
  }
})

describe("ProductDetail", () => {
  const mockProduct = {
    name: "iPhone 14 Pro Max",
    rating: 4.9,
    imageUrl: "/iphone14.jpg",
    storageOptions: ["128GB", "256GB", "512GB"],
    countOfPrices: 3,
    price: 17999.0,
    freeShipping: true,
    lastUpdate: "2023-12-31",
  }

  beforeEach(() => {
    ; (useLoaderData as jest.Mock).mockReturnValue(mockProduct)
  })

  test("renders product details correctly", async () => {
    render(
      <Router>
        <ProductDetail />
      </Router>
    )
    await waitFor(() => {
      expect(screen.getByText(/iPhone 14 Pro Max/i)).toBeInTheDocument()
      expect(screen.getByRole("img", { name: /iPhone 14 Pro Max/i })).toHaveAttribute("src", "/iphone14.jpg")
      expect(screen.getByText("4.9")).toBeInTheDocument()
      expect(screen.getByText(/17.999,00 TL/i)).toBeInTheDocument()
      expect(screen.getByText(/3 satıcı içinde kargo dahil en ucuz fiyat seçeneği/i)).toBeInTheDocument()
      expect(screen.getByText(/Ücretsiz kargo/i)).toBeInTheDocument()
      expect(screen.getByText(/Son güncelleme: 2023-12-31/i)).toBeInTheDocument()
    })
  })

  test("allows capacity selection", async () => {
    render(
      <Router>
        <ProductDetail />
      </Router>
    )

    const capacityButtons = screen.getAllByRole("button", { name: /GB/i })
    expect(capacityButtons).toHaveLength(3)

    // Use userEvent instead of fireEvent to simulate the click
    await userEvent.click(capacityButtons[1]) // Click on the 128GB button

    await waitFor(() => {
      expect(capacityButtons[1]).toHaveClass("capacityButtonSelected")
    })

    expect(capacityButtons[1].textContent).toBe("128GB")
  })

  test("urun data yuklenemedi", () => {
    ; (useLoaderData as jest.Mock).mockReturnValue(null)

    render(
      <Router>
        <ProductDetail />
      </Router>
    )

    expect(screen.getByText(/Ürün bulunamadı/i)).toBeInTheDocument()
  })
})
