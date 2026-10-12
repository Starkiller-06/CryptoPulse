import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import RenderCountBadge from "./RenderCountBadge";

function AssetCard({ asset, onToggleWatchlist, onSelectAsset }) {
    const isPositive = asset.change24h >= 0;

    return (
        <TouchableOpacity
            style={styles.cardContainer}
            activeOpacity={0.7}
            onPress={() => onSelectAsset(asset)}
        >
            <View style={[styles.leftColumn]}>
                <View style={[styles.titleRow]}>
                    <Text style={styles.symbolText}>{asset.symbol}</Text>
                    <View style={styles.categoryPill}>
                        <Text style={styles.categoryText}>
                            {asset.category}
                        </Text>
                    </View>
                </View>
                <Text style={styles.nameText}>{asset.name}</Text>
            </View>

            <View style={styles.rightColumn}>
                <Text style={styles.priceText}>
                    $
                    {asset.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                    })}
                </Text>
                <View
                    style={[
                        styles.changeBadge,
                        isPositive ? styles.badgeGreen : styles.badgeRed,
                    ]}
                >
                    <Text
                        style={[
                            styles.changeText,
                            isPositive ? styles.textGreen : styles.textRed,
                        ]}
                    >
                        {isPositive ? "▲ +" : "▼ "}
                        {asset.change24h.toFixed(2)}%
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.starButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPress={() => onToggleWatchlist(asset.id)}
            >
                <Text
                    style={[
                        styles.starIcon,
                        asset.isWatched && styles.starActive,
                    ]}
                >
                    {asset.isWatched ? "★" : "☆"}
                </Text>
            </TouchableOpacity>

            {/* Visual Render Telemetry Instrument */}
            <RenderCountBadge label="Card" />
        </TouchableOpacity>
    );
}

export default React.memo(AssetCard);

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 14,
        marginVertical: 6,
        marginHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        position: "relative",
    },
    leftColumn: { 
        flex: 1 
    },
    titleRow: { 
        flexDirection: "row", 
        alignItems: "center", 
        marginBottom: 2 
    },
    symbolText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0F172A",
        marginRight: 8,
    },
    categoryPill: {
        backgroundColor: "#F1F5F9",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    categoryText: { 
        fontSize: 10, 
        fontWeight: "600", 
        color: "#475569" 
    },
    nameText: { 
        fontSize: 13, 
        color: "#64748B" 
    },
    rightColumn: { 
        alignItems: "flex-end", 
        marginRight: 12 
    },
    priceText: { 
        fontSize: 15, 
        fontWeight: "700", 
        color: "#0F172A" 
    },
    changeBadge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginTop: 3,
    },
    badgeGreen: { 
        backgroundColor: "#ECFDF5" 
    },
    badgeRed: { 
        backgroundColor: "#FEF2F2" 
    },
    changeText: { 
        fontSize: 11, 
        fontWeight: "700" 
    },
    textGreen: { 
        color: "#059669" 
    },
    textRed: { 
        color: "#DC2626" 
    },
    starButton: { 
        padding: 4 
    },
    starIcon: { 
        fontSize: 22, 
        color: "#94A3B8" 
    },
    starActive: { 
        color: "#F59E0B" 
    },
});
