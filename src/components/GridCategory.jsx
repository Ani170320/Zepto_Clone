import {View, Text, FlatList, Image} from 'react-native';
import React from 'react';

const GridCategory = ({data}) => {
  const renderGridCategory = ({item, index}) => {
    return (
      <View
        style={{
          height: 100,
          width: 90,
          backgroundColor: '#FCECFA',
          margin: '1%',
          borderRadius: 10,
        }}>
        <Image
          source={require('../../assets/images/cat.png')}
          style={{width: 80, height: 80, alignItems: 'center'}}
        />
        <Text
          style={{
            top: 20,
            color: '#5c1083',
            fontSize: 13,
            fontWeight: '600',
            textAlign: 'center',
          }}>
          {item}
        </Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1, marginTop: 10}}>
      <FlatList
        ItemSeparatorComponent={() => <View style={{height: 40}}></View>}
        scrollEnabled={false}
        numColumns={4}
        data={data}
        renderItem={renderGridCategory}
        ListFooterComponent={() => <View style={{marginBottom: 40}}></View>}
      />
    </View>
  );
};

export default GridCategory;