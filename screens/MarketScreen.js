import React, {useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Flatlist, Switch, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { INITIAL_ASSETS, CATEGORIES } from '../mockData';

export default function MarketScreen({ navigation }) {
    const [ assets, setAssets ] = useState(INITIAL_ASSETS);
    const [ searchQuery, setSearchQuery ] = useState('');
    const [ selectedCategory, setSelectedCategory ] = useState('ALL');
    const [ isLiveStreaming, setIsLiveStreaming ] = useState('true');
    const [ sortOrder, setSortOrder ] = useState('DESC');

    // togle live telemetry screeen
    const toggleLiveStream = () => {
        setIsLiveStreaming(prev => !prev);
    };

    //togle price sort order betweeen desc, asc 
    const toggleSortOrder = () => {
        setSortOrder(prev => (prev == 'DESC' ? 'ACS' : 'DESC'));
    };

    // Simulated real-rime telemetry polling engine
    useEffect(() => {
        if (!isLiveStreaming) return;

        const intervalId = setInterval(() => {
            setAssets(prevAssets =>
                prevAssets.map(item => {
                    if (Math.random() > 0.40) {
                        const deltaPercent = (Math.random() * 1.6 - 0.8) / 100;
                        const newPrice = +(item.price * (1 + deltaPercent)).toFixed(2);
                        const newChange = +(item.change24h + deltaPercent * 10).toFixed(2);
                        return { ...item, price: newPrice, change24h: newChange };
                    }
                    return item;
                })
            );
        }, 2500);

        // cleanup: tear down interval on toggle
        return () => {
            clearInterval(intervalId);
        };
    }, [isLiveStreaming]); 

    /*STEP 4*/

    // opt 1
    const filteredAndSortedAssets = useMemo(() => {
        return assets
            .filter(asset => {
                const matchesCategory = 
                selectedCategory === 'ALL' || asset.category === selectedCategory;
                const normalizedQuery = searchQuery.trim().toLowerCase();
                const matchesQuery =
                    normalizedQuery === '' ||
                    asset.name.toLowerCase().includes(normalizaliedQuery) ||
                    asset.symbol.toLowerCase().includes(normalizedQuery);
                return matchesCategory && matchesQuery;
            })
            .sort((a, b) => {
                return sortOrder === 'DESC' ? b.price - a.price : a.price - b.price;
            });
    }, [assets, searchQuery, selectedCategory, sortOrder]);
    
    // optimization 2
    const portfolioMetrics = useMemo(() => {
        const totalValuation = assets.reduce((acc, a) => acc + a.price * 10, 0);
        const avgChange =  assets.reduce((acc, a) => acc + a.change24h, 0) / (assets.length || 1);
        const watchedCount = asset.filter(a => a.isWatched).length;

        const variance = assets.reduce(
            (acc, a) => acc + Math.pow(a.change24h - avgChange, 2), 0
        ) / (assets.length || 1);
        const volatilityIndex = +Math.sqrt(variance).toFixed(2);

        return {
            totalValuation: totalValuation.toLocaleString('en-US',  {style: 'currency', currency: 'USD'} ),
            avgChange: avgChange.toFixed(2),
            watchedCount,
            volatilityIndex,
        };
    }, [assets]);


    /* STEP 5 */
    // Memoized callback
    const handleToggleWatchlist = useCallback((assetId) => {
        setAssets (prevAssets => 
            prevAssets.map(asset => 
                asset.id === assetId ? { ...asset, isWatched: !asset.isWatched } : asset
            )
        );
    }, []);

    // Memoized callback
    const handleSelecteAsset = useCallback((asset) => {
        navigation.navigate('AssetDetail', { assetId: asset.id, name: asset.name });
    }, [navigation]);
}



