
import Header from "../components/Header"

export default function FrontPage() {


  return (
    <div>
      <Header page="front" />

      <div className="explanation" >
        <h3>
          This app can be used to find the net worth of a portfolio of stocks.  Once a user logs in, they can enter 
          the stock symbols, stock names, number of shares of each stock and the total purchase price for each
          stock.  The app then pulls the latest prices for each stock entered and calculates the current value of the 
          holding along with the amount of profit (or loss).  The app then sums and displays the net worth of the portfolio.
        </h3>

      </div>

    </div>
  )
}