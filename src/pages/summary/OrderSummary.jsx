import { useOrderDetails } from '../../contexts/OrderDetails';
import SummaryForm from './SummaryForm';

export default function OrderSummary({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  const scoopArray = Array.from(orderDetails.scoops.entries());
  const scoopList = scoopArray.map(([key, value]) => {
    <li key={key}>
      {value} {key}
    </li>;
  });

  const toppingArray = Array.from(orderDetails.toppings.keys());
  const toppingList = toppingArray.map((key) => {
    <li key={key}>{key}</li>;
  });

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {orderDetails.totals.toppings}</h2>
      <ul>{toppingList}</ul>
      <h2>Total {}</h2>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}
