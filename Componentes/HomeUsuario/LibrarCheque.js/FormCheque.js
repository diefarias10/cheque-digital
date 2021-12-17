import React, { useState, useContext, useEffect } from 'react';
import { Text, TextInput, View, FlatList, Modal, TouchableOpacity, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import estilos from '../../../Estilos/Estilos';
import Cheque from '../Cheque/Cheque';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import { Contexto } from '../../../Storage/ContextoProvider';


const FormCheque = (props) => {

    const monedas = ['$', 'U$S']
    const tiposDoc = ['CI', 'Pasaporte']
    const cuentas = []
    const { data, setData } = useContext(Contexto);
    const [datosChequeNuevo, setDatosChequeNuevo] = useState({
        nroCheque: '',
        tipoCheque: 'COMUN',
        monedaCheque: '',
        importeCheque: '',
        vencCheque: '',
        benefCheque: '',
        benefTipoDoc: '',
        benefNroDoc: '',
        ctaChequeNombre: '',
        ctaChequeNro: '',
        sucursalCheque: '',
        sucursalNro: '',
        cruzado: false,
        noALaOrden: false,
    })

    data.cuentas.forEach(element => { /* SE AGREGAN LOS Nº DE CUENTA EN UN ARRAY PARA MOSTRAR EN EL DROPDOWN */
        cuentas.push(element.numeroCta)
    })

    useEffect(() => { /* RESERVO NUMERO PARA EL CHEQUE NUEVO */
        fetch('http://192.168.1.9:8085/CHD_POC/com.echeq.ahttpreservanrocheque?' + data.bancoID + "'" + data.cedula + "'",
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                setDatosChequeNuevo({ ...datosChequeNuevo, nroCheque: responseJson })
            })
    }, [])

    const confirmoChequeHandler = () => {
        /* TRANSFORMO MONEDA A NUMEROS */
        if (datosChequeNuevo.monedaCheque === '$') {
            setDatosChequeNuevo({ ...datosChequeNuevo, monedaCheque: '1' })
        }
        else if (datosChequeNuevo.monedaCheque === 'U$S') {
            setDatosChequeNuevo({ ...datosChequeNuevo, monedaCheque: '2' })
        }

        const chequeNuevo = {
            Numero: datosChequeNuevo.nroCheque,
            BancoID: data.bancoID,
            SucursalNro: datosChequeNuevo.sucursalNro,
            CtaChequeNro: datosChequeNuevo.ctaChequeNro,
            SucursalNombre: datosChequeNuevo.sucursalCheque,
            CtaChequeNombre: datosChequeNuevo.ctaChequeNombre,
            Tipo: datosChequeNuevo.tipoCheque,
            MonedaCheque: datosChequeNuevo.monedaCheque,
            EsCruzado: datosChequeNuevo.cruzado,
            EsNoALaOrden: datosChequeNuevo.noALaOrden,
            BenefTipoDoc: datosChequeNuevo.benefTipoDoc,
            BenefNroDoc: datosChequeNuevo.benefNroDoc,
            BenefNombre: datosChequeNuevo.benefCheque,
            ImporteCheque: datosChequeNuevo.importeCheque,
            VencimientoCheque: datosChequeNuevo.vencCheque,
            EstadoCheque: 'LIBRADO',
            LibradorCheque: data.usuario,
        }

        console.log(chequeNuevo.Numero)
        console.log(chequeNuevo.BancoID)
        console.log(chequeNuevo.SucursalNro)
        console.log(chequeNuevo.SucursalNombre)
        console.log(chequeNuevo.CtaChequeNro)
        console.log(chequeNuevo.CtaChequeNombre)
        console.log(chequeNuevo.Tipo)
        console.log(chequeNuevo.MonedaCheque)
        console.log(chequeNuevo.EsCruzado)
        console.log(chequeNuevo.EsNoALaOrden)
        console.log(chequeNuevo.BenefTipoDoc)
        console.log(chequeNuevo.BenefNroDoc)
        console.log(chequeNuevo.BenefNombre)
        console.log(chequeNuevo.ImporteCheque)
        console.log(chequeNuevo.VencimientoCheque)
        console.log(chequeNuevo.EstadoCheque)
        console.log(chequeNuevo.LibradorCheque)

        props.agregarCheque(chequeNuevo);
        vaciarChequeNuevo();
        props.cerrarForm();
    }


    const cambiarTipo = () => {
        if (datosChequeNuevo.tipoCheque === 'COMUN') {
            setDatosChequeNuevo({ ...datosChequeNuevo, tipoCheque: 'DIFERIDO' })
        }
        else if (datosChequeNuevo.tipoCheque === 'DIFERIDO') {
            setDatosChequeNuevo({ ...datosChequeNuevo, tipoCheque: 'COMUN' })
        }
    }

    const cambiarCruzado = () => {
        setDatosChequeNuevo({ ...datosChequeNuevo, cruzado: !datosChequeNuevo.cruzado });
    }

    const cambiarNoALaOrden = () => {
        setDatosChequeNuevo({ ...datosChequeNuevo, noALaOrden: !datosChequeNuevo.noALaOrden })
    }

    const cambiarImporte = (importe) => {
        setDatosChequeNuevo({ ...datosChequeNuevo, importeCheque: importe })
    }

    const cambiarMoneda = (moneda) => {
        setDatosChequeNuevo({ ...datosChequeNuevo, monedaCheque: moneda })
    }

    const cambiarBenef = (nombre) => {
        setDatosChequeNuevo({ ...datosChequeNuevo, benefCheque: nombre })
    }

    const cambiarTipoDoc = (tipo) => {
        setDatosChequeNuevo({ ...datosChequeNuevo, benefTipoDoc: tipo })
    }

    const cambiarNroDoc = (numero) => {
        setDatosChequeNuevo({ ...datosChequeNuevo, benefNroDoc: numero })
    }

    const cambiarCuentaCheque = (cuenta) => {
        data.cuentas.forEach(element => {
            if (element.numeroCta === cuenta) {
                console.log(element.nombreCta)
                setDatosChequeNuevo({ ...datosChequeNuevo, ctaChequeNombre: element.nombreCta })   
                return
            }
        })
        setDatosChequeNuevo({ ...datosChequeNuevo, ctaChequeNro: cuenta })
        console.log(datosChequeNuevo.ctaChequeNombre)
    }

    const cambiarSuc = (sucursal) => {
        setDatosChequeNuevo({ ...datosChequeNuevo, sucursalCheque: sucursal })
    }

    const cambiarNroSuc = (numero) => {
        setDatosChequeNuevo({ ...datosChequeNuevo, sucursalNro: numero })
    }

    const vaciarChequeNuevo = () => {
        setDatosChequeNuevo({
            nroCheque: '',
            tipoCheque: 'COMUN',
            monedaCheque: '',
            importeCheque: '',
            vencCheque: '',
            benefCheque: '',
            benefTipoDoc: '',
            benefNroDoc: '',
            ctaChequeNombre: '',
            ctaChequeNro: '',
            sucursalCheque: '',
            sucursalNro: '',
            cruzado: false,
            noALaOrden: false,
        })
    }

    const cancelarLibrado = () => {
        props.cerrarForm()
        vaciarChequeNuevo()
    }

    return (
        <Modal visible={props.visible} animationType='slide' transparent={true}>
            <ScrollView style={{ backgroundColor: 'white', borderTopRightRadius: 15, borderTopLeftRadius: 15 }}>
                <View style={estilos.formContainer}>
                    <View style={{ backgroundColor: '#081D3C', width: '100%', borderTopRightRadius: 20, borderTopLeftRadius: 20, paddingVertical: 8 }}>
                        <Text style={estilos.txtTituloForm}>
                            Cheque nuevo
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginVertical: 5, width: '95%', flexDirection: 'row' }}>
                            <CheckBox
                                iconleft
                                containerStyle={estilos.checkBoxForm}
                                textStyle={estilos.formLabel}
                                title='COMÚN'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={datosChequeNuevo.tipoCheque === 'COMUN' ? true : false}
                                onPress={cambiarTipo} />
                            <CheckBox
                                iconleft
                                containerStyle={estilos.checkBoxForm}
                                textStyle={estilos.formLabel}
                                title='DIFERIDO'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={datosChequeNuevo.tipoCheque === 'DIFERIDO' ? true : false}
                                onPress={cambiarTipo} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginVertical: 5, width: '95%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <CheckBox
                                iconleft
                                containerStyle={estilos.checkBoxForm}
                                textStyle={estilos.formLabel}
                                title='CRUZADO'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={datosChequeNuevo.cruzado}
                                onPress={cambiarCruzado} />
                            <CheckBox
                                iconleft
                                containerStyle={estilos.checkBoxForm}
                                textStyle={estilos.formLabel}
                                title='NO A LA ORDEN'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={datosChequeNuevo.noALaOrden}
                                onPress={cambiarNoALaOrden} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginVertical: 5, width: '90%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: '30%' }}>
                                <Text style={estilos.formLabel} >
                                    Moneda:
                                </Text>
                                <SelectDropdown
                                    data={monedas}
                                    defaultButtonText='Elegir...'
                                    buttonStyle={estilos.dropdownForm}
                                    onSelect={(selectedItem, index) => {

                                        cambiarMoneda(selectedItem)
                                    
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
                            <View style={{ width: '60%' }}>
                                <Text style={estilos.formLabel} >
                                    Importe:
                                </Text>
                                <TextInput name='importeCheque' placeholder="Importe del cheque" style={estilos.formInput} onChangeText={(importe) => cambiarImporte(importe)} />
                            </View>
                        </View>
                    </View>

                    {
                        datosChequeNuevo.tipoCheque === 'DIFERIDO' ?
                            <View style={{ marginVertical: 5, width: '90%' }}>
                                <Text style={estilos.formLabel} >
                                    Vencimiento:
                                </Text>
                                <TextInput name='vencCheque' placeholder="DD/MM/AAAA" style={estilos.formInput} onChangeText={(venc) => cambiarVenc(venc)} />
                            </View>
                            :
                            <View></View>
                    }

                    <View style={{ marginVertical: 5, width: '90%' }}>
                        <Text style={estilos.formLabel} >
                            Beneficiario:
                        </Text>
                        <TextInput name='benefCheque' placeholder="Nombre y apellido" style={estilos.formInput} onChangeText={(nombre) => cambiarBenef(nombre)} />
                    </View>
                    <View style={{ marginVertical: 5, width: '90%' }}>
                        <Text style={estilos.formLabel} >
                            Tipo de Documento:
                        </Text>
                        <SelectDropdown
                            data={tiposDoc}
                            defaultButtonText='Elegir...'
                            buttonStyle={estilos.dropdownForm}
                            onSelect={(selectedItem, index) => {
                                cambiarTipoDoc(selectedItem)
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
                    <View style={{ marginVertical: 5, width: '90%' }}>
                        <Text style={estilos.formLabel} >
                            Documento Beneficiario:
                        </Text>
                        <TextInput name='benefNroDoc' placeholder="Nº de documento" style={estilos.formInput} onChangeText={(numero) => cambiarNroDoc(numero)} />
                    </View>
                    <View style={{ marginVertical: 5, width: '90%' }}>
                        <Text style={estilos.formLabel} >
                            Cuenta a debitar:
                        </Text>
                        <SelectDropdown
                            data={cuentas}
                            defaultButtonText='Elegir...'
                            buttonStyle={{ borderRadius: 5, height: 40, backgroundColor: '#91b3f1' }}
                            onSelect={(selectedItem, index) => {
                                cambiarCuentaCheque(selectedItem)
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
                    <View style={{ marginVertical: 5, width: '90%' }}>
                        <Text style={estilos.formLabel} >
                            Sucursal:
                        </Text>
                        <TextInput name='sucursalCheque' placeholder="Nombre sucursal" style={estilos.formInput} onChangeText={(sucursal) => cambiarSuc(sucursal)} />
                    </View>
                    <View style={{ marginVertical: 5, width: '90%' }}>
                        <Text style={estilos.formLabel} >
                            Nº Sucursal:
                        </Text>
                        <TextInput name='sucursalNro' placeholder="Nº sucursal" style={estilos.formInput} onChangeText={(numero) => cambiarNroSuc(numero)} />
                    </View>
                    <View style={{ width: '90%' }} >
                        <Cheque
                            numero={datosChequeNuevo.nroCheque}
                            tipo={datosChequeNuevo.tipoCheque}
                            moneda={datosChequeNuevo.monedaCheque}
                            importe={datosChequeNuevo.importeCheque}
                            estado='NUEVO'
                            vencimiento={datosChequeNuevo.vencCheque}
                            librador={data.usuario}
                            beneficiario={datosChequeNuevo.benefCheque}
                            beneficiarioCI={datosChequeNuevo.benefNroDoc}
                            banda=''
                        />
                        <View style={estilos.panelBotonesForm}>
                            <TouchableOpacity onPress={confirmoChequeHandler}>
                                <View>
                                    <FontAwesome name="check-circle" size={80} color="#1EA966" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={cancelarLibrado}>
                                <Entypo name="circle-with-cross" size={80} color="#ED4337" />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </Modal>
    );
}

export default FormCheque