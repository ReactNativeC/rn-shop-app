import React from 'react';
import { Text, View, Button, StyleSheet, Image } from 'react-native';

const ProductComponent = props => {
  return (
    <View>
      <Image />
      <Text>{props.title}</Text>      
      <Text>{props.description}</Text>
      <Text>{props.price}</Text>
      <Button title="View Details" />
      <Button title="Add to Cart" />
    </View>
    
  )
}

const styles = StyleSheet.create({

})

export default ProductComponent;