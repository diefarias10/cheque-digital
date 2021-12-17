import React from 'react';
import { Text, TextInput, View, TouchableOpacity, Image, Picker } from 'react-native';
import estilos from '../../Estilos/Estilos';

const LoginBanco = () => {
    return (
        <View style={estilos.container}>
            <View style={estilos.carta}>
                <View>
                    <Text style={estilos.txtTitulo}>
                        Acceso a CHD
                    </Text>
                    <Text style={estilos.txtSubtitulo}>
                        Usuario Banco
                    </Text>
                </View>
                <View style={{ marginVertical: 10, width: '90%' }} >
                    <Text style={estilos.loginLabel}>
                        Banco:
                    </Text>
                    <Picker style={estilos.loginInput}>
                        <Picker.Item label="Amarillo" value="Amarillo" />
                        <Picker.Item label="Azul" value="Azul" />
                        <Picker.Item label="Verde" value="Verde" />
                        <Picker.Item label="Rojo" value="Rojo" />
                    </Picker>
                </View>
                <View style={{ width: '90%', alignItems: 'center', marginTop: 20 }} >
                    <TouchableOpacity style={estilos.btnNormal}>
                        <Text style={estilos.txtNormal, { color: 'white', fontSize: 20 }}>
                            Entrar
                        </Text>
                    </TouchableOpacity >
                </View>
            </View>
        </View>
    );
};

export default LoginBanco;