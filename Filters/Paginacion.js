import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { styles } from '../Styles/SaveTDViewStyles'

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  return (
    <View>
      <Text>Página {currentPage + 1} de {totalPages}</Text>
      <View>
        <TouchableOpacity onPress={onPrevPage} style={styles.button} disabled={currentPage === 0}>
          <Text>Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onNextPage} style={styles.button} disabled={currentPage === totalPages - 1}>
          <Text>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Pagination;
