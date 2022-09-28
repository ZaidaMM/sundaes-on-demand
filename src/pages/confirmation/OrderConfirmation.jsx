import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useOrderDetails } from '../../contexts/OrderDetails';
import axios from 'axios';

function OrderConfirmation({ setOrderPhase }) {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState('null');

  useEffect(() => {
    axios
      // order details should come from context and send with POST
      .post('http:/localhost:3030/order')
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) =>
        console.log('Error')
        //TODO handle error
      );
  }, []);

  function handleClick() {
    // clear order
    resetOrder();

    // send back to order page
    setOrderPhase('inProgress');
  }

  if (orderNumber) {
    return (
      <div>
        <h1>Thank you!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: '25%' }}>
          as per our terms and conditions, nothing will happen now
        </p>
        <Button onClick={handleClick} type='submit'>
          Create new order
        </Button>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
export default OrderConfirmation;
