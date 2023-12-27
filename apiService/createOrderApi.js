export const creatOrder = async (orderReqData) => {
    // console.log('orderReqData--', orderReqData);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUsImRldmljZV9pZCI6ImI4NGQ4ZGFiLTQwMzEtNGE5Mi1iMjE0LTE0NzViYzc1NDAzYSIsInR5cGUiOiJmYXJtZXJBcHAiLCJpYXQiOjE3MDMyMzk3OTN9.GbLEm7v4Wpn0v5x-NnnOk5dilN7m9QC2JfRw660j9Bg"
    try {
        const response = await fetch('https://devrootstockapi.tene.in/api/create/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Adjust if needed
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(orderReqData),
        });

        const data = await response.json();
        if (data?.data?.orderId) {
            // console.log('success Response data:', data);
            return data?.data
        } else {
            console.log('Err : order create---  ', data);
        }

    } catch (error) {
        console.log('Error : order create---  ', error);
        // Handle errors gracefully
    }
};

export const verifyPayment = async (verifyReqData) => {
    console.log('verifyReqData--', verifyReqData);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUsImRldmljZV9pZCI6ImI4NGQ4ZGFiLTQwMzEtNGE5Mi1iMjE0LTE0NzViYzc1NDAzYSIsInR5cGUiOiJmYXJtZXJBcHAiLCJpYXQiOjE3MDMyMzk3OTN9.GbLEm7v4Wpn0v5x-NnnOk5dilN7m9QC2JfRw660j9Bg"
    try {
        const response = await fetch('https://devrootstockapi.tene.in/api/verify/order', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', // Adjust if needed
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(verifyReqData),
        });

        const data = await response.json();
        console.log('success verify response data: ', data);
        return data

    } catch (error) {
        console.error('Error:', error);
        // Handle errors gracefully
    }
};