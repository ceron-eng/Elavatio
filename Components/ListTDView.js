import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Dimensions, TextInput, FlatList, RefreshControl } from 'react-native';
import { deleteRegistro } from '../Services/DeleteRegistro';
import { getListTD } from '../Services/GetList';
import Icon from 'react-native-vector-icons/FontAwesome';
import { exportToExcelTD } from '../Services/ServiceExportExel';
import { styles } from '../Styles/ListTDViewStyles';

const ListGeneralView = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const windowWidth = Dimensions.get('window').width;
    const [searchTerm, setSearchTerm] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const handleExportToExcel = async (user) => {
        await exportToExcelTD(user);
    };

    const fetchTD = async () => {
        let List = await getListTD();
        setUsers(List);
    };

    useEffect(() => {
        fetchTD();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', fetchTD);
        return unsubscribe;
    }, [navigation]);

    const confirmDelete = async (user) => {
        let id = `TD - ${user.idTDTab}`;

        const estaConfirmado = await new Promise((resolve) => {
            Alert.alert(
                `¿Eliminar registro ${id} del día ${user.date}?`,
                'Esta acción no se puede deshacer.',
                [
                    {
                        text: 'Cancelar',
                        onPress: () => resolve(false),
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                            handleDeleteUser(user);
                            resolve(true);
                        },
                    },
                ],
            );
        });
        return estaConfirmado;
    };

    const handleDeleteUser = async (user) => {
        if (user) {
            const success = await deleteRegistro(user);
            if (success) {
                Alert.alert('Registro eliminado satisfactoriamente');
                await fetchTD();
                setSelectedUser(null);
            } else {
                Alert.alert('Fallo al eliminar el registro');
            }
        }
    };

    const filteredUsers = users.filter((user) => {
        const userString = `${user.idTDTab ? `Registro TD -${user.date}-${user.idTDTab}` : ''}`;
        return userString.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchTD();
        setRefreshing(false);
    };

    return (
        <View style={[styles.container, { width: windowWidth - 40 }]}>
            <Text style={styles.title}>Lista de Registros</Text>
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
                        <Text style={styles.td}>
                            {item.idTDTab ? `Registro TD -${item.date}-${item.idTDTab}` : ''}
                        </Text>
                        <View style={styles.separator} />
                        <View style={styles.td}>
                            <Icon
                                name="pencil"
                                size={24}
                                color="black"
                                onPress={() => {
                                    console.log(item);
                                    navigation.navigate('EditarRegistroTD', { user: item });
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
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </View>
    );
};

export default ListGeneralView;
