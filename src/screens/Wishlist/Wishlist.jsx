import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'; // Use Redux hooks
import { removeFromWishlist } from '../../redux/WishListSlice'; // Import the remove action

const Wishlist = () => {
  // Access wishlist items from Redux store
  const wishlistItems = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch(); // Use dispatch to dispatch actions

  // Function to handle removing an item
  const handleRemoveItem = (item) => {
    dispatch(removeFromWishlist(item)); // Dispatch action to remove item
  };

  // Render each wishlist item
  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
      <Text style={{ flex: 1 }}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleRemoveItem(item)}>
        <Text style={{ color: 'red' }}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Your Wishlist</Text>
      {wishlistItems.length === 0 ? (
        <Text>Your wishlist is empty</Text>
      ) : (
        <FlatList
          data={wishlistItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default Wishlist;
