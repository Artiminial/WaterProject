import { useNavigate, useParams } from "react-router-dom";
import WlecomeBand from  "../components/WlecomeBand";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import type { CartItem } from "../types/CartItem";




function DonatePage(){
    const navigate = useNavigate();
    const{projectName, projectId} = useParams();
    const {addToCart} = useCart();
    const [donationAmount, setDonationAmount] = useState<number>(0);

    const handleAddToCart = () => {
        const newItem: CartItem = {
            projectId: Number(projectId), 
            projectName: projectName || "No Project found", 
            donationAmount}
        addToCart(newItem)
        navigate('/cart')
    }


    return(


        <>
        <WlecomeBand />
            <h2>Donate to {projectName}</h2>

            <div>
                <input type="number" placeholder="Enter Donation ammount" value={donationAmount} onChange={(x) => setDonationAmount(Number(x.target.value))}/>
                <button onClick={handleAddToCart}>Add To Cart</button>
            </div>
            <button onClick={() => navigate('/')}>Go Back</button>
        </>
    );
};

export default DonatePage