import React, {useEffect} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {fetchUsers} from '../features/user/userSlice';
import {cakeActions} from '../features/cake/cakeSlice';
import {iceCreamActions} from '../features/iceCream/iceCreamSlice';

const Screen = () => {
  console.log('Rendering Screen');
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const numOfCakes = useSelector(state => state.cake.numOfCakes);
  const numOfIceCreams = useSelector(state => state.iceCream.numOfIceCreams);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text>No. of cakes = {numOfCakes}</Text>
        <Button
          title="Order Cake"
          onPress={() => dispatch(cakeActions.ordered())}
        />
        <Button
          title="Restock 10 Cakes"
          onPress={() => dispatch(cakeActions.restocked(10))}
        />
      </View>
      <View style={{height: 10}} />
      <View style={styles.container}>
        <Text>No. of ice creams = {numOfIceCreams}</Text>
        <Button
          title="Order Ice Cream"
          onPress={() => dispatch(iceCreamActions.ordered())}
        />
        <Button
          title="Restock 10 Ice Creams"
          onPress={() => dispatch(iceCreamActions.restocked(10))}
        />
      </View>
      <View style={{height: 10}} />
      <View style={styles.container}>
        <Button
          title="Buy Cake, Get Ice Cream"
          onPress={() => dispatch(cakeActions.orderedDeal())}
        />
      </View>
      <View style={{height: 10}} />
      <View style={[styles.container, {height: 100, width: 300}]}>
        {user.loading && <Text style={{marginTop: 5}}>Loading...</Text>}
        {!user.loading && user.error ? (
          <Text style={{marginTop: 5}}>{user.error}</Text>
        ) : null}
        {!user.loading && user.users.length ? (
          <FlatList
            data={user.users}
            renderItem={({item}) => (
              <View
                style={{
                  marginVertical: 5,
                  marginHorizontal: 10,
                  alignItems: 'center',
                }}>
                <Text>{item.id}</Text>
                <Text>{item.name}</Text>
                <Text>{item.username}</Text>
              </View>
            )}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  container: {
    alignItems: 'center',

    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
  },
});

export default Screen;
