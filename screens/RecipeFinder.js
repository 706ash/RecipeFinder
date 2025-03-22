import React, {useState} from "react";
import {View, Text, TextInput, Button, FlatList, Image, StyleSheet} from "react-native";
import axios from "axios";
import { API_KEY } from "@env";

const RecipeFinder = () => {
    const [query, setQuery] = useState("");
    const [recipies, setRecipies] = useState([]);
    
    const fetchRecipies = async () => {
        if (!query) return;
        try {
            const response = await axios.get(
                `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}`
            );
            setRecipies(response.data.results);
        } catch (error) {
            console.error("Error fetching recipies: ", error)
        }
    };

    return (
        <View style={styles.container}>
            <Text style = {styles.title}>Recipe Finder</Text>
            <TextInput
                style = {styles.input}
                placeholder="Search for recipies..."
                value={query}
                onChangeText={setQuery}
            />
            <Button title="Search" onPress={fetchRecipies} />
            <FlatList
                data = {recipies}
                keyExtractor={(item) => item.id.toString()}
                renderItem = {({item}) => (
                    <View style={styles.recipeCard}>
                        <Image source = {{ uri: item.image }} style = {styles.image} />
                        <Text style={styles.recipeTitle}> {item.title}</Text>
                    </View>

                )}
            />
        </View>
    );

};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
    recipeCard: { marginVertical: 10, alignItems: "center" },
    image: { width: 200, height: 200, borderRadius: 10 },
    recipeTitle: { fontSize: 18, fontWeight: "bold", textAlign: "center" },
  });

export default RecipeFinder;