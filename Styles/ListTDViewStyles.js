import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    separator: {
      width: 'auto',
      paddingLeft:'10%',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    tableContainer: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      overflow: 'hidden',
    },
    table: {
      width: '100%',
    },
    thead: {
      backgroundColor: '#f2f2f2',
    },
    tbody: {
      backgroundColor: '#fff',
      width: '100%',
      height: 'auto',
    },
    tr: {
      flexDirection: 'row',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    th: {
      flex: 1,
      fontWeight: 'bold',
    },
    td: {
      flex: 1,
      alignItems: 'center',
    },
  });