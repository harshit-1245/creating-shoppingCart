import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Image} from 'react-native';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation
import { MaterialIcons } from '@expo/vector-icons';
const ConfirmationScreen = () => {
  const navigation=useNavigation()
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" }
  ];

  // State for increasing steps
  const [currentStep, setCurrentStep] = useState(0);
  const [order,setOrder]=useState(null);
  const [option,setOption]=useState(false) //for step 2
  const [selectedOption,setSelectedOption]=useState("") //options for payment

  // State for selected address
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Demo addresses in JSON format
  const demoAddresses = [
    {
      _id: 1,
      name: "Harshit Singh",
      location: "12, XYZ, NH-7",
      street: "Anywhere....",
      city: "Bhubneswar, India",
      phoneNumber: "+91-XXXXXXXXXX"
    },
    // Add more addresses as needed
  ];

  const orderDetails = [
    {
      _id: 1,
      productName: "Sample Product",
      quantity: 2,
      price: 29.99,
      totalPrice: 59.98,
      // Add other details as needed
    },
    // Add more order details as needed
  ];

  //condion for move back to home after order placed
  const moveToHome=()=>{
    setTimeout(() => {
      navigation.navigate("Home");
    }, 3000);
  }
  // useEffect to call moveToHome when the component mounts
  useEffect(() => {
    if (currentStep === 4) {
      moveToHome();
    }
  }, [currentStep]);

  return (
    <ScrollView style={{ marginTop: 55 }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 40 }}>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
          justifyContent: "space-between",
        }}>
          {steps?.map((step, index) => (
            <View key={index} style={{ justifyContent: "center", alignItems: "center" }}>
              {index > 0 && (
                <View style={[{ flex: 1, height: 2, backgroundColor: "green" }, index <= currentStep && { backgroundColor: "green" }]} />
              )}
              <View style={[
                { width: 30, height: 30, borderRadius: 15, backgroundColor: "#ccc", justifyContent: "center", alignItems: "center" },
                index < currentStep && { backgroundColor: "green" }
              ]}>
                {index < currentStep ? (
                  <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>&#10003;</Text>
                ) : (
                  <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>{index + 1}</Text>
                )}
              </View>
              <Text style={{ textAlign: "center", marginTop: 8 }}>{step.title}</Text>
            </View>
          ))}
        </View>
      </View>

      {currentStep === 0 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>Select a Delivery Address</Text>

          {/* Map through demo addresses and render them */}
          {demoAddresses.map((address, index) => (
            <Pressable
              key={index}
              style={{ flexDirection: 'row', borderWidth: 1, borderColor: selectedAddress === index ? "green" : "#D0D0D0", padding: 10, gap: 5, paddingBottom: 17 }}
              onPress={() => setSelectedAddress(address)}
            >
              {selectedAddress && selectedAddress._id === address._id ? (
                <FontAwesome style={{ marginTop: 50 }} name="dot-circle-o" size={24} color="black" />
              ) : (
                <Entypo style={{ marginTop: 50 }} name="circle" size={24} color={selectedAddress === address ? "green" : "black"} />
              )}

              <View style={{ marginLeft: 10, flex: 1 }}>
                {/* Demo address */}
                <View style={{ flexDirection: "row", alignItems: "center", gap: 3, borderColor: "black" }}>
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>{address.name}</Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>
                <Text style={{ fontSize: 15, color: "#181818" }}>{address.location}</Text>
                <Text style={{ fontSize: 15, color: "#181818" }}>{address.street}</Text>
                <Text style={{ fontSize: 15, color: "#181818" }}>{address.city}</Text>
                <Text style={{ fontSize: 15, color: "#181818" }}>Phone No: {address.phoneNumber}</Text>

                {/* "Hii" text */}
                <View style={{ marginTop: 8 }}>
                 {selectedAddress && selectedAddress._id === address._id && (
                  <Pressable 
                   onPress={()=>setCurrentStep(1)}
                   style={{
                    backgroundColor:"#008397",padding:10,
                    borderRadius:20,
                    justifyContent:"center",
                    marginTop:10,
                  }}>
                    <Text style={{textAlign:"center",color:"white"}}>Deliver to this address</Text>
                  </Pressable>
                 )}
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      )}
      {/* now on step 2 */}
   
      {currentStep === 1 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Choose Your delivery option</Text>

          <View style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            padding: 8,
            gap: 7,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10
          }}>
          {option ? (
            <FontAwesome name="dot-circle-o" size={24} color="black" />
          ):(
            <Entypo onPress={()=>setOption(!option)} name='circle' size={24} color="gray" />
          )}

            

            <Text style={{ flex: 1 }}>
              <Text style={{ color: "green", fontWeight: "500" }}>Tomorrow any time</Text>{" "}
              - Free delivery with premium membership
            </Text>
          </View>

          {/* Continue button */}
          <Pressable onPress={()=>setCurrentStep(2)} style={{ backgroundColor: "#FFC72C", padding: 10, borderRadius: 20, justifyContent: "center", alignItems: "center", marginTop: 15 }}>
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}

      {/* now moving step 3 */}
      {currentStep === 2 && (
        <View style={{marginHorizontal:20}}>
       <Text style={{fontSize:20,fontWeight:"bold"}}>Select your payment method</Text>

       <View style={{backgroundColor:"white",padding:8,borderColor:"#D0D0D0",borderWidth:1,flexDirection:"row",alignItems:"center",gap:7,marginTop:12}}>

        {selectedOption === "cash" ?(
  <FontAwesome name="dot-circle-o" size={24} color="black" />
        ):(
<Entypo onPress={()=>setSelectedOption("cash")} name='circle' size={20} color="gray" />
        )}
       

       <Text style={{fontSize:16,fontWeight:"bold"}}>Cash on Delivery</Text>
       </View>

       {/* for payment integration */}
       {/* im not implementing payment method */}
       <View style={{backgroundColor:"white",padding:8,borderColor:"#D0D0D0",borderWidth:1,flexDirection:"row",alignItems:"center",gap:7,marginTop:12}}>
       <Entypo name='circle' size={20} color="gray" />

       <Text style={{fontSize:16,fontWeight:"bold"}}>Payment by card</Text>
       </View>
       <Pressable onPress={()=>setCurrentStep(3)} style={{ backgroundColor: "#FFC72C", padding: 10, borderRadius: 20, justifyContent: "center", alignItems: "center", marginTop: 15 }}>
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}

    {/* now for order detail page */}
   

    {currentStep === 3 && selectedOption === "cash" && (
          <View>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Now</Text>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8, backgroundColor: "white", padding: 8, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10 }}>
              <View>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>Save 5% and never run out</Text>
                <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>Turn on auto deliveries</Text>
              </View>
              <MaterialIcons name='keyboard-arrow-right' size={24} color={"black"} />
            </View>

            <View style={{ backgroundColor: "white", padding: 8, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10 }}>
              <Text>Shipping to {selectedAddress?.name}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>Items</Text>
                <Text style={{ color: "gray", fontSize: 16 }}>&#8377;1234</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>Delivery</Text>
                <Text style={{ color: "gray", fontSize: 16 }}>0</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Order Total</Text>
                <Text style={{ color: "#C60C30", fontSize: 16 }}>&#8377;1234</Text>
              </View>
            </View>

            <View style={{ backgroundColor: "white", padding: 8, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10 }}>
              <Text style={{ fontSize: 16, color: "gray" }}>Pay with</Text>
              <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 7 }}>Pay on delivery Cash</Text>
            </View>

            <Pressable
              onPress={() => setCurrentStep(4)}
              style={{ backgroundColor: "#FFC72C", padding: 10, borderRadius: 20, justifyContent: "center", alignItems: "center", marginTop: 20 }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>Place your order</Text>
            </Pressable>
          </View>
        )}

        {/* Your order is placed  */}
  {currentStep === 4 && (
    <View>
      <View>
    <Image style={{width:"100%",height:200}} source={require('../assets/order.png')}/>
    </View>
    <Text style={{textAlign:"center",fontSize:20,fontWeight:"bold"}}>Thank You Come again</Text>
    </View>
  )}


    </ScrollView>
  );
};

export default ConfirmationScreen;
