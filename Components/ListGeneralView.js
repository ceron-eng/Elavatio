import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Dimensions, TextInput, FlatList } from 'react-native';
import { deleteRegistro } from '../Services/DeleteRegistro';
import { getListTD, getListCCM, getListTGD } from '../Services/GetList'
import Icon from 'react-native-vector-icons/FontAwesome'
import { exportToExcelTGD, exportToExcelTD, exportToExcelCCM } from '../Services/ServiceExportExel'
import { styles } from '../Styles/ListTDViewStyles'

const ListGeneralView = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const windowWidth = Dimensions.get('window').width;
    const [searchTerm, setSearchTerm] = useState('');

    const handleExportToExcel = async (user) => {
        if (user.idTDTab) {
            await exportToExcelTD(user);
        } else if (user.idTGDTab) {
            await exportToExcelTGD(user);
        } else if (user.idCMMTab) {
            await exportToExcelCCM(user);
        }
    };


    React.useEffect(() => {
        const fetchTGD = async () => {
            let List = await getListTGD();
            List = List.concat(await getListTD());
            List = List.concat(await getListCCM());
            setUsers(List);
        };
        fetchTGD();
    }, []);

    React.useEffect(() => {
        const fetchTGD = async () => {
            let List = await getListTGD();
            List = List.concat(await getListTD());
            List = List.concat(await getListCCM());
            setUsers(List);
        };
        navigation.addListener('focus', fetchTGD);
        return () => {
            navigation.removeListener('focus', fetchTGD);
        };
    }, [navigation]);

    const confirmDelete = async (user) => {
        let id = '';
        if (user.id) {
            id = `TD - ${user.idTDTab}`;
        } else if (user.idTGDTab) {
            id = `TGD - ${user.idTGDTab}`;
        } else if (user.idCMMTab) {
            id = `CMM - ${user.idCMMTab}`;
        }

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
                let List = await getListTGD();
                List = List.concat(await getListTD(), await getListCCM());
                setUsers(List);
                setSelectedUser(null);
            } else {
                Alert.alert('Fallo al eliminar el registro');
            }
        }
    };

    const filteredUsers = users.filter(user => {
        const userString = `${user.id ? `Registro TD -${user.date}-${user.id}` :
            user.idTGDTab ? `Registro TGD -${user.date}-${user.idTGDTab}` :
                user.idCMMTab ? `Registro CMM -${user.date}-${user.idCMMTab}` : ''}`;
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
                            {item.idTDTab ? `Registro TD -${item.date}-${item.idTDTab}` :
                                item.idTGDTab ? `Registro TGD -${item.date}-${item.idTGDTab}` :
                                    item.idCMMTab ? `Registro CMM -${item.date}-${item.idCMMTab}` : ''}
                        </Text>
                        <View style={styles.separator} />
                        <View style={styles.td}>
                            <Icon
                                name="pencil"
                                size={24}
                                color="black"
                                onPress={() => {
                                    if (item.id) {
                                        Alert.alert("Función deshabilitada");
                                       // navigation.navigate('EditTD', { user: item });
                                    } else if (item.idTGDTab) {
                                        Alert.alert("Función deshabilitada");
                                       // navigation.navigate('EditTGD', { user: item });
                                    } else if (item.idCMMTab) {
                                        Alert.alert("Función deshabilitada");
                                       // navigation.navigate('EditCCM', { user: item });
                                    }
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
