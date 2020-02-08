import React from 'react';
import { Text, View, Button, StyleSheet, Image, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import Colors from '../../constants/colors';


const ProductComponent = props => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS == 'android' && Platform.Version >= 21)
    TouchableComponent = TouchableNativeFeedback;

  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={props.onDetails} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image source={{ uri: props.imageUrl }} style={styles.image} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.price}>{props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button color={Colors.primaryColor} title="View Details" onPress={props.onDetails} />
              <Button color={Colors.primaryColor} title="Add to Cart" onPress={props.onAddToCart} />
            </View>
          </View>
        </TouchableComponent>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    margin: 20,
    height: 300,
    backgroundColor: 'white',
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '68%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontFamily: 'Roboto',
    color: '#888',
  },
  details: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '16%',
  },
  buttonContainer: {
    flexDirection: 'row',
    height: '16%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  }
})

export default ProductComponent;