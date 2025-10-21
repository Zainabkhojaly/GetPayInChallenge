import React from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';

import { fetchProductsByCategory } from '../../api/productsApi';
import { Product } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

import ProductListItem from '../../components/products/ProductListItem';
import OfflineIndicator from '../../components/common/OfflineIndicator';

const SpecificCategoryScreen = ({ route }) => {
  const { categoryName } = route.params;
  const { isSuperAdmin } = useSelector((state: RootState) => state.auth);

  const { data: products, isLoading, isError, error, refetch, isRefetching } = useQuery<Product[], Error>({
    queryKey: ['products', categoryName],
    queryFn: () => fetchProductsByCategory(categoryName),
  });

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
            showDeleteButton={false} // Delete is only on AllProducts screen as per reqs
            onDelete={() => {}}
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

export default SpecificCategoryScreen;
