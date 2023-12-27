import { Button, ToastAndroid, View } from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import { creatOrder, verifyPayment } from "../apiService/createOrderApi";

const Razorpay = () => {

  const ammount = 100
  const currency = 'INR'
  const razorPayTKI = "rzp_test_12TTAT02atBvzC"

  let orderReqData = {
    amount: ammount * 100,
    currency: currency,
    cropId: "21",
    packageId: "102"
  }

  const openPaymentGatewayModal = async() => {

    let orderDetails = await creatOrder(orderReqData)
    console.log("orderDetails---",orderDetails)
    var options = {
      description: orderDetails?.orderJson?.notes?.productDescription ? orderDetails?.orderJson?.notes?.productDescription : "", //Crop package Order
      image: orderDetails?.cropId?.cropImage?.url ? orderDetails?.cropId?.cropImage?.url : "", //'https://i.imgur.com/3g7nmJC.jpg',
      currency: currency,
      key: razorPayTKI,
      amount: ammount * 100,
      name: orderDetails?.userId?.name ? orderDetails?.userId?.name : "", //Atin Sahu
      order_id: orderDetails?.orderId ? orderDetails?.orderId : "" , //order_NGqWUicroLRitf
      prefill: {
        email: orderDetails?.userId?.email ? orderDetails?.userId?.email : "", //Atin Sahu
        contact: orderDetails?.userId?.mobileNumber ? orderDetails?.userId?.mobileNumber : "", //6391977171
        name: orderDetails?.userId?.name ? orderDetails?.userId?.name :'' //atinsahu71@gmail.com
      },
      theme: { color: '#53a20e' }
    }
    RazorpayCheckout.open(options).then(async(paymentReaponse) => {
        console.log("paymentReaponse----", paymentReaponse)
        let verifyReqData = {
            payment_id: paymentReaponse?.razorpay_payment_id,
            razorpay_signature:paymentReaponse?.razorpay_signature,
            payementEntryId: orderDetails?.id,
            order_id:orderDetails?.orderId,
        }
        let verifyResponse = await verifyPayment(verifyReqData)
        alert(`Success: ${verifyResponse?.message}`);
    }).catch((error) => {
      console.log("parment checkout Error---", error)
      alert(`Error: ${error.code} | ${error.description}`);
    });
  }

  return (   
    <View>
        <View style={{margin:20}}>
            <Button
            title="Create Order"
            onPress={()=>  ToastAndroid.show('Request sent successfully!', ToastAndroid.SHORT)} //creatOrder
            />
        </View>

        <Button
            title="Razor Pay"
            onPress={openPaymentGatewayModal}
        />
    </View> 
  );
};

export default Razorpay;