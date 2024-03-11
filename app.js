const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const { EVENTS } = require('@bot-whatsapp/bot')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario1 = addKeyword('1').addAnswer([' 💁‍♂️ En un momento tu asesor personal se comunicara contigo'])
const flowSecundario2 = addKeyword('2').addAnswer([' 💹 En un momento te enviaremos tu estado de Cuenta'])
const flowSecundario3 = addKeyword('3').addAnswer([' 📑📱 En un momento un asesor se comunicara contigo para realizar el proceso'])
const flowSecundario4 = addKeyword('4').addAnswer(['📲 Nequi ➡️ 3202474936','📲 Daviplata ➡️ 3208119581','🏦 Bancolombia' ,'cuenta de ahorros ➡️ 15800000486'])
const flowSecundario5 = addKeyword('5').addAnswer(['📄 En un momento te confirmaremos si tu pago fue exitoso🫰💹💵 '])
const flowSecundario6 = addKeyword('6').addAnswer(['📄 Aquí tenemos el flujo secundario 6'])

const flowBienvenida = addKeyword(EVENTS.WELCOME,'botones')
    .addAnswer('¡Hola!👋 bienvenido a *S&F Pecado Capital*, en que podemos colaborarte hoy 😎💸')
    .addAnswer('Nuestro horario de atención 📅 es de Lunes a Sabado de *9 a.m. - 5 p.m.*')
    .addAnswer(['En que podemos colaborarte Hoy',
     '*1.* Comunicarte con tu asesor', 
     '*2.* Estado de cuenta',
     '*3.* Nuevo credito',
     '*4.* Numeros y cuentas de pago',
     '*5.* Confirmacion de pago y soporte de pago',
     '*6.* Desembolso'],
     null,
     null,
     [flowSecundario1,flowSecundario2,flowSecundario3,flowSecundario4,flowSecundario5,flowSecundario6])

const flowRecibirMedia = addKeyword(EVENTS.MEDIA)
    .addAnswer('En un momento te confirmaremos si tu pago fue exitoso🫰💹💵')

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowBienvenida,flowRecibirMedia])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
