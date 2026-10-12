import React, { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function RenderCountBadge({ label = "Render" }) {
    const renderCount = useRef(0);
    renderCount.current += 1;

    const count = renderCount.current;
    const badgeStyle = count <= 2 ? styles.badgeGreen : count <= 5 ? styles.badgeAmber : styles.badgeRed;

    return (
        <View style={[styles.badgeContainer, badgeStyle]}>
            <Text style={styles.badgeText}>{label}: {count}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badgeContainer: {
        position: "absolute",
        top: 6,
        right: 8,
        paddingHorizontal: 5,
        paddingVertical: 1,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: "rgba(0,0,0,0.1)",
    },
    badgeGreen: { 
        backgroundColor: "#D1FAE5" 
    },
    badgeAmber: { 
        backgroundColor: "#FEF3C7" 
    },
    badgeRed: { 
        backgroundColor: "#FEE2E2" 
    },
    badgeText: { 
        fontSize: 8.5, 
        fontWeight: "700", 
        color: "#1E293B" 
    },
});
