import { useState, useEffect, useContext } from "react";
import AuthContext from "../Context/AuthContext";
import TicketService from "../Services/TicketService";
import CartItem from "../Tables/CartItem";
import Util from "../Util/Util";
import DialogMesages from "../Util/DialogMessages";

const CartPage = () => {
    const { user } = useContext(AuthContext);
    const [tickets, setTickets] = useState([]);

    const fetchData = async () => {
        const ticketsResponse = await TicketService.getForCustomerByStatus(user().id, false);
        setTickets(ticketsResponse.data);
    }

    useEffect(() => {
        fetchData().catch(console.error);
    }, []);

    const applyPurchases = async () => {
        await Promise.all(tickets.map(async ticket => {
            if (Util.getTimeToExpire(ticket.created_date, 20) <= 0) {
                await TicketService.deleteById(ticket.id);
                return;
            }

            await TicketService.updateStatus(ticket.id, true);
        })); 

        DialogMesages.successMessage('You have purchased the tickets.');
        fetchData().catch(console.error);
    }

    return (
        <>
            <h1 className="my-4">Your cart</h1>
            {
                tickets.length === 0 ? <h3>You have no tickets</h3> :
                <>
                    <div className="mx-3 mt-3 d-flex justify-content-around flex-wrap">
                    { tickets.map(ticket => <CartItem key={ ticket.id } ticket={ ticket } fetchData={ fetchData }/>) }
                    </div>
                    <div className="mt-3">
                        <button className='btn btn-outline-primary' onClick={ applyPurchases }>
                            <i className="bi bi-cart-check"> </i>Apply purchases
                        </button>
                    </div>
                </>
            }
        </>
    );
}

export default CartPage;