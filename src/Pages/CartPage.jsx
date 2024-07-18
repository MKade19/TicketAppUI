import { useState, useEffect, useContext } from "react";
import AuthContext from "../Context/AuthContext";
import TicketService from "../Services/TicketService";
import CartItem from "../Tables/CartItem";

const CartPage = () => {
    const { user } = useContext(AuthContext);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const ticketsResponse = await TicketService.getForCustomerByStatus(user().id, false);
            console.log(ticketsResponse.data);
            setTickets(ticketsResponse.data);
        }

        fetchData().catch(console.error);
    }, []);

    return (
        <>
            <h1 className="my-4">Your cart</h1>
            <div className="mt-3">
                <button className='btn btn-outline-primary'>
                    <i className="bi bi-cart-check"> </i>Apply purchases
                </button>
            </div>
            <div className="mx-3 mt-3 d-flex justify-content-around flex-wrap">
                { tickets.map(ticket => <CartItem key={ticket.id} ticket={ticket}/>) }
            </div>
        </>
        
    );
}

export default CartPage;