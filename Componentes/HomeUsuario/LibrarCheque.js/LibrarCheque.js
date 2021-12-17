import React, { useState, useContext } from 'react';
import { Text, TextInput, View, FlatList, Modal, TouchableOpacity, Alert } from 'react-native';
import estilos from '../../../Estilos/Estilos';
import HeaderTitulo from '../../Header/HeaderTitulo';
import Cheque from '../Cheque/Cheque';
import { Contexto } from '../../../Storage/ContextoProvider';
import FormCheque from './FormCheque';

const LibrarCheque = () => {
    const [modoLibrar, setModoLibrar] = useState(false)
    const { data, setData } = useContext(Contexto);
    const [numCheque, setNumCheque] = useState(0)
    const [key, setKey] = useState(0)
    const [cheques, setCheques] = useState([/*
        {
            NroCheque: numCheque + 1,
            TipoCheque: 'COMUN',
            MonedaCheque: '$',
            ImporteCheque: '1.650.000.00',
            EstadoCheque: 'ACEPTADO',
            VencimientoCheque: '',
            LibradoCheque: 'Diego',
            BeneficiarioCheque: 'Farias',
            CMC7Cheque: '1010101010 1010101010 1010101010',
            key: key + 1
        },
        {
            NroCheque: numCheque + 1,
            TipoCheque: 'COMUN',
            MonedaCheque: 'U$S',
            ImporteCheque: '2.000',
            EstadoCheque: 'RECHAZADO',
            VencimientoCheque: '',
            LibradoCheque: 'Diego',
            BeneficiarioCheque: 'Farias',
            CMC7Cheque: '1010101010 1010101010 1010101010',
            key: key + 1
        },*/
    ]);

    const cambiarModo = () => {
        setModoLibrar(!modoLibrar)
    }

    const agregarChequeHandler = (chequeNuevo) => {
        /*LLAMAR SERVICIO DE ALTA CHEQUE*/
        fetch('http://192.168.1.9:8085/CHD_POC/com.echeq.ahttpaltamovil?'
            + chequeNuevo.Numero + ","
            + chequeNuevo.BancoID + ","
            + chequeNuevo.SucursalNro + ","
            + chequeNuevo.CtaChequeNro + ","
            + chequeNuevo.SucursalNombre + ","
            + chequeNuevo.CtaChequeNombre + ","
            + chequeNuevo.Tipo + ","
            + chequeNuevo.MonedaCheque + ","
            + chequeNuevo.EsCruzado + ","
            + chequeNuevo.EsNoALaOrden + ","
            + chequeNuevo.BenefTipoDoc + ","
            + chequeNuevo.BenefNroDoc + ","
            + chequeNuevo.BenefNombre + ","
            + chequeNuevo.ImporteCheque + ","
            + chequeNuevo.VencimientoCheque + "'",
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson === "No existe reserva para ese banco/nro cheque"){
                    Alert.alert('⚠', 'No se pudo librar el cheque', [{ text: 'Ok' }]);
                }
                else {
                    Alert.alert('✔', 'Cheque librado con exito!', [{ text: 'Ok' }]);
                }
            })

        /*setCheques(cheques => [
            ...cheques,
            {
                NroCheque: chequeNuevo.Numero,

                TipoCheque: chequeNuevo.Tipo,
                MonedaCheque: chequeNuevo.MonedaCheque,
                ImporteCheque: chequeNuevo.ImporteCheque,
                EstadoCheque: chequeNuevo.EstadoCheque,
                VencimientoCheque: chequeNuevo.VencimientoCheque,
                LibradoCheque: chequeNuevo.LibradorCheque,
                BeneficiarioCheque: chequeNuevo.BeneficiarioCheque,
                CMC7Cheque: chequeNuevo.CMC7Cheque,
                key: key + 1
            }])*/
    }


    return (
        <View style={estilos.container}>
            <HeaderTitulo titulo="Cheques librados" />
            <TouchableOpacity style={estilos.btnMenuSelec} onPress={cambiarModo} /*BOTON AGREGAR +*/>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                    Nuevo +
                </Text>
            </TouchableOpacity>
            <View style={estilos.listaCheques}>
                <FlatList
                    keyExtractor={(item, index) => item.key}
                    data={cheques}
                    renderItem={({ item }) => (
                        <Cheque
                            numero={item.NroCheque}
                            tipo={item.TipoCheque}
                            moneda={item.MonedaCheque}
                            importe={item.ImporteCheque}
                            estado={item.EstadoCheque}
                            vencimiento={item.VencimientoCheque}
                            librador={item.LibradoCheque}
                            beneficiario={item.BeneficiarioCheque}
                            banda={item.CMC7Cheque}
                        />
                    )}
                />
            </View>
            <FormCheque visible={modoLibrar} cerrarForm={cambiarModo} agregarCheque={agregarChequeHandler} />
            <View style={{ paddingVertical: 25, marginTop: 5 }}>
                <Text>Espacio en blanco</Text>
            </View>
        </View>
    );
};

export default LibrarCheque;