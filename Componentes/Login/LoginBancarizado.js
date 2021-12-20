import React, { useState, useEffect, useContext, componentWillUnmount } from 'react';
import { Text, TextInput, View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import SelectDropdown from 'react-native-select-dropdown';
import estilos from '../../Estilos/Estilos';
import HomeUsuario from '../HomeUsuario/HomeUsuario';
import HomeBanking from '../HomeBanking/HomeBanking';
import { Contexto } from '../../Storage/ContextoProvider';
import LinearGradient from 'react-native-linear-gradient';




const LoginBancarizado = ({ navigation }) => {
    const bancos = ["Verde", "Azul", "Rojo", "Gris", "Amarillo"];
    const { data, setData } = useContext(Contexto);

    

    const controlLoginHandler = () => {

        fetch('http://192.168.1.9:8085/CHD_POC/com.echeq.aws_checklogin?' + data.cedula + ',' + data.contraseña + ',HB,' + data.bancoID + "'",
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.nombre != 'ERROR') {
                    setData({ ...data, usuario: responseJson.nombre, tipoUsuario: 'HB', banco: data.banco, bancoID: data.bancoID })
                    navigation.navigate('Home Usuario')
                }
                else {
                    Alert.alert('⚠', 'Verifique Cedula / Contraseña', [{ text: 'Cerrar' }]);
                }
            })
    };

    return (
        <View style={estilos.container}>
            <View style={estilos.carta}>
                <View>
                    <Text style={estilos.txtTitulo}>
                        Acceso a CHD
                    </Text>
                    <Text style={estilos.txtSubtitulo}>
                        Usuario Bancarizado
                    </Text>
                </View>
                <View style={{ marginVertical: 10, width: '90%' }} >
                    <Text style={estilos.loginLabel}>
                        Banco:
                    </Text>
                    <SelectDropdown 
                        data={bancos}
                        buttonStyle={estilos.dropdownLogin}
                        defaultButtonText='Elegir...'
                        onSelect={(selectedItem, index) => {
                            /*setBancoID(index + 1)
                            setBanco(selectedItem)
                            console.log(banco, bancoID)*/
                            setData({ ...data, bancoID: index + 1, banco: selectedItem })
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                    />
                </View>
                <View style={{ marginVertical: 10, width: '90%' }} >
                    <Text style={estilos.loginLabel} >
                        Cédula / RUC:
                    </Text>
                    <TextInput style={estilos.loginInput} keyboardType='numeric' onChangeText={(cedulaUsuario) => setData({ ...data, cedula: cedulaUsuario })} />
                </View>
                <View style={{ marginVertical: 10, width: '90%' }} >
                    <Text style={estilos.loginLabel} >
                        Contraseña:
                    </Text>
                    <TextInput style={estilos.loginInput} onChangeText={(contraseñaUsuario) => setData({ ...data, contraseña: contraseñaUsuario })} />
                </View>
                <View style={{ width: '90%', alignItems: 'center', marginTop: 20 }} >
                    <TouchableOpacity style={estilos.btnNormal} onPress={controlLoginHandler}>
                        <Text style={{ color: 'white', fontSize: 20 }}>
                            Entrar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default LoginBancarizado;