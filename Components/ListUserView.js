import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Dimensions, TextInput, FlatList } from 'react-native';
import { deleteUser } from "../Services/ServiceUsers";
import { getUsers } from "../Services/GetUsers";
import Icon from 'react-native-vector-icons/FontAwesome';
import { exportToExcelUser } from '../Services/ServiceExportExel';
import { styles } from '../Styles/ListTDViewStyles';

const ListGeneralView = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const windowWidth = Dimensions.get('window').width;

    React.useEffect(() => {
        const fetchUsers = async () => {
            const usersList = await getUsers();
            setUsers(usersList);
        };

        fetchUsers();
    }, []);

    React.useEffect(() => {
        const fetchUsers = async () => {
            const usersList = await getUsers();
            setUsers(usersList);
        };

        const unsubscribe = navigation.addListener('focus', fetchUsers);
        return unsubscribe;
    }, [navigation]);

    const confirmDelete = async (user) => {
        return new Promise((resolve) => {
            Alert.alert(
                `¿Eliminar a ${user.Name} ${user.LastName}?`,
                'Esta acción no se puede deshacer.',
                [
                    {
                        text: 'Cancelar',
                        onPress: () => resolve(false),
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: async () => {
                            await handleDeleteUser(user);
                            resolve(true);
                        },
                    },
                ],
            );
        });
    };

    const handleDeleteUser = async (user) => {
        if (!user) return;

        const success = await deleteUser(user.id, user.Username);
        if (success) {
            Alert.alert('Usuario eliminado satisfactoriamente');
            const updatedUsers = await getUsers();
            setUsers(updatedUsers);
        } else {
            Alert.alert('Fallo al eliminar el usuario');
        }
    };

    const handleExportToExcel = async (user) => {
        await exportToExcelUser(user);
    };

    const filteredUsers = users.filter(user => {
        const userString = `Nombre: ${user.Name} ${user.LastName} ${user.LastName2}`;
        return userString.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <View style={[styles.container, { width: windowWidth - 40 }]}>
            <Text style={styles.title}>Lista de Usuarios</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
                placeholder="Buscar..."
                onChangeText={(text) => setSearchTerm(text)}
                value={searchTerm}
            />
            <FlatList
                data={filteredUsers}
                renderItem={({ item }) => (
                    <View style={styles.tr} key={item.idDoc}>
                        <Text style={styles.userInfo}>
                            Nombre: {item.Name} {item.LastName} {item.LastName2}
                        </Text>
                        <View style={styles.separator} />
                        <View style={styles.td}>
                            <Icon
                                name="pencil"
                                size={24}
                                color="black"
                                onPress={() => {
                                    navigation.navigate('EditarRegistro', { user: item });
                                }}
                            />
                        </View>
                        <View style={styles.td}>
                            <Icon
                                name="download"
                                size={24}
                                color="black"
                                onPress={() => handleExportToExcel(item)}
                            />
                        </View>
                        <View style={styles.td}>
                            <Icon
                                name="trash"
                                size={24}
                                color="red"
                                onPress={async () => {
                                    if (await confirmDelete(item)) {
                                        setSelectedUser(null);
                                    }
                                }}
                            />
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.idDoc}
            />
        </View>
    );
};

export default ListGeneralView;
