import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import estilos from '../../../Estilos/Estilos';

const Cheque = (props) => {

    return (
        <TouchableOpacity style={props.tipo == 'DIFERIDO' ? estilos.chequeDiferido : estilos.cheque}>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} /*FILA 1*/ >
                    <View /*NUMERO CHEQUE*/>
                        <Text style={estilos.textoChequeNum}>N°: {props.numero}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF80', borderRadius: 5, paddingHorizontal: 5,  justifyContent: 'flex-end' }} /*IMPORTE*/>
                        <Text style={estilos.textoChequeMoneda}>{props.moneda}</Text>
                        <Text style={estilos.textoChequeImporte}>{props.importe}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}/*FILA 2*/>
                    <View>
                        <Text style={estilos.textoCheque}>{props.tipo}</Text>
                    </View>
                    <View>
                        <Text style={estilos.textoCheque}>{props.vencimiento}</Text>
                    </View>
                </View>
                <View /*FILA 3*/>
                    <View>
                        <Text style={estilos.textoCheque}>Librador: {props.librador}</Text>
                    </View>
                </View>
                <View /*FILA 4*/>
                    <View>
                        <Text style={estilos.textoCheque}>Beneficiario: {props.beneficiario} - {props.beneficiarioCI}</Text>
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}/*FILA 5 */>
                    <View >
                        <Text style={props.estado == 'RECHAZADO' ? estilos.textoChequeEstadoRech : estilos.textoChequeEstadoOk}>{props.estado}</Text>
                    </View>
                </View>
                <View style={{ alignItems: 'center', backgroundColor: '#FFFFFF80' }} /*FILA 6*/>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={estilos.textoChequeBanda}>{props.banda}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>


    );

}

export default Cheque;