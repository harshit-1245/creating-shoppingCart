import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { decrementQuantity, incrementQuantity, removeFromCart } from "../redux/CartReducer"
import { useNavigation } from "@react-navigation/native"

const CartScreen = () => {
    const navigator = useNavigation()
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart.cart);

    const total = cart
        ?.map((item) => item.price * item.quantity)
        .reduce((curr, prev) => curr + prev, 0);

    const increaseQuantity = (item) => {
        dispatch(incrementQuantity(item))
    }

    const decreaseQuantity = (item) => {
        dispatch(decrementQuantity(item))
    }

    const deleteQuantity = (item) => {
        dispatch(removeFromCart(item))
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.subtotalContainer}>
                <Text style={styles.subtotalLabel}>Subtotal:</Text>
                <Text style={styles.subtotalValue}>{total}</Text>
            </View>
            <Text style={styles.emiDetails}>EMI details Available</Text>

            <Pressable
                onPress={() => navigator.navigate("Confirm")}
                style={styles.proceedButton}
            >
                <Text style={styles.proceedButtonText}>Proceed to buy ({cart.length}) items</Text>
            </Pressable>

            {/* Divide line */}
            <View style={styles.divider} />

            {/* Cart items */}
            <View style={styles.cartItemsContainer}>
                {cart?.map((item, index) => (
                    <View style={styles.cartItem} key={index}>
                        {/* Cart Item Details */}
                        <Pressable style={styles.itemDetailsContainer}>
                            <Image style={styles.itemImage} source={{ uri: item?.image }} />
                            <View style={styles.itemInfoContainer}>
                                <Text numberOfLines={1} style={styles.itemTitle}>
                                    {item?.title}
                                </Text>
                                <Text numberOfLines={2} style={styles.itemDescription}>
                                    {item?.description}
                                </Text>
                                <View style={styles.itemPriceContainer}>
                                    <Text style={styles.itemPrice}>{item?.price}</Text>
                                    <Image style={styles.currencyIcon} source={{ uri: 'https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png' }} />
                                    <Text style={styles.inStockText}>In Stock</Text>
                                </View>
                                <Text style={styles.ratingText}>{item?.rating?.rate}</Text>
                                {/* Quantity Adjustment */}
                                <View style={styles.quantityAdjustmentContainer}>
                                    <Pressable
                                        onPress={() => decreaseQuantity(item)}
                                        style={styles.quantityButton}>
                                        <AntDesign name="minus" size={20} color="white" />
                                    </Pressable>
                                    <Text style={styles.quantityText}>{item?.quantity}</Text>
                                    <Pressable
                                        onPress={() => increaseQuantity(item)}
                                        style={styles.quantityButton}>
                                        <AntDesign name="plus" size={20} color="white" />
                                    </Pressable>
                                    {/* Delete button */}
                                    <Pressable
                                        onPress={() => deleteQuantity(item)}
                                        style={styles.deleteButton}>
                                        <Text style={styles.deleteButtonText}>Delete</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Pressable>
                        {/* Later On Section */}
                        <View style={styles.laterOnSection}>
                            <Pressable
                                style={styles.actionButton}
                            >
                                <Text style={styles.actionButtonText}>Save For Later</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => navigator.navigate("Home")}
                                style={styles.actionButton}
                            >
                                <Text style={styles.actionButtonText}>See more like this</Text>
                            </Pressable>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 55,
        flex: 1,
        backgroundColor: 'white',
    },
    subtotalContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    subtotalLabel: {
        fontSize: 18,
        fontWeight: '400',
    },
    subtotalValue: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    emiDetails: {
        marginHorizontal: 10,
    },
    proceedButton: {
        backgroundColor: '#FFC72C',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 10,
    },
    proceedButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    divider: {
        height: 1,
        borderColor: '#D0D0D0',
        borderWidth: 1,
        marginTop: 16,
    },
    cartItemsContainer: {
        marginHorizontal: 10,
    },
    cartItem: {
        backgroundColor: 'white',
        marginVertical: 10,
        padding: 10,
        gap: 10,
    },
    itemDetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginRight: 10,
    },
    itemInfoContainer: {
        flex: 1,
    },
    itemTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    itemDescription: {
        fontSize: 14,
        marginBottom: 8,
        color: 'grey',
    },
    itemPriceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    currencyIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginRight: 5,
    },
    inStockText: {
        color: 'green',
    },
    ratingText: {
        fontWeight: '500',
        fontSize: 16,
        marginBottom: 8,
    },
    quantityAdjustmentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: '#4CAF50',
        padding: 8,
        borderRadius: 5,
        marginRight: 10,
    },
    quantityText: {
        fontSize: 16,
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: 'black',
        padding: 8,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: "white",
    },
    laterOnSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 15,
    },
    actionButton: {
        backgroundColor: 'white',
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderRadius: 5,
        borderColor: "#C0C0C0",
        borderWidth: 0.6,
    },
    actionButtonText: {
        color: 'black',
    },
});

export default CartScreen;
