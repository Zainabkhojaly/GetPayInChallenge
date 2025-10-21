import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { Product } from '../../types';
import { COLORS } from '../../styles/theme';

interface ProductListItemProps {
  product: Product;
  showDeleteButton: boolean;
  onDelete: (id: number) => void;
}

const ProductListItem = ({ product, showDeleteButton, onDelete }: ProductListItemProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.thumbnail} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
      </View>
      {showDeleteButton && (
        <Button title="Delete" color={COLORS.danger} onPress={() => onDelete(product.id)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductListItem;
