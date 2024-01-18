import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ProductItem from '../component/ProductItem';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState([]);
    const [items, setItems] = useState([
        { label: "Men's clothing", value: "men's clothing" },
        { label: "jewelry", value: "jewelery" },
        { label: "electronics", value: "electronics" },
        { label: "Women's clothing", value: "women's clothing" },
    ]);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch("https://fakestoreapi.com/products", {
                method: "GET",
            });
            const data = await response.json();
            setProducts(data);
        };
        fetchProduct();
    }, []);

    // Filter products based on selected category
    const filterProduct = (cat) => {
        const updateList = products.filter((x) => x.category === cat);
        setFilter(updateList);
    };

    return (
        <>
            <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 40 : 0, flex: 1, backgroundColor: "white" }}>
                <ScrollView>
                    <View style={{ backgroundColor: "black", padding: 1, flexDirection: "row", alignItems: "center" }} />
                    <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>Categories</Text>
                        <View style={styles.categoryContainer}>
                            {items.map((item) => (
                                <TouchableOpacity
                                    key={item.value}
                                    style={styles.categoryButton}
                                    onPress={() => filterProduct(item.value)}
                                >
                                    <Text style={styles.categoryText}>{item.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    {/* Render the filtered products */}
                    {filter.length > 0 ? (
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Filtered Products:</Text>
                            <View style={{width:"100%",justifyContent:"center"}}>
                            {filter.map((item,index) => (
                                <View key={index} style={{width:"48%",marginBottom:10}}>
                           <ProductItem item={item}/>
                                </View>
                            ))}
                            </View>
                        </View>
                    ) : null}
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
    categoryButton: {
        padding: 10,
        backgroundColor: "#008E97",
        borderRadius: 5,
    },
    categoryText: {
        color: "white",
    },
    productContainer: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginTop: 10,
    },
});

export default HomePage;
