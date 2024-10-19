import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const OrderSummary = () => {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [address, setAddress] = useState({
        houseNo: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        phoneNumber: '',
    });

    useEffect(() => {
        // Function to fetch addresses
        const fetchAddresses = async () => {
            try {
                const response = await fetch('http://localhost:3000/address/getAddress', {
                    credentials: 'include' // Include cookies with the request
                });
                const data = await response.json();
                if (!response.ok) {
                    console.error('Error fetching addresses:', data.error);
                    return;
                }
                console.log('Fetched addresses:', data); // Log the fetched addresses
                setAddresses(data.addresses || []); // Adjust this based on your API response structure
            } catch (error) {
                console.error('Error fetching addresses:', error);
            }
        };

        fetchAddresses(); // Call the function to fetch addresses
    }, []); // Run only on component mount

    const location = useLocation();
    const [cartItems, setCartItems] = useState([]);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        // Initialize the cartItems, product, and quantity from location.state only once
        if (location.state) {
            setCartItems(location.state.cartItems || []);
            setProduct(location.state.product || null);
            setQuantity(location.state.quantity || 0);
        }
    }, [location.state]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
    };

    const handleAddAddress = async (e) => {
        e.preventDefault(); // Prevent page reload on form submission
        try {
            // API call using fetch with credentials
            const response = await fetch('http://localhost:3000/address/addAddress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(address),
                credentials: 'include', // Include cookies with the request
            });

            if (response.ok) {
                const result = await response.json(); // Assuming the saved address is returned from the API
                console.log('Address added successfully:', result); // Log the result
                setAddress({
                    houseNo: '',
                    street: '',
                    city: '',
                    state: '',
                    pincode: '',
                    phoneNumber: '',
                });
                setShowAddressForm(false);
                // Optionally, fetch addresses again to refresh the list
                fetchAddresses();
            } else {
                console.error('Failed to save address.', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const totalCartItems = Array.isArray(cartItems)
        ? cartItems.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0)
        : 0;

    const yoursaving = Array.isArray(cartItems)
        ? cartItems.reduce((total, item) => total + ((item.product?.MRP || 0) - (item.product?.price || 0)) * item.quantity, 0)
        : 0;

    const TotalMRP = Array.isArray(cartItems)
        ? cartItems.reduce((total, item) => total + (item.product?.MRP || 0) * item.quantity, 0)
        : 0;


    const formattedTotalCartItems = totalCartItems.toFixed(2);
    const formattedYoursaving = yoursaving.toFixed(2);
    const formattedTotalMRP = TotalMRP.toFixed(2);

    const productTotalPrice = product ? product.price * quantity : 0;
    const totalproudctSaving = product ? (product.MRP - product.price) * quantity : 0;
    const productMRPPrice = product ? product.MRP * quantity: 0;

    return (
        <div className="p-4 px-32">
            <h1 className="text-2xl font-bold mb-4">Order Summary</h1>

            {cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <div key={item._id} className="mb-4 p-4 border rounded-lg shadow-lg flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-xl">{item.product.title}</h3>
                            <p className='text-lg font-semibold'>Price: ₹{item.product.price}</p>
                            <p className='text-lg font-semibold'>Quantity: {item.quantity}</p>
                        </div>
                        <div>
                            <img src={item.product.image} alt={item.product.title} className="w-20 h-20 object-cover" />
                        </div>
                    </div>
                ))
            ) : product ? (
                <div className="mb-4 p-4 border rounded-lg shadow-lg flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-xl">{product.title}</h3>
                        <p className='text-lg font-semibold'>Price: ₹{product.price}</p>
                        <p className='text-lg font-semibold'>Quantity: {quantity}</p>
                    </div>
                    <div>
                        <img src={product.image} alt={product.title} className="w-20 h-20 object-cover" />
                    </div>
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}

            {cartItems.length > 0 ? (
                <div className='mb-4 p-4 border rounded-lg shadow-lg items-center flex flex-col'>
                    <div className='mb-4 p-4 border rounded-lg shadow-lg flex flex-col items-center'>
                        <div className="flex justify-between w-full">
                            <h2 className="text-xl font-semibold mb-2">MRP Total: </h2>
                            <h2 className="text-xl font-semibold mb-2">₹{formattedTotalMRP}.00</h2>
                        </div>
                        <div className="flex justify-between w-full">
                            <h2 className="text-xl font-semibold mb-2">Total Saving: </h2>
                            <h2 className="text-xl font-semibold mb-2">₹{formattedYoursaving}</h2>
                        </div>
                        <div className="w-full my-2">
                            <div className='w-full border border-black'></div>
                        </div>
                        <div className="flex justify-between w-full">
                            <h2 className="text-xl font-semibold mb-2">Total Amount: </h2>
                            <h2 className="text-xl font-semibold mb-2">₹{formattedTotalCartItems}</h2>
                        </div>
                    </div>
                </div>
            ) : product ? (
                <div className='mb-4 p-4 border rounded-lg shadow-lg items-center flex flex-col'>
                    <div className='mb-4 p-4 border rounded-lg shadow-lg flex flex-col items-center'>
                        <div className="flex justify-between w-full">
                            <h2 className="text-xl font-semibold mb-2">MRP Total: </h2>
                            <h2 className="text-xl font-semibold mb-2"> ₹{productMRPPrice}</h2>
                        </div>
                        <div className="flex justify-between w-full">
                            <h2 className="text-xl font-semibold mb-2">Total Saving: </h2>
                            <h2 className="text-xl font-semibold mb-2"> ₹{totalproudctSaving}</h2>
                        </div>
                        <div className="w-full my-2">
                            <div className='w-full border border-black'></div>
                        </div>
                        <div className="flex justify-between w-full">
                            <h2 className="text-xl font-semibold mb-2">Total Amount: </h2>
                            <h2 className="text-xl font-semibold mb-2"> ₹{productTotalPrice}</h2>
                        </div>
                    </div>
                </div>

            ) : null}

            <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Delivery Address</h2>
                {addresses.length === 0 ? (
                    <div>Please Add Address</div>
                ) : (
                    <>
                        <select
                            value={selectedAddress}
                            onChange={(e) => {
                                setSelectedAddress(e.target.value); // Store the selected address value
                            }}
                            className="border border-gray-300 rounded p-2 mb-4 w-full" required
                        >
                            <option value="">Select an address</option>
                            {addresses.map((address, index) => (
                                <option key={index} value={`${address.houseNo}, ${address.street}, ${address.city}, ${address.state}, ${address.pincode}`}>
                                    {`${address.houseNo}, ${address.street}, ${address.city}, ${address.state}, ${address.pincode}`}
                                </option>
                            ))}
                        </select>
                    </>
                )}

                <div className='flex gap-4'>
                    <button
                        onClick={() => setShowAddressForm(!showAddressForm)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
                    >
                        Add Address
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
                    >
                        Payment
                    </button>
                </div>

                {showAddressForm && (
                    <form onSubmit={handleAddAddress} className="mt-4">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="houseNo"
                                    placeholder="House/Flat Number"
                                    value={address.houseNo}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="street"
                                    placeholder="Street"
                                    value={address.street}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={address.city}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    value={address.state}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="pincode"
                                    placeholder="Pincode"
                                    value={address.pincode}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="Phone Number"
                                    value={address.phoneNumber}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
                        >
                            Save Address
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default OrderSummary;
