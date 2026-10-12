import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Switch,
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from "react-native";
import { INITIAL_ASSETS, CATEGORIES } from "../mockData";
import AssetCard from "../components/AssetCard";
import RenderCountBadge from "../components/RenderCountBadge";

export default function MarketScreen({ navigation }) {
    const [assets, setAssets] = useState(INITIAL_ASSETS);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [isLiveStreaming, setIsLiveStreaming] = useState(true);
    const [sortOrder, setSortOrder] = useState("DESC");

    // Background Telemetry
    useEffect(() => {
        if (!isLiveStreaming) return;

        const intervalId = setInterval(() => {
            setAssets((prevAssets) =>
                prevAssets.map((item) => {
                    if (Math.random() > 0.4) {
                        const deltaPercent = (Math.random() * 1.6 - 0.8) / 100;
                        const newPrice = +(
                            item.price *
                            (1 + deltaPercent)
                        ).toFixed(2);
                        const newChange = +(
                            item.change24h +
                            deltaPercent * 10
                        ).toFixed(2);
                        return {
                            ...item,
                            price: newPrice,
                            change24h: newChange,
                        };
                    }
                    return item;
                }),
            );
        }, 2500);

        return () => clearInterval(intervalId);
    }, [isLiveStreaming]);

    // Memoized filtering
    const filteredAndSortedAssets = useMemo(() => {
        return assets
            .filter((asset) => {
                const matchesCategory =
                    selectedCategory === "ALL" ||
                    asset.category === selectedCategory;
                const normalizedQuery = searchQuery.trim().toLowerCase();
                const matchesQuery =
                    normalizedQuery === "" ||
                    asset.name.toLowerCase().includes(normalizedQuery) ||
                    asset.symbol.toLowerCase().includes(normalizedQuery);
                return matchesCategory && matchesQuery;
            })
            .sort((a, b) =>
                sortOrder === "DESC" ? b.price - a.price : a.price - b.price,
            );
    }, [assets, searchQuery, selectedCategory, sortOrder]);

    // Memoized financial engine
    const portfolioMetrics = useMemo(() => {
        const totalValuation = assets.reduce((acc, a) => acc + a.price * 10, 0);
        const avgChange =
            assets.reduce((acc, a) => acc + a.change24h, 0) /
            (assets.length || 1);
        const watchedCount = assets.filter((a) => a.isWatched).length;
        const variance =
            assets.reduce(
                (acc, a) => acc + Math.pow(a.change24h - avgChange, 2),
                0,
            ) / (assets.length || 1);
        const volatilityIndex = +Math.sqrt(variance).toFixed(2);

        return {
            totalValuation: totalValuation.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            }),
            avgChange: avgChange.toFixed(2),
            watchedCount,
            volatilityIndex,
        };
    }, [assets]);

    // Memoized event handlers
    const handleToggleWatchlist = useCallback((assetId) => {
        setAssets((prevAssets) =>
            prevAssets.map((asset) =>
                asset.id === assetId ? { ...asset, isWatched: !asset.isWatched } : asset
            )
        );
    }, []);

    const handleSelectAsset = useCallback((asset) => {
        navigation.navigate("AssetDetail", { assetId: asset.id, name: asset.name });
    }, [navigation]);

    // Memoized flatlist rendered
    const renderAssetItem = useCallback(
        ({ item }) => (
            <AssetCard
                asset={item}
                onToggleWatchlist={handleToggleWatchlist}
                onSelectAsset={handleSelectAsset}
            />
        ), [handleToggleWatchlist, handleSelectAsset]);

    return (
        <SafeAreaView style={styles.safeContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

            {/* Cockpit */}
            <View style={styles.headerContainer}>
                <View style={styles.titleRow}>
                    <Text style={styles.headerTitle}>CryptoPulse</Text>
                    <RenderCountBadge label="Screen" />
                </View>

                {/* Telemetry switch */}
                <View style={styles.controlsRow}>
                    <View style={styles.switchGroup}>
                        <Text style={styles.controlLabel}>Live Feed:</Text>
                        <Switch
                            value={isLiveStreaming}
                            onValueChange={setIsLiveStreaming}
                            trackColor={{ false: "#CBD5E1", true: "#93C5FD" }}
                            thumbColor={isLiveStreaming ? "#1E3A8A" : "#94A3B8"}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.sortButton}
                        onPress={() =>
                            setSortOrder((prev) =>
                                prev === "DESC" ? "ASC" : "DESC",
                            )
                        }
                    >
                        <Text style={styles.sortButtonText}>
                            Price: {sortOrder}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Analytics card */}
                <View style={styles.analyticsCard}>
                    <View style={styles.metricItem}>
                        <Text style={styles.metricLabel}>Total Valuation</Text>
                        <Text style={styles.metricValue}>
                            {portfolioMetrics.totalValuation}
                        </Text>
                    </View>
                    <View style={styles.metricDivider} />
                    <View style={styles.metricItem}>
                        <Text style={styles.metricLabel}>24h Yield / Vol</Text>
                        <Text
                            style={[
                                styles.metricValue,
                                portfolioMetrics.avgChange >= 0
                                    ? styles.textGreen
                                    : styles.textRed,
                            ]}
                        >
                            {portfolioMetrics.avgChange}% /{" "}
                            {portfolioMetrics.volatilityIndex}
                        </Text>
                    </View>
                    <View style={styles.metricDivider} />
                    <View style={styles.metricItem}>
                        <Text style={styles.metricLabel}>Watched</Text>
                        <Text style={styles.metricValue}>
                            {portfolioMetrics.watchedCount} pairs
                        </Text>
                    </View>
                </View>

                {/* Search bar */}
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by asset symbol or project name..."
                    placeholderTextColor="#94A3B8"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    clearButtonMode="while-editing"
                />

                {/* Category pills */}
                <View style={styles.categoryRow}>
                    {CATEGORIES.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[
                                styles.categoryButton,
                                selectedCategory === cat &&
                                    styles.categoryButtonActive,
                            ]}
                            onPress={() => setSelectedCategory(cat)}
                        >
                            <Text
                                style={[
                                    styles.categoryButtonText,
                                    selectedCategory === cat &&
                                        styles.categoryTextActive,
                                ]}
                            >
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Optimized Virtualized Collection */}
            <FlatList
                data={filteredAndSortedAssets}
                keyExtractor={(item) => item.id}
                renderItem={renderAssetItem}
                contentContainerStyle={styles.listContent}
                initialNumToRender={8}
                maxToRenderPerBatch={8}
                windowSize={5}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            No assets match your search criteria.
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: { 
        flex: 1, 
        backgroundColor: "#F8FAFC" 
    },
    headerContainer: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 6,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    titleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
        position: "relative",
    },
    headerTitle: { 
        fontSize: 24, 
        fontWeight: "800", 
        color: "#1E3A8A" 
    },
    controlsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    switchGroup: { 
        flexDirection: "row", 
        alignItems: "center" 
    },
    controlLabel: {
        fontSize: 13,
        fontWeight: "600",
        color: "#475569",
        marginRight: 6,
    },
    sortButton: {
        backgroundColor: "#EFF6FF",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#BFDBFE",
    },
    sortButtonText: { 
        fontSize: 12, 
        fontWeight: "700", 
        color: "#1E3A8A" 
    },
    analyticsCard: {
        flexDirection: "row",
        backgroundColor: "#0F172A",
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
        justifyContent: "space-between",
    },
    metricItem: { flex: 1, alignItems: "center" },
    metricDivider: { width: 1, backgroundColor: "#334155" },
    metricLabel: {
        fontSize: 10,
        fontWeight: "600",
        color: "#94A3B8",
        marginBottom: 2,
    },
    metricValue: { fontSize: 13, fontWeight: "700", color: "#FFFFFF" },
    textGreen: { color: "#34D399" },
    textRed: { color: "#F87171" },
    searchInput: {
        backgroundColor: "#F1F5F9",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 13,
        color: "#0F172A",
        borderWidth: 1,
        borderColor: "#CBD5E1",
        marginBottom: 10,
    },
    categoryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    categoryButton: {
        flex: 1,
        paddingVertical: 6,
        alignItems: "center",
        borderRadius: 6,
        backgroundColor: "#F1F5F9",
        marginHorizontal: 2,
    },
    categoryButtonActive: { backgroundColor: "#1E3A8A" },
    categoryButtonText: { fontSize: 11, fontWeight: "700", color: "#64748B" },
    categoryTextActive: { color: "#FFFFFF" },
    listContent: { paddingVertical: 8 },
    emptyContainer: { alignItems: "center", marginTop: 40 },
    emptyText: { fontSize: 14, color: "#94A3B8" },
});
