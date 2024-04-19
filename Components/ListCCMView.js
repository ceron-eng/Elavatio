import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Dimensions, TextInput, FlatList, RefreshControl } from 'react-native';
import { deleteRegistro } from '../Services/DeleteRegistro';
import { getListCCM } from '../Services/GetList';
import Icon from 'react-native-vector-icons/FontAwesome';
import { exportToExcelCCM } from '../Services/ServiceExportExel';
import { styles } from '../Styles/ListTDViewStyles';

const ListGeneralView = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const windowWidth = Dimensions.get('window').width;
    const [searchTerm, setSearchTerm] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchTGD();
        setRefreshing(false);
    };

    const fetchTGD = async () => {
        let List = await getListCCM();
        setUsers(List);
    };

    useEffect(() => {
        fetchTGD();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', fetchTGD);
        return unsubscribe;
    }, [navigation]);

    const confirmDelete = async (user) => {
        let id = `TGD - ${user.idTGDTab}`;

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
                await fetchTGD();
                setSelectedUser(null);
            } else {
                Alert.alert('Fallo al eliminar el registro');
            }
        }
    };

    const filteredUsers = users.filter((user) => {
        const userString = `${user.idCMMTab ? `Registro CMM -${user.date}-${user.idCMMTab}` : ''}`;
        return userString.toLowerCase().includes(searchTerm.toLowerCase());
    });

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
                            {item.idCMMTab ? `Registro CMM -${item.date}-${item.idCMMTab}` : ''}
                        </Text>
                        <View style={styles.separator} />
                        <View style={styles.td}>
                            <Icon
                                name="pencil"
                                size={24}
                                color="black"
                                onPress={() => {
                                    navigation.navigate('EditarRegistroCCM', { user: item });
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
