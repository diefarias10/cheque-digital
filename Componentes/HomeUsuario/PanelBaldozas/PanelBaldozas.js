import React, { useState, useContext, useEffect } from 'react';
import estilos from '../../../Estilos/Estilos';
import { View, ScrollView } from 'react-native';
import Baldoza from './Baldoza/Baldoza';
import { Contexto } from '../../../Storage/ContextoProvider';

const PanelBaldozas = (props) => {

    const { data, setData } = useContext(Contexto);
    /*const [cuentasUsuario, setCuentasUsuario] = useState([]);*/
    const [cantCartera, setCantCartera] = useState(0);
    const [cantLibrados, setCantLibrados] = useState(0);
    const [cantAceptados, setCantAceptados] = useState(0);
    const [cantRechazados, setCantRechazados] = useState(0);
    const [cantDepositados, setCantDepositados] = useState(0);



    useEffect(() => {
        fetch('http://192.168.1.9:8085/CHD_POC/com.echeq.aws_bancocuentasget?' + props.banco + ',' + props.usuario + "'",
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {

                let cuentasUsuario = []

                responseJson.forEach(element => {
                    cuentasUsuario.push({
                        nombreCta: element.CuentaNombre,
                        numeroCta: element.CuentaNumero,
                        sucursalCta: element.CuentaSucursal
                    })
                })

                setData({ ...data, cuentas: cuentasUsuario })

                /*setData({...data, otrosDatos: responseJson})*/

                /*responseJson.map((cuenta) => {
                    cuenta.ChequesLibrados.map((cheque) => {
                        setCantLibrados(+1)
                        if (cheque.ChequeEstado === 'ACEPTADO') {
                            setCantAceptados(+1)
                        }
                        else if (cheque.ChequeEstado === 'RECHAZADO') {
                            setCantRechazados(+1)
                        }
                    })
                })*/
            })
    }, [])





    return (
        <ScrollView style={{ width: '80%' }}>
            <Baldoza rutaImg={require('../../../assets/Cartera.png')} nombre={'CARTERA'} cantidad={cantCartera} descripcion={'Cheques recibidos en cartera'} />
            <Baldoza rutaImg={require('../../../assets/Librados.png')} nombre={'LIBRADOS'} cantidad={cantLibrados} descripcion={'Cheques librados por mi'} />
            <Baldoza rutaImg={require('../../../assets/Aceptados.png')} nombre={'ACEPTADOS'} cantidad={cantAceptados} descripcion={'Cheques aceptados por beneficiario'} />
            <Baldoza rutaImg={require('../../../assets/Rechazados.png')} nombre={'RECHAZADOS'} cantidad={cantRechazados} descripcion={'Cheques rechazados por beneficiario'} />
            <Baldoza rutaImg={require('../../../assets/Depositados.png')} nombre={'DEPOSITADOS'} cantidad={cantDepositados} descripcion={'Cheques depositados en banco'} />
        </ScrollView>
    );
};

export default PanelBaldozas;