import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import AppWrapper from '../../components/AppWrapper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {myColors} from '../../utils/Themes/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  decrementQuantity,
  incrementQuantity,
  removeProduct,
} from '../../redux/CartSlice';
const Cart = () => {
  const cartStore = useSelector(state => state.cart);

  return (
    <AppWrapper>
      <AppHeader data={cartStore} />
      <AppBody data={cartStore} />
      <AppFooter data={cartStore} />
    </AppWrapper>
  );
};

const AppHeader = ({data}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={25} color={myColors.white} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Cart ({data.length})</Text>
    </View>
  );
};

const AppBody = ({data}) => {
  const dispatch = useDispatch();
  const handleIncrement = data => {
    dispatch(incrementQuantity(data));
  };

  const removeItem = data => {
    dispatch(removeProduct(data));
  };

  const handleDecrement = data => {
    dispatch(decrementQuantity(data));
  };

  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.card}>
        <View style={styles.firstChild}>
          <Image style={styles.img} source={{uri: item?.image}} />

          <View style={styles.nameContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}> ₹ {item?.discounted_price}</Text>
          </View>

          <AntDesign
            onPress={() => removeItem(item)}
            name="close"
            size={24}
            color={myColors.black}
          />
        </View>

        <View style={styles.secondChild}>
          <View style={styles.gramsContainer}>
            <Text style={styles.grams}>{item.grams} gms </Text>
            <AntDesign name="down" size={15} color={myColors.violet} />
          </View>
          <View style={styles.quantityContainer}>
            <AntDesign
              name="plussquare"
              onPress={() => handleIncrement(item)}
              size={25}
              color={myColors.white}
            />
            <Text style={styles.quntity}>{item.quantity}</Text>
            <AntDesign
              name="minussquare"
              onPress={() => handleDecrement(item)}
              size={25}
              color={myColors.white}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.bodyContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const AppFooter = ({data}) => {
  const total = data.reduce((total, item) => {
    const price = item.discounted_price;
    return total + price * item.quantity;
  }, 0);
  console.log(total);
  return (
    <TouchableOpacity style={styles.btn}>
      <Text style={styles.btnText}>Continue to Payment ₹ {total}</Text>
    </TouchableOpacity>
  );
};

export default Cart;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#35035C',
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 18,
    color: myColors.white,
    marginLeft: 10,
  },
  bodyContainer: {
    flex: 1,
    padding: 20,
  },
  img: {
    width: 100,
    height: 100,
  },
  firstChild: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  nameContainer: {
    flex: 1,
    marginLeft: 10,
    gap: 5,
  },
  name: {
    fontSize: 16,
    color: myColors.black,
    fontWeight: '600',
  },
  price: {
    fontSize: 16,
    color: myColors.black,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: myColors.violet,
  },
  quntity: {
    fontSize: 16,
    color: myColors.white,
    paddingHorizontal: 5,
  },
  secondChild: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#E3E3E3',
    marginTop: 10,
    paddingBottom: 10,
  },
  separator: {
    height: 20,
  },
  gramsContainer: {
    flexDirection: 'row',
    gap: 1,
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    paddingVertical: 5,
    borderRadius: 5,
    paddingHorizontal: 15,
  },

  grams: {
    fontSize: 13,
    color: myColors.violet,
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: myColors.violet,
    padding: 15,
  },
  btnText: {
    fontSize: 16,
    color: myColors.white,
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});