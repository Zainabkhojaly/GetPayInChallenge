import React from 'react';
import { View, FlatList, Text, ActivityIndicator, Button, StyleSheet } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllProducts, deleteProduct } from '../../api/productsApi';
import { Product } from '../../types';
import { AppDispatch, RootState } from '../../state/store';
import { setSignOut } from '../../state/authSlice';
import Keychain from 'react-native-keychain';

import ProductListItem from '../../components/products/ProductListItem';
import OfflineIndicator from '../../components/common/OfflineIndicator';
import { COLORS } from '../../styles/theme';

const AllProductsScreen = ({ navigation }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  const { isSuperAdmin } = useSelector((state: RootState) => state.auth);

  const { data: products, isLoading, isError, error, refetch, isRefetching } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (isDeleted, deletedId) => {
        if(isDeleted) {
             queryClient.setQueryData(['products'], (oldData: Product[] | undefined) => 
                oldData ? oldData.filter(p => p.id !== deletedId) : []
            );
        }
    },
  });

  const handleSignOut = async () => {
    await Keychain.resetGenericPassword();
    dispatch(setSignOut());
  };
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
        headerRight: () => <Button onPress={handleSignOut} title="Sign Out" color={COLORS.danger} />,
    });
  }, [navigation]);

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
        <OfflineIndicator />
        <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <ProductListItem 
                    product={item} 
                    showDeleteButton={isSuperAdmin}
                    onDelete={() => deleteMutation.mutate(item.id)}
                />
            )}
            onRefresh={refetch}
            refreshing={isRefetching}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default AllProductsScreen;
