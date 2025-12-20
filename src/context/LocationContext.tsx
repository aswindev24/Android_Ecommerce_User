import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as addressService from '../services/address.service';
import { SavedAddress } from '../types';
import { useAuth } from './AuthContext';

interface LocationContextType {
    addresses: SavedAddress[];
    selectedAddress: SavedAddress | null;
    loading: boolean;
    refreshAddresses: () => Promise<void>;
    selectAddress: (address: SavedAddress, persistent?: boolean) => Promise<void>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [addresses, setAddresses] = useState<SavedAddress[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<SavedAddress | null>(null);
    const [loading, setLoading] = useState(false);

    const refreshAddresses = useCallback(async () => {
        if (!isAuthenticated) {
            setAddresses([]);
            setSelectedAddress(null);
            return;
        }
        try {
            setLoading(true);
            const data = await addressService.getAddresses();
            const mappedData = data.map((addr: any) => ({
                ...addr,
                id: addr._id || addr.id
            }));
            setAddresses(mappedData);

            // Logic for selectedAddress:
            // 1. If currently selected address exists in new data, keep it updated
            // 2. Otherwise, if there's a default address, select it
            // 3. Otherwise, select the first one
            // 4. Otherwise, null

            setSelectedAddress(prev => {
                const defaultAddr = mappedData.find(a => a.isDefault);

                // If there's a default address and it's different from our previous selection's ID
                // OR if we didn't have a selection, prioritize the default.
                if (defaultAddr && (!prev || prev.id !== defaultAddr.id)) {
                    // Only switch automatically if the previous one wasn't explicitly chosen 
                    // or if the default itself just changed.
                    // To follow user request: "now i changed b= default but in the home page its still a, it needs to change to b"
                    return defaultAddr;
                }

                if (prev) {
                    const current = mappedData.find(a => a.id === prev.id);
                    if (current) return current;
                }

                return defaultAddr || mappedData[0] || null;
            });
        } catch (error) {
            console.error('Failed to fetch addresses in LocationProvider:', error);
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated]);

    const selectAddress = async (address: SavedAddress, persistent: boolean = false) => {
        setSelectedAddress(address);
        if (persistent) {
            try {
                await addressService.updateAddress(address.id, { isDefault: true });
                await refreshAddresses();
            } catch (error) {
                console.error('Failed to update default address on selection:', error);
            }
        }
    };

    useEffect(() => {
        refreshAddresses();
    }, [refreshAddresses]);

    return (
        <LocationContext.Provider value={{ addresses, selectedAddress, loading, refreshAddresses, selectAddress }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error('useLocation must be used within a LocationProvider');
    }
    return context;
};
