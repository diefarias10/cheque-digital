import React, { useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import estilos from '../../../Estilos/Estilos';
import Cheque from '../Cheque/Cheque';
import HeaderTitulo from '../../Header/HeaderTitulo';

const Cartera = () => {

    /*Obtengo los cheques por API*/
    const [cheques, setCheques] = useState([
        {
            NroCheque: '1',
            TipoCheque: 'COMUN',
            MonedaCheque: '$',
            ImporteCheque: '1.000',
            EstadoCheque: 'ACEPTADO',
            VencimientoCheque: '',
            LibradoCheque: 'Diego',
            BeneficiarioCheque: 'Farias',
            CMC7Cheque: '1010101010 1010101010 1010101010',
            key: 1
        },
        {
            NroCheque: '2',
            TipoCheque: 'COMUN',
            MonedaCheque: 'U$S',
            ImporteCheque: '2.000',
            EstadoCheque: 'RECHAZADO',
            VencimientoCheque: '',
            LibradoCheque: 'Diego',
            BeneficiarioCheque: 'Farias',
            CMC7Cheque: '1010101010 1010101010 1010101010',
            key: 2
        },
        {
            NroCheque: '3',
            TipoCheque: 'DIFERIDO',
            MonedaCheque: '$',
            ImporteCheque: '3.000',
            EstadoCheque: 'ACEPTADO',
            VencimientoCheque: '10/03/22',
            LibradoCheque: 'Diego',
            BeneficiarioCheque: 'Farias',
            CMC7Cheque: '1010101010 1010101010 1010101010',
            key: 3
        },
        {
            NroCheque: '3',
            TipoCheque: 'DIFERIDO',
            MonedaCheque: '$',
            ImporteCheque: '3.000',
            EstadoCheque: 'ACEPTADO',
            VencimientoCheque: '10/03/22',
            LibradoCheque: 'Diego',
            BeneficiarioCheque: 'Farias',
            CMC7Cheque: '1010101010 1010101010 1010101010',
            key: 3
        },
        {
            NroCheque: '3',
            TipoCheque: 'DIFERIDO',
            MonedaCheque: '$',
            ImporteCheque: '3.000',
            EstadoCheque: 'ACEPTADO',
            VencimientoCheque: '10/03/22',
            LibradoCheque: 'Diego',
            BeneficiarioCheque: 'Farias',
            CMC7Cheque: '1010101010 1010101010 1010101010',
            key: 3
        },
    ]);

    return (
        <View style={estilos.container}>
            <HeaderTitulo titulo="Cartera" />
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
            <View style={{ paddingVertical: 25, marginTop: 5 }}>
                <Text>Espacio en blanco</Text>
            </View>
        </View>
    );
};

export default Cartera;