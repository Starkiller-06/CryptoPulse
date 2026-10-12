import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MarketScreen from "./screens/MarketScreen";

// detail screen
function AssetDetailScreen({ route }) {
    const { assetId, name } = route.params;
    return (
        <View style={styles.centerContainer}>
            <Text style={styles.detailTitle}>{name}</Text>
            <Text style={styles.detailSubtitle}>
                Asset Protocol Key: {assetId.toUpperCase()}
            </Text>
            <Text style={styles.detailBody}>
                Deep orderbook telemetry and historical charting active.
            </Text>
        </View>
    );
}

// watchlist screen
function WatchlistScreen() {
    return (
        <View style={styles.centerContainer}>
            <Text style={styles.detailTitle}>Custom Watchlist</Text>
            <Text style={styles.detailSubtitle}>
                Filtered portfolio view with real-time push alerts.
            </Text>
        </View>
    );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MarketStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MarketCockpit" component={MarketScreen} options={{ headerShown: false }}/>
            <Stack.Screen
                name="AssetDetail"
                component={AssetDetailScreen}
                options={({ route }) => ({ title: route.params.name, headerBackTitle: "Markets" })}
            />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "#1E3A8A",
                    tabBarInactiveTintColor: "#94A3B8",
                    tabBarStyle: { height: 60, paddingBottom: 8 },
                }}
            >
                <Tab.Screen name="Markets" component={MarketStack} />
                <Tab.Screen name="Watchlist" component={WatchlistScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8FAFC",
        padding: 20,
    },
    detailTitle: {
        fontSize: 22,
        fontWeight: "800",
        color: "#1E3A8A",
        marginBottom: 6,
    },
    detailSubtitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#475569",
        marginBottom: 12,
    },
    detailBody: { 
      fontSize: 13, 
      color: "#64748B", 
      textAlign: "center" 
    },
});
