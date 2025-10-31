"use client"

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const policyTabs = [
    { id: 'user-agreement', labelKey: 'policies.user_agreement', href: '/policies?tab=user-agreement' },
    { id: 'responsible-gambling', labelKey: 'policies.responsible_gambling', href: '/policies?tab=responsible-gambling' },
    { id: 'responsible-gaming', labelKey: 'policies.responsible_gaming', href: '/policies?tab=responsible-gaming' },
    { id: 'general-terms', labelKey: 'policies.general_terms', href: '/policies?tab=general-terms' },
    { id: 'risk-disclosure', labelKey: 'policies.risk_disclosure', href: '/policies?tab=risk-disclosure' },
    { id: 'deposits-withdrawals', labelKey: 'policies.deposits_withdrawals', href: '/policies?tab=deposits-withdrawals' },
    { id: 'cancellation-policy', labelKey: 'policies.cancellation_policy', href: '/policies?tab=cancellation-policy' },
    { id: 'refund-policy', labelKey: 'policies.refund_policy', href: '/policies?tab=refund-policy' },
    { id: 'privacy-policy', labelKey: 'policies.privacy_policy', href: '/policies?tab=privacy-policy' },
    { id: 'about-us', labelKey: 'policies.about_us', href: '/policies?tab=about-us' },
    { id: 'contact', labelKey: 'policies.contact', href: '/policies?tab=contact' },
    { id: 'fairness', labelKey: 'policies.fairness', href: '/policies?tab=fairness' },
    { id: 'account-payments', labelKey: 'policies.account_payments', href: '/policies?tab=account-payments' },
    { id: 'aml', labelKey: 'policies.aml', href: '/policies?tab=aml' },
    { id: 'self-exclusion', labelKey: 'policies.self_exclusion', href: '/policies?tab=self-exclusion' },
    { id: 'kyc', labelKey: 'policies.kyc', href: '/policies?tab=kyc' },
    { id: 'dispute-resolution', labelKey: 'policies.dispute_resolution', href: '/policies?tab=dispute-resolution' }
];

const policyContent = {
    'user-agreement': {
        title: 'Acuerdo de usuario',
        subtitle: 'Descargar política',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block"><p class="mb-5">www.Valor.Bet se compromete a proteger tu información personal. Esta Política de Privacidad te informa sobre qué información recopilamos cuando utilizas nuestros servicios, por qué recopilamos esta información y cómo utilizamos la información recopilada.</p><p class="mb-5">Ten en cuenta que esta Política de Privacidad será acordada entre tú y www.Valor.Bet. ('Nosotros', 'Nuestro' o 'Nuestra', según corresponda). Esta Política de Privacidad es una parte integrada de los Términos y Condiciones de www.Valor.Bet.</p><p class="mb-5">El sitio web www.Valor.Bet ("Casino", "Sitio web", "Empresa", "Nosotros", "Nuestro")</p><p class="mb-5">Podemos realizar cambios periódicos en esta Política de Privacidad y te notificaremos de estos cambios publicando los términos modificados en nuestras plataformas. Recomendamos que revises esta Política de Privacidad con regularidad.</p><h2 class="text-2xl font-bold leading-8">1. PRIVACIDAD</h2><p class="mb-5">Consideramos información que puede ser utilizada para identificar a una persona, incluyendo, pero sin limitarse a, nombre y apellido, fecha de nacimiento, domicilio u otra dirección física, dirección de correo electrónico, número de teléfono u otra información relevante como Información Personal ('Información Personal'). Es posible que se te solicite proporcionar Información Personal cuando uses nuestro sitio web, te registres para obtener una cuenta o utilices nuestros servicios. La Información Personal que recopilamos puede incluir información como: información de contacto (incluido número de teléfono), información de envío, información de facturación, historial de transacciones, preferencias de uso del sitio web y comentarios sobre los servicios. Esta información se almacena en servidores ubicados en Alemania y en otros lugares de vez en cuando. Cuando interactúas con los servicios, nuestros servidores mantienen un registro de actividad único que recopila cierta información administrativa y de tráfico, incluyendo: dirección IP de origen, hora de acceso, fecha de acceso, páginas web visitadas, idioma utilizado, informes de errores de software y tipo de navegador utilizado. Esta información es esencial para la provisión y calidad de nuestros servicios. No recopilamos Información Personal sobre ti sin tu conocimiento.</p><h2 class="text-2xl font-bold leading-8">2. INFORMACIÓN RECOPILADA</h2><p class="mb-5">Podemos recopilar automáticamente ciertos datos como se mencionó anteriormente y recibir Información Personal sobre ti cuando proporcionas dicha información a través de los servicios u otras comunicaciones e interacciones en el sitio www.Valor.Bet También podemos recibir Información Personal de proveedores de servicios en línea y vendedores, así como de listas de clientes adquiridas legalmente de proveedores externos. Además, podemos contratar los servicios de proveedores de servicios externos para brindar soporte técnico, procesar tus transacciones en línea y mantener tu cuenta. Tendremos acceso a cualquier información que proporciones a dichos proveedores, proveedores de servicios y servicios de comercio electrónico de terceros, y utilizaremos la Información Personal según se describe en esta Política de Privacidad a continuación. Esta información solo se revelará a terceros fuera de la empresa de acuerdo con esta Política de Privacidad. Tomamos medidas para asegurarnos de que nuestros acuerdos con proveedores de servicios externos y vendedores en línea protejan tu privacidad.</p><h2 class="text-2xl font-bold leading-8">3. MEDIOS DE RECOLECCIÓN Y PROCESAMIENTO DE DATOS</h2><p class="mb-5">Utilizamos la Información Personal que recopilamos de ti para brindar nuestros servicios, proporcionar soporte al cliente, llevar a cabo controles necesarios de seguridad y verificación de identidad, procesar cualquier transacción en línea, ayudar en tu participación en promociones de terceros, cumplir con ciertos requisitos comerciales y para cualquier otro propósito relacionado con el funcionamiento de los servicios. Como tal, podemos compartir tu Información Personal con nuestros socios cuidadosamente seleccionados (incluidas otras partes que tengan acuerdos de intercambio de datos con estos últimos).</p><p class="mb-5">También podemos utilizar tu Información Personal para proporcionarte: (1) ofertas promocionales e información sobre nuestros productos y servicios; y (2) ofertas promocionales e información sobre los productos y servicios de nuestros socios, con el fin de ampliar la gama de productos ofrecidos y mejorar nuestro servicio al cliente. De vez en cuando, podemos solicitar información a través de encuestas o concursos. La participación en estas encuestas o concursos es completamente voluntaria y tú tienes la opción de proporcionar o no dicha información. La información solicitada puede incluir información de contacto (como nombre, dirección de correspondencia y número de teléfono) e información demográfica (como código postal o edad). Al aceptar cualquier premio o ganancia de concursos, das tu consentimiento para el uso de tu nombre con fines publicitarios y promocionales sin compensación adicional, excepto donde lo prohíba la ley. A menos que hayas optado por no recibir información promocional, también podemos utilizar tu Información Personal (incluida tu dirección de correo electrónico y número de teléfono) para proporcionarte información sobre nuestros productos, servicios y promociones, incluidos otros productos de juegos de azar (como póker en línea, casino, apuestas, backgammon) y productos y servicios de terceros cuidadosamente seleccionados por nosotros.</p><h2 class="text-2xl font-bold leading-8">4. USO DE LA INFORMACIÓN</h2><p class="mb-5">Podemos divulgar tu Información Personal si así lo exige la ley, o si creemos de buena fe que dicha acción es necesaria para: (1) cumplir con cualquier proceso legal que se nos entregue, cualquiera de nuestros sitios o servicios o en circunstancias en las que estemos bajo una obligación legal sustancialmente similar; (2) proteger y defender nuestros derechos o propiedad; o (3) actuar para proteger la seguridad personal de los usuarios de los servicios o del público. Si, a nuestro exclusivo criterio, se determina que has hecho trampa o has intentado defraudarnos a nosotros, a la empresa o a cualquier otro usuario de los servicios de alguna manera, incluyendo, pero no limitándose a, manipulación de juegos o fraude de pagos, o si sospechamos de un pago fraudulento, incluido el uso de tarjetas de crédito robadas, u cualquier otra actividad fraudulenta (incluido cualquier contracargo u otra reversión de un pago) o transacción prohibida (incluido el lavado de dinero), nos reservamos el derecho de compartir esta información (junto con tu identidad) con otros sitios de juegos en línea, bancos, compañías de tarjetas de crédito, agencias apropiadas y autoridades relevantes. (4) Con fines de investigación sobre la prevención de la adicción, los datos pueden ser anonimizados y entregados a las respectivas instituciones.</p><h2 class="text-2xl font-bold leading-8">5. CIERTAS DIVULGACIONES EXCLUIDAS</h2><p class="mb-5">Puedes optar por no recibir comunicaciones promocionales ya sea eligiendo la opción de optar por no recibirlas a través de la configuración de tu cuenta disponible en nuestros sitios o servicios, o en un correo electrónico que recibas de nosotros, o en cualquier momento enviando un correo electrónico, o escribiéndonos a Servicio al Cliente.</p><p class="mb-5">Además, puedes ponerte en contacto con nosotros si: 1) deseas confirmar la exactitud de la Información Personal que hemos recopilado sobre ti; 2) quieres actualizar tu Información Personal; y/o 3) tienes alguna queja con respecto a nuestro uso de tu Información Personal. Si lo solicitas, (1) actualizaremos cualquier información que nos hayas proporcionado, en caso de que demuestres la necesidad de tales cambios, o (2) marcaremos cualquier información para prohibir su uso futuro con fines de marketing. Para evitar dudas, nada en esta Política de Privacidad nos impedirá retener tu Información Personal cuando estemos obligados a hacerlo por ley.</p><h2 class="text-2xl font-bold leading-8">6. ACCESO</h2><h3 class="font-bold">Información almacenada en tu dispositivo</h3><h3 class="font-bold">Cookies estrictamente necesarias</h3><h3 class="font-bold">Durante el proceso de registro</h3><h3 class="font-bold">En nuestro sitio web</h3><p class="mb-5">Cuando accedes a nuestros servicios, podemos almacenar información en tu dispositivo. Esta información se conoce como cookies, que son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas páginas en línea que registran tus preferencias. También utilizamos Objetos Compartidos Locales o 'flash cookies'. Las 'flash cookies' son similares a las cookies del navegador. Nos permiten recordar detalles sobre tus visitas en nuestros sitios. Ni las cookies ni las flash cookies pueden ser utilizadas para acceder o utilizar otra información en tu computadora. Solo utilizamos estos métodos para rastrear tu uso de nuestros servicios. Las cookies nos ayudan a supervisar el tráfico del sitio, mejorar nuestros servicios y facilitar y/o hacer más relevante su uso para ti. Utilizamos flash cookies y cookies de terceros para mostrarte anuncios más relevantes y deseables.</p><p class="mb-5">Las cookies estrictamente necesarias son esenciales para permitir que un usuario se desplace por un sitio web y utilice sus características, como acceder a áreas seguras del sitio web o realizar transacciones financieras. Sin estas cookies, no podríamos hacer que nuestros sitios web funcionen de manera eficiente.</p><p class="mb-5">Estas cookies contendrán información recopilada durante tu registro y nos permitirán reconocerte como cliente y proporcionarte los servicios que requieres. También podemos utilizar estos datos para comprender mejor tus intereses mientras estás en línea y mejorar tus visitas a nuestras plataformas.</p><p class="mb-5">Para los visitantes de nuestro sitio web, utilizamos cookies para recopilar información. Nuestros servidores utilizan tres tipos diferentes de cookies:</p><p class="mb-5">Una cookie 'basada en sesión': este tipo de cookie se asigna a tu computadora solo durante la duración de tu visita a nuestro sitio web. Una cookie basada en sesión te ayuda a moverte más rápido en nuestro sitio web y, si eres un cliente registrado, nos permite proporcionarte información que sea más relevante para ti. Esta cookie expira automáticamente cuando cierras tu navegador.</p><p class="mb-5">Una cookie 'persistente': este tipo de cookie permanecerá en tu computadora durante un período de tiempo establecido para cada cookie. Las flash cookies también son persistentes.</p><p class="mb-5">Cookies 'analíticas': este tipo de cookie nos permite reconocer y contar el número de visitantes en nuestro sitio y ver cómo los visitantes utilizan nuestros servicios. Esto nos ayuda a mejorar la forma en que funcionan nuestros sitios, por ejemplo, asegurando que puedas encontrar lo que estás buscando fácilmente.</p><p class="mb-5">Tienes la capacidad de aceptar o rechazar las cookies. La mayoría de los navegadores web aceptan automáticamente las cookies, pero si lo prefieres, generalmente puedes modificar la configuración de tu navegador para rechazar las cookies. El menú de Ayuda en la barra de menú de la mayoría de los navegadores te indicará cómo evitar que tu navegador acepte nuevas cookies, cómo hacer que el navegador te notifique cuando recibas una nueva cookie y cómo desactivar las cookies por completo.</p><h2 class="text-2xl font-bold leading-8">7. COOKIES</h2><p class="mb-5">Para jugar con dinero real en nuestros servicios, deberás enviar dinero a nosotros y recibir dinero de nosotros. Podemos utilizar sistemas de pago electrónicos de terceros para procesar dichas transacciones financieras. Al aceptar esta Política de Privacidad, otorgas expresamente tu consentimiento para la Información Personal necesaria para el procesamiento de transacciones, incluida, cuando sea necesario, la transferencia de información fuera de tu país. Tomamos medidas para asegurarnos de que nuestros acuerdos con sistemas de pago protejan tu privacidad.</p><h2 class="text-2xl font-bold leading-8">8. CONSENTIMIENTO PARA EL USO DE PROVEEDORES DE SERVICIOS ELECTRÓNICOS</h2><p class="mb-5">Nos reservamos el derecho de realizar una revisión de seguridad en cualquier momento para validar los datos de registro proporcionados por ti y verificar tu uso de los servicios y tus transacciones financieras en busca de posibles incumplimientos de nuestros Términos y Condiciones y de la ley aplicable. Al utilizar nuestros servicios y, por lo tanto, aceptar nuestros Términos y Condiciones, nos autorizas a utilizar tu Información Personal y a divulgar tu Información Personal a terceros con el fin de validar la información que proporcionas durante el uso de nuestros servicios, incluida, cuando sea necesario, la transferencia de información fuera de tu país. Las revisiones de seguridad pueden incluir, entre otros, la solicitud de un informe de crédito y/o la verificación de la información que proporcionas con bases de datos de terceros. Además, para facilitar estas revisiones de seguridad, aceptas proporcionar la información o documentación que podamos solicitar.</p><h2 class="text-2xl font-bold leading-8">9. CONSENTIMIENTO PARA REVISIÓN DE SEGURIDAD</h2><p class="mb-5">Entendemos la importancia de la seguridad y las técnicas necesarias para proteger la información. Almacenamos toda la Información Personal que recibimos directamente de ti en una base de datos encriptada y protegida con contraseña, ubicada dentro de nuestra red segura y respaldada por un software de firewall de última generación. (Nuestros servicios admiten SSL Versión 3 con cifrado de 128 bits). También tomamos medidas para asegurarnos de que nuestras subsidiarias, agentes, afiliados y proveedores empleen medidas de seguridad adecuadas.</p><h2 class="text-2xl font-bold leading-8">10. SEGURIDAD</h2><p class="mb-5">Nuestros servicios no están destinados ni dirigidos a personas menores de dieciocho (18) años (o la edad legal en su jurisdicción respectiva). Cualquier persona que nos proporcione su información a través de cualquier parte de los servicios nos certifica que tiene dieciocho (18) años de edad (o la edad legal en su jurisdicción respectiva) o más. Nuestra política es descubrir intentos de acceso de menores a nuestros servicios, lo que puede implicar la iniciación de una revisión de seguridad. Si nos enteramos de que un menor ha intentado o ha enviado información personal a través de nuestros servicios, no aceptaremos su información y tomaremos medidas para eliminarla de nuestros registros.</p><h2 class="text-2xl font-bold leading-8">11. PROTECCIÓN DE MENORES</h2><p class="mb-5">La Información Personal recopilada en los servicios puede ser almacenada y procesada en cualquier país en el que nosotros o nuestras filiales, proveedores o agentes mantengan instalaciones. Al utilizar nuestros servicios, aceptas expresamente cualquier transferencia de información fuera de tu país (incluidos países que pueden no contar con leyes de privacidad adecuadas). Sin embargo, tomamos medidas para asegurarnos de que nuestros agentes, afiliados y proveedores cumplan con nuestros estándares de privacidad independientemente de su ubicación.</p><h2 class="text-2xl font-bold leading-8">12. TRANSFERENCIAS INTERNACIONALES</h2><p class="mb-5">No podemos garantizar la protección de cualquier información que proporciones a un sitio en línea de terceros que esté vinculado desde o hacia los servicios, o cualquier información recopilada por cualquier tercero que administre nuestro programa de afiliados (si corresponde) u otro programa, ya que estos sitios en línea de terceros son propiedad y están operados de manera independiente a nosotros. Cualquier información recopilada por estos terceros está sujeta a la política de privacidad, si la hay, de dicho tercero.</p><h2 class="text-2xl font-bold leading-8">13. PRÁCTICAS DE TERCEROS</h2><p class="mb-5">Los servicios se ofrecen 'TAL CUAL' y 'SEGÚN DISPONIBILIDAD', sin responsabilidad de ningún tipo. No somos responsables de eventos más allá de nuestro control directo. Debido a la naturaleza compleja y en constante cambio de nuestra tecnología y negocio, no podemos garantizar ni afirmar que habrá un rendimiento sin errores con respecto a la privacidad de tu Información Personal, y no seremos responsables de ningún daño indirecto, incidental, consecuente o punitivo relacionado con el uso o divulgación de dicha Información Personal.</p><h2 class="text-2xl font-bold leading-8">14. AVISO LEGAL</h2><p class="mb-5">El uso de nuestros servicios constituye un acuerdo con nuestra Política de Privacidad.</p><p class="mb-5">Esta es nuestra Política de Privacidad completa y exclusiva y reemplaza cualquier versión anterior. Esta Política de Privacidad debe leerse junto con nuestros Términos y Condiciones y cualquier término adicional aplicable publicado en nuestras plataformas. Podemos realizar cambios periódicamente en esta Política de Privacidad y te notificaremos de estos cambios mediante la publicación de los términos modificados en nuestras Plataformas. Tu uso continuo de nuestros servicios después de cualquier cambio en esta Política de Privacidad constituye tu aceptación de los cambios. Te recomendamos que revises esta Política de Privacidad con regularidad.</p><p class="mb-5">Además, de acuerdo con el Artículo 77 del GDPR, tienes el derecho de presentar una queja relacionada con el procesamiento de tus datos ante una autoridad de supervisión, en particular en el Estado miembro de tu residencia habitual, lugar de trabajo o lugar de una presunta infracción.</p><h2 class="text-2xl font-bold leading-8">15. CONSENTIMIENTO A LA POLÍTICA DE PRIVACIDAD</h2><p class="mb-5">Nuestro sitio web puede contener enlaces a otros sitios web, que están fuera de nuestro control y no están cubiertos por esta Política de Privacidad. Si accedes a otros sitios utilizando los enlaces proporcionados, los operadores de estos sitios pueden recopilar información de ti, que será utilizada por ellos de acuerdo con su política de privacidad, que puede diferir de la nuestra. No somos responsables. Únicamente los operadores de estos sitios web serán responsables de su funcionalidad o posibles errores en los sitios vinculados.</p><h2 class="text-2xl font-bold leading-8">16. OTROS SITIOS WEB</h2></div>
        `
    },
    'responsible-gambling': {
        title: 'Juego responsable',
        subtitle: 'Jugar de forma segura',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block"><p class="mb-5">Última actualización: 14.12.2022</p><p class="mb-5">Por favor, lee esta información detenidamente en tu propio beneficio.</p><p class="mb-5">www.Valor.Bet es operado por</p><h2 class="text-2xl font-bold leading-8">Juego responsable</h2><ul class="list-disc list-inside space-y-3 mb-5"><li class="text-gray-800 leading-relaxed">Cuenta significa una cuenta única creada para que tú accedas a nuestro servicio o partes de nuestro servicio.</li><li class="text-gray-800 leading-relaxed">Compañía (referida como "la Compañía", "Nosotros", "Nuestro(s)" en este acuerdo) se refiere a Curacao Co.</li><li class="text-gray-800 leading-relaxed">Servicio se refiere al sitio web.</li><li class="text-gray-800 leading-relaxed">Sitio web se refiere a www.Valor.Bet.</li><li class="text-gray-800 leading-relaxed">Tú significa el individuo que accede o utiliza el servicio, o la empresa u otra entidad legal en nombre de la cual dicho individuo accede o utiliza el servicio, según corresponda.</li></ul><h3 class="font-bold">Interpretación</h3><h3 class="font-bold">Definiciones</h3><p class="mb-5">Las palabras cuya inicial está en mayúscula tienen significados definidos en las siguientes condiciones.</p><p class="mb-5">Las siguientes definiciones tendrán el mismo significado tanto en singular como en plural.</p><h2 class="text-2xl font-bold leading-8">Interpretación y definiciones</h2><ul class="list-disc list-inside space-y-3 mb-5"><li class="text-gray-800 leading-relaxed">Establece un límite de depósito: Antes de comenzar a jugar, piensa cuánto puedes permitirte apostar según tu situación financiera. Juega con cantidades que sean para diversión y entretenimiento</li><li class="text-gray-800 leading-relaxed">No intentes recuperar pérdidas a toda costa: Evita tomar riesgos excesivos para recuperar lo que has perdido anteriormente a cualquier costo. Juega por entretenimiento y no para ganar dinero.</li><li class="text-gray-800 leading-relaxed">Establezca un límite de tiempo</li><li class="text-gray-800 leading-relaxed">Establezca un límite de tiempo y no lo supere. Tenga en cuenta que el juego debe mantenerse equilibrado con sus otras actividades y no ser su única afición.</li><li class="text-gray-800 leading-relaxed">Juegue de manera inteligente: Es más sensato no jugar cuando esté extremadamente estresado, deprimido o bajo mucha presión. Tampoco juegue cuando esté bajo la influencia de medicamentos, drogas o alcohol.</li><li class="text-gray-800 leading-relaxed">Tome descansos:</li><li class="text-gray-800 leading-relaxed">Debe tomar descansos cuando note que está cansado o ya no puede concentrarse más</li><li class="text-gray-800 leading-relaxed">Solo una cuenta:</li><li class="text-gray-800 leading-relaxed">Para facilitar el seguimiento de cuánto tiempo y dinero gasta en el juego, se recomienda encarecidamente no crear más de una cuenta por persona.</li></ul><h3 class="font-bold">Juego responsable</h3><h3 class="font-bold">Información y contacto</h3><h3 class="font-bold">Protección para Menores</h3><h3 class="font-bold">Autoexclusión:</h3><p class="mb-5">Para la mayoría de nuestros usuarios, el juego es entretenimiento, diversión y emoción. Pero también sabemos que para algunos de nuestros usuarios, el juego puede tener efectos negativos. En la ciencia médica, se reconoce desde hace muchos años como una enfermedad grave el juego patológico.</p><p class="mb-5"><a href="https://www.begambleaware.org/safer-gambling/"> Safer Gambling</a></p><p class="mb-5">Consejos útiles para el juego responsable en www.Valor.Bet</p><p class="mb-5">Te recomendamos que pienses en los siguientes consejos antes de jugar, para asegurarte de que el juego siga siendo divertido para ti y sin efectos negativos:</p><p class="mb-5">Para utilizar nuestro servicio, debes ser mayor de 18 años. Para evitar abusos, mantén tus datos de inicio de sesión seguros y lejos de cualquier menor que esté cerca de ti.</p><p class="mb-5">Principalmente, recomendamos un programa de filtro para evitar que los menores, especialmente los niños, accedan a cualquier contenido en internet que no sea saludable para ellos.</p><p class="mb-5">Para los padres, podemos recomendar una lista de filtros de internet para ayudarlos a evitar que sus hijos accedan a cualquier contenido que no haya sido creado para ellos:</p><p class="mb-5"><a href="https://famisafe.wondershare.com/internet-filter/best-internet-filters.html">Best internet filters</a></p><p class="mb-5">En caso de que te hayan diagnosticado una adicción al juego o intentes alejarte del juego por cualquier otro motivo, queremos ayudarte a mantenerte alejado de todo aquello que no te beneficie. La “autoexclusión” significa que te excluyes voluntariamente de todos los servicios de juego. Esta exclusión no se puede deshacer durante un período de tiempo establecido. Si deseas autoexcluirte del juego, envía un mensaje a nuestro soporte y proporciona un período de tiempo entre 6 meses y 5 años. También te explicarán todos los pasos futuros y lo que se requiere de tu parte.</p><p class="mb-5">• Correo electrónico: support@valor.bet</p><p class="mb-5">Desde nuestro primer día, hemos pensado en este problema y hemos hecho todo lo posible para ayudar. Bajo el término "Juego responsable", entendemos una serie de medidas con las que un proveedor de juegos de azar puede ayudar a reducir la posibilidad de que aparezcan efectos negativos. En caso de que ya aparezcan, también intentamos tomar medidas activas contra ellos</p><p class="mb-5">Ten en cuenta que la Autoexclusión es permanente durante el período de tiempo establecido y no se revertirá por tu propia protección.</p><p class="mb-5">Durante la Autoexclusión no se te permite crear una nueva cuenta, y cualquier intento de hacerlo será una violación de nuestros Términos de Servicio y puede resultar en la prohibición permanente de tu cuenta original.</p><p class="mb-5">El instrumento más importante contra los efectos negativos del juego es el conocimiento y la educación sobre los riesgos del juego, para apoyar el autocontrol de nuestros usuarios y asegurarnos de que no sufran efectos negativos.</p><p class="mb-5">Nuestro equipo de soporte te ayudará por correo electrónico en todo momento sin ningún costo adicional para ti:</p><p class="mb-5">• correo electrónico: support@valor.bet</p><p class="mb-5">Nuestro equipo de soporte, por supuesto, no proporcionará ninguna información sobre ti a nadie más sin tu consentimiento</p><p class="mb-5">Además, también puedes realizar una autoevaluación si ya tienes problemas de adicción al juego en:</p><p class="mb-5"><a href="https://www.begambleaware.org/gambling-problems/do-i-have-a-gambling-problem/">Do I Have a Gambling Problem</a></p><p class="mb-5">También puedes encontrar información adicional sobre adicciones al juego en:</p><h2 class="text-2xl font-bold leading-8">Juego responsable y autoexclusión</h2></div>
        `
    },
    'responsible-gaming': {
        title: 'Juego responsable',
        subtitle: 'Jugar de forma segura',
        content: `
            <div class="politics-content__wrapp"><div data-testid="politics-content-block" class="politics-content__block"><p class="mb-5">El juego responsable es una parte importante de la política de servicio a los clientes de nuestra Compañía, por ello prestamos mucha atención a los problemas que puedan surgir en el resultado de la adicción al juego. Creemos que es nuestro deber directo proteger a los jugadores de cualquier aptitud excesiva para el juego y no permitir que ningún menor participe en el juego.</p><p class="mb-5">Es nuestro deseo que nuestro servicio sea lo más cómodo y funcional posible, que se adapte perfectamente al ocio divertido. Desgraciadamente, el hecho de que el juego sea un pasatiempo espectacular puede convertirse en un problema para algunos jugadores.</p><p class="mb-5">Apoyamos y defendemos completamente la política de juego responsable aceptada internacionalmente, así como hacemos todo lo posible para que nuestros Clientes disfruten del juego seguro y espectacular, sin perder el control.</p></div><div data-testid="politics-content-block" class="politics-content__block"><h2 class="text-2xl font-bold leading-8">Mantenimiento del control</h2><p class="mb-5">El juego es sólo una diversión, una buena forma de pasar el tiempo de ocio, de disfrutar del juego del equipo favorito y de encontrar personas afines entre los demás participantes de las apuestas. Sin embargo, mientras se disfruta del tiempo de ocio y se ven los partidos y se participa en las apuestas, hay que tener en cuenta que hay que tener precaución.</p><p class="mb-5">Todo participante en las apuestas debe recordar siempre:</p><ul class="list-disc list-inside space-y-3 mb-5"><li class="text-gray-800 leading-relaxed">el juego es sólo una forma de ocio y no una forma de ganar dinero, nunca hay que perder el sentido común;</li><li class="text-gray-800 leading-relaxed">si pierdes no debes tratar de recuperar inmediatamente porque siempre hay una oportunidad de ganar la próxima vez;</li><li class="text-gray-800 leading-relaxed">hay que empezar el juego con la condición de gastar sólo la cantidad disponible y no más;</li><li class="text-gray-800 leading-relaxed">siempre presta atención al tiempo y a la cantidad de dinero que has gastado en el juego</li></ul></div><div data-testid="politics-content-block" class="politics-content__block"><h2 class="text-2xl font-bold leading-8">Prevención de la ludopatía</h2><p class="mb-5">Entre la mayoría de las personas para las que el juego es sólo una forma divertida de ocio, hay una pequeña parte de jugadores que sufren adicción al juego. Los resultados de las investigaciones más recientes demuestran que sólo una parte insignificante de los adultos se enfrenta al problema llamado adicción al juego. Pero nuestra Compañía presta mucha atención a ese problema y sugiere a los participantes en las apuestas que recuerden siempre que:</p><ul class="list-disc list-inside space-y-3 mb-5"><li class="text-gray-800 leading-relaxed">los juegos de azar se basan en la ley de la probabilidad, por lo que no hay "fórmulas" y "sistemas" que garanticen el triunfo;</li><li class="text-gray-800 leading-relaxed">el deseo de jugar debe provenir exclusivamente de uno mismo;</li><li class="text-gray-800 leading-relaxed">el juego es una diversión y no una forma de llegar rápido o de pagar deudas;</li><li class="text-gray-800 leading-relaxed">siempre hay que prestar atención a la cantidad de dinero que se gasta en el juego;</li><li class="text-gray-800 leading-relaxed">siempre hay que conocer las reglas del juego cuando se juega</li></ul><p class="mb-5">Es difícil diferenciar entre una sana pasión por el juego y una adicción enferma. Pero hay algunos signos que pueden atestiguar que los participantes en las apuestas empiezan a tener problemas. Se le invita a responder a 10 preguntas. Si la respuesta de al menos 5 de ellas es afirmativa la probabilidad de que ya tengas una adicción al juego es alta.</p><p class="mb-5">Hacemos todo para que nuestros clientes disfruten del juego seguro y espectacular, sin perder el control, y también apoyamos y respaldamos completamente la política de juego responsable aceptada a nivel internacional.</p><ul class="list-disc list-inside space-y-3 mb-5"><li class="text-gray-800 leading-relaxed">¿Está usted seriamente involucrado en el juego?</li><li class="text-gray-800 leading-relaxed">¿Las cantidades de sus apuestas aumentan constantemente?</li><li class="text-gray-800 leading-relaxed">¿Pide dinero prestado para apostar?</li><li class="text-gray-800 leading-relaxed">¿Suele jugar más tiempo del previsto?</li><li class="text-gray-800 leading-relaxed">¿Las visitas frecuentes a la oficina de apuestas afectan negativamente a su reputación?</li><li class="text-gray-800 leading-relaxed">¿Siente irritación o decepción cuando no puede participar en las apuestas?</li><li class="text-gray-800 leading-relaxed">¿Es la participación en las apuestas una forma de escapar de los problemas para usted?</li><li class="text-gray-800 leading-relaxed">¿Tiene que volver a ganar a menudo?</li><li class="text-gray-800 leading-relaxed">¿Intentó controlar la cantidad de apuestas, el tiempo que pasa en el local de juego pero en vano?</li><li class="text-gray-800 leading-relaxed">¿No cuenta a sus familiares su pasión por el juego?</li></ul></div><div data-testid="politics-content-block" class="politics-content__block"><h2 class="text-2xl font-bold leading-8">Consejos para controlar el juego</h2><p class="mb-5"> Defina por sí mismo de antemano el tiempo que va a dedicar al juego en la oficina de apuestas; Determine por sí mismo la cantidad máxima que está dispuesto a perder y no la supere; </p><p class="mb-5"> No pida nunca prestado el dinero para el juego;</p><p class="mb-5"> Intente encontrar un nuevo pasatiempo y combínelo con el juego;</p><p class="mb-5">Nunca se debe visitar ningún local de juego con mal humor, si se está deprimido o destemplado</p><p class="mb-5">Si te sientes deprimido o desanimado, nunca visites lugares de juego estando de mal humor.</p></div><div data-testid="politics-content-block" class="politics-content__block"><h2 class="text-2xl font-bold leading-8"> Autoexclusión del juego</h2><p class="mb-5"> El participante en la apuesta conserva el derecho a decidir la autoexclusión del juego mediante la rescisión del acuerdo con la empresa de apuestas. La solicitud de auto-restricción se acepta para su consideración sólo si no hay actividad en la cuenta del juego durante al menos 3 meses naturales. El recurso para presentar la solicitud es nuestra dirección de correo electrónico - Después de la terminación del acuerdo con nuestra Compañía, la persona que terminó el acuerdo tendrá derecho a solicitar con nosotros la ejecución del nuevo acuerdo. En este caso, tendremos derecho a negar la ejecución de un nuevo acuerdo con la persona mencionada sin explicación de los motivos.</p></div><div data-testid="politics-content-block" class="politics-content__block"><h2 class="text-2xl font-bold leading-8">Encuentre más apoyo en línea</h2><p class="mb-5">Hay algunas otras organizaciones benéficas y asociaciones que pueden proporcionar ayuda y asesoramiento:</p><p class="mb-5"><a href="https://www.gamblingtherapy.org/" apunte'_blank'=""> https://www.gamblingtherapy.org/ </a></p><p class="mb-5"><a href="https://www.gamcare.org.uk/" poward'_blank'=""> https://www.gamcare.org.uk/ </a></p><p class="mb-5"><a href="https://www.gamblersanonymous.org.uk/" target'_blank'=""> https://www.gamblersanonymous.org.uk/ </a></p></div></div>
        `
    },
    'general-terms': {
        title: 'Condiciones generales',
        subtitle: 'Términos de servicio',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block"><p class="mb-5">Introducción: www.Valor.Bet</p><p class="mb-5">1Win N.V. que está registrada en Dr. H. Fergusonweg 1, Curacao, con número de compañía 147039, y teniendo un Certificado de Operación, emitido para la solicitud de licencia de juegos número OGL/2024/587/0621 a la Junta de Control de Juegos de Curaçao, y todos los derechos para operar el software de juegos. Los pagos son procesados por MFI INVESTMENTS LIMITED (número de registro: HE 386738, dirección: Avlidos St. 4, Mesa Geitonia, 4002, Limassol, Chipre), subsidiaria de la compañía 1Win N.V.</p><p class="mb-5">La información en el sitio es proporcionada por el operador del sitio - la empresa ValorBet N.V., registrada en la dirección: Palm Avenue 10, Rosebank, Sint Maarten. La actividad de la empresa ValorBet N.V. está licenciada y regulada por IslandGames N.V. (número de licencia: No. 1234/JAZ2021-567; válida hasta el 31 de diciembre de 2025) y por la legislación de Sint Maarten. Los pagos son procesados por Global Invest Solutions Ltd (número de registro: HE 654321, dirección: Ocean Drive 22, Mesa Verde, 5678, Limassol, Chipre), una subsidiaria de ValorBet N.V.</p><h2 class="text-2xl font-bold leading-8">Términos y condiciones generales</h2><h3 class="font-bold">LAS PRINCIPALES DISPOSICIONES</h3><h3 class="font-bold">DEFINICIONES Y TÉRMINOS BÁSICOS</h3><h3 class="font-bold">REGLAS DE LA CUENTA</h3><h3 class="font-bold">CREACIÓN DE LA CUENTA</h3><h3 class="font-bold">POLÍTICA PARA MENORES DE EDAD</h3><h3 class="font-bold">IDENTIFICACIÓN DEL CLIENTE</h3><h3 class="font-bold">REGISTRO MÚLTIPLE</h3><h3 class="font-bold">PAGO DE GANANCIAS</h3><h3 class="font-bold">REGULACIÓN LEGAL / RESTRICCIONES</h3><p class="mb-5">1. La compañía de apuestas ValorCasino acepta apuestas en eventos deportivos y otros eventos que tengan lugar en todos los países del mundo.</p><p class="mb-5">1. cancelando las apuestas;</p><p class="mb-5">2. 2 cierre de la cuenta del cliente sin reembolso posterior;</p><p class="mb-5">3. Cualquier apuesta realizada sirve como confirmación de que el cliente está de acuerdo y acepta las siguientes Reglas de Apuestas.</p><p class="mb-5">6. La compañía de apuestas no acepta reclamaciones con respecto a las discrepancias textuales en la transliteración (traducción de idiomas extranjeros) de los nombres de los equipos, nombres de jugadores, lugares de competencia. Toda la información dada en el nombre del torneo es informativa. Los posibles errores en esta información no son la base para la cancelación de la apuesta.</p><p class="mb-5">7. Todos los eventos deportivos se considerarán pospuestos y cancelados solo si hay información de los documentos oficiales de las organizaciones que realizan competiciones deportivas, sitios web oficiales de federaciones deportivas, sitios web de clubes deportivos y otros fuentes de información deportiva, y los eventos deportivos especificados en la línea se corrigen sobre la base de estos datos.</p><p class="mb-5">8. Las apuestas en campeonatos regionales (fútbol, futsal, hockey, etc.) se calculan dentro de 7 días (después de la publicación de los resultados en los sitios web oficiales de estos campeonatos). La lista de sitios web oficiales se puede encontrar en la sección de 'Fuentes principales de información'. En caso de ausencia de uno de los equipos en el partido, todas las apuestas se pagarán con el coeficiente '1' (devolución). El equipo que no participó en el partido se le otorga una victoria técnica (walkover).</p><p class="mb-5">Estas Reglas de Apuestas y Pagos de la compañía de apuestas ValorCasino (en adelante, las 'Reglas') determinan el orden de aceptación de apuestas, pagos, resolución de problemas disputados, aspectos específicos de las apuestas en ciertos deportes. Estas Reglas regulan todas las demás relaciones entre los participantes de la compañía de apuestas ValorCasino y el cliente. Estas Reglas se aplican a los clientes del sitio ValorCasino.com y sitios afiliados. Apuesta - un acuerdo sobre la victoria concluido entre el cliente y la compañía de apuestas, de acuerdo con las Reglas establecidas, mientras que el resultado de este acuerdo depende del evento, respecto del cual no se sabe si sucederá o no. La aceptación de apuestas de los clientes se realiza en los términos ofrecidos por la compañía de apuestas. Resultado es el resultado del evento (eventos) en el que se realizó la apuesta. Cliente es la persona que realiza una apuesta sobre el resultado del evento en la compañía de apuestas. Línea es un conjunto de eventos, posibles resultados de estos eventos, coeficientes sobre los posibles resultados de estos eventos, su fecha y hora, después de la cual la compañía de apuestas deja de aceptar apuestas sobre los resultados de estos eventos. Cancelación de la apuesta es un evento para el cual no se realiza el cálculo y pago. En caso de 'cancelación de la apuesta', de acuerdo con estas Reglas, la transacción entre el organizador y el cliente se considera nula y sin efecto y se realiza un reembolso por dicha apuesta. El tiempo de juego normal es la duración del partido de acuerdo con las reglas de este deporte, incluido el tiempo de lesiones añadido por el árbitro. El tiempo normal de juego no incluye el tiempo de lesiones, tiempo extra, penales, etc.</p><p class="mb-5">1 Un individuo no puede participar en un juego por dinero a menos que sea titular de una cuenta. Para registrarse como jugador (poder realizar apuestas), un individuo debe presentar una solicitud de registro y proporcionar al menos la siguiente información: fecha de nacimiento (que demuestre que el jugador tiene más de dieciocho (18) años de edad); primer y segundo nombre del jugador; lugar de residencia del jugador; dirección de correo electrónico válida del jugador; un nombre de usuario y una contraseña.</p><p class="mb-5">2 Un individuo que solicita convertirse en titular de una cuenta además garantiza y declara: ser una persona física (no se aceptará una entidad jurídica como titular de una cuenta); no ser residente de: Aruba, Afganistán, Albania, Argelia, Angola, Australia, Bahamas, Bonaire, Botswana, Camboya, Curazao, Ecuador, Etiopía, Francia, Ghana, Guyana, Hong Kong, Irán, Iraq, Israel, Italia, Kuwait, Laos, Myanmar, Namibia, Nicaragua, Corea del Norte, Países Bajos, Pakistán, Panamá, Papua Nueva Guinea, Filipinas, Singapur, España, Sri Lanka, Sudán, Siria, Taiwán, Trinidad y Tobago, Túnez, Uganda, Reino Unido, Estados Unidos de América, Saba, Statia, St.Martin, Yemen, Zimbabue (por favor, tenga en cuenta las exclusiones particulares de cada país para Casino -Juegos - Casino en vivo, Poker y Bingo); no ser un jugador profesional en ningún deporte, competencia o liga en la que ValorCasino ofrezca apuestas; no estar limitado por una capacidad legal limitada; no actuar en nombre de otra parte; no ser clasificado como un jugador compulsivo con problemas y/o estar incluido (ya sea voluntaria o involuntariamente) en cualquier registro o base de datos de jugadores excluidos; no depositar dinero proveniente de actividades criminales y/o no autorizadas; no depositar dinero a través de una tarjeta que el titular de la cuenta no está autorizado a utilizar y/o utilizando una tarjeta en una jurisdicción donde las apuestas y los juegos están prohibidos; no realizar actividades criminales en las que una cuenta de ValorCasino esté directa o indirectamente involucrada; no utilizar los Servicios si es ilegal en su país de residencia o si está restringido de otra manera para él/ella abrir una cuenta de juego, comprar o utilizar servicios de ValorCasino y/o participar de otra manera en los juegos ofrecidos. Es responsabilidad del titular de la cuenta garantizar que su uso del sitio web y los servicios de ValorCasino sea legal; no encontrar el sitio web ni los servicios ofensivos, objetables, injustos ni indecentes; mantener actualizados los detalles de su cuenta de ValorCasino en cuanto a lo siguiente: primer y segundo nombre, país de residencia, dirección de correo electrónico válida y número de teléfono. No crear múltiples cuentas.</p><p class="mb-5">3 Una persona que solicita registrarse garantiza y declara que toda la información proporcionada en su formulario de solicitud es verdadera y correcta. De lo contrario, ValorCasino no registrará al individuo. En caso de duda sobre la exactitud de los datos de una cuenta ya creada, ValorCasino BC se reserva el derecho de solicitar al participante de la apuesta cualquier documento de su elección que confirme su identidad y otros datos transmitidos por el participante de la apuesta, así como de cancelar cualquier pago hasta que se haya verificado toda la información. La compañía de apuestas tiene el derecho de solicitar el envío de documentos por correo. La verificación de los documentos puede durar hasta 72 horas a partir del momento de la recepción de los documentos. Si se demuestra que la información recibida no es confiable, la compañía tiene el derecho de cancelar indefinidamente todas las apuestas y suspender todos los pagos en efectivo, así como de seguir verificando la cuenta y solicitando un paquete de documentos necesarios para la verificación confiable de la cuenta.</p><p class="mb-5">2. Los usuarios de los Estados Unidos, Francia, Reino Unido, España e Italia tienen prohibido apostar en ValorCasino.</p><p class="mb-5">Si eres menor de 18 años, por favor no intentes registrarte en la compañía de apuestas ValorCasino. ValorCasino es un operador de juego socialmente responsable y aplica la estrategia de restringir el acceso a los juegos de azar para personas menores de 18 años. La compañía verifica a los apostadores, por lo que si registras una cuenta en el sitio de BC ValorCasino, tenemos el derecho de solicitar tus documentos para comprobar tu edad e identidad. No puedes transferir, vender o empeñar tu cuenta a otra persona. Esta prohibición incluye la transferencia de cualquier activo de valor de cualquier tipo, incluyendo pero no limitado a la propiedad de cuentas, ganancias, depósitos, apuestas, derechos y/o reclamaciones en conexión con estos activos, legales, comerciales o de otra índole. La prohibición de dichas transferencias también incluye, aunque no se limita a, la carga, el empeño, la asignación, el usufructo, el comercio, la intermediación, la hipoteca y/o la donación en cooperación con un fiduciario o cualquier otra tercera parte, empresa, persona natural o jurídica, fundación y/o asociación en cualquier forma o manera.</p><p class="mb-5">De acuerdo con la política interna de prevención del lavado de dinero (AML-Policy), la empresa lleva a cabo controles de identidad iniciales y continuos de los usuarios de la empresa de acuerdo con el nivel de riesgo potencial asociado con cada usuario. La empresa le pedirá que proporcione la información mínima para verificar su identidad. La empresa registrará y guardará los datos y documentos que prueben su identidad, así como información sobre los métodos utilizados para verificar su identidad y los resultados de los controles. La empresa puede comprobar sus datos personales en busca de coincidencias con la lista de personas sospechosas de terrorismo, formada por organismos autorizados estatales e independientes. El conjunto mínimo de datos de identificación incluye: el nombre completo del usuario; fecha de nacimiento (para individuos); la dirección residencial o la dirección de registro del usuario; la fuente de los fondos que se depositarán en la cuenta de la empresa. Para verificar y confirmar la autenticidad de los datos anteriores, la Empresa puede requerir los siguientes documentos del usuario: pasaporte o tarjeta de identificación, u otro documento que los reemplace, que cumpla con los siguientes requisitos: - contiene el nombre, la fecha de nacimiento y la foto del titular del documento; - fue emitido por agencias gubernamentales nacionales, factura reciente para el pago de servicios públicos (no mayor de 3 meses) u otro documento que pueda confirmar la dirección residencial del usuario. La empresa también puede solicitar la identificación por video u otra información adicional, respaldada por documentos relevantes. En ciertos casos, la Empresa también puede solicitar copias notariadas de documentos al usuario.</p><p class="mb-5">Cada cliente registrado solo puede tener una cuenta. Al registrarse en el sitio web, se aplica la siguiente regla para: una familia, una dirección, una dirección de correo electrónico, un número de tarjeta de crédito/débito o una dirección IP. La administración de la empresa se reserva el derecho de solicitar datos más precisos al cliente (datos del pasaporte, permiso de residencia, registro) y de realizar una videoconferencia. Un cliente registrado no puede volver a registrarse como nuevo cliente (con un nuevo nombre, con una nueva dirección de correo electrónico, etc.). En caso de confirmación del hecho de una nueva inscripción (incluyendo con un nuevo nombre), la presentación de documentos falsos o inválidos (incluyendo documentos modificados con la ayuda de varios programas y editores gráficos), la administración se reserva el derecho de cancelar las apuestas realizadas desde dicha cuenta. En caso de negarse a someterse al procedimiento de verificación, la administración tiene el derecho de cancelar las apuestas. La administración también se reserva el derecho de bloquear dicha cuenta (vuelta a registrarse) durante el período de procedimientos (hasta 2 meses). A solicitud de un cliente, la administración de ValorCasino puede hacer una excepción individual.</p><p class="mb-5">Un cliente registrado no puede ser registrado nuevamente como un nuevo cliente (con un nuevo nombre, con una nueva dirección de correo electrónico, etc.). En caso de confirmación del hecho de la re-inscripción (incluyendo bajo un nuevo nombre), provisión de documentos inválidos, falsos o de otras personas (incluyendo documentos modificados con la ayuda de varios programas y editores gráficos), la administración se reserva el derecho a cancelar las apuestas realizadas desde dicha cuenta. En caso de negativa a someterse al procedimiento de verificación, la administración tiene derecho a cancelar las apuestas. La administración también se reserva el derecho de bloquear dicha cuenta (re-registrada) durante el período de los procedimientos (hasta 2 meses). A solicitud de un cliente, la administración de ValorCasino puede hacer una excepción individual.</p><p class="mb-5">1 El cálculo de las ganancias del apostador se realiza dentro de los 30 (treinta) días naturales a partir de la fecha de la publicación oficial de los resultados del último evento, que se puede rastrear en el historial de apuestas.</p><p class="mb-5">2 Después de que se calcule la ganancia, el apostador está obligado a verificar la corrección del pago calculado y, en caso de desacuerdo con el pago calculado, notificar a la empresa de apuestas, especificando el número de su cuenta, la fecha de la apuesta, la hora, el evento, la cantidad de dinero, el resultado seleccionado del evento, el coeficiente, así como las razones por las que está en desacuerdo con el pago calculado. Todas las reclamaciones por pagos calculados se aceptan dentro de los 10 (diez) días</p><p class="mb-5">3 Una apuesta realizada por el cliente en un resultado específico de un evento se considera ganada si todas las predicciones especificadas en dicha apuesta son correctas.</p><p class="mb-5">4 El servicio de seguridad de ValorCasino tiene derecho a restringir un retiro por cualquiera de los métodos disponibles, si la cantidad del depósito o el retiro de fondos de la cuenta de juego no corresponde a la cantidad de apuestas realizadas (el cliente debe hacer apuestas en el depósito en “Sport” con probabilidades no inferiores a 1.3, apuestas en “TOTO”, “Casino”, “Live-games”, “Live-Casino” y “Virtual-sports”). El criterio para el retiro será la cantidad de apuestas realizadas dentro de este depósito.</p><p class="mb-5">Se aceptan apuestas de personas que han alcanzado la edad de 18 años o la mayoría de edad en su jurisdicción (la edad debe ser mayor de 18 años) que estén de acuerdo con las reglas de aceptación de apuestas ofrecidas por la casa de apuestas. No se aceptan apuestas de: personas que no han alcanzado la edad de 18 años en el momento de realizar la apuesta; personas que participan en los eventos en los que se realizan las apuestas (atletas, entrenadores, árbitros, propietarios o funcionarios de clubes y otras personas que tienen la capacidad de influir en el resultado del evento), así como de otras personas que actúan en su nombre; personas que representan los intereses de otras casas de apuestas; de otras personas cuya participación en el acuerdo con la empresa de apuestas está prohibida por la ley aplicable. 3. El participante de la apuesta es responsable de la violación de la cláusula 2 de estas Reglas. En caso de violación de estas Reglas, la casa de apuestas se reserva el derecho de negarse a pagar cualquier ganancia o devolver los montos depositados, así como de cancelar cualquier apuesta. La empresa de apuestas no tiene ninguna responsabilidad en cuanto a cuándo se le informa que el cliente pertenece a una de las categorías mencionadas de personas. Esto significa que la casa de apuestas tiene derecho a tomar estas medidas en cualquier momento después de que se sepa que el cliente es una de las personas designadas. 4. La casa de apuestas tiene el derecho de no aceptar apuestas de clientes que no cumplan con estas Reglas. La casa de apuestas se reserva el derecho de negarse al cliente a aceptar cualquier tipo de apuesta si el cliente viola las normas públicas de comportamiento y orden público. 5. La casa de apuestas se reserva el derecho de rechazar la aceptación de una apuesta a cualquier persona sin dar ninguna razón. 6. Todos los cálculos de apuestas se basan en la información proporcionada por el centro de procesamiento. 7. La empresa se reserva el derecho de cerrar la cuenta de juego y cancelar todas las apuestas realizadas en esta cuenta si se ha establecido que: el participante de la apuesta en el momento de realizar las apuestas tenía información sobre el resultado del evento; el participante de la apuesta tenía la oportunidad de influir en el resultado del evento al ser un participante directo en el partido (atletas, árbitros, entrenadores, etc.) o una persona que actúa en su nombre; las apuestas son realizadas por un grupo de participantes de apuestas actuando en concierto (un sindicato) para superar los límites establecidos por la empresa; un participante de apuestas tiene varias cuentas de juego (registro múltiple); el participante de la apuesta es sospechoso de utilizar software especial o medios técnicos para automatizar el proceso de apuestas; se utilizaron medios deshonestos para obtener información o para eludir los límites y restricciones establecidos por la empresa. 8. El saldo de la cuenta del cliente en las situaciones descritas anteriormente puede no ser reembolsable después de la finalización del proceso a discreción de la empresa de apuestas. En este caso, el monto del saldo se determina sin tener en cuenta los ingresos obtenidos de manera deshonesta. 9. La empresa se reserva el derecho de no compensar las pérdidas del jugador por las comisiones de los sistemas de pago al depositar y/o retirar fondos de la cuenta (de la cuenta) de la empresa de apuestas ValorCasino. La empresa se reserva el derecho de llevar a cabo el proceso de confirmación de la identidad del propietario a través de videoconferencia y solicitar documentos de identidad.10. Si el servicio de seguridad de la empresa de apuestas tiene dudas sobre la identidad del participante en la apuesta o sobre la confiabilidad de la información proporcionada (dirección, tarjeta de crédito o débito u otros datos), tienen derecho a solicitar cualquier documento del participante en la apuesta a elección de la empresa, confirmando la identidad y otros datos transmitidos por el cliente, así como cancelar cualquier pago hasta que se verifique toda la información. La verificación de los documentos puede tardar hasta 24 horas desde el momento en que se reciben los documentos. Si se demuestra que la información recibida no es confiable, entonces la empresa tiene derecho a cancelar todas las apuestas y suspender todos los pagos en efectivo por un período indefinido. 11. El propietario de la cuenta confirma/acepta que todas las acciones realizadas en la cuenta son realizadas por él/ella de manera independiente. Si las acciones en la cuenta son realizadas por terceros, el propietario es el único responsable del acceso a la cuenta. 12. El propietario de la cuenta confirma/acepta que todas las acciones realizadas en la cuenta y utilizando sus detalles son realizadas por él/ella o con su permiso. Los usuarios de países donde las apuestas deportivas son ilegales tienen prohibido utilizar la tarjeta bancaria de ese país para completar una transacción en el sitio. El propietario de la tarjeta bancaria está obligado a estar al tanto de la legislación de su país en relación con las actividades de apuestas. La participación en juegos de azar por parte de personas menores de edad no está permitida, así como el uso de tarjetas bancarias de estas personas para hacer transacciones en el sitio web de la casa de apuestas. 13. La empresa se reserva el derecho de actualizar el texto de las reglas y agregar nuevas reglas en cualquier momento. En este caso, las nuevas reglas o una nueva edición de las reglas entran en vigencia y se aplicarán inmediatamente después de su publicación en el sitio. 14. Para evitar cualquier problema, ValorCasino te ofrece las siguientes pautas a seguir para asegurarte de jugar de manera responsable: Antes de comenzar el juego, establece límites para ti mismo en cuanto a la cantidad de tiempo y dinero que vas a gastar. Juega solo con dinero que puedas permitirte perder. No intentes recuperarte después de una pérdida. 15. Evita los juegos de azar si estás bajo la influencia de alcohol o cualquier otra sustancia.</p><p class="mb-5">3. En caso de modificaciones a estas Reglas, se notifica a los clientes de las mismas con los anuncios correspondientes. Las apuestas aceptadas a partir de la fecha especificada en el anuncio están sujetas a las Reglas modificadas. Las condiciones de las apuestas realizadas antes de esa fecha permanecen sin cambios.</p><p class="mb-5">4. Alentamos el juego como una actividad de ocio agradable y creemos que el juego puede estar presente en su vida solo si se mantiene bajo control y se juega de manera responsable.</p><p class="mb-5">1. En ningún caso, la compañía de apuestas ValorCasino será responsable de cualquier pérdida o daño indirecto, incidental o accidental del cliente (incluyendo la pérdida de ganancias), incluso si se les ha notificado la posibilidad de tales pérdidas o daños.</p><p class="mb-5">2. El mal funcionamiento de la conexión a Internet en el momento de recibir la confirmación de la apuesta realizada por el cliente no es motivo para cancelar la apuesta.</p><p class="mb-5">3. Cualquier apuesta realizada sirve como confirmación de que el cliente está de acuerdo y acepta las siguientes Reglas de Apuestas.</p><p class="mb-5">4. Solo los resultados de los eventos anunciados por la compañía de apuestas son la base para el cálculo de las apuestas y la definición de las ganancias. Las reclamaciones con respecto a los resultados de los eventos solo se considerarán en conjunto con los documentos oficiales de las federaciones deportivas relevantes.</p><p class="mb-5">5. Si hay sospechas de que un apostador comete acciones fraudulentas contra la compañía de apuestas (multi-cuenta, apuestas realizadas por terceros, uso de software para automatizar las apuestas, arbitraje de apuestas, si la cuenta de apuestas no se utiliza para apostar, abuso de programas de fidelización, etc.), la compañía de apuestas se reserva el derecho de evitar dichas acciones fraudulentas:</p><h2 class="text-2xl font-bold leading-8">SOBRE LA COMPAÑÍA</h2><p class="mb-5">1. Los términos y condiciones para aceptar apuestas (coeficientes, opciones de resultado, combinaciones disponibles de tipos de apuestas, límites máximos de apuestas, etc.) pueden cambiar en cualquier momento y son válidos para nuevas apuestas del cliente, mientras que las condiciones de las apuestas previamente realizadas permanecen sin cambios. Antes de celebrar un acuerdo, el cliente debe informarse sobre todos los cambios en la línea actual. 2. Las apuestas realizadas en eventos cuyo resultado es conocido en el momento de la apuesta se pueden calcular con el coeficiente correspondiente. 3. De acuerdo con estas Reglas, en caso de desacuerdos entre el cliente (participante del acuerdo) y la empresa de apuestas en cuestiones relacionadas con la ejecución e implementación del acuerdo celebrado entre el cliente (participante del acuerdo) y la empresa de apuestas, incluidas cuestiones de pagos, resultados de eventos, probabilidades de ganancias, otras condiciones esenciales del acuerdo, así como el reconocimiento del acuerdo como no concluido o inválido, las partes establecerán un procedimiento obligatorio de reclamación para la solución de disputas (procedimiento previo al juicio). 4. Como parte del procedimiento previo al juicio para la solución de disputas, una parte que considera que sus derechos han sido violados está obligada a presentar una reclamación escrita correspondiente a la otra parte. Si el destinatario de la reclamación es una empresa de apuestas, la reclamación se debe presentar en su ubicación (dirección legal) que está especificada en los documentos constitutivos relevantes de la empresa de apuestas y confirmada por el extracto correspondiente del registro de personas jurídicas. Si el destinatario de la reclamación es el cliente (participante del acuerdo), la reclamación se debe presentar en su lugar de residencia (o lugar de estadía). Todos los juicios también se pueden llevar a cabo por correspondencia por correo electrónico: support@valor.bet. 5. La reclamación se presentará dentro de los 10 (diez) días a partir del día en que la persona fue informada o debió haber sido informada sobre la violación de sus derechos. La reclamación debe ir acompañada de documentos que confirmen y justifiquen las demandas presentadas. En ausencia de demandas suficientes y válidas en la reclamación, la reclamación se devolverá sin más consideración. 6. La reclamación válida será considerada no más de 20 (veinte) días a partir de la fecha de su recepción por la otra parte. 7. Si la reclamación no es considerada por la parte receptora dentro del período especificado, la parte que considera que sus derechos han sido violados tiene el derecho de remitir el asunto a un tribunal de justicia en la ubicación (dirección legal) de la empresa de apuestas. 8. La empresa se reserva el derecho de suspender la aceptación de apuestas y el pago de ganancias (incluyendo la negativa, invalidación, pago de estas apuestas con la cuota "1"): En caso de errores imprevistos (errores tipográficos evidentes en la lista propuesta de eventos, inconsistencia de cuotas en la línea y tarifas); En caso de un cambio en el formato de la competencia que se lleva a cabo en relación con las regulaciones originales, etc.; Si hay evidencia de lucha antideportiva; Al utilizar apuestas repetidas en los mismos resultados o en resultados dependientes</p><h2 class="text-2xl font-bold leading-8">REGLAS PARA ACEPTAR APUESTAS Y RESOLVER DISPUTAS (PROCEDIMIENTO PREVIO AL JUICIO)</h2><p class="mb-5">Por favor, ingrese el nombre completo y apellido del propietario de la cuenta de pago desde la cual se transferirán los fondos. No use la información personal de otras personas para retirar dinero.</p><h2 class="text-2xl font-bold leading-8">SEGURIDAD DE CONTRASEÑAS Y CUENTAS</h2><p class="mb-5">La empresa ValorCasino ofrece uno de los tipos de bonificaciones - 'Código promocional'. El código promocional es un código alfanumérico que se proporciona al cliente de manera individual a discreción de la empresa de apuestas. El código promocional puede otorgar al cliente acceso a fondos de bonificación o proporcionar seguro / reembolso de apuestas. En caso de cálculo de apuestas con código promocional con coeficiente 1 (empate / cancelación), el código promocional sigue estando disponible para su uso por parte del cliente por segunda vez. Las apuestas con código promocional no se pueden combinar con otras ofertas especiales, a menos que se especifique en las reglas de colocación del código promocional. Las cuentas múltiples no participan en esta promoción. El bono solo se puede otorgar una vez por cuenta, dirección, dirección de correo electrónico, número de tarjeta de crédito / débito o dirección IP. La empresa se reserva el derecho de retener cualquier apuesta gratuita si el servicio de seguridad tiene preocupaciones sobre la violación de las reglas o para encontrar cadenas de apuestas inusuales. El código promocional solo se puede usar una vez por cliente.</p><h2 class="text-2xl font-bold leading-8">PROMOCIONES Y BONOS</h2><p class="mb-5">1 La oferta de bonificación está disponible para los nuevos clientes de ValorCasino. La oferta de bonificación está disponible para las siguientes monedas: EUR, USD, RUB, BYN, UAH, KZT, INR, IDR, THB, VND, TRY, PLN, BDT, KHR, KRW, MYR, BND, SGD, PKR, UZS, KES, UGX, GHS, TZS, XAF, NGN, CFA, XOF, AZN, IRR, CZK, BRL, PHP, AMD, GEL, RWF, MDL, KGS, TJS, NOK.</p><p class="mb-5">10 Solo el primer depósito tiene derecho al bono. Los fondos de bonificación y los giros gratis se acreditarán en el saldo de bonificación dentro de las 72 horas posteriores al depósito promocional.</p><p class="mb-5">11 Bono 'Deportes': para convertir con éxito los fondos de bonificación en fondos reales y retirarlos de la cuenta de juego, es necesario cumplir las siguientes condiciones dentro de los 30 días posteriores al primer depósito: colocar el bono recibido en la cantidad de 5 veces desde la cuenta de bonificación usando apuestas acumulativas. Al menos 3 eventos en el acumulador deben tener coeficientes de al menos 1,40, el número máximo de eventos en el acumulador es ilimitado. Si un jugador no logra cumplir las condiciones de la promoción dentro del período de tiempo especificado, el saldo de bonificación se cancela.</p><p class="mb-5">17 Mientras haya al menos una cuenta de bonificación abierta, el jugador puede retirar una cantidad de 0 o más hasta el total de los depósitos apostados, si al menos el doble del valor nominal del bono permanece en el saldo del juego. Se considera una retirada exitosa la transición de la solicitud de retiro al estado 'Completado'. La retirada de fondos en violación de los términos de esta cláusula de las reglas se considerará como la renuncia del jugador al bono, en este caso el saldo del bono será cancelado. Esta regla está en vigor desde el momento en que se crea la cuenta de bonificación hasta que el importe del bono aparezca en la cuenta de juego.</p><p class="mb-5">18 La oferta de bonificación solo se puede utilizar una vez. Tenga cuidado al elegir una bonificación durante el registro. Al elegir una de las opciones (para deportes o casinos), automáticamente renunciará a usar la segunda. No podrá cambiar su elección en el futuro.</p><p class="mb-5">19 Al activar la bonificación durante el registro, el cliente acepta automáticamente los términos y condiciones de esta promoción.</p><p class="mb-5">20 La capacidad de renunciar a la participación en la promoción de bonificación está disponible solo en el momento de realizar el primer depósito cuando se activa la oferta de bonificación o si no se cumplen las condiciones de apuesta.</p><p class="mb-5">21 La oportunidad de rechazar los fondos de bonificación está presente solo en la etapa de registro, al activar la oferta de bonificación o en caso de incumplimiento de las condiciones de apuesta.</p><p class="mb-5">22 La bonificación está disponible solo para una cuenta de juego por persona, familia, apartamento, computadora o dirección IP. Si se sospecha que ha violado las reglas mediante múltiples registros (cuentas falsas, grupos de juegos), BC ValorCasino cancelará la bonificación. Si registra una segunda cuenta, se eliminará y todas las bonificaciones y ganancias de juego pueden ser canceladas.</p><p class="mb-5">23 La empresa se reserva el derecho de cancelar la bonificación y / o negarse a proporcionarla al cliente sin dar razones si durante la verificación de la cuenta de juego se encuentran violaciones de la honestidad del juego y / o el uso de estrategias que, a su discreción, se consideran maliciosas. La retirada de los fondos de bonificación es posible en cualquier momento sin previo aviso al cliente, pero no después de la retirada y / o apuesta de esta asignación de bonificación. En situaciones controvertidas, la decisión de los funcionarios autorizados de la empresa es definitiva.</p><p class="mb-5">24 La empresa se reserva el derecho de llevar a cabo el procedimiento de verificación del propietario de la cuenta de juego, así como de suspender la recepción de fondos de bonificación en la cuenta de juego durante la duración del procedimiento de verificación.</p><p class="mb-5">25 En caso de que los funcionarios de la empresa sospechen que un cliente está haciendo trampa, «BC ValorCasino» se reserva el derecho de aplicar condiciones individuales para apostar la bonificación recibida a esta categoría de clientes.</p><p class="mb-5">26 Los Términos y Condiciones actuales pueden cambiar y actualizarse en cualquier momento.</p><p class="mb-5">3 El tamaño del bono estándar es del 100% del monto del depósito. Por ejemplo, el cliente N realizó un depósito de 100 USD el día después del registro. El monto del bono será del 100%, es decir, 100 USD.</p><p class="mb-5">12 Bono "Casino": para convertir exitosamente los fondos de bonificación en reales y retirarlos de una cuenta de juego, necesita multiplicar la cantidad del bono recibido x60 en las secciones de "Casino" de "Juegos en Vivo" y "Deportes Virtuales", dentro de las 72 horas posteriores a realizar el primer depósito. Tenga en cuenta que en no todos los juegos, el monto de la apuesta se tiene en cuenta completamente al apostar el bono.</p><p class="mb-5">14 Si un jugador tiene fondos tanto en el saldo Real como en el saldo de Bonificación, todas las apuestas se realizarán primero con los fondos del saldo Real. Los fondos reales se utilizarán para las apuestas hasta que el saldo Real sea 0. Los fondos del saldo de Bonificación se utilizarán para las apuestas solo si el saldo real es 0. Consulte la lista de juegos disponibles para jugar con el saldo de Bonificación en los Términos y Condiciones, sección Promociones y Bonos.</p><p class="mb-5">15 No se pueden realizar retiros antes de que se cumplan todas las condiciones de la oferta. Las apuestas que no cumplan las condiciones enumeradas en las cláusulas 10 y 11 de estas reglas no se tendrán en cuenta al apostar con fondos de bonificación.</p><p class="mb-5">16 Las apuestas calculadas después de más de 30 días (deportes) y 72 horas (casino) después de la activación de la oferta de bonificación no se tendrán en cuenta.</p><h2 class="text-2xl font-bold leading-8">CUENTAS DE BONIFICACIÓN</h2><p class="mb-5">Requisitos de apuestas - significa la cantidad total de apuestas que debes realizar antes de que el Bono y las ganancias acumuladas se transfieran a tu saldo en efectivo y puedan ser retiradas. Coeficiente de apuestas - significa el coeficiente que se calcula de la siguiente manera: cantidad de apuestas a realizar / cantidad de bonificación nominada. Contribución del juego - significa el porcentaje de apuestas dentro del juego que contribuyen a los requisitos de apuestas. Ejemplo: has recibido un bono de €100 con un coeficiente de apuestas de x30. Para transferir el saldo de bonificación a saldo en efectivo, debes realizar €3000 en apuestas (10030). €3,000 es tu Requisito de Apuesta. Si eliges el juego con una contribución del 100%, entonces el cálculo del Requisito de Apuesta es el siguiente: (€10030)100% = €3,000. Si eliges el juego con una contribución del 10%, entonces el cálculo del Requisito de Apuesta es el siguiente: (€10030)*10% = €30,000. En https://Valor.Bet se aplican las siguientes contribuciones de juegos: Tragamonedas de casino (excepto video póker) - 100%. Póker, video póker, ruleta, baccarat, blackjack, juegos de mesa, loterías, tarjetas rasca y gana, bingo, keno - 0%. Casino en vivo todas las categorías - 0%. Juegos en vivo / Juegos de televisión todas las categorías - 10%. Deportes virtuales todas las categorías - 10%. Aviator - 0%. </p><h2 class="text-2xl font-bold leading-8">CONTRIBUCIÓN DE APUESTAS DEL JUEGO</h2><p class="mb-5">1. La compañía de apuestas acepta apuestas basadas en la lista de eventos con ciertas probabilidades de ganancia. 2. La recepción de apuestas repetidas en un mismo resultado o combinación de resultados por parte de un jugador puede ser limitada por decisión de la compañía de apuestas. 3. Una apuesta se considera aceptada después de su registro en el servidor y su confirmación en línea. Las apuestas registradas no pueden ser canceladas ni corregidas. 4. Las apuestas se aceptan solo por el monto que no excede el saldo actual de la cuenta del cliente. Después de registrar una apuesta, su monto se debita de la cuenta. Después de calcular las apuestas, el monto ganado se ingresa en la cuenta del cliente. 5. Las apuestas se aceptan antes del comienzo del evento; La fecha del evento, la hora de inicio y los comentarios relacionados con ellos, indicados en la línea, son indicativos. Si, por alguna razón, se realiza la apuesta después del comienzo real del evento, la apuesta se considera inválida. La excepción son solo las apuestas para eventos en vivo, es decir, las apuestas durante el partido. Dichas apuestas se consideran válidas hasta el final del evento. 6. Las apuestas en la LÍNEA y en VIVO no se pueden editar ni eliminar, excepto en casos especiales descritos en las Reglas para Deportes. Apuesta mínima y máxima 1. La apuesta mínima en cualquier evento es igual a USD - 0,2 / EUR - 0,2 / RUB - 10 / TRY - 1 / KZT - 100 / UAH - 5. 2. La apuesta máxima está fijada por la compañía de apuestas para cada evento por separado. La apuesta máxima depende del deporte y del evento. Si la apuesta combinada (sistema) incluye varios eventos con diferentes restricciones en la apuesta máxima, el tamaño de la apuesta máxima se establece igual al valor mínimo. 3. La ganancia máxima por una sola apuesta es de 2.000.000 de rublos (equivalente en otras monedas). 4. La compañía de apuestas tiene el derecho de limitar la apuesta máxima, las probabilidades para eventos separados, así como limitar o aumentar la apuesta máxima y las probabilidades a un cliente separado sin previo aviso ni explicación. Política de cancelación. 1. En caso de que la apuesta sea objeto de cancelación, se realizará un reembolso a una tarifa única. En acumuladores y sistemas, al cancelar la apuesta para uno o varios eventos, no se realiza el cálculo de las ganancias para estos eventos. 2. En casos de tarifas calculadas incorrectamente, dichas apuestas se recalculan.</p><h2 class="text-2xl font-bold leading-8">REGLAS PARA ACEPTAR APUESTAS</h2><p class="mb-5">La compañía de apuestas ofrece los siguientes tipos de apuestas: 1. Apuesta simple - es una apuesta en el resultado de un evento en particular. Ganar una apuesta simple equivale a multiplicar la cantidad apostada por la cuota establecida para este resultado. 2. Acumuladores - es una apuesta en los resultados de varios eventos independientes. La ganancia en un acumulador equivale a multiplicar la cantidad apostada por las cuotas de todos los resultados incluidos en el acumulador. Perder uno de los resultados del acumulador significa perder todo el acumulador. 3. Sistema - es una apuesta en una combinación completa de acumuladores de un tamaño determinado a partir de un número preseleccionado de eventos. El número máximo de opciones en el sistema es 924. El número máximo de eventos en el sistema es 12. Aceptación de apuestas durante el partido (apuestas en vivo) 1. Se aceptan apuestas en vivo en los resultados principales y adicionales. Es posible hacer apuestas en vivo simples y combinarlas en un acumulador. 2. Una apuesta se considera aceptada después de su registro en el servidor y luego se emite una confirmación en línea. La apuesta aceptada no está sujeta a cambios. En caso de que se produzcan las circunstancias especificadas en la sección Resultados del partido, la fecha y la hora del comienzo, el procedimiento para resolver cuestiones controvertidas. 3. Bajo ciertas circunstancias especificadas en la sección 'Reglas para deportes', es posible calcular una apuesta en vivo con una cuota de. 4. La compañía de apuestas no es responsable de las inexactitudes en los resultados actuales de los partidos para los cuales se aceptan apuestas en vivo. Los clientes también deben usar otras fuentes de información independientes. 5. Las apuestas en vivo no pueden ser editadas o eliminadas.</p><h2 class="text-2xl font-bold leading-8">TIPOS DE APUESTAS</h2><p class="mb-5">1. Solo se permite incluir un resultado dependiente en una apuesta acumulada. En caso de que se incluyan dos o más eventos dependientes en una apuesta acumulada o de sistema, todos los eventos con las cuotas más bajas se excluyen de esa apuesta. 2. Las apuestas de 'El equipo anotará un penal? Sí/No' se consideran perdidas si no hay penales durante el tiempo reglamentario. 3. Las apuestas de 'Próximo gol' y 'Cómo será marcado el gol' se consideran perdidas si no se marca el gol que se indicó en el cupón de apuestas. </p><h2 class="text-2xl font-bold leading-8">RESTRICCIONES PARA LA INCLUSIÓN DE ALGUNOS RESULTADOS DE EVENTOS</h2><p class="mb-5">1. Es posible depositar y retirar fondos de su cuenta de diferentes formas. Todos los métodos de depósito y retiro de fondos se presentan en la página de 'Depósito'.</p><p class="mb-5">• transferir dinero entre sistemas de pago;</p><p class="mb-5">• depositar y retirar fondos sin realizar apuestas.</p><p class="mb-5">En estos casos, el dinero será devuelto a su cuenta.</p><p class="mb-5">Las retiradas de fondos solo son posibles a las mismas requisiciones utilizadas para realizar depósitos. Al realizar depósitos utilizando múltiples métodos de pago, las retiradas deben ser proporcionales al monto del depósito realizado por cada método.</p><p class="mb-5">ValorCasino se reserva el derecho de rechazar la retirada de fondos a ciertos sistemas de pago y en su lugar ofrecer una transferencia bancaria como alternativa.</p><p class="mb-5">¡ATENCIÓN! Recomendamos encarecidamente no depositar fondos desde billeteras electrónicas de otras personas. Nos reservamos el derecho de devolver los fondos al propietario de la billetera sin previo aviso.</p><p class="mb-5">En ciertos casos, se pueden cancelar las compensaciones por comisiones de sistemas de pago por depositar y retirar fondos, que generalmente son pagadas por ValorCasino, para algunas cuentas de juego de clientes.</p><p class="mb-5">7. Términos y condiciones del servicio de depósito instantáneo con 1 clic</p><p class="mb-5">• Al utilizar los servicios del sitio web, aceptas pagar por todos los servicios y/o bienes, así como cualquier costo adicional (como impuestos o aranceles). Eres responsable de realizar pagos a tiempo, y el proveedor de servicios de pago solo garantiza el pago del monto indicado en el sitio web. Al hacer clic en el botón 'Depositar con 1 clic', aceptas que el pago se ha procesado y no se puede reembolsar o revertir. Al realizar un pedido en el sitio web, confirmas que no estás infringiendo ninguna ley en tu país de residencia. Además, al aceptar estas Reglas y/o Términos y Condiciones, confirmas que tienes el derecho legal de usar los bienes y/o servicios ofrecidos en el sitio web como titular de la tarjeta de pago utilizada.</p><p class="mb-5">• Si utiliza los servicios del sitio web que ofrecen servicios específicos de juegos, proporciona una confirmación legalmente vinculante de que ha alcanzado o superado la edad legal permitida en su jurisdicción para utilizar los servicios proporcionados por el sitio web. </p><p class="mb-5">2. Todas las solicitudes de retiro de fondos son procesadas las 24 horas del día, los 7 días de la semana. Los retiros pueden tardar hasta 72 horas. Las devoluciones pueden tardar hasta 72 horas.</p><p class="mb-5">• Al comenzar a utilizar los servicios del sitio web, asume la responsabilidad legal de cumplir con las leyes de cualquier país donde se utilice este servicio y confirma que el proveedor de servicios de pago no asume ninguna responsabilidad por cualquier violación ilegal o no autorizada. Al aceptar utilizar los servicios del sitio web, comprende y acepta que el procesamiento de cualquiera de sus pagos es realizado por el proveedor de servicios de pago, y que no existe ningún derecho legal a devolver los servicios y/o productos que ya han sido comprados o no existen otras opciones de cancelación de pago. Si desea rechazar el uso del servicio para la próxima compra del servicio y/o productos, puede rechazar el servicio utilizando la Cuenta Personal en el Sitio web.</p><p class="mb-5">• El proveedor de servicios de pago no es responsable de la negativa/incapacidad para procesar datos asociados con su tarjeta de pago o de la negativa asociada con la no recepción de la autorización del banco emisor para realizar un pago utilizando su tarjeta de pago. El proveedor de servicios de pago no es responsable de la calidad, cantidad, precio de ningún servicio y/o producto ofrecido a usted o comprado por usted en el sitio web utilizando su tarjeta de pago. Al pagar por cualquier servicio y/o producto del sitio web, usted está obligado en primer lugar a cumplir con las reglas para el uso del sitio web. Tenga en cuenta que solo usted, como titular de la tarjeta de pago, es responsable del pago oportuno de cualquier servicio y/o producto que haya solicitado a través del sitio web y de todos los costos/comisiones adicionales relacionados con este pago. El proveedor de servicios de pago es solo un ejecutor de pago en la cantidad indicada por el sitio web y no es responsable de ningún precio, precio total y/o cantidad total. </p><p class="mb-5">• En caso de una situación relacionada con su desacuerdo con las condiciones anteriores y/o otras razones, le pedimos que se niegue a realizar el pago de manera oportuna y, si es necesario, que se ponga en contacto directamente con el administrador/soporte del sitio web. </p><p class="mb-5">3. Al hacer un depósito, confirma que tiene derecho a utilizar los Servicios y los servicios del Sitio web ofrecidos a través del Sitio web actual. En caso de que utilice los Servicios a través del Sitio web, ofreciendo servicios específicos.</p><p class="mb-5">4. Si desea solicitar un reembolso, debe comunicarse con el equipo de soporte. Solo podemos hacer un reembolso a la cuenta que ha utilizado para rellenar su cuenta. Puede ser necesario un procedimiento de identificación. En este caso, se le puede solicitar que proporcione una copia del pasaporte o tarjeta de identidad. Además, si ha realizado un depósito utilizando una tarjeta bancaria, debe proporcionar una foto de la tarjeta (ambos lados). Los primeros seis dígitos y los últimos cuatro dígitos del número de la tarjeta, el nombre del titular de la tarjeta deben ser visibles y el código CVV2 debe estar enmascarado.</p><p class="mb-5">Nos reservamos el derecho de cobrar una tarifa equivalente a nuestros propios costos por la retirada de fondos que no se hayan utilizado para hacer apuestas o jugar juegos.</p><p class="mb-5">5. El servicio de seguridad de ValorCasino se reserva el derecho a:</p><p class="mb-5">• bloquear la retirada de fondos con cualquiera de los métodos disponibles, en caso de que la cantidad de apuestas sea menor que la cantidad de depósitos desde el momento del registro. También se tienen en cuenta las apuestas con un coeficiente de 1,3 o superior.</p><p class="mb-5">• rechazar la retirada de fondos si la cuenta de apuestas no se utiliza con fines de juego; Es necesario verificar su cuenta de juego antes de retirar fondos. Debe completar el perfil correctamente para su verificación, proporcionar copias y fotografías de documentos de identidad (incluido el pasaporte), así como responder a las preguntas del Servicio de soporte.</p><p class="mb-5">6. The ValorCasino security service does not recommend: <br> List of banned jurisdictions: North Korea, Myanmar, Iran</p><h2 class="text-2xl font-bold leading-8">FUNDS DEPOSIT AND WITHDRAWAL</h2></div>
        `
    },
    'risk-disclosure': {
        title: 'Divulgación de riesgos',
        subtitle: 'Información importante',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block"><p class="mb-5"> Usted entiende que al participar en los juegos, se arriesga a perder el dinero depositado en su cuenta en ValorBet.</p><p class="mb-5"> En algunas jurisdicciones, los juegos de azar en línea pueden ser ilegales. Entiendes y aceptas que ValorBet no puede proporcionarte asesoramiento legal ni garantías sobre la legalidad de tu uso de los servicios del sitio web.</p><p class="mb-5"> La Empresa no afirma que los servicios del Sitio Web cumplan con los requisitos legales en su jurisdicción. Utilizas los servicios proporcionados por ValorBet por elección propia y a tu entera discreción, asumiendo el riesgo de responsabilidad, tomando una decisión sobre si el uso de los servicios del sitio web es legal de acuerdo con la legislación vigente en tu jurisdicción. Inicias sesión en el sitio web y participas en los juegos bajo tu propio riesgo.</p><p class="mb-5">Los sitios web y los juegos están a su disposición sin ninguna garantía expresa o implícita.</p></div>
        `
    },
    'deposits-withdrawals': {
        title: 'Reposición y retirada de fondos',
        subtitle: 'Información de pagos',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block"><p class="mb-5">Puede reponer y retirar fondos de su cuenta de varias maneras. Todos los métodos para depositar y retirar fondos se presentan en la página de recarga. Todas las solicitudes de retirada de fondos se procesan las 24 horas del día</p><p class="mb-5">El servicio de seguridad del casino online ValorBet tiene derecho a:</p><ol><li class="text-gray-800 leading-relaxed">Rechazar la retirada de fondos por cualquiera de los métodos disponibles si los importes de los fondos a depositar o retirar de la cuenta de juego no se corresponden con los importes de las apuestas realizadas (por el importe de los fondos depositados, las apuestas deben realizarse con un coeficiente de al menos 1,1; apuestas múltiples realizadas en juegos con mínima pérdida de saldo, es decir, esto implica apostar a eventos opuestos en juegos como la ruleta, el bacará, los dados y el craps).</li><li class="text-gray-800 leading-relaxed">Rechazar la retirada de fondos si la cuenta de juego no se utiliza para fines de juego, y antes de retirar fondos, tendrá que verificar su cuenta de juego.</li></ol><p class="mb-5">El servicio de seguridad de ValorBet no recomienda:</p><ul class="list-disc list-inside space-y-3 mb-5"><li class="text-gray-800 leading-relaxed">transferir dinero entre sistemas de pago;</li><li class="text-gray-800 leading-relaxed">depositar y retirar fondos sin realizar apuestas.</li></ul><p class="mb-5">En estos casos, el dinero será devuelto a su cuenta</p><p class="mb-5">La retirada de fondos sólo es posible para aquellos datos para los que se realizó la reposición. Al reponer una cuenta de varias maneras, la retirada de fondos debe ser proporcional al importe de la reposición.</p><p class="mb-5">La empresa ValorBet tiene derecho a rechazar el pago a los sistemas de pago o en efectivo, ofreciendo en su lugar un pago por transferencia bancaria.</p><p class="mb-5"><b>¡ATENCIÓN!</b> La administración no recomienda reponer la cuenta y retirar fondos de la misma a través de monederos electrónicos que no pertenezcan al titular de la cuenta. El servicio de seguridad de la empresa tiene derecho a considerar este tipo de reposiciones como acciones fraudulentas y bloquear los movimientos de la cuenta sin previo aviso. La administración tiene derecho a negarse a retirar fondos a detalles que no pertenecen al titular de la cuenta.</p><p class="mb-5">En casos especiales, para algunas cuentas de juego de los participantes en las apuestas, la compensación de las comisiones de los sistemas de pago por el depósito y la retirada de fondos, que suele pagar el casino online ValorBet, puede ser cancelada.</p><p class="mb-5">Si el usuario no cumple con las reglas de la Compañía (viola los Términos y Condiciones, no realiza una apuesta antes de la retirada, etc.), la Compañía se reserva el derecho de rechazar que dicho usuario retire fondos.</p><p class="mb-5">Para las cuentas en la moneda "bitcoin", al depositar y retirar fondos a través del sistema de pago Bitcoin, no se cobra ninguna comisión.</p></div>
        `
    },
    'cancellation-policy': {
        title: 'Política de cancelación',
        subtitle: 'Términos de cancelación',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block"><p class="mb-5">Una vez confirmada una apuesta, ya sea online o por teléfono, la apuesta se considerará definitiva y no podrá ser modificada ni cancelada.</p><p class="mb-5">Tienes la opción de apostar al otro lado para reducir las pérdidas, pero la apuesta no puede ser eliminada por completo</p><p class="mb-5">Todos los pagos de las apuestas se calculan utilizando las probabilidades que estaban en vigor en el momento en que se realizó la apuesta. Cualquier cambio posterior en las cuotas no afectará a las apuestas pendientes. Para evitar errores, le recomendamos encarecidamente que compruebe cuidadosamente todas las apuestas en sus boletos de apuestas antes de confirmarlas en línea, y que escuche atentamente las respuestas de los agentes cuando realice apuestas por teléfono.</p></div>
        `
    },
    'refund-policy': {
        title: 'Política de reembolso',
        subtitle: 'Información de reembolso',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block"><p class="mb-5">No se puede completar el reembolso una vez que las finanzas depositadas (incluyendo el bono) han sido utilizadas dentro del proceso de juego.</p><p class="mb-5">Una solicitud de reembolso sólo será considerada si se solicita dentro de las primeras veinticuatro (24) horas de la supuesta transacción, o dentro de los treinta (30) días si un jugador alega que otro individuo (o un menor) ha accedido a su cuenta de jugador.</p><p class="mb-5">Nos reservamos el derecho de retener cualquier reembolso o transacción inversa hasta que la identidad del usuario de la cuenta de jugador se establezca adecuadamente a nuestra satisfacción. Usted se compromete a proporcionar, en caso de que se lo exijamos, una identificación notarial, o cualquier otra identificación certificada siguiendo las leyes aplicables de la jurisdicción del jugador. Si dicha identificación notariada o certificada no se proporciona dentro de los cinco (5) días siguientes a nuestra solicitud, entonces dicho reembolso o transacción inversa no se efectuará, su Cuenta de Jugador se cerrará y usted perderá todos los fondos de su Cuenta de Jugador, dicha decisión será definitiva, vinculante e inapelable</p><p class="mb-5">Un jugador debe jugar utilizando un método justo en todos los juegos y no debe afectar de ninguna manera el resultado de ese juego. Esto incluye el uso de ayudas informáticas, ecuaciones matemáticas, sistemas de apuestas, etc.</p></div>
        `
    },
    'privacy-policy': {
        title: 'Política de privacidad',
        subtitle: 'Protección de datos',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block"><ul class="list-disc list-inside space-y-3 mb-5"><li class="text-gray-800 leading-relaxed">www.Valor.Bet se compromete a proteger su información personal. Esta Política de privacidad le informa sobre la información que recopilamos cuando utiliza nuestros servicios, por qué recopilamos esta información y cómo utilizamos la información recopilada.</li><li class="text-gray-800 leading-relaxed">Tenga en cuenta que esta Política de privacidad será acordada entre usted y www.Valor.Bet. ('Nosotros', 'Nos' o 'Nuestro', según corresponda). Esta Política de privacidad es una parte integrada de los Términos y Condiciones de www.Valor.Bet.</li><li class="text-gray-800 leading-relaxed">El sitio web www.Valor.Bet ('Casino', 'Sitio web', 'Compañía', 'Nosotros', 'Nos', 'Nuestro')</li><li class="text-gray-800 leading-relaxed">Podemos realizar cambios periódicos en esta Política de privacidad y le notificaremos estos cambios publicando los términos modificados en nuestras plataformas. Recomendamos que visite regularmente esta Política de privacidad.</li></ul><h2 class="text-2xl font-bold leading-8">1. PRIVACIDAD</h2><p class="mb-5">Consideramos información que pueda ser utilizada para identificar a una persona, incluyendo, pero no limitado a, nombre y apellido, fecha de nacimiento, dirección de casa u otra dirección física, dirección de correo electrónico, número de teléfono u otra información relevante como Información Personal ('Información Personal'). Se te puede solicitar que proporciones Información Personal cuando utilizas nuestro sitio web, te registras en una cuenta o utilizas nuestros servicios. La Información Personal que recopilamos puede incluir información como: información de contacto (incluido el número de teléfono), información de envío, información de facturación, historial de transacciones, preferencias de uso del sitio web y comentarios sobre los Servicios. Esta información se encuentra en nuestros servidores ubicados en Alemania y en otros lugares de vez en cuando. Cuando interactúas con los servicios, nuestros servidores mantienen un registro de actividad único para ti que recopila cierta información administrativa y de tráfico, incluida: dirección IP de origen, hora de acceso, fecha de acceso, página(s) web visitadas, uso de idiomas, informes de fallos de software y tipo de navegador utilizado. Esta información es esencial para la prestación y calidad de nuestros servicios. No recopilamos Información Personal sobre ti sin tu conocimiento.</p><h2 class="text-2xl font-bold leading-8">2. INFORMACIÓN RECOLECTADA</h2><p class="mb-5">Podemos recopilar automáticamente ciertos datos, como se mencionó anteriormente, y recibir Información Personal sobre ti donde proporciones dicha información a través de los servicios u otras comunicaciones e interacciones en el sitio www.Valor.Bet. También podemos recibir Información Personal de proveedores de servicios en línea y proveedores de servicios, y de listas de clientes adquiridas legalmente de proveedores de terceros. Además, podemos contratar los servicios de proveedores de servicios de terceros para proporcionar soporte técnico, procesar tus transacciones en línea y mantener tu cuenta. Tendremos acceso a cualquier información que proporciones a dichos proveedores, proveedores de servicios y servicios de comercio electrónico de terceros, y utilizaremos la Información Personal según lo establecido en esta Política de Privacidad a continuación. Esta información solo se divulgará a terceros fuera de la empresa de acuerdo con esta Política de Privacidad. Tomamos medidas para garantizar que nuestros acuerdos con proveedores de servicios de terceros y proveedores en línea protejan tu privacidad.</p><h2 class="text-2xl font-bold leading-8">3. MÉTODOS DE RECOLECCIÓN Y PROCESAMIENTO DE DATOS</h2><p class="mb-5">Utilizamos la información personal que recopilamos de usted para ofrecer nuestros servicios, brindar asistencia al cliente, realizar las comprobaciones de seguridad e identificación necesarias, procesar sus transacciones en línea, ayudar en su participación en promociones de terceros, cumplir ciertos requisitos comerciales y para cualquier otro propósito relacionado con la operación de los servicios. Como tal, podemos compartir su información personal con nuestros socios cuidadosamente seleccionados (incluidos otros terceros que tengan acuerdos de intercambio de datos con estos). También podemos utilizar su información personal para proporcionarle: (1) ofertas promocionales e información sobre nuestros productos y servicios; y (2) ofertas promocionales e información sobre los productos y servicios de nuestros socios, para ampliar la gama de productos ofrecidos y mejorar nuestro servicio al cliente. De vez en cuando, podemos solicitarle información a través de encuestas o concursos. La participación en estas encuestas o concursos es completamente voluntaria y usted tiene la opción de divulgar o no dicha información. La información solicitada puede incluir información de contacto (como nombre, dirección de correspondencia y número de teléfono) e información demográfica (como código postal o edad). Al aceptar cualquier premio o ganancia de nosotros, usted da su consentimiento para el uso de su nombre con fines publicitarios y promocionales sin compensación adicional, excepto donde lo prohíba la ley. A menos que haya optado por no recibir información promocional, también podemos utilizar su información personal (incluida su dirección de correo electrónico y número de teléfono) para proporcionarle información sobre nuestros productos, servicios y promociones, incluidos otros productos de juego (incluidos poker en línea, casino, apuestas, backgammon) y productos y servicios de terceros cuidadosamente seleccionados por nosotros. </p><h2 class="text-2xl font-bold leading-8">4. USO DE LA INFORMACIÓN</h2><p class="mb-5">Podemos divulgar su información personal si así lo exige la ley, o si creemos de buena fe que tal acción es necesaria para: (1) cumplir con cualquier proceso legal que se nos presente, cualquiera de nuestros sitios o servicios o en circunstancias en las que estemos bajo una obligación legal sustancialmente similar; (2) proteger y defender nuestros derechos o propiedad; o (3) actuar para proteger la seguridad personal de los usuarios de los servicios o del público. Si, a nuestra entera discreción, se descubre que ha hecho trampa o intentado defraudarnos, a la empresa o a cualquier otro usuario de los servicios de cualquier manera, incluida, entre otras, la manipulación del juego o el fraude en los pagos, o si sospechamos que usted ha realizado pagos fraudulentos, incluido el uso de tarjetas de crédito robadas, o cualquier otra actividad fraudulenta (incluida cualquier devolución de cargo u otra reversión de un pago) o transacción prohibida (incluido el lavado de dinero), nos reservamos el derecho de compartir esta información (junto con su identidad) con otros sitios de juegos en línea, bancos, compañías de tarjetas de crédito, agencias apropiadas y autoridades pertinentes.(4) Para fines de investigación en la prevención de adicciones, los datos se pueden anonimizar y pasar a las respectivas instituciones.</p><h2 class="text-2xl font-bold leading-8">5. DIVULGACIONES EXCLUIDAS CIERTAS</h2><p class="mb-5">Puede 'optar por no recibir' comunicaciones promocionales eligiendo no participar a través de la configuración de su cuenta disponible en nuestros sitios o servicios, o en un correo electrónico que reciba de nosotros, o en cualquier momento enviando un correo electrónico o escribiendo a nuestro Servicio al Cliente. Además, puede contactarnos si: 1) desea confirmar la precisión de la Información Personal que hemos recopilado sobre usted; 2) le gustaría actualizar su Información Personal; y/o 3) tiene alguna queja con respecto a nuestro uso de su Información Personal. Si lo solicita, (1) actualizaremos cualquier información que nos haya proporcionado, en caso de que demuestre la necesidad de dichos cambios o (2) marcaremos cualquier información para prohibir su uso futuro con fines de marketing. Sin perjuicio de lo anterior, nada en esta Política de Privacidad nos impedirá retener su Información Personal cuando así lo exija la ley. </p><h2 class="text-2xl font-bold leading-8">6. ACCESO</h2><h3 class="font-bold">Información almacenada en su dispositivo</h3><h3 class="font-bold">Cookies estrictamente necesarias</h3><h3 class="font-bold">Durante el proceso de registro</h3><h3 class="font-bold">En nuestro sitio web</h3><h3 class="font-bold">Cookies flash</h3><p class="mb-5">Al acceder a nuestros servicios, podemos almacenar información en su dispositivo. Esta información se conoce como cookies, que son pequeños archivos de texto que se almacenan en su dispositivo cuando visita páginas en línea que registran sus preferencias. También utilizamos Objetos Compartidos Locales o 'cookies flash'. Las 'cookies flash' son similares a las cookies del navegador. Nos permiten recordar cosas sobre sus visitas a través de nuestros sitios. Ni las cookies ni las cookies flash pueden utilizarse para acceder o utilizar otra información en su computadora. Solo utilizamos estos métodos para rastrear su uso de nuestros servicios. Las cookies nos ayudan a monitorear el tráfico del sitio, mejorar nuestros servicios y facilitar y/o hacer más relevante su uso. Utilizamos cookies flash y cookies de terceros para mostrarte anuncios más relevantes y deseables.</p><p class="mb-5">Las cookies estrictamente necesarias son esenciales para permitir que un usuario se desplace por un sitio web y utilice sus funciones, como acceder a áreas seguras del sitio web o realizar transacciones financieras. Sin estas cookies, no podríamos hacer que nuestros sitios web funcionen de manera eficiente.</p><p class="mb-5">Estas cookies contendrán información recopilada durante su registro y nos permitirán reconocerlo como cliente y brindarle los servicios que necesita. También podemos utilizar estos datos para comprender mejor sus intereses mientras está en línea y mejorar sus visitas a nuestras plataformas.</p><p class="mb-5">Para los visitantes de nuestro sitio web, utilizamos cookies para recopilar información. Nuestros servidores utilizan tres tipos diferentes de cookies: Una cookie 'basada en sesión': este tipo de cookie solo se asigna a su computadora durante la duración de su visita a nuestro sitio web. Una cookie basada en sesión le ayuda a moverse por nuestro sitio web más rápido y, si es un cliente registrado, nos permite brindarle información más relevante para usted. Esta cookie expira automáticamente cuando cierra su navegador. Una cookie 'persistente': este tipo de cookie permanecerá en su computadora durante un período de tiempo establecido para cada cookie. Las cookies flash también son persistentes. Cookies 'analíticas': este tipo de cookie nos permite reconocer y contar el número de visitantes de nuestro sitio y ver cómo los visitantes utilizan nuestros servicios. Esto nos ayuda a mejorar el funcionamiento de nuestros sitios, por ejemplo, asegurándonos de que pueda encontrar fácilmente lo que busca. Usted tiene la capacidad de aceptar o rechazar cookies. La mayoría de los navegadores web aceptan cookies automáticamente, pero, si lo prefiere, generalmente puede modificar la configuración de su navegador para rechazar cookies. El menú Ayuda en la barra de menú de la mayoría de los navegadores le dirá cómo evitar que su navegador acepte nuevas cookies, cómo hacer que el navegador le notifique cuando reciba una nueva cookie y cómo deshabilitar las cookies por completo.</p><p class="mb-5">Puede modificar la configuración de su Flash Player para evitar el uso de cookies flash. El Administrador de configuración de su Flash Player le permite administrar sus preferencias. Para no permitir las cookies flash de todo el contenido de terceros, vaya al panel 'Configuración de almacenamiento global' del Administrador de configuración y desmarque la casilla etiquetada 'Permitir que el contenido flash de terceros almacene información en su computadora' y cierre el Administrador de configuración. Alternativamente, también puede ajustar la configuración para sitios web específicos que visita a través del panel 'Configuración de almacenamiento del sitio web', que también se encuentra en el Administrador de configuración. Si está utilizando una versión antigua de Flash Player o un navegador web más antiguo, es posible que el Administrador de configuración no esté disponible para usted. Le recomendamos que se asegure de actualizar su Flash Player y navegador a las últimas versiones disponibles. Si decide rechazar las cookies, es posible que no pueda experimentar todas las funciones interactivas en nuestros sitios.</p><h2 class="text-2xl font-bold leading-8">7. COOKIES</h2><p class="mb-5">Para jugar juegos con dinero real en nuestros servicios, deberá enviarnos dinero y recibir dinero de nosotros. Podemos utilizar sistemas de pago electrónico de terceros para procesar dichas transacciones financieras. Al aceptar esta Política de Privacidad, usted acepta expresamente la Información Personal necesaria para el procesamiento de transacciones, incluida, cuando sea necesario, la transferencia de información fuera de su país. Tomamos medidas para garantizar que nuestros acuerdos con sistemas de pagos protejan su privacidad.</p><h2 class="text-2xl font-bold leading-8">8. CONSENTIMIENTO PARA EL USO DE PROVEEDORES DE SERVICIOS ELECTRÓNICOS</h2><p class="mb-5">Nos reservamos el derecho de realizar una revisión de seguridad en cualquier momento para validar los datos de registro proporcionados por usted y verificar su uso de los servicios y sus transacciones financieras en busca de posibles incumplimientos de nuestros Términos y Condiciones y de la ley aplicable. Al utilizar nuestros servicios y aceptar nuestros Términos y Condiciones, nos autoriza a utilizar su Información Personal y a divulgar su Información Personal a terceros con el fin de validar la información que proporciona durante el uso de nuestros servicios, incluida, cuando sea necesario, la transferencia de información fuera de su país. Las revisiones de seguridad pueden incluir, entre otros, solicitar un informe de crédito y/o verificar la información que proporciona en bases de datos de terceros. Además, para facilitar estas revisiones de seguridad, acepta proporcionar la información o documentación que podamos solicitar.</p><h2 class="text-2xl font-bold leading-8">9. CONSENTIMIENTO PARA REVISIÓN DE SEGURIDAD</h2><p class="mb-5">Entendemos la importancia de la seguridad y las técnicas necesarias para proteger la información. Almacenamos toda la Información Personal que recibimos directamente de usted en una base de datos cifrada y protegida por contraseña que reside dentro de nuestra red segura detrás de un software de firewall activo y de última generación. (Nuestros Servicios admiten SSL Versión 3 con cifrado de 128 bits). También tomamos medidas para garantizar que nuestras filiales, agentes, afiliados y proveedores empleen medidas de seguridad adecuadas.</p><h2 class="text-2xl font-bold leading-8">10. SEGURIDAD</h2><p class="mb-5">La Información Personal recopilada en los servicios puede almacenarse y procesarse en cualquier país en el que nosotros o nuestras filiales, proveedores o agentes mantengan instalaciones. Al utilizar nuestros servicios, usted acepta expresamente cualquier transferencia de información fuera de su país (incluidos los países que pueden no ser evaluados como que tienen leyes de privacidad adecuadas). No obstante, tomamos medidas para garantizar que nuestros agentes, afiliados y proveedores cumplan con nuestros estándares de privacidad, independientemente de su ubicación.</p><h2 class="text-2xl font-bold leading-8">11. PROTECCIÓN DE MENORES</h2><p class="mb-5">La Información Personal recopilada en los servicios puede almacenarse y procesarse en cualquier país en el que nosotros o nuestras filiales, proveedores o agentes mantengan instalaciones. Al utilizar nuestros servicios, usted acepta expresamente cualquier transferencia de información fuera de su país (incluidos los países que pueden no ser evaluados como que tienen leyes de privacidad adecuadas). No obstante, tomamos medidas para garantizar que nuestros agentes, afiliados y proveedores cumplan con nuestros estándares de privacidad, independientemente de su ubicación.</p><h2 class="text-2xl font-bold leading-8">12. TRANSFERENCIAS INTERNACIONALES</h2><p class="mb-5">No podemos garantizar la protección de cualquier información que proporcione a un sitio en línea de terceros que tenga enlaces hacia o desde los servicios, ni de ninguna información recopilada por un tercero que administre nuestro programa de afiliados (si corresponde) u otro programa, ya que estos sitios en línea de terceros son propiedad y están operados independientemente de nosotros. Cualquier información recopilada por estos terceros se rige por la política de privacidad, si la hubiera, de dicho tercero.</p><h2 class="text-2xl font-bold leading-8">13. PRÁCTICAS DE TERCEROS</h2><p class="mb-5">Los servicios funcionan 'TAL COMO ESTÁN' y 'SEGÚN DISPONIBILIDAD' sin responsabilidad de ningún tipo. No somos responsables de eventos que estén más allá de nuestro control directo. Debido a la naturaleza compleja y siempre cambiante de nuestra tecnología y negocio, no podemos garantizar ni afirmamos que habrá un rendimiento sin errores en relación con la privacidad de su Información Personal, y no seremos responsables por ningún daño indirecto, incidental, consecuente o punitivo relacionado con el uso o divulgación de dicha Información Personal.</p><h2 class="text-2xl font-bold leading-8">14. DESCARGO DE RESPONSABILIDAD LEGAL</h2><p class="mb-5">El uso de nuestros servicios constituye un acuerdo con nuestra Política de Privacidad. Esta es nuestra Política de Privacidad completa y exclusiva y reemplaza cualquier versión anterior. Esta Política de Privacidad debe leerse junto con nuestros Términos y Condiciones y cualquier término adicional aplicable publicado en nuestras plataformas. Podemos realizar cambios periódicos en esta Política de Privacidad y le notificaremos estos cambios publicando los términos modificados en nuestras Plataformas. El uso continuo de nuestros servicios después de cualquier cambio en esta Política de Privacidad constituye su aceptación de los cambios. Le recomendamos que visite regularmente esta Política de Privacidad. Además, según el Artículo 77 del GDPR, tiene derecho a presentar una queja relacionada con el procesamiento de sus datos ante una autoridad de control, en particular en el Estado miembro de su residencia habitual, lugar de trabajo o lugar de una supuesta infracción.</p><h2 class="text-2xl font-bold leading-8">15. CONSENTIMIENTO A LA POLÍTICA DE PRIVACIDAD</h2><p class="mb-5">El uso de nuestros servicios constituye un acuerdo con nuestra Política de Privacidad. Esta es nuestra Política de Privacidad completa y exclusiva y reemplaza cualquier versión anterior. Esta Política de Privacidad debe leerse junto con nuestros Términos y Condiciones y cualquier término adicional aplicable publicado en nuestras plataformas. Podemos realizar cambios periódicos en esta Política de Privacidad y le notificaremos estos cambios publicando los términos modificados en nuestras Plataformas. El uso continuo de nuestros servicios después de cualquier cambio en esta Política de Privacidad constituye su aceptación de los cambios. Le recomendamos que visite regularmente esta Política de Privacidad. Además, según el Artículo 77 del GDPR, tiene derecho a presentar una queja relacionada con el procesamiento de sus datos ante una autoridad de control, en particular en el Estado miembro de su residencia habitual, lugar de trabajo o lugar de una supuesta infracción.</p><h2 class="text-2xl font-bold leading-8">16. OTROS SITIOS WEB</h2></div>
        `
    },
    'about-us': {
        title: 'Sobre nosotros',
        subtitle: 'Nuestra historia',
        content: `
            <div class="politics-content__block"><p class="mb-5">ValorBet es un casino online con los mejores proveedores con licencia de todo el mundo. La suerte y la emoción se plasman en las páginas del sitio y cada uno de nuestros nuevos clientes puede sentirlo</p><p class="mb-5"> Durante muchos años de trabajo, nos hemos guiado por los principios que dan forma a nuestro concepto y negocio. Llevamos estos principios de año en año</p><p class="mb-5">🏆 Apertura y transparencia <br> La marca ValorBet se creó con la idea de encarnar una historia verdaderamente nueva en el trabajo de un casino online. Nuestra tarea era ser claros y transparentes con nuestros clientes para que la vida y el desarrollo de la marca fueran visibles para cada uno de nuestros jugadores.</p><p class="mb-5"> Realizamos la actividad social, le proporcionamos la oportunidad de participar e influir en la vida de la marca siendo activo en Instagram y en nuestros otros medios de comunicación - ¡y todo esto para que usted se convierta y forme parte de una sola marca del casino online ValorBet!</p><p class="mb-5">🏆 Velocidad de trabajo <br> Hemos tenido en cuenta el ancho de banda de los proveedores de servicios de Internet de los jugadores de nuestras regiones, hemos recopilado análisis y estadísticas en profundidad para deducir la velocidad estable de cada una de nuestras tragaperras y de la página web de ValorBet. Lo conseguimos y ahora puede jugar a las tragaperras online gratis y por dinero real sin problemas de acceso</p><p class="mb-5">🏆 Disponibilidad <br> ValorBet ofrece la oportunidad de jugar a cualquiera que realmente ame las tragaperras geniales y el servicio de alta calidad.</p><p class="mb-5">🏆 Calidad <br> Proveedores con licencia, soporte profesional 24/7, un equipo de especialistas experimentados con más de 10 años de experiencia en la industria del juego - esto y mucho más para asegurar que cada día de su juego en el casino en línea ValorBet le cause deleite y emociones realmente geniales!</p><p class="mb-5"><b>Contactos</b></p><p class="mb-5">support@valor.bet</p></div>
        `
    },
    'contact': {
        title: 'Contacto',
        subtitle: 'Ponte en contacto',
        content: `
            <div class="politics-content__block"><p class="mb-5"><b>Correo electrónico:</b> support@valor.bet</p><p class="mb-5"><b>Cambio de Email/Contraseña:</b> valor.security@valor.bet</p></div>
        `
    },
    'affiliate-program': {
        title: 'Affiliate Program',
        subtitle: 'Partner with Us',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block"><p class="mb-5">Una de nuestras principales preocupaciones como operador de juegos en línea es defender el juego justo</p><p class="mb-5">Con la excepción de las apuestas deportivas y los juegos de casino en vivo, para garantizar la integridad de los juegos de casino, siempre se usa un generador de números aleatorios (RNG) para determinar el resultado aleatorio de tales juegos</p><p class="mb-5">Este es un sistema de la industria estándar que garantiza resultados consistentemente aleatorios que también se ha probado ampliamente al ejecutar y analizar miles de rondas de juego. La aleatoriedad del RNG proporciona un entorno de juego creíble y justo</p><p class="mb-5">El valor de regreso al jugador (RTP) es un cálculo teórico del porcentaje esperado de apuestas que un juego específico volverá al jugador después de una cantidad significativa de reproducciones (por ejemplo, cientos de millones de juegos de juegos). Mientras que cada juego solo El juego es impredecible y es posible ganar una gran cantidad o perder su apuesta, la devolución promedio de un juego específico a largo plazo se acercará al valor RTP teórico </p><p class="mb-5">Estamos monitoreando la proporción de pago de los jugadores de manera regular y cooperamos con las autoridades reguladoras de juego para garantizar nuestro cumplimiento de la legislación de jurisdicciones pertinentes</p></div>
        `
    },
    'account-payments': {
        title: 'Cuenta, Pagos y Bonos',
        subtitle: 'Información de cuenta',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block"><p class="mb-5">1. Para convertirse en un titular de cuenta, primero debe registrarse en la empresa</p><p class="mb-5">2. A " la cuenta de la compañía "es una cuenta mantenida por un titular de cuenta, para transacciones de buena fe, con un objetivo estricto de establecer una relación comercial normal con la empresa y con el propósito estricto de la realización de apuestas y otras transacciones de juego y juegos de juego </p><p class="mb-5">3.El " sitio web "es accesible a través de la puerta de acceso a Internet a través de la dirección de Internet / donde se consideran todos los usuarios de información actual y relevante. / Dónde se publica toda la información actual y relevante sobre las operaciones de la compañía, y a través de las cuales se proporcionan los servicios a los titulares de cuentas. Se publica las operaciones de la compañía, y a través de las cuales se proporcionan los servicios a los titulares de cuentas </p><p class="mb-5">4. Las reglas para todas las apuestas deportivas en la compañía Sportsbook se establecen bajo la sección de Ayuda General (apuestas deportivas);</p><p class="mb-5">5. Las reglas para cada juego proporcionadas por la Compañía se pueden encontrar en la sección de ayuda del sitio web o en el apropiado de cada juego</p><p class="mb-5">6. Las reglas de bonificación / promociones se describen en la parte " Promociones "del sitio web, donde puede ver las condiciones aplicadas para cada bonificación y / o promoción. Máxima cantidad de apuestas que puede colocar cuando tenga un El bono de casino activo es de 5 € (o equivalente en moneda) por giro en un juego de tragamonedas o el 15% del bono total dado (lo que ocurra primero) </p><p class="mb-5">7. Todos los servicios proporcionados deben usarse de acuerdo con las reglas y los límites establecidos</p><h3 class="font-bold">2. Apertura de su cuenta</h3><h3 class="font-bold">2.5 en la apertura de su cuenta que garantiza que:</h3><p class="mb-5">2.1 Para colocar una apuesta o jugar un juego con nuestros servicios, deberá abrir una cuenta con el operador (" la cuenta de la compañía "o" cuenta ").</p><p class="mb-5">2.5.5 No ha sido excluido de los juegos de azar; y</p><p class="mb-5">2.5.6 Ya no ha tenido una cuenta cerrada por nosotros bajo las siguientes razones de colusión, trampa, fraude, actividad delictiva, incumplimiento de los Términos de uso o en su solicitud en virtud de los párrafos responsables del juego / juego</p><p class="mb-5">2.6 Su cuenta debe estar registrada en su propio, correcto, nombre y detalles personales, y solo se emitirá una vez por usted y no duplicada a través de cualquier otra persona, familia, hogar, dirección (postal o IP), correo electrónico Dirección, dispositivo de acceso o cualquier entorno donde se compartan dispositivos de acceso (por ejemplo, escuelas, lugares de trabajo, bibliotecas públicas, etc.), computadora (u otro dispositivo de acceso) y / o cuenta con respecto a los servicios. Cualquier otra cuenta que abra con nosotros , o que son propiedad de usted beneficiosamente que usted en relación con los servicios serán "Cuentas duplicadas". Podemos cerrar cualquier cuenta duplicada (pero no estaremos obligados a hacerlo) </p><p class="mb-5">Si cerramos una cuenta duplicada:</p><p class="mb-5">2.6.1 Todos los bonos, las apuestas y ganancias gratuitas que se acumulan de dichos bonos y las apuestas gratuitas obtenidas usando esa cuenta duplicada será vacía y se perderá usted;</p><p class="mb-5">2.6.2 Podemos, a toda nuestra discreción, anular todas las ganancias y reembolsar todos los depósitos (menos montos con respecto a las ganancias de vacíos) realizadas con respecto a esa cuenta duplicada y, en la medida en que no se recupere de la Cuenta duplicada relevante, cualquier monto para ser reembolsado por usted con respecto a una cuenta duplicada puede ser recuperada por nosotros directamente desde cualquier otra de sus cuentas (incluida cualquier otra cuenta duplicada); o </p><p class="mb-5">2.6.3 Podemos, a nuestra entera discreción, permitir que el uso de la cuenta duplicada se considere válida y, en este caso, todas las pérdidas y participaciones realizadas por usted a través de la cuenta duplicada serán retenidas por nosotros</p><p class="mb-5">2.6.4 Debido a la legislación reglamentaria y la licencia, los jugadores de las siguientes jurisdicciones están prohibidas de crear cuentas con la compañía: EE. UU., Curazao y Malta. La compañía se reserva todos los derechos para suspender una cuenta abierta de esos países también Como depósitos y apuestas colocadas </p><p class="mb-5">2.2.1 Haga clic en Registrarse en el sitio web y siga las instrucciones en pantalla o</p><p class="mb-5">2.2.2 Abra una cuenta por dicho método de apertura de la cuenta, ya que el operador puede ofrecerse, de vez en cuando,</p><p class="mb-5">2.3 Su cuenta será operada por el operador, o por otra compañía en su grupo por y en nombre de sí mismo y / o la compañía de grupo de operadores correspondiente con quienes usted tiene« firmado »un contrato</p><p class="mb-5">2.4 Cuando abre su cuenta, se le pedirá que nos proporcione información personal, incluido su nombre y fecha de nacimiento y datos de contacto apropiados, incluida una dirección, número de teléfono y dirección de correo electrónico (" Detalles personales "). Puede actualizar sus datos personales de vez en cuando comunicándose con el servicio al cliente; oa través de la página de administración" Mi perfil "en el sitio web: o por dicho método, ya que se puede ofrecer dicho otro método, de vez en cuando. por el operador </p><p class="mb-5">2.5.1 Usted entiende y acepta el riesgo de que, al utilizar los servicios, puede, así como ganar dinero, perder dinero;</p><p class="mb-5">2.5.2 Usted es: (a) Mayores de 18 años: y (b) por encima de la edad en la que las actividades de juego o juego son legales bajo la ley o jurisdicción que se aplica a usted (la edad relevante. ");</p><p class="mb-5">2.5.3 El juego no es ilegal en el territorio donde reside;</p><p class="mb-5">2.5.4 usted puede entrar legalmente en contratos;</p><h3 class="font-bold">3. Gestión de la cuenta de la compañía</h3><h3 class="font-bold">3.2 La compañía garantiza en todo momento a:</h3><p class="mb-5">3.1 La compañía se reserva el derecho a su propia discreción y en todo momento, a:</p><p class="mb-5">i) Suspender y / o cancelar la participación del titular de la cuenta en los servicios, y / o Foreit y / o confiscar fondos disponibles en su cuenta de la compañía si se encuentra el titular de la cuenta, o si se determina Por la compañía que el titular de la cuenta ha empleado o hecho uso de un sistema (incluidas máquinas, robots, computadoras, software o cualquier otro sistema automatizado) diseñado para derrotar o capaces de derrotar a la aplicación y / o software del cliente </p><p class="mb-5">La compañía se compromete a detectar y prevenir programas de software diseñados para permitir que la inteligencia artificial (" software AI ") se desempeñe en su (s) sitio (s) que incluye, entre otros, entre otros, el perfilado del oponente, el jugador, los robots, Otro software 'engaño' o cualquier otra cosa que en nuestra opinión razonable distorsione el juego normal y le permite al jugador tener una ventaja injusta sobre otros jugadores. Usted reconoce que la compañía tomará medidas para detectar y evitar el uso de dichos programas y el software AI Uso de métodos (incluidos, entre otros, leer la lista de programas actualmente en ejecución en la computadora de un jugador) y el cliente acepta no usar ningún software AI y / o cualquier otro programa </p><p class="mb-5">a) Administre fondos pertenecientes a los titulares de cuentas de una manera segura y apropiada; y / o</p><p class="mb-5">b) absorbe el costo y pague el deber de juego y apostar, según corresponda, en el lugar del contrato;</p><p class="mb-5">c) Administre los datos con respecto a un titular de cuenta de acuerdo con las leyes aplicables, los actos de protección de datos y / o similares; d) no ofrecen contingencias a los clientes para proceder a cualquier transferencia de fondos entre las cuentas de los clientes</p><p class="mb-5">3.3 La Compañía mantendrá los fondos de los titulares de cuentas separados de los fondos propios de la compañía en una cuenta de clientes mantenidos con una institución financiera aprobada por el regulador</p><p class="mb-5">3.4 Una cuenta de la compañía no acumula interés. El titular de la cuenta no debe tratar a la compañía como institución financiera</p><p class="mb-5">3.5 Un titular de la cuenta solo puede retener una cuenta de la compañía a la vez. En el caso de que esta regla esté violada, la Compañía se reserva el derecho de bloquear y / o eliminar la (s) cuenta (s) de la compañía superfluosa. El titular de la cuenta en violación de esta cláusula y reasignó todos los fondos a una sola cuenta de la compañía. Cualquier bonificación otorgada a la (s) superfluosa que se reasignará la (s) cuenta (s) ".</p><p class="mb-5">3.6 Una cuenta de la compañía no es transferible. Está prohibido que los jugadores vendan, transfieran o adquieran cuentas desde o a otros jugadores. Los fondos no pueden ser transferidos entre las cuentas de la compañía</p><p class="mb-5">3.7 Un titular de la cuenta no debe permitir ninguna otra persona, incluido cualquier menor, usar o reutilizar su cuenta de la compañía, acceder y / o usar cualquier material o información del sitio web, acepte cualquier premio o acceso y / / o participar en los servicios </p><p class="mb-5">a) declive para abrir la cuenta de la compañía y / o para cerrar una cuenta de la compañía existente sin ninguna explicación;</p><p class="mb-5">b) Detalle para aceptar depósitos sin ninguna explicación en absoluto;</p><p class="mb-5">c) Solicitar documentos para verificar: (i) la identidad del titular de la cuenta, (ii) su autorización para usar una tarjeta específica y / o (iii) otros hechos e información proporcionada por el titular de la cuenta. Dicha solicitud se puede realizar en un momento dado y la compañía se reserva el derecho de suspender una investigación en espera de una cuenta; </p><p class="mb-5">f) Mantenga y administre los fondos que pertenecen a los titulares de cuentas de acuerdo con las pautas generalmente aceptadas para la gestión de efectivo con respecto a dichos fondos; Esto puede incluir una institución financiera y / o un proveedor de soluciones de pago que se le confía en el nombre de y / o en beneficio de los titulares de cuentas; </p><p class="mb-5">g) Forzada y / o confiscar fondos disponibles en la cuenta de la compañía y / o se niega a honrar una reclamación, en caso de que, directa o indirectamente: (i) (i) las reglas de la compañía han sido violadas; y / o (ii) se han producido otras actividades no autorizadas en relación con un evento de apuestas y / o la operación de una cuenta de la compañía (como, entre otras, pero no limitadas a, incumplimiento de la ley u otras regulaciones, incumplimiento de los derechos de un tercero, el fraude , y trampa); </p><p class="mb-5">h) Suspender y / o cancelar la participación de un titular de cuenta en los juegos, actividades promocionales, competiciones u otros servicios, siempre que la compañía opina que existen preocupaciones legítimas de que es una cuenta de la compañía, tiene ha sido, o puede ser usado para prácticas ilegales, fraudulentas o deshonestas; </p><h3 class="font-bold">4. Cuentas inactivas</h3><h3 class="font-bold">4.2 La compañía tiene derecho a cobrar o cerrar las cuentas inactivas si:</h3><p class="mb-5">4.1 una cuenta inactiva " inactive "es una cuenta de la compañía que no tiene registro de ningún inicio de sesión y / o cierre de sesión por un período que exceda los seis (6) meses consecutivos</p><p class="mb-5">a) No se han registrado transacciones en una cuenta de la compañía por un período de 6 meses consecutivos; (Una cuenta inactiva es una cuenta que no se ha accedido en 6 meses, que tiene un saldo de dinero real. Una vez que su La cuenta se hace inactiva, si no hemos podido contactarlo, la compañía tiene derecho a cerrar su cuenta y </p><p class="mb-5">b) La compañía ha realizado esfuerzos razonables para comunicarse con el titular de la cuenta de la cuenta inactiva, pero el titular de la cuenta no se pudo ubicar satisfactoriamente o las instrucciones de pago requeridas no estaban disponibles</p><p class="mb-5">4.3 Si se puede bloquear o excluir una cuenta y aún se está disponible un saldo en la cuenta, se le contactará por la atención al cliente que le notifique que un saldo todavía está disponible en su cuenta. Se le solicitará que proporcione detalles para el retiro de tales cantidades pendientes </p><p class="mb-5">4.4 La Compañía se reserva el derecho de cobrar una tarifa mensual una cuenta inactiva igual a 5 EUR (o equivalente en moneda) por mes</p><p class="mb-5">4.5 Cualquier saldo en un resultado de cuenta inactivo de la oferta de devolución de efectivo se caduque de inmediato</p><h3 class="font-bold">5. Tienda de cargo</h3><p class="mb-5">5.1 Sujeto a las subcláusulas a continuación y sin perjuicio del derecho de la Compañía a buscar una reparación bajo cualquier legislación, regulación, promulgación o política, o en cualquier otra disposición de las reglas de la compañía, la compañía tendrá la Derecho a bloquear una cuenta de la compañía cuando se solicitó una devolución de cargo en relación con la cuenta de la compañía </p><p class="mb-5">5.2 Cuando se ha solicitado una devolución de cargo, la compañía enviará un "Aviso de devolución de cargo" al titular de la cuenta en la dirección de correo electrónico mencionada en los detalles del titular de la cuenta, para buscar la confirmación de la identidad del titular de la cuenta y del método de pago utilizado para el crédito a la cuenta de la compañía de la cuenta, la cuenta de la compañía cualquier fondos totalmente no relacionados con una devolución de cargo ("fondos sin mentir"). En ausencia de confirmación por el titular de la cuenta de la identidad del titular de la cuenta y del método de pago utilizado. Para acreditar fondos sin mentir en la cuenta de la cuenta, la cuenta de la compañía, siguiendo un aviso de devolución de cargo, la compañía enviará a dos recordatorios escritos al titular de la cuenta en el correo electrónico disponible para él, cada uno de los cuales estará sujeto a una tarifa de procesamiento de cincuenta (50 ) Euros dibujados en cualquier fondos sin derecho </p><p class="mb-5">5.3 Cuando una cuenta de la compañía se ha bloqueado debido a una devolución de cargo y el titular de la cuenta no tiene: a) Inicie sesión en la cuenta de la compañía por un período de treinta (30) meses consecutivos; o b) confirmado a La compañía su identidad y los detalles del método de pago utilizado para acreditar los fondos sin mentir en la cuenta de la compañía de la cuenta y luego solicitaron un retiro; Cualquier fondos sin mentir en la cuenta de la compañía se tratará ya que fueron fondos en una cuenta inactiva y el La compañía remitirá el saldo en la cuenta de la compañía del titular de la cuenta </p><h3 class="font-bold">6. Cierre de la cuenta de la compañía</h3><h3 class="font-bold">6.5 Reglas de pago</h3><h3 class="font-bold">6.8 La Compañía no se ocupará del saldo de crédito de la cuenta de la compañía, excepto:</h3><p class="mb-5">6.1 Un titular de la cuenta puede cerrar la cuenta de la compañía en cualquier momento contactando el servicio de atención al cliente de la compañía utilizando los datos de contacto proporcionados en la sección " Ayuda "en el sitio web por correo electrónico. Cualquier fondos en la cuenta de la compañía será remitido al titular de la cuenta </p><p class="mb-5">6.5.5 Método de pago / retiro de / a la cuenta de la compañía</p><p class="mb-5">6.6.1 Solo se permite un titular de cuenta:</p><p class="mb-5">a) Haga depósitos a la cuenta de la compañía con su tarjeta personal o a través de su cuenta personal creada con una de las instituciones financieras o sus licenciatarios. Si detectamos a los titulares de cuentas utilizando fondos de otros titulares de cuentas o terceros en general ( Incluyendo, entre otros, recibir fondos de terceros en sus propios métodos de pago y depositándolos directamente a su propia cuenta de la compañía), nos reservamos el derecho de anular cualquier ganancia y perder cualquier saldo (ganancias y depósitos) en su cuenta de apuestas, a Termine el acuerdo y / o para suspender la provisión de los servicios o desactivar su cuenta </p><p class="mb-5">b) solicite retiros de fondos mantenidos en la cuenta de la compañía a su cuenta personal creada con una de las instituciones financieras o sus licenciatarios</p><p class="mb-5">6.6.2 Un titular de la cuenta es responsable de proporcionar a la compañía los detalles correctos de su cuenta personal con el fin de retiros de la cuenta de la compañía</p><p class="mb-5">6.6.3 Un titular de la cuenta no debe permitir que terceros utilicen la cuenta de la compañía para hacer depósitos o retiros de la cuenta de la compañía</p><p class="mb-5">6.6.4 Es responsabilidad exclusiva del titular de la cuenta asegurarse de que cumpla con las disposiciones anteriores</p><p class="mb-5">6.7 La Compañía no aceptará una apuesta desde un titular de la cuenta a menos que se haya establecido la cuenta de la compañía en nombre del titular de la cuenta y que existan fondos adecuados en la cuenta de la compañía para cubrir la cantidad de la apuesta, o Los fondos necesarios para cubrir la cantidad de la apuesta se proporcionan de manera aprobada </p><p class="mb-5">a) Déjese de la cuenta de la compañía Una apuesta realizada por el titular de la cuenta o una cantidad que el titular de la cuenta indica que desean apostar en el curso de un juego que están jugando o a punto de jugar;</p><p class="mb-5">b) remitir los fondos de pie al crédito de la cuenta de la compañía al titular de la cuenta, en la solicitud del titular de la cuenta, en términos de reglamento 37 de las regulaciones remotas de juego;</p><p class="mb-5">6.2 En caso de que se haya cerrado una cuenta de la compañía existente, se respetará cualquier obligación ya ingresada.</p><p class="mb-5">c) para pagar cargos bancarios razonables por depósitos recibidos y fondos retirados; o</p><p class="mb-5">D) como lo autorizó lo contrario por las regulaciones remotas de juego</p><p class="mb-5">6.9 El saldo de la cuenta de la compañía puede volverse negativo en caso de devolución de cargo</p><p class="mb-5">6.10 Los retiros de la cuenta de la compañía se realizan a través de pagos dirigidos al titular de la cuenta o se transfieren a una cuenta bancaria mantenida en nombre del titular de la cuenta, según lo asesorado por el titular de la cuenta. Siempre que sea posible, la compañía restringirá los retiros. Para ser realizado solo a la misma cuenta utilizada por el titular de la cuenta para hacer depósitos </p><p class="mb-5">6.11 Dependiendo del método de pago elegido por el titular de la cuenta, pueden aplicarse límites de depósito mínimo y / o máximo.</p><p class="mb-5">6.11.1 Para retirar un monto de la cuenta, el titular de la cuenta debe completar los siguientes pasos:</p><p class="mb-5">1. Elija " Retirar "en la sección de la cuenta</p><p class="mb-5">2. Elija el método apropiado de retiro</p><p class="mb-5">3. Proporcionar los datos personales requeridos e indicar la cantidad</p><p class="mb-5">4. Presione Confirmar. Aparecerá un mensaje que confirmando la solicitud de retiro.</p><p class="mb-5">6.3 Se recomienda a los titulares de cuentas que deseen recuperar fondos retenidos en una cuenta cerrada, bloqueada o excluida que se comuniquen con el Servicio de atención al Cliente.
<br>
Los retiros solo se permitirán a la misma cuenta desde la que se originaron los fondos. También puede haber limitaciones para los retiros. Primero se debe verificar la identidad de los jugadores.
<br>
El Usuario debe enviar los documentos para su verificación al menos un día antes del primer retiro.</p><p class="mb-5">6.12 La Compañía se reserva el derecho de cargar el titular de la cuenta para los costos administrativos que resultan de los retiros realizados por el titular de la cuenta, como se indica en el sitio web</p><p class="mb-5">6.13 Poner una apuesta a través de Internet puede ser ilegal en la jurisdicción en la que un titular de cuenta es residente y / o domiciliado; de ser así, el titular de la cuenta no está autorizado para usar una tarjeta con el propósito de colocar una apuesta . </p><p class="mb-5">6.14 La participación de un titular de cuenta en los servicios en jurisdicción donde la ley está prohibida dicha participación no afectará a ninguna participación o pago realizado y acumulado en beneficio de la compañía</p><p class="mb-5">6.15 La Compañía, o la Autoridad Gobernadora pueden monitorear o solicitar revisar todas las transacciones para prevenir el lavado de dinero. Todas las transacciones sospechosas detectadas por la Compañía se informarán a las autoridades gobernantes</p><p class="mb-5">6.16 Todas las transacciones se verifican para evitar el lavado de dinero</p><p class="mb-5">6.17 Es responsabilidad exclusiva del titular de la cuenta pague y proceda con toda la diligencia necesaria en relación con los impuestos sobre cualquier premio, si y dónde corresponda</p><p class="mb-5">6.18 Es ilegal depositar dinero de medios mal obtenidos</p><p class="mb-5">6.19 Con la iniciativa del Departamento de Finanzas / Contabilidad, los usuarios pueden ser redirigidos para diferentes métodos de pago</p><p class="mb-5">6.4 En caso de cierre de su cuenta de la compañía debido a la adicción al juego o el fraude, una persona no debe abrir una nueva cuenta de la compañía. La compañía no será responsable si el individuo logra abrir una nueva cuenta, ni para Cualquier daños consecuentes directos o indirectos. La compañía se reserva el derecho de cerrar una cuenta abierta en violación de esta regla en cualquier momento </p><p class="mb-5">Los depósitos y los retiros de la cuenta de la compañía se realizarán en todo momento a través de una institución financiera o un proveedor de soluciones de pago. Los procedimientos, los términos y condiciones, la disponibilidad y la duración de los depósitos / retiros pueden variar, dependiendo de la hora Se necesita para completar estos procedimientos, así como el país en el que vive el cliente y la institución financiera que se usa. Más información está disponible cuando se inicia sesión en el sitio web bajo las secciones "depósito " o "retiro" Con respecto a Yandex.Money Pago rápido: "Cliente confirma que está familiarizado con las condiciones del servicio " yandex.money Pago rápido (https://money.yandex.ru/pay/doc.xml?offerid= defecto)."</p><p class="mb-5">6.5.1 La compañía tiene derecho a no procesar un pago si la identidad, la edad y el lugar de residencia del titular de la cuenta no se han verificado lo suficiente</p><p class="mb-5">6.5.2 La compañía puede designar un proveedor de soluciones de pago para que actúe, reciba depósitos, mantenga y administre fondos y / o retiros de aceleración, en nombre de la compañía</p><p class="mb-5">6.5.3 La compañía no acepta los fondos de efectivo enviados o entregados directamente a la Compañía o a un proveedor de soluciones de pago</p><p class="mb-5">6.5.4 La compañía se acreditará a la cuenta de la compañía todos los fondos recibidos por la Compañía desde o en nombre del titular de la cuenta, o propiedad de la compañía al titular de la cuenta</p><h3 class="font-bold">7. Limitación de la responsabilidad</h3><p class="mb-5">7.1 Usted ingresa al sitio web y participa en los juegos bajo su propio riesgo. Los sitios web y los juegos se proporcionan sin ninguna garantía, ya sea expresada o implícita</p><p class="mb-5">7.2 Sin perjuicio de la generalidad de la provisión anterior, la compañía, sus directores, empleados, socios, proveedores de servicios:</p><p class="mb-5">7.2.4 No garantiza que el software o el sitio web / sitios web sea / que sean aptos para su propósito;</p><p class="mb-5">7.2.5 No garantiza que el software y el sitio web estén libres de errores;</p><p class="mb-5">7.2.6 No garantiza que los sitios web y / o los juegos sean accesibles sin interrupciones;</p><p class="mb-5">7.2.7 no será responsable por ninguna pérdida, costos, gastos o daños, ya sea directo, indirecto, especial, consecuente, incidental o de otro tipo, que surja en relación con su uso de los sitios web o su participación en los juegos . </p><p class="mb-5">7.3 Usted acepta indemnizar y responsabilizar completamente a la compañía, sus directores, empleados, socios y proveedores de servicios por cualquier costo, gasto, pérdida, daños, reclamaciones y pasivos, lo que puede causar que pueda surgir en relación con su Uso del sitio web o participación en los juegos </p><h3 class="font-bold">8. Colusión, trampa, fraude y actividad delictiva</h3><h3 class="font-bold">8.3. Si:</h3><h3 class="font-bold">8.4. A los efectos de este párrafo 11:</h3><h3 class="font-bold">Donde hay una sospecha razonable de que el titular de la cuenta ha cometido o intentado cometer un abuso de bonificación, ya sea por su cuenta o como parte de un grupo, la compañía se reserva el derecho de:</h3><p class="mb-5">8.1. Las siguientes prácticas en relación con los servicios:</p><p class="mb-5">c) Nos damos cuenta de que usted ha respaldeado" o negó cualquiera de las compras o depósitos que realizó a su cuenta; o </p><p class="mb-5">D) Se vuelve a quiebra o sufre un procedimiento análogo en cualquier parte del mundo, entonces, (incluyendo en relación con cualquier suspensión y / o terminación de su cuenta) tendremos el derecho, con respecto a su cuenta para retener el entero o parte del equilibrio y / o recuperación de la cuenta el importe de cualquier depósito, pagos, bonificaciones o ganancias que se han visto afectados por o de alguna manera atribuibles a cualquiera de los eventos descritos en este párrafo. </p><p class="mb-5">a) una" práctica fraudulenta "significa cualquier actividad fraudulenta involucrada por usted o por cualquier persona que actúe en su nombre o en colusión con usted, e incluirá, sin limitación:</p><p class="mb-5">- Atrás de carga fraudulenta y actividad de rake-back;</p><p class="mb-5">- El uso por usted o cualquier otra persona que participó en el mismo juego que usted en cualquier momento, de una tarjeta de crédito o débito robado, clonada o no autorizada, como fuente de fondos;</p><p class="mb-5">- la colusión por parte de usted con otros para obtener una ventaja injusta (incluso a través de esquemas de bonificación o incentivos similares ofrecidos por nosotros);</p><p class="mb-5">- Cualquier intento de registrar información de la cuenta falsa o engañosa;</p><p class="mb-5">- Cualquier acto real o intentado por usted que está razonablemente considerado por ser ilegales en cualquier jurisdicción aplicable, hecha de mala fe, o destinado a defraudar a nosotros y / o eludir las restricciones contractuales o legales, independientemente de si tal acto o intento de acto en realidad nos causa ningún daño o daño; </p><p class="mb-5">b) una " Ventaja injusta "incluirá, sin limitación:</p><p class="mb-5">- la explotación de una falla, la laguna o el error en nuestro software de terceros o de cualquier tercero utilizado por usted en relación con los servicios (incluyendo con respecto a cualquier juego);</p><p class="mb-5">a) abuso de bonificaciones u otras promociones (según lo definido en el párrafo 11.4)</p><p class="mb-5">- El uso de jugadores automatizados ('bots'), u otros sistemas de análisis o software de terceros; o</p><p class="mb-5">- La explotación por parte de usted, de un 'error' según lo definido en el párrafo 18, en cualquier caso, ya sea a su beneficio y / o a la desventaja de nosotros u otro</p><p class="mb-5">c) El abuso de bonificación incluye, pero no se limita a:</p><p class="mb-5">I. Incumplimiento de los términos y condiciones de una bonificación, apuestas gratuitas o cualquier otra oferta promocional</p><p class="mb-5">II. La apertura de múltiples cuentas para reclamar múltiples bonificaciones;</p><p class="mb-5">III. Todas las bonificaciones están sujetas a la limitación de uso de bonificación según el motor de bonificación, y, a menos que se indique lo contrario, no se deben usar más de 6 veces por mes calendario; Si por alguna razón se usa un código de bonificación. por un jugador individual a lo largo de la cantidad indicada, la compañía se reserva el derecho de investigar aún más el patrón de abusación de los bonos y deducir las ganancias de bonificación más todos los cargos de terceros que surjan de la actividad del jugador (tarifas de pago, tarifas de los proveedores, etc.) </p><p class="mb-5">i. Fore el bono asignado al titular de la cuenta y cualquier ganancia de ese bono, y / o</p><p class="mb-5">II. Revocar, denegar o retirar una oferta de bonificación del titular de la cuenta y / o</p><p class="mb-5">III. Bloquea un acceso a productos particulares y / o</p><p class="mb-5">IV. Excluir el titular de la cuenta de cualquier oferta promocional futura, y / o</p><p class="mb-5">b) usando factores externos desleales o influencias (comúnmente conocidas como trampas)</p><p class="mb-5">v. Termine la cuenta del titular de la cuenta con efecto inmediato</p><p class="mb-5">c) tomando una ventaja injusta (como se define en el párrafo 11.4);</p><p class="mb-5">d) abrir cualquier cuenta duplicada; y / o</p><p class="mb-5">e) Emprender práctica fraudulenta o actividad delictiva (tal como se define en el párrafo 11.4), constituyen " Prácticas prohibidas " y no están permitidas. Tomaremos todos los pasos razonables para prevenir y detectar tales prácticas e identificar las relevantes. Los jugadores en cuestión si sí ocurren </p><p class="mb-5">8.2. Usted acepta que no debe participar o estar conectado con ninguna forma de práctica prohibida en relación con su acceso o uso de los servicios</p><p class="mb-5">a) Tenemos motivos razonables para creer que ha participado o se ha relacionado con cualquier forma de práctica prohibida (y la base de nuestra creencia incluirá el uso por parte de nosotros de cualquier fraude, prácticas de detección de trampas y detección de colusión que se utilizan en la industria del juego y el juego en el momento correspondiente); o </p><p class="mb-5">b) Ha colocado apuestas y / o juegos en línea jugados con cualquier otro proveedor en línea de servicios de juego y se sospeche (como resultado de dicho juego) de cualquier práctica prohibida o una actividad indebida; o</p><h3 class="font-bold">9.1 siempre que su cuenta no muestre que nosotros se debe a que se debe un saldo, tiene derecho a cerrar su cuenta y cancelar los términos de uso en no menos de veinticuatro horas de aviso a nosotros en cualquier momento, Al contactarnos a través de los servicios al cliente, los detalles de los cuales se pueden encontrar en contacto con nosotros y la sección de ayuda del sitio web: </h3><h3 class="font-bold">Cierre y terminación por nosotros</h3><h3 class="font-bold">Suspensión por nosotros</h3><h3 class="font-bold">9.10 La Compañía se reserva el derecho, a su entera discreción, para anular cualquier ganancia y perder cualquier saldo (ganancias y depósitos) en su cuenta de apuestas, para rescindir el acuerdo y / o suspender la provisión de los servicios o desactivar Su cuenta si: </h3><p class="mb-5">9.1.1 indicando su deseo de cerrar su cuenta; y</p><p class="mb-5">9.8 Los siguientes párrafos sobrevivirán a cualquier terminación de los Términos de uso: 19, 20, 21, 22, 23, 25, 26, 28, 29, 30, 31, 32 y 34 y cualquier otro párrafo que sean requerido para los fines de la interpretación; junto con cualquier sección relevante de las reglas de apuestas, reglas de juego relevantes y los términos adicionales </p><p class="mb-5">9.1.2 indicando las razones por las cuales desea cerrar su cuenta, en particular si lo está haciendo debido a las preocupaciones durante el nivel de su uso de los servicios</p><p class="mb-5">9.9 Tenemos derecho a suspender su cuenta en las circunstancias expresamente establecidas en los términos de uso. Sobre la suspensión de su cuenta: (a) No se permitirá ninguna actividad (incluidos depósitos, retiros, apuestas o juegos ) hasta la fecha en que se reactiva por nosotros; (b) no se acreditarán bonos ni ganancias contingentes a la cuenta; y (c) abordaremos el problema que ha dado lugar a la suspensión de la cuenta con miras a resolviéndolo tan pronto como sea razonablemente posible para que la cuenta pueda, según corresponda, sea reactivada o cerrada </p><p class="mb-5">i) Identificamos que usted ha disfrazado, o ha interferido o tomado medidas para disfrazar o interferir, de cualquier manera con la dirección IP de cualquier dispositivo utilizado para acceder a nuestro sitio (como usar una red privada virtual"VPN" ) </p><p class="mb-5">ii) A nuestra atención se presta que el cliente usó documentos forjados (fotos, documentos escaneados, capturas de pantalla, etc.) durante el procedimiento de verificación o en cualquier momento en el que el acuerdo está activo</p><p class="mb-5">iii) Existe una sospecha razonable de que ha cometido o intentado cometer un abuso de bonificación, ya sea por su cuenta o como parte de un grupo</p><p class="mb-5">iv) Usted está involucrado en cualquier actividad fraudulenta, colusiva, de fijación u otra actividad ilegal en relación con la participación de su o terceros o utilice los métodos o técnicas o dispositivos de hardware asistidos por software para su participación en cualquiera de los Servicios proporcionados por la empresa </p><p class="mb-5">9.11 Company se reserva el derecho de cerrar las cuentas existentes sin explicación. En este evento, o en el caso de un cierre de cuenta por un cliente, se pagará el saldo de la gaviota a menos que sea un fraudulento (por ejemplo, arbitraje, etc. ) Se sospecha el comportamiento. En caso de comportamiento fraudulento, se anularán ganancias y se reembolsarán los depósitos después de que dejemos de que las tarifas administrativas y de transacción correspondientes y cualquier tarifa que la Compañía esté obligada a pagar a las autoridades competentes debido a la queja de un cliente. también se reserva el derecho de informar a las autoridades correspondientes, si algún cliente está involucrado en cualquier forma de sospecha de comportamiento fraudulento </p><p class="mb-5">9.12 Si, en la única determinación de la compañía, se encuentra que el jugador ha engañado o intentado defraudar a la compañía, incluso entre ellos, entre otros, entre otros, pero no se limita a la manipulación del juego, utilizando estrategias (E.G Martingale, sistema anti-Martingale) dirigido a ganancias infieles o fraudes de pago, o si él / ella hace comentarios falsos y / o maliciosos con respecto a la operación de la compañía en cualquier medio o foro, o si la compañía sospecha que el jugador de pago fraudulento, incluido el uso de tarjetas de crédito robadas o Cualquier otra actividad fraudulenta (incluida, entre otras, ninguna devolución de cargo u otra inversión de un pago) o transacciones prohibidas (incluidas, entre otras, el lavado de dinero), la compañía se reserva el derecho de publicar las acciones del jugador junto con su identidad y e Dirección de carga, así como para hacer circular esta información a bancos, compañías de tarjetas de crédito y agencias apropiadas. Además, la compañía puede cerrar cualquier cuenta y perder cualquier cuenta saldo que T El jugador tiene con la compañía </p><p class="mb-5">Nos reservamos el derecho de vaciar y retener a cualquiera o todas las ganancias realizadas por cualquier jugador, donde tengamos motivos razonables para creer que dicho jugador está actuando o ha actuado en el enlace con un intento de defraudar o dañar la compañía y dañar la empresa y / o los servicios y / o la plataforma de alguna manera </p><p class="mb-5">En interés de la protección de datos, la seguridad y la evitación del fraude, la compañía no permite el uso de ningún canal de comunicación incluido dentro de los servicios y / o la plataforma para ofrecer o promover ninguna oferta, productos o servicios (ya sea El jugador o un tercero). El jugador está expresamente prohibido publicar información o ponerse en contacto con nuestros clientes para ofrecer o promover cualquier oferta, productos o servicios </p><p class="mb-5">Responderemos a su solicitud, confirmando el cierre de su cuenta y la fecha en que dicho cierre será efectivo, dentro de un tiempo razonable, siempre que continúe asumiendo la responsabilidad de todas las actividades en su cuenta hasta que dicho cierre tenga llevado a cabo por nosotros (en ese momento, los términos de uso terminarán) </p><p class="mb-5">9.2 Cuando solicita el cierre de su cuenta en el párrafo 9.1, sujeto al párrafo 9.3, devuelva cualquier saldo pendiente en su cuenta.</p><p class="mb-5">9.3 sobre cualquier terminación de su cuenta en virtud de este párrafo 9, tendremos derecho (sin limitar nuestros derechos en virtud del párrafo 9.6) para retener, a partir del reembolso del saldo pendiente en su cuenta, cualquier fondos: (a) de conformidad al párrafo 8 (colusión, trampa, fraude y actividad delictiva); (b) de conformidad con el párrafo 20 (incumplimiento de los términos de uso); (c) según lo proporcionado por los términos de uso (incluyendo, según corresponda, párrafo 5.4) o (d) según lo exija la ley o regulación </p><p class="mb-5">9.4 Al reembolsar el saldo pendiente en su cuenta, utilizaremos el mismo método de pago que proporcionó al registrarse de su cuenta, o dicho método de pago, ya que podemos seleccionar razonablemente</p><p class="mb-5">9.5 Donde haya cerrado su cuenta, en ciertas circunstancias podremos volver a abrir su cuenta con los mismos detalles de la cuenta que antes, nos solicita. En tales circunstancias, mientras que su cuenta tendrá su cuenta. Los mismos detalles de la cuenta que antes, estarán sujetos a los términos de uso que están vigentes en la fecha de cualquier re-abertura y cualquier derecho anterior (incluidos, pero sin limitación, a las bonificaciones o ganancias contingentes) ya no serán válido.</p><p class="mb-5">9.6 Somos, en cualquier momento (y a pesar de cualquier otra disposición contenida en los Términos de uso), con derecho a cerrar su cuenta y terminar los Términos de uso en Aviso por escrito (o intento de aviso) Usar su contacto Detalles. En el caso de que cualquier terminación por parte de nosotros, sujetos, sujeto a párrafo 12.7, tan pronto como sea razonablemente practicable después de una solicitud de usted, reembolsar el saldo de su cuenta </p><p class="mb-5">9.7 Donde cerramos su cuenta y terminemos los Términos de uso de conformidad con el párrafo 11 (colusión, trampa, fraude y actividad delictiva) o el párrafo 20 (incumplimiento de los Términos de uso), el saldo de su cuenta será No reembolsable y considerado que debe perderse por usted en la medida de que cualquier afirmación que podamos tener en su contra en la fecha de dicho cierre (ya sea en su cuenta, hay una cuenta duplicada o algo similar). Cierre de su cuenta y La terminación de los Términos de uso, que no sea de conformidad con los párrafos 11 o 20 de estos Términos Generales, no afectará a ninguna apuesta pendiente, siempre que tales apuestas pendientes sean válidas y usted no esté en violación de los términos de uso de ninguna manera. Por La evitación de la duda, no acreditaremos ninguna bonificación a su cuenta, ni tendrá derecho a ninguna ganancia contingente, en cualquier momento después de la fecha en que se haya cerrado (ya sea por nosotros de conformidad con los Términos de uso, o en respuesta a su solicitud). </p><h2 class="text-2xl font-bold leading-8">Terminación de los Términos de uso Cierre y terminación por usted</h2><h3 class="font-bold">10. Registro</h3><p class="mb-5">10.1 Sólo los usuarios registrados pueden participar en los programas de bonificación de la empresa. Para registrarse, el usuario debe completar de manera completa y precisa el formulario de registro</p><p class="mb-5">10.10 La Compañía se reserva el derecho, en cualquier momento, para revisar la identidad del jugador, sin previo aviso, y antes de procesar los pagos; la compañía también se reserva el derecho de mantener retiros por el tiempo necesario para verificar la identidad del jugador. </p><p class="mb-5">10.10.1 Tenga en cuenta que cuando los depósitos o retiros acumulativos alcanza los 2,000 €, el procedimiento de verificación del jugador será obligatorio. El proceso de verificación requerirá de los jugadores para proporcionar documentos como, pero no limitados a, tarjetas de identidad, tarjetas bancarias , declaraciones bancarias, fuente de riqueza, fuente de fondos y facturas de servicios públicos. En caso de datos personales falsos proporcionados por los jugadores, la retirada puede ser rechazada y la cuenta de usuario se puede cancelar. El jugador será informado por correo electrónico. En Algunos casos que la compañía puede solicitar el selfie con ID, selfie con identificación y signo especial, o incluso llamada o videollamada. Cuando se soliciten documentos, el titular de la cuenta debe cargar dicha documentación en su cuenta (Mis documentos de perfil&gt; MIS). Al solicitar documentos Para una verificación de cuenta, se cancelará cualquier retiro pendiente </p><p class="mb-5">10.10.2 Una vez que se completa la verificación, el titular de la cuenta puede solicitar una nueva retirada. En el caso de que la cuenta no se verifique dentro de los treinta (30) días a partir de la fecha de solicitud inicial, la cuenta se congelará para Juego y transacciones., Donde, por cualquier motivo, un titular de cuenta se niega o no puede proporcionarnos ninguno de los documentos solicitados, la compañía se reserva el derecho de suspender la cuenta y confiscar cualquier fondos disponibles </p><p class="mb-5">10.10.3 La solicitud de reembolso también puede ser rechazada por el Casino si el jugador proporciona datos personales falsos o modificados intencionalmente para evitar el sistema</p><p class="mb-5">10.2 La inscripción y las apuestas solo se permiten para las personas mayores de 18 años (o el rango de edad permitido en el país dado desde el cual el usuario ha abierto un depósito y apuestas hechas). Los usuarios tienen una responsabilidad completa en términos de lidiar con el Legalidad de los juegos de azar de Internet en la región donde viven y / o por proporcionar a las autoridades apropiadas de su país información sobre las ganancias. La compañía se reserva el derecho de exigir pruebas de edad y bloquear la cuenta del usuario antes de recibir la documentación correspondiente </p><p class="mb-5">10.3 Toda la información proporcionada durante el registro debe ser precisa y completa. En particular, cuando se usa tarjetas de crédito o débito, el nombre y el apellido del titular de la tarjeta deben coincidir con el nombre y el apellido indicados en el formulario de registro, de lo contrario la cuenta será la cuenta. Bloqueado. Todas las apuestas realizadas antes de bloquear la cuenta son reconocidas como válidas </p><p class="mb-5">10.4 La Compañía se reserva el derecho de bloquear las cuentas de los usuarios que han reportado datos falsos, así como para negarles el pago de cualquier ganancia. A la solicitud de la empresa, el usuario debe presentar un documento oficial con una fotografía, confirmando su identidad (una copia de pasaporte o su identificación nacional), prueba de autenticidad de los datos de direcciones indicados y teléfono y prueba de propiedad del método de pago </p><p class="mb-5">10.5 Cada usuario puede tener una sola cuenta. Los usuarios registrados no pueden volver a registrarse como un nuevo cliente con un nuevo nombre o una nueva dirección de correo electrónico. En caso de violación de esta regla, la compañía tiene derecho a anular todo. apuestas realizadas por el usuario </p><p class="mb-5">10.6 El usuario no tiene derecho a permitir que ningún tercero utilice su cuenta de juego</p><p class="mb-5">10.7 Tenga en cuenta que no debe enviarnos los detalles sobre su cuenta de tarjeta de crédito u otra información financiera confidencial a través de un correo electrónico no cifrado</p><p class="mb-5">10.8 La compañía permite a todos sus usuarios elegir su propia combinación de nombre de usuario y contraseña. Los usuarios deben mantener ese secreto de información. Si su nombre de usuario y contraseña se ingresan correctamente mientras acceden al sitio, todas las apuestas permanecen en vigor y no pueden ser Cancelado o cambiado por el usuario. Si sospecha que alguien, aparte de usted, conoce su contraseña, cambie inmediatamente en nuestro sitio web. Si ha olvidado la contraseña o una parte de él, haga clic en el "¿Olvidó su contraseña?" Botón en la página de inicio de sesión y siga el procedimiento para restablecerlo</p><p class="mb-5">10.9 Los usuarios que colocan sus apuestas en la compañía a través de un teléfono celular deben recordar que la Compañía no es responsable de cualquier pérdida de datos en el teléfono móvil del cliente, y no es responsable de ninguna comisión de Mobile e Internet Operadores. Al registrarse, el cliente confirma que acepta y acepta estos términos </p><h3 class="font-bold">Moneda</h3><p class="mb-5">11.1 Actualmente los usuarios tienen derecho a colocar las apuestas en las siguientes monedas: EUR, USD, AUD, CAD, NOK, GBP, RUB, NZA, JPY, BRL. La compañía se reserva el derecho de bloquear la recepción de apuestas. y actividades operativas en cualquiera de las monedas indicadas. En este caso, todos los pagos necesarios en las cuentas de la moneda bloqueada se llevarán a cabo en otra moneda equivalente en el tipo de cambio interbancario para ese día </p><h3 class="font-bold">12. El programa de bonificación</h3><p class="mb-5">12.1 Los bonos de todos los usuarios están limitados individualmente a una persona, domicilio, número de teléfono y dirección de correo electrónico, una factura de pagos (como por número de tarjeta o cuenta Skrill), así como la computadora que se está utilizando (Incluyendo el Instituto, Club de Internet y otras instituciones públicas). La compañía tiene el derecho de rechazar la bonificación a cualquier usuario o grupo de usuarios. Los programas de bonificación están disponibles solo para los usuarios que han hecho un depósito en moneda real a la cuenta de la compañía. </p><p class="mb-5">12.3.5 Bonos deben ser apostados exclusivamente en juegos válidos que pertenecen a la categoría de juego específica bajo la cual se ofreció inicialmente el bono. Por ejemplo, un bono de Applebook debe ser apostado exclusivamente en los deportes, un bono de casino exclusivamente en tragamonedas y un bono de casino en vivo exclusivamente en juegos de casino en vivo </p><p class="mb-5">12.3.6 Bonos de casino (ranuras) a veces se ofrecen en proveedores de servicios de juego específicos (GSP) o en tragamonedas específicas. Por lo tanto, solo se tomará en consideración la apuesta realizada en las ranuras específicas del GSP y / o en las ranuras específicas. hacia los requisitos de apuestas de bonificación </p><p class="mb-5">12.3.8 para giros sin depósito, chips de casino y apuestas gratuitas otorgadas a los jugadores que no han hecho un depósito, un depósito mínimo, así como una apuesta de X1 (Times One), se requiere la cantidad de depósito. , antes de que las ganancias se puedan retirarse. Las bonificaciones de los casinos de lealtad, giros gratuitos, chips de casino y bonos de la lealtad de los deportes y freebets se pueden otorgar solo a los jugadores completamente verificados. Solo se permite un bono por cliente, por hogar, por dirección, por computadora compartida y Dirección IP compartida, y por cualquier detalle de la cuenta como una dirección de correo electrónico, detalles de cuenta bancaria, información de la cuenta de la tarjeta de crédito y número de cuenta del sistema de pago. Cualquier abuso de la oferta de bonificación conducirá al cierre de la cuenta </p><p class="mb-5">12.3.9 Los FreeBets ofrecidos deben colocarse en el fútbol con probabilidades mínimas de 2,00. Se excluyen los mercados de discapacidades y dibujos sin apuestas</p><p class="mb-5">12.3.10 La cantidad máxima de apuestas permitida para colocarse con el dinero de bonificación en el casino es de 5 EUR (o el equivalente en otras monedas) o el 15% del monto total de bonificación otorgado (lo que ocurra primero). Cualquiera de las rondas de juego o giros que excedan la cantidad máxima de apuestas no contarán para los requisitos de apuestas adicionales y se perderán las ganancias potenciales </p><p class="mb-5">12.3.11 Si un jugador decide cancelar un bono activo, puede hacerlo de su cuenta. Sin embargo, todo el dinero de bonificación, todas las ganancias y cualquier cantidad apostada resultante de su actividad de apuestas con la bonificación se perderá por De una vez por todas. Las apuestas de bonificación calculan el dinero real primero y luego la cantidad de bonificación </p><p class="mb-5">12.2 en caso de violación de cualquier requisito de los programas de bonificación, y también si existe alguna evidencia de apuestas recurrentes en uno y el mismo evento de un grupo de clientes, o conspiración, independientemente del resultado de los dados Las apuestas, la compañía se reserva el derecho de privar a estos usuarios de un bono y considerar las apuestas correspondientes como inválidas. A los efectos de protección contra el fraude, la compañía tiene el derecho de exigir un documento del cliente que demuestre la identidad antes de transferir una bonificación </p><p class="mb-5">12.3.12 Ofertas personalizadas comunicadas exclusivamente a un segmento específico de jugadores a través de correo electrónico o SMS están disponibles exclusivamente para los destinatarios previstos del correo electrónico o SMS y para aquellos solamente</p><p class="mb-5">12.3.13 para ofertas personalizadas comunicadas por correo electrónico o SMS, se solicita a los jugadores que se pongan en contacto con nuestro equipo de atención al cliente para reclamar el bono que proporciona todos los detalles necesarios (por ejemplo, el código de bonificación, el tipo de oferta, la dirección de correo electrónico del destinatario, etc.).</p><p class="mb-5">12.3.14 En algunas ocasiones, proporcionaremos giros gratis en forma de un chip de bonificación de casino. La cantidad a acreditar tiene en cuenta la apuesta mínima permitida en la (s) ranura (s) específica. Por ejemplo, 20 Giros gratuitos en las pistolas Netent's Guns N 'Roses Slot se otorgarán como un chip de Casino de 4 EUR (o en moneda equivalente) y está destinado a reproducirse en la ranura específica (Bonus Chip = Min. Bet (0,20 EUR) X Número de rondas (20) = 4 EUR). </p><p class="mb-5">12.3.15 Ninguno de los materiales promocionales ofrecidos a través de este sitio web son transferibles, intercambiables o reembolsables. En la ocurrencia donde un cierto material promocional no es operable debido a restricciones técnicas, geográficas o legales, la compañía no tiene ninguna Responsabilidad y se reserva el derecho de no compensar o reembolsar a los jugadores </p><p class="mb-5">12.3.16 Los jugadores pueden solicitarse en un momento dado para proporcionar todos los documentos de KYC necesarios para la verificación de su cuenta (prueba de identidad, método (s) de pago (s) y residencia).</p><p class="mb-5">12.3.17 En caso de duda para los requisitos de apuestas restantes de los bonos, se recomienda que los jugadores se comuniquen con nuestro equipo de atención al cliente</p><p class="mb-5">12.3.18 Wagering no contará con los siguientes juegos. Usted es el único responsable de no incluir los siguientes juegos dentro de su apuesta de bonificación:</p><p class="mb-5">Todos los juegos de video póker, todos los juegos de ruleta, todos los juegos de juego rápido, todos los juegos de blackjack, hola, fiebre, todos los juegos de baccarat, 3 cartas, póquer, ruleta europea, chupadores de sangre, chupadores de sangre II, el desestro, muerto o Vivo, muerto o vivo II, Jack Hammer 2, Cloud Quest, Tower Quest, Perlas de la India, Isla del Tesoro, Ojo del Kraken y Solar Reina </p><p class="mb-5">La Compañía se reserva el derecho de renunciar a las ganancias y cualquier cantidad apostada si los clientes encontraron que lograron jugar los juegos mencionados anteriormente con un bono activo</p><p class="mb-5">12.3.19 Nos reservamos el derecho de modificar, cancelar o cancelar cualquiera de las promociones en un momento dado y sin previo aviso</p><p class="mb-5">12.3 Términos promocionales a menos que se indique lo contrario, los siguientes términos se aplican a todos los bonos, giros gratis, apuestas gratuitas, chips de casino y cualquier otro "material promocional" ofrecido a través del sitio web, boletines y SMS</p><p class="mb-5">12.4.1 El saldo se paga directamente en tu Saldo en Efectivo, que puedes usar para jugar en Casino o retirar.</p><p class="mb-5">12.4.2 Tu amigo debe registrarse a través de tu enlace de invitación personal.</p><p class="mb-5">12.4.3 Para recibir 5 USD en tu saldo, tu amigo debe hacer un depósito de al menos 10 USD (tu amigo puede depositar 10 USD en varias cuotas).</p><p class="mb-5">12.4.4 Si un amigo al que has invitado no es del mismo país que tú, recibirás una recompensa predeterminada convertida a tu moneda local al tipo de cambio justo.</p><p class="mb-5">12.4.5 No puedes crear nuevas cuentas de Casino y registrarte a través de tu propio enlace para recibir la recompensa. El programa de Referir a un Amigo está diseñado para que nuestros jugadores inviten a amigos a la plataforma. Cualquier otro uso de este programa está estrictamente prohibido.</p><p class="mb-5">12.4.6 Casino puede suspender o finalizar el programa de Referir a un Amigo o la capacidad del usuario para participar en él en cualquier momento y por cualquier motivo. Nos reservamos el derecho de suspender cuentas o eliminar el Saldo en Efectivo si notamos alguna actividad que consideremos abusiva, fraudulenta o en violación de los Términos de Servicio o los Términos de Referir a un Amigo. Nos reservamos el derecho de revisar e investigar todas las actividades de referidos y de suspender cuentas o modificar referidos a nuestra sola discreción, según consideremos justo y apropiado.</p><p class="mb-5">12.3.1 Casino 'Bienvenido' y 'Reload' (ranuras) y los bonificaciones de 'Bienvenida' y 'Reload' son válidas por un período de 30 días desde el momento en que se acreditan a la cuenta de los jugadores . Después del período de 30 días, los materiales promocionales mencionados vencen y no son reclamables o reembolsables </p><p class="mb-5">12.3.2 Live Casino 'Bienvenido' y 'Reload' Bonus son válidos por un período de 14 días desde el momento en que se acreditan a la cuenta de los jugadores. Después del período de 14 días, los materiales promocionales mencionados vencen. y no son reclamables ni reembolsables </p><p class="mb-5">12.3.3 Todos los giros gratis, Freeebets, Bonus Chips, son válidos por un período de 7 días desde el momento en que se acreditan a la cuenta de los jugadores. Después del período de 7 días, los materiales promocionales mencionados vencen y no son reclamables ni reembolsables. Las ganancias máximas de la bono de reembolso / lealtad se limitan a cinco (5x) veces la cantidad inicial de bonos de devolución de devolución. Cualquier ganancia por encima de la que se perderá. Ganas máximas de temporada / promociones especiales (incluyendo, pero no limitado Para, las bonificaciones de Navidad, las bonificaciones de Pascua, las bonificaciones de Halloween) para un 200% y por encima del umbral de bonificación, se limitan a cuatro (4x) veces la cantidad de depósito inicial. Las ganancias máximas para bonificaciones entre 150%, 199% de umbral de bonificación, están limitados a ocho ( 8x) veces la cantidad de depósito inicial. Las ganancias máximas para bonificaciones entre 120% - 149% de umbral, se limitan a diez (10x) veces la cantidad de depósito inicial. Las ganancias máximas para bonificaciones entre el 100% - 119% de umbral, se limitan a quince ( 15x) veces el depósito inicial Ount. Las ganancias máximas para bonificaciones entre 25% - 99% de umbral, se limitan a veinte (20x) veces la cantidad de depósito inicial. Cualquier ganancia por encima de esos límites se perderá </p><p class="mb-5">- Giras gratis: x20 (veces veinte) la cantidad de ganancias</p><p class="mb-5">- Casino Chip: X25 (Tiempos veinte) La cantidad de bonificación</p><p class="mb-5">- FreeBets: X1 (Times One) la cantidad de ganancias</p><h3 class="font-bold">13. Depósitos</h3><p class="mb-5">13.1 Los métodos de pago disponibles están determinados por el país y la moneda seleccionada durante el registro. Una lista completa de las tarifas, los límites de ellos y otros artículos se muestran en la página de depósitos y retiros. La compañía se reserva el derecho de cambiar. Estos términos y detalles </p><p class="mb-5">13.2 Al realizar cualquier transacción financiera, es necesario que el nombre del propietario de la tarjeta de débito / crédito o cuenta bancaria coincida exactamente con el nombre del propietario de la cuenta correspondiente de la empresa. De lo contrario, la compañía se reserva El derecho a cancelar todas las transacciones y hacer un retorno en todas las apuestas realizadas al usar la cuenta de otra persona o la tarjeta de crédito / débito </p><h3 class="font-bold">14. Entrada de dinero en cuenta</h3><p class="mb-5">14.1 Si algún fondos se ha transferido al usuario erróneamente, el usuario está obligado a notificar a la compañía de inmediato. Cualquier ganancia del cliente que surja de un error de este tipo se considerará inválida, y tales apuestas son reembolsables, independientemente de El retraso entre el origen del error y el tiempo que se vio </p><p class="mb-5">14.2 Si los depósitos a la cuenta se hicieron para cualquier otro propósito que las apuestas, el póker, el casino y las apuestas financieras, la compañía (particularmente en caso de fraude sospechoso) se reserva el derecho de cancelar un depósito y recolectar del usuario. Todos los costos incurridos como resultado de procesar el depósito </p><p class="mb-5">14.3 Si el depósito del usuario excede la cantidad de la apuesta, a la solicitud del cliente de retiro, la Compañía se reserva el derecho de cobrar al usuario todos los costos incurridos como resultado de los depósitos de procesamiento y los retiros</p><h3 class="font-bold">15. Restricciones financieras</h3><p class="mb-5">15.1 La apuesta mínima en cualquier evento es el equivalente de 0.50 euros en la moneda registrada de la cuenta del juego. La apuesta mínima en el modo "múltiple" y la apuesta mínima en una versión del "sistema" Es el equivalente de 0,50 euros </p><p class="mb-5">15.3 El monto máximo de la apuesta en el evento depende del deporte y los eventos, y está definido por la red de libros específicamente para cada evento y cada tipo de apuesta y está sujeto a cambios sin previo aviso por escrito. La empresa se reserva el derecho de limitar la apuesta máxima en eventos individuales, así como la introducción y eliminación de restricciones específicas en las cuentas de usuarios individuales sin previo aviso o explicación de las razones </p><p class="mb-5">15.4 Todas las limitaciones financieras son aplicables a cada usuario / grupo que actúa juntos, haciendo que las apuestas que contengan las mismas predicciones. Si el usuario hace una serie de apuestas que contienen las mismas predicciones, el pago total en estas apuestas puede estar limitado por la Tamaño de un pago máximo regulado por limitaciones dadas </p><h3 class="font-bold">16. Pagos</h3><p class="mb-5">16.1 Los pagos se procesan en un tiempo que no excedan las 72 horas a partir del momento de que la solicitud ha sido aprobada por el Departamento de Pagos. Antes de que se realice el primer pago al usuario a través de métodos de pago electrónicos (Skrill, WebMoney, Crédito o tarjeta de débito, etc.), el cliente está obligado a cargar una copia electrónica de un pasaporte de su identificación nacional en la sección correspondiente en su perfil. La compañía, a su propia discreción, puede solicitar los documentos adicionales del cliente (por ejemplo, Prueba de discurso, selfies, etc.) Antes de su primer pago. Recuerde que la falsificación es severamente castigada por la ley y en los casos de sospecha de realizar una copia falsificada o editada de los documentos por métodos electrónicos, la compañía se reserva el derecho de enviar Dichos documentos a las autoridades regulatorias apropiadas </p><p class="mb-5">16.2 Antes de realizar el pago, los empleados de la compañía verificarán la correspondencia del nombre, el apellido, el nombre del padre, las fechas de nacimiento del cliente y también otros datos. Si se encuentran las diferencias entre los datos reales y los datos. proporcionado por el cliente, la compañía se reserva el derecho de realizar un reembolso por todas las apuestas por parte del usuario y se niega a pagar las ganancias al usuario a menos que prueben su identidad y precisión de los datos ingresados ​​</p><p class="mb-5">16.3 Si resulta que el usuario ha abierto varias cuentas en la empresa, la compañía se reserva el derecho de negarse a pagar estas cuentas (excepto los activos del usuario, legítimamente transferidos a la cuenta de la compañía, después de su pago de una 20% de multa de la cantidad total de depósitos). </p><p class="mb-5">16.4 Con la primera solicitud de retiro, el usuario debe ingresar los detalles de identificación válidos de pasaporte o identificación personal, exactamente como aparece en el documento, en el idioma del país que emitió (o en el caso de documentos extranjeros, en Inglés).</p><p class="mb-5">16.5 Los miembros del grupo y la familia deben regular las relaciones personales con los pagos, se realizan solo en nombre del propietario de la cuenta correspondiente</p><p class="mb-5">16.6 El usuario acepta proporcionar a la compañía información sobre su cuenta bancaria de la que se realizarán las apuestas en particular, para transferir sus ganancias</p><p class="mb-5">16.7 La Compañía no es responsable de los cambios en el número de pagos relacionados con las fluctuaciones de la moneda (tasa de cambio)</p><p class="mb-5">16.8 Si el usuario ha solicitado un retiro en la cantidad de 1,000 euros o más (o el equivalente en otra moneda en la tasa interbancaria), la compañía paga una comisión sobre la transferencia y las operaciones posteriores de los retiros en el calendario dado Mes. De lo contrario, la Comisión se le paga al banco por el usuario. La cantidad máxima capaz de retiro durante un período de 24 horas es de 1,000 euros (o el equivalente en otra moneda en la tasa interbancaria) sujeto a los límites específicos de su proveedor de pago. Para las ganancias Más de 10.000 euros, los pagos se realizarán en cuotas mensuales iguales. </p><p class="mb-5">16.9 La compañía se reserva el derecho de la retirada del derecho de los fondos utilizando una prioridad por sí misma método de pago para los jugadores ganadores (incluida la tarjeta de crédito / débito o a la cuenta bancaria del jugador).</p></div>
        `
    },
    'fairness': {
        title: 'Métodos de prueba de imparcialidad y RNG',
        subtitle: 'Juego justo',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block"><h3 class="font-bold">2. Alcance</h3><p class="mb-5">Las disposiciones en este proceso de prevención de lavado de dinero tienen como objetivo reducir la posibilidad de que el negocio de prestar servicios por parte de Mirage Corporation sea utilizado con fines delictivos o en violación de las regulaciones.</p><p class="mb-5">Este proceso proporciona orientación detallando la responsabilidad con respecto a la prevención del lavado de dinero y el financiamiento del terrorismo desde la perspectiva del marco legal de y las regulaciones internacionales aceptadas en esta área.</p><h3 class="font-bold">3. Ley, Regulaciones y Reglas</h3><p class="mb-5">El Código de Derecho Penal (Código Penal) de Curazao establece los procedimientos para la persecución de un delito de lavado de dinero, así como las medidas para la confiscación de bienes tras una condena por lavado de dinero, medidas para la congelación de activos cuando una persona es acusada de un delito de lavado de dinero y medidas para la emisión de una orden de investigación y/o embargo cuando se sospecha que una persona ha cometido un delito de lavado de dinero.</p><p class="mb-5">Las políticas y procedimientos en este manual tienen como objetivo cumplir con las reglas y orientaciones contenidas en el NOPML, el NORUT y el NOIS, que se refieren al Código Penal. Además de estas regulaciones, el Banco Central de Curazao y Sint Maarten ha introducido un marco integral con disposiciones y pautas para prevenir y combatir el lavado de dinero y la financiación del terrorismo (en adelante: las “Disposiciones y Pautas” o “P&amp;G”). ha basado estas disposiciones y pautas en, entre otros, las recomendaciones del FATF.</p><p class="mb-5">Tanto el NORUT como el NOIS son aplicables a entidades que ofrecen la posibilidad de participar en juegos de azar en alta mar (juegos de azar en línea) dentro o fuera de , que es el caso de la Compañía. El NOIS prohíbe a las personas sujetas establecer una relación comercial o llevar a cabo una transacción ocasional con un solicitante de negocios a menos que dicha persona sujeta mantenga las siguientes medidas y procedimientos establecidos en relación con ese negocio de acuerdo con las disposiciones del NOIS:</p><p class="mb-5">• medidas de debida diligencia del cliente;</p><p class="mb-5">• procedimientos de mantenimiento de registros; y</p><p class="mb-5">• procedimientos de informes internos.</p><p class="mb-5">La Compañía está obligada a aplicar las medidas y procedimientos mencionados anteriormente, incluso en los casos en que establezca o lleve a cabo relaciones o transacciones no presenciales, directa o indirectamente, a través de su empresa del grupo afiliada.</p><p class="mb-5">La Compañía también está obligada a garantizar que los empleados estén informados de la legislación aplicable en materia de AML/CFT, así como de las políticas y medidas del sujeto-persona en este sentido. Los empleados deben someterse a procedimientos de debida diligencia adecuados antes de su contratación y también se espera que reciban capacitación sobre el reconocimiento y manejo de las transacciones realizadas por, o en nombre de, cualquier persona que haya estado, esté o parezca estar involucrada en el lavado de dinero o la financiación del terrorismo.</p><h3 class="font-bold">4. Política</h3><h3 class="font-bold">Responsabilidad</h3><h3 class="font-bold">Riesgo de AML</h3><h3 class="font-bold">Mirage Corporation utiliza las siguientes orientaciones como base para su modelo de riesgo de AML:</h3><h3 class="font-bold">Factores de riesgo de AML</h3><p class="mb-5">La responsabilidad última de la política contra el lavado de dinero de Mirage Corporation recae en el Director.</p><p class="mb-5">Se mantendrá una descripción general de la evaluación de riesgos de negocios de AML para asignar y hacer seguimiento a los componentes de las clasificaciones de riesgo separadas. Mirage Corporation categoriza el riesgo general de AML en:</p><p class="mb-5">• Riesgo del cliente</p><p class="mb-5">• Riesgo del producto</p><p class="mb-5">• Riesgo de interfaz</p><p class="mb-5">• Riesgo geográfico</p><p class="mb-5">Políticas y procedimientos de AML</p><p class="mb-5">Las políticas y procedimientos implementados por Mirage Corporation para cumplir con los requisitos regulatorios aplicables en materia de AML y CFT están documentados en este Manual. Las políticas y procedimientos se revisarán periódicamente para garantizar que sigan cumpliendo con los requisitos regulatorios y el cambiante entorno de riesgo en la medida en que sean aplicables a Mirage Corporation.</p><p class="mb-5">• una declaración clara de la cultura y los valores adoptados hacia la prevención del delito financiero;</p><p class="mb-5">• un compromiso para garantizar que la identidad se verifique de manera satisfactoria en todos los casos y de manera basada en el riesgo, antes de que los solicitantes de negocios sean aceptados como clientes;</p><p class="mb-5">• un compromiso con la debida diligencia continua del cliente durante toda la relación comercial;</p><p class="mb-5">• un compromiso para garantizar que el personal esté capacitado y sea consciente de la ley, sus obligaciones legales y cómo cumplir con esas obligaciones;</p><p class="mb-5">• una asignación clara de roles, responsabilidades y estructura organizativa, y reconocimiento de la importancia de que el personal informe sus sospechas internamente de manera oportuna.</p><p class="mb-5">Los procedimientos contenidos en este Manual reflejan la Política de AML de Mirage Corporation en general y deben ser respetados por todo el personal de Mirage Corporation.</p><h3 class="font-bold">5. Evaluación de riesgos, gestión y enfoque basado en riesgos</h3><h3 class="font-bold">Evaluación de riesgos</h3><h3 class="font-bold">Evaluación de riesgos de delito financiero</h3><h3 class="font-bold">Mitigación de riesgos</h3><h3 class="font-bold">Controles de monitoreo</h3><p class="mb-5">Los procedimientos de implementación establecen que el propósito de los procedimientos de evaluación de riesgos es permitir que la Compañía esté en posición de identificar y evaluar los riesgos de ML/FT a los que el sujeto-persona está o puede estar expuesto, y así determinar:</p><p class="mb-5">El enfoque basado en riesgos para la prevención del delito financiero se refleja en el enfoque de Mirage Corporation para la operación y el desarrollo de los sistemas y controles diseñados para minimizar el riesgo de que Mirage Corporation sea utilizada con fines de delito financiero. El riesgo es fundamental para el desarrollo del negocio, nuevos productos, desarrollo de la funcionalidad del producto o la operación en nuevos mercados.</p><p class="mb-5">Cuando Mirage Corporation aborda un nuevo servicio, grupo de clientes o nueva geografía, la evaluación de riesgos de delito financiero se actualizará durante el desarrollo/lanzamiento (para garantizar que los procesos de AML puedan respaldar las nuevas actividades).</p><p class="mb-5">Las evaluaciones de riesgos de delito financiero se llevan a cabo de manera continua, y en particular, se aplican cuando el entorno empresarial cambia a través de, por ejemplo:</p><p class="mb-5">• La entrada a nuevos mercados; y</p><p class="mb-5">• El desarrollo de nuevos productos o características/funcionalidades del producto.</p><p class="mb-5">Los controles internos se centran en:</p><p class="mb-5">• Debida diligencia de los clientes, incluidos los niveles de debida diligencia mejorada basados en evaluaciones de riesgo de cada cliente;</p><p class="mb-5">• Evaluar los riesgos y establecer medidas para mitigar los mencionados riesgos;</p><p class="mb-5">• Si es necesario aplicar una debida diligencia mejorada;</p><p class="mb-5">• Monitorear los factores clave de riesgo para volver a evaluar el riesgo de un cliente específico;</p><p class="mb-5">• Los sistemas y controles de delitos financieros se seguirán desarrollando con el tiempo para abordar adecuadamente el entorno de riesgo cambiante.</p><p class="mb-5">Los sistemas y controles existentes se revisarán y, cuando sea necesario, se modificarán para reflejar cambios en el riesgo evaluado y las vulnerabilidades identificadas.</p><p class="mb-5">Los Procedimientos y Directrices indican que es esencial que los controles para administrar y mitigar los riesgos identificados se monitoreen constantemente. Esto se debe hacer para que, en caso de un cambio en las circunstancias que pueda mitigar o exacerbar un riesgo particular, se modifique el control respectivo en consecuencia.</p><p class="mb-5">a) Desarrollos en la legislación, incluyendo el NOIS y el NORUST.</p><p class="mb-5">b) Los Procedimientos de Implementación y las evaluaciones de riesgo de delitos financieros, que se realizan como parte del desarrollo de nuevos productos, servicios, funcionalidades o la atención a nuevos clientes / mercados.</p><p class="mb-5">c) La operación de controles internos periódicos, incluido el monitoreo, la investigación y la presentación de informes de actividad sospechosa.</p><p class="mb-5">• El momento en que se debe llevar a cabo la debida diligencia del cliente de acuerdo con el NOIS a los clientes existentes; y</p><p class="mb-5">• Si un cliente presenta un bajo riesgo de ML/FT con el fin de retrasar la realización de procedimientos de verificación hasta después del inicio de una relación comercial.</p><p class="mb-5">Enfoque basado en riesgos</p><p class="mb-5">Mirage Corporation opera un enfoque basado en riesgos para el desarrollo y la operación de sus sistemas y controles diseñados para prevenir el delito financiero.</p><p class="mb-5">La evaluación de riesgos para la Compañía se lleva a cabo en la etapa de incorporación (antes de la contratación) y posteriormente en intervalos mensuales periódicos.</p><p class="mb-5">Los clientes de la Compañía están sujetos a procedimientos de debida diligencia inicial y continua basados en el riesgo.</p><p class="mb-5">La debida diligencia inicial busca obtener la identidad del cliente y verificar la identidad antes del establecimiento de la relación comercial. También se obtiene información sobre el propósito y la naturaleza prevista de la relación comercial, de modo que la Compañía pueda establecer el perfil comercial y de riesgo del cliente y aceptar o rechazar a un cliente. Los procedimientos continuos aseguran que la información de la debida diligencia inicial se mantenga actualizada.</p></div>
        `
    },
    'aml': {
        title: 'Políticas AML',
        subtitle: 'Anti-lavado de dinero',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block"><h3 class="font-bold">2. Alcance</h3><p class="mb-5">Las disposiciones en este proceso de prevención de lavado de dinero tienen como objetivo reducir la posibilidad de que el negocio de prestar servicios por parte de Mirage Corporation sea utilizado con fines delictivos o en violación de las regulaciones.</p><p class="mb-5">Este proceso proporciona orientación detallando la responsabilidad con respecto a la prevención del lavado de dinero y el financiamiento del terrorismo desde la perspectiva del marco legal de y las regulaciones internacionales aceptadas en esta área.</p><h3 class="font-bold">3. Ley, Regulaciones y Reglas</h3><p class="mb-5">El Código de Derecho Penal (Código Penal) de Curazao establece los procedimientos para la persecución de un delito de lavado de dinero, así como las medidas para la confiscación de bienes tras una condena por lavado de dinero, medidas para la congelación de activos cuando una persona es acusada de un delito de lavado de dinero y medidas para la emisión de una orden de investigación y/o embargo cuando se sospecha que una persona ha cometido un delito de lavado de dinero.</p><p class="mb-5">Las políticas y procedimientos en este manual tienen como objetivo cumplir con las reglas y orientaciones contenidas en el NOPML, el NORUT y el NOIS, que se refieren al Código Penal. Además de estas regulaciones, el Banco Central de Curazao y Sint Maarten ha introducido un marco integral con disposiciones y pautas para prevenir y combatir el lavado de dinero y la financiación del terrorismo (en adelante: las “Disposiciones y Pautas” o “P&amp;G”). ha basado estas disposiciones y pautas en, entre otros, las recomendaciones del FATF.</p><p class="mb-5">Tanto el NORUT como el NOIS son aplicables a entidades que ofrecen la posibilidad de participar en juegos de azar en alta mar (juegos de azar en línea) dentro o fuera de , que es el caso de la Compañía. El NOIS prohíbe a las personas sujetas establecer una relación comercial o llevar a cabo una transacción ocasional con un solicitante de negocios a menos que dicha persona sujeta mantenga las siguientes medidas y procedimientos establecidos en relación con ese negocio de acuerdo con las disposiciones del NOIS:</p><p class="mb-5">• medidas de debida diligencia del cliente;</p><p class="mb-5">• procedimientos de mantenimiento de registros; y</p><p class="mb-5">• procedimientos de informes internos.</p><p class="mb-5">La Compañía está obligada a aplicar las medidas y procedimientos mencionados anteriormente, incluso en los casos en que establezca o lleve a cabo relaciones o transacciones no presenciales, directa o indirectamente, a través de su empresa del grupo afiliada.</p><p class="mb-5">La Compañía también está obligada a garantizar que los empleados estén informados de la legislación aplicable en materia de AML/CFT, así como de las políticas y medidas del sujeto-persona en este sentido. Los empleados deben someterse a procedimientos de debida diligencia adecuados antes de su contratación y también se espera que reciban capacitación sobre el reconocimiento y manejo de las transacciones realizadas por, o en nombre de, cualquier persona que haya estado, esté o parezca estar involucrada en el lavado de dinero o la financiación del terrorismo.</p><h3 class="font-bold">4. Política</h3><h3 class="font-bold">Responsabilidad</h3><h3 class="font-bold">Riesgo de AML</h3><h3 class="font-bold">Mirage Corporation utiliza las siguientes orientaciones como base para su modelo de riesgo de AML:</h3><h3 class="font-bold">Factores de riesgo de AML</h3><p class="mb-5">La responsabilidad última de la política contra el lavado de dinero de Mirage Corporation recae en el Director.</p><p class="mb-5">Se mantendrá una descripción general de la evaluación de riesgos de negocios de AML para asignar y hacer seguimiento a los componentes de las clasificaciones de riesgo separadas. Mirage Corporation categoriza el riesgo general de AML en:</p><p class="mb-5">• Riesgo del cliente</p><p class="mb-5">• Riesgo del producto</p><p class="mb-5">• Riesgo de interfaz</p><p class="mb-5">• Riesgo geográfico</p><p class="mb-5">Políticas y procedimientos de AML</p><p class="mb-5">Las políticas y procedimientos implementados por Mirage Corporation para cumplir con los requisitos regulatorios aplicables en materia de AML y CFT están documentados en este Manual. Las políticas y procedimientos se revisarán periódicamente para garantizar que sigan cumpliendo con los requisitos regulatorios y el cambiante entorno de riesgo en la medida en que sean aplicables a Mirage Corporation.</p><p class="mb-5">• una declaración clara de la cultura y los valores adoptados hacia la prevención del delito financiero;</p><p class="mb-5">• un compromiso para garantizar que la identidad se verifique de manera satisfactoria en todos los casos y de manera basada en el riesgo, antes de que los solicitantes de negocios sean aceptados como clientes;</p><p class="mb-5">• un compromiso con la debida diligencia continua del cliente durante toda la relación comercial;</p><p class="mb-5">• un compromiso para garantizar que el personal esté capacitado y sea consciente de la ley, sus obligaciones legales y cómo cumplir con esas obligaciones;</p><p class="mb-5">• una asignación clara de roles, responsabilidades y estructura organizativa, y reconocimiento de la importancia de que el personal informe sus sospechas internamente de manera oportuna.</p><p class="mb-5">Los procedimientos contenidos en este Manual reflejan la Política de AML de Mirage Corporation en general y deben ser respetados por todo el personal de Mirage Corporation.</p><h3 class="font-bold">5. Evaluación de riesgos, gestión y enfoque basado en riesgos</h3><h3 class="font-bold">Evaluación de riesgos</h3><h3 class="font-bold">Evaluación de riesgos de delito financiero</h3><h3 class="font-bold">Mitigación de riesgos</h3><h3 class="font-bold">Controles de monitoreo</h3><p class="mb-5">Los procedimientos de implementación establecen que el propósito de los procedimientos de evaluación de riesgos es permitir que la Compañía esté en posición de identificar y evaluar los riesgos de ML/FT a los que el sujeto-persona está o puede estar expuesto, y así determinar:</p><p class="mb-5">El enfoque basado en riesgos para la prevención del delito financiero se refleja en el enfoque de Mirage Corporation para la operación y el desarrollo de los sistemas y controles diseñados para minimizar el riesgo de que Mirage Corporation sea utilizada con fines de delito financiero. El riesgo es fundamental para el desarrollo del negocio, nuevos productos, desarrollo de la funcionalidad del producto o la operación en nuevos mercados.</p><p class="mb-5">Cuando Mirage Corporation aborda un nuevo servicio, grupo de clientes o nueva geografía, la evaluación de riesgos de delito financiero se actualizará durante el desarrollo/lanzamiento (para garantizar que los procesos de AML puedan respaldar las nuevas actividades).</p><p class="mb-5">Las evaluaciones de riesgos de delito financiero se llevan a cabo de manera continua, y en particular, se aplican cuando el entorno empresarial cambia a través de, por ejemplo:</p><p class="mb-5">• La entrada a nuevos mercados; y</p><p class="mb-5">• El desarrollo de nuevos productos o características/funcionalidades del producto.</p><p class="mb-5">Los controles internos se centran en:</p><p class="mb-5">• Debida diligencia de los clientes, incluidos los niveles de debida diligencia mejorada basados en evaluaciones de riesgo de cada cliente;</p><p class="mb-5">• Evaluar los riesgos y establecer medidas para mitigar los mencionados riesgos;</p><p class="mb-5">• Si es necesario aplicar una debida diligencia mejorada;</p><p class="mb-5">• Monitorear los factores clave de riesgo para volver a evaluar el riesgo de un cliente específico;</p><p class="mb-5">• Los sistemas y controles de delitos financieros se seguirán desarrollando con el tiempo para abordar adecuadamente el entorno de riesgo cambiante.</p><p class="mb-5">Los sistemas y controles existentes se revisarán y, cuando sea necesario, se modificarán para reflejar cambios en el riesgo evaluado y las vulnerabilidades identificadas.</p><p class="mb-5">Los Procedimientos y Directrices indican que es esencial que los controles para administrar y mitigar los riesgos identificados se monitoreen constantemente. Esto se debe hacer para que, en caso de un cambio en las circunstancias que pueda mitigar o exacerbar un riesgo particular, se modifique el control respectivo en consecuencia.</p><p class="mb-5">a) Desarrollos en la legislación, incluyendo el NOIS y el NORUST.</p><p class="mb-5">b) Los Procedimientos de Implementación y las evaluaciones de riesgo de delitos financieros, que se realizan como parte del desarrollo de nuevos productos, servicios, funcionalidades o la atención a nuevos clientes / mercados.</p><p class="mb-5">c) La operación de controles internos periódicos, incluido el monitoreo, la investigación y la presentación de informes de actividad sospechosa.</p><p class="mb-5">• El momento en que se debe llevar a cabo la debida diligencia del cliente de acuerdo con el NOIS a los clientes existentes; y</p><p class="mb-5">• Si un cliente presenta un bajo riesgo de ML/FT con el fin de retrasar la realización de procedimientos de verificación hasta después del inicio de una relación comercial.</p><p class="mb-5">Enfoque basado en riesgos</p><p class="mb-5">Mirage Corporation opera un enfoque basado en riesgos para el desarrollo y la operación de sus sistemas y controles diseñados para prevenir el delito financiero.</p><p class="mb-5">La evaluación de riesgos para la Compañía se lleva a cabo en la etapa de incorporación (antes de la contratación) y posteriormente en intervalos mensuales periódicos.</p><p class="mb-5">Los clientes de la Compañía están sujetos a procedimientos de debida diligencia inicial y continua basados en el riesgo.</p><p class="mb-5">La debida diligencia inicial busca obtener la identidad del cliente y verificar la identidad antes del establecimiento de la relación comercial. También se obtiene información sobre el propósito y la naturaleza prevista de la relación comercial, de modo que la Compañía pueda establecer el perfil comercial y de riesgo del cliente y aceptar o rechazar a un cliente. Los procedimientos continuos aseguran que la información de la debida diligencia inicial se mantenga actualizada.</p></div>
        `
    },
    'self-exclusion': {
        title: 'Autoexclusión',
        subtitle: 'Control de juego',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block"><h3 class="font-bold">2. Alcance</h3><p class="mb-5">Las disposiciones en este proceso de prevención de lavado de dinero tienen como objetivo reducir la posibilidad de que el negocio de prestar servicios por parte de Mirage Corporation sea utilizado con fines delictivos o en violación de las regulaciones.</p><p class="mb-5">Este proceso proporciona orientación detallando la responsabilidad con respecto a la prevención del lavado de dinero y el financiamiento del terrorismo desde la perspectiva del marco legal de y las regulaciones internacionales aceptadas en esta área.</p><h3 class="font-bold">3. Ley, Regulaciones y Reglas</h3><p class="mb-5">El Código de Derecho Penal (Código Penal) de Curazao establece los procedimientos para la persecución de un delito de lavado de dinero, así como las medidas para la confiscación de bienes tras una condena por lavado de dinero, medidas para la congelación de activos cuando una persona es acusada de un delito de lavado de dinero y medidas para la emisión de una orden de investigación y/o embargo cuando se sospecha que una persona ha cometido un delito de lavado de dinero.</p><p class="mb-5">Las políticas y procedimientos en este manual tienen como objetivo cumplir con las reglas y orientaciones contenidas en el NOPML, el NORUT y el NOIS, que se refieren al Código Penal. Además de estas regulaciones, el Banco Central de Curazao y Sint Maarten ha introducido un marco integral con disposiciones y pautas para prevenir y combatir el lavado de dinero y la financiación del terrorismo (en adelante: las “Disposiciones y Pautas” o “P&amp;G”). ha basado estas disposiciones y pautas en, entre otros, las recomendaciones del FATF.</p><p class="mb-5">Tanto el NORUT como el NOIS son aplicables a entidades que ofrecen la posibilidad de participar en juegos de azar en alta mar (juegos de azar en línea) dentro o fuera de , que es el caso de la Compañía. El NOIS prohíbe a las personas sujetas establecer una relación comercial o llevar a cabo una transacción ocasional con un solicitante de negocios a menos que dicha persona sujeta mantenga las siguientes medidas y procedimientos establecidos en relación con ese negocio de acuerdo con las disposiciones del NOIS:</p><p class="mb-5">• medidas de debida diligencia del cliente;</p><p class="mb-5">• procedimientos de mantenimiento de registros; y</p><p class="mb-5">• procedimientos de informes internos.</p><p class="mb-5">La Compañía está obligada a aplicar las medidas y procedimientos mencionados anteriormente, incluso en los casos en que establezca o lleve a cabo relaciones o transacciones no presenciales, directa o indirectamente, a través de su empresa del grupo afiliada.</p><p class="mb-5">La Compañía también está obligada a garantizar que los empleados estén informados de la legislación aplicable en materia de AML/CFT, así como de las políticas y medidas del sujeto-persona en este sentido. Los empleados deben someterse a procedimientos de debida diligencia adecuados antes de su contratación y también se espera que reciban capacitación sobre el reconocimiento y manejo de las transacciones realizadas por, o en nombre de, cualquier persona que haya estado, esté o parezca estar involucrada en el lavado de dinero o la financiación del terrorismo.</p><h3 class="font-bold">4. Política</h3><h3 class="font-bold">Responsabilidad</h3><h3 class="font-bold">Riesgo de AML</h3><h3 class="font-bold">Mirage Corporation utiliza las siguientes orientaciones como base para su modelo de riesgo de AML:</h3><h3 class="font-bold">Factores de riesgo de AML</h3><p class="mb-5">La responsabilidad última de la política contra el lavado de dinero de Mirage Corporation recae en el Director.</p><p class="mb-5">Se mantendrá una descripción general de la evaluación de riesgos de negocios de AML para asignar y hacer seguimiento a los componentes de las clasificaciones de riesgo separadas. Mirage Corporation categoriza el riesgo general de AML en:</p><p class="mb-5">• Riesgo del cliente</p><p class="mb-5">• Riesgo del producto</p><p class="mb-5">• Riesgo de interfaz</p><p class="mb-5">• Riesgo geográfico</p><p class="mb-5">Políticas y procedimientos de AML</p><p class="mb-5">Las políticas y procedimientos implementados por Mirage Corporation para cumplir con los requisitos regulatorios aplicables en materia de AML y CFT están documentados en este Manual. Las políticas y procedimientos se revisarán periódicamente para garantizar que sigan cumpliendo con los requisitos regulatorios y el cambiante entorno de riesgo en la medida en que sean aplicables a Mirage Corporation.</p><p class="mb-5">• una declaración clara de la cultura y los valores adoptados hacia la prevención del delito financiero;</p><p class="mb-5">• un compromiso para garantizar que la identidad se verifique de manera satisfactoria en todos los casos y de manera basada en el riesgo, antes de que los solicitantes de negocios sean aceptados como clientes;</p><p class="mb-5">• un compromiso con la debida diligencia continua del cliente durante toda la relación comercial;</p><p class="mb-5">• un compromiso para garantizar que el personal esté capacitado y sea consciente de la ley, sus obligaciones legales y cómo cumplir con esas obligaciones;</p><p class="mb-5">• una asignación clara de roles, responsabilidades y estructura organizativa, y reconocimiento de la importancia de que el personal informe sus sospechas internamente de manera oportuna.</p><p class="mb-5">Los procedimientos contenidos en este Manual reflejan la Política de AML de Mirage Corporation en general y deben ser respetados por todo el personal de Mirage Corporation.</p><h3 class="font-bold">5. Evaluación de riesgos, gestión y enfoque basado en riesgos</h3><h3 class="font-bold">Evaluación de riesgos</h3><h3 class="font-bold">Evaluación de riesgos de delito financiero</h3><h3 class="font-bold">Mitigación de riesgos</h3><h3 class="font-bold">Controles de monitoreo</h3><p class="mb-5">Los procedimientos de implementación establecen que el propósito de los procedimientos de evaluación de riesgos es permitir que la Compañía esté en posición de identificar y evaluar los riesgos de ML/FT a los que el sujeto-persona está o puede estar expuesto, y así determinar:</p><p class="mb-5">El enfoque basado en riesgos para la prevención del delito financiero se refleja en el enfoque de Mirage Corporation para la operación y el desarrollo de los sistemas y controles diseñados para minimizar el riesgo de que Mirage Corporation sea utilizada con fines de delito financiero. El riesgo es fundamental para el desarrollo del negocio, nuevos productos, desarrollo de la funcionalidad del producto o la operación en nuevos mercados.</p><p class="mb-5">Cuando Mirage Corporation aborda un nuevo servicio, grupo de clientes o nueva geografía, la evaluación de riesgos de delito financiero se actualizará durante el desarrollo/lanzamiento (para garantizar que los procesos de AML puedan respaldar las nuevas actividades).</p><p class="mb-5">Las evaluaciones de riesgos de delito financiero se llevan a cabo de manera continua, y en particular, se aplican cuando el entorno empresarial cambia a través de, por ejemplo:</p><p class="mb-5">• La entrada a nuevos mercados; y</p><p class="mb-5">• El desarrollo de nuevos productos o características/funcionalidades del producto.</p><p class="mb-5">Los controles internos se centran en:</p><p class="mb-5">• Debida diligencia de los clientes, incluidos los niveles de debida diligencia mejorada basados en evaluaciones de riesgo de cada cliente;</p><p class="mb-5">• Evaluar los riesgos y establecer medidas para mitigar los mencionados riesgos;</p><p class="mb-5">• Si es necesario aplicar una debida diligencia mejorada;</p><p class="mb-5">• Monitorear los factores clave de riesgo para volver a evaluar el riesgo de un cliente específico;</p><p class="mb-5">• Los sistemas y controles de delitos financieros se seguirán desarrollando con el tiempo para abordar adecuadamente el entorno de riesgo cambiante.</p><p class="mb-5">Los sistemas y controles existentes se revisarán y, cuando sea necesario, se modificarán para reflejar cambios en el riesgo evaluado y las vulnerabilidades identificadas.</p><p class="mb-5">Los Procedimientos y Directrices indican que es esencial que los controles para administrar y mitigar los riesgos identificados se monitoreen constantemente. Esto se debe hacer para que, en caso de un cambio en las circunstancias que pueda mitigar o exacerbar un riesgo particular, se modifique el control respectivo en consecuencia.</p><p class="mb-5">a) Desarrollos en la legislación, incluyendo el NOIS y el NORUST.</p><p class="mb-5">b) Los Procedimientos de Implementación y las evaluaciones de riesgo de delitos financieros, que se realizan como parte del desarrollo de nuevos productos, servicios, funcionalidades o la atención a nuevos clientes / mercados.</p><p class="mb-5">c) La operación de controles internos periódicos, incluido el monitoreo, la investigación y la presentación de informes de actividad sospechosa.</p><p class="mb-5">• El momento en que se debe llevar a cabo la debida diligencia del cliente de acuerdo con el NOIS a los clientes existentes; y</p><p class="mb-5">• Si un cliente presenta un bajo riesgo de ML/FT con el fin de retrasar la realización de procedimientos de verificación hasta después del inicio de una relación comercial.</p><p class="mb-5">Enfoque basado en riesgos</p><p class="mb-5">Mirage Corporation opera un enfoque basado en riesgos para el desarrollo y la operación de sus sistemas y controles diseñados para prevenir el delito financiero.</p><p class="mb-5">La evaluación de riesgos para la Compañía se lleva a cabo en la etapa de incorporación (antes de la contratación) y posteriormente en intervalos mensuales periódicos.</p><p class="mb-5">Los clientes de la Compañía están sujetos a procedimientos de debida diligencia inicial y continua basados en el riesgo.</p><p class="mb-5">La debida diligencia inicial busca obtener la identidad del cliente y verificar la identidad antes del establecimiento de la relación comercial. También se obtiene información sobre el propósito y la naturaleza prevista de la relación comercial, de modo que la Compañía pueda establecer el perfil comercial y de riesgo del cliente y aceptar o rechazar a un cliente. Los procedimientos continuos aseguran que la información de la debida diligencia inicial se mantenga actualizada.</p></div>
        `
    },
    'kyc': {
        title: 'Política de KYC',
        subtitle: 'Conoce a tu cliente',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block"><p class="mb-5">Última actualización: 14.12.2022</p><h2 class="text-2xl font-bold leading-8">Política de AML</h2><p class="mb-5">(AMLI) Política de Anti-Lavado de Dinero de www.Valor.Bet</p><p class="mb-5">BE: “Ley del 18 de septiembre de 2017 sobre la prevención del lavado de dinero y limitación del uso de efectivo</p><p class="mb-5">Introducción: www.Valor.Bet es operado y tiene licencia</p><p class="mb-5">Objetivo de la Política de AML: Buscamos ofrecer la mayor seguridad a todos nuestros usuarios y clientes en www.Valor.Bet. Para ello, se realiza una verificación de cuenta en tres pasos con el fin de asegurar la identidad de nuestros clientes. La razón detrás de esto es comprobar que los datos de la persona registrada son correctos y que los métodos de depósito utilizados no están robados ni están siendo utilizados por otra persona, lo cual es para crear el marco general para la lucha contra el lavado de dinero. También tomamos en cuenta que, dependiendo de la nacionalidad y origen, la forma de pago y de retirada, se deben tomar diferentes medidas de seguridad.</p><p class="mb-5">www.Valor.Bet también establece medidas razonables para controlar y limitar el riesgo de ML, incluida la dedicación de los medios apropiados</p><p class="mb-5">www.Valor.Bet se compromete a mantener altos estándares de prevención de lavado de dinero (AML) según las directrices de la UE, cumplimiento y requiere que la dirección y los empleados apliquen estos estándares en la prevención del uso de sus servicios con fines de lavado de dinero.</p><p class="mb-5">El programa AML de www.Valor.Bet está diseñado para cumplir con:</p><p class="mb-5">UE: “Directiva 2015/849 del Parlamento Europeo y del Consejo de 20 de mayo de 2015 sobre la prevención de la utilización del sistema financiero con fines de lavado de dinero”</p><p class="mb-5">UE: “Reglamento 2015/847 sobre información que acompaña a las transferencias de fondos”</p><p class="mb-5">UE: Varios reglamentos que imponen sanciones o medidas restrictivas contra personas y embargo de ciertos bienes y tecnología, incluidos todos los bienes de doble uso</p><h2 class="text-2xl font-bold leading-8">Para depósitos en efectivo y retiros en efectivo</h2><p class="mb-5">• Se entiende por lavado de dinero:</p><p class="mb-5">• La conversión o transferencia de bienes, especialmente dinero, sabiendo que dichos bienes provienen de actividades delictivas o de participar en tales actividades, con el propósito de ocultar o disfrazar el origen ilegal de los bienes o de ayudar a cualquier persona involucrada en la comisión de dicha actividad a evadir las consecuencias legales de las acciones de esa persona o compañías;</p><p class="mb-5">• El ocultamiento o disfraz de la verdadera naturaleza, fuente, ubicación, disposición, movimiento, derechos con respecto a, o propiedad de, bienes, sabiendo que dichos bienes provienen de actividades delictivas o de un acto de participación en tales actividades;</p><p class="mb-5">• La adquisición, posesión o uso de bienes, sabiendo, en el momento de la recepción, que dichos bienes provienen de actividades delictivas o de asistencia en dicha actividad;</p><p class="mb-5">• Participación en, asociación para cometer, intentos de cometer y ayuda, instigación, facilitación y asesoramiento en la comisión de cualquiera de las acciones mencionadas en los puntos anteriores.</p><p class="mb-5">Se considerará lavado de dinero incluso cuando las actividades que generaron los bienes a ser lavados se llevaron a cabo en el territorio de otro Estado miembro o en el de un tercer país.</p><h2 class="text-2xl font-bold leading-8">Definición de lavado de dinero:</h2><p class="mb-5">De acuerdo con la legislación AML, www.Valor.Bet ha designado el “nivel más alto” para la prevención del lavado de dinero: La gestión completa de UD Advertising Agency Ltd. está a cargo.</p><p class="mb-5">Además, un Oficial de Cumplimiento de Anti-Lavado de Dinero (AMLCO, por sus siglas en inglés) está a cargo de la aplicación de la política y los procedimientos de AML dentro del Sistema.</p><p class="mb-5">El AMLCO está bajo la responsabilidad directa de la dirección general:</p><h2 class="text-2xl font-bold leading-8">Organización de la AML para www.Valor.Bet:</h2><p class="mb-5">Cada cambio importante en la política AML de www.Valor.Bet está sujeto a la aprobación de la dirección general de UD Advertising Agency Ltd. y del oficial de cumplimiento de anti-lavado de dinero.</p><h2 class="text-2xl font-bold leading-8">Cambios en la política AML y requisitos de implementación:</h2><h3 class="font-bold">Verificación de primer paso:</h3><h3 class="font-bold">Verificación de segundo paso:</h3><h3 class="font-bold">Verificación de tercer paso:</h3><h3 class="font-bold">Valor Casino requires users to finish verification during 10 days after registration. Only verified users can do withdrawals.</h3><p class="mb-5">Cada usuario y cliente debe realizar la verificación de primer paso para retirar. Independientemente de la elección de pago, la cantidad de pago, la cantidad de retiro, la elección de retiro y la nacionalidad del usuario/cliente, se debe realizar la verificación de primer paso primero. La verificación de primer paso es un documento que debe ser completado por el usuario/cliente. Los siguientes datos deben ser completados: nombre, segundo nombre, fecha de nacimiento, país de residencia habitual, género y dirección completa.</p><p class="mb-5">Cada usuario que deposite más de 2000$ (dos mil dólares) o retire más de 2000$ (dos mil dólares) debe realizar la verificación de segundo paso. Hasta que se realice la verificación de segundo paso, el retiro, el depósito se mantendrán en espera. La verificación de segundo paso llevará al usuario o cliente a una subpágina donde deberá enviar su identificación. El usuario/cliente debe tomar una foto de su identificación. Mientras que un clip de papel con un número aleatorio de seis dígitos está al lado de su identificación: Solo se puede usar una identificación oficial para la verificación de identificación, dependiendo del país, la variedad de identificaciones aceptadas puede ser diferente. También habrá una verificación electrónica si los datos completados en la verificación de primer paso son correctos. La verificación electrónica verificará a través de dos bancos de datos diferentes para asegurar que la información proporcionada coincida con el documento completado y el nombre de la identificación: Si la prueba electrónica falla o no es posible, se requerirá que el usuario/cliente envíe una confirmación de su residencia actual. Se requerirá un certificado de registro del gobierno o un documento similar.</p><p class="mb-5">La verificación de tercer paso debe ser realizada por cada usuario que deposite más de 5000$ (cinco mil dólares) o retire más de 5000$ (cinco mil dólares). Hasta que se realice la verificación de tercer paso, el retiro, la propina o el depósito se mantendrán en espera. Para el paso 3, se pedirá al usuario/cliente una fuente de riqueza.</p><h2 class="text-2xl font-bold leading-8">Verificación de tres pasos:</h2><p class="mb-5">La identificación formal de los clientes al inicio de las relaciones comerciales es un elemento vital, tanto para las regulaciones relacionadas con el lavado de dinero como para la política KYC.</p><p class="mb-5">Esta identificación se basa en los siguientes principios fundamentales:</p><p class="mb-5">Una copia de su pasaporte, tarjeta de identificación o licencia de conducir, cada una mostrada junto con una nota escrita a mano que menciona seis números aleatorios generados. También se requiere una segunda foto con la cara del usuario/cliente. El usuario/cliente puede difuminar toda la información, excepto la fecha de nacimiento, nacionalidad, género, primer nombre, segundo nombre y la foto. Para proteger su privacidad.</p><p class="mb-5">Tenga en cuenta que las cuatro esquinas de la identificación deben ser visibles en la misma imagen y todos los detalles deben ser claramente legibles además de los mencionados anteriormente. Podemos pedir todos los detalles si es necesario.</p><p class="mb-5">Un empleado puede realizar controles adicionales si es necesario, en función de la situación.</p><h2 class="text-2xl font-bold leading-8">Identificación y verificación del cliente (KYC)</h2><p class="mb-5">La prueba de domicilio se realizará a través de dos verificaciones electrónicas diferentes, que utilizan dos bases de datos diferentes. Si una prueba electrónica falla, el usuario/cliente tiene la opción de realizar una prueba manual.</p><p class="mb-5">Una factura reciente de servicios públicos enviada a su dirección registrada, emitida en los últimos 3 meses o un documento oficial hecho por el gobierno que pruebe su estado de residencia.</p><p class="mb-5">Para que el proceso de aprobación sea lo más rápido posible, asegúrese de que el documento se envíe con una resolución clara donde sean visibles las cuatro esquinas del documento y todo el texto sea legible.</p><p class="mb-5">Por ejemplo: una factura de electricidad, factura de agua, extracto bancario o cualquier publicación gubernamental dirigida a usted.</p><p class="mb-5">Un empleado puede realizar controles adicionales si es necesario, en función de la situación.</p><h2 class="text-2xl font-bold leading-8">Comprobante de domicilio: </h2><p class="mb-5">Si un jugador deposita más de cinco mil euros, hay un proceso de comprensión del origen de los fondos (SOW). Ejemplos de SOW son:</p><p class="mb-5">• Propiedad del negocio</p><p class="mb-5">• Empleo</p><p class="mb-5">• Herencia</p><p class="mb-5">• Inversión</p><p class="mb-5">• Familia</p><p class="mb-5">Es crucial que se comprenda claramente el origen y la legitimidad de esa riqueza. Si esto no es posible, un empleado puede solicitar un documento o prueba adicional.</p><p class="mb-5">La cuenta será congelada si el mismo usuario deposita esta cantidad de una sola vez o en múltiples transacciones que sumen esto. Se les enviará un correo electrónico manualmente para que pasen por lo anterior y se les dará información en el sitio web en sí.</p><p class="mb-5">www.Valor.Bet también solicita una transferencia bancaria/tarjeta de crédito para asegurar aún más la identidad del usuario/cliente. También proporciona información adicional sobre la situación financiera del usuario/cliente.</p><h2 class="text-2xl font-bold leading-8">Origen de fondos</h2><p class="mb-5">El documento básico estará accesible a través de la página de configuración en www.Valor.Bet. Cada usuario debe completar la siguiente información:</p><p class="mb-5">• Nombre de pila</p><p class="mb-5">• Apellido</p><p class="mb-5">• Nacionalidad</p><p class="mb-5">• Género</p><p class="mb-5">• Fecha de nacimiento</p><p class="mb-5">El documento será guardado y creado por una inteligencia artificial. Un empleado puede realizar controles adicionales si es necesario en función de la situación.</p><h2 class="text-2xl font-bold leading-8">Documento básico para el paso uno:</h2><h3 class="font-bold">Región uno: Bajo riesgo: </h3><h3 class="font-bold">Región dos: Riesgo medio: </h3><h3 class="font-bold">Región tres: Alto riesgo: </h3><p class="mb-5">Para manejar los diferentes riesgos y estados de riqueza en diferentes regiones del mundo, www.Valor.Bet categorizará cada país en tres regiones diferentes de riesgo.</p><p class="mb-5">Para cada país de la región uno, se realizará la verificación de tres pasos como se describió anteriormente.</p><p class="mb-5">Para cada nación de la región, se realizarán verificaciones de dos a tres pasos para montos de depósito y retiro más bajos. El paso uno se realizará como de costumbre. El paso dos se realizará después de depositar 1000 dólares (mil dólares) y retirar 1000 dólares (mil dólares). El paso tres se realizará después de depositar 2500 dólares (dos mil quinientos dólares) y retirar 2500 dólares (dos mil quinientos dólares). Además, los usuarios de una región de bajo riesgo que cambien criptomonedas por cualquier otra moneda serán tratados como usuarios/clientes de una región de riesgo medio.</p><p class="mb-5">Las regiones de alto riesgo serán prohibidas. Las regiones de alto riesgo se actualizarán regularmente para adaptarse al entorno cambiante de un mundo en constante cambio.</p><h2 class="text-2xl font-bold leading-8">Gestión de riesgos: </h2><h3 class="font-bold">Evaluación de riesgos en toda la empresa</h3><p class="mb-5">Además, una inteligencia artificial supervisada por el oficial de cumplimiento AML buscará cualquier comportamiento inusual e informará inmediatamente a un empleado de www.Valor.Bet.</p><p class="mb-5">De acuerdo con una perspectiva basada en el riesgo y la experiencia general, los empleados humanos volverán a verificar todas las comprobaciones realizadas anteriormente por la inteligencia artificial u otros empleados y podrán repetir o realizar comprobaciones adicionales según la situación.</p><p class="mb-5">Además, un científico de datos respaldado por sistemas analíticos electrónicos modernos buscará comportamientos inusuales como: Depósitos y retiros sin sesiones de apuestas más largas. Intentos de usar una cuenta bancaria diferente para depósito y retiro, cambios de nacionalidad, cambios de moneda, cambios de comportamiento y actividad, así como comprobaciones si una cuenta es utilizada por su propietario original.</p><p class="mb-5">Además, un usuario debe utilizar el mismo método de retiro que utilizó para el depósito, por la cantidad del depósito inicial, para prevenir el lavado de dinero.</p><p class="mb-5">Como parte de su enfoque basado en riesgos, www.Valor.Bet ha realizado una 'Evaluación de riesgos empresariales a nivel de empresa' (EWRA) para identificar y comprender los riesgos específicos de www.Valor.Bet y sus líneas de negocio. La política de riesgo de AML se determina después de identificar y documentar los riesgos inherentes a sus líneas de negocio, como los servicios que ofrece el sitio web. Los usuarios a los que se les ofrecen servicios, las transacciones realizadas por estos usuarios, los canales de entrega utilizados por el banco, las ubicaciones geográficas de las operaciones del banco, los clientes y las transacciones y otros riesgos cualitativos y emergentes.</p><p class="mb-5">La identificación de las categorías de riesgo de AML se basa en la comprensión de www.Valor.Bet de los requisitos regulatorios, las expectativas regulatorias y la orientación de la industria. Se toman medidas de seguridad adicionales para cuidar los riesgos adicionales que trae consigo la World Wide Web.</p><p class="mb-5">La EWRA se reevalúa anualmente.</p><h2 class="text-2xl font-bold leading-8">Medidas adicionales.</h2><p class="mb-5">AML-Compliance garantiza que se realice un 'monitoreo continuo de transacciones' para detectar transacciones que sean inusuales o sospechosas en comparación con el perfil del cliente. Este monitoreo de transacciones se realiza en dos niveles:</p><p class="mb-5">Las transacciones específicas enviadas al gerente de soporte al cliente, posiblemente a través de su Gerente de Cumplimiento, también deben estar sujetas a la debida diligencia.</p><p class="mb-5">La determinación de la naturaleza inusual de una o varias transacciones depende esencialmente de una evaluación subjetiva, en relación con el conocimiento del cliente (KYC), su comportamiento financiero y la contraparte de la transacción.</p><p class="mb-5">Estas comprobaciones se realizarán mediante un sistema automatizado, mientras que un empleado las verificará para obtener seguridad adicional.</p><p class="mb-5">Las transacciones observadas en las cuentas de clientes para las que es difícil obtener una comprensión adecuada de las actividades legales y el origen de los fondos deben considerarse rápidamente como atípicas (ya que no son directamente justificables).</p><p class="mb-5">Cualquier miembro del personal de www.Valor.Bet debe informar a la división AML de cualquier transacción atípica que observe y que no pueda atribuirse a una actividad legal o fuente de ingresos conocida del cliente.</p><p class="mb-5">3) La tercera línea de control:</p><p class="mb-5">Como última línea de defensa contra el lavado de dinero, www.Valor.Bet realizará comprobaciones manuales en todos los usuarios sospechosos y de mayor riesgo para prevenir completamente el lavado de dinero.</p><p class="mb-5">Si se encuentra fraude o lavado de dinero, se informará a las autoridades correspondientes.</p><p class="mb-5">1) La primera línea de control:</p><p class="mb-5">www.Valor.Bet trabaja únicamente con proveedores de servicios de pago de confianza que tienen políticas efectivas de AML en su lugar para evitar que la gran mayoría de los depósitos sospechosos en www.Valor.Bet se realicen sin la ejecución adecuada de los procedimientos KYC en el potencial cliente.</p><p class="mb-5">2) La segunda línea de control: </p><p class="mb-5">www.Valor.Bet hace que su red esté consciente para que cualquier contacto con el cliente o jugador o representante autorizado dé lugar al ejercicio de la debida diligencia en las transacciones en la cuenta correspondiente. En particular, estos incluyen:</p><p class="mb-5">• Solicitudes para la ejecución de transacciones financieras en la cuenta;</p><p class="mb-5">• Solicitudes en relación con medios de pago o servicios en la cuenta;</p><p class="mb-5">Además, la verificación de tres pasos con una gestión de riesgos ajustada debería proporcionar toda la información necesaria sobre todos los clientes de www.Valor.Bet en todo momento.</p><p class="mb-5">Además, todas las transacciones deben ser supervisadas por empleados supervisados por el oficial de cumplimiento de AML que es supervisado por la gerencia general.</p><h2 class="text-2xl font-bold leading-8">Monitoreo continuo de transacciones</h2><p class="mb-5">En sus procedimientos internos, www.Valor.Bet describe en términos precisos, para la atención de sus miembros del personal, cuándo es necesario informar y cómo proceder con dicho informe.</p><p class="mb-5">Los informes de transacciones atípicas son analizados dentro del equipo AML de acuerdo con la metodología precisa completamente descrita en los procedimientos internos.</p><p class="mb-5">Según el resultado de este examen y en base a la información recopilada, el equipo AML:</p><p class="mb-5">• decidirá si es necesario o no enviar un informe a la UIF, de acuerdo con las obligaciones legales previstas en la Ley del 18 de septiembre de 2017;</p><p class="mb-5">• decidirá si es necesario o no terminar las relaciones comerciales con el cliente.</p><h2 class="text-2xl font-bold leading-8">Reporte de transacciones sospechosas en www.Valor.Bet</h2><p class="mb-5">Las normas AML, incluyendo los estándares mínimos KYC, se traducirán en orientaciones o procedimientos operativos que estarán disponibles en el sitio Intranet de www.Valor.Bet.</p><h2 class="text-2xl font-bold leading-8">Procedimientos</h2><p class="mb-5">Los registros de los datos obtenidos con fines de identificación deben conservarse durante al menos diez años después de que la relación comercial haya finalizado.</p><p class="mb-5">Los registros de todos los datos de las transacciones deben conservarse durante al menos diez años después de la realización de las transacciones o el fin de la relación comercial.</p><p class="mb-5">Estos datos se almacenarán de forma segura y cifrada tanto offline como online.</p><h2 class="text-2xl font-bold leading-8">Mantenimiento de registros</h2><p class="mb-5">Los empleados humanos de www.Valor.Bet realizarán controles manuales basados en el riesgo para los cuales reciben una capacitación especial.</p><p class="mb-5">El programa de capacitación y concientización se refleja en su uso:</p><p class="mb-5">- Un programa de capacitación AML obligatorio de acuerdo con las últimas evoluciones regulatorias, para todos los que estén en contacto con las finanzas.</p><p class="mb-5">- Sesiones de aprendizaje académicas AML para todos los nuevos empleados. El contenido de este programa de capacitación debe establecerse de acuerdo con el tipo de negocio para el que trabajan los estudiantes y los puestos que ocupan. Estas sesiones son impartidas por un especialista en AML que trabaja en el equipo AML de UD Advertising Agency Ltd.</p><h2 class="text-2xl font-bold leading-8">Capacitación: </h2><p class="mb-5">La auditoría interna establece regularmente misiones e informes sobre las actividades AML. </p><h2 class="text-2xl font-bold leading-8">Auditoría</h2><p class="mb-5">Todos los datos proporcionados por cualquier usuario/cliente se mantendrán seguros, no se venderán ni se proporcionarán a nadie más. Solo si se obliga por ley, o para prevenir el lavado de dinero, los datos pueden compartirse con la autoridad de AML del estado afectado.</p><p class="mb-5">www.Valor.Bet seguirá todas las directrices y reglas de la directiva de protección de datos (oficialmente Directiva 95/46/CE).</p><h2 class="text-2xl font-bold leading-8">Seguridad de datos:</h2><p class="mb-5">Las solicitudes de retiro se procesan dentro de uno a tres días hábiles a partir de la fecha de solicitud.</p><p class="mb-5">Nos esforzamos por procesar todos los retiros dentro del período de tiempo especificado mencionado anteriormente, sin embargo, puede haber ocasiones en las que esto no ocurra, debido a razones que incluyen, entre otras, procedimientos de verificación, problemas técnicos o actos u omisiones de terceros. No seremos responsables ante usted por ningún retraso en el procesamiento de su solicitud de retiro. Además, nos reservamos el derecho de retrasar y / o detener el procesamiento de solicitudes de retiro hasta que se haya recibido la aprobación final para cualquier transacción de depósito pendiente.</p><p class="mb-5">Si su retiro no se ha publicado dentro del límite de tiempo especificado (ver cuadro anterior), contáctenos inmediatamente a través de support@valor.bet y lo investigaremos.</p><h2 class="text-2xl font-bold leading-8">Política de retiros:</h2><p class="mb-5">No se puede realizar un reembolso una vez que el depósito (incluido el bono) se ha utilizado en www.Valor.Bet.</p><p class="mb-5">Solo se considerará una solicitud de reembolso si se solicita dentro de las primeras veinticuatro (24) horas de la transacción, o dentro de los treinta (30) días si el jugador alega que otra persona (o un menor) ha accedido a su cuenta de jugador.</p><p class="mb-5">Nos reservamos el derecho de retener cualquier reembolso o transacción inversa hasta que se establezca adecuadamente la identidad del usuario de la cuenta de jugador a nuestra satisfacción. Usted acepta proporcionar, cuando se nos solicite, un documento de identificación notarial, o cualquier otro documento de identificación certificado de acuerdo con las leyes aplicables de su jurisdicción. Si dicho documento de identificación notarial o certificado no se proporciona dentro de los cinco (5) días posteriores a nuestra solicitud, entonces dicho reembolso o transacción inversa no se llevará a cabo, su cuenta de jugador se cerrará y usted perderá todos los fondos en su cuenta de jugador. Tal decisión será definitiva, vinculante y no estará sujeta a apelación.</p><p class="mb-5">Las solicitudes de reembolso se procesan dentro de uno a tres días hábiles a partir de la fecha de solicitud.</p><p class="mb-5">Los jugadores deben jugar de manera justa en todos los juegos y no deben de ninguna manera afectar el resultado del juego. Esto incluye el uso de ayuda de computadora, ecuaciones matemáticas, sistemas de apuestas, etc.</p><h2 class="text-2xl font-bold leading-8">Política de reembolso:</h2><p class="mb-5">Si tiene alguna pregunta sobre nuestra Política AML y KYC, contáctenos:</p><p class="mb-5">• Por correo electrónico: support@valor.bet</p><p class="mb-5">Si tiene alguna queja sobre nuestra Política AML y KYC o sobre las verificaciones realizadas en su cuenta y persona, contáctenos:</p><p class="mb-5">• Por correo electrónico: support@valor.bet</p><h2 class="text-2xl font-bold leading-8">Contáctanos:</h2></div>
        `
    },
    'dispute-resolution': {
        title: 'Resolución de Disputas',
        subtitle: 'Solución de conflictos',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block"><p class="mb-5">La resolución de disputas es un término utilizado tanto en derecho comercial como en derecho privado y su definición en sí misma no es difícil de entender. En su forma más básica, la resolución de disputas es la resolución de una disputa entre dos o más partes.</p><p class="mb-5">Lo que puede complicar la resolución de disputas es el método por el cual se resuelve la disputa, ya que las diversas formas de resolución tienen una serie de factores a considerar, que son predominantemente el costo, el acceso, la confidencialidad y la rapidez.</p><p class="mb-5">Para hablar con uno de los miembros de nuestro equipo de resolución de disputas, puede enviarnos un correo electrónico a <a href="mailto:support@valor.bet">support@valor.bet</a> y nos pondremos en contacto con usted.</p><p class="mb-5">Las diversas formas de resolución de disputas se discuten de la siguiente manera: </p><p class="mb-5"><span>Discusiones previas a la acción y discusiones sin prejuicios</span> - Por lo general, es la forma más rentable de resolver disputas e implica que las partes busquen la resolución de algunos o de todos sus problemas. Estos se denominan 'pre-acción' ya que se llevan a cabo antes de que se inicie cualquier proceso formal, como la litigación, para resolver la disputa. Esto generalmente implicará que las partes se reúnan o tengan una serie de reuniones con o sin representación legal para discutir los problemas e intentar resolver la disputa. Si una parte tiene representación legal, siempre es apropiado que los abogados de resolución de disputas sean el punto de contacto. No todas las partes necesitan representación legal, pero donde una parte lo tiene, es recomendable que todas las partes utilicen el asesoramiento experto de un abogado de resolución de disputas. Una disputa resuelta sin tener que pagar costosas tarifas judiciales o tener que pagar tarifas para un árbitro / mediador es, sin duda, la forma más barata de resolución de disputas.</p><p class="mb-5"><span>Mediación</span> - La mediación es un proceso de resolución de disputas, pero puede tomar muchas formas. Es fundamentalmente un proceso en el que las partes en disputa se reúnen en un lugar con una persona independiente presente que trabajará entre las partes para ayudar a asegurar una resolución de la disputa, o para reducir los problemas entre las partes. Las partes deberán participar en la mediación, incluido el trabajo preparatorio, y si se llega a un acuerdo, estarán obligadas por ese acuerdo. Los documentos pueden ser compartidos y presentados tanto antes como durante la mediación. La mediación es menos formal y, como tal, suele ser mucho más barata que las alternativas (arbitraje o litigio). El objetivo del mediador es mantenerse imparcial durante todo el proceso y trabajar entre las partes. En la mediación, las partes acuerdan una resolución. El mediador simplemente facilitará esto y no tomará la decisión por las partes. Siempre es prudente en una mediación redactar un acuerdo de liquidación o resolución que sea firmado por ambas partes para evitar cualquier confusión en una fecha posterior. La mediación es menos formal que el arbitraje o el litigio y a menudo es una ruta preferida debido a esto y al costo. La mediación es confidencial y brinda a las partes la oportunidad de acordar términos que un tribunal o árbitro no podría hacer en una sentencia arbitral o una sentencia judicial. Las partes deben acordar voluntariamente mediar y también deben acordar voluntariamente cualquier acuerdo de liquidación. Un acuerdo de liquidación es un contrato legalmente vinculante, lo que significa que si una de las partes no cumple con él, se pueden tomar medidas legales para hacerlo cumplir. Sin embargo, en nuestra experiencia, una vez que se llega a un acuerdo en la mediación, las partes normalmente lo cumplirán.</p><p class="mb-5"><span>Arbitraje</span> - El arbitraje es un proceso legal más formal en comparación con la mediación. El proceso sigue en muchos aspectos el proceso de litigio en la corte, pero las partes y el árbitro tienen un mayor grado de flexibilidad. Se presentan al árbitro detalles del conflicto en forma de documentos y representación oral si es apropiado. A partir de la información proporcionada, el árbitro tomará una decisión para resolver el conflicto. Cabe señalar que puede haber más de un árbitro, lo que suele ser dictado por la complejidad del caso o si surgen múltiples problemas que requieren una mayor experiencia para tomar una decisión. El arbitraje es privado, lo que es un factor importante para las partes que eligen utilizar el arbitraje en lugar de la litigación para resolver sus conflictos. Otro beneficio es que si el conflicto involucra temas técnicos, es posible designar a un árbitro con experiencia relevante en el campo. El arbitraje generalmente se considera más barato que la litigación y, lo que es más importante, las partes pueden tener una mayor influencia en el proceso sin que la corte imponga plazos y penalizaciones. La flexibilidad que ofrece el proceso de arbitraje a menudo hace que sea una mejor solución para resolver los conflictos. Por lo general, es prudente tener un abogado de resolución de conflictos que lo represente en el arbitraje; este es un proceso legal formal donde se recopilarán y revelarán documentos y pruebas, y se recomienda tomar asesoramiento legal experimentado. El ahorro de tiempo y costos tiende a surgir del grado de control que las partes pueden ejercer sobre el proceso y el hecho de que no es necesario esperar a que haya tiempo disponible en la corte para las audiencias. Los laudos arbitrales son generalmente ejecutables de manera similar a la ejecución de las sentencias judiciales y se pueden hacer cumplir en la mayoría de los países.</p><p class="mb-5"><span>Litigio</span> - El litigio es un proceso legal formal que utiliza el sistema legal civil disponible para resolver una disputa. Cuando se litiga un asunto (la presentación de una demanda en el tribunal) usted y su abogado de resolución de disputas deberán seguir un conjunto de reglas aplicadas por los tribunales y el tribunal dictará el camino y el ritmo al que el litigio procede, aplicando un conjunto de plazos para que las partes tomen medidas y preparen el caso para una audiencia final. El litigio puede ser complejo y consumir mucho tiempo. Si bien un individuo puede representarse a sí mismo (se espera que lo haga en el tribunal de reclamos menores), es sensato utilizar un abogado de resolución de disputas para administrar el litigio y garantizar que los complejos procesos legales se gestionen de manera efectiva. Debido a las personas y el tiempo involucrados en el litigio (abogados, jueces, expertos y jueces) el litigio puede volverse muy costoso. Si bien la mayoría de los litigios se resuelven antes de una audiencia final en la que un juez determinará el resultado del caso, algunos conflictos no se pueden resolver antes del juicio, siendo el resultado final una audiencia completa ante un juez. Con excepción de la mayoría de los procedimientos familiares, los procedimientos legales NO son privados y una vez concluidos son legalmente vinculantes (sujetos a apelaciones), por lo que ambas partes deben cumplir con el resultado. El sistema legal del Reino Unido es complejo y está lleno de historia, con un conjunto de reglas y jurisprudencia que deben cumplirse. Esta es un área especializada y requiere asesoramiento y orientación expertos.</p><p class="mb-5"><span>Resolución alternativa de disputas - ADR</span> - La resolución alternativa de disputas o ADR es un término ampliamente utilizado cuando se discute la resolución de disputas. ADR en sí mismo no es una forma de resolución, es resolver una disputa sin litigio. Por lo tanto, los elementos 1, 2 y 3 discutidos anteriormente son todas formas de ADR.</p><p class="mb-5">Al considerar la mejor forma de resolución de disputas para usted y su problema legal, asegúrese de verificar cualquier contrato que rija la relación entre las partes. Muchos contratos y especialmente aquellos redactados en los últimos 10 años probablemente tengan una cláusula de resolución de disputas que especifique cómo se deben manejar las disputas.</p><p class="mb-5">El sistema legal del Reino Unido ha estado impulsando a las partes hacia la resolución en lugar de la litigación, con los tribunales a menudo tomando una visión desfavorable de las partes que no han intentado resolver su asunto fuera del proceso de litigación. Si un contrato tiene una disposición para la mediación o el arbitraje para resolver una disputa, es casi seguro que una parte que decida ignorar esto recibirá críticas por parte de un tribunal con consecuencias financieras. Por lo tanto, antes de decidir abrazar o descartar la resolución por un medio distinto a la litigación, asegúrese de revisar los detalles de su contrato o pida a su abogado especialista en resolución de disputas que revise su contrato si no está seguro. ¡Es posible que no tenga otra opción!</p><p class="mb-5">Los tribunales tomarán una visión desfavorable de las partes que simplemente litigan sin ningún intento de resolver la disputa de manera más informal. Así que tenga cuidado, las penalizaciones de costos en tales escenarios pueden ser duras, por lo que proceder sin intentar resolver los asuntos conlleva riesgos y puede resultar en un error costoso, incluso si gana!</p><p class="mb-5">Involucrar a abogados especializados en resolución de disputas es a menudo esencial para ayudar con cualquier forma de disputa, ya que las partes recibirán asesoramiento experto sobre el camino que debe tomar una disputa y cómo resolverla de la manera más apropiada.</p></div>
        `
    }
};

const policyContentEn= {
    'user-agreement': {
        title: 'User Agreement',
        subtitle: 'Download Policy',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
            <p class="mb-5">www.Valor.Bet is committed to protecting your personal information. This Privacy Policy informs you about what information we collect when you use our services, why we collect it, and how we use it.</p>
            <p class="mb-5">Please note that this Privacy Policy is an agreement between you and www.Valor.Bet ("We", "Our", or "Us", as appropriate). This Privacy Policy is an integral part of the Terms and Conditions of www.Valor.Bet.</p>
            <p class="mb-5">The website www.Valor.Bet ("Casino", "Website", "Company", "We", "Our").</p>
            <p class="mb-5">We may make periodic changes to this Privacy Policy and will notify you of such changes by posting the revised terms on our platforms. We recommend reviewing this Privacy Policy regularly.</p>

            <h2 class="text-2xl font-bold leading-8">1. PRIVACY</h2>
            <p class="mb-5">We consider personal information that can be used to identify an individual, including but not limited to, first and last name, date of birth, home or other physical address, email address, phone number, or other relevant data as Personal Information. You may be asked to provide Personal Information when you use our website, register for an account, or use our services. Personal Information we collect may include: contact information (including phone number), shipping information, billing information, transaction history, website usage preferences, and feedback about services. This information is stored on servers located in Germany and other locations as applicable. When you interact with the services, our servers maintain a unique activity log that collects certain administrative and traffic information, including: originating IP address, access time, access date, pages visited, language used, software error reports, and browser type. This information is essential for the provision and quality of our services. We do not collect Personal Information about you without your knowledge.</p>

            <h2 class="text-2xl font-bold leading-8">2. INFORMATION COLLECTED</h2>
            <p class="mb-5">We may automatically collect certain data as mentioned above and receive Personal Information when you provide such data through the services or other communications and interactions on the website www.Valor.Bet. We may also receive Personal Information from online service providers and vendors, as well as legally obtained customer lists from third-party providers. Additionally, we may hire third-party service providers to offer technical support, process your online transactions, and maintain your account. We have access to any information you provide to such providers and will use Personal Information as described below in this Privacy Policy. This information will only be disclosed to third parties outside the company in accordance with this Privacy Policy. We take steps to ensure that our agreements with third-party service providers and online vendors protect your privacy.</p>

            <h2 class="text-2xl font-bold leading-8">3. DATA COLLECTION AND PROCESSING</h2>
            <p class="mb-5">We use the Personal Information collected from you to provide our services, offer customer support, conduct necessary security and identity verification checks, process online transactions, assist in participation in third-party promotions, comply with business requirements, and for any other purpose related to the operation of our services. Accordingly, we may share your Personal Information with carefully selected partners (including other parties with data-sharing agreements).</p>
            <p class="mb-5">We may also use your Personal Information to provide you with: (1) promotional offers and information about our products and services; and (2) promotional offers and information about the products and services of our partners to expand our product range and improve customer service. From time to time, we may request information via surveys or contests. Participation in these is completely voluntary, and you may choose whether to provide such information. Requested information may include contact details (such as name, mailing address, and phone number) and demographic information (such as postal code or age). By accepting any prize or winnings, you consent to the use of your name for advertising and promotional purposes without additional compensation, except where prohibited by law. Unless you opt out of promotional communication, we may use your Personal Information (including email and phone number) to provide you with updates about our services, including other gambling products (such as poker, casino, betting, backgammon) and third-party products carefully selected by us.</p>

            <h2 class="text-2xl font-bold leading-8">4. USE OF INFORMATION</h2>
            <p class="mb-5">We may disclose your Personal Information if required by law or if we believe in good faith that such action is necessary to: (1) comply with any legal process served on us or our services; (2) protect and defend our rights or property; or (3) act to protect the personal safety of service users or the public. If, at our sole discretion, we determine that you have cheated or attempted to defraud us, the company, or any other service user, including but not limited to game manipulation or payment fraud, or if we suspect fraudulent activity such as use of stolen credit cards, chargebacks, or money laundering, we reserve the right to share this information (along with your identity) with other online gaming sites, banks, credit card companies, and relevant authorities.</p>

            <h2 class="text-2xl font-bold leading-8">5. OPT-OUT AND ACCESS</h2>
            <p class="mb-5">You may opt out of receiving promotional communications by adjusting your account settings on our website, via an email we send you, or by contacting Customer Service at any time.</p>
            <p class="mb-5">You may also contact us to: (1) verify the accuracy of your Personal Information; (2) update your Personal Information; and/or (3) file a complaint regarding our use of your Personal Information. Upon request, we will update or mark your data to prohibit future marketing use, as applicable. However, nothing in this Privacy Policy prevents us from retaining information required by law.</p>

            <h2 class="text-2xl font-bold leading-8">6. ACCESS & COOKIES</h2>
            <p class="mb-5">When you access our services, we may store information on your device known as cookies. Cookies are small text files that record preferences. We also use Local Shared Objects (“flash cookies”). These allow us to remember details about your visits. Cookies help us monitor site traffic, improve our services, and make your experience smoother and more relevant. We use session-based cookies, persistent cookies, and analytical cookies to track usage patterns and enhance performance. You can choose to accept or decline cookies via your browser settings.</p>

            <h2 class="text-2xl font-bold leading-8">7. PAYMENT PROCESSORS</h2>
            <p class="mb-5">To play for real money, you must send and receive funds through us. We may use third-party payment systems to process these transactions. By accepting this Privacy Policy, you consent to the processing of your Personal Information, including transfers outside your country as needed. We ensure that our payment system partners protect your privacy.</p>

            <h2 class="text-2xl font-bold leading-8">8. SECURITY REVIEW CONSENT</h2>
            <p class="mb-5">We reserve the right to conduct security reviews at any time to validate your registration data and verify service usage. Such reviews may include identity checks, credit reports, or verification with third-party databases. You agree to provide any information or documentation we may request for this purpose.</p>

            <h2 class="text-2xl font-bold leading-8">9. SECURITY</h2>
            <p class="mb-5">We store all Personal Information received from you in encrypted, password-protected databases within a secure network protected by advanced firewall technology (supporting SSL v3, 128-bit encryption). We also ensure our affiliates and service providers use adequate security measures.</p>

            <h2 class="text-2xl font-bold leading-8">10. MINOR PROTECTION</h2>
            <p class="mb-5">Our services are not intended for or directed toward individuals under 18 years of age (or the legal age in their jurisdiction). Any person submitting information certifies that they are 18 or older. If we learn a minor has attempted to access our services or submitted information, we will delete such data from our records.</p>

            <h2 class="text-2xl font-bold leading-8">11. INTERNATIONAL TRANSFERS</h2>
            <p class="mb-5">Personal Information collected may be stored or processed in any country where we or our affiliates operate. By using our services, you expressly consent to the transfer of your information outside your country. We ensure that all such entities adhere to our privacy standards.</p>

            <h2 class="text-2xl font-bold leading-8">12. THIRD-PARTY PRACTICES</h2>
            <p class="mb-5">We cannot guarantee the protection of information you provide to third-party sites linked to or from our services. These third parties are independently operated, and their use of data is governed by their own privacy policies.</p>

            <h2 class="text-2xl font-bold leading-8">13. DISCLAIMER</h2>
            <p class="mb-5">Our services are provided “AS IS” and “AS AVAILABLE”. We are not responsible for events beyond our direct control. We do not guarantee error-free performance and will not be liable for any indirect, incidental, or consequential damages arising from use or disclosure of Personal Information.</p>

            <h2 class="text-2xl font-bold leading-8">14. CONSENT TO PRIVACY POLICY</h2>
            <p class="mb-5">Use of our services constitutes your agreement to this Privacy Policy. This is our complete and exclusive Privacy Policy, superseding all previous versions. Continued use of our services after updates constitutes your acceptance of any changes. You have the right, under Article 77 of the GDPR, to file a complaint with a supervisory authority in your country of residence, workplace, or where an alleged violation occurred.</p>

            <h2 class="text-2xl font-bold leading-8">15. OTHER WEBSITES</h2>
            <p class="mb-5">Our website may contain links to other sites beyond our control. These sites may collect data in accordance with their privacy policies, which may differ from ours. We are not responsible for their actions or content.</p>
            </div>
        `
    },
    'responsible-gambling': {
        title: 'Responsible Gambling',
        subtitle: 'Play Safely',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">Last updated: 14.12.2022</p>
                <p class="mb-5">Please read this information carefully for your own benefit.</p>
                <p class="mb-5">www.Valor.Bet is operated by</p>

                <h2 class="text-2xl font-bold leading-8">Responsible Gambling</h2>

                <ul class="list-disc list-inside space-y-3 mb-5">
                    <li class="text-gray-800 leading-relaxed">Account means a unique account created for you to access our Service or parts of our Service.</li>
                    <li class="text-gray-800 leading-relaxed">Company (referred to as "the Company", "We", "Our", or "Us" in this Agreement) refers to Curacao Co.</li>
                    <li class="text-gray-800 leading-relaxed">Service refers to the website.</li>
                    <li class="text-gray-800 leading-relaxed">Website refers to www.Valor.Bet.</li>
                    <li class="text-gray-800 leading-relaxed">You means the individual accessing or using the Service, or the company or other legal entity on whose behalf such individual is accessing or using the Service, as applicable.</li>
                </ul>

                <h3 class="font-bold">Interpretation</h3>
                <h3 class="font-bold">Definitions</h3>
                <p class="mb-5">Words with capitalized initials have meanings defined under the following conditions.</p>
                <p class="mb-5">The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>

                <h2 class="text-2xl font-bold leading-8">Interpretation and Definitions</h2>

                <ul class="list-disc list-inside space-y-3 mb-5">
                    <li class="text-gray-800 leading-relaxed">Set a deposit limit: Before you start playing, think about how much you can afford to bet based on your financial situation. Play with amounts intended for fun and entertainment.</li>
                    <li class="text-gray-800 leading-relaxed">Do not try to recover losses at all costs: Avoid taking excessive risks to recover what you previously lost. Play for entertainment, not to make money.</li>
                    <li class="text-gray-800 leading-relaxed">Set a time limit</li>
                    <li class="text-gray-800 leading-relaxed">Set a time limit and do not exceed it. Remember that gambling should be balanced with your other activities and not be your only hobby.</li>
                    <li class="text-gray-800 leading-relaxed">Play smart: It is wiser not to play when you are extremely stressed, depressed, or under a lot of pressure. Do not play when under the influence of medication, drugs, or alcohol.</li>
                    <li class="text-gray-800 leading-relaxed">Take breaks:</li>
                    <li class="text-gray-800 leading-relaxed">Take breaks when you feel tired or unable to concentrate.</li>
                    <li class="text-gray-800 leading-relaxed">Only one account:</li>
                    <li class="text-gray-800 leading-relaxed">To help track how much time and money you spend on gambling, we strongly recommend not creating more than one account per person.</li>
                </ul>

                <h3 class="font-bold">Responsible Gambling</h3>
                <h3 class="font-bold">Information and Contact</h3>
                <h3 class="font-bold">Protection for Minors</h3>
                <h3 class="font-bold">Self-Exclusion</h3>

                <p class="mb-5">For most of our users, gambling is entertainment, fun, and excitement. However, we also know that for some users, gambling can have negative effects. In medical science, pathological gambling has been recognized for many years as a serious illness.</p>

                <p class="mb-5"><a href="https://www.begambleaware.org/safer-gambling/">Safer Gambling</a></p>

                <p class="mb-5">Useful tips for responsible gambling on www.Valor.Bet</p>

                <p class="mb-5">We recommend that you consider the following tips before playing to ensure that gambling remains fun and without negative effects:</p>

                <p class="mb-5">To use our service, you must be over 18 years of age. To prevent misuse, keep your login data safe and away from any minors around you.</p>

                <p class="mb-5">We mainly recommend a filtering program to prevent minors, especially children, from accessing unhealthy internet content.</p>

                <p class="mb-5">For parents, we can recommend a list of internet filters to help prevent their children from accessing inappropriate content:</p>

                <p class="mb-5"><a href="https://famisafe.wondershare.com/internet-filter/best-internet-filters.html">Best Internet Filters</a></p>

                <p class="mb-5">If you have been diagnosed with gambling addiction or wish to stay away from gambling for any reason, we want to help you avoid anything that may harm you. “Self-exclusion” means voluntarily excluding yourself from all gambling services. This exclusion cannot be reversed during a set period of time. If you wish to self-exclude from gambling, send a message to our support and specify a time period between 6 months and 5 years. Our support will explain all future steps and what is required from you.</p>

                <p class="mb-5">• Email: support@valor.bet</p>

                <p class="mb-5">From our first day, we have considered this issue and have done everything possible to help. Under the term "Responsible Gambling", we understand a series of measures by which a gambling provider can help reduce the likelihood of negative effects. If they already appear, we also try to take active steps against them.</p>

                <p class="mb-5">Please note that self-exclusion is permanent for the defined period and cannot be reversed for your own protection.</p>

                <p class="mb-5">During self-exclusion, you are not allowed to create a new account, and any attempt to do so will violate our Terms of Service and may result in a permanent ban of your original account.</p>

                <p class="mb-5">The most important tool against the negative effects of gambling is knowledge and education about the risks, supporting self-control among our users and ensuring they do not suffer negative consequences.</p>

                <p class="mb-5">Our support team will help you by email at any time at no extra cost:</p>

                <p class="mb-5">• Email: support@valor.bet</p>

                <p class="mb-5">Our support team will, of course, never share your personal information with anyone without your consent.</p>

                <p class="mb-5">Additionally, you can take a self-assessment test if you already experience gambling addiction problems at:</p>

                <p class="mb-5"><a href="https://www.begambleaware.org/gambling-problems/do-i-have-a-gambling-problem/">Do I Have a Gambling Problem</a></p>

                <p class="mb-5">You can also find more information about gambling addiction at:</p>

                <h2 class="text-2xl font-bold leading-8">Responsible Gambling and Self-Exclusion</h2>
            </div>
        `
    },
    'responsible-gaming': {
        title: 'Responsible Gaming',
        subtitle: 'Play Safely',
        content: `
            <div class="politics-content__wrapp">

                <div data-testid="politics-content-block" class="politics-content__block">
                    <p class="mb-5">Responsible gaming is an important part of our Company's customer service policy; therefore, we pay great attention to issues that may arise as a result of gambling addiction. We believe it is our direct duty to protect players from excessive gambling tendencies and to prevent any minors from participating in gambling.</p>
                    <p class="mb-5">It is our goal to make our service as comfortable and functional as possible, perfectly suited for enjoyable leisure. Unfortunately, the fact that gambling is an exciting pastime can become a problem for some players.</p>
                    <p class="mb-5">We fully support and endorse the internationally accepted Responsible Gaming policy, and we do everything we can to ensure our Customers enjoy gaming that is safe, entertaining, and under control.</p>
                </div>

                <div data-testid="politics-content-block" class="politics-content__block">
                    <h2 class="text-2xl font-bold leading-8">Maintaining Control</h2>
                    <p class="mb-5">Gambling is only a form of entertainment — a pleasant way to spend free time, enjoy your favorite team's performance, and connect with like-minded people. However, while enjoying your leisure time, watching matches, and participating in bets, you must always exercise caution.</p>
                    <p class="mb-5">Every betting participant should always remember:</p>

                    <ul class="list-disc list-inside space-y-3 mb-5">
                        <li class="text-gray-800 leading-relaxed">Gambling is only a form of leisure, not a way to earn money — never lose your sense of reason.</li>
                        <li class="text-gray-800 leading-relaxed">If you lose, do not try to win it back immediately — there is always another chance next time.</li>
                        <li class="text-gray-800 leading-relaxed">Start gambling only with an amount you can afford to lose — never exceed your financial limits.</li>
                        <li class="text-gray-800 leading-relaxed">Always pay attention to the time and money you have spent on gambling.</li>
                    </ul>
                </div>

                <div data-testid="politics-content-block" class="politics-content__block">
                    <h2 class="text-2xl font-bold leading-8">Preventing Gambling Addiction</h2>
                    <p class="mb-5">Among the majority of people for whom gambling is simply a form of fun, there is a small percentage of players who develop gambling addiction. Recent research shows that only a small portion of adults experience issues related to gambling addiction. However, our Company takes this issue very seriously and reminds bettors to always keep in mind that:</p>

                    <ul class="list-disc list-inside space-y-3 mb-5">
                        <li class="text-gray-800 leading-relaxed">Gambling is based on the law of probability — there are no "formulas" or "systems" that can guarantee success.</li>
                        <li class="text-gray-800 leading-relaxed">The desire to gamble must come solely from oneself.</li>
                        <li class="text-gray-800 leading-relaxed">Gambling is entertainment, not a way to make money quickly or pay off debts.</li>
                        <li class="text-gray-800 leading-relaxed">Always keep track of how much money you spend on gambling.</li>
                        <li class="text-gray-800 leading-relaxed">Always know and understand the rules of the game before participating.</li>
                    </ul>

                    <p class="mb-5">It can be difficult to distinguish between healthy enthusiasm for gambling and an unhealthy addiction. However, there are some warning signs that may indicate the start of a problem. Please answer the following 10 questions — if you respond “yes” to at least 5, there is a high probability that you may already have a gambling problem.</p>

                    <p class="mb-5">We do everything possible to ensure that our customers enjoy safe, exciting gaming without losing control, and we fully support the internationally recognized Responsible Gaming policy.</p>

                    <ul class="list-disc list-inside space-y-3 mb-5">
                        <li class="text-gray-800 leading-relaxed">Are you seriously involved in gambling?</li>
                        <li class="text-gray-800 leading-relaxed">Do the amounts of your bets keep increasing?</li>
                        <li class="text-gray-800 leading-relaxed">Do you borrow money to gamble?</li>
                        <li class="text-gray-800 leading-relaxed">Do you usually play longer than planned?</li>
                        <li class="text-gray-800 leading-relaxed">Have frequent visits to betting offices negatively affected your reputation?</li>
                        <li class="text-gray-800 leading-relaxed">Do you feel irritation or disappointment when you cannot participate in betting?</li>
                        <li class="text-gray-800 leading-relaxed">Do you use gambling as a way to escape personal problems?</li>
                        <li class="text-gray-800 leading-relaxed">Do you often feel the need to win back your losses?</li>
                        <li class="text-gray-800 leading-relaxed">Have you tried to control your betting amount or time spent gambling, but failed?</li>
                        <li class="text-gray-800 leading-relaxed">Do you hide your gambling habits from your family?</li>
                    </ul>
                </div>
        `
    },
    'risk-disclosure': {
        title: 'Risk Disclosure',
        subtitle: 'Important Information',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">You understand that by participating in the games, you risk losing the money deposited in your ValorBet account.</p>
                <p class="mb-5">In some jurisdictions, online gambling may be illegal. You understand and agree that ValorBet cannot provide you with legal advice or guarantees regarding the legality of your use of the website’s services.</p>
                <p class="mb-5">The Company does not claim that the Website’s services comply with the legal requirements in your jurisdiction. You use the services provided by ValorBet of your own free will and at your sole discretion, assuming all responsibility and determining whether the use of the website’s services is legal under the laws of your jurisdiction. You log in and participate in the games at your own risk.</p>
                <p class="mb-5">The websites and games are made available to you without any express or implied warranties.</p>
            </div>
        `
    },
    'deposits-withdrawals': {
        title: 'Deposits and Withdrawals',
        subtitle: 'Payment Information',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">You can deposit and withdraw funds from your account in various ways. All methods for depositing and withdrawing funds are presented on the deposit page. All withdrawal requests are processed 24 hours a day.</p>
                <p class="mb-5">The ValorBet online casino security service has the right to:</p>
                <ol>
                    <li class="text-gray-800 leading-relaxed">Reject the withdrawal of funds by any of the available methods if the amounts of funds to be deposited or withdrawn from the gaming account do not correspond to the amounts of bets made (for the amount of deposited funds, bets must be made with odds of at least 1.1; multiple bets made on games with minimal balance loss, meaning opposite events in games like roulette, baccarat, dice, or craps).</li>
                    <li class="text-gray-800 leading-relaxed">Reject the withdrawal of funds if the gaming account is not used for gaming purposes, and before withdrawing funds, you will need to verify your gaming account.</li>
                </ol>
                <p class="mb-5">The ValorBet security service does not recommend:</p>
                <ul class="list-disc list-inside space-y-3 mb-5">
                    <li class="text-gray-800 leading-relaxed">transferring money between payment systems;</li>
                    <li class="text-gray-800 leading-relaxed">depositing and withdrawing funds without placing bets.</li>
                </ul>
                <p class="mb-5">In such cases, the money will be returned to your account.</p>
                <p class="mb-5">Withdrawals are only possible to the same details used for deposits. If the account was funded using multiple methods, withdrawals must be proportional to the deposit amounts.</p>
                <p class="mb-5">ValorBet reserves the right to refuse payment to payment systems or in cash, offering instead a bank transfer payment.</p>
                <p class="mb-5"><b>ATTENTION!</b> The administration does not recommend depositing or withdrawing funds through e-wallets that do not belong to the account holder. The company's security service has the right to consider such deposits as fraudulent actions and block account operations without prior notice. The administration reserves the right to refuse withdrawals to details not belonging to the account holder.</p>
                <p class="mb-5">In special cases, for some gaming accounts, the compensation of payment system fees for deposits and withdrawals, usually covered by ValorBet, may be canceled.</p>
                <p class="mb-5">If the user does not comply with the Company’s rules (violates the Terms and Conditions, does not place a bet before withdrawal, etc.), the Company reserves the right to refuse such a user’s withdrawal.</p>
                <p class="mb-5">For accounts in "bitcoin" currency, no commission is charged for deposits and withdrawals through the Bitcoin payment system.</p>
            </div>
        `
    },
    'cancellation-policy': {
        title: 'Cancellation Policy',
        subtitle: 'Cancellation Terms',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">Once a bet has been confirmed, whether online or by phone, it will be considered final and cannot be modified or canceled.</p>
                <p class="mb-5">You have the option to place a bet on the opposite side to reduce losses, but the original bet cannot be completely removed.</p>
                <p class="mb-5">All bet payouts are calculated using the odds that were in effect at the time the bet was placed. Any later changes to the odds will not affect pending bets. To avoid errors, we strongly recommend that you carefully check all bets on your betting slips before confirming them online, and listen carefully to the agent’s responses when placing bets by phone.</p>
            </div>
        `
    },
    'refund-policy': {
        title: 'Refund Policy',
        subtitle: 'Refund Information',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">A refund cannot be completed once the deposited funds (including bonuses) have been used within the gaming process.</p>
                <p class="mb-5">A refund request will only be considered if submitted within the first twenty-four (24) hours of the alleged transaction, or within thirty (30) days if a player claims that another individual (or a minor) has accessed their player account.</p>
                <p class="mb-5">We reserve the right to withhold any refund or reversal transaction until the identity of the player account holder has been properly established to our satisfaction. You agree to provide, upon our request, notarized identification or any other certified identification in accordance with the applicable laws of the player’s jurisdiction. If such notarized or certified identification is not provided within five (5) days of our request, the refund or reversal transaction will not be processed, your Player Account will be closed, and you will forfeit all funds in your account. This decision will be final, binding, and non-appealable.</p>
                <p class="mb-5">A player must play using fair methods in all games and must not influence the outcome of any game in any way. This includes the use of computer aids, mathematical equations, betting systems, etc.</p>
            </div>
        `
    },
    'privacy-policy': {
        title: 'Privacy Policy',
        subtitle: 'Data Protection and Confidentiality',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">

            <h2 class="text-2xl font-bold leading-8 mb-4">1. GENERAL PROVISIONS</h2>
            <p class="mb-5">This Privacy Policy defines how ValorBet (hereinafter referred to as the “Company”) collects, uses, processes, and protects the information provided by users of the website. The Company respects the privacy of each client and ensures that all personal data is handled securely, transparently, and in accordance with applicable data protection laws.</p>

            <h2 class="text-2xl font-bold leading-8 mb-4">2. INFORMATION WE COLLECT</h2>
            <p class="mb-5">The Company may collect the following categories of information from users:</p>
            <ul class="list-disc list-inside space-y-3 mb-5">
                <li>Personal information provided during registration, including name, surname, date of birth, and contact information.</li>
                <li>Payment details used for deposits and withdrawals.</li>
                <li>Technical data such as IP address, browser type, operating system, and device identifiers.</li>
                <li>Game activity, transactions, and interaction with the website and services.</li>
                <li>Communication history between the user and the Company’s support service.</li>
            </ul>

            <h2 class="text-2xl font-bold leading-8 mb-4">3. PURPOSE OF DATA COLLECTION</h2>
            <p class="mb-5">All collected data is used exclusively for legitimate purposes, including but not limited to:</p>
            <ul class="list-disc list-inside space-y-3 mb-5">
                <li>Providing and maintaining the services offered by the website.</li>
                <li>Processing payments, preventing fraud, and ensuring compliance with anti-money laundering regulations.</li>
                <li>Verifying the identity and age of users.</li>
                <li>Improving the quality of service and personalizing user experience.</li>
                <li>Sending important notifications and promotional materials (if the user has consented).</li>
            </ul>

            <h2 class="text-2xl font-bold leading-8 mb-4">4. DATA STORAGE AND SECURITY</h2>
            <p class="mb-5">The Company uses advanced technical and organizational measures to protect user data against unauthorized access, alteration, disclosure, or destruction. All personal data is stored in secure environments with restricted access.</p>
            <p class="mb-5">We implement data encryption, firewalls, and multi-layer authentication protocols to ensure data integrity and confidentiality.</p>

            <h2 class="text-2xl font-bold leading-8 mb-4">5. DATA SHARING</h2>
            <p class="mb-5">User data may be shared only with trusted third parties under strict confidentiality agreements, including:</p>
            <ul class="list-disc list-inside space-y-3 mb-5">
                <li>Payment service providers to process financial transactions.</li>
                <li>Identity verification partners and regulatory authorities, if required by law.</li>
                <li>Marketing agencies (only with the user's prior consent).</li>
            </ul>
            <p class="mb-5">The Company guarantees that all third-party partners comply with applicable data protection standards.</p>

            <h2 class="text-2xl font-bold leading-8 mb-4">6. USER RIGHTS</h2>
            <p class="mb-5">In accordance with applicable privacy laws, users have the following rights:</p>
            <ul class="list-disc list-inside space-y-3 mb-5">
                <li>The right to access and obtain a copy of their personal data.</li>
                <li>The right to correct or update incorrect or incomplete information.</li>
                <li>The right to request the deletion (“right to be forgotten”) of personal data, subject to legal limitations.</li>
                <li>The right to restrict or object to certain data processing activities.</li>
                <li>The right to withdraw consent for marketing communications at any time.</li>
            </ul>

            <h2 class="text-2xl font-bold leading-8 mb-4">7. COOKIES POLICY</h2>
            <p class="mb-5">The website uses cookies to enhance user experience and analyze site traffic. Cookies are small text files stored on your device that help remember user preferences and improve website performance.</p>
            <p class="mb-5">You may disable cookies in your browser settings; however, this may affect certain functionalities of the website.</p>

            <h2 class="text-2xl font-bold leading-8 mb-4">8. RETENTION PERIOD</h2>
            <p class="mb-5">Personal data is stored for as long as necessary to fulfill the purposes described in this Policy or as required by applicable law. Once the retention period expires, data will be securely deleted or anonymized.</p>

            <h2 class="text-2xl font-bold leading-8 mb-4">9. INTERNATIONAL TRANSFERS</h2>
            <p class="mb-5">In some cases, user data may be transferred to servers or partners located in other countries. The Company ensures that such transfers comply with international data protection requirements, maintaining equivalent levels of security and confidentiality.</p>

            <h2 class="text-2xl font-bold leading-8 mb-4">10. MINORS</h2>
            <p class="mb-5">The Company does not knowingly collect or process information from persons under the age of 18. If such information is discovered, it will be immediately deleted, and the account in question will be closed.</p>

            <h2 class="text-2xl font-bold leading-8 mb-4">11. CHANGES TO THIS POLICY</h2>
            <p class="mb-5">The Company reserves the right to update or amend this Privacy Policy at any time. Users will be notified of significant changes through the website or by email. Continued use of the site after such changes constitutes acceptance of the revised terms.</p>

            <h2 class="text-2xl font-bold leading-8 mb-4">12. CONTACT INFORMATION</h2>
            <p class="mb-5">If you have any questions or concerns regarding this Privacy Policy or how we handle your data, please contact us via the support service available on the ValorBet website.</p>

            <p class="mt-8"><b>Effective date:</b> This Privacy Policy enters into force on the date of its publication on the website.</p>
            </div>
        `
    },
    'about-us': {
        title: 'Sobre nosotros',
        subtitle: 'Nuestra historia',
        content: `
            <div class="politics-content__block">
                <p class="mb-5">ValorBet is an online casino featuring the best licensed providers from around the world. Luck and excitement fill the pages of our site, and every new customer can feel it.</p>
                <p class="mb-5">For many years, we have been guided by principles that define our concept and business. We carry these principles forward year after year.</p>
                <p class="mb-5">🏆 Openness and Transparency <br> The ValorBet brand was created with the idea of embodying a truly new story in the operation of an online casino. Our goal was to be clear and transparent with our customers so that the life and development of the brand would be visible to every one of our players.</p>
                <p class="mb-5">We engage in social activities, giving you the opportunity to participate and influence the brand’s life by being active on Instagram and our other media — all so you can become part of a unified online casino brand, ValorBet!</p>
                <p class="mb-5">🏆 Speed of Operation <br> We have taken into account the internet bandwidth of players in our regions, gathered deep analytics and statistics to ensure stable speed for each of our slots and the ValorBet website. We achieved it, and now you can play online slots for free or for real money without access issues.</p>
                <p class="mb-5">🏆 Accessibility <br> ValorBet offers the opportunity to play to anyone who truly loves great slots and high-quality service.</p>
                <p class="mb-5">🏆 Quality <br> Licensed providers, 24/7 professional support, and a team of experienced specialists with over 10 years in the gaming industry — all to ensure that every day of your play at ValorBet online casino brings you joy and real excitement!</p>
                <p class="mb-5"><b>Contacts</b></p>
                <p class="mb-5">support@valor.bet</p>
            </div>
        `
    },
    'contact': {
        title: 'Contact',
        subtitle: 'Get in touch',
        content: `
            <div class="politics-content__block">
                <p class="mb-5"><b>Email:</b> support@valor.bet</p>
                <p class="mb-5"><b>Email/Password Change:</b> valor.security@valor.bet</p>
            </div>
        `
    },
    'account-payments': {
        title: 'Account, Pay-outs and Bonuses',
        subtitle: '',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
    <p class="mb-5">1. To become an Account Holder you should first register on the company.</p>
    <p class="mb-5">2. A "The company Account" is an account held by an Account Holder, for bona fide
        transactions, with a strict aim to establish a normal commercial relationship with the company and with the
        strict purpose of conducting betting and other gaming and gambling transactions.</p>
    <p class="mb-5">3. The "Website" is the internet gateway accessible through the internet address
        the company/ where all current and relevant information regarding the company operations is published, and
        through which the Services are provided to the account holders.ing the company operations is published, and
        through which the Services are provided to the account holders.</p>
    <p class="mb-5">4. The rules for all Sports Betting on the company Sportsbook are set out under
        the general Help section (Sports Betting);</p>
    <p class="mb-5">5. The rules for each game provided by the company can be found on the website
        help section or in appropriate of each game.</p>
    <p class="mb-5">6. Bonus/ Promotions Rules are described in the "Promotions" part of the website,
        where you can see the conditions applied for each bonus and/or promotion. Maximum Bet amount you can place when
        you have an active casino bonus is 5€ (or currency equivalent) per spin on a slot game or 15% of the total bonus
        given (whichever comes first).</p>
    <p class="mb-5">7. All the provided services should be used in accordance with the Rules and the
        Set Limits.</p>
    <h3>2. Opening Your Account</h3>
    <h3>2.5 In opening your account you warrant that:</h3>
    <p class="mb-5">2.1 In order to place a bet or play a game using our services, you will need to
        open an account with the Operator ("The company Account" or "Account").</p>
    <p class="mb-5">2.5.5 You have not been excluded from gambling; and</p>
    <p class="mb-5">2.5.6 You have not already had an Account closed by us under the following reasons
        of Collusion, Cheating, Fraud, Criminal Activity, Breach of the Terms of Use or at Your request under paragraph
        Responsible Gaming/Gambling.</p>
    <p class="mb-5">2.6 Your account must be registered in your own, correct, name and personal
        details and it shall only be issued once for you and not duplicated through any other person, family, household,
        address (postal or IP), email address, Access Device or any environment where Access Devices are shared (e.g.,
        schools, workplaces, public libraries etc), computer (or other access device), and/or account in respect of the
        Services. Any other accounts which you open with us, or which are beneficially owned by you in relation to the
        Services shall be "Duplicate Accounts". We may close any Duplicate Account (but we shall not be obliged to do
        so).</p>
    <p class="mb-5">If we close a Duplicate Account:</p>
    <p class="mb-5">2.6.1 All bonuses, free bets and winnings accrued from such bonuses and free bets
        obtained using that Duplicate Account will be void and forfeited by you;</p>
    <p class="mb-5">2.6.2 We may, at our entire discretion, void all winnings and refund all deposits
        (less amounts in respect of void winnings) made in respect of that Duplicate Account and, to the extent not
        recovered by us from the relevant Duplicate Account, any amounts to be refunded to us by You in respect of a
        Duplicate Account may be recovered by us directly from any other of Your Accounts (including any other Duplicate
        Account); or</p>
    <p class="mb-5">2.6.3 We may, at our entire discretion, allow usage of the Duplicate Account to be
        deemed valid and in this case all losses and stakes placed by or for you through the Duplicate Account shall be
        retained by us.</p>
    <p class="mb-5">2.6.4 Due to regulatory legislation and licencing, players from the following
        jurisdictions are prohibited from creating accounts with the company: USA, Curacao and Malta. The company
        reserves all rights to suspend an account opened from those countries as well as deposits and bets placed.</p>
    <p class="mb-5">2.2.1 Click on Register on the Website and follow the on-screen instructions or
    </p>
    <p class="mb-5">2.2.2 Open an account by such other account opening method as shall, from time to
        time may be offered by the Operator;</p>
    <p class="mb-5">2.3 Your Account will either be operated by the Operator, or by another company in
        its Group for and on behalf of itself and/or the relevant Operator Group company with whom you have «signed» a
        contract.</p>
    <p class="mb-5">2.4 When you open your account you will be asked to provide us with personal
        information, including your name and date of birth and appropriate contact details, including an address,
        telephone number and e-mail address ("Personal Details"). You may update your Personal Details from time to time
        by contacting Customer Service; or through the "My Profile" management page on the Website: or by such other
        method as shall, from time to time, may be offered by the Operator.</p>
    <p class="mb-5">2.5.1 You understand and accept the risk that, by using the Services, you may, as
        well as winning money, lose money;</p>
    <p class="mb-5">2.5.2 You are: (a) over 18 years of age: and (b) above the age at which gambling
        or gaming activities are legal under the law or jurisdiction that applies to you (the "Relevant Age");</p>
    <p class="mb-5">2.5.3 Gambling is not illegal in the territory where you reside;</p>
    <p class="mb-5">2.5.4 You are legally able to enter into contracts;</p>
    <h3>3. Management of the The company Account</h3>
    <h3>3.2 The company warrants at all times to:</h3>
    <p class="mb-5">3.1 The company reserves the right at its own discretion and at all times, to:</p>
    <p class="mb-5">i) Suspend and/or cancel the participation of the Account Holder in the Services,
        and/or forfeit and/or confiscate funds available on their The company Account if the Account Holder is found
        cheating, or if it is determined by The company that the Account Holder has employed or made use of a system
        (including machines, robots, computers, software or any other automated system) designed to defeat or capable of
        defeating the Client Application and/or Software.</p>
    <p class="mb-5">The company is committed to detect and prevent software programs which are
        designed to enable artificial intelligence (“AI Software”) to play on ITS website(s) including but not limited
        to opponent-profiling, player collusion; robots, other 'cheating' software or anything else that in our
        reasonable opinion distorts normal game play and enables the player to have an unfair advantage over other
        players. You acknowledge that The company will take measures to detect and prevent the use of such programs and
        AI Software using methods (including but not limited to reading the list of currently running programs on a
        player’s computer) and the customer agrees not to use any AI Software and/or any such programs.</p>
    <p class="mb-5">a) Manage funds belonging to Account Holders in a secure and appropriate manner;
        and/or</p>
    <p class="mb-5">b) Absorb the cost and pay the Gaming and Betting Duty, as applicable, at the
        Place of the Contract;</p>
    <p class="mb-5">c) Manage data regarding an Account Holder in accordance with applicable laws,
        data protection acts and/or similar; d) Not offer contingencies to customers to proceed to any fund transfer
        between customers’ accounts.</p>
    <p class="mb-5">3.3 The company shall keep Account Holders’ funds separate from the company own
        funds in a client account held with a Financial Institution approved by the Regulator.</p>
    <p class="mb-5">3.4 A The company Account does not accrue interest. The Account Holder shall not
        treat The company as a financial institution.</p>
    <p class="mb-5">3.5 An Account Holder can only hold one the company Account at a time. In the
        event that this rule is breached, the company reserves the right to block and/or delete the superfluous The
        company Account(s) held by the Account Holder in breach of this clause, and reallocate all the funds to a single
        The company Account. Any bonus given to the superfluous The company Account(s) will be reallocated.</p>
    <p class="mb-5">3.6 A The company Account is non-transferable. It is prohibited for players to
        sell, transfer or acquire accounts from or to other players. Funds cannot be transferred between The company
        accounts.</p>
    <p class="mb-5">3.7 An Account Holder shall not allow any other individual, including any minor,
        to use or reuse its the company Account, access and/or use any material or information from the Website, accept
        any Prize, or access and/or participate in the Services.</p>
    <p class="mb-5">a) Decline to open the company account and/or to close an existing The company
        Account without any explanation whatsoever;</p>
    <p class="mb-5">b) Decline to accept deposits without any explanation whatsoever;</p>
    <p class="mb-5">c) Request documents to verify: (i) the identity of the Account Holder, (ii)
        his/her authorization to use a specific Card and/or (iii) other facts and information provided by the Account
        Holder. Such request may be made at any given moment and the company reserves the right to suspend an account
        pending investigation;</p>
    <p class="mb-5">f) Hold and manage funds belonging to Account Holders in accordance with generally
        accepted guidelines for cash management regarding such funds; this may include a Financial Institution and/or a
        Payment Solution Provider being entrusted to hold funds in the name of and/or for the benefit of Account
        Holders;</p>
    <p class="mb-5">g) Forfeit and/or confiscate funds available on a The company Account and/or
        refuse to honour a claim, in the event that, directly or indirectly: (i) the The company Rules have been
        violated; and/or (ii) other unauthorised activities have occurred in connection with a betting event and/or the
        operation of a The company Account (such as, but not limited to, breach of the law or other regulations, breach
        of a third party’s rights, fraud, and cheating);</p>
    <p class="mb-5">h) Suspend and/or cancel the participation of an Account Holder in the games,
        promotional activities, competitions or other services, whenever The company is of the opinion that there are
        legitimate concerns that a The company Account is, has been, or may be used for illegal, fraudulent or dishonest
        practices;</p>
    <h3>4. Inactive Accounts</h3>
    <h3>4.2 The company holds the right to charge or close the inactive accounts if:</h3>
    <p class="mb-5">4.1 An "Inactive Account" is a the company Account which has no record of any
        log-in and/or log-out for a period exceeding six (6) consecutive months.</p>
    <p class="mb-5">a) No transactions have been recorded on a The company Account for a period of 6
        consecutive months; (A dormant account is an account that has not been accessed for 6 months, that has a real
        money balance. Once your account becomes dormant, if we have been unable to contact you, the Company has the
        right to close your account and</p>
    <p class="mb-5">b) The company has made reasonable efforts to contact the Account Holder of the
        Inactive Account but the Account Holder could not be satisfactorily located or the required payment instructions
        were not available.</p>
    <p class="mb-5">4.3 Should an account be blocked or excluded and a balance is still available in
        the account, you shall be contacted by our Customer Support notifying you that a balance is still available in
        your account. You shall be requested to provide details for the withdrawal of such pending amounts.</p>
    <p class="mb-5">4.4 Company reserves the right to charge a monthly fee an inactive account equal
        to 5 EUR (or currency equivalent) per month.</p>
    <p class="mb-5">4.5 Any balance on an inactive account result of the cashback offering will be
        expired immediately.</p>
    <h3>5. Chargeback</h3>
    <p class="mb-5">5.1 Subject to the sub-clauses below and without prejudice to The company’s right
        to seek redress under any applicable legislation, regulation, enactment or policy, or under any other provision
        of the The company Rules, The company shall have the right to block a The company Account when a chargeback has
        been requested in relation to that The company Account.</p>
    <p class="mb-5">5.2 When a chargeback has been requested, The company will send a "Chargeback
        Notice" to the Account Holder at the email address mentioned in the Account Holder’s details, in order to seek
        confirmation of the Account Holder’s identity and of the payment method used to credit to the Account Holder’s
        The company Account any funds entirely unrelated to a chargeback ("Untainted Funds").In the absence of
        confirmation by the Account Holder of the Account Holder’s identity and of the payment method used to credit
        Untainted Funds to the Account Holder’s, The company Account, following a Chargeback Notice, The company will
        send two written reminders to the Account Holder at the email available to it, each of which will be subject to
        a processing fee of fifty (50) Euros drawn on any Untainted Funds.</p>
    <p class="mb-5">5.3 Where a The company Account has been blocked due to a chargeback and the
        Account Holder has not:a) logged in to the The company Account for a period of thirty (30) consecutive months;
        or b) confirmed to The company his identity and the details of the payment method used to credit Untainted Funds
        to the Account Holder’s The company Account and then requested a withdrawal; any Untainted Funds on the The
        company Account will be treated as they were funds on an Inactive Account and The company will remit the balance
        on the The company Account of the Account Holder.</p>
    <h3>6. Closure of the company Account</h3>
    <h3>6.5 Payment Rules</h3>
    <h3>6.8 The company shall not deal with the credit balance of the company Account except:</h3>
    <p class="mb-5">6.1 An Account Holder may close the company Account at any time by contacting the
        company’s Customer Support using the contact details provided in the "Help" section on the Website by email. Any
        funds in the company Account will be remitted to the Account Holder.</p>
    <p class="mb-5">6.5.5 Method of payment/withdrawal from/to the company Account.</p>
    <p class="mb-5">6.6.1 An Account Holder is only allowed to:</p>
    <p class="mb-5">a) Make deposits to the company Account with his personal Card or via his personal
        account created with one of the Financial Institutions or their licensees. If we detect account holders using
        funds from other account holders or 3rd parties in general (including but not limited to receiving funds from
        3rd parties on their own payment methods and directly depositing them to their own the company account), we
        reserve the right to void any winnings and forfeit any balance (winnings and deposits) in your betting account,
        to terminate the Agreement and/or to suspend the provision of the Services or deactivate your account.</p>
    <p class="mb-5">b) Request withdrawals of funds held on the company Account to his personal
        account created with one of the Financial Institutions or their licensees.</p>
    <p class="mb-5">6.6.2 An Account Holder is responsible for providing the company with the correct
        details of his personal account for the purpose of withdrawals from the company Account.</p>
    <p class="mb-5">6.6.3 An Account Holder must not allow third parties to use the company Account to
        make deposits to or withdrawals from the company Account.</p>
    <p class="mb-5">6.6.4 It is the Account Holder’s sole responsibility to ensure that he/she
        complies with the above provisions.</p>
    <p class="mb-5">6.7 The company shall not accept a wager from an Account Holder unless a The
        company Account has been established in the name of the Account Holder and there are adequate funds in the
        company Account to cover the amount of the wager, or funds necessary to cover the amount of the wager are
        provided in an approved manner.</p>
    <p class="mb-5">a) to debit from the company Account a wager made by the Account Holder or an
        amount the Account Holder indicates they want to wager in the course of a game they are playing or about to
        play;</p>
    <p class="mb-5">b) to remit funds standing to the credit of the company Account to the Account
        Holder, at the Account Holder’s request, in terms of regulation 37 of the Remote Gaming Regulations;</p>
    <p class="mb-5">6.2 Should an existing the company Account be closed, any obligations already
        entered into will be honoured.</p>
    <p class="mb-5">c) to pay reasonable bank charges for deposits received and funds withdrawn; or
    </p>
    <p class="mb-5">d) as otherwise authorised by the Remote Gaming Regulations.</p>
    <p class="mb-5">6.9 The balance of the company Account may turn negative in case of chargeback.
    </p>
    <p class="mb-5">6.10 Withdrawals from the company Account are made through payments addressed to
        the Account Holder or transferred to a bank account held in the name of the Account Holder, as advised by the
        Account Holder. Whenever possible, the company will restrict withdrawals to be made only to the same account
        utilised by the Account Holder to make deposits.</p>
    <p class="mb-5">6.11 Depending on the payment method chosen by the Account Holder, minimum and/or
        maximum deposit limits may apply.</p>
    <p class="mb-5">6.11.1 To withdraw an amount from the account, the Account Holder must complete
        the following steps:</p>
    <p class="mb-5">1. Choose "Withdraw" in the Account section.</p>
    <p class="mb-5">2. Choose appropriate method of withdrawal.</p>
    <p class="mb-5">3. Provide the required personal data and indicate the amount.</p>
    <p class="mb-5">4. Press Confirm. A message confirming the withdrawal request will then appear.
    </p>
    <p class="mb-5">6.3 Account Holders who wish to recover funds held in a closed, blocked or
        excluded account are advised to contact Customer Support.
        <br>
        The withdrawals will be remitted only to the same account from which the funds originated. There can also be
        limitations for withdrawals. The identity of players must first be verified.
        <br>
        User must send documents for verification at least one day before first withdrawal.
    </p>
    <p class="mb-5">6.12 The company reserves the right to charge the Account Holder for
        administrative costs resulting from withdrawals made by the Account Holder, as indicated on the Website.</p>
    <p class="mb-5">6.13 Placing a bet through the Internet may be illegal in the jurisdiction in
        which an Account Holder is resident and/or domiciled; if so, the Account Holder is not authorised to use a Card
        for the purpose of placing a bet.</p>
    <p class="mb-5">6.14 The participation of an Account Holder in the Services in a jurisdiction
        where such participation is prohibited by law shall not affect any stakes or payment made to and accrued for the
        benefit of the company.</p>
    <p class="mb-5">6.15 The company, or Governing Authority can monitor or request to review all
        transactions to prevent money laundering. All suspicious transactions detected by The company will be reported
        to the Governing Authorities.</p>
    <p class="mb-5">6.16 All transactions are checked to prevent money laundering.</p>
    <p class="mb-5">6.17 It is the sole responsibility of the Account Holder to pay and proceed with
        all necessary diligence in relation to taxes on any Prize, if and where applicable.</p>
    <p class="mb-5">6.18 It is unlawful to deposit money from ill-gotten means.</p>
    <p class="mb-5">6.19 With Finance / Accounting’s Department initiative, users may be redirected
        for different payment methods.</p>
    <p class="mb-5">6.4 In case of closure of their company Account due to gambling addiction or
        fraud, an individual must not open a new The company Account. The company will not be liable should the
        individual succeed in opening a new account, nor for any direct or indirect consequential damages. The company
        reserves the right to close an account opened in breach of this rule at any point.</p>
    <p class="mb-5">Deposits to and withdrawals from the company Account shall at all times be made
        through a Financial Institution or a Payment Solution Provider. Procedures, Terms and Conditions, availability,
        and duration for deposits/withdrawals may vary, depending on the time needed for these procedures to be
        completed, as well as the country where the customer lives in and the Financial Institution that is used. More
        information is available when logged in on the Website under the sections "Deposit" or "Withdrawal". Regarding
        Yandex.Money Quick Payment: "Client confirms that he/she is familiarized with the conditions of the service
        "Yandex.Money Quick payment (https://money.yandex.ru/pay/doc.xml?offerid=default)."</p>
    <p class="mb-5">6.5.1 The company holds the right to not process a payment if the Account Holder’s
        identity, age and place of residence and proof of funds have not been sufficiently verified.</p>
    <p class="mb-5">6.5.2 The company may appoint a Payment Solution Provider to act, receive
        deposits, hold and manage funds, and/or expedite withdrawals, on behalf of The company.</p>
    <p class="mb-5">6.5.3 The company does not accept cash funds sent or delivered directly to The
        company or a Payment Solution Provider.</p>
    <p class="mb-5">6.5.4 The company will credit to the The company Account all funds received by The
        company from or on behalf of the Account Holder, or owned by The company to the Account Holder.</p>
    <h3>7. Limitation of Liability</h3>
    <p class="mb-5">7.1 You enter the Website and participate in the Games at your own risk. The
        Websites and the Games are provided without any warranty whatsoever, whether expressed or implied.</p>
    <p class="mb-5">7.2 Without prejudice to the generality of the preceding provision, the company,
        its directors, employees, partners, service providers:</p>
    <p class="mb-5">7.2.4 Do not warrant that the software or the Website/Websites is/are fit for
        their purpose;</p>
    <p class="mb-5">7.2.5 Do not warrant that the software and Website are free from errors;</p>
    <p class="mb-5">7.2.6 Do not warrant that the Websites and/or Games will be accessible without
        interruptions;</p>
    <p class="mb-5">7.2.7 Shall not be liable for any loss, costs, expenses or damages, whether
        direct, indirect, special, consequential, incidental or otherwise, arising in relation to your use of the
        Websites or Your participation in the Games.</p>
    <p class="mb-5">7.3 You hereby agree to fully indemnify and hold harmless the company, its
        directors, employees, partners, and service providers for any cost, expense, loss, damages, claims and
        liabilities howsoever caused that may arise in relation to your use of the Website or participation in the
        Games.</p>
    <h3>8. Collusion, Cheating, Fraud and Criminal Activity</h3>
    <h3>8.3. If:</h3>
    <h3>8.4. For the purposes of this paragraph 11:</h3>
    <h3>Where there is a reasonable suspicion that the Account Holder has committed or attempted to commit a bonus
        abuse, either on their own or as part of a group, company reserves the right to:</h3>
    <p class="mb-5">8.1. The following practices in relation to the Services:</p>
    <p class="mb-5">c) We become aware that you have "charged back" or denied any of the purchases or
        deposits that you made to your account; or</p>
    <p class="mb-5">d) You become bankrupt or suffer analogous proceedings anywhere in the world,
        then, (including in connection with any suspension and/or termination of your account) we shall have the right,
        in respect of your account to withhold the whole or part of the balance and/or recover from the account the
        amount of any deposits, pay-outs, bonuses or winnings which have been affected by or are in any way attributable
        to any of the event(s) outlined in this paragraph.</p>
    <p class="mb-5">a) A "fraudulent practice" means any fraudulent activity engaged in by you or by
        any person acting on your behalf or in collusion with you, and shall include, without limitation:</p>
    <p class="mb-5">- fraudulent charge-backs and rake-back activity;</p>
    <p class="mb-5">- the use by you or any other person who was participating in the same game as you
        at any time, of a stolen, cloned or otherwise unauthorized credit or debit card, as a source of funds;</p>
    <p class="mb-5">- the collusion by you with others in order to gain an unfair advantage (including
        through bonus schemes or similar incentives offered by us);</p>
    <p class="mb-5">- any attempt to register false or misleading account information;</p>
    <p class="mb-5">- any actual or attempted act by you which is reasonably deemed by us to be
        illegal in any applicable jurisdiction, made in bad faith, or intended to defraud us and/or circumvent any
        contractual or legal restrictions, regardless of whether such act or attempted act actually causes us any damage
        or harm;</p>
    <p class="mb-5">b) An "unfair advantage" shall include, without limitation:</p>
    <p class="mb-5">- the exploitation of a fault, loophole or error in our or any third party's
        software used by you in connection with the Services (including in respect of any game);</p>
    <p class="mb-5">a) abuse of bonuses or other promotions (as defined in paragraph 11.4)</p>
    <p class="mb-5">- the use of automated players ('bots'), or other 3rd party software or analysis
        systems; or</p>
    <p class="mb-5">- the exploitation by you, of an 'Error' as defined in paragraph 18, in any case
        either to your advantage and/or to the disadvantage of us or other.</p>
    <p class="mb-5">c) Bonus Abuse includes, but is not limited to:</p>
    <p class="mb-5">i. breach of terms and conditions of a bonus, free bets or any other promotional
        offer</p>
    <p class="mb-5">ii. the opening of multiple accounts to claim multiple bonuses;</p>
    <p class="mb-5">iii. all bonuses are subject to bonus use limitation based on the bonus engine,
        and, unless stated otherwise, they shouldn't be used more than 6 times per calendar month; if for any reason a
        bonus code is used by an individual player over the stated amount, the company reserves the right to further
        investigate bonus abusing pattern and deduct bonus winnings plus all 3rd-party charges arising from player's
        activity (payment fees, providers fees, etc)</p>
    <p class="mb-5">i. forfeits the bonus allocated to the Account Holder and any winnings from that
        bonus, and/or</p>
    <p class="mb-5">ii. revoke, deny, or withdraw a bonus offer from the Account Holder, and/or</p>
    <p class="mb-5">iii. block an access to particular products, and/or</p>
    <p class="mb-5">iv. exclude the Account Holder from any future promotional offers, and/or</p>
    <p class="mb-5">b) using unfair external factors or influences (commonly known as cheating)</p>
    <p class="mb-5">v. terminate the Account Holder’s account with immediate effect.</p>
    <p class="mb-5">c) taking unfair advantage (as defined in paragraph 11.4);</p>
    <p class="mb-5">d) opening any Duplicate Accounts; and/or</p>
    <p class="mb-5">e) undertaking fraudulent practice or criminal activity (as defined in paragraph
        11.4), constitute "Prohibited Practices" and are not permitted. We will take all reasonable steps to prevent and
        detect such practices and to identify the relevant players concerned if they do occur.</p>
    <p class="mb-5">8.2. You agree that you shall not participate in or be connected with any form of
        Prohibited Practice in connection with your access to or use of the Services.</p>
    <p class="mb-5">a) We have reasonable grounds to believe that you have participated in or have
        been connected with any form of Prohibited Practice (and the basis of our belief shall include the use by us of
        any fraud, cheating and collusion detection practices which are used in the gambling and gaming industry at the
        relevant time); or</p>
    <p class="mb-5">b) You have placed bets and/or played online games with any other online provider
        of gambling services and are suspected (as a result of such play) of any Prohibited Practice or otherwise
        improper activity; or</p>
    <h3>9.1 Provided that Your Account does not show that a balance is due to us, you are entitled to close Your Account
        and terminate the Terms of Use on not less than twenty-four hours’ notice to us at any time, by contacting us
        through Customer Services, details of which can be found in the Contact Us and Help section of the Website:</h3>
    <h3>CLOSURE AND TERMINATION BY US</h3>
    <h3>SUSPENSION BY US</h3>
    <h3>9.10 Company reserves the right, in its sole discretion, to void any winnings and forfeit any balance (winnings
        and deposits) in your betting account, to terminate the Agreement and/or to suspend the provision of the
        Services or deactivate your account if:</h3>
    <p class="mb-5">9.1.1 Indicating Your wish to close Your Account; and</p>
    <p class="mb-5">9.8 The following paragraphs shall survive any termination of the Terms of Use:
        19, 20, 21, 22, 23, 25, 26, 28, 29, 30, 31, 32 and 34 and any other paragraphs which are required for the
        purposes of interpretation; together with any relevant sections of the Betting Rules, relevant Game Rules and
        the Additional Terms.</p>
    <p class="mb-5">9.1.2 Stating the reasons why You wish to close Your Account, in particular if You
        are doing so because of concerns over the level of Your use of the Services.</p>
    <p class="mb-5">9.9 We shall be entitled to suspend Your Account in the circumstances expressly
        set out in the Terms of Use. Upon the suspension of Your Account: (a) no activity shall be permitted (including
        deposits, withdrawals, betting or gaming) until the date upon which it is re-activated by us; (b) no bonuses or
        contingent winnings will be credited to the Account; and (c) we shall address the issue that has given rise to
        the Account suspension with a view to resolving it as soon as reasonably practicable so that the Account can, as
        appropriate, either be re-activated or closed.</p>
    <p class="mb-5">i) we identify you have disguised, or interfered, or taken steps to disguise or
        interfere, in any way with the IP address of any Device used to access our Site (such as using a Virtual Private
        Network “VPN”)</p>
    <p class="mb-5">ii) it comes to our attention that the customer used forged documents (photos,
        scanned documents, screenshots etc.) during the verification procedure or in any point time the Agreement is
        active</p>
    <p class="mb-5">iii) there is a reasonable suspicion that you have committed or attempted to
        commit a bonus abuse, either on your own or as part of a group</p>
    <p class="mb-5">iv) you are involved in any fraudulent, collusive, fixing or other unlawful
        activity in relation to Your or third parties’ participation or you use any software-assisted methods or
        techniques or hardware devices for Your participation in any of the services provided by the Company.</p>
    <p class="mb-5">9.11 Company reserves the right to close down existing accounts without
        explanation. In this event, or in the event of an account closure by a customer the gull balance will be paid
        out unless any fraudulent (e.g., Arbitrage, etc.) behavior is suspected. In case of fraudulent behavior,
        winnings will be voided and deposits will be refunded after we deduct the corresponding administrative and
        transaction fees and any fees that Company is obliged to pay to the competent authorities due to a customer’s
        complaint. Company also reserves the right to report to the appropriate authorities, if any customer is involved
        in any form of suspected fraudulent behavior.</p>
    <p class="mb-5">9.12 If, in the Company's sole determination, the Player is found to have cheated
        or attempted to defraud the Company, in any way including but not limited to game manipulation, using strategies
        (e.g Martingale, Anti-Martingale system) aimed at unfaithful winnings or payment fraud, or if he / she makes
        untrue and / or malicious comments with regard to the Company's operation in any media or forum, or if the
        Company suspects the Player of fraudulent payment, including use of stolen credit cards or any other fraudulent
        activity (including but not limited to any chargeback or other reversal of a payment) or prohibited transactions
        (including but not limited to money laundering), the Company reserves the right to publish the Player’s actions
        together with his / her identity and e-mail address, as well as to circulate this information to banks, credit
        card companies, and appropriate agencies. Furthermore, the Company may close any accounts and forfeit any
        account balances that the Player has with the Company</p>
    <p class="mb-5">We reserve the right to void and withhold any or all winnings made by any Player,
        where we have reasonable grounds to believe that the said Player is acting or has acted in liaison with an
        attempt to defraud or damage the Company and/or the Services and/or the Platform in any way.</p>
    <p class="mb-5">In the interest of data protection, security and avoidance of fraud, the Company
        does not permit the use of any communication channels included within the Services and/or the Platform to offer
        or promote any offers, products or services (whether the Player’s or a third party's). The Player is expressly
        prohibited from posting information or contacting our customers to offer or promote any offers, products or
        services.</p>
    <p class="mb-5">We will respond to Your request, confirming closure of Your Account and the date
        on which such closure will be effective, within a reasonable time, provided that You continue to assume
        responsibility for all activity on Your Account until such closure has been carried out by us (at which point
        the Terms of Use shall terminate).</p>
    <p class="mb-5">9.2 When You request closure of Your Account under paragraph 9.1, subject to
        paragraph 9.3, return any outstanding balance in Your Account to You.</p>
    <p class="mb-5">9.3 Upon any termination of Your Account under this paragraph 9 we shall be
        entitled (without limiting our rights under paragraph 9.6) to withhold, from the repayment of the outstanding
        balance on Your Account, any funds: (a) pursuant to paragraph 8 (Collusion, Cheating, Fraud and Criminal
        Activity); (b) pursuant to paragraph 20 (Breach of the Terms of Use); (c) as otherwise provided by the Terms of
        Use (including, as appropriate, paragraph 5.4); or (d)as required by law or regulation.</p>
    <p class="mb-5">9.4 When repaying the outstanding balance on Your Account, we shall use the same
        method of payment which You provided upon registration of Your Account, or such other payment method as we may
        reasonably select.</p>
    <p class="mb-5">9.5 Where You have closed Your Account, we may in certain circumstances be able to
        re-open Your Account with the same account details as before if You request us to do so. In such circumstances,
        while Your Account will have the same account details as before, it will be subject to the Terms of Use which
        are in force at the date of any such re-opening and any prior entitlements (including, but without limitation,
        to bonuses or contingent winnings) will no longer be valid.</p>
    <p class="mb-5">9.6 We are, at any time (and notwithstanding any other provisions contained in the
        Terms of Use), entitled to close Your Account and terminate the Terms of Use on written notice (or attempted
        notice) to You using Your Contact Details. In the event of any such termination by us we shall, subject to
        paragraph 12.7, as soon as reasonably practicable following a request by You, refund the balance of Your
        Account.</p>
    <p class="mb-5">9.7 Where we close Your Account and terminate the Terms of Use pursuant to
        paragraph 11 (Collusion, Cheating, Fraud and Criminal Activity) or paragraph 20 (Breach of the Terms of Use),
        the balance of Your Account will be non-refundable and deemed to be forfeited by You to the extent of any claim
        that we may have against You as at the date of such closure (whether under Your Account, there is a Duplicate
        Account or anything similar). Closure of Your Account and Termination of the Terms of Use, other than pursuant
        to paragraphs 11 or 20 of these General Terms, will not affect any outstanding bets, provided that such
        outstanding bets are valid and You are not in breach of the Terms of Use in any way. For the avoidance of doubt,
        we will not credit any bonuses into Your Account, nor will You be entitled to any contingent winnings, at any
        time after the date on which it has been closed (whether by us pursuant to the Terms of Use, or in response to
        Your request).</p>
    <h2>TERMINATION OF THE TERMS OF USE CLOSURE AND TERMINATION BY YOU</h2>
    <h3>10. Registration</h3>
    <p class="mb-5">10.1 Only registered Users can participate in bonus-programs of the company. To
        register, the User must fully and accurately fill in the registration form.</p>
    <p class="mb-5">10.10 Company reserves the right, at any time, to check player’s identity, without
        prior notice, and prior to processing pay-outs; Company also reserves the right to hold withdrawals for the time
        needed to check the player’s identity.</p>
    <p class="mb-5">10.10.1 Please note that when cumulative deposits or withdrawals reach € 2,000,
        the player verification procedure will be mandatory. Verification process will require from players to provide
        documents such as, but not limited to, identity cards, bank cards, bank statements, source of wealth, source of
        funds, and utility bills. In case of false personal data provided by the players, the withdrawal can be refused
        and the user account can be terminated. The player will be informed thereof by email. In some cases the Company
        can request Selfie with ID, Selfie with ID and special sign, or even call or video call. When any documents are
        requested, the Account Holder must upload such documentation on their Account (My Profile &gt; Documents). When
        requesting documents for an account verification, any pending withdrawals will be cancelled.</p>
    <p class="mb-5">10.10.2 Once the verification is complete, the Account Holder may request a new
        withdrawal. In the event that the account is not verified within thirty (30) days from the initial request date,
        the account will be frozen for gameplay and transactions., Where, for any reason an Account Holder refuses or is
        unable to provide us with any of the requested documents, Company reserves the right to suspend the account and
        confiscate any funds available.</p>
    <p class="mb-5">10.10.3 Refund request may also be declined by the Casino if the player provides
        false or intentionally modified personal data in order to bypass the system.</p>
    <p class="mb-5">10.2 Registration and betting are only allowed for people over 18 years (or the
        allowed age range in the given country from which the user has opened a deposit and made bets). Users have
        complete responsibility in terms of dealing with the legality of Internet gambling in the region where they live
        and/or for providing the appropriate authorities of their country with information on winnings. The Company
        reserves the right to require proof of age and block the User’s account before receiving the appropriate
        documentation.</p>
    <p class="mb-5">10.3 All information provided during the registration must be accurate and
        complete. In particular, when using credit or debit cards, the cardholder’s name and surname must match the name
        and surname indicated in the registration form, otherwise the account will be blocked. All bets made before
        locking the account are recognized as valid.</p>
    <p class="mb-5">10.4 The Company reserves the right to block the accounts of Users who have
        reported false data, as well as to deny them the payment of any winnings. At the request of the company the User
        must present an official document with a photograph, confirming his identity (a passport copy, or his National
        ID), proof of authenticity of the indicated address data and telephone and proof of ownership of payment method.
    </p>
    <p class="mb-5">10.5 Each User can have only one account. Registered Users cannot re-register as a
        new client with a new name or a new email address. In case of violation of this rule, the company has the right
        to void all bets made by the User.</p>
    <p class="mb-5">10.6 The User has no right to permit any third party to use their game account.
    </p>
    <p class="mb-5">10.7 Please note that you should not send us the details about your credit card
        account or other sensitive financial information via an unencrypted e-mail.</p>
    <p class="mb-5">10.8 The company allows all its Users to choose their own combination of username
        and password. Users should keep such information secret. If your username and password are entered correctly
        while accessing the site, all bets remain in force and cannot be cancelled or changed by the User. If you
        suspect that someone, other than you, knows your password, change it immediately on our website. If you have
        forgotten the password or a part of it, please click the "Forgot your password?" button at the login page and
        follow the procedure to reset it.</p>
    <p class="mb-5">10.9 Users who place their bets in the company via a cell phone should remember
        that The company is not responsible for any loss of data in the mobile phone of the client, and is not
        responsible for any commission of mobile and internet operators. By registering, the client confirms that he
        accepts and agrees to these Terms.</p>
    <h3>Currency</h3>
    <p class="mb-5">11.1 Currently Users have the right to place bets in the following currencies:
        EUR, USD, AUD, CAD, NOK, GBP, RUB, NZD, JPY, BRL. The company reserves the right to block the reception of bets
        and operating activities in any of the indicated currencies. In this case, all the necessary payments on the
        accounts of blocked currency would be held in another currency equivalent at the interbank exchange rate for
        that day.</p>
    <h3>12. The Bonus Program</h3>
    <p class="mb-5">12.1 All Users’ bonuses are limited individually to one person, home address,
        telephone number and e-mail address, one bill of payments (such as by Card number or Skrill account), as well as
        the computer being used (including the institute, Internet club and other public institutions). The company has
        the right to refuse the bonus to any User or group of Users. Bonus programs are available only to Users who have
        made a deposit in real currency to the company account.</p>
    <p class="mb-5">12.3.5 Bonuses must be wagered exclusively on valid games which belong to the
        specific game category under which the bonus was initially offered. For example, a Sportsbook bonus must be
        wagered exclusively on Sports, a Casino bonus exclusively on Slots, and a Live Casino bonus exclusively on Live
        Casino games.</p>
    <p class="mb-5">12.3.6 Casino Bonuses (Slots) are sometimes offered on specific Gaming Service
        Providers (GSPs) or on specific slots. Therefore, only the wagering performed on the selected GSP’s and/or on
        specific slots will be taken into consideration towards the bonus’s wagering requirements.</p>
    <p class="mb-5">12.3.8 For no-deposit Free spins, Casino Chips and Free Bets awarded to players
        who have not previously made a deposit, a minimum deposit as well as a wagering of x1 (times one) the deposit
        amount is required, before the winnings can be withdrawn. Loyalty Casino Bonuses, Free spins, Casino Chips and
        Loyalty Sportsbook Bonuses and Freebets can be awarded only to fully verified players. Only one bonus is allowed
        per customer, per household, per address, per shared computer and shared IP address, and per any account details
        like an e-mail address, bank account details, credit card information and payment system account number. Any
        abuse of the bonus offer will lead to the closure of the account.</p>
    <p class="mb-5">12.3.9 The Freebets offered must be placed on Football with minimum odds of 2,00.
        Handicaps and Draw-no-bet markets are excluded.</p>
    <p class="mb-5">12.3.10 The maximum bet amount allowed to be placed with bonus money in Casino is
        5 EUR (or the equivalent in other currencies) or 15% of the total bonus amount awarded (whichever comes first).
        Any game rounds or spins exceeding the maximum bet amount will not count towards the bonus wagering requirements
        and any potential winnings will be forfeited.</p>
    <p class="mb-5">12.3.11 If a player decides to cancel an active Bonus, he can do so from his
        account. However, all bonus money, all winnings and any wagered amount resulting from his betting activity with
        the bonus will be forfeited for once and for all. Bonus bets calculates real money first and then bonus amount.
    </p>
    <p class="mb-5">12.2 In case of violation of any requirement of the bonus programs, and also if
        there is any evidence of recurrent bets on one and the same event from a group of customers, or conspiracy,
        regardless of the result of the given bets, The company reserves the right to deprive these Users from a bonus
        and to consider the corresponding bets as invalid. For the purposes of protection against fraud the company has
        the right to demand a document from the client proving identity before transferring a bonus.</p>
    <p class="mb-5">12.3.12 Personalized offers communicated exclusively to a specific segment of
        players via E-mail or SMS are exclusively available for the intended recipients of the E-mail or SMS and for
        those only.</p>
    <p class="mb-5">12.3.13 For personalized offers communicated via email or SMS, players are
        requested to contact our customer support team in order to claim the bonus providing all necessary details
        (e.g., bonus code, type of offer, recipient’s email address, etc.).</p>
    <p class="mb-5">12.3.14 In some occasions, we will provide Free spins in the form of a Casino
        bonus chip. The amount to be credited takes into consideration the minimum bet allowed on the specific slot(s).
        For example, 20 Free spins on NetEnt’s Guns N’ Roses video slot will be awarded as a 4 EUR (or currency
        equivalent) Casino Chip and it is intended to be played on the specific slot (Bonus Chip = Min. bet (0,20 EUR) x
        number of rounds (20) = 4 EUR).</p>
    <p class="mb-5">12.3.15 None of the promotional materials offered via this website are
        transferable, exchangeable or refundable. In the occurrence where a certain promotional material is not operable
        due to technical, geographical or legal restrictions, the company does not hold any responsibility and reserves
        the right not to compensate or refund players.</p>
    <p class="mb-5">12.3.16 Players may be requested at any given time to provide all necessary KYC
        documents for the verification of their account (proof of identity, payment method(s) and residence).</p>
    <p class="mb-5">12.3.17 In case of doubt for the bonuses’ remaining wagering requirement, players
        are advised to contact our customer support team.</p>
    <p class="mb-5">12.3.18 Wagering will not count on the following games. You are solely responsible
        not to include the following games within your bonus wagering:</p>
    <p class="mb-5">All Video Poker games, All Roulette games, All Quick Play games, All Blackjack
        games, Hi Lo Fever, All Baccarat games, 3 Card Poker, European Roulette, Blood Suckers, Blood Suckers II, The
        WishMaster, Dead or Alive, Dead or Alive II, Jack Hammer 2, Cloud Quest, Tower Quest, Pearls of India, Treasure
        Island, Eye of the Kraken and Solar Queen.</p>
    <p class="mb-5">Company reserves the right to forfeit winnings and any wagered amount if customers
        found that they managed to play above mentioned games with an active bonus.</p>
    <p class="mb-5">12.3.19 We reserve the right to amend, cancel or terminate any of the promotions
        at any given time and without prior notice.</p>
    <p class="mb-5">12.3 PROMOTIONAL TERMS Unless otherwise stated, the following terms apply for all
        Bonuses, Free spins, Free Bets, Casino Chips and any other “promotional material” offered via the website,
        newsletters and SMS.</p>
    <p class="mb-5">12.4.1 Balance is paid out directly in your Cash Balance, which you can play with
        on Casino or withdraw.</p>
    <p class="mb-5">12.4.2 Your friend must sign up through your personal invitation link.</p>
    <p class="mb-5">12.4.3 To receive 5 USD on your balance, your friend must make a deposit of at
        least 10 USD (your friend can deposit 10 USD in several installments).</p>
    <p class="mb-5">12.4.4 If a friend that you have invited is not from the same country as you, you
        will receive a default reward converted to your local currency at the fair exchange rate.</p>
    <p class="mb-5">12.4.5 You cannot create new Casino accounts and sign up through your own link to
        receive the reward. The Refer A Friend program is made for our players to invite friends to the platform. Any
        other use of this program is strictly prohibited.</p>
    <p class="mb-5">12.4.6 Casino may suspend or terminate the Refer A Friend program or the user's
        ability to participate in it at any time for any reason. We reserve the right to suspend accounts or remove Cash
        Balance if we notice any activity that we believe is abusive, fraudulent, or in violation of the Terms of
        Service or Refer A Friend Terms. We reserve the right to review and investigate all referral activities and to
        suspend accounts or modify referrals in our sole discretion as deemed fair and appropriate.</p>
    <p class="mb-5">12.3.1 Casino ‘Welcome’ and ‘Reload’ (slots), and Sports ‘Welcome’ and ‘Reload’
        bonuses are valid for a period of 30 days from the time when they are credited to the players’ account. After
        the period of 30 days the aforementioned promotional materials expire and are not claimable or refundable.</p>
    <p class="mb-5">12.3.2 Live Casino ‘Welcome’ and ‘Reload’ bonus are valid for a period of 14 days
        from the time when they are credited to the players’ account. After the period of 14 days the aforementioned
        promotional materials expire and are not claimable or refundable.</p>
    <p class="mb-5">12.3.3 All Free spins, Freebets, Bonus Chips, are valid for a period of 7 days
        from the time when they are credited to the players’ account. After the period of 7 days the aforementioned
        promotional materials expire and are not claimable or refundable. Max winnings from Cashback / Loyalty Bonus are
        limited to five (5x) times the initial amount of Cashback Bonus given. Any winnings above that will be
        forfeited. Max winnings from season/special promotions (including, but not limited to, Christmas Bonuses, Easter
        Bonuses, Halloween Bonuses) for 200% and above Bonus threshold, are limited to four (4x) times the initial
        deposit amount. Max winnings for bonuses between 150% - 199% Bonus threshold, are limited to eight (8x) times
        the initial deposit amount. Max winnings for bonuses between 120% - 149% threshold, are limited to ten (10x)
        times the initial deposit amount. Max winnings for bonuses between 100% - 119% threshold, are limited to fifteen
        (15x) times the initial deposit amount. Max winnings for bonuses between 25% - 99% threshold, are limited to
        twenty (20x) times the initial deposit amount. Any winnings above those limits will be forfeited.</p>
    <p class="mb-5">- Free spins: x20 (times twenty) the amount of winnings</p>
    <p class="mb-5">- Casino Chip: x25 (times twenty) the bonus amount</p>
    <p class="mb-5">- Freebets: x1 (times one) the amount of winnings</p>
    <h3>13. Deposits</h3>
    <p class="mb-5">13.1 The available payment methods are determined by the country and the currency
        selected during registration. A complete list of fees, limits on them and other items is displayed on the
        Deposits and Withdrawals page. The company reserves the right to change these terms and details.</p>
    <p class="mb-5">13.2 When conducting any financial transactions, it is necessary that the name of
        the owner of the debit/credit card or bank account exactly matches the name of the owner of the appropriate
        account of the company. Otherwise, the company reserves the right to cancel all transactions and make a return
        on all bets made while using someone else’s account or credit/debit card.</p>
    <h3>14. Entry of Money on Account</h3>
    <p class="mb-5">14.1 If any funds have been transferred to the User erroneously, the User is
        obliged to notify the company immediately. Any winnings of the client arising from such an error shall be
        considered invalid, and such bets are refundable, regardless of the delay between the origin of the error and
        the time it was seen.</p>
    <p class="mb-5">14.2 If the deposits to the account were made for any other purpose than bets,
        poker, casino and financial betting, the company (particularly in case of suspected fraud) reserves the right to
        cancel a deposit and collect from the User all costs incurred as a result of processing the deposit.</p>
    <p class="mb-5">14.3 If the User’s deposit exceeds the bet’s amount, upon the client’s request for
        withdrawal, The company reserves the right to charge the User all costs incurred as a result of processing
        deposits and withdrawals.</p>
    <h3>15. Financial Constraints</h3>
    <p class="mb-5">15.1 The minimum bet on any event is the equivalent of 0.50 Euro in the registered
        currency of game account. The minimum bet in "Multiple" mode and the minimum bet on one version of the "System"
        is the equivalent of 0.50 Euros.</p>
    <p class="mb-5">15.3 The maximum amount of the bet on the event depends on the sport and the
        events and is defined by the bookmaker network specifically for each event and each type of bet and is subject
        to change without prior written notice. The company reserves the right to limit the maximum bet on individual
        events, as well as the introduction and removal of specific restrictions on the accounts of individual Users
        without notice or explanation of reasons.</p>
    <p class="mb-5">15.4 All financial limitations are applicable to each User/group acting together,
        making bets containing the same predictions. If the User makes a number of bets containing the same predictions,
        the total payment on these bets may be limited by the size of a maximum payment regulated by given limitations.
    </p>
    <h3>16. Payments</h3>
    <p class="mb-5">16.1 Payments are processed in a time not exceeding 72 hours starting from the
        moment that the request has been approved by the Payments department. Before the first payment is made to the
        User via electronic payment methods (Skrill, Webmoney, Credit or Debit card, etc.), the client is obliged to
        upload an electronic copy of a passport of his national ID at the relevant section under his Profile. The
        company, at its own discretion, may ask from the client additional documents (e.g., proof of address, selfies,
        etc.) prior to their first payment. Remember that forgery is severely punished by law and in cases of suspicion
        of placing a counterfeit or an edited copy of the documents by electronic methods, The company reserves the
        right to send such documents to the appropriate regulatory authorities.</p>
    <p class="mb-5">16.2 Before making the payment, the employees of the company will verify the
        correspondence of the name, surname, father’s name, birth dates of the client and also other data. If
        differences are found between the actual data and the data provided by the client, The company reserves the
        right to make a refund for all bets by the User and refuse to pay out winnings to the User unless they prove
        their identity and accuracy of entered data.</p>
    <p class="mb-5">16.3 If it turns out that the User has opened several accounts at the company, The
        company reserves the right to refuse to pay out these accounts (except the User’s assets legitimately
        transferred to the company account, after his payment of a 20% fine of the total amount of deposits).</p>
    <p class="mb-5">16.4 With the first request for a withdrawal the User must enter valid passport or
        Personal ID details, exactly as it appears on the document, in the language of the country that issued (or in
        the case of foreign documents – in English).</p>
    <p class="mb-5">16.5 Group and family members should regulate personal relationships with each
        other – payments are made ONLY in the name of the owner of the appropriate account.</p>
    <p class="mb-5">16.6 The User agrees to provide the company with information about his bank
        account from which the bets will be made in particular, in order to transfer his winnings.</p>
    <p class="mb-5">16.7 The company is not responsible for changes in the number of payments related
        to fluctuations of currency (rate of exchange).</p>
    <p class="mb-5">16.8 If the User has requested a withdrawal in the amount of 1,000 Euros or more
        (or the equivalent in another currency at the interbank rate), Company pays a commission on the transfer and
        subsequent operations of withdrawals in the given calendar month. Otherwise, the commission is paid to the bank
        by the User. Maximum withdrawal able amount over a 24-hour period is 1,000 Euros (or the equivalent in another
        currency at the interbank rate) subject to its payment provider's specific limits. For winnings over 10,000
        Euros, the payments will be done in equal monthly instalments.</p>
    <p class="mb-5">16.9 The Company reserves the right of funds’ withdrawal using a priority for
        itself method of payment for winning players (including credit/debit card or to the player’s bank account).</p>
</div>
        `
    },
    'affiliate-program': {
        title: 'Affiliate Program',
        subtitle: 'Partner with Us',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">One of our main concerns as an online gaming operator is to uphold fair play.</p>
                <p class="mb-5">With the exception of sports betting and live casino games, a Random Number Generator (RNG) is always used to ensure the integrity of casino games by determining the random outcome of such games.</p>
                <p class="mb-5">This is an industry-standard system that guarantees consistently random results and has been extensively tested by running and analyzing thousands of game rounds. The randomness of the RNG provides a credible and fair gaming environment.</p>
                <p class="mb-5">The Return to Player (RTP) value is a theoretical calculation of the expected percentage of wagers that a specific game will return to the player after a significant number of plays (e.g., hundreds of millions of game rounds). While each individual game is unpredictable and it’s possible to win or lose, the long-term average will approach the theoretical RTP value.</p>
                <p class="mb-5">We regularly monitor player payout ratios and cooperate with gaming regulatory authorities to ensure compliance with applicable laws.</p>
            </div>
        `
    },
    'fairness': {
        title: 'Fairness Testing Methods & RNG',
        subtitle: 'Fair Play',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <h3 class="font-bold">2. Scope</h3>
                <p class="mb-5">The provisions in this anti-money-laundering process aim to reduce the possibility that the service-provision business of Mirage Corporation will be used for criminal purposes or in violation of regulations.</p>
                <p class="mb-5">This process provides guidance detailing the responsibility with respect to the prevention of money laundering and terrorist financing from the perspective of the legal framework and internationally accepted regulations in this field.</p>
                <h3 class="font-bold">3. Law, Regulations & Rules</h3>
                <p class="mb-5">The Penal Code of Curaçao establishes the procedures for prosecuting money‐laundering offences, as well as measures for asset confiscation following a money-laundering conviction, asset freezing when a person is charged with a money-laundering offence, and measures for issuing a search and/or seizure order when it is suspected that a person has committed money-laundering.</p>
                <p class="mb-5">The policies and procedures in this manual aim to comply with the rules and guidance contained in the NOPML, NORUT and NOIS, which refer to the Penal Code. In addition to those regulations, the Central Bank of Curaçao and Sint Maarten has introduced a comprehensive framework with provisions and guidelines to prevent and combat money-laundering and terrorist financing (hereinafter: the “Provisions & Guidelines” or “P&G”), which are based, among other things, on the FATF recommendations.</p>
                <p class="mb-5">Both the NORUT and the NOIS apply to entities offering the possibility of participating in offshore gambling (online gambling) inside or outside of Curaçao, which is the case for the Company. The NOIS prohibits obliged persons from establishing a business relationship or carrying out an occasional transaction with a business applicant unless that obliged person has in place the following measures and procedures in relation to that business in accordance with the NOIS provisions:</p>
                <p class="mb-5">• Customer due-diligence measures;</p>
                <p class="mb-5">• Record-keeping procedures; and</p>
                <p class="mb-5">• Internal reporting procedures.</p>
                <p class="mb-5">The Company is obliged to apply the measures and procedures mentioned above, even in cases where it establishes or carries out non-face-to-face relationships or transactions, directly or indirectly, through its affiliated group company.</p>
                <p class="mb-5">The Company is also obliged to ensure that employees are informed of the applicable AML/CFT legislation, as well as the obliged-persons’ policies and measures in this regard. Employees must undergo appropriate due-diligence procedures prior to their employment and are also expected to receive training on the identification and handling of transactions conducted by, or on behalf of, any person who has been, is or appears to be involved in money-laundering or terrorist financing.</p>
                <h3 class="font-bold">4. Policy</h3>
                <h3 class="font-bold">Responsibility</h3>
                <h3 class="font-bold">AML Risk</h3>
                <h3 class="font-bold">Mirage Corporation uses the following guidance as the foundation for its AML risk model:</h3>
                <h3 class="font-bold">AML Risk Factors</h3>
                <p class="mb-5">The ultimate responsibility for Mirage Corporation’s anti-money-laundering policy lies with the Director.</p>
                <p class="mb-5">An overview of the business-risk assessment of AML will be maintained to assign and monitor the components of the separate risk classifications. Mirage Corporation categorises the overall AML risk into:</p>
                <p class="mb-5">• Customer risk</p>
                <p class="mb-5">• Product risk</p>
                <p class="mb-5">• Interface risk</p>
                <p class="mb-5">• Geographic risk</p>
                <p class="mb-5">AML Policies and Procedures</p>
                <p class="mb-5">The policies and procedures implemented by Mirage Corporation to meet the applicable AML/CFT regulatory requirements are documented in this Manual. The policies and procedures will be reviewed periodically to ensure they remain compliant with regulatory requirements and the evolving risk environment as applicable to Mirage Corporation.</p>
                <p class="mb-5">• a clear statement of the culture and values adopted towards the prevention of financial crime;</p>
                <p class="mb-5">• a commitment to ensure that identity is satisfactorily verified in all cases and on a risk-based approach before business applicants are accepted as customers;</p>
                <p class="mb-5">• a commitment to ongoing customer due-diligence throughout the business relationship;</p>
                <p class="mb-5">• a commitment to ensure that personnel are trained and aware of the law, their legal obligations and how to meet those obligations;</p>
                <p class="mb-5">• a clear assignment of roles, responsibilities and organisational structure, and recognition of the importance of internal reporting of suspicions by staff in a timely manner.</p>
                <p class="mb-5">The procedures contained in this Manual reflect Mirage Corporation’s overall AML Policy and must be complied with by all staff of Mirage Corporation.</p>
                <h3 class="font-bold">5. Risk Assessment, Management & Risk-based Approach</h3>
                <h3 class="font-bold">Risk Assessment</h3>
                <h3 class="font-bold">Financial-crime Risk Assessment</h3>
                <h3 class="font-bold">Risk Mitigation</h3>
                <h3 class="font-bold">Monitoring Controls</h3>
                <p class="mb-5">The implementation procedures provide that the purpose of the risk-assessment procedures is to enable the Company to identify and assess the ML/FT risks to which the obliged-person is or may be exposed and thus determine:</p>
                <p class="mb-5">The risk-based approach to financial-crime prevention is reflected in Mirage Corporation’s approach to designing and operating its systems and controls to minimise the risk of Mirage Corporation being used for financial-crime purposes. Risk is fundamental to business development, new products, product-functionality development or operation in new markets.</p>
                <p class="mb-5">When Mirage Corporation addresses a new service, customer segment or geography, the financial-crime risk assessment will be updated during development/launch (to ensure AML processes support the new activities).</p>
                <p class="mb-5">Financial-crime risk assessments are conducted on an ongoing basis, and in particular, apply where the business environment changes through, for example:</p>
                <p class="mb-5">• Entry into new markets; and</p>
                <p class="mb-5">• The development of new products or features/functions of the product.</p>
                <p class="mb-5">Internal controls focus on:</p>
                <p class="mb-5">• Customer due-diligence, including enhanced due-diligence levels based on each customer’s risk assessment;</p>
                <p class="mb-5">• Assessing risks and setting measures to mitigate the identified risks;</p>
                <p class="mb-5">• Where necessary applying enhanced due-diligence;</p>
                <p class="mb-5">• Monitoring key risk indicators to re-assess a specific customer’s risk;</p>
                <p class="mb-5">• Financial-crime systems and controls will continue to evolve over time to address the changing risk environment.</p>
                <p class="mb-5">Existing systems and controls will be reviewed and amended where necessary to reflect changes in the assessed risk and identified vulnerabilities.</p>
                <p class="mb-5">The Procedures & Guidelines state that it is essential that the controls to manage and mitigate the identified risks are monitored continuously. This is needed so that, in case of a change in circumstances that may mitigate or exacerbate a particular risk, the respective control is modified accordingly.</p>
                <p class="mb-5">a) Developments in legislation, including the NOIS and the NORUST.</p>
                <p class="mb-5">b) The Implementation Procedures and financial-crime risk assessments, which are carried out as part of developing new products, services, features or servicing new customers/markets.</p>
                <p class="mb-5">c) The operation of periodic internal controls, including monitoring, investigation and reporting of suspicious activity.</p>
                <p class="mb-5">• When customer due-diligence under the NOIS for existing customers should be performed; and</p>
                <p class="mb-5">• Where a customer presents a low ML/FT risk so as to defer verification procedures until after the commencement of the business relationship.</p>
                <p class="mb-5">Risk-based Approach</p>
                <p class="mb-5">Mirage Corporation operates a risk-based approach to the development and operation of its systems and controls designed to prevent financial crime.</p>
                <p class="mb-5">The risk assessment for the Company is undertaken at the onboarding stage (before acceptance) and then at regular monthly intervals.</p>
                <p class="mb-5">The Company’s customers are subject to initial and ongoing risk-based due-diligence procedures.</p>
                <p class="mb-5">Initial due-diligence seeks to obtain the customer’s identity and verify it before the business relationship is established. Information is also obtained regarding the purpose and intended nature of the business relationship so the Company can establish the customer’s business and risk profile and accept or reject a customer. Ongoing due-diligence ensures that the initial due-diligence information remains up to date.</p>
            </div>
        `
    },
    'aml': {
        title: 'AML Policy',
        subtitle: 'Anti-Money Laundering and Counter-Terrorism Financing',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">ValorBet is fully committed to preventing any form of money laundering, terrorist financing, or other illegal financial activity on its platform. Our Anti-Money Laundering (AML) and Counter-Terrorism Financing (CTF) policy is designed to ensure compliance with international laws and regulations, including FATF recommendations and applicable local legislation.</p>

                <p class="mb-5">We actively monitor all transactions and activities of our customers to identify and prevent any suspicious behavior. By maintaining transparent and traceable operations, ValorBet ensures the highest level of trust and integrity in all financial processes.</p>

                <p class="mb-5"><b>1. Customer Verification (KYC)</b><br>
                Every customer must go through a “Know Your Customer” (KYC) process before making deposits, withdrawals, or participating in any gambling activity. The KYC procedure includes identity verification, address confirmation, and age validation. We may request copies of documents such as an ID card, passport, driver’s license, or utility bill.</p>

                <p class="mb-5"><b>2. Monitoring of Transactions</b><br>
                All transactions on the ValorBet platform are subject to continuous monitoring. Unusual or inconsistent activities may lead to a temporary suspension of the account while we conduct additional checks. We reserve the right to report any suspicious transaction to relevant financial authorities without prior notice to the customer.</p>

                <p class="mb-5"><b>3. Prohibited Activities</b><br>
                ValorBet strictly prohibits customers from using their accounts for any purposes related to money laundering, fraud, or financing of terrorism. It is forbidden to use multiple accounts, third-party payment methods, or any tools intended to disguise the origin of funds.</p>

                <p class="mb-5"><b>4. Record Keeping</b><br>
                All customer identification data, transaction history, and communication records are securely stored for at least 5 years after the relationship with the customer ends. This helps ensure that all necessary data is available for any official investigation.</p>

                <p class="mb-5"><b>5. Staff Training</b><br>
                All employees of ValorBet are regularly trained to recognize and respond to potential money laundering and fraud cases. We ensure our team remains up to date with evolving regulatory standards and industry best practices.</p>

                <p class="mb-5"><b>6. Cooperation with Authorities</b><br>
                ValorBet fully cooperates with international and local financial authorities, law enforcement, and regulatory bodies. We provide full transparency and timely access to information when required by law.</p>

                <p class="mb-5"><b>7. Reporting Obligations</b><br>
                If we detect or suspect any illegal or suspicious activity, we are legally obligated to report it to the competent authority. The customer’s account may be frozen until the investigation is completed.</p>

                <p class="mb-5">By registering on ValorBet, the customer agrees to comply with this AML/CTF Policy and acknowledges that providing false information or attempting to bypass verification procedures may result in permanent account closure and forfeiture of funds.</p>

                <p class="mb-5"><b>Contact Information</b><br>
                For any AML-related inquiries, please contact: <br>
                <b>Email:</b> compliance@valor.bet
                </p>
            </div>
        `
    },
    'self-exclusion': {
        title: 'Self-Exclusion Policy',
        subtitle: 'Responsible Gaming',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">At ValorBet, we are committed to promoting responsible gaming and providing players with tools to maintain control over their gambling behavior. If at any point you feel that your gaming activity is negatively impacting your life, you can request temporary or permanent self-exclusion.</p>
                <p class="mb-5">Self-exclusion means that your account will be closed for a specified period or indefinitely, and you will not be able to access our gaming services during this time.</p>
                <p class="mb-5">To initiate a self-exclusion, please contact our support team at <b>support@valor.bet</b> and specify the period for which you wish to be excluded (for example, 6 months, 1 year, or permanently).</p>
                <p class="mb-5">Once self-exclusion has been activated, it cannot be reversed until the selected period expires. During this time, you will not receive any promotional materials or offers from ValorBet.</p>
                <p class="mb-5">We also recommend that you seek help from organizations that specialize in gambling addiction if you feel you are losing control. Some helpful resources include:</p>
                <ul class="mb-5 list-disc ml-6">
                    <li>GamCare (www.gamcare.org.uk)</li>
                    <li>Gambling Therapy (www.gamblingtherapy.org)</li>
                    <li>Gamblers Anonymous (www.gamblersanonymous.org)</li>
                </ul>
                <p class="mb-5">At ValorBet, your safety and well-being are our top priorities. Please play responsibly.</p>
            </div>
        `
    },
    'kyc': {
        title: 'KYC Policy',
        subtitle: 'Verification and Identification',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">As part of our commitment to maintaining a safe and transparent gaming environment, Mirage Corporation N.V. implements a strict Know Your Customer (KYC) policy. This policy ensures that the identity of our customers is verified, preventing fraud, money laundering, and the misuse of our services.</p>
                <h3 class="font-bold">1. Purpose</h3>
                <p class="mb-5">The purpose of the KYC Policy is to establish the identity of all players and verify the source of their funds when necessary. This is part of our compliance with Anti-Money Laundering (AML) and Countering the Financing of Terrorism (CFT) obligations.</p>
                <h3 class="font-bold">2. Identification and Verification</h3>
                <p class="mb-5">Players must provide accurate and verifiable personal information during registration. This includes, but is not limited to, full name, date of birth, address, and valid identification documents such as a passport, national ID, or driver’s license.</p>
                <p class="mb-5">We reserve the right to request additional documents to verify your identity or the source of funds, such as proof of address (utility bill or bank statement) or information related to payment methods used on the platform.</p>
                <h3 class="font-bold">3. Verification Timing</h3>
                <p class="mb-5">Verification may occur during registration, before withdrawals, or at any point when the Company deems it necessary to confirm the authenticity of user information. Accounts may be temporarily suspended until verification is successfully completed.</p>
                <h3 class="font-bold">4. Data Protection</h3>
                <p class="mb-5">All information and documents provided during the KYC process are treated with strict confidentiality and processed according to applicable data protection laws. Data is securely stored and only used for identity verification and compliance purposes.</p>
                <h3 class="font-bold">5. Failure to Comply</h3>
                <p class="mb-5">Failure to provide the requested documents or attempts to submit false or misleading information may result in account suspension, restriction of services, and, if necessary, reporting to regulatory authorities.</p>
                <h3 class="font-bold">6. Ongoing Monitoring</h3>
                <p class="mb-5">Mirage Corporation continuously monitors transactions and player behavior to identify suspicious activities. In case of any irregularities, further verification or account review may be initiated.</p>
                <p class="mb-5">By using our services, players acknowledge and agree to comply with this KYC Policy as part of the Terms and Conditions of Mirage Corporation.</p>
            </div>
        `
    },
    'dispute-resolution': {
        title: 'Dispute Resolution',
        subtitle: 'Conflict Resolution',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">Dispute resolution is a term used in both commercial and private law, and its definition is not difficult to understand. In its most basic form, dispute resolution refers to the process of resolving a disagreement between two or more parties.</p>
                <p class="mb-5">What can complicate dispute resolution is the method by which the dispute is resolved, as different forms of resolution have a number of factors to consider—primarily cost, accessibility, confidentiality, and speed.</p>
                <p class="mb-5">To speak with a member of our dispute resolution team, you can email us at <a href="mailto:support@valor.bet">support@valor.bet</a> and we will get back to you.</p>
                <p class="mb-5">The various forms of dispute resolution are discussed as follows:</p>

                <p class="mb-5"><span>Pre-action and Without Prejudice Discussions</span> — Usually the most cost-effective way to resolve disputes, involving the parties seeking to resolve some or all of their issues. These are called 'pre-action' because they occur before any formal proceedings, such as litigation, are initiated. This generally involves the parties meeting or holding a series of meetings with or without legal representation to discuss issues and attempt to settle the dispute. If one party has legal representation, it is appropriate for the dispute resolution lawyers to act as the point of contact. Not all parties require legal representation, but where one party does, it is advisable for all to take expert advice from a dispute resolution lawyer. A dispute resolved without costly court or arbitrator/mediator fees is undoubtedly the cheapest form of resolution.</p>

                <p class="mb-5"><span>Mediation</span> — Mediation is a form of dispute resolution but can take many shapes. It involves the disputing parties meeting at a location with an independent mediator present, who works between the parties to facilitate a resolution or narrow the issues. The parties must participate and prepare for the process, and if an agreement is reached, they are bound by it. Documents may be shared and presented before and during mediation. Mediation is less formal and therefore much cheaper than arbitration or litigation. The mediator remains impartial throughout and facilitates, rather than decides, the outcome. It is always advisable to draft and sign a settlement agreement to avoid later confusion. Mediation is confidential and allows terms that a court or arbitrator could not impose. A settlement agreement is legally binding and enforceable if breached, though most parties comply once agreed.</p>

                <p class="mb-5"><span>Arbitration</span> — Arbitration is a more formal legal process compared to mediation. It mirrors litigation in many respects but allows greater flexibility for the parties and the arbitrator. The dispute details are presented via documents and, where appropriate, oral representation. The arbitrator then makes a decision to resolve the conflict. More than one arbitrator may be appointed, depending on case complexity or the need for specialized expertise. Arbitration is private, which is often an important factor. It is usually cheaper than litigation, and parties have more control over the process. Arbitration awards are generally enforceable in most countries, much like court judgments. It is prudent to have a dispute resolution lawyer represent you, as this is a formal legal process involving document disclosure and evidence.</p>

                <p class="mb-5"><span>Litigation</span> — Litigation is the formal court-based process of resolving a dispute. Once a claim is filed, the parties must follow the court’s procedural rules and timetable. Litigation can be complex and time-consuming. While individuals can represent themselves, it is strongly advised to engage a dispute resolution lawyer. Litigation is often expensive due to the involvement of lawyers, judges, and experts. Most cases settle before trial, but when they don’t, the outcome is determined by a judge and is legally binding (subject to appeal). Except in family proceedings, court cases are not private and are a matter of public record.</p>

                <p class="mb-5"><span>Alternative Dispute Resolution (ADR)</span> — ADR is a broad term for resolving disputes without litigation. Therefore, the first three methods discussed above—pre-action discussions, mediation, and arbitration—are all forms of ADR.</p>

                <p class="mb-5">When considering the best method of dispute resolution for your issue, always check any contract governing the relationship between the parties. Many contracts, especially those drafted in recent years, contain a dispute resolution clause specifying how disputes should be handled.</p>

                <p class="mb-5">The UK legal system increasingly encourages settlement over litigation. Courts take a dim view of parties who fail to attempt resolution outside litigation. Ignoring a mediation or arbitration clause in a contract can lead to financial consequences. Therefore, before proceeding to litigation, review your contract or consult a dispute resolution lawyer. You may not have a choice!</p>

                <p class="mb-5">Courts disapprove of parties who litigate without first trying informal resolution. Cost penalties can be severe, so proceeding without attempting settlement carries risk—even if you win!</p>

                <p class="mb-5">Engaging specialist dispute resolution lawyers is often essential to ensure expert guidance on the appropriate course of action and the most effective way to resolve any conflict.</p>
            </div>
        `
    },
    'general-terms': {
        title: 'Terms and Conditions',
        subtitle: '',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
    <p class="mb-5">Introduction: www.Valor.Bet</p>
    <p class="mb-5">1Win N.V. which is registered at Dr. H. Fergusonweg 1, Curacao, with company number 147039, and
        having a Certificate of Operation, issued for gaming license application № OGL/2024/587/0621 to the Curaçao
        Gaming Control Board, and all rights to operate the gaming software. Payments are processed by MFI INVESTMENTS
        LIMITED (registration number: HE 386738, address: Avlidos St. 4, Mesa Geitonia, 4002, Limassol, Cyprus),
        subsidiary of the company 1Win N.V.</p>
    <p class="mb-5">The information on the site is provided by the site operator - company ValorBet N.V., registered at
        the address: Palm Avenue 10, Rosebank, Sint Maarten. The activity of the company ValorBet N.V. is licensed and
        regulated by IslandGames N.V. (license number: No. 1234/JAZ2021-567; valid until December 31, 2025) and by the
        legislation of Sint Maarten. Payments are processed by Global Invest Solutions Ltd (registration number: HE
        654321, address: Ocean Drive 22, Mesa Verde, 5678, Limassol, Cyprus), a subsidiary of ValorBet N.V.</p>
    <h2>General Terms and Conditions</h2>
    <h3>THE MAIN PROVISIONS </h3>
    <h3>BASIC DEFINITIONS AND TERMS </h3>
    <h3>ACCOUNT RULES</h3>
    <h3>ACCOUNT CREATION</h3>
    <h3>JUVENILE POLICY</h3>
    <h3>CLIENT IDENTIFICATION</h3>
    <h3>MULTIPLE REGISTRATION</h3>
    <h3>PAYMENT OF WINNINGS </h3>
    <h3>LEGAL REGULATION / RESTRICTIONS</h3>
    <p class="mb-5">1. ValorCasino betting company accepts bets on sporting events and other events taking place in all
        countries of the world</p>
    <p class="mb-5">1. 1 cancelling the bets;</p>
    <p class="mb-5">2. 2 closing the client's account without a following refund;</p>
    <p class="mb-5">3. Any placed bet serves as a confirmation that the client agrees with and accepts the following
        Betting Rules.</p>
    <p class="mb-5">6. The betting company does not accept claims regarding textual discrepancies in the transliteration
        (translation from the foreign languages) of team names, names of players, competition sites. All information
        given in the name of the tournament is informative. Possible errors in this information are not the basis for
        bet cancelling.</p>
    <p class="mb-5">7. All sports events will be considered postponed and canceled only if there is information from the
        official documents of the organizations conducting sports competitions, sports federations official websites,
        websites of sports clubs and other sources of sports information, and sports events specified in the line are
        corrected on the basis of these data.</p>
    <p class="mb-5">8. Bets on regional championships (football, futsal, hockey, etc.) are calculated within 7 days
        (after the publication of the results on the official websites of these championships). The list of official
        websites can be found in the "Main sources of information" section. In case of one of the teams’ absence at the
        match, all bets will be paid out with the cofficient "1" (return). The team that did not take part in the match
        is awarded with a walkover</p>
    <p class="mb-5">These Betting and Payment Rules of the ValorCasino betting company (hereinafter referred to as the
        "Rules") determine the order of bets acceptance, payoffs, resolution of disputable issues, specific aspects of
        betting on certain sports. These Rules regulate all the other relations between the participants of the
        ValorCasino betting company and the client. These Rules apply to the customers of ValorCasino.com site and
        affiliated sites. Bet – an agreement on the winning concluded between the client and the betting company,
        according to the established Rules, while the outcome of this agreement depends on the event, regarding which it
        is unknown whether it will happen or not. Acceptance of bets from clients takes place on the terms offered by
        the betting company. Outcome a result of the event (events), on which the bet was placed. Сlient a person who
        places bet on the outcome of the event in the betting company. Line a set of events, possible outcomes of these
        events, coefficients on the possible outcomes of these events, their date and time, after which the betting
        company stops accepting bets on the outcomes of these events. Bet cancellation an event for which the
        calculation and payoff are not made. In case of the "bet cancellation", in accordance with these Rules, the
        transaction between the organizer and the client is considered null and void and refund is made for such bet.
        Normal playing time is the duration of match in accordance with the rules for this sport, including the injury
        time added by the referee. The normal playing time does not include injury time, overtime, penalty shootouts,
        etc.</p>
    <p class="mb-5">1 An individual cannot participate in a game for money unless that individual is an Account Holder.
        To be registered as a player (be able to place bets), an individual must submit an application for registration
        and provide at least the following information: date of birth (showing that the player is over eighteen (18)
        years of age); player's first and last name; player's place of residence; player's valid email address; a
        username and a password</p>
    <p class="mb-5">2 An individual applying to become an Account Holder furthermore warrants and represents: to be a
        physical person (a legal entity will not be accepted as an Account Holder); not to be a resident of: Aruba,
        Afghanistan, Albania, Algeria, Angola, Australia, Bahamas, Bonaire, Botswana, Cambodia, Curacao, Ecuador,
        Ethiopia, France, Ghana, Guyana, Hong Kong, Iran, Iraq, Israel, Italy, Kuwait, Laos, Myanmar, Namibia,
        Nicaragua, North Korea, Netherlands, Pakistan, Panama, Papua New Guinea, Philippines, Singapore, Spain, Sri
        Lanka, Sudan, Syria, Taiwan, Trinidad and Tobago, Tunisia, Uganda, United Kingdom, United States of America,
        Saba, Statia, St.Martin, Yemen, Zimbabwe. (please be aware of particular country exclusions for Casino -Games -
        Live Casino, Poker and Bingo); not to be a professional player in any sport, competition or league where
        ValorCasino offers betting; not to be restricted by limited legal capacity; not to be acting on behalf of
        another party; not to be classified as a compulsive problem gambler, and/or be included (whether voluntarily or
        involuntarily) on any register or database of excluded players; not to be depositing monies originating from
        criminal and/or other unauthorized activities; not to be depositing monies through a Card which the Account
        Holder is not authorized to use and/or utilizing a Card in a jurisdiction in which betting and gaming are
        prohibited; not to be conducting criminal activities whereby a ValorCasino Account is directly or indirectly
        involved; not to use the Services if it is illegal in his/her country of residence or otherwise restricted for
        him/her to open a gaming account, purchase or use services from ValorCasino and/or otherwise participate in the
        games offered. It is the Account Holder’s responsibility to ensure his/her use of ValorCasino"s Website and
        Services is legal; not to find the Website or the Services offensive, objectionable, unfair, nor indecent; to
        maintain his/her ValorCasino Account details up-to-date in terms of the following: first and last name, country
        of residence, valid email address and phone number. Not to be creating the multiple accounts.</p>
    <p class="mb-5">3 An individual applying for registration warrants and represents that any information provided in
        their application form is true and correct. Failing this, ValorCasino will not register the individual. In case
        of doubt about the accuracy of the data of an already created account, ValorCasino BC reserves the right to
        request from the betting participant any documents of company's choice that confirm his/her identity and other
        data transmitted by the betting participant, as well as to cancel any payments until all the information has
        been verified. Betting company has the right to request the sending of documents by post. Verification of
        documents can last up to 72 hours from the moment of receiving of documents. If it is proved that the
        information received is not reliable, the company has the right to indefinitely cancel all bets and suspend all
        cash payments, as well as continue checking the account, asking for a package of documents necessary for
        reliable account verification.</p>
    <p class="mb-5">2. Users from the United States, France, United Kingdom, Spain and Italy are prohibited from
        gambling on ValorCasino.</p>
    <p class="mb-5">If you are under 18 years old, please do not attempt to register at the ValorCasino betting company.
        ValorCasino is a socially responsible gambling operator and applies the strategy of restricting access to the
        gambling games for persons under 18 years old. The company checks the bettors, so if you register an account on
        the BC ValorCasino site, we have the right to request your documents for proof of your age and identity. You
        cannot transfer, sell, or pledge Your Account to another person. This prohibition includes the transfer of any
        assets of value of any kind, including but not limited to ownership of accounts, winnings, deposits, bets,
        rights and/or claims in connection with these assets, legal, commercial, or otherwise. The prohibition on said
        transfers also includes however is not limited to the encumbrance, pledging, assigning, usufruct, trading,
        brokering, hypothecation and/or gifting in cooperation with a fiduciary or any other third party, company,
        natural or legal individual, foundation and/or association in any way shape or form</p>
    <p class="mb-5">In accordance with the internal AML-Policy, the Company carries out initial and current identity
        checks of the Company Users in accordance with the level of potential risk associated with each User. The
        company will require you to provide minimum information to verify your identity. The company will record and
        save the data and documents proving your identity, as well as information about which methods were used to
        verify your identity and the results of the checks. The company may check your personal data for matches with
        the list of persons suspected of terrorism, formed by authorized state and independent bodies. The minimum set
        of identification data includes: the full name of the User; date of birth (for individuals); the residential
        address or the registration address of the User; the source of the funds which are going to be deposited into
        the company’s account. In order to verify and confirm the above data authenticity, the Company may require the
        following documents from the User: passport or identification card, or other document replacing them, which
        meets the following requirements: - contains the name, date of birth and photo of the document holder; - was
        issued by national government agencies, recently received invoice for payment of utilities (not older than 3
        months) or another document which may confirm the residential address of the User.The company may also request
        video identification or other additional information, supported by relevant documents. In certain cases, the
        Company may also request notarized copies of documents from the User.</p>
    <p class="mb-5">Every registered client can have only one account. When registering on the website, the following
        rule applies for: one family, one address, email address, credit/debit card number or IP address. The
        administration of the company reserves the right to request more precise data from the client (passport data,
        residence permit, registration) and to pass a video conference. A registered client cannot be re-registered as a
        new client (under a new name, with a new email address, etc.). In case of confirmation of the fact of
        re-registration (including under a new name), provision of other people's, invalid, fake documents (including
        documents, modified with the help of various programs and graphics editors), the administration reserves the
        right to cancel the bets made from such an account. In case of refusal of undergoing the verification procedure,
        the administration has the right to cancel the bets. The administration also reserves the right to block such an
        account (re- registered) for the duration of the proceedings period (up to 2 months). On the request of a
        client, an individual exception can be made by the ValorCasino administration. </p>
    <p class="mb-5">A registered client cannot be re-registered as a new client (under a new name, with a new email
        address, etc.). In case of confirmation of the fact of re-registration (including under a new name), provision
        of other people's, invalid, fake documents (including documents, modified with the help of various programs and
        graphics editors), the administration reserves the right to cancel the bets made from such an account. In case
        of refusal of undergoing the verification procedure, the administration has the right to cancel the bets. The
        administration also reserves the right to block such an account (re- registered) for the duration of the
        proceedings period (up to 2 months). On the request of a client, an individual exception can be made by the
        ValorCasino administration.</p>
    <p class="mb-5">1 The calculation of profits of the gambler is made within 30 (thirty) calendar days from the date
        of the official publication of the results of the latest event, that can be tracked in the bets history.</p>
    <p class="mb-5">2 After the profit is calculated, the bettor is obliged to check the correctness of the calculated
        payoff, and in case of disagreement on the calculated payoff, notify the betting company about this by
        specifying the number of their account, the date of the bet, the time, the event, the amount of money, the
        selected outcome of the event, the coefficient, as well as the reasons for disagreement with the calculated
        payoff. All claims for calculated payoffs are accepted within 10 (ten) days.</p>
    <p class="mb-5">3 A bet placed by the client on a certain outcome of an event is considered to be won if all
        outcomes specified in such bet are predicted correctly.</p>
    <p class="mb-5">4 The security service of ValorCasino betting company has the right to restrict a withdrawal by any
        of the available methods, if the amount of the Deposit or withdrawal of funds from the gaming account does not
        correspond to the amounts of placed bets (client must make bets on deposit amount on “Sport” with odds not less
        than 1.3, bets in "TOTO", "Casino", "Live-games", "Live-Casino" and "Virtual-sports"). The criterion for
        withdrawal will be the amount of bets made within this Deposit</p>
    <p class="mb-5">Bets are accepted from persons who have attained the age of 18 or the age of majority in their
        jurisdiction (the age must be over 18) who agree with the Rules of accepting bets offered by the bookmaker.Bets
        are not accepted: from persons who have not reached the age of 18 at the time of placing the bet; from persons
        who participate in the events on which bets are made (athletes, coaches, referees, owners or functionaries of
        clubs and other persons who have the ability to influence the outcome of the event), as well as from other
        persons acting on their behalf; from persons representing the interests of other bookmakers; from other persons
        whose participation in the agreement with the bookmaker company is prohibited by applicable law. 3. The bet
        participant bears responsibility for violation of clause 2. of these Rules. In case of violation of these Rules,
        the bookmaker reserves the right to refuse to pay any winnings or to return the deposited amounts, as well as to
        cancel any bets. The betting company does not bear any responsibility as to when it becomes known to it that the
        client belongs to one of the listed categories of persons. This means that the bookmaker has the right to take
        these measures at any time after it becomes known that the client is one of the esignated persons. 4. The
        betting company has the right not to accept bets from clients who do not comply with these Rules. The betting
        company reserves the right to refuse the client to accept any type of bets if the client violates public norms
        of behavior and public order. 5. The betting company reserves the right to refuse to accept a bet to any person
        without giving any reason. 6. All bets calculation is based on the information provided by the processing
        center. 7. The company reserves the right to close the gaming account and cancel all bets placed on this account
        if it has established that: the betting participant at the time of placing bets had information about the result
        of the event; the betting participant had the opportunity to influence the outcome of the event being a direct
        participant in the match (athletes, referees, coaches, etc.) or a person acting on their behalf; bets are made
        by a group of betting participants acting in concert (a syndicate) in order to exceed the limits set by the
        company; one betting participant has several gaming accounts (multiple registration); the betting participant is
        suspected of using special software or technical means to automate the betting process; any dishonest means of
        obtaining information or bypassing the limits and restrictions set by the company were used.8. Customer account
        balance in the situations described above may not be refundable after the completion of the proceedings at the
        discretion of the betting company. In this case, the amount of balance is determined without taking into account
        dishonestly received income. 9. The company reserves the right not to compensate the player's losses on payment
        systems’ commissions when depositing and/or withdrawing funds to the account (from the account) of the
        ValorCasino betting company. The company reserves the right to conduct the process of confirming the owner's
        identity through videoconference and requesting identity documents.10. If the betting company security service
        has doubts about the identity of the bet participant or about the reliability of the information provided
        (address, credit or debit card or other data) they have the right to request any documents from the bet
        participant at the choice of the company, confirming the identity and other data transmitted by the client, as
        well as cancel any payments until all information has been verified. Verification of documents can take up to 24
        hours from the moment the documents are received. If it is proved that the information received is not reliable
        then the company has the right to cancel all rates and suspend all cash settlements for an indefinite period.
        11.The account owner confirms/agrees that all actions performed in the account are performed by him/her
        independently. If actions on the account are performed by third parties the owner is solely responsible for
        access to the account.12. The account owner confirms/agrees that all actions performed in the account and using
        its details are performed by him/her or with his/her permission. Users from countries where sports betting is
        illegal are prohibited from using the bank card of that country to complete a transaction on the site. The owner
        of the bank card is obliged to be aware of the legislation of his/her country in relation to betting activities.
        Participation in gambling by persons under the majority age is not allowed, as well as the use of bank cards of
        these persons for making transactions on the website of the bookmaker's office.13. The company reserves the
        right to update the text of the rules and add new rules at any time. In this case, new rules or a new edition of
        the rules come into force and will be applied immediately after they are published on the site.14. To avoid any
        problems ValorCasino gives you the following guidelines to follow to ensure that you play responsibly: Before
        starting the game set limits for yourself for a certain amount of time and money that you are going to spend.
        Only play with money that you can afford to lose. Do not try to recoup after losing.15. Avoid gambling if you
        are under the influence of alcohol or any other substance</p>
    <p class="mb-5">3. In case of modifications to these Rules, clients are notified about them with the corresponding
        announcements. Bets accepted from the date specified in the announcement are subject to the modified Rules. The
        conditions of bets placed prior to that date remain unchanged.</p>
    <p class="mb-5">4. We encourage gambling as a pleasant leisure activity and believe that gambling can be present in
        your life only if you keep yourself under control and play responsibly.</p>
    <p class="mb-5">1. Under no circumstances shall ValorCasino betting company hold any responsibility for any
        indirect, incidental or accidental losses or damage of the Client (including loss of profits), even if they have
        been notified of the possibility of such losses or damage.</p>
    <p class="mb-5">2. Internet connection malfunction in the moment of receiving confirmation of the bet placed by the
        client is not a basis for bet cancelling.</p>
    <p class="mb-5">3. Any placed bet serves as a confirmation that the client agrees with and accepts the following
        Betting Rules.</p>
    <p class="mb-5">4. Only the results of the events announced by the betting company are the basis for bets
        calculation and defining gains. Claims regarding the results of the events will be considered only in the
        package with the official documents of the relevant sports federations.</p>
    <p class="mb-5">5. If there is a suspicion that a bettor commits the fraudulent actions against the betting company
        (multi-account, bets were made by the third parties, usage of software for betting automation, arbitrage
        betting, if the betting account is not used for betting, abuse of loyalty programs, etc.), the betting company
        reserves the right to prevent such fraudulent actions by:</p>
    <h2>ABOUT THE COMPANY </h2>
    <p class="mb-5">1. The terms and conditions for accepting bets (coefficients, outcome options, available bet types
        combinations, maximum bet limits, etc.) can be changed at any time and are valid for new bets of the client,
        while the conditions of previously placed bets remain unchanged. Before entering into an agreement, the customer
        must find out all the changes in the current line. 2. Bets placed on events, the outcome of which is known at
        the time of the bet, can be calculated with the coefficient. 3. In accordance with these Rules, in case of
        disagreements between the client (the participant of the agreement) and the betting company on issues related to
        the execution and implementation of the agreement concluded between the client (the participant of the
        agreement) and the betting company, including issues on payoffs, events outcome, odds of the winnings, other
        essential conditions of the agreement, as well as on the recognition of the agreement as non-concluded or
        invalid, the parties shall establish a mandatory claim procedure for settlement of disputes (pre-trial
        procedure). 4. As part of the pre-trial dispute settlement procedure, a party that believes that its rights have
        been violated is obliged to submit a corresponding written claim to the other party. If the addressee of the
        claim is a betting company, the claim shall be made at its location (legal address) that is specified in the
        relevant constituent documents of the betting company and confirmed by the relevant extract from the register of
        legal entities. If the addressee of the claim is the client (the participant of the agreement), the claim shall
        be made at their place of residence (or place of stay). All trial may also be made through correspondence by
        e-mail: support@valor.bet 5. The claim shall be submitted within 10 (ten) days from the day when the person was
        informed or should have been informed about the violation of their rights. The claim must be accompanied by
        documents confirming and justifying stated demands. In the absence of valid sufficient demands in the claim, the
        claim shall be returned without further consideration. 6. Valid claim is subject to consideration no longer than
        20 (twenty) days from the date of its receipt by the party.7. If the claim is not considered by the receiving
        party within the specified period, the party that believes its rights have been violated shall has the right to
        refer the matter to a court of law at the location (legal address) of the betting company. 8. The company
        reserves the right to suspend the acceptance of bets and the payment of winnings (including refusal,
        invalidation, payment for these bets is made with the odds "1"): In case of unforeseen errors (obvious typos in
        the proposed list of events, inconsistency of odds in the line and rates); In the event of a change in the
        format of the competition being held relative to the original regulations, etc .; If there is evidence of
        unsportsmanlike wrestling; When using repeated bets on the same outcomes or on dependent outcomes.</p>
    <h2>RULES FOR ACCEPTING BETS AND SETTLING DISPUTES (PRE-TRIAL PROCEDURE) </h2>
    <p class="mb-5">Please enter the full name and surname of the owner of the payment account from which the money will
        be transferred. Do not use other people's personal information to withdraw money.</p>
    <h2>PASSWORD AND ACCOUNT SECURITY</h2>
    <p class="mb-5">ValorCasino company offers one of the types of bonuses - "Promo code". Promo code is an alphanumeric
        code that is provided to the client individually at the discretion of the betting company. The promo code can
        grant the client an access to bonus funds or provide insurance / bet refund.In case of bet calculation with
        promo code with coefficient 1 (push/cancellation). The promo code remains available for use by the customer for
        a second time.Promotional code bets cannot be combined with other special offers, unless it is specified in the
        Rules of the promotional code placement. Multi-accounts do not participate in this promotion. The bonus can be
        awarded only once per one account, address, email address, credit / debit card number or IP address. The company
        reserves the right to withhold any free bets if the security service has concerns regarding the violation of the
        rules, or to find unusual bets chains. Promo code can be used only once by one customer.</p>
    <h2>PROMOTIONS AND BONUSES</h2>
    <p class="mb-5">1 Bonus offer is available for new customers of ValorCasino. Bonus offer is available for the
        following currencies: EUR, USD, RUB, BYN, UAH, KZT, INR, IDR, THB, VND, TRY, PLN, BDT, KHR, KRW, MYR, BND, SGD,
        PKR, UZS, KES, UGX, GHS, TZS, XAF, NGN, CFA, XOF, AZN, IRR, CZK, BRL, PHP, AMD, GEL, RWF, MDL, KGS, TJS, NOK.
    </p>
    <p class="mb-5">10 Only first deposit is entitled for the bonus. Bonus funds and freespins will be credited to the
        bonus balance within 72 hours from the moment of the promotional deposit</p>
    <p class="mb-5">11 Bonus "Sport": in order to successfully convert bonus funds into real ones and withdraw them from
        the game account, it is necessary to fulfill the following conditions within 30 days after making the first
        deposit: put the recieved bonus in the 5-time amount from the bonus account using "accumulator" bets . At least
        3 events in the accumulator must have coefficients of at least 1.40, the maximum number of events in the
        accumulator is unlimited. If a player does not manage to fulfill the conditions of the promotion within the
        specified time period, the bonus balance is canceled.</p>
    <p class="mb-5">12 Bonus "Casino": to successfully convert bonus funds into real ones and withdraw them from a game
        account, you need to multiply the amount of the received bonus x60 in the "Casino" sections of "Live-games" and
        "Virtual Sports", within 72 hours after making the first deposit. Please note that not in all games the bet
        amount is fully taken into account when wagering the bonus.</p>
    <p class="mb-5">14 If a player has funds on both the Real and the Bonus balance, then all bets are made first of all
        from the funds on the Real balance. Real funds are used for bets until the Real balance is 0. The funds from the
        Bonus balance will be used for bets only if the real balance is 0. Please check the list of Games that are
        available for Bonus balance game in Terms&amp;Conditions, section Promotions and Bonuses.</p>
    <p class="mb-5">15 No withdrawals can be made before all the conditions of the offer are met. Bets that do not meet
        the conditions listed in clauses 10 and 11 of these rules are not taken into account when wagering bonus funds.
    </p>
    <p class="mb-5">16 Bets calculated after more than 30 days (sport) and 72 hours (casino) after the activation of the
        bonus offer are not taken into account.</p>
    <p class="mb-5">17 As long as there is at least one open bonus account, the player can withdraw an amount of 0 or
        higher to the total amount of wagered deposits, if at least twice the bonus face value remains on the game
        balance. A successful withdrawal is considered the transition of the withdrawal request to the status
        "Completed". Withdrawal of funds in violation of the terms of this clause of the rules will be regarded as the
        player's refusal from the bonus, in this case the bonus balance will be canceled. This rule is in effect from
        the moment the bonus account is created until the bonus amount appears on the gaming account.</p>
    <p class="mb-5">18 Bonus offer can be used only once. Be careful when choosing a bonus during registration. By
        choosing one of the options (for sports or casinos), you automatically refuse to use the second. You cannot
        change your choice in the future.</p>
    <p class="mb-5">19 By activating the bonus during registration, the client automatically agrees with the terms and
        conditions of this promotion</p>
    <p class="mb-5">20 Ability to refuse participation in the bonus promotion available only at the stage of making the
        first deposit when the bonus offer is activated or if the conditions for wagering are not met.</p>
    <p class="mb-5">21 The opportunity to refuse bonus funds is present only at the registration stage, upon activation
        of the bonus offer or upon non-compliance with the conditions of wagering.</p>
    <p class="mb-5">22 The bonus is available only for one game account per person, family, apartment, computer or IP
        address. If you are suspected of violating the rules through multiple registrations (fake accounts, game
        groups), BC ValorCasino will cancel the bonus. If you register a second account, it will be deleted, and all
        game bonuses and winnings may be canceled.</p>
    <p class="mb-5">23 The company reserves the right to cancel the bonus and/or refuse to provide it to the client
        without stating reasons if during the verification of the game account there are found any violations of game’s
        honesty and / or the use of strategies that, at its discretion, are considered malicious. Withdrawal of bonus
        funds is possible at any time without prior notice to the client, but not after withdrawal and / or wagering of
        this bonus accrual. In controversial situations, the decision of the authorized officers of the Company is
        final.</p>
    <p class="mb-5">24 The company reserves the right to carry out the verification procedure for the owner of the game
        account, as well as to suspend the recieving of bonus funds on the game account for the duration of the
        verification procedure.</p>
    <p class="mb-5">25 In the event that officials of a company suspect a client of cheating, «BC ValorCasino» reserves
        the right to apply individual conditions for wagering the received bonus to this category of customers.</p>
    <p class="mb-5">26 Current Terms and Conditions can be changed and updated at any time.</p>
    <p class="mb-5">3 The size of the standard bonus is 100% of the amount of the deposit. For example, client N made a
        deposit of 100 USD the day after registration. The bonus amount will be 100%, i.e. 100 USD.</p>
    <h2>BONUS ACCOUNTS</h2>
    <p class="mb-5">Wagering requirements - means the total amount of bets you must stake before the Bonus and any
        accrued winnings are transferred into your Cash Balance and can be withdrawn. Wagering coefficient – means the
        coefficient that calculated as the following: amount of bets to be placed/amount of bonus nominated. Games"s
        contribution - means the percentage of bets inside the Game that contribute to wagering requirements. Example
        You have received a bonus of €100 with wagering coefficient - x30.To transfer the Bonus balance into Cash
        balance, you need to place €3000 in bets (100*30). €3 000 is your Wagering Requirement. If you choose the game
        with 100% contribution, then the calculation of Wagering Requirement is the following: (€100*30)*100%= €3 000.
        If you choose the game with 10% contribution, then calculation of Wagering Requirement is the following:
        (€100*30)*10%= €30 000 On https://Valor.Bet the following games" contribution applies: Casino Slots (except
        Video poker) – 100% Poker, Video poker, Roulette, Baccarat, Blackjack, Table games, Lotteries, Scratch cards,
        Bingo, Keno – 0% Live Casino All categories – 0% Live-games / TV-games All categories – 10% Virtual Sport All
        categories – 10% Aviator – 0% </p>
    <h2>GAME’S WAGERING CONTRIBUTION </h2>
    <p class="mb-5">1. The betting company accepts bets based on of the event list line with certain winning odds. 2.
        Reception of repeated bets on one outcome or a combination of outcomes from one player can be limited by the
        decision of the betting company. 3. A bet is considered to be accepted after its’ registration on the server and
        its’ online confirmation. Registered bets are not subject to cancellation or correction.4. Bets are accepted
        only in the amount which does not exceed the client's account current balance. After registering a bet, its
        amount is debited from the account. After calculating the rates, the winning amount is entered into the client's
        account.5. Bets are accepted before the event beginning; The event date, beginning time and comments related
        with them, indicated in the line, are indicative. If, for any reason, the bet is made after the actual beginning
        of the event, the bet is considered invalid. The exception is only bets for live events, i.e. bets during the
        match. Such bets are considered valid until the end of the event.6. LINE and LIVE bets are not able to be edited
        or deleted, except the special cases described in the Rules for Sports. Minimum and maximum bid 1. The minimum
        bet on any event is equal to USD - 0,2 / EUR - 0,2/ RUB – 10/ TRY –1/ KZT - 100 / UAH - 5. 2. The maximum bet is
        fixed by the betting company for each event separately. The maximum rate depends on the sport and event. If the
        express (system) includes several events with different restrictions on the maximum rate, the size of the
        maximum rate is set equal to the minimum value. 3. The maximum win per one bet is 2,000,000 rubles (equivalent
        in currencies). 4. The betting company has the right to limit the maximum rate, odds for separate events, as
        well as limit or increase the maximum rate, the odds to a separate client without any notice or
        explanation.Cancellation policy. 1. In case if the bet is subject to cancellation, then a refund is made in a
        single rate. In accumulators and systems, when canceling the bet for one or several events, the calculation of
        the winnings for these events is not performed. 2. In cases of incorrectly calculated rates, such bets are
        recalculated.</p>
    <h2>RULES FOR BETS ACCEPTING</h2>
    <p class="mb-5">The betting company offers the following types of bets: 1. Single bet Single - this is a bet on a
        separate event outcome. Winning a single bet is equal to the multiplication of the bet amount to the odd
        established for this outcome. 2. Accumulators Accumulator - this is a bet on several independent events outcomes
        . The accumulator win is equal to the multiplication of the bet amount by the coefficients of all outcomes
        included in the accumulator. Losing one of the accumulators outcomes means losing the whole accumulator. 3.
        System System - this is a bet on a full certain-size accumulators combination from a pre selected number of
        events. The maximum number of options in the system is 924. The maximum number of events in the system is 12.
        Bets accepting during the match (live bets) 1. Live bets are accepted on the main and additional outcomes. It’s
        possible to make single live-bets and combine them into one accumulator. 2. A bet is considered to be accepted
        after its registration on the server and then an online confirmation shall be issued. The accepted bet is not
        subject to change. In case of occurrence of the circumstances specified in the section Match results, the date
        and the time of it’s beginning, the procedure for resolving controversial issues 3. Under certain circumstances
        specified in the “Rules for Sports” section, it is possible to calculate a live bet with a coefficient of. 4.
        The betting company is not responsible for inaccuracies in the current results of the matches, for which
        live-bets are accepted. Customers must also use other independent sources of information. 5. Live bets can not
        be edited or deleted.</p>
    <h2>TYPES OF BETS</h2>
    <p class="mb-5">1 It’s allowed to include only one of the dependent outcomes in an accumulator bet. In case two and
        more dependent events are included in one accumulator or system bet, all events with the least odds are excluded
        from this accumulator or system bet. 2 “Team will score a penalty Yes/No” bets are considered to be lost if
        there were no penalty kicks in regular time. 3 “Next goal”, "How The Goal Will Be Scored" bets are considered to
        be lost if the goal the number of which was indicated in the bet slip was not scored. </p>
    <h2>RESTRICTIONS FOR SOME EVENT OUTCOMES INCLUSION</h2>
    <p class="mb-5">1. It’s possible to deposit and withdraw funds from your account in different ways. All methods of
        depositing and withdrawing funds are presented on the "Top Up" page.</p>
    <p class="mb-5">• To transfer money between payment systems;</p>
    <p class="mb-5">• To deposit funds and withdraw funds without placing bets.</p>
    <p class="mb-5">In these cases, the money will be returned back to your account.</p>
    <p class="mb-5">Funds withdrawal is possible only for the requisites of which the deposit has been carried out. When
        depositing in various ways, the withdrawal amount must be proportional to the deposit amount. </p>
    <p class="mb-5">ValorCasino has the right to refuse to withdraw the payment on payment systems by offering bank
        transfer payment instead of this.</p>
    <p class="mb-5">ATTENTION! The administration does not recommend to deposit the account from someone else's
        electronic wallets. The administration has the right to return the funds to the wallet owner accounts without
        any prior notice.</p>
    <p class="mb-5">In special cases, for some gaming accounts of customers the compensation of payment systems
        commissions for depositing and withdrawing funds, that is usually paid by the ValorCasino betting company, might
        be canceled.</p>
    <p class="mb-5">7. 1-Click instant depositing service terms and conditions </p>
    <p class="mb-5">• You agree to pay for all services and/or goods or other additional services ordered by You on the
        Website, as well as all additional costs (if necessary), including, but not limited to, all kinds of taxes,
        duties, etc. You are fully responsible for the timely payment of all payments. The payment services provider
        only guarantees the making of the payment in the amount indicated by the Website and is not responsible for the
        payment by the Website user of the aforementioned additional amounts. After clicking the button "Deposit with 1
        click", you agree with the fact that the payment has been processed and it has been irrevocably executed. By
        clicking the "Deposit with 1 click" button, you agree that you will not be able to refund the payment or request
        its refund. By placing an order on the Website, you confirm and indicate that you do not violate the laws of the
        country of placing the order and making the payment. Additionally, by accepting the conditions of these Rules
        (and/or the Terms and Conditions), you, as the owner of the payment card, confirm that you have te right to use
        the goods and/or services offered on the Website. </p>
    <p class="mb-5">• If you use the services of the Website that offer such specific services as a gaming service, you
        provide legally binding confirmation that you have reached or have already exceeded the legal age, which is
        legally permitted in your jurisdiction in order to use the services provided by the Website. </p>
    <p class="mb-5">2. All fund withdrawal requests are processed 24/7. Withdrawals can take up to 72 hours. Refunds can
        take up to 72 hours.</p>
    <p class="mb-5">• Starting to use the services of the Website, you take legal responsibility for compliance with the
        laws of any country where this service is used, and confirm that the payment service provider does not take any
        responsibility for any illegal or unauthorized violations. By agreeing to use the services of the Website, you
        understand and accept that the processing of any of your payments is carried out by the payment service
        provider, and there is no legal right to return services and/or goods that have already been purchased or there
        are no other payment cancellation options. If you want to refuse to use the service for the next purchase of the
        service and/or goods, you can turn down the service using the Personal Account on the Website</p>
    <p class="mb-5">• The payment service provider is not responsible for the refusal/inability to process data
        associated with your payment card, or for the refusal associated with not receiving the permission from the
        issuing bank to make a payment using your payment card. The payment service provider is not responsible for the
        quality, volume, price of any service and/or goods offered to You or purchased by You on the Website using your
        payment card. Paying for any services and/or products of the Website, you are first of all obliged to comply
        with the rules for using the Website. Please note that only you, as the owner of the payment card, are
        responsible for the timely payment of any service and/or goods ordered by you through the Website and for all
        additional costs/commissions related to this payment. The payment service provider is only a payment executor in
        the amount indicated by the Website and is not responsible for any pricing, total prices and/or total amounts.
    </p>
    <p class="mb-5">• In the event of a situation related to your disagreement with the above conditions and/or other
        reasons, we ask you to timely refuse to make the payment and, if necessary, contact the administrator/support of
        the Website directly. </p>
    <p class="mb-5">3. Making deposit you confirm that you are entitled to use the Services, and Website services,
        offered via the current Website. In case you use The Services through the Website, offering specific services.
    </p>
    <p class="mb-5">4. If you want to request refund you should contact the support team. We can make refund only to
        account you have used to refill your account.Identification procedure may be required. In this case you can be
        asked to provide Passport or ID card copy. Also if you have made deposit using a bank card you has to provide
        photo of card (both sides). The first six digits and the last four digits of the card number, cardholder name
        should be visible, the CVV2 code must be painted out. </p>
    <p class="mb-5">We reserve the right to charge a fee amounting to our own costs for withdrawal of funds that have
        not been used to make bets or play games.</p>
    <p class="mb-5">5. The ValorCasino security service reserve the right to:</p>
    <p class="mb-5">• block the funds withdrawal with any of the available methods, in case if the bets amount is less
        than the amount of deposits from the moment of registration. Also bets with the coefficient of 1.3 or higher are
        taken into account.</p>
    <p class="mb-5">• refuse to withdraw funds if the betting account is not used for gaming purposes; It is necessary
        to verify your gaming account before withdrawing funds. You need to fill the profile correctly for verification,
        provide copies and photographs of identity documents (including the passport), as well as answer the Support
        Service questions . </p>
    <p class="mb-5">6. The ValorCasino security service does not recommend:</p>
    <p class="mb-5">List of banned jurisdictions: North Korea, Myanmar, Iran</p>
    <h2>FUNDS DEPOSIT AND WITHDRAWAL</h2>
</div>
        `
    },

}

const policyContentPr = {
    'user-agreement': {
        title: 'Acordo do Usuário',
        subtitle: 'Baixar Política',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
            <p class="mb-5">www.Valor.Bet está comprometido em proteger suas informações pessoais. Esta Política de Privacidade informa quais dados coletamos quando você utiliza nossos serviços, por que os coletamos e como utilizamos essas informações.</p>
            <p class="mb-5">Observe que esta Política de Privacidade é um acordo entre você e www.Valor.Bet (“Nós”, “Nosso” ou “Nossa”, conforme o caso). Esta Política de Privacidade é parte integrante dos Termos e Condições de www.Valor.Bet.</p>
            <p class="mb-5">O site www.Valor.Bet (“Cassino”, “Site”, “Empresa”, “Nós”, “Nosso”).</p>
            <p class="mb-5">Podemos fazer alterações periódicas nesta Política de Privacidade e notificaremos você sobre essas alterações publicando os termos revisados em nossas plataformas. Recomendamos revisar esta Política de Privacidade regularmente.</p>

            <h2 class="text-2xl font-bold leading-8">1. PRIVACIDADE</h2>
            <p class="mb-5">Consideramos informações pessoais aquelas que podem ser usadas para identificar um indivíduo, incluindo, mas não se limitando a: nome completo, data de nascimento, endereço residencial ou outro endereço físico, e-mail, número de telefone ou outras informações relevantes (“Informações Pessoais”). Podemos solicitar Informações Pessoais quando você usa nosso site, cria uma conta ou utiliza nossos serviços. As Informações Pessoais coletadas podem incluir: dados de contato (incluindo número de telefone), informações de envio e cobrança, histórico de transações, preferências de uso do site e comentários sobre nossos serviços. Essas informações são armazenadas em servidores localizados na Alemanha e em outros locais conforme necessário. Quando você interage com nossos serviços, nossos servidores mantêm um registro de atividades que coleta informações administrativas e de tráfego, incluindo: endereço IP, hora e data de acesso, páginas visitadas, idioma utilizado, relatórios de erro e tipo de navegador. Essas informações são essenciais para garantir a qualidade dos serviços. Não coletamos Informações Pessoais sem o seu conhecimento.</p>

            <h2 class="text-2xl font-bold leading-8">2. INFORMAÇÕES COLETADAS</h2>
            <p class="mb-5">Podemos coletar automaticamente certos dados conforme mencionado acima e receber suas Informações Pessoais quando você as fornece por meio dos serviços ou outras comunicações. Também podemos receber Informações Pessoais de provedores de serviços online, fornecedores ou listas de clientes adquiridas legalmente. Além disso, podemos contratar prestadores de serviços terceirizados para suporte técnico, processamento de transações e manutenção da sua conta. Teremos acesso a qualquer informação que você fornecer a esses prestadores e utilizaremos conforme descrito nesta Política. Essas informações serão divulgadas a terceiros apenas conforme esta Política de Privacidade. Tomamos medidas para garantir que nossos contratos com terceiros protejam sua privacidade.</p>

            <h2 class="text-2xl font-bold leading-8">3. COLETA E PROCESSAMENTO DE DADOS</h2>
            <p class="mb-5">Usamos as Informações Pessoais coletadas para fornecer nossos serviços, oferecer suporte ao cliente, realizar verificações de segurança e identidade, processar transações online, participar de promoções de terceiros e cumprir obrigações comerciais. Podemos compartilhar suas Informações Pessoais com parceiros cuidadosamente selecionados (incluindo terceiros com acordos de compartilhamento de dados).</p>
            <p class="mb-5">Também podemos usar suas Informações Pessoais para: (1) enviar ofertas promocionais e informações sobre nossos produtos e serviços; e (2) enviar ofertas e informações sobre produtos e serviços de nossos parceiros, para ampliar nossa gama de produtos e melhorar o atendimento. De tempos em tempos, podemos solicitar informações por meio de pesquisas ou concursos. A participação é voluntária, e você pode escolher se deseja fornecer ou não tais informações. Os dados solicitados podem incluir nome, endereço e número de telefone, bem como informações demográficas (CEP, idade etc.). Ao aceitar prêmios, você autoriza o uso do seu nome para fins publicitários sem compensação adicional, exceto onde proibido por lei. A menos que opte por não receber comunicações promocionais, poderemos utilizar suas informações (incluindo e-mail e telefone) para informá-lo sobre produtos e promoções, inclusive de parceiros e outros jogos (pôquer, cassino, apostas, backgammon).</p>

            <h2 class="text-2xl font-bold leading-8">4. USO DAS INFORMAÇÕES</h2>
            <p class="mb-5">Podemos divulgar suas Informações Pessoais se exigido por lei ou se acreditarmos, de boa fé, que tal ação é necessária para: (1) cumprir qualquer processo legal; (2) proteger nossos direitos ou propriedade; ou (3) proteger a segurança dos usuários ou do público. Se determinarmos que você trapaceou ou tentou nos enganar, reservamo-nos o direito de compartilhar essas informações (junto com sua identidade) com outros cassinos online, bancos, operadoras de cartão de crédito e autoridades competentes.</p>

            <h2 class="text-2xl font-bold leading-8">5. CANCELAMENTO E ACESSO</h2>
            <p class="mb-5">Você pode optar por não receber comunicações promocionais ajustando as configurações da sua conta, clicando na opção fornecida em nossos e-mails ou entrando em contato com o Suporte ao Cliente.</p>
            <p class="mb-5">Você também pode entrar em contato conosco para: (1) confirmar a exatidão das suas Informações Pessoais; (2) atualizá-las; e/ou (3) apresentar uma reclamação sobre o uso de seus dados. Atualizaremos ou restringiremos o uso futuro de suas informações de acordo com sua solicitação, salvo exigência legal de retenção.</p>

            <h2 class="text-2xl font-bold leading-8">6. COOKIES E ACESSO</h2>
            <p class="mb-5">Quando você acessa nossos serviços, podemos armazenar cookies — pequenos arquivos de texto que registram suas preferências. Também utilizamos “flash cookies” (Objetos Compartilhados Locais), que funcionam de forma semelhante. Esses dados nos ajudam a lembrar suas preferências, monitorar o tráfego do site e melhorar a experiência do usuário. Utilizamos cookies de sessão, persistentes e analíticos para otimizar a navegação. Você pode aceitar ou rejeitar cookies através das configurações do seu navegador.</p>

            <h2 class="text-2xl font-bold leading-8">7. PROCESSADORES DE PAGAMENTO</h2>
            <p class="mb-5">Para jogar com dinheiro real, você deve enviar e receber fundos por meio de nossos sistemas. Podemos utilizar processadores de pagamento de terceiros. Ao aceitar esta Política, você consente com o processamento e transferência internacional de suas informações conforme necessário. Garantimos que nossos parceiros mantenham a segurança e confidencialidade dos seus dados.</p>

            <h2 class="text-2xl font-bold leading-8">8. REVISÕES DE SEGURANÇA</h2>
            <p class="mb-5">Reservamo-nos o direito de realizar verificações de segurança a qualquer momento para validar os dados de registro e o uso dos serviços. Tais verificações podem incluir relatórios de crédito ou consultas a bancos de dados de terceiros. Você concorda em fornecer quaisquer informações ou documentos solicitados.</p>

            <h2 class="text-2xl font-bold leading-8">9. SEGURANÇA</h2>
            <p class="mb-5">Todas as Informações Pessoais são armazenadas em bancos de dados criptografados e protegidos por senha, dentro de uma rede segura com firewall e criptografia SSL de 128 bits. Também garantimos que afiliados e fornecedores usem medidas de segurança adequadas.</p>

            <h2 class="text-2xl font-bold leading-8">10. PROTEÇÃO DE MENORES</h2>
            <p class="mb-5">Nossos serviços não se destinam a menores de 18 anos (ou idade legal aplicável). Qualquer pessoa que nos forneça dados confirma ter 18 anos ou mais. Se soubermos que um menor forneceu informações, elas serão excluídas imediatamente.</p>

            <h2 class="text-2xl font-bold leading-8">11. TRANSFERÊNCIAS INTERNACIONAIS</h2>
            <p class="mb-5">As informações coletadas podem ser armazenadas ou processadas em qualquer país onde operamos. Ao usar nossos serviços, você consente com essa transferência internacional. Garantimos que todos os parceiros cumpram nossos padrões de privacidade.</p>

            <h2 class="text-2xl font-bold leading-8">12. TERCEIROS</h2>
            <p class="mb-5">Não podemos garantir a proteção de informações fornecidas a sites de terceiros vinculados aos nossos. Esses sites são independentes e regidos por suas próprias políticas de privacidade.</p>

            <h2 class="text-2xl font-bold leading-8">13. ISENÇÃO DE RESPONSABILIDADE</h2>
            <p class="mb-5">Nossos serviços são fornecidos “NO ESTADO EM QUE SE ENCONTRAM” e “CONFORME DISPONIBILIDADE”. Não nos responsabilizamos por eventos fora de nosso controle. Não garantimos operação livre de erros e não somos responsáveis por danos indiretos decorrentes do uso ou divulgação de informações pessoais.</p>

            <h2 class="text-2xl font-bold leading-8">14. CONSENTIMENTO À POLÍTICA DE PRIVACIDADE</h2>
            <p class="mb-5">O uso de nossos serviços implica aceitação desta Política. Esta é a versão completa e exclusiva da nossa Política de Privacidade e substitui quaisquer versões anteriores. O uso contínuo após alterações implica aceitação das mesmas. De acordo com o Artigo 77 do GDPR, você tem o direito de apresentar reclamação junto à autoridade supervisora do seu país de residência ou local de trabalho.</p>

            <h2 class="text-2xl font-bold leading-8">15. OUTROS SITES</h2>
            <p class="mb-5">Nosso site pode conter links para outros sites fora do nosso controle. Esses sites podem coletar dados de acordo com suas próprias políticas de privacidade. Não somos responsáveis por suas práticas ou conteúdo.</p>
            </div>
        `
    },
    'responsible-gambling': {
        title: 'Jogo Responsável',
        subtitle: 'Jogue com Segurança',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">Última atualização: 14.12.2022</p>
                <p class="mb-5">Por favor, leia estas informações com atenção para o seu próprio benefício.</p>
                <p class="mb-5">www.Valor.Bet é operado por</p>

                <h2 class="text-2xl font-bold leading-8">Jogo Responsável</h2>

                <ul class="list-disc list-inside space-y-3 mb-5">
                    <li class="text-gray-800 leading-relaxed">Conta significa uma conta única criada para que você acesse nosso Serviço ou partes dele.</li>
                    <li class="text-gray-800 leading-relaxed">Empresa (referida como "a Empresa", "Nós" ou "Nosso" neste Acordo) refere-se à Curacao Co.</li>
                    <li class="text-gray-800 leading-relaxed">Serviço refere-se ao site.</li>
                    <li class="text-gray-800 leading-relaxed">Site refere-se a www.Valor.Bet.</li>
                    <li class="text-gray-800 leading-relaxed">Você significa o indivíduo que acessa ou utiliza o Serviço, ou a empresa ou outra entidade legal em nome da qual tal indivíduo acessa ou utiliza o Serviço, conforme aplicável.</li>
                </ul>

                <h3 class="font-bold">Interpretação</h3>
                <h3 class="font-bold">Definições</h3>
                <p class="mb-5">As palavras com iniciais maiúsculas têm significados definidos nas seguintes condições.</p>
                <p class="mb-5">As definições seguintes terão o mesmo significado, quer apareçam no singular ou no plural.</p>

                <h2 class="text-2xl font-bold leading-8">Interpretação e Definições</h2>

                <ul class="list-disc list-inside space-y-3 mb-5">
                    <li class="text-gray-800 leading-relaxed">Defina um limite de depósito: Antes de começar a jogar, pense quanto pode apostar com base na sua situação financeira. Jogue apenas com valores destinados à diversão e entretenimento.</li>
                    <li class="text-gray-800 leading-relaxed">Não tente recuperar perdas a todo custo: Evite correr riscos excessivos para recuperar o que perdeu anteriormente. Jogue por diversão, não para ganhar dinheiro.</li>
                    <li class="text-gray-800 leading-relaxed">Defina um limite de tempo</li>
                    <li class="text-gray-800 leading-relaxed">Defina um limite de tempo e não o ultrapasse. Lembre-se de que o jogo deve ser equilibrado com outras atividades e não deve ser o seu único passatempo.</li>
                    <li class="text-gray-800 leading-relaxed">Jogue com sabedoria: É mais prudente não jogar quando estiver muito estressado, deprimido ou sob pressão. Também evite jogar sob o efeito de medicamentos, drogas ou álcool.</li>
                    <li class="text-gray-800 leading-relaxed">Faça pausas:</li>
                    <li class="text-gray-800 leading-relaxed">Faça pausas quando perceber que está cansado ou que não consegue mais se concentrar.</li>
                    <li class="text-gray-800 leading-relaxed">Apenas uma conta:</li>
                    <li class="text-gray-800 leading-relaxed">Para facilitar o controle de quanto tempo e dinheiro você gasta jogando, recomendamos fortemente não criar mais de uma conta por pessoa.</li>
                </ul>

                <h3 class="font-bold">Jogo Responsável</h3>
                <h3 class="font-bold">Informação e Contato</h3>
                <h3 class="font-bold">Proteção de Menores</h3>
                <h3 class="font-bold">Autoexclusão</h3>

                <p class="mb-5">Para a maioria dos nossos usuários, o jogo é entretenimento, diversão e emoção. No entanto, também sabemos que para alguns usuários o jogo pode ter efeitos negativos. Na ciência médica, o jogo patológico é reconhecido há muitos anos como uma doença grave.</p>

                <p class="mb-5"><a href="https://www.begambleaware.org/safer-gambling/">Jogo Seguro</a></p>

                <p class="mb-5">Dicas úteis para jogar de forma responsável em www.Valor.Bet</p>

                <p class="mb-5">Recomendamos que considere as seguintes dicas antes de jogar, para garantir que o jogo permaneça divertido e sem efeitos negativos:</p>

                <p class="mb-5">Para usar nosso serviço, você deve ter mais de 18 anos. Para evitar abusos, mantenha seus dados de login seguros e fora do alcance de menores ao seu redor.</p>

                <p class="mb-5">Recomendamos principalmente o uso de um programa de filtragem para impedir que menores, especialmente crianças, acessem conteúdos inadequados na internet.</p>

                <p class="mb-5">Para os pais, recomendamos uma lista de filtros de internet que ajudam a impedir que seus filhos acessem conteúdos não apropriados:</p>

                <p class="mb-5"><a href="https://famisafe.wondershare.com/internet-filter/best-internet-filters.html">Melhores Filtros de Internet</a></p>

                <p class="mb-5">Se você foi diagnosticado com vício em jogos ou deseja se afastar do jogo por qualquer motivo, queremos ajudá-lo a se manter afastado de tudo o que possa prejudicá-lo. A “autoexclusão” significa excluir-se voluntariamente de todos os serviços de jogo. Essa exclusão não pode ser revertida durante o período definido. Se desejar se autoexcluir, envie uma mensagem ao nosso suporte e informe um período entre 6 meses e 5 anos. Nossa equipe explicará todas as próximas etapas e o que será necessário de sua parte.</p>

                <p class="mb-5">• E-mail: support@valor.bet</p>

                <p class="mb-5">Desde o nosso primeiro dia, pensamos nesse problema e fizemos todo o possível para ajudar. Sob o termo "Jogo Responsável", entendemos um conjunto de medidas com as quais um provedor de jogos pode ajudar a reduzir os efeitos negativos. Caso eles já existam, também tomamos medidas ativas para combatê-los.</p>

                <p class="mb-5">Observe que a autoexclusão é permanente durante o período determinado e não pode ser revertida, para sua própria proteção.</p>

                <p class="mb-5">Durante a autoexclusão, você não tem permissão para criar uma nova conta, e qualquer tentativa de fazê-lo será uma violação dos nossos Termos de Serviço e poderá resultar na proibição permanente da sua conta original.</p>

                <p class="mb-5">A ferramenta mais importante contra os efeitos negativos do jogo é o conhecimento e a educação sobre os riscos, ajudando nossos usuários a manter o autocontrole e a evitar consequências negativas.</p>

                <p class="mb-5">Nossa equipe de suporte está disponível para ajudá-lo por e-mail a qualquer momento, sem custo adicional:</p>

                <p class="mb-5">• E-mail: support@valor.bet</p>

                <p class="mb-5">Nossa equipe de suporte nunca compartilhará suas informações pessoais com terceiros sem o seu consentimento.</p>

                <p class="mb-5">Além disso, você pode fazer um teste de autoavaliação se estiver enfrentando problemas com o jogo em:</p>

                <p class="mb-5"><a href="https://www.begambleaware.org/gambling-problems/do-i-have-a-gambling-problem/">Tenho um Problema com o Jogo?</a></p>

                <p class="mb-5">Você também pode encontrar mais informações sobre vícios em jogos em:</p>

                <h2 class="text-2xl font-bold leading-8">Jogo Responsável e Autoexclusão</h2>
            </div>
        `
    },
    'responsible-gaming': {
        title: 'Responsible Gaming',
        subtitle: 'Play Safely',
        content: `
            <div class="politics-content__wrapp">

                <!-- Previous sections omitted for brevity -->

                <div data-testid="politics-content-block" class="politics-content__block">
                    <h2 class="text-2xl font-bold leading-8">Tips for Controlling Gambling</h2>
                    <p class="mb-5">If you want to control your gambling habits, we recommend following these tips:</p>

                    <ul class="list-disc list-inside space-y-3 mb-5">
                        <li class="text-gray-800 leading-relaxed">Do not play when you are under the influence of alcohol or feeling depressed.</li>
                        <li class="text-gray-800 leading-relaxed">Before starting to play, decide how much money and time you are willing to spend — and do not exceed those limits.</li>
                        <li class="text-gray-800 leading-relaxed">Never borrow money to gamble.</li>
                        <li class="text-gray-800 leading-relaxed">Keep track of the time you spend playing.</li>
                        <li class="text-gray-800 leading-relaxed">Do not consider gambling as a way to solve financial or personal problems.</li>
                    </ul>

                    <p class="mb-5">We also recommend periodically taking breaks from gambling. Taking time away from gaming activities helps you better assess your relationship with gambling and stay in control.</p>
                </div>

                <div data-testid="politics-content-block" class="politics-content__block">
                    <h2 class="text-2xl font-bold leading-8">Self-Exclusion from Gambling</h2>
                    <p class="mb-5">If you realize that gambling is negatively affecting your life, you can make use of our self-exclusion program. This program allows you to restrict your access to your account for a specific period or indefinitely.</p>

                    <p class="mb-5">To activate self-exclusion, please contact our support team via email or live chat, specifying the duration of the restriction (temporary or permanent). Once self-exclusion is activated, access to your account will be blocked, and you will not be able to place bets or deposit funds.</p>

                    <p class="mb-5">Please remember that self-exclusion is a serious decision. During this period, we strongly recommend seeking psychological support or professional assistance to help you manage your gambling behavior and emotional well-being.</p>
                </div>

                <div data-testid="politics-content-block" class="politics-content__block">
                    <h2 class="text-2xl font-bold leading-8">Find More Online Support</h2>
                    <p class="mb-5">If you feel that you are unable to control your gambling or that it has already affected your personal or financial life, we encourage you to seek help from specialized organizations. Below are some of the most reputable international organizations providing assistance to those struggling with gambling addiction:</p>

                    <ul class="list-disc list-inside space-y-3 mb-5">
                        <li class="text-gray-800 leading-relaxed"><strong>GamCare</strong> — <a href="https://www.gamcare.org.uk" target="_blank" class="text-blue-600 hover:underline">www.gamcare.org.uk</a></li>
                        <li class="text-gray-800 leading-relaxed"><strong>Gambling Therapy</strong> — <a href="https://www.gamblingtherapy.org" target="_blank" class="text-blue-600 hover:underline">www.gamblingtherapy.org</a></li>
                        <li class="text-gray-800 leading-relaxed"><strong>Gamblers Anonymous</strong> — <a href="https://www.gamblersanonymous.org" target="_blank" class="text-blue-600 hover:underline">www.gamblersanonymous.org</a></li>
                    </ul>

                    <p class="mb-5">These organizations provide free, confidential assistance and counseling to people facing gambling problems, as well as support for their families and friends.</p>
                    <p class="mb-5">Remember: gambling should always remain entertainment, not a problem. Play responsibly and stay in control.</p>
                </div>

            </div>
        `
    },
    'risk-disclosure': {
        title: 'Divulgação de Riscos',
        subtitle: 'Informações Importantes',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">Você entende que, ao participar dos jogos, corre o risco de perder o dinheiro depositado em sua conta ValorBet.</p>
                <p class="mb-5">Em algumas jurisdições, o jogo online pode ser ilegal. Você entende e concorda que a ValorBet não pode fornecer aconselhamento jurídico nem garantias sobre a legalidade do uso dos serviços do site.</p>
                <p class="mb-5">A Empresa não declara que os serviços do Site estejam em conformidade com os requisitos legais da sua jurisdição. Você utiliza os serviços oferecidos pela ValorBet por sua própria escolha e responsabilidade, assumindo o risco e decidindo se o uso dos serviços do site é legal de acordo com as leis da sua jurisdição. Você acessa o site e participa dos jogos por sua conta e risco.</p>
                <p class="mb-5">Os sites e os jogos são disponibilizados a você sem qualquer garantia expressa ou implícita.</p>
            </div>
        `
    },
    'deposits-withdrawals': {
        title: 'Depósitos e Levantamentos',
        subtitle: 'Informações de Pagamento',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">Você pode depositar e sacar fundos de sua conta de várias maneiras. Todos os métodos de depósito e retirada estão disponíveis na página de recarga. Todos os pedidos de retirada são processados 24 horas por dia.</p>
                <p class="mb-5">O serviço de segurança do cassino online ValorBet tem o direito de:</p>
                <ol>
                    <li class="text-gray-800 leading-relaxed">Recusar a retirada de fundos por qualquer um dos métodos disponíveis se os valores a serem depositados ou retirados não corresponderem aos valores das apostas realizadas (para o valor depositado, devem ser feitas apostas com odds de pelo menos 1,1; múltiplas apostas em jogos com perda mínima de saldo, como apostar em eventos opostos em roleta, bacará, dados ou craps).</li>
                    <li class="text-gray-800 leading-relaxed">Recusar a retirada de fundos se a conta de jogo não for usada para fins de jogo e exigir verificação antes de permitir retiradas.</li>
                </ol>
                <p class="mb-5">O serviço de segurança da ValorBet não recomenda:</p>
                <ul class="list-disc list-inside space-y-3 mb-5">
                    <li class="text-gray-800 leading-relaxed">transferir dinheiro entre sistemas de pagamento;</li>
                    <li class="text-gray-800 leading-relaxed">depositar e sacar fundos sem realizar apostas.</li>
                </ul>
                <p class="mb-5">Nesses casos, o dinheiro será devolvido à sua conta.</p>
                <p class="mb-5">A retirada só é possível para os mesmos dados utilizados no depósito. Se a conta foi recarregada de várias formas, a retirada deve ser proporcional aos valores depositados.</p>
                <p class="mb-5">A ValorBet tem o direito de recusar o pagamento para sistemas de pagamento ou em dinheiro, oferecendo em vez disso uma transferência bancária.</p>
                <p class="mb-5"><b>ATENÇÃO!</b> A administração não recomenda depositar ou sacar fundos através de carteiras eletrônicas que não pertençam ao titular da conta. O serviço de segurança da empresa pode considerar essas operações fraudulentas e bloquear a conta sem aviso prévio. A administração pode recusar retiradas para dados que não pertençam ao titular da conta.</p>
                <p class="mb-5">Em casos especiais, para algumas contas, a compensação das taxas de sistema de pagamento, geralmente coberta pela ValorBet, pode ser cancelada.</p>
                <p class="mb-5">Se o usuário não cumprir as regras da Empresa (violar os Termos e Condições, não fazer uma aposta antes da retirada, etc.), a Empresa reserva-se o direito de recusar a retirada.</p>
                <p class="mb-5">Para contas na moeda "bitcoin", não é cobrada nenhuma comissão por depósitos ou retiradas através do sistema Bitcoin.</p>
            </div>
        `
    },
    'cancellation-policy': {
        title: 'Política de Cancelamento',
        subtitle: 'Termos de Cancelamento',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">Uma vez que a aposta tenha sido confirmada, seja online ou por telefone, ela será considerada final e não poderá ser modificada ou cancelada.</p>
                <p class="mb-5">Você tem a opção de apostar no lado oposto para reduzir as perdas, mas a aposta original não pode ser totalmente removida.</p>
                <p class="mb-5">Todos os pagamentos das apostas são calculados com base nas probabilidades vigentes no momento em que a aposta foi realizada. Quaisquer alterações posteriores nas odds não afetarão as apostas pendentes. Para evitar erros, recomendamos fortemente que verifique cuidadosamente todas as apostas nos seus bilhetes antes de confirmá-las online, e que ouça atentamente as respostas dos agentes ao fazer apostas por telefone.</p>
            </div>
        `
    },
    'refund-policy': {
        title: 'Política de Reembolso',
        subtitle: 'Informações de Reembolso',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">O reembolso não pode ser realizado uma vez que os fundos depositados (incluindo bônus) tenham sido utilizados no processo de jogo.</p>
                <p class="mb-5">Um pedido de reembolso só será considerado se for feito dentro das primeiras vinte e quatro (24) horas da transação alegada, ou dentro de trinta (30) dias caso o jogador alegue que outra pessoa (ou um menor) acessou sua conta de jogador.</p>
                <p class="mb-5">Reservamo-nos o direito de reter qualquer reembolso ou reversão de transação até que a identidade do titular da conta de jogador seja devidamente verificada para nossa satisfação. Você concorda em fornecer, mediante solicitação, uma identificação notarial ou qualquer outra identificação certificada de acordo com as leis aplicáveis da jurisdição do jogador. Caso essa identificação notarial ou certificada não seja fornecida dentro de cinco (5) dias após nossa solicitação, o reembolso ou reversão não será processado, sua conta será encerrada e todos os fundos nela serão perdidos. Essa decisão será final, vinculativa e inapelável.</p>
                <p class="mb-5">O jogador deve jogar de forma justa em todos os jogos e não deve, de nenhuma maneira, influenciar o resultado desses jogos. Isso inclui o uso de ferramentas computacionais, equações matemáticas, sistemas de apostas, etc.</p>
            </div>
        `
    },
    'privacy-policy': {
        title: 'Política de Privacidade',
        subtitle: 'Proteção de Dados e Confidencialidade',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">

            <h2 class="text-2xl font-bold leading-8 mb-4">1. DISPOSIÇÕES GERAIS</h2>
            <p class="mb-5">Esta Política de Privacidade define como a ValorBet (doravante denominada “Empresa”) coleta, utiliza, processa e protege as informações fornecidas pelos usuários do site. A Empresa respeita a privacidade de cada cliente e garante que todos os dados pessoais sejam tratados de forma segura, transparente e em conformidade com as leis de proteção de dados aplicáveis.</p>

            <h2 class="text-2xl font-bold leading-8 mb-4">2. INFORMAÇÕES QUE COLETAMOS</h2>
            <p class="mb-5">A Empresa pode coletar as seguintes categorias de informações dos usuários:</p>
            <ul class="list-disc list-inside space-y-3 mb-5">
                <li>Informações pessoais fornecidas durante o registro, incluindo nome, sobrenome, data de nascimento e informações de contato.</li>
                <li>Detalhes de pagamento usados para depósitos e saques.</li>
                <li>Dados técnicos, como endereço IP, tipo de navegador, sistema operacional e identificadores de dispositivo.</li>
                <li>Atividade de jogo, transações e interação com o site e serviços.</li>
                <li>Histórico de comunicação entre o usuário e o serviço de suporte da Empresa.</li>
            </ul>

            <h2 class="text-2xl font-bold leading-8 mb-4">3. FINALIDADE DA COLETA DE DADOS</h2>
            <p class="mb-5">Todos os dados coletados são utilizados exclusivamente para fins legítimos, incluindo, mas não se limitando a:</p>
            <ul class="list-disc list-inside space-y-3 mb-5">
                <li>Fornecer e manter os serviços oferecidos pelo site.</li>
                <li>Processar pagamentos, prevenir fraudes e garantir conformidade com as normas de combate à lavagem de dinheiro.</li>
                <li>Verificar a identidade e a idade dos usuários.</li>
                <li>Melhorar a qualidade do serviço e personalizar a experiência do usuário.</li>
                <li>Enviar notificações importantes e materiais promocionais (se o usuário tiver consentido).</li>
            </ul>

            <h2 class="text-2xl font-bold leading-8 mb-4">4. ARMAZENAMENTO E SEGURANÇA DOS DADOS</h2>
            <p class="mb-5">A Empresa utiliza medidas técnicas e organizacionais avançadas para proteger os dados dos usuários contra acesso não autorizado, alteração, divulgação ou destruição. Todos os dados pessoais são armazenados em ambientes seguros com acesso restrito.</p>
            <p class="mb-5">Implementamos criptografia de dados, firewalls e protocolos de autenticação em múltiplas camadas para garantir a integridade e a confidencialidade das informações.</p>

            <h2 class="text-2xl font-bold leading-8 mb-4">5. COMPARTILHAMENTO DE DADOS</h2>
            <p class="mb-5">Os dados dos usuários podem ser compartilhados apenas com terceiros confiáveis sob estritos acordos de confidencialidade, incluindo:</p>
            <ul class="list-disc list-inside space-y-3 mb-5">
                <li>Provedores de serviços de pagamento para processar transações financeiras.</li>
                <li>Parceiros de verificação de identidade e autoridades regulatórias, se exigido por lei.</li>
                <li>Agências de marketing (somente com consentimento prévio do usuário).</li>
            </ul>
            <p class="mb-5">A Empresa garante que todos os parceiros terceirizados cumpram as normas de proteção de dados aplicáveis.</p>

            <h2 class="text-2xl font-bold leading-8 mb-4">6. DIREITOS DO USUÁRIO</h2>
            <p class="mb-5">De acordo com as leis de privacidade aplicáveis, os usuários têm os seguintes direitos:</p>
            <ul class="list-disc list-inside space-y-3 mb-5">
                <li>Direito de acessar e obter uma cópia de seus dados pessoais.</li>
                <li>Direito de corrigir ou atualizar informações incorretas ou incompletas.</li>
                <li>Direito de solicitar a exclusão (“direito ao esquecimento”) de seus dados pessoais, sujeito a limitações legais.</li>
                <li>Direito de restringir ou se opor a determinadas atividades de processamento de dados.</li>
                <li>Direito de retirar o consentimento para comunicações de marketing a qualquer momento.</li>
            </ul>

            <h2 class="text-2xl font-bold leading-8 mb-4">7. POLÍTICA DE COOKIES</h2>
            <p class="mb-5">O site utiliza cookies para aprimorar a experiência do usuário e analisar o tráfego do site. Cookies são pequenos arquivos de texto armazenados no seu dispositivo que ajudam a lembrar preferências e melhorar o desempenho do site.</p>
            <p class="mb-5">Você pode desativar os cookies nas configurações do seu navegador; no entanto, isso pode afetar certas funcionalidades do site.</p>

            <h2 class="text-2xl font-bold leading-8 mb-4">8. PERÍODO DE RETENÇÃO</h2>
            <p class="mb-5">Os dados pessoais são armazenados pelo tempo necessário para cumprir as finalidades descritas nesta Política ou conforme exigido pela lei aplicável. Após o término do período de retenção, os dados serão excluídos ou anonimizados de forma segura.</p>

            <h2 class="text-2xl font-bold leading-8 mb-4">9. TRANSFERÊNCIAS INTERNACIONAIS</h2>
            <p class="mb-5">Em alguns casos, os dados dos usuários podem ser transferidos para servidores ou parceiros localizados em outros países. A Empresa garante que essas transferências estejam em conformidade com os requisitos internacionais de proteção de dados, mantendo níveis equivalentes de segurança e confidencialidade.</p>

            <h2 class="text-2xl font-bold leading-8 mb-4">10. MENORES DE IDADE</h2>
            <p class="mb-5">A Empresa não coleta nem processa intencionalmente informações de pessoas menores de 18 anos. Se tais informações forem descobertas, elas serão imediatamente excluídas e a conta em questão será encerrada.</p>

            <h2 class="text-2xl font-bold leading-8 mb-4">11. ALTERAÇÕES A ESTA POLÍTICA</h2>
            <p class="mb-5">A Empresa reserva-se o direito de atualizar ou alterar esta Política de Privacidade a qualquer momento. Os usuários serão notificados sobre alterações significativas por meio do site ou por e-mail. O uso contínuo do site após tais alterações constitui aceitação dos termos revisados.</p>

            <h2 class="text-2xl font-bold leading-8 mb-4">12. INFORMAÇÕES DE CONTATO</h2>
            <p class="mb-5">Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade ou sobre como tratamos seus dados, entre em contato conosco através do serviço de suporte disponível no site da ValorBet.</p>

            <p class="mt-8"><b>Data de vigência:</b> Esta Política de Privacidade entra em vigor na data de sua publicação no site.</p>
            </div>
        `
    },
    'about-us': {
        title: 'Sobre nosotros',
        subtitle: 'Nuestra historia',
        content: `
            <div class="politics-content__block">
                <p class="mb-5">ValorBet é um cassino online com os melhores provedores licenciados de todo o mundo. A sorte e a emoção estão presentes em cada página do site, e cada novo cliente pode senti-las.</p>
                <p class="mb-5">Durante muitos anos de trabalho, temos sido guiados por princípios que moldam nosso conceito e negócio. Mantemos esses princípios ano após ano.</p>
                <p class="mb-5">🏆 Abertura e transparência <br> A marca ValorBet foi criada com a ideia de representar uma nova era no funcionamento de cassinos online. Nosso objetivo era ser claros e transparentes com nossos clientes, para que a vida e o desenvolvimento da marca fossem visíveis para cada jogador.</p>
                <p class="mb-5">Realizamos atividades sociais, oferecendo a você a oportunidade de participar e influenciar a vida da marca, sendo ativo no Instagram e em nossas outras mídias — tudo isso para que você se torne parte de uma única marca de cassino online, a ValorBet!</p>
                <p class="mb-5">🏆 Velocidade de operação <br> Consideramos a largura de banda da internet dos jogadores de nossas regiões, coletamos análises e estatísticas detalhadas para garantir uma velocidade estável em cada um de nossos slots e no site da ValorBet. Conseguimos — agora você pode jogar caça-níqueis online gratuitamente ou por dinheiro real sem problemas de acesso.</p>
                <p class="mb-5">🏆 Acessibilidade <br> A ValorBet oferece a oportunidade de jogar para qualquer pessoa que realmente ame ótimos caça-níqueis e um serviço de alta qualidade.</p>
                <p class="mb-5">🏆 Qualidade <br> Provedores licenciados, suporte profissional 24/7 e uma equipe de especialistas com mais de 10 anos de experiência na indústria de jogos — tudo isso para garantir que cada dia de jogo no cassino online ValorBet traga prazer e emoções incríveis!</p>
                <p class="mb-5"><b>Contatos</b></p>
                <p class="mb-5">support@valor.bet</p>
            </div>
        `
    },
    'account-payments': {
        title: 'Conta, pagamentos e Bônus',
        subtitle: '',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
    <p class="mb-5">1. Para se tornar um Titular de Conta deve primeiro registar-se na empresa.</p>
    <p class="mb-5">2. Uma " Conta da empresa " é uma conta detida por um Titular de Conta, para
        transações de boa-fé, com o objetivo estrito de estabelecer uma relação comercial normal com a empresa e com o
        objetivo estrito de realizar apostas e outras transações de jogos e apostas.</p>
    <p class="mb-5">3. O " Website " é o portal da Internet acessível através do endereço da Internet
        da empresa/ onde são publicadas todas as informações atuais e relevantes. O " Website " é o portal da Internet
        acessível através do endereço da Internet da empresa/ onde são publicadas todas as informações atuais e
        relevantes sobre as operações da empresa, e através do qual os Serviços são prestados aos titulares de contas.
    </p>
    <p class="mb-5">4. As regras para todas as apostas desportivas da empresa Sportsbook são
        estabelecidas na secção de Ajuda geral (Apostas Desportivas);</p>
    <p class="mb-5">5. As regras para cada jogo fornecido pela empresa podem ser encontradas na secção
        de ajuda do website ou na secção apropriada de cada jogo.</p>
    <p class="mb-5">6. As Regras de Bônus/Promoções estão descritas na parte " Promoções " do website,
        onde se podem ver as condições aplicadas para cada bônus e/ou promoção. O montante máximo da aposta que pode
        colocar quando tem um bônus de casino ativo é de 5 euros (ou o equivalente em moeda) por rodada num jogo de slot
        ou 15% do bônus total dado (o que vier primeiro).</p>
    <p class="mb-5">7. Todos os serviços prestados devem ser utilizados de acordo com as Regras e os
        Limites estabelecidos.</p>
    <h3>2. Conta</h3>
    <h3>2.5 Ao abrir a sua conta, garante o seguinte:</h3>
    <p class="mb-5">2.1 Para fazer uma aposta ou jogar um jogo utilizando os nossos serviços, terá de
        abrir uma conta junto do Operador (" A conta da empresa "ou " Conta "). </p>
    <p class="mb-5">2.5.5 Não foi excluído do jogo; e</p>
    <p class="mb-5">2.5.6 Ainda não teve uma conta encerrada por nós sob as seguintes razões de
        Conluio, Trapaça, Fraude, Atividade criminosa, Violação dos Termos de Utilização ou a Seu pedido sob o parágrafo
        Jogo/Gambling Responsável.</p>
    <p class="mb-5">2.6 A sua conta deve ser registada no seu próprio, correto, nome e dados pessoais
        e só deve ser emitida uma vez para si e não deve ser duplicada através de qualquer outra pessoa, família, casa,
        endereço (postal ou IP), endereço eletrónico, Dispositivo de Acesso ou qualquer ambiente onde os Dispositivos de
        Acesso sejam partilhados (por exemplo, escolas, locais de trabalho, bibliotecas públicas, etc.), computador (ou
        outro dispositivo de acesso), e/ou conta no que respeita aos Serviços. Quaisquer outras contas que o cliente
        abra connosco, ou que sejam propriedade do cliente em relação aos Serviços, serão "Contas Duplicadas". Poderemos
        encerrar qualquer Conta Duplicada (mas não seremos obrigados a fazê-lo).</p>
    <p class="mb-5">Se fecharmos uma conta em duplicado:</p>
    <p class="mb-5">2.6.1 Todos os bónus, apostas grátis e ganhos acumulados com tais bónus e apostas
        grátis obtidas usando essa Conta Duplicada serão anulados e perdidos por si;</p>
    <p class="mb-5">2.6.2 Poderemos, à nossa inteira discrição, anular todos os ganhos e reembolsar
        todos os depósitos (menos os montantes relativos a ganhos nulos) efetuados relativamente a essa Conta Duplicada
        e, na medida em que não sejam recuperados por nós a partir da Conta Duplicada relevante, quaisquer montantes a
        serem-nos reembolsados pelo Cliente relativamente a uma Conta Duplicada poderão ser recuperados por nós
        diretamente a partir de qualquer outra Conta do Cliente (incluindo qualquer outra Conta Duplicada); ou</p>
    <p class="mb-5">2.6.3 Podemos, à nossa inteira discrição, permitir que a utilização da Conta
        Duplicada seja considerada válida e, neste caso, todas as perdas e apostas colocadas por ou para o cliente
        através da Conta Duplicada deverão ser retidas por nós.</p>
    <p class="mb-5">2.6.4 Devido à legislação regulamentar e de licenciamento, os jogadores das
        seguintes jurisdições estão proibidos de criar contas com a empresa: EUA, Curaçau e Malta. A empresa reserva-se
        todos os direitos de suspender uma conta aberta a partir desses países, assim como os depósitos e apostas
        feitas.</p>
    <p class="mb-5">2.2.1 Clique em Registar no Website e siga as instruções no ecrã ou</p>
    <p class="mb-5">2.2.2 Abra uma conta através de outro método de abertura de conta que, de tempos a
        tempos, poderá ser oferecido pelo Operador;</p>
    <p class="mb-5">2.3 A sua conta será operada ou pelo Operador, ou por outra empresa do seu Grupo
        para e em seu nome e/ou pela empresa relevante do Grupo Operador com a qual "assinou" um contrato</p>
    <p class="mb-5">2.4 Quando abrir a sua conta, ser-lhe-á pedido que nos forneça informações
        pessoais, incluindo o seu nome e data de nascimento e dados de contacto apropriados, incluindo uma morada,
        número de telefone e endereço de correio eletrónico ("Dados pessoais"). Poderá atualizar os seus Dados Pessoais
        de tempos a tempos, contactando o Serviço de Apoio ao Cliente; ou através da página de gestão " O Meu Perfil "
        no website: ou através de outro método que, de tempos a tempos, possa ser oferecido pelo Operador.</p>
    <p class="mb-5">2.5.1 Compreende e aceita o risco de que, ao utilizar os Serviços, pode, para além
        de ganhar dinheiro, perder dinheiro;</p>
    <p class="mb-5">2.5.2 É o que é: (a) acima de 18 anos de idade: e (b) acima da idade em que o jogo
        ou atividades de jogo são legais ao abrigo da lei ou jurisdição que se lhe aplica (a " Idade Relevante ");</p>
    <p class="mb-5">2.5.3 O jogo de azar não é ilegal no território onde reside;</p>
    <p class="mb-5">2.5.4 O cliente está legalmente habilitado a celebrar contratos;</p>
    <h3>3. Gestão da Conta da Empresa</h3>
    <h3>3.2 A empresa garante a todo o momento a</h3>
    <p class="mb-5">3.1 A empresa reserva-se o direito, a seu critério e em qualquer momento, de:</p>
    <p class="mb-5">i) Suspender e/ou cancelar a participação do Titular da Conta nos Serviços, e/ou
        perder e/ou confiscar fundos disponíveis na sua Conta da empresa se o Titular da Conta for encontrado a fazer
        batota, ou se for determinado pela empresa que o Titular da Conta empregou ou fez uso de um sistema (incluindo
        máquinas, robots, computadores, software ou qualquer outro sistema automatizado) concebido para derrotar ou
        capaz de derrotar a Aplicação e/ou Software do Cliente.</p>
    <p class="mb-5">A empresa está empenhada em detetar e prevenir programas de software concebidos
        para permitir que a inteligência artificial (software AI) possa jogar no(s) website(s) ITS, incluindo mas não se
        limitando ao perfil do adversário, conluio de jogadores; robôs, outro software de 'batota' ou qualquer outra
        coisa que, na nossa opinião razoável, distorça o jogo normal e permita ao jogador ter uma vantagem injusta sobre
        outros jogadores. O cliente reconhece que a empresa tomará medidas para detetar e impedir a utilização de tais
        programas e software de IA utilizando métodos (incluindo mas não se limitando à leitura da lista de programas
        atualmente em execução no computador de um jogador) e o cliente concorda em não utilizar qualquer software de IA
        e/ou quaisquer programas deste tipo.</p>
    <p class="mb-5">a) Gerir os fundos pertencentes aos Titulares de Contas de forma segura e
        adequada; e/ou</p>
    <p class="mb-5">b) Absorver o custo e pagar o Imposto de Jogo e Aposta, conforme aplicável, no
        Local do Contrato;</p>
    <p class="mb-5">c) Gerir os dados relativos a um Titular de Conta, de acordo com as leis
        aplicáveis, atos de proteção de dados e/ou similares; d) Não oferecer contingências aos clientes para procederem
        a qualquer transferência de fundos entre as contas dos clientes.</p>
    <p class="mb-5">3.3 A empresa deve manter os fundos dos titulares de contas separados dos fundos
        próprios da empresa numa conta de cliente mantida numa Instituição Financeira aprovada pela entidade reguladora.
    </p>
    <p class="mb-5">3.4 A conta da empresa não acumula juros. O titular da conta não deve tratar a
        empresa como uma instituição financeira.</p>
    <p class="mb-5">3.5 Um titular de conta só pode ter uma conta da empresa de cada vez. Caso esta
        regra seja violada, a empresa reserva-se o direito de bloquear e/ou eliminar o supérfluo À(s) conta(s) da
        empresa detida(s) pelo titular da conta em violação desta cláusula, e reafectar todos os fundos a uma única
        conta da empresa. Qualquer bónus dado ao supérfluo À(s) conta(s) da empresa será(ão) reatribuída(s).</p>
    <p class="mb-5">3.6 A Conta da empresa é intransmissível. É proibido aos jogadores vender,
        transferir ou adquirir contas de ou para outros jogadores. Os fundos não podem ser transferidos entre As contas
        da empresa.</p>
    <p class="mb-5">3.7 Um Titular de Conta não permitirá que qualquer outro indivíduo, incluindo
        qualquer menor, utilize ou reutilize a sua Conta da empresa, aceda e/ou utilize qualquer material ou informação
        do Website, aceite qualquer Prémio, ou aceda e/ou participe nos Serviços.</p>
    <p class="mb-5">a) Decidir abrir a conta da empresa e/ou encerrar uma conta da empresa existente
        sem qualquer explicação;</p>
    <p class="mb-5">b) Recusar-se a aceitar depósitos sem qualquer tipo de explicação;</p>
    <p class="mb-5">c) Solicitar documentos para verificar: (i) a identidade do Titular da Conta, (ii)
        a sua autorização para utilizar um Cartão específico e/ou (iii) outros factos e informações fornecidos pelo
        Titular da Conta. Tal pedido pode ser feito a qualquer momento e a empresa reserva-se o direito de suspender uma
        conta na pendência de investigação;</p>
    <p class="mb-5">f) Detenção e gestão de fundos pertencentes a Titulares de Contas de acordo com as
        orientações geralmente aceites para a gestão de numerário relativamente a tais fundos; isto pode incluir uma
        Instituição Financeira e/ou um Provedor de Soluções de Pagamento a ser confiado para deter fundos em nome de
        e/ou em benefício de Titulares de Contas;</p>
    <p class="mb-5">g) Perda e/ou confisco de fundos disponíveis numa Conta da empresa e/ou recusa de
        honrar uma reclamação, no caso de, direta ou indiretamente: (i) as Regras da empresa terem sido violadas; e/ou
        (ii) terem ocorrido outras atividades não autorizadas relacionadas com um evento de apostas e/ou o funcionamento
        de uma Conta da empresa (tais como, mas não limitadas a, violação da lei ou outros regulamentos, violação dos
        direitos de terceiros, fraude, e batota);</p>
    <p class="mb-5">h) Suspender e/ou cancelar a participação de um Titular de Conta nos jogos,
        atividades promocionais, concursos ou outros serviços, sempre que A empresa for de opinião que existem
        preocupações legítimas de que uma Conta da empresa seja, tenha sido, ou possa ser utilizada para práticas
        ilegais, fraudulentas ou desonestas;</p>
    <h3>4. Contas inativas</h3>
    <h3>4.2 A empresa detém o direito de cobrar ou encerrar as contas inativas se:</h3>
    <p class="mb-5">4.1 Uma " Conta Inativa " é uma conta da empresa que não tem registo de qualquer
        entrada e/ou saída durante um período superior a seis (6) meses consecutivos.</p>
    <p class="mb-5">a) Não foram registadas transações numa conta da empresa durante um período de 6
        meses consecutivos; (Uma conta inativa é uma conta que não foi acedida durante 6 meses, que tem um saldo
        monetário real. Uma vez que a sua conta se torne inativa, se não tivermos sido capazes de o contactar, a Empresa
        tem o direito de encerrar a sua conta e</p>
    <p class="mb-5">b) A empresa fez esforços razoáveis para contactar o Titular da Conta Inativa mas
        o titular da conta não pôde ser localizado satisfatoriamente ou as instruções de pagamento exigidas não estavam
        disponíveis.</p>
    <p class="mb-5">4.3 Se uma conta for bloqueada ou excluída e um saldo ainda estiver disponível na
        conta, o cliente será contactado pelo nosso Apoio ao Cliente, notificando-o de que um saldo ainda está
        disponível na sua conta. O cliente será solicitado a fornecer detalhes para o levantamento de tais montantes
        pendentes.</p>
    <p class="mb-5">4.4 A empresa reserva-se o direito de cobrar uma taxa mensal uma conta inativa
        igual a 5 EUR (ou equivalente noutra moeda) por mês.</p>
    <p class="mb-5">4.5 Qualquer saldo numa conta inativa resultante da oferta de levantamento será
        expirado imediatamente.</p>
    <h3>5. Devolução</h3>
    <p class="mb-5">5.1 Sujeito às subcláusulas abaixo e sem prejuízo do direito da empresa de
        procurar reparação ao abrigo de qualquer legislação, regulamento, promulgação ou política aplicável, ou ao
        abrigo de qualquer outra disposição do regulamento da empresa, A empresa terá o direito de bloquear uma conta da
        empresa quando for solicitado um estorno em relação a essa conta da empresa.</p>
    <p class="mb-5">5.2 Quando um estorno tiver sido solicitado, a empresa enviará um "Aviso de
        Estorno" ao titular da conta no endereço de correio eletrónico mencionado nos dados do titular da conta, a fim
        de obter confirmação da identidade do titular da conta e do método de pagamento utilizado para creditar na conta
        da empresa quaisquer fundos inteiramente não relacionados com um estorno ("Fundos não contaminados").Na ausência
        de confirmação pelo titular da conta da identidade do titular da conta e do método de pagamento utilizado para
        creditar Fundos Não Contínuos no titular da conta, A conta da empresa, na sequência de um Aviso de Estorno, A
        empresa enviará dois avisos escritos ao titular da conta no e-mail disponível, cada um dos quais estará sujeito
        a uma taxa de processamento de cinquenta (50) euros levantados em quaisquer Fundos Não Contínuos.</p>
    <p class="mb-5">5.3 Quando uma conta da empresa tiver sido bloqueada devido a uma devolução e o
        titular da conta não tiver: a) entrado na conta da empresa por um período de trinta (30) meses consecutivos; ou
        b) confirmado à empresa a sua identidade e os detalhes do método de pagamento utilizado para creditar os fundos
        não contaminados na conta da empresa do titular da conta e depois solicitado um levantamento; quaisquer fundos
        não contaminados na conta da empresa serão tratados como se fossem fundos numa conta inativa e a empresa
        remeterá o saldo para a conta da empresa do titular da conta.</p>
    <h3>6. Encerramento da conta da empresa</h3>
    <h3>6.5 Regras de Pagamento</h3>
    <h3>6.8 A empresa não deve lidar com o saldo credor da conta da empresa, exceto:</h3>
    <p class="mb-5">6.1 Um Titular de Conta pode encerrar a conta da empresa a qualquer momento,
        contactando o Apoio ao Cliente da empresa utilizando os dados de contacto fornecidos na secção " Ajuda " no
        Website por correio eletrónico. Quaisquer fundos na Conta da empresa serão enviados para o Titular da Conta.</p>
    <p class="mb-5">6.5.5 Método de pagamento/retirada de/para a conta da empresa.</p>
    <p class="mb-5">6.6.1 Um Titular de Conta só está autorizado a fazê-lo:</p>
    <p class="mb-5">a) Fazer depósitos na conta da empresa com o seu Cartão pessoal ou através da sua
        conta pessoal criada numa das Instituições Financeiras ou nos seus licenciados. Se detetarmos titulares de conta
        utilizando fundos de outros titulares de conta ou de terceiros em geral (incluindo mas não se limitando a
        receber fundos de terceiros nos seus próprios métodos de pagamento e depositando-os diretamente na sua própria
        conta da empresa), reservamo-nos o direito de anular quaisquer ganhos e perder qualquer saldo (ganhos e
        depósitos) na sua conta de apostas, rescindir o Acordo e/ou suspender a prestação dos Serviços ou desativar a
        sua conta.</p>
    <p class="mb-5">b) Solicitar levantamentos de fundos detidos na conta da empresa para a sua conta
        pessoal criada junto de uma das Instituições Financeiras ou dos seus licenciados.</p>
    <p class="mb-5">6.6.2 Um Titular de Conta é responsável por fornecer à empresa os dados corretos
        da sua conta pessoal para efeitos de levantamentos da conta da empresa.</p>
    <p class="mb-5">6.6.3 Um Titular de Conta não deve permitir que terceiros utilizem a Conta da
        empresa para efetuar depósitos ou levantamentos da Conta da empresa.</p>
    <p class="mb-5">6.6.4 É da exclusiva responsabilidade do Titular da Conta garantir que este cumpra
        as disposições acima referidas.</p>
    <p class="mb-5">6.7 A empresa não deve aceitar uma aposta de um Titular de Conta a menos que a
        Conta da empresa tenha sido estabelecida em nome do Titular da Conta e existam fundos adequados na Conta da
        empresa para cobrir o montante da aposta, ou que os fundos necessários para cobrir o montante da aposta sejam
        fornecidos de uma forma aprovada.</p>
    <p class="mb-5">a) para debitar da conta da empresa uma aposta feita pelo titular da conta ou um
        montante que o titular da conta indique que quer apostar no decurso de um jogo que está a jogar ou prestes a
        jogar;</p>
    <p class="mb-5">b) para remeter fundos em crédito da conta da empresa para o titular da conta, a
        pedido do titular da conta, nos termos do regulamento 37 do Regulamento de Jogo à Distância;</p>
    <p class="mb-5">6.2 Se uma conta já existente da empresa for encerrada, quaisquer obrigações já
        assumidas serão honradas.</p>
    <p class="mb-5">c) pagar encargos bancários razoáveis pelos depósitos recebidos e fundos
        levantados; ou</p>
    <p class="mb-5">d) conforme autorizado pelo Regulamento de Jogo à Distância.</p>
    <p class="mb-5">6.9 O saldo da conta da empresa pode tornar-se negativo em caso de devolução.</p>
    <p class="mb-5">6.10 Os levantamentos da conta da empresa são efetuados através de pagamentos
        dirigidos ao Titular da Conta ou transferidos para uma conta bancária mantida em nome do Titular da Conta,
        conforme aconselhado pelo Titular da Conta. Sempre que possível, a empresa restringirá os levantamentos a serem
        efetuados apenas à mesma conta utilizada pelo Titular da Conta para efetuar depósitos.</p>
    <p class="mb-5">6.11 Dependendo do método de pagamento escolhido pelo Titular da Conta, podem
        aplicar-se limites mínimos e/ou máximos de depósito.</p>
    <p class="mb-5">6.11.1 Para levantar um montante da conta, o Titular da Conta deve completar os
        seguintes passos:</p>
    <p class="mb-5">1. Escolher " Levantamento " na seção Conta.</p>
    <p class="mb-5">2. Escolher o método apropriado de retirada.</p>
    <p class="mb-5">3. Fornecer os dados pessoais necessários e indicar o montante.</p>
    <p class="mb-5">4. Pressione Confirmar. Aparecerá então uma mensagem a confirmar o pedido de
        levantamento.</p>
    <p class="mb-5">6.3 os titulares de contas que pretendam recuperar fundos detidos numa Conta
        fechada, bloqueada ou excluída devem contactar o apoio ao cliente.
        <br>
        Os levantamentos só serão permitidos na mesma conta de origem dos fundos. Também pode haver limitações para as
        retiradas. A identidade dos jogadores deve primeiro ser verificada.
        <br>
        O utilizador deve enviar documentos para verificação pelo menos um dia antes da primeira retirada.
    </p>
    <p class="mb-5">6.12 A empresa reserva-se o direito de cobrar ao titular da conta os custos
        administrativos resultantes dos levantamentos efetuados pelo titular da conta, conforme indicado no website.</p>
    <p class="mb-5">6.13 Fazer uma aposta através da Internet pode ser ilegal na jurisdição em que um
        Titular de Conta é residente e/ou domiciliado; se assim for, o Titular de Conta não está autorizado a utilizar
        um Cartão com o objetivo de fazer uma aposta.</p>
    <p class="mb-5">6.14 A participação de um Titular de Conta nos Serviços numa jurisdição onde tal
        participação seja proibida por lei não afetará quaisquer apostas ou pagamentos feitos e acumulados em benefício
        da empresa.</p>
    <p class="mb-5">6.15 A empresa, ou Autoridade Governante, pode controlar ou solicitar a revisão de
        todas as transações para impedir o branqueamento de capitais. Todas as transações suspeitas detetadas pela
        Empresa serão comunicadas às Autoridades Governamentais.</p>
    <p class="mb-5">6.16 Todas as transações são verificadas para prevenir o branqueamento de
        capitais.</p>
    <p class="mb-5">6.17 É da exclusiva responsabilidade do Titular da Conta pagar e proceder com toda
        a diligência necessária em relação aos impostos sobre qualquer Prémio, se e onde aplicável.</p>
    <p class="mb-5">6.18 É ilegal depositar dinheiro proveniente de meios mal obtidos.</p>
    <p class="mb-5">6.19 Com a iniciativa do Departamento de Finanças / Contabilidade, os utilizadores
        podem ser redirecionados para diferentes métodos de pagamento.</p>
    <p class="mb-5">6.4 Em caso de encerramento da conta da sua empresa devido a dependência do jogo
        ou fraude, um indivíduo não deve abrir uma nova conta da empresa. A empresa não será responsável caso o
        indivíduo consiga abrir uma nova conta, nem por quaisquer danos diretos ou indiretos consequentes. A empresa
        reserva-se o direito de encerrar uma conta aberta em violação desta regra a qualquer momento.</p>
    <p class="mb-5">Os depósitos e levantamentos da conta da empresa devem ser sempre efetuados
        através de uma Instituição Financeira ou de um Provedor de Soluções de Pagamento. Os procedimentos, Termos e
        Condições, disponibilidade e duração dos depósitos/retiradas podem variar, dependendo do tempo necessário para
        que estes procedimentos sejam concluídos, bem como do país onde o cliente reside e da Instituição Financeira que
        é utilizada. Mais informações estão disponíveis quando se faz o login no Website nas secções "Depósito " ou
        "Levantamento " . Relativamente a Yandex.Money Pagamento Rápido: " Cliente confirma que está familiarizado com
        as condições do serviço " Yandex.Money Quick Payment (https://money.yandex.ru/pay/doc.xml?offerid=default)."</p>
    <p class="mb-5">6.5.1 A empresa detém o direito de não processar um pagamento se a identidade,
        idade e local de residência e prova de fundos do titular da conta não tiverem sido suficientemente verificados.
    </p>
    <p class="mb-5">6.5.2 A empresa pode nomear um Fornecedor de Soluções de Pagamento para atuar,
        receber depósitos, deter e gerir fundos, e/ou agilizar levantamentos, em nome da Empresa.</p>
    <p class="mb-5">6.5.3 A empresa não aceita fundos em numerário enviados ou entregues diretamente à
        Empresa ou a um Provedor de Soluções de Pagamento.</p>
    <p class="mb-5">6.5.4 A empresa creditará na conta da Empresa todos os fundos recebidos pela
        Empresa de ou em nome do Titular da Conta, ou detidos pela Empresa ao Titular da Conta.</p>
    <h3>7. Limitação de Responsabilidade Civil</h3>
    <p class="mb-5">7.1 O utilizador entra no Website e participa nos Jogos por sua própria conta e
        risco. Os Websites e os Jogos são fornecidos sem qualquer garantia, quer expressa ou implícita.</p>
    <p class="mb-5">7.2 Sem prejuízo da generalidade da disposição anterior, a empresa, os seus
        diretores, empregados, sócios, prestadores de serviços:</p>
    <p class="mb-5">7.2.4 Não garantem que o software ou o sítio Website/Websites seja/estão aptos
        para os seus fins;</p>
    <p class="mb-5">7.2.5 Não garantam que o software e o Website estejam livres de erros;</p>
    <p class="mb-5">7.2.6 Não garantam que os Websites e/ou os Jogos serão acessíveis sem
        interrupções;</p>
    <p class="mb-5">7.2.7 Não será responsável por quaisquer perdas, custos, despesas ou danos,
        diretos, indiretos, especiais, consequenciais, incidentais ou não, decorrentes da sua utilização dos Websites ou
        da sua participação nos Jogos.</p>
    <p class="mb-5">7.3 O utilizador concorda em indemnizar totalmente e isentar a empresa, os seus
        diretores, empregados, sócios e prestadores de serviços de quaisquer custos, despesas, perdas, danos,
        reclamações e responsabilidades que possam surgir em relação à utilização do Website ou à sua participação nos
        Jogos.</p>
    <h3>8. Colusão, Trapaça, Fraude e Atividade criminosa</h3>
    <h3>8.3. Se:</h3>
    <h3>8.4. Para efeitos do presente parágrafo 11:</h3>
    <h3>Quando houver uma suspeita razoável de que o titular da conta tenha cometido ou tentado cometer um abuso de
        bónus, quer por conta própria quer como parte de um grupo, a empresa reserva-se o direito de o fazer:</h3>
    <p class="mb-5">8.1. As seguintes práticas em relação aos Serviços:</p>
    <p class="mb-5">Tomamos conhecimento de que " debitou " ou negou qualquer uma das compras ou
        depósitos que fez na sua conta; ou</p>
    <p class="mb-5">d) Se entrar em falência ou sofrer um processo análogo em qualquer parte do mundo,
        então (incluindo em relação a qualquer suspensão e/ou encerramento da sua conta) teremos o direito,
        relativamente à sua conta, de reter a totalidade ou parte do saldo e/ou recuperar da conta o montante de
        quaisquer depósitos, pagamentos, bónus ou ganhos que tenham sido afetados por ou sejam de alguma forma
        atribuíveis a qualquer um dos eventos descritos neste parágrafo.</p>
    <p class="mb-5">a) Uma " prática fraudulenta " significa qualquer atividade fraudulenta realizada
        por si ou por qualquer pessoa que aja em seu nome ou em conluio consigo, e incluirá, sem limitação,</p>
    <p class="mb-5">- devoluções fraudulentas e atividade de rake-back;</p>
    <p class="mb-5">- a utilização pelo cliente ou por qualquer outra pessoa que tenha participado no
        mesmo jogo que o cliente em qualquer altura, de um cartão de crédito ou débito roubado, clonado ou de outra
        forma não autorizado, como fonte de fundos;</p>
    <p class="mb-5">- o conluio do cliente com outros, a fim de obter uma vantagem injusta (inclusive
        através de esquemas de bónus ou incentivos semelhantes oferecidos por nós);</p>
    <p class="mb-5">- qualquer tentativa de registar informações falsas ou enganosas sobre a conta;
    </p>
    <p class="mb-5">- qualquer ato real ou tentativa de ato do cliente que seja razoavelmente
        considerado ilegal por nós em qualquer jurisdição aplicável, feito de má fé, ou destinado a defraudar-nos e/ou a
        contornar quaisquer restrições contratuais ou legais, independentemente de tal ato ou tentativa de ato nos
        causar efetivamente qualquer dano ou prejuízo;</p>
    <p class="mb-5">b) Uma " vantagem injusta " inclui, sem limitação:</p>
    <p class="mb-5">- a exploração de uma falha, lacuna ou erro no nosso software ou em qualquer
        software de terceiros utilizado pelo cliente em ligação com os Serviços (incluindo em relação a qualquer jogo);
    </p>
    <p class="mb-5">a) abuso de bónus ou outras promoções (tal como definido no parágrafo 11.4)</p>
    <p class="mb-5">- a utilização de jogadores automatizados('bots'), ou outro software ou sistemas
        de análise de terceiros; ou</p>
    <p class="mb-5">- a exploração por si, de um 'Erro' tal como definido no parágrafo 18, em qualquer
        caso em seu benefício e/ou desvantagem para nós ou para outros.</p>
    <p class="mb-5">c) O abuso de bónus inclui, mas não está limitado a:</p>
    <p class="mb-5">i. violação dos termos e condições de um bónus, apostas grátis ou qualquer outra
        oferta promocional</p>
    <p class="mb-5">ii. a abertura de múltiplas contas para reclamar múltiplos bónus;</p>
    <p class="mb-5">iii. todos os bónus estão sujeitos a limitação de utilização de bónus com base no
        motor de bónus e, salvo indicação em contrário, não devem ser utilizados mais de 6 vezes por mês civil; se, por
        qualquer razão, um código de bónus for utilizado por um jogador individual sobre o montante indicado, a empresa
        reserva-se o direito de investigar melhor o padrão de abuso de bónus e deduzir os ganhos de bónus mais todos os
        encargos de terceiros resultantes da atividade do jogador (taxas de pagamento, taxas de provedores, etc.)</p>
    <p class="mb-5">i. perde o bónus atribuído ao titular da conta e quaisquer ganhos provenientes
        desse bónus, e/ou</p>
    <p class="mb-5">ii. revogar, negar ou retirar uma oferta de bónus do titular da conta, e/ou</p>
    <p class="mb-5">iii. bloquear um acesso a determinados produtos, e/ou</p>
    <p class="mb-5">iv. excluir o titular da conta de qualquer oferta promocional futura, e/ou</p>
    <p class="mb-5">b) utilização de fatores ou influências externas injustas (vulgarmente conhecidas
        como batota)</p>
    <p class="mb-5">v. encerrar a conta do titular da conta com efeito imediato.</p>
    <p class="mb-5">c) tirar partido indevido (tal como definido no parágrafo 11.4);</p>
    <p class="mb-5">d) abrir quaisquer contas em duplicado; e/ou</p>
    <p class="mb-5">e) a prática fraudulenta ou atividade criminosa (tal como definida no parágrafo
        11.4), constituem " Práticas Proibidas " e não são permitidas. Tomaremos todas as medidas razoáveis para
        prevenir e detetar tais práticas e para identificar os intervenientes relevantes em causa, caso estas ocorram.
    </p>
    <p class="mb-5">8.2. O cliente concorda que não deverá participar ou estar ligado a qualquer forma
        de Prática Proibida em relação ao seu acesso ou utilização dos Serviços.</p>
    <p class="mb-5">a) Temos motivos razoáveis para acreditar que participou ou esteve ligado a
        qualquer forma de Prática Proibida (e a base da nossa convicção incluirá a utilização por nós de quaisquer
        práticas de fraude, batota e deteção de conluio que sejam utilizadas na indústria do jogo e do jogo no momento
        relevante); ou</p>
    <p class="mb-5">b) Fez apostas e/ou jogou jogos online com qualquer outro fornecedor de serviços
        de jogo online e é suspeito (como resultado desse jogo) de qualquer Prática Proibida ou atividade imprópria; ou
    </p>
    <h3>9.1 Desde que a sua conta não mostre que nos é devido um saldo, o utilizador tem o direito de encerrar a sua
        conta e rescindir os Termos de Utilização com um pré-aviso não inferior a vinte e quatro horas em qualquer
        altura, contactando-nos através do Serviço de Apoio ao Cliente, cujos detalhes podem ser encontrados na secção
        Contacte-nos e Ajuda do Website:</h3>
    <h3>ENCERRAMENTO E RESCISÃO POR NÓS</h3>
    <h3>SUSPENSÃO POR NÓS</h3>
    <h3>9.10 A empresa reserva-se o direito, a seu exclusivo critério, de anular quaisquer ganhos e perder qualquer
        saldo (ganhos e depósitos) na sua conta de apostas, rescindir o Contrato e/ou suspender a prestação dos Serviços
        ou desativar a sua conta, se tal for o caso:</h3>
    <p class="mb-5">9.1.1 Indicar o desejo do Utilizador de encerrar a sua conta; </p>
    <p class="mb-5">9.8 Os parágrafos seguintes sobreviverão a qualquer extinção dos Termos de
        Utilização: 19, 20, 21, 22, 23, 25, 26, 28, 29, 30, 31, 32 e 34 e quaisquer outros parágrafos necessários para
        efeitos de interpretação; juntamente com quaisquer secções relevantes das Regras das Apostas, Regras do Jogo
        relevantes e os Termos Adicionais.</p>
    <p class="mb-5">9.1.2 Indicar as razões pelas quais deseja encerrar a sua conta, em particular se
        o fizer devido a preocupações sobre o nível da sua utilização dos Serviços.</p>
    <p class="mb-5">9.9 Teremos o direito de suspender a sua conta nas circunstâncias expressamente
        estabelecidas nos Termos de Utilização. Após a suspensão da Conta do Utilizador: (a) nenhuma atividade será
        permitida (incluindo depósitos, levantamentos, apostas ou jogos) até à data em que for reativada por nós; (b)
        nenhum bónus ou ganhos contingentes serão creditados na Conta; e (c) abordaremos a questão que deu origem à
        suspensão da Conta com vista a resolvê-la logo que razoavelmente praticável, de modo a que a Conta possa,
        conforme o caso, ser reativada ou encerrada.</p>
    <p class="mb-5">i) identificamos que o utilizador disfarçou, ou interferiu, ou tomou medidas para
        disfarçar ou interferir, de qualquer forma, com o endereço IP de qualquer Dispositivo utilizado para aceder ao
        nosso Site (como a utilização de uma Rede Privada Virtual "VPN" ) </p>
    <p class="mb-5">ii) chega ao nosso conhecimento que o cliente utilizou documentos forjados
        (fotografias, documentos digitalizados, capturas de ecrã, etc.) durante o processo de verificação ou em qualquer
        momento em que o Acordo esteja ativo</p>
    <p class="mb-5">iii) existe uma suspeita razoável de que cometeu ou tentou cometer um abuso de
        bónus, quer por si próprio, quer como parte de um grupo</p>
    <p class="mb-5">iv) estiver envolvido em qualquer atividade fraudulenta, colusiva, reparadora ou
        outra atividade ilegal relacionada com a sua participação ou de terceiros, ou utilizar quaisquer métodos ou
        técnicas ou dispositivos de hardware assistidos por software para a sua participação em qualquer dos serviços
        prestados pela Empresa.</p>
    <p class="mb-5">9.11 A empresa reserva-se o direito de encerrar as contas existentes sem qualquer
        explicação. Neste caso, ou no caso de encerramento de uma conta por um cliente, o saldo total será pago, a menos
        que se suspeite de qualquer comportamento fraudulento (por exemplo, Arbitragem, etc.). Em caso de comportamento
        fraudulento, os ganhos serão anulados e os depósitos serão reembolsados após dedução das taxas administrativas e
        de transação correspondentes e de quaisquer taxas que a Empresa seja obrigada a pagar às autoridades competentes
        devido a uma reclamação de um cliente. A Empresa reserva-se igualmente o direito de comunicar às autoridades
        competentes, se algum cliente estiver envolvido em qualquer forma de suspeita de comportamento fraudulento.</p>
    <p class="mb-5">9.12 Se, na determinação exclusiva da Empresa, se verificar que o Jogador fez
        batota ou tentou defraudar a Empresa, de qualquer forma, incluindo mas não se limitando à manipulação do jogo,
        utilizando estratégias (ex. Martingale, sistema Anti-Martingale) destinado a ganhos infiéis ou fraude de
        pagamento, ou se ele/ela fizer comentários falsos e/ou maliciosos em relação ao funcionamento da Empresa em
        qualquer meio ou fórum, ou se a Empresa suspeitar que o Jogador efetuou um pagamento fraudulento, incluindo a
        utilização de cartões de crédito roubados ou qualquer outra atividade fraudulenta (incluindo, mas não se
        limitando a qualquer estorno ou outra reversão de um pagamento) ou transações proibidas (incluindo, mas não se
        limitando ao branqueamento de capitais), a Empresa reserva-se o direito de publicar as ações do Jogador
        juntamente com a sua identidade e endereço de e-mail, bem como de divulgar estas informações a bancos, empresas
        de cartões de crédito, e agências apropriadas. Além disso, a Empresa pode fechar quaisquer contas e perder
        qualquer saldo de conta que o Jogador tenha com a Empresa.</p>
    <p class="mb-5">Reservamo-nos o direito de anular e reter qualquer ou todos os ganhos feitos por
        qualquer Jogador, quando tivermos motivos razoáveis para acreditar que o referido Jogador está a agir ou agiu em
        ligação com uma tentativa de defraudar ou danificar a Empresa e/ou os Serviços e/ou a Plataforma de qualquer
        forma.</p>
    <p class="mb-5">No interesse da proteção de dados, segurança e prevenção de fraude, a Empresa não
        permite a utilização de quaisquer canais de comunicação incluídos nos Serviços e/ou na Plataforma para oferecer
        ou promover quaisquer ofertas, produtos ou serviços (quer sejam do Jogador ou de terceiros). O Jogador está
        expressamente proibido de publicar informações ou contactar os nossos clientes para oferecer ou promover
        quaisquer ofertas, produtos ou serviços.</p>
    <p class="mb-5">Responderemos ao pedido do Cliente, confirmando o encerramento da Conta e a data
        em que tal encerramento será efetivo, dentro de um prazo razoável, desde que o Cliente continue a assumir a
        responsabilidade por toda a atividade da Conta até que tal encerramento seja efetuado por nós (momento em que os
        Termos de Utilização cessarão).</p>
    <p class="mb-5">9.2 Quando o Adquirente solicitar o encerramento da sua conta nos termos do
        parágrafo 9.1, sujeito ao parágrafo 9.3, deverá devolver ao Adquirente qualquer saldo pendente na sua conta.</p>
    <p class="mb-5">9.3 Em caso de encerramento da Conta do Utilizador ao abrigo deste parágrafo 9,
        teremos o direito (sem limitação dos nossos direitos ao abrigo do parágrafo 9.6) de reter, a partir do reembolso
        do saldo pendente na Conta do Utilizador, quaisquer fundos: (a) nos termos do parágrafo 8 (Colusão, Trapaça,
        Fraude e Atividade Criminal); (b) nos termos do parágrafo 20 (Violação dos Termos de Utilização); (c) conforme
        previsto nos Termos de Utilização (incluindo, conforme o caso, o parágrafo 5.4); ou (d) conforme exigido por lei
        ou regulamento.</p>
    <p class="mb-5">9.4 Ao reembolsar o saldo pendente na Conta do Utilizador, utilizaremos o mesmo
        método de pagamento que o Utilizador forneceu aquando do registo da Conta, ou qualquer outro método de pagamento
        que possamos razoavelmente selecionar.</p>
    <p class="mb-5">9.5 Se o Cliente tiver encerrado a sua conta, poderemos, em determinadas
        circunstâncias, reabrir a sua conta com os mesmos dados de conta que anteriormente, se o Cliente nos solicitar.
        Em tais circunstâncias, embora a Conta do Cliente tenha os mesmos detalhes de conta que anteriormente, estará
        sujeita aos Termos de Utilização em vigor à data de qualquer reabertura e quaisquer direitos anteriores
        (incluindo, mas sem limitação, a bónus ou ganhos contingentes) deixarão de ser válidos.</p>
    <p class="mb-5">9.6 Temos, a qualquer momento (e não obstante quaisquer outras disposições
        contidas nos Termos de Utilização), o direito de encerrar a sua conta e rescindir os Termos de Utilização
        mediante aviso escrito (ou tentativa de aviso) ao Utilizador, utilizando os seus Dados de Contacto. Em caso de
        tal rescisão por parte do Vendedor, o Vendedor deverá, sujeito ao parágrafo 12.7, assim que razoavelmente
        praticável na sequência de um pedido do Vendedor, reembolsar o saldo da sua Conta.</p>
    <p class="mb-5">9.7 Quando encerrarmos a Conta do Adquirente e rescindirmos os Termos de
        Utilização nos termos do parágrafo 11 (Conluio, Trapaça, Fraude e Atividade Criminal) ou do parágrafo 20
        (Violação dos Termos de Utilização), o saldo da Conta do Adquirente não será reembolsável e será considerado
        como perdido pelo Adquirente na medida de qualquer reclamação que possamos ter contra o Adquirente à data do
        encerramento (quer sob a Conta do Adquirente, exista uma Conta Duplicada ou algo semelhante). O encerramento da
        conta do Adquirente e a rescisão dos Termos de Utilização, salvo nos termos dos parágrafos 11 ou 20 destes
        Termos Gerais, não afetará quaisquer apostas pendentes, desde que tais apostas pendentes sejam válidas e o
        Adquirente não infrinja de forma alguma os Termos de Utilização. Para evitar dúvidas, não creditaremos quaisquer
        bónus na sua conta, nem terá direito a quaisquer ganhos contingentes, em qualquer altura após a data em que
        tenha sido encerrada (quer por nós nos termos dos Termos de Utilização, quer em resposta ao seu pedido).</p>
    <h2>CESSAÇÃO DOS TERMOS DE UTILIZAÇÃO ENCERRAMENTO E CESSAÇÃO POR SI</h2>
    <h3>10. Registo</h3>
    <p class="mb-5">10.1 Apenas Utilizadores registados podem participar em programas de bónus da
        empresa. Para se registar, o Utilizador deve preencher completa e precisamente o formulário de registo.</p>
    <p class="mb-5">10.10 A empresa reserva-se o direito de, a qualquer momento, verificar a
        identidade do jogador, sem aviso prévio, e antes de processar os pagamentos; a empresa reserva-se também o
        direito de realizar levantamentos durante o tempo necessário para verificar a identidade do jogador.</p>
    <p class="mb-5">10.10.1 Note-se que quando os depósitos ou levantamentos acumulados atingirem 2
        000 euros, o procedimento de verificação do jogador será obrigatório. O processo de verificação exigirá aos
        jogadores que forneçam documentos tais como, mas não limitados a, bilhetes de identidade, cartões bancários,
        extratos bancários, fonte de riqueza, fonte de fundos, e faturas de serviços públicos. Em caso de dados pessoais
        falsos fornecidos pelos jogadores, o levantamento pode ser recusado e a conta do utilizador pode ser encerrada.
        O jogador será informado do facto por e-mail. Em alguns casos, a Empresa pode solicitar Selfie com ID, Selfie
        com ID e sinal especial, ou mesmo chamada ou videochamada. Quando qualquer documento é solicitado, o titular da
        conta deve carregar tal documentação na sua conta (Meu Perfil &gt; Documentos). Ao solicitar documentos para
        verificação de uma conta, quaisquer levantamentos pendentes serão cancelados.</p>
    <p class="mb-5">10.10.2 Uma vez concluída a verificação, o Titular da Conta poderá solicitar um
        novo levantamento. Caso a conta não seja verificada no prazo de trinta (30) dias a partir da data inicial do
        pedido, a conta será congelada para jogar e transações. Se, por qualquer razão, um Titular de Conta recusar ou
        não puder fornecer-nos qualquer dos documentos solicitados, a Empresa reserva-se o direito de suspender a conta
        e confiscar quaisquer fundos disponíveis.</p>
    <p class="mb-5">10.10.3 O pedido de reembolso também pode ser recusado pelo Cassino se o jogador
        fornecer dados pessoais falsos ou intencionalmente modificados de modo a contornar o sistema.</p>
    <p class="mb-5">10.2 O registo e as apostas só são permitidos para pessoas maiores de 18 anos (ou
        a faixa etária permitida no país de onde o Utilizador abriu um depósito e fez apostas). Os utilizadores têm
        total responsabilidade em termos de lidar com a legalidade das apostas na Internet na região onde vivem e/ou por
        fornecer às autoridades apropriadas do seu país informações sobre os ganhos. A Empresa reserva-se o direito de
        exigir prova de idade e bloquear a conta do Utilizador antes de receber a documentação apropriada.</p>
    <p class="mb-5">10.3 Todas as informações fornecidas durante o registo devem ser exatas e
        completas. Em particular, ao utilizar cartões de crédito ou débito, o nome e apelido do titular do cartão deve
        corresponder ao nome e apelido indicado no formulário de registo, caso contrário, a conta será bloqueada. Todas
        as apostas feitas antes de bloquear a conta são reconhecidas como válidas.</p>
    <p class="mb-5">10.4 A Empresa reserva-se o direito de bloquear as contas dos Utilizadores que
        tenham comunicado dados falsos, bem como de lhes negar o pagamento de quaisquer ganhos. A pedido da empresa, o
        Utilizador deverá apresentar um documento oficial com fotografia, confirmando a sua identidade (uma cópia do
        passaporte, ou o seu BI nacional), prova da autenticidade dos dados do endereço indicado e telefone e prova da
        propriedade do método de pagamento.</p>
    <p class="mb-5">10.5 Cada Utilizador pode ter apenas uma conta. Os Utilizadores registados não
        podem voltar a registar-se como um novo cliente com um novo nome ou um novo endereço eletrónico. Em caso de
        violação desta regra, a empresa tem o direito de anular todas as apostas feitas pelo Utilizador.</p>
    <p class="mb-5">10.6 O Utilizador não tem o direito de permitir que qualquer terceiro utilize a
        sua conta de jogo.</p>
    <p class="mb-5">10.7 Note que não nos deve enviar os detalhes da sua conta de cartão de crédito ou
        outras informações financeiras sensíveis através de um e-mail não encriptado.</p>
    <p class="mb-5">10.8 A empresa permite que todos os seus Utilizadores escolham a sua própria
        combinação de nome de utilizador e palavra-passe. Os Utilizadores devem manter tais informações em segredo. Se o
        seu nome de utilizador e palavra-passe forem introduzidos corretamente ao aceder ao site, todas as apostas
        permanecem em vigor e não podem ser canceladas ou alteradas pelo Utilizador. Se suspeitar que alguém, além do
        Utilizador, sabe a sua palavra-passe, altere-a imediatamente no nosso site. Se se tiver esquecido da
        palavra-passe ou de parte dela, clique no botão "Esqueceu-se da sua palavra-passe?" na página de login e siga o
        procedimento para a redefinir.</p>
    <p class="mb-5">10.9 Os utilizadores que fazem as suas apostas na empresa através de um telemóvel
        devem lembrar-se que a empresa não é responsável por qualquer perda de dados no telemóvel do cliente, e não é
        responsável por qualquer comissão dos operadores móveis e de Internet. Ao registar-se, o cliente confirma que
        aceita e concorda com estes Termos.</p>
    <h3>Moeda</h3>
    <p class="mb-5">11.1 Atualmente os Utilizadores têm o direito de fazer apostas nas seguintes
        moedas: EUR, USD, AUD, CAD, NOK, GBP, RUB, NZD, JPY, BRL. A empresa reserva-se o direito de bloquear a receção
        de apostas e atividades operacionais em qualquer uma das moedas indicadas. Neste caso, todos os pagamentos
        necessários nas contas de moeda bloqueada seriam detidos noutra moeda equivalente à taxa de câmbio interbancária
        para esse dia.</p>
    <ul>
        <li>Nos jogos de slot de bobina, as apostas são consideradas no valor de 100%. A exceção são os jogos de slot
            com a capacidade de alterar a volatilidade do jogador - 0%.</li>
        <li>Nos jogos da categoria de mesa: pôquer - no valor de 5%.</li>
        <li>Nos jogos da categoria Black Jacks, Roleta, Raspadinhas, Loteria - no valor de 5%.</li>
        <li> Nos jogos da categoria Ao vivo: blackjack, pôquer - no valor de 5%.</li>
        <li>Apostas em jogos instantâneos (Aviator) - no valor de 5%.</li>
    </ul>
    <h3>12. O Programa de Bônus</h3>
    <p class="mb-5">12.1 Todos os bônus dos Utilizadores são limitados individualmente a uma pessoa,
        endereço de casa, número de telefone e endereço de correio eletrónico, uma fatura de pagamento (tal como por
        número de cartão ou conta Skrill), bem como o computador a ser utilizado (incluindo o instituto, o clube da
        Internet e outras instituições públicas). A empresa tem o direito de recusar o bônus a qualquer Utilizador ou
        grupo de Utilizadores. Os programas de bônus estão disponíveis apenas para Utilizadores que tenham efetuado um
        depósito em moeda real na conta da empresa.</p>
    <p class="mb-5">12.3.5 Os bônus devem ser apostados exclusivamente em jogos válidos que pertençam
        à categoria de jogo específica sob a qual o bônus foi inicialmente oferecido. Por exemplo, um bônus da
        Sportsbook deve ser apostado exclusivamente em Desporto, um bônus do Cassino exclusivamente em Slots, e um bônus
        do Cassino ao Vivo exclusivamente em jogos do Cassino ao Vivo.</p>
    <p class="mb-5">12.3.6 Os Bônus de Cassino (Slots) são por vezes oferecidos em Prestadores de
        Serviços de Jogos (GSPs) específicos ou em slots específicos. Por conseguinte, apenas as apostas efetuadas nos
        GSPs selecionados e/ou em slots específicos serão tidas em consideração para os requisitos de apostas do bônus.
    </p>
    <p class="mb-5">12.3.8 Para rotações sem depósito Rodadas Grátis, Fichas de Cassino e Apostas
        Grátis concedidas a jogadores que não tenham feito previamente um depósito, um depósito mínimo, bem como uma
        aposta de x1 (vezes um) o montante do depósito é necessário, antes de os ganhos poderem ser levantados. Os Bônus
        de Lealdade do Cassino, Rodadas Grátis, Fichas de Cassino e Bônus de Lealdade das Apostas Desportivas e Apostas
        Grátis só podem ser concedidos a jogadores totalmente verificados. Apenas um bônus é permitido por cliente, por
        residência, por endereço, por computador e por endereço IP partilhado, e por qualquer detalhe de conta como um
        endereço de e-mail, detalhes de conta bancária, informação de cartão de crédito e número de conta do sistema de
        pagamento. Qualquer abuso da oferta de bônus conduzirá ao encerramento da conta.</p>
    <p class="mb-5">12.3.9 As apostas grátis oferecidas devem ser colocadas no Futebol com
        probabilidades mínimas de 2,00. Estão excluídos os mercados de Handicaps e Draw-no-bet.</p>
    <p class="mb-5">12.3.10 O montante máximo da aposta permitida com dinheiro de bônus no Cassino é
        de 5 EUR (ou o equivalente em outras moedas) ou 15% do montante total do bônus atribuído (o que ocorrer
        primeiro). Quaisquer rondas de jogo ou rotações que excedam o montante máximo da aposta não contarão para os
        requisitos de apostas de bônus e quaisquer ganhos potenciais serão confiscados.</p>
    <p class="mb-5">12.3.11 Se um jogador decidir cancelar um Bônus ativo, pode fazê-lo a partir da
        sua conta. Contudo, todo o dinheiro do bônus, todos os ganhos e qualquer montante apostado resultante da sua
        atividade de apostas com o bônus serão perdidos de uma vez por todas. As apostas de bônus calculam primeiro o
        dinheiro real e depois o montante do bônus.</p>
    <p class="mb-5">12.2 Em caso de violação de qualquer requisito dos programas de bônus, e também se
        houver provas de apostas recorrentes sobre um mesmo evento de um grupo de clientes, ou conspiração,
        independentemente do resultado das apostas dadas, a empresa reserva-se o direito de privar estes Utilizadores de
        um bônus e de considerar as apostas correspondentes como inválidas. Para efeitos de proteção contra a fraude, a
        empresa tem o direito de exigir ao cliente um documento comprovativo da sua identidade antes de transferir um
        bônus.</p>
    <p class="mb-5">12.3.12 As ofertas personalizadas comunicadas exclusivamente a um segmento
        específico de jogadores via e-mail ou SMS estão exclusivamente disponíveis para os destinatários pretendidos do
        e-mail ou SMS e apenas para aqueles.</p>
    <p class="mb-5">12.3.13 Para ofertas personalizadas comunicadas via e-mail ou SMS, os jogadores
        são solicitados a contactar a nossa equipa de apoio ao cliente para reclamar o bônus fornecendo todos os
        detalhes necessários (por exemplo, código de bônus, tipo de oferta, endereço de e-mail do destinatário, etc.).
    </p>
    <p class="mb-5">12.3.14 Em algumas ocasiões, forneceremos rotações gratuitas sob a forma de uma
        ficha de bônus do Cassino. O montante a ser creditado tem em consideração a aposta mínima permitida na(s)
        ranhura(s) específica(s). Por exemplo, 20 rodadas grátis na slot vídeo Guns N' Roses da NetEnt serão atribuídas
        como uma ficha de Cassino de 4 EUR (ou equivalente noutra moeda) e destina-se a ser jogada na slot específica
        (ficha de bônus = aposta mínima (0,20 EUR) x número de rodadas (20) = 4 EUR).</p>
    <p class="mb-5">12.3.15 Nenhum dos materiais promocionais oferecidos através deste website são
        transferíveis, permutáveis ou reembolsáveis. Na ocorrência em que um determinado material promocional não seja
        operável devido a restrições técnicas, geográficas ou legais, a empresa não tem qualquer responsabilidade e
        reserva-se o direito de não compensar ou reembolsar os jogadores.</p>
    <p class="mb-5">12.3.16 Os jogadores podem ser solicitados em qualquer altura a fornecer todos os
        documentos KYC necessários para a verificação da sua conta (prova de identidade, método(s) de pagamento e
        residência).</p>
    <p class="mb-5">12.3.17 Em caso de dúvida quanto ao requisito de apostas remanescentes dos bônus,
        os jogadores são aconselhados a contactar a nossa equipa de apoio ao cliente.</p>
    <p class="mb-5">12.3.18 As condições de aposta do bônus são estipuladas nas regras de cada bônus
        específico e representam um Rollover (aposta) do tamanho do bônus ou do valor do bônus e do depósito feito.</p>
    <p class="mb-5">Rollover (Aposta) - um multiplicador que indica o valor total das apostas que
        devem ser feitas no site para transferir os fundos do Bônus para o saldo do Real. Por exemplo, apostar x50
        significa que você precisa apostar 50 vezes os fundos de bônus.</p>
    <p class="mb-5"><strong> % da aposta, que vai para a aposta do bônus, é levada em consideração de
            diferentes maneiras ao jogar em diferentes categorias de jogos: </strong></p>
    <p class="mb-5"> As deduções de apostas podem ocasionalmente mudar sem aviso prévio. A empresa
        reserva-se o direito de perder os ganhos e qualquer montante apostado se os clientes descobrirem que conseguiram
        jogar os jogos acima mencionados com um bônus ativo.</p>
    <p class="mb-5">12.3 TERMOS PROMOCIONAIS Salvo indicação em contrário, os seguintes termos
        aplicam-se a todos os Bônus, Rodadas Grátis, Apostas Grátis, Fichas de Cassino e qualquer outro 'material
        promocional' oferecido através do website, boletins informativos e SMS.</p>
    <p class="mb-5">12.3.19 Reservamo-nos o direito de alterar, cancelar ou terminar qualquer uma das
        promoções em qualquer altura e sem aviso prévio.</p>
    <p class="mb-5">12.4.1 O saldo é pago diretamente em seu Saldo em Dinheiro, que você pode usar no
        Casino ou sacar.</p>
    <p class="mb-5">12.4.2 Seu amigo deve se inscrever através do seu link de convite pessoal.</p>
    <p class="mb-5">12.4.3 Para receber 5 USD no seu saldo, o seu amigo deve fazer um depósito de pelo
        menos 10 USD (o seu amigo pode depositar 10 USD em várias parcelas).</p>
    <p class="mb-5">12.4.4 Seu amigo deve ter depositado pelo menos uma recompensa fixa para que você
        receba a recompensa de convite.</p>
    <p class="mb-5">12.4.5 Você não pode criar novas contas do Casino e se inscrever através do seu
        próprio link para receber a recompensa. O programa de Indique um Amigo é feito para que nossos jogadores
        convidem amigos para a plataforma. Qualquer outro uso desse programa é estritamente proibido.</p>
    <p class="mb-5">12.4.6 O Casino pode suspender ou encerrar o programa Indique um Amigo ou a
        capacidade do usuário de participar dele a qualquer momento, por qualquer motivo. Reservamo-nos o direito de
        suspender contas ou remover Saldo em Dinheiro se notarmos qualquer atividade que acreditamos ser abusiva,
        fraudulenta ou em violação dos Termos de Serviço ou dos Termos de Indicação de Amigos. Reservamo-nos o direito
        de revisar e investigar todas as atividades de indicação e suspender contas ou modificar indicações a nosso
        exclusivo critério, considerando justo e apropriado.</p>
    <p class="mb-5">12.3.1 Os bônus de 'Boas-vindas' e 'Recarregar' (slots), e os bônus de
        'Boas-vindas' e 'Recarregar' desportivos são válidos por um período de 30 dias a partir do momento em que são
        creditados na conta dos jogadores. Após o período de 30 dias, os materiais promocionais acima mencionados
        expiram e não podem ser reclamados ou reembolsados.</p>
    <p class="mb-5">12.3.2 Os bônus de 'Boas-vindas' e 'Recarregar' do Cassino Live são válidos por um
        período de 14 dias a partir do momento em que são creditados na conta dos jogadores. Após o período de 14 dias,
        os materiais promocionais acima mencionados expiram e não podem ser reclamados ou reembolsados.</p>
    <p class="mb-5">12.3.3 Todas as Rodadas Grátis, Apostas Grátis, Fichas de Bônus, são válidas por
        um período de 7 dias a partir do momento em que são creditadas na conta dos jogadores. Após o período de 7 dias,
        os materiais promocionais acima mencionados expiram e não são reclamáveis nem reembolsáveis. Os ganhos máximos
        do Bônus de Cashback / Fidelidade são limitados a cinco (5x) vezes o montante inicial do Bônus de Cashback dado.
        Quaisquer ganhos acima desse valor serão confiscados. Os ganhos máximos de promoções especiais (incluindo, mas
        não limitado a, Bônus de Natal, Bônus de Páscoa, Bônus de Halloween) para 200% e acima do limite do Bônus, estão
        limitados a quatro (4x) vezes o montante inicial do depósito. Os ganhos máximos para bônus entre 150% - 199% do
        limiar de bônus, estão limitados a oito (8x) vezes o montante do depósito inicial. Os ganhos máximos para bônus
        entre 120% - 149% limite, estão limitados a dez (10x) vezes o montante do depósito inicial. Os ganhos máximos
        para bônus entre 100% - 119% limiar, estão limitados a quinze (15x) vezes o montante do depósito inicial. Os
        ganhos máximos para bônus entre 25% - 99% limite, estão limitados a vinte (20x) vezes o montante do depósito
        inicial. Quaisquer ganhos acima desses limites serão confiscados.</p>
    <p class="mb-5">- Rodadas grátis: x20 (vezes vinte) o montante dos ganhos</p>
    <p class="mb-5">- Chip do Cassino: x25 (vezes vinte) o montante do bônus</p>
    <p class="mb-5">- Apostas grátis: x1 (vezes um) o montante dos ganhos</p>
    <h3>13. Depósitos</h3>
    <p class="mb-5">13.1 Os métodos de pagamento disponíveis são determinados pelo país e pela moeda
        selecionada durante o registo. Uma lista completa de taxas, limites das mesmas e outros itens é exibida na
        página Depósitos e Levantamentos. A empresa reserva-se o direito de alterar estes termos e detalhes. </p>
    <p class="mb-5">13.2 Ao realizar quaisquer transações financeiras, é necessário que o nome do
        proprietário do cartão de débito/crédito ou conta bancária corresponda exatamente ao nome do proprietário da
        conta apropriada da empresa. Caso contrário, a empresa reserva-se o direito de cancelar todas as transações e
        fazer uma devolução de todas as apostas feitas durante a utilização da conta ou do cartão de crédito/débito de
        outra pessoa.</p>
    <h3>14. Entrada de dinheiro por conta</h3>
    <p class="mb-5">14.1 Se quaisquer fundos tiverem sido transferidos para o Utilizador erroneamente,
        o Utilizador é obrigado a notificar imediatamente a empresa. Quaisquer ganhos do cliente resultantes de tal erro
        serão considerados inválidos, e tais apostas são reembolsáveis, independentemente do atraso entre a origem do
        erro e o momento em que este foi visto.</p>
    <p class="mb-5">14.2 Se os depósitos na conta foram feitos para qualquer outro fim que não
        apostas, póquer, casino e apostas financeiras, a empresa (particularmente em caso de suspeita de fraude)
        reserva-se o direito de cancelar um depósito e cobrar do Utilizador todos os custos incorridos em resultado do
        processamento do depósito.</p>
    <p class="mb-5">14.3 Se o depósito do Utilizador exceder o montante da aposta, a pedido do
        cliente, a empresa reserva-se o direito de cobrar ao Utilizador todos os custos incorridos como resultado do
        processamento dos depósitos e levantamentos.</p>
    <h3>15. Restrições financeiras</h3>
    <p class="mb-5">15.1 A aposta mínima em qualquer evento é o equivalente a 0,50 Euro na moeda
        registada da conta de jogo. A aposta mínima no modo " Múltiplos " e a aposta mínima numa versão do " Sistema " é
        o equivalente a 0,50 Euros. </p>
    <p class="mb-5">15.3 O montante máximo da aposta sobre o evento depende do desporto e dos eventos
        e é definido pela rede de casas de apostas especificamente para cada evento e cada tipo de aposta e está sujeito
        a alterações sem aviso prévio por escrito. A empresa reserva-se o direito de limitar a aposta máxima em eventos
        individuais, bem como a introdução e eliminação de restrições específicas sobre as contas de utilizadores
        individuais sem aviso prévio ou explicação dos motivos.</p>
    <p class="mb-5">15.4 Todas as limitações financeiras são aplicáveis a cada Utilizador/grupo
        atuando em conjunto, fazendo apostas contendo as mesmas previsões. Se o Utilizador fizer um número de apostas
        contendo as mesmas previsões, o pagamento total destas apostas pode ser limitado pelo tamanho de um pagamento
        máximo regulado por determinadas limitações.</p>
    <h3>16. Pagamentos</h3>
    <p class="mb-5">16.1 Os pagamentos são processados num prazo não superior a 72 horas a partir do
        momento em que o pedido tenha sido aprovado pelo departamento de Pagamentos. Antes do primeiro pagamento ser
        efetuado ao Utilizador através de métodos de pagamento eletrónicos (Skrill, Webmoney, cartão de crédito ou
        débito, etc.), o cliente é obrigado a carregar uma cópia eletrónica de um passaporte do seu ID nacional na
        secção relevante sob o seu Perfil. A empresa, a seu critério, pode pedir ao cliente documentos adicionais (por
        exemplo, prova de morada, selos, etc.) antes do seu primeiro pagamento. Lembre-se que a falsificação é
        severamente punida por lei e em casos de suspeita de colocar uma falsificação ou uma cópia editada dos
        documentos por métodos eletrónicos, A empresa reserva-se o direito de enviar tais documentos às autoridades
        reguladoras competentes.</p>
    <p class="mb-5">16.2 Antes de efetuar o pagamento, os empregados da empresa verificarão a
        correspondência do nome, apelido, nome do pai, datas de nascimento do cliente e também outros dados. Se forem
        encontradas diferenças entre os dados reais e os dados fornecidos pelo cliente, a empresa reserva-se o direito
        de fazer um reembolso para todas as apostas do Utilizador e recusar-se a pagar os ganhos ao Utilizador, a menos
        que prove a sua identidade e exatidão dos dados introduzidos.</p>
    <p class="mb-5">16.3 Se se verificar que o Utilizador abriu várias contas na empresa, A empresa
        reserva-se o direito de recusar o pagamento dessas contas (exceto os bens do Utilizador legitimamente
        transferidos para a conta da empresa, após o pagamento de uma multa de 20% do montante total dos depósitos).</p>
    <p class="mb-5">16.4 Com o primeiro pedido de retirada, o Utilizador deve introduzir os dados
        válidos do passaporte ou identificação pessoal, exatamente como aparece no documento, na língua do país que o
        emitiu (ou no caso de documentos estrangeiros - em inglês).</p>
    <p class="mb-5">16.5 Os membros do grupo e da família devem regular as relações pessoais entre si
        - os pagamentos são efetuados SOMENTE em nome do proprietário da conta apropriada.</p>
    <p class="mb-5">16.6 O Utilizador concorda em fornecer à empresa informações sobre a sua conta
        bancária a partir da qual as apostas serão feitas em particular, a fim de transferir os seus ganhos.</p>
    <p class="mb-5">16.7 A empresa não é responsável por alterações no número de pagamentos
        relacionados com flutuações de moeda (taxa de câmbio).</p>
    <p class="mb-5">16.8 Se o Utilizador tiver solicitado um levantamento no montante de 1.000 Euros
        ou mais (ou o equivalente noutra moeda à taxa interbancária), a Empresa paga uma comissão sobre a transferência
        e subsequentes operações de levantamento no mês civil em questão. Caso contrário, a comissão é paga ao banco
        pelo Utilizador. O montante máximo de levantamentos que podem ser efetuados durante um período de 24 horas é de
        1.000 Euros (ou o equivalente noutra moeda à taxa interbancária), sujeito aos limites específicos do seu
        fornecedor de pagamentos. Para ganhos superiores a 10.000 Euros, os pagamentos serão feitos em prestações
        mensais iguais.</p>
    <p class="mb-5">16.9 A Empresa reserva-se o direito de levantamento de fundos utilizando um método
        de pagamento prioritário para os jogadores vencedores (incluindo cartão de crédito/débito ou para a conta
        bancária do jogador).</p>
</div>
        `
    },
    'contact': {
        title: 'Contato',
        subtitle: 'Entre em contato',
        content: `
            <div class="politics-content__block">
                <p class="mb-5"><b>E-mail:</b> support@valor.bet</p>
                <p class="mb-5"><b>Alteração de e-mail/senha:</b> valor.security@valor.bet</p>
            </div>
        `
    },
    'affiliate-program': {
        title: 'Programme d’affiliation',
        subtitle: 'Devenez notre partenaire',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">L’une de nos principales priorités en tant qu’opérateur de jeux en ligne est de garantir un jeu équitable.</p>
                <p class="mb-5">À l’exception des paris sportifs et des jeux de casino en direct, un générateur de nombres aléatoires (RNG) est toujours utilisé pour assurer l’intégrité des jeux de casino en déterminant le résultat aléatoire de ces jeux.</p>
                <p class="mb-5">Il s’agit d’un système standard de l’industrie qui garantit des résultats véritablement aléatoires et qui a été largement testé en exécutant et en analysant des milliers de tours de jeu. L’aléatoire du RNG crée un environnement de jeu crédible et équitable.</p>
                <p class="mb-5">La valeur du retour au joueur (RTP) est un calcul théorique du pourcentage attendu des mises qu’un jeu spécifique rendra au joueur après un grand nombre de parties (par exemple, des centaines de millions). Bien que chaque partie soit imprévisible et puisse entraîner un gain ou une perte, la moyenne à long terme se rapprochera du RTP théorique.</p>
                <p class="mb-5">Nous surveillons régulièrement les taux de paiement des joueurs et coopérons avec les autorités de régulation des jeux pour garantir le respect des lois applicables.</p>
            </div>
        `
    },
    'fairness': {
        title: 'Métodos de teste de imparcialidade e RNG',
        subtitle: 'Jogo justo',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <h3 class="font-bold">2. Âmbito</h3>
                <p class="mb-5">As disposições incluídas neste processo de prevenção de branqueamento de capitais têm como objetivo reduzir a possibilidade de que o negócio de prestação de serviços da Mirage Corporation seja utilizado para fins criminosos ou em violação das regulamentações.</p>
                <p class="mb-5">Este processo fornece orientação detalhando a responsabilidade em relação à prevenção do branqueamento de capitais e do financiamento do terrorismo do ponto de vista do quadro jurídico e das regulamentações internacionais aceites nesta área.</p>
                <h3 class="font-bold">3. Lei, Regulações e Regras</h3>
                <p class="mb-5">O Código Penal de Curaçao estabelece os procedimentos para a perseguição de crimes de branqueamento de capitais, bem como medidas de confiscação de bens após condenação, medidas de liquidação de bens quando uma pessoa é acusada de branqueamento de capitais e medidas para emissão de mandado de busca e/ou penhora quando se suspeita que uma pessoa cometeu branqueamento de capitais.</p>
                <p class="mb-5">As políticas e os procedimentos constantes deste manual visam cumprir as regras e orientações contidas no NOPML, NORUT e NOIS, que se referem ao Código Penal. Para além dessas regulamentações, o Banco Central de Curaçao e São Martinho introduziu um quadro abrangente com disposições e directrizes para prevenir e combater o branqueamento de capitais e o financiamento do terrorismo (doravante: as “Disposições & Directrizes” ou “P&G”), que se baseiam, entre outros, nas recomendações do FATF.</p>
                <p class="mb-5">Tanto o NORUT como o NOIS aplicam-se a entidades que oferecem a possibilidade de participação em jogos de azar offshore (jogos de azar online) dentro ou fora de Curaçao, o que é o caso da Companhia. O NOIS proíbe as pessoas obrigadas de estabelecer uma relação comercial ou realizar uma transacção ocasional com um requerente de negócios a menos que essa pessoa obrigada tenha em vigor as seguintes medidas e procedimentos em relação a esse negócio em conformidade com as disposições do NOIS:</p>
                <p class="mb-5">• medidas de diligência devida do cliente;</p>
                <p class="mb-5">• procedimentos de manutenção de registos; e</p>
                <p class="mb-5">• procedimentos de comunicação interna.</p>
                <p class="mb-5">A Companhia é obrigada a aplicar as medidas e procedimentos mencionados acima, mesmo nos casos em que estabeleça ou celebre relações ou transacções não presenciais, directa ou indirectamente, através da sua empresa coligada do grupo.</p>
                <p class="mb-5">A Companhia é também obrigada a garantir que os empregados sejam informados da legislação aplicável em matéria de AML/CFT, bem como das políticas e medidas da pessoa sujeita a essa legislação neste âmbito. Os empregados devem submeter‐se a procedimentos de diligência devida apropriados antes da sua contratação e espera‐se também que sejam formados para identificar e tratar transacções realizadas por, ou em nome de, qualquer pessoa que tenha estado, esteja ou aparente estar envolvida em branqueamento de capitais ou financiamento do terrorismo.</p>
                <h3 class="font-bold">4. Política</h3>
                <h3 class="font-bold">Responsabilidade</h3>
                <h3 class="font-bold">Risco de AML</h3>
                <h3 class="font-bold">A Mirage Corporation utiliza as seguintes orientações como base para o seu modelo de risco de AML:</h3>
                <h3 class="font-bold">Factores de risco de AML</h3>
                <p class="mb-5">A responsabilidade última pela política de prevenção de branqueamento de capitais da Mirage Corporation cabe ao Director.</p>
                <p class="mb-5">Será mantido um panorama geral da avaliação de risco de negócio de AML para atribuir e acompanhar os componentes das classificações de risco separadas. A Mirage Corporation categoriza o risco global de AML em:</p>
                <p class="mb-5">• Risco do cliente</p>
                <p class="mb-5">• Risco de produto</p>
                <p class="mb-5">• Risco de interface</p>
                <p class="mb-5">• Risco geográfico</p>
                <p class="mb-5">Políticas e procedimentos de AML</p>
                <p class="mb-5">As políticas e os procedimentos implementados pela Mirage Corporation para cumprir os requisitos regulamentares aplicáveis em matéria de AML e CFT estão documentados neste Manual. As políticas e procedimentos serão revistos periodicamente para garantir que permanecem em conformidade com os requisitos regulamentares e com o ambiente de risco em evolução aplicável à Mirage Corporation.</p>
                <p class="mb-5">• uma declaração clara da cultura e dos valores adotados para a prevenção do crime financeiro;</p>
                <p class="mb-5">• um compromisso de garantir que a identidade seja verificada de forma satisfatória em todos os casos e com base em risco, antes de que os solicitantes de negócios sejam aceitos como clientes;</p>
                <p class="mb-5">• um compromisso com a diligência devida contínua do cliente ao longo de toda a relação comercial;</p>
                <p class="mb-5">• um compromisso de garantir que o pessoal seja treinado e esteja consciente da lei, das suas obrigações legais e de como cumpri-las;</p>
                <p class="mb-5">• uma clara atribuição de papéis, responsabilidades e estrutura organizativa, e reconhecimento da importância de que o pessoal comunique internamente as suas suspeitas em tempo útil.</p>
                <p class="mb-5">Os procedimentos contidos neste Manual refletem a Política global de AML da Mirage Corporation e devem ser cumpridos por todo o pessoal da Mirage Corporation.</p>
                <h3 class="font-bold">5. Avaliação de riscos, gestão e abordagem baseada em risco</h3>
                <h3 class="font-bold">Avaliação de riscos</h3>
                <h3 class="font-bold">Avaliação de risco de crime financeiro</h3>
                <h3 class="font-bold">Mitigação de riscos</h3>
                <h3 class="font-bold">Controlo de monitorização</h3>
                <p class="mb-5">Os procedimentos de implementação estabelecem que o propósito dos procedimentos de avaliação de riscos é permitir que a Companhia esteja em posição de identificar e avaliar os riscos de ML/FT a que a pessoa obrigada está ou pode estar exposta e assim determinar:</p>
                <p class="mb-5">A abordagem baseada em risco para a prevenção do crime financeiro está refletida na abordagem da Mirage Corporation para desenvolver e operar os seus sistemas e controlos projetados para minimizar o risco de que a Mirage Corporation seja utilizada para fins de crime financeiro. O risco é fundamental para o desenvolvimento de negócios, novos produtos, desenvolvimento da funcionalidade do produto ou operação em novos mercados.</p>
                <p class="mb-5">Quando a Mirage Corporation aborda um novo serviço, segmento de clientes ou geografia, a avaliação de risco de crime financeiro será atualizada durante o desenvolvimento/lançamento (para garantir que os processos de AML possam apoiar as novas atividades).</p>
                <p class="mb-5">As avaliações de risco de crime financeiro são realizadas continuamente e, em particular, aplicam-se quando o ambiente de negócio muda por exemplo através de:</p>
                <p class="mb-5">• Entrada em novos mercados; e</p>
                <p class="mb-5">• O desenvolvimento de novos produtos ou funcionalidades do produto.</p>
                <p class="mb-5">Os controlos internos enfocam-se em:</p>
                <p class="mb-5">• Diligência devida do cliente, incluindo níveis de diligência reforçada com base na avaliação de risco de cada cliente;</p>
                <p class="mb-5">• Avaliar os riscos e estabelecer medidas para mitigar os riscos identificados;</p>
                <p class="mb-5">• Quando necessário aplicar diligência devida reforçada;</p>
                <p<class="mb-5">• Monitorizar os indicadores chave de risco para re-avaliar o risco de um cliente específico;</p>
            </div>
        `
    },
    'aml': {
        title: 'Política AML',
        subtitle: 'Prevenção à Lavagem de Dinheiro e Financiamento ao Terrorismo',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">A ValorBet está totalmente comprometida em prevenir qualquer forma de lavagem de dinheiro, financiamento do terrorismo ou outras atividades financeiras ilegais em sua plataforma. Nossa Política de Prevenção à Lavagem de Dinheiro (AML) e de Combate ao Financiamento ao Terrorismo (CFT) foi desenvolvida para garantir a conformidade com as leis e regulamentos internacionais, incluindo as recomendações do FATF e a legislação local aplicável.</p>

                <p class="mb-5">Monitoramos ativamente todas as transações e atividades de nossos clientes para identificar e prevenir qualquer comportamento suspeito. Ao manter operações transparentes e rastreáveis, a ValorBet assegura o mais alto nível de confiança e integridade em todos os processos financeiros.</p>

                <p class="mb-5"><b>1. Verificação do Cliente (KYC)</b><br>
                Todo cliente deve passar pelo processo “Conheça Seu Cliente” (KYC) antes de realizar depósitos, saques ou participar de qualquer atividade de jogo. O procedimento KYC inclui verificação de identidade, confirmação de endereço e validação de idade. Podemos solicitar cópias de documentos como carteira de identidade, passaporte, carteira de motorista ou conta de serviço público.</p>

                <p class="mb-5"><b>2. Monitoramento de Transações</b><br>
                Todas as transações na plataforma ValorBet são monitoradas continuamente. Atividades incomuns ou inconsistentes podem levar à suspensão temporária da conta enquanto conduzimos verificações adicionais. Reservamo-nos o direito de relatar qualquer transação suspeita às autoridades financeiras competentes sem aviso prévio ao cliente.</p>

                <p class="mb-5"><b>3. Atividades Proibidas</b><br>
                A ValorBet proíbe estritamente os clientes de usarem suas contas para qualquer finalidade relacionada à lavagem de dinheiro, fraude ou financiamento do terrorismo. É proibido usar várias contas, métodos de pagamento de terceiros ou quaisquer ferramentas destinadas a mascarar a origem dos fundos.</p>

                <p class="mb-5"><b>4. Retenção de Registros</b><br>
                Todos os dados de identificação do cliente, histórico de transações e registros de comunicação são armazenados com segurança por pelo menos 5 anos após o término da relação com o cliente. Isso garante que todos os dados necessários estejam disponíveis para qualquer investigação oficial.</p>

                <p class="mb-5"><b>5. Treinamento de Funcionários</b><br>
                Todos os funcionários da ValorBet recebem treinamento regular para reconhecer e responder a possíveis casos de lavagem de dinheiro e fraude. Garantimos que nossa equipe esteja sempre atualizada com os padrões regulatórios e as melhores práticas do setor.</p>

                <p class="mb-5"><b>6. Cooperação com as Autoridades</b><br>
                A ValorBet coopera integralmente com autoridades financeiras, órgãos reguladores e de aplicação da lei, tanto internacionais quanto locais. Garantimos total transparência e acesso oportuno às informações quando exigido por lei.</p>

                <p class="mb-5"><b>7. Obrigações de Relato</b><br>
                Caso detectemos ou suspeitemos de qualquer atividade ilegal ou suspeita, somos legalmente obrigados a relatar o caso à autoridade competente. A conta do cliente poderá ser congelada até a conclusão da investigação.</p>

                <p class="mb-5">Ao registrar-se na ValorBet, o cliente concorda em cumprir esta Política AML/CFT e reconhece que fornecer informações falsas ou tentar burlar os procedimentos de verificação pode resultar no encerramento permanente da conta e perda de fundos.</p>

                <p class="mb-5"><b>Informações de Contato</b><br>
                Para quaisquer dúvidas relacionadas à AML, entre em contato: <br>
                <b>Email:</b> compliance@valor.bet
                </p>
            </div>
        `
    },
    'self-exclusion': {
        title: 'Política de Autoexclusão',
        subtitle: 'Jogo Responsável',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">Na ValorBet, estamos comprometidos em promover o jogo responsável e em fornecer aos jogadores ferramentas para manter o controlo sobre o seu comportamento de jogo. Se em algum momento sentir que a sua atividade de jogo está a afetar negativamente a sua vida, pode solicitar uma autoexclusão temporária ou permanente.</p>
                <p class="mb-5">A autoexclusão significa que a sua conta será encerrada por um período específico ou indefinidamente, e não poderá aceder aos nossos serviços de jogo durante esse tempo.</p>
                <p class="mb-5">Para iniciar uma autoexclusão, contacte a nossa equipa de apoio através do e-mail <b>support@valor.bet</b> e indique o período pelo qual deseja ser excluído (por exemplo, 6 meses, 1 ano ou permanentemente).</p>
                <p class="mb-5">Uma vez ativada a autoexclusão, ela não pode ser revertida até que o período selecionado expire. Durante este tempo, não receberá materiais promocionais nem ofertas da ValorBet.</p>
                <p class="mb-5">Recomendamos também que procure ajuda junto de organizações especializadas em vícios de jogo, caso sinta que está a perder o controlo. Alguns recursos úteis incluem:</p>
                <ul class="mb-5 list-disc ml-6">
                    <li>GamCare (www.gamcare.org.uk)</li>
                    <li>Gambling Therapy (www.gamblingtherapy.org)</li>
                    <li>Jogadores Anónimos (www.gamblersanonymous.org)</li>
                </ul>
                <p class="mb-5">Na ValorBet, a sua segurança e bem-estar são as nossas principais prioridades. Jogue com responsabilidade.</p>
            </div>
        `
    },
    'kyc': {
        title: 'Política de KYC',
        subtitle: 'Verificação e Identificação',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">Como parte do nosso compromisso em manter um ambiente de jogo seguro e transparente, a Mirage Corporation N.V. implementa uma rigorosa política de Conheça Seu Cliente (KYC). Esta política garante que a identidade dos nossos clientes seja verificada, prevenindo fraudes, lavagem de dinheiro e o uso indevido dos nossos serviços.</p>
                <h3 class="font-bold">1. Propósito</h3>
                <p class="mb-5">O objetivo da Política de KYC é estabelecer a identidade de todos os jogadores e verificar a origem dos seus fundos quando necessário. Isto faz parte do nosso cumprimento das obrigações de Prevenção à Lavagem de Dinheiro (AML) e Combate ao Financiamento do Terrorismo (CFT).</p>
                <h3 class="font-bold">2. Identificação e Verificação</h3>
                <p class="mb-5">Os jogadores devem fornecer informações pessoais precisas e verificáveis durante o registro. Isso inclui, mas não se limita a, nome completo, data de nascimento, endereço e documentos de identificação válidos, como passaporte, documento de identidade nacional ou carteira de motorista.</p>
                <p class="mb-5">Reservamo-nos o direito de solicitar documentos adicionais para verificar sua identidade ou a origem dos fundos, como comprovante de endereço (conta de serviços públicos ou extrato bancário) ou informações relacionadas aos métodos de pagamento usados na plataforma.</p>
                <h3 class="font-bold">3. Momento da Verificação</h3>
                <p class="mb-5">A verificação pode ocorrer durante o registro, antes de retiradas ou a qualquer momento que a Empresa considerar necessário confirmar a autenticidade das informações do usuário. As contas podem ser temporariamente suspensas até que a verificação seja concluída com sucesso.</p>
                <h3 class="font-bold">4. Proteção de Dados</h3>
                <p class="mb-5">Todas as informações e documentos fornecidos durante o processo de KYC são tratados com estrita confidencialidade e processados de acordo com as leis de proteção de dados aplicáveis. Os dados são armazenados com segurança e usados apenas para verificação de identidade e fins de conformidade.</p>
                <h3 class="font-bold">5. Falha em Cumprir</h3>
                <p class="mb-5">A não apresentação dos documentos solicitados ou tentativas de enviar informações falsas ou enganosas podem resultar na suspensão da conta, restrição de serviços e, se necessário, comunicação às autoridades regulatórias.</p>
                <h3 class="font-bold">6. Monitoramento Contínuo</h3>
                <p class="mb-5">A Mirage Corporation monitora continuamente as transações e o comportamento dos jogadores para identificar atividades suspeitas. Em caso de qualquer irregularidade, poderá ser iniciada uma nova verificação ou revisão da conta.</p>
                <p class="mb-5">Ao utilizar nossos serviços, os jogadores reconhecem e concordam em cumprir esta Política de KYC como parte dos Termos e Condições da Mirage Corporation.</p>
            </div>
        `
    },
    'dispute-resolution': {
        title: 'Resolução de Disputas',
        subtitle: 'Solução de Conflitos',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">A resolução de disputas é um termo utilizado tanto no direito comercial como no direito privado. Em essência, significa resolver um conflito entre duas ou mais partes.</p>
                <p class="mb-5">O que pode complicar o processo é o método escolhido, já que cada forma de resolução tem diferenças quanto a custo, confidencialidade, acessibilidade e rapidez.</p>
                <p class="mb-5">Para falar com a nossa equipa de resolução de disputas, envie um e-mail para <a href="mailto:support@valor.bet">support@valor.bet</a>.</p>
                <p class="mb-5"><span>Discussões preliminares e negociações informais</span> – A forma mais económica de resolver disputas, geralmente feita antes de qualquer processo formal. As partes podem reunir-se com ou sem advogados para tentar chegar a um acordo.</p>
                <p class="mb-5"><span>Mediação</span> – Processo em que um mediador independente ajuda as partes a chegar a um acordo. O mediador permanece neutro e o processo é confidencial, rápido e menos dispendioso que o litígio.</p>
                <p class="mb-5"><span>Arbitragem</span> – Procedimento legal mais formal em que um ou mais árbitros analisam as provas e tomam uma decisão. É privado e frequentemente mais flexível e rápido do que o litígio tradicional.</p>
                <p class="mb-5"><span>Litígio</span> – Processo legal formal perante um tribunal. Pode ser caro e demorado, mas o resultado é juridicamente vinculativo.</p>
                <p class="mb-5"><span>Resolução Alternativa de Disputas (ADR)</span> – Termo usado para descrever métodos de resolução de disputas fora dos tribunais, como a mediação ou a arbitragem.</p>
                <p class="mb-5">Antes de iniciar qualquer processo, verifique se o seu contrato contém cláusulas específicas de resolução de disputas.</p>
            </div>
        `
    },
    'general-terms': {
        title: 'Termos e Condições',
        subtitle: '',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block"><p class="mb-5">Introdução: www.Valor.Bet</p><p class="mb-5">1Win N.V. que está registrada na Dr. H. Fergusonweg 1, Curaçao, com o número da empresa 147039, e possuindo um Certificado de Operação, emitido para aplicação de licença de jogo nº OGL/2024/587/0621 para a Curaçao Gaming Control Board, e todos os direitos de operar o software de jogos. Os pagamentos são processados por MFI INVESTMENTS LIMITED (número de registro: HE 386738, endereço: Avlidos St. 4, Mesa Geitonia, 4002, Limassol, Chipre), subsidiária da empresa 1Win N.V.</p><p class="mb-5">As informações no site são fornecidas pelo operador do site - a empresa ValorBet N.V., registrada no endereço: Palm Avenue 10, Rosebank, Sint Maarten. A atividade da empresa ValorBet N.V. é licenciada e regulada pela IslandGames N.V. (número da licença: No. 1234/JAZ2021-567; válida até 31 de dezembro de 2025) e pela legislação de Sint Maarten. Os pagamentos são processados pela Global Invest Solutions Ltd (número de registro: HE 654321, endereço: Ocean Drive 22, Mesa Verde, 5678, Limassol, Chipre), uma subsidiária da ValorBet N.V.</p><h2>Termos e Condições Gerais</h2><h3>AS DISPOSIÇÕES PRINCIPAIS</h3><h3>DEFINIÇÕES E TERMOS BÁSICOS</h3><h3>REGRAS DE CONTA</h3><h3> CRIAÇÃO DE CONTA </h3><h3>POLÍTICA DE MENORES</h3><h3>IDENTIFICAÇÃO DO CLIENTE</h3><h3>REGISTRO MÚLTIPLO</h3><h3>PAGAMENTO DE GANHOS</h3><h3>REGULAÇÃO / RESTRIÇÕES LEGAIS</h3><p class="mb-5">1. A empresa de apostas ValorCasino aceita apostas em eventos esportivos e outros eventos que ocorrem em todos os países do mundo</p><p class="mb-5">1. 1. Cancelamento das apostas;</p><p class="mb-5">2. 2. Fechamento da conta do cliente sem reembolso subsequente;</p><p class="mb-5">3. Qualquer aposta feita serve como confirmação de que o cliente concorda e aceita as seguintes Regras de Apostas.</p><p class="mb-5">6. A empresa de apostas não aceita reclamações sobre discrepâncias textuais na transliteração (tradução de línguas estrangeiras) de nomes de equipes, nomes de jogadores, locais de competição. Todas as informações fornecidas no nome do torneio são informativas. Possíveis erros nessas informações não são base para o cancelamento de apostas.</p><p class="mb-5">7. Todos os eventos esportivos serão considerados adiados e cancelados somente se houver informações dos documentos oficiais das organizações que realizam competições esportivas, sites oficiais das federações esportivas, sites de clubes esportivos e outras fontes de informação esportiva, e eventos esportivos especificados na linha são corrigidos com base nesses dados.</p><p class="mb-5">8. As apostas em campeonatos regionais (futebol, futsal, hóquei, etc.) são calculadas em até 7 dias (após a publicação dos resultados nos sites oficiais desses campeonatos). A lista de sites oficiais pode ser encontrada na seção 'Principais fontes de informação'. Em caso de ausência de uma das equipes na partida, todas as apostas serão pagas com o coeficiente '1' (retorno). A equipe que não participou da partida é premiada com uma vitória por W.O.</p><p class="mb-5">Estas Regras de Apostas e Pagamentos da empresa de apostas ValorCasino (doravante referida como 'Regras') determinam a ordem de aceitação de apostas, pagamentos, resolução de questões controversas, aspectos específicos de apostas em certos esportes. Estas Regras regulam todas as outras relações entre os participantes da empresa de apostas ValorCasino e o cliente. Estas Regras se aplicam aos clientes do site ValorCasino.com e de sites afiliados. Aposta - um acordo sobre a vitória concluído entre o cliente e a empresa de apostas, de acordo com as regras estabelecidas, enquanto o resultado deste acordo depende do evento, sobre o qual é desconhecido se acontecerá ou não. A aceitação de apostas dos clientes ocorre nos termos oferecidos pela empresa de apostas. Resultado - um resultado do evento (eventos) no qual a aposta foi colocada. Cliente - uma pessoa que coloca surgir no resultado do evento na empresa de apostas. Linha - um conjunto de eventos, resultados possíveis desses eventos, coeficientes sobre os resultados possíveis desses eventos, sua data e hora, após a qual a empresa de apostas para de aceitar apostas nos resultados desses eventos. Cancelamento de aposta - um evento para o qual o cálculo e o pagamento não são feitos. Em caso de 'cancelamento de aposta', de acordo com estas regras, a transação entre o organizador e o cliente é considerada nula e sem efeito, e um reembolso é feito para tal aposta. Tempo normal de jogo é a duração da partida de acordo com as regras desse esporte, incluindo o tempo de acréscimo adicionado pelo árbitro. O tempo normal de jogo não inclui tempo de acréscimo, prorrogação, disputa de pênaltis, etc.</p><p class="mb-5">1 Um indivíduo não pode participar de um jogo por dinheiro, a menos que seja um titular de conta. Para se registrar como jogador (ser capaz de fazer apostas), um indivíduo deve enviar uma solicitação de registro e fornecer pelo menos as seguintes informações: data de nascimento (mostrando que o jogador tem mais de dezoito (18) anos); primeiro e último nome do jogador; local de residência do jogador; endereço de e-mail válido do jogador; um nome de usuário e uma senha.</p><p class="mb-5">2 Um indivíduo que se candidata a se tornar um Titular de Conta garante e declara ainda: ser uma pessoa física (uma entidade jurídica não será aceita como Titular de Conta); não ser residente em: Aruba, Afeganistão, Albânia, Argélia, Angola, Austrália, Bahamas, Bonaire, Botswana, Camboja, Curaçao, Equador, Etiópia, França, Gana, Guiana, Hong Kong, Irã, Iraque, Israel, Itália, Kuwait, Laos, Mianmar, Namíbia, Nicarágua, Coreia do Norte, Holanda, Paquistão, Panamá, Papua Nova Guiné, Filipinas, Cingapura, Espanha, Sri Lanka, Sudão, Síria, Taiwan, Trinidad e Tobago, Tunísia, Uganda, Reino Unido, Estados Unidos da América, Saba, Statia, St.Martin, Iêmen, Zimbábue. (esteja ciente das exclusões particulares de países para Jogos de Cassino, Cassino ao Vivo, Poker e Bingo); não ser um jogador profissional em qualquer esporte, competição ou liga onde a ValorCasino oferece apostas; não ter capacidade legal limitada; não estar agindo em nome de outra parte; não ser classificado como um jogador compulsivo e/ou estar incluído (voluntariamente ou involuntariamente) em qualquer registro ou banco de dados de jogadores excluídos; não estar depositando dinheiro proveniente de atividades criminosas e/ou outras atividades não autorizadas; não fazer depósitos de dinheiro através de um Cartão que o Titular da Conta não está autorizado a usar e/ou utilizar um Cartão em uma jurisdição onde apostas e jogos são proibidos; não realizar atividades criminosas em que uma Conta ValorCasino esteja diretamente ou indiretamente envolvida; não usar os Serviços se for ilegal em seu país de residência ou de outra forma restrito para ele/ela abrir uma conta de jogo, comprar ou usar serviços da ValorCasino e/ou participar dos jogos oferecidos. É responsabilidade do Titular da Conta garantir que seu uso do Website e dos Serviços da ValorCasino seja legal; não achar o Website ou os Serviços ofensivos, objetáveis, injustos, nem indecentes; manter atualizados os detalhes de sua Conta ValorCasino em termos de: nome e sobrenome, país de residência, endereço de e-mail válido e número de telefone. Não criar várias contas.</p><p class="mb-5">3 Um indivíduo que se candidata ao registro garante e declara que todas as informações fornecidas em seu formulário de inscrição são verdadeiras e corretas. Caso contrário, a ValorCasino não registrará o indivíduo. Em caso de dúvida sobre a precisão dos dados de uma conta já criada, a ValorCasino BC reserva-se o direito de solicitar ao participante do jogo qualquer documento de escolha da empresa que confirme sua identidade e outros dados transmitidos pelo participante do jogo, bem como cancelar qualquer pagamento até que todas as informações tenham sido verificadas. A empresa de apostas tem o direito de solicitar o envio de documentos por correio. A verificação de documentos pode durar até 72 horas a partir do momento do recebimento dos documentos. Se for comprovado que as informações recebidas não são confiáveis, a empresa tem o direito de cancelar indefinidamente todas as apostas e suspender todos os pagamentos em dinheiro, bem como continuar verificando a conta, solicitando um pacote de documentos necessários para verificação confiável da conta.</p><p class="mb-5">2. Usuários dos Estados Unidos, França, Reino Unido, Espanha e Itália estão proibidos de jogar no ValorCasino.</p><p class="mb-5">Se você tem menos de 18 anos, por favor, não tente se registrar na empresa de apostas ValorCasino. A ValorCasino é uma operadora de jogos socialmente responsável e aplica a estratégia de restringir o acesso aos jogos de azar para pessoas menores de 18 anos. A empresa verifica os apostadores, portanto, se você registrar uma conta no site BC ValorCasino, temos o direito de solicitar seus documentos para comprovação de sua idade e identidade. Você não pode transferir, vender ou dar como garantia sua Conta para outra pessoa. Essa proibição inclui a transferência de quaisquer ativos de valor de qualquer tipo, incluindo, mas não se limitando à propriedade de contas, ganhos, depósitos, apostas, direitos e/ou reivindicações relacionados a esses ativos, legais, comerciais ou outros. A proibição dessas transferências também inclui, mas não se limita a, o ônus, a garantia, a atribuição, o usufruto, a negociação, a corretagem, a hipoteca e/ou a doação em cooperação com um fiduciário ou qualquer outra terceira parte, empresa, pessoa física ou jurídica, fundação e/ou associação de qualquer maneira ou forma.</p><p class="mb-5">De acordo com a Política de Prevenção à Lavagem de Dinheiro, a Empresa realiza verificações de identidade iniciais e contínuas dos Usuários da Empresa de acordo com o nível de risco potencial associado a cada usuário. A empresa exigirá que você forneça informações mínimas para verificar sua identidade. A empresa registrará e salvará os dados e documentos que comprovem sua identidade, bem como informações sobre quais métodos foram usados para verificar sua identidade e os resultados das verificações. A empresa pode verificar seus dados pessoais em relação à lista de pessoas suspeitas de terrorismo, formada por órgãos autorizados do Estado e independentes. O conjunto mínimo de dados de identificação inclui: o nome completo do Usuário; data de nascimento (para pessoas físicas); o endereço residencial ou o endereço de registro do Usuário; a fonte dos fundos que serão depositados na conta da empresa. Para verificar e confirmar a autenticidade dos dados acima, a Empresa pode solicitar os seguintes documentos do Usuário: passaporte ou carteira de identidade, ou outro documento que os substitua, que atenda aos seguintes requisitos: - contém o nome, data de nascimento e foto do titular do documento; - foi emitido por agências governamentais nacionais, fatura recente para pagamento de serviços públicos (não mais antiga que 3 meses) ou outro documento que possa confirmar o endereço residencial do Usuário. A empresa também pode solicitar identificação por vídeo ou outras informações adicionais, com documentos relevantes. Em certos casos, a Empresa também pode solicitar cópias notarizadas de documentos do Usuário.</p><p class="mb-5">Cada cliente registrado pode ter apenas uma conta. Ao se registrar no site, aplica-se a seguinte regra para: uma família, um endereço, um endereço de e-mail, um número de cartão de crédito/débito ou um endereço IP. A administração da empresa reserva o direito de solicitar dados mais precisos do cliente (dados do passaporte, permissão de residência, registro) e de passar por uma conferência de vídeo. Um cliente registrado não pode ser registrado novamente como novo cliente (com um novo nome, com um novo endereço de e-mail, etc.). Em caso de confirmação do fato de re-registro (incluindo sob um novo nome), fornecimento de documentos inválidos, falsos ou de outras pessoas (incluindo documentos modificados com a ajuda de vários programas e editores gráficos), a administração reserva o direito de cancelar as apostas feitas a partir de tal conta. Em caso de recusa em se submeter ao procedimento de verificação, a administração tem o direito de cancelar as apostas. A administração também reserva o direito de bloquear tal conta (re-registrada) pelo período do processo (até 2 meses). A pedido do cliente, uma exceção individual pode ser feita pela administração da ValorCasino.</p><p class="mb-5">Um cliente registrado não pode se registrar novamente como um novo cliente (com um novo nome, com um novo endereço de e-mail, etc.). Em caso de confirmação do fato de re-registro (incluindo sob um novo nome), fornecimento de documentos inválidos, falsos ou de outras pessoas (incluindo documentos modificados com a ajuda de vários programas e editores gráficos), a administração reserva o direito de cancelar as apostas feitas a partir de tal conta. Em caso de recusa em passar pelo procedimento de verificação, a administração tem o direito de cancelar as apostas. A administração também reserva o direito de bloquear tal conta (re-registrada) durante o período de investigação (até 2 meses). A pedido do cliente, uma exceção individual pode ser feita pela administração da ValorCasino.</p><p class="mb-5">1. O cálculo dos lucros do jogador é feito dentro de 30 (trinta) dias corridos a partir da data da publicação oficial dos resultados do último evento, que podem ser rastreados no histórico de apostas.</p><p class="mb-5">2. Depois que o lucro é calculado, o apostador é obrigado a verificar a correção do pagamento calculado e, em caso de discordância sobre o pagamento calculado, notificar a empresa de apostas especificando o número da sua conta, a data da aposta, o horário, o evento, a quantidade de dinheiro, o resultado selecionado do evento, o coeficiente, bem como as razões para a discordância com o pagamento calculado. Todas as reclamações sobre pagamentos calculados são aceitas dentro de 10 (dez) dias.</p><p class="mb-5">3. Uma aposta feita pelo cliente em um determinado resultado de um evento é considerada vencida se todos os resultados especificados nessa aposta forem previstos corretamente.</p><p class="mb-5">4. O serviço de segurança da empresa de apostas ValorCasino tem o direito de restringir um saque por qualquer um dos métodos disponíveis, se o valor do depósito ou saque de fundos da conta de jogo não corresponder ao valor das apostas realizadas (o cliente deve fazer apostas no valor do depósito em 'Esportes' com odds não inferiores a 1,3, apostas em 'TOTO', 'Cassino', 'Jogos ao vivo', 'Cassino ao vivo' e 'Esportes virtuais'). O critério para saque será o valor das apostas feitas dentro deste depósito.</p><p class="mb-5">As apostas são aceitas por pessoas que atingiram a idade de 18 anos ou a idade de maioria em sua jurisdição (a idade deve ser superior a 18 anos) que concordam com as Regras de aceitação de apostas oferecidas pela casa de apostas. As apostas não são aceitas: por pessoas que não atingiram a idade de 18 anos no momento da realização da aposta; por pessoas que participam dos eventos em que as apostas são feitas (atletas, treinadores, árbitros, proprietários ou funcionários de clubes e outras pessoas que têm a capacidade de influenciar o resultado do evento), bem como por outras pessoas que atuam em seu nome; por pessoas que representam os interesses de outras casas de apostas; por outras pessoas cuja participação no acordo com a empresa de apostas é proibida pela lei aplicável. 3. O participante da aposta é responsável por violação da cláusula 2. dessas Regras. Em caso de violação dessas Regras, a casa de apostas se reserva o direito de recusar o pagamento de quaisquer ganhos ou devolver os valores depositados, bem como cancelar quaisquer apostas. A empresa de apostas não tem qualquer responsabilidade quanto ao momento em que se torna conhecido que o cliente pertence a uma das categorias de pessoas listadas. Isso significa que a casa de apostas tem o direito de tomar essas medidas a qualquer momento após saber que o cliente é uma das pessoas designadas. 4. A empresa de apostas tem o direito de não aceitar apostas de clientes que não cumpram essas Regras. A empresa de apostas se reserva o direito de recusar ao cliente a aceitação de qualquer tipo de apostas se o cliente violar as normas públicas de comportamento e ordem pública. 5. A empresa de apostas se reserva o direito de recusar a aceitar uma aposta de qualquer pessoa sem dar qualquer motivo. 6. Todos os cálculos de apostas são baseados nas informações fornecidas pelo centro de processamento. 7. A empresa reserva-se o direito de fechar a conta de jogo e cancelar todas as apostas feitas nesta conta se constatar que: o participante da aposta no momento da realização da aposta tinha informações sobre o resultado do evento; o participante da aposta tinha a oportunidade de influenciar o resultado do evento sendo um participante direto na partida (atletas, árbitros, treinadores, etc.) ou uma pessoa agindo em seu nome; as apostas são feitas por um grupo de participantes de apostas agindo em conjunto (um sindicato) a fim de exceder os limites estabelecidos pela empresa; um participante da aposta tem várias contas de jogos (registro múltiplo); o participante da aposta é suspeito de usar software especial ou meios técnicos para automatizar o processo de apostas; foram usados meios desonestos para obter informações ou contornar os limites e restrições estabelecidos pela empresa.O saldo da conta do cliente nas situações descritas acima pode não ser reembolsável após a conclusão do processo, a critério da empresa de apostas. Nesse caso, o valor do saldo é determinado sem levar em consideração a renda obtida desonestamente. 9. A empresa se reserva o direito de não compensar as perdas do jogador em comissões de sistemas de pagamento ao depositar e/ou sacar fundos da conta (da conta) da empresa de apostas ValorCasino. A empresa se reserva o direito de conduzir o processo de confirmação da identidade do proprietário por meio de videoconferência e solicitar documentos de identidade. 10. Se o serviço de segurança da empresa de apostas tiver dúvidas sobre a identidade do participante da aposta ou sobre a confiabilidade das informações fornecidas (endereço, cartão de crédito ou débito ou outros dados), eles têm o direito de solicitar quaisquer documentos do participante da aposta à escolha da empresa, confirmando a identidade e outros dados transmitidos pelo cliente, bem como cancelar quaisquer pagamentos até que todas as informações tenham sido verificadas. A verificação de documentos pode levar até 24 horas a partir do momento em que os documentos são recebidos. Se for comprovado que as informações recebidas não são confiáveis, a empresa tem o direito de cancelar todas as taxas e suspender todos os acordos em dinheiro por um período indeterminado. 11.O proprietário da conta confirma/aceita que todas as ações realizadas na conta são realizadas por ele/ela independentemente. Se as ações na conta forem realizadas por terceiros, o proprietário é o único responsável pelo acesso à conta. O proprietário da conta confirma/aceita que todas as ações realizadas na conta e usando seus detalhes são realizadas por ele/ela ou com sua permissão. Usuários de países onde as apostas esportivas são ilegais estão proibidos de usar o cartão bancário desse país para concluir uma transação no site. O proprietário do cartão bancário é obrigado a estar ciente da legislação de seu país em relação às atividades de apostas. A participação em jogos de azar por pessoas menores de idade não é permitida, bem como o uso de cartões bancários dessas pessoas para fazer transações no site da casa de apostas. A empresa reserva-se o direito de atualizar o texto das regras e adicionar novas regras a qualquer momento. Nesse caso, novas regras ou uma nova edição das regras entram em vigor e serão aplicadas imediatamente após serem publicadas no site. Para evitar problemas, o ValorCasino lhe dá as seguintes orientações a seguir para garantir que você jogue de forma responsável: antes de começar o jogo, defina limites para si mesmo para uma certa quantidade de tempo e dinheiro que você pretende gastar. Jogue apenas com dinheiro que você pode perder. Não tente recuperar depois de perder. Evite jogos de azar se estiver sob a influência de álcool ou qualquer outra substância.</p><p class="mb-5">3. Em caso de modificações destas Regras, os clientes são notificados por meio de anúncios correspondentes. As apostas aceitas a partir da data especificada no anúncio estão sujeitas às Regras modificadas. As condições das apostas realizadas antes dessa data permanecem inalteradas.</p><p class="mb-5">4. Encorajamos o jogo como uma atividade de lazer agradável e acreditamos que o jogo pode estar presente em sua vida apenas se você se mantiver sob controle e jogar de forma responsável.</p><p class="mb-5">1. Em nenhuma circunstância a empresa de apostas ValorCasino será responsável por perdas ou danos indiretos, incidentais ou acidentais do cliente (incluindo perda de lucros), mesmo se tiverem sido notificados da possibilidade de tais perdas ou danos.</p><p class="mb-5">2. A falha na conexão à internet no momento da confirmação da aposta feita pelo cliente não é motivo para cancelamento da aposta.</p><p class="mb-5">3. Qualquer aposta feita serve como confirmação de que o cliente concorda e aceita as seguintes Regras de Apostas.</p><p class="mb-5">4. Somente os resultados dos eventos anunciados pela empresa de apostas são a base para o cálculo das apostas e definição dos ganhos. Reclamações relacionadas aos resultados dos eventos serão consideradas apenas com os documentos oficiais das federações esportivas relevantes.</p><p class="mb-5">5. Se houver suspeita de que um apostador cometeu ações fraudulentas contra a empresa de apostas (multi-conta, apostas feitas por terceiros, uso de software para automação de apostas, apostas de arbitragem, se a conta de apostas não é usada para apostas, abuso de programas de fidelidade, etc.), a empresa de apostas reserva o direito de impedir tais ações fraudulentas por:</p><h2>SOBRE A EMPRESA</h2><p class="mb-5">1. Os termos e condições para aceitar apostas (coeficientes, opções de resultados, combinações de tipos de apostas disponíveis, limites máximos de apostas, etc.) podem ser alterados a qualquer momento e são válidos para novas apostas do cliente, enquanto as condições de apostas anteriormente feitas permanecem inalteradas. Antes de entrar em um acordo, o cliente deve verificar todas as alterações na linha atual. 2. As apostas feitas em eventos cujo resultado é conhecido no momento da aposta podem ser calculadas com o coeficiente. 3. De acordo com estas Regras, em caso de desacordo entre o cliente (participante do acordo) e a empresa de apostas sobre questões relacionadas à execução e implementação do acordo concluído entre o cliente (participante do acordo) e a empresa de apostas, incluindo questões sobre pagamentos, resultados dos eventos, chances de ganhar, outras condições essenciais do acordo, bem como sobre o reconhecimento do acordo como não concluído ou inválido, as partes estabelecerão um procedimento obrigatório de reivindicação para a resolução de disputas (procedimento prévio ao julgamento). 4. Como parte do procedimento prévio à resolução de disputas, a parte que acredita que seus direitos foram violados é obrigada a apresentar uma reivindicação escrita correspondente à outra parte. Se o destinatário da reivindicação for uma empresa de apostas, a reivindicação deve ser feita em seu local (endereço legal) especificado nos documentos constituintes relevantes da empresa de apostas e confirmado pela extração relevante do registro de pessoas jurídicas. Se o destinatário da reivindicação for o cliente (participante do acordo), a reivindicação deve ser feita em seu local de residência (ou local de estadia). Todos os julgamentos também podem ser feitos por correspondência por e-mail: support@valor.bet  A reivindicação deve ser apresentada dentro de 10 (dez) dias a partir do dia em que a pessoa foi informada ou deveria ter sido informada sobre a violação de seus direitos. A reivindicação deve ser acompanhada por documentos que confirmem e justifiquem as demandas declaradas. Na ausência de demandas válidas e suficientes na reivindicação, a reivindicação será devolvida sem mais considerações. 6. Uma reivindicação válida é passível de consideração por não mais que 20 (vinte) dias a partir da data de seu recebimento pela parte. 7. Se a reivindicação não for considerada pela parte receptora dentro do prazo especificado, a parte que acredita que seus direitos foram violados tem o direito de encaminhar o assunto para um tribunal de justiça no local (endereço legal) da empresa de apostas. 8. A empresa reserva-se o direito de suspender a aceitação de apostas e o pagamento de ganhos (incluindo recusa, invalidação, pagamento dessas apostas com as odds "1"): Em caso de erros imprevistos (erros óbvios na lista proposta de eventos, inconsistência de odds na linha e taxas); No caso de uma mudança no formato da competição realizada em relação aos regulamentos originais, etc.; Se houver evidências de luta antidesportiva; Ao usar apostas repetidas nos mesmos resultados ou em resultados dependentes.</p><h2>REGRAS PARA ACEITAR APOSTAS E RESOLVER DISPUTAS (PROCEDIMENTO PRÉVIO AO JULGAMENTO)</h2><p class="mb-5">Por favor, informe o nome completo e sobrenome do proprietário da conta de pagamento a partir da qual o dinheiro será transferido. Não use informações pessoais de outras pessoas para retirar dinheiro.</p><h2>SENHA E SEGURANÇA DA CONTA</h2><p class="mb-5">A empresa ValorCasino oferece um dos tipos de bônus - 'Código Promocional'. O Código Promocional é um código alfanumérico fornecido ao cliente individualmente a critério da empresa de apostas. O código promocional pode conceder ao cliente acesso a fundos de bônus ou fornecer seguro/reembolso de aposta. No caso de cálculo de aposta com código promocional com coeficiente 1 (empate/cancelamento), o código promocional permanece disponível para uso pelo cliente pela segunda vez. As apostas com código promocional não podem ser combinadas com outras ofertas especiais, a menos que seja especificado nas regras de colocação do código promocional. Múltiplas contas não participam desta promoção. O bônus pode ser concedido apenas uma vez por uma conta, endereço, endereço de e-mail, número de cartão de crédito/débito ou endereço IP. A empresa reserva-se o direito de reter quaisquer apostas gratuitas se o serviço de segurança tiver preocupações em relação à violação das regras ou encontrar cadeias de apostas incomuns. O código promocional pode ser usado apenas uma vez por um cliente.</p><h2>PROMOÇÕES E BÔNUS</h2><p class="mb-5">1 A oferta de bônus está disponível para novos clientes da ValorCasino. A oferta de bônus está disponível para as seguintes moedas: EUR, USD, RUB, BYN, UAH, KZT, INR, IDR, THB, VND, TRY, PLN, BDT, KHR, KRW, MYR, BND, SGD, PKR, UZS, KES, UGX, GHS, TZS, XAF, NGN, CFA, XOF, AZN, IRR, CZK, BRL, PHP, AMD, GEL, RWF, MDL, KGS, TJS, NOK.</p><p class="mb-5">10 Somente o primeiro depósito tem direito ao bônus. Os fundos do bônus e os freespins serão creditados no saldo de bônus dentro de 72 horas a partir do momento do depósito promocional.</p><p class="mb-5">11 Bônus 'Esportes': para converter com sucesso os fundos de bônus em dinheiro real e retirá-los da conta de jogo, é necessário cumprir as seguintes condições dentro de 30 dias após a realização do primeiro depósito: colocar o bônus recebido em uma quantidade 5 vezes maior a partir da conta de bônus usando apostas em 'acumulador'. Pelo menos 3 eventos no acumulador devem ter coeficientes de pelo menos 1,40, o número máximo de eventos no acumulador é ilimitado. Se um jogador não conseguir cumprir as condições da promoção dentro do período de tempo especificado, o saldo de bônus é cancelado.</p><p class="mb-5">12 Bônus "Cassino": para converter com sucesso os fundos de bônus em reais e retirá-los de uma conta de jogo, é necessário multiplicar o valor do bônus recebido x60 nas seções "Cassino" de "Jogos ao Vivo" e "Esportes Virtuais", dentro de 72 horas após fazer o primeiro depósito. Por favor, note que nem em todos os jogos o valor da aposta é totalmente considerado ao cumprir os requisitos de aposta do bônus.</p><p class="mb-5">14 Se um jogador tiver fundos tanto no saldo Real quanto no saldo de Bônus, então todas as apostas serão feitas primeiramente com os fundos no saldo Real. Os fundos reais são usados para apostas até que o saldo Real seja igual a 0. Os fundos do saldo de Bônus serão usados para apostas somente se o saldo Real for igual a 0. Por favor, verifique a lista de jogos que estão disponíveis para jogo com saldo de Bônus nos Termos e Condições, seção Promoções e Bônus.</p><p class="mb-5">15 Nenhuma retirada pode ser feita antes de todas as condições da oferta serem cumpridas. As apostas que não cumprem as condições listadas nas cláusulas 10 e 11 destas regras não são consideradas ao apostar fundos de bônus.</p><p class="mb-5">16 As apostas calculadas após mais de 30 dias (esporte) e 72 horas (cassino) após a ativação da oferta de bônus não são consideradas.</p><p class="mb-5">17 Enquanto houver pelo menos uma conta de bônus aberta, o jogador pode retirar um valor de 0 ou superior ao total de depósitos apostados, desde que pelo menos duas vezes o valor nominal do bônus permaneça no saldo de jogo. Uma retirada bem-sucedida é considerada a transição do pedido de retirada para o status 'Concluído'. A retirada de fundos em violação dos termos desta cláusula das regras será considerada como recusa do jogador do bônus, neste caso o saldo de bônus será cancelado. Esta regra está em vigor a partir do momento em que a conta de bônus é criada até que o valor do bônus apareça na conta de jogo.</p><p class="mb-5">18 A oferta de bônus pode ser utilizada apenas uma vez. Tenha cuidado ao escolher um bônus durante o registro. Ao escolher uma das opções (para esportes ou cassinos), você automaticamente recusa usar a segunda opção. Você não pode mudar sua escolha no futuro.</p><p class="mb-5">19 Ao ativar o bônus durante o registro, o cliente automaticamente concorda com os termos e condições desta promoção.</p><p class="mb-5">20 A possibilidade de recusar a participação na promoção de bônus está disponível apenas na etapa de realização do primeiro depósito, quando a oferta de bônus é ativada, ou se as condições para apostar não forem cumpridas.</p><p class="mb-5">21 A oportunidade de recusar fundos de bônus está presente apenas na fase de registro, ao ativar a oferta de bônus ou em caso de não cumprimento das condições de aposta.</p><p class="mb-5">22 O bônus está disponível apenas para uma conta de jogo por pessoa, família, apartamento, computador ou endereço IP. Se houver suspeita de violação das regras por meio de múltiplos registros (contas falsas, grupos de jogos), o BC ValorCasino cancelará o bônus. Se você registrar uma segunda conta, ela será excluída, e todos os bônus de jogos e ganhos poderão ser cancelados.</p><p class="mb-5">23 A empresa reserva-se o direito de cancelar o bônus e/ou recusar-se a fornecê-lo ao cliente sem indicar os motivos se durante a verificação da conta de jogo forem encontradas quaisquer violações da honestidade do jogo e/ou o uso de estratégias que, a seu critério, sejam consideradas maliciosas. A retirada de fundos de bônus é possível a qualquer momento, sem aviso prévio ao cliente, mas não após a retirada e/ou aposta desta atribuição de bônus. Em situações controversas, a decisão dos funcionários autorizados da Empresa é final.</p><p class="mb-5">24 A empresa reserva-se o direito de realizar o procedimento de verificação do proprietário da conta de jogo, bem como de suspender o recebimento de fundos de bônus na conta de jogo pelo tempo que durar o procedimento de verificação.</p><p class="mb-5">25 No caso de funcionários da empresa suspeitarem de trapaça por parte de um cliente, o «BC ValorCasino» reserva-se o direito de aplicar condições individuais para apostar o bônus recebido a essa categoria de clientes.</p><p class="mb-5">26 Os Termos e Condições atuais podem ser alterados e atualizados a qualquer momento.</p><p class="mb-5">O tamanho do bônus padrão é de 100% do valor do depósito. Por exemplo, o cliente N fez um depósito de 100 USD no dia seguinte ao registro. O valor do bônus será de 100%, ou seja, 100 USD.</p><h2>CONTAS DE BÔNUS</h2><p class="mb-5">Requisitos de apostas - significa o total de apostas que você deve fazer antes que o Bônus e quaisquer ganhos acumulados sejam transferidos para o seu Saldo em Dinheiro e possam ser sacados. Coeficiente de apostas - significa o coeficiente calculado da seguinte forma: quantidade de apostas a serem feitas/quantidade de bônus atribuída. Contribuição dos jogos - significa a porcentagem de apostas dentro do Jogo que contribuem para os requisitos de apostas. Exemplo: você recebeu um bônus de €100 com um coeficiente de apostas de x30. Para transferir o saldo do bônus para o saldo em dinheiro, você precisa fazer €3000 em apostas (€100*30). €3.000 é o seu Requisito de Aposta. Se você escolher o jogo com contribuição de 100%, então o cálculo do Requisito de Aposta é o seguinte: (€100*30)100%= €3.000. Se você escolher o jogo com contribuição de 10%, então o cálculo do Requisito de Aposta é o seguinte: (€100*30)*10%= €30.000. No https://Valor.Bet, a seguinte contribuição de jogos se aplica: Slots do Casino (exceto Poker de Vídeo) – 100%; Poker, Poker de Vídeo, Roleta, Bacará, Blackjack, Jogos de Mesa, Loterias, Raspadinhas, Bingo, Quina – 0%; Live Casino Todas as categorias – 0%; Jogos ao Vivo / Jogos de TV Todas as categorias – 10%; Virtual Sport Todas as categorias – 10%; Aviator – 0%.</p><h2>CONTRIBUIÇÃO DE APOSTAS DO JOGO</h2><p class="mb-5">1. A empresa de apostas aceita apostas com base na lista de eventos com determinadas chances de vitória. 2. A recepção de apostas repetidas em um resultado ou combinação de resultados por um mesmo jogador pode ser limitada pela decisão da empresa de apostas. 3. Uma aposta é considerada aceita após o seu registro no servidor e sua confirmação online. As apostas registradas não podem ser canceladas ou corrigidas. 4. As apostas são aceitas apenas na quantia que não excede o saldo atual da conta do cliente. Após o registro da aposta, seu valor é debitado da conta. Após o cálculo das taxas, o valor ganho é creditado na conta do cliente. 5. As apostas são aceitas antes do início do evento; A data do evento, horário de início e comentários relacionados a eles, indicados na linha, são indicativos. Se, por qualquer motivo, a aposta for feita após o início real do evento, a aposta é considerada inválida. A exceção são apenas as apostas para eventos ao vivo, ou seja, apostas durante o jogo. Tais apostas são consideradas válidas até o final do evento. 6. As apostas em LINHA e AO VIVO não podem ser editadas ou excluídas, exceto nos casos especiais descritos nas Regras para Esportes. Valor mínimo e máximo da aposta: 1. A aposta mínima em qualquer evento é igual a USD - 0,2 / EUR - 0,2/ RUB - 10 / TRY - 1 / KZT - 100 / UAH - 5. 2. A aposta máxima é fixada pela empresa de apostas para cada evento separadamente. A aposta máxima depende do esporte e do evento. Se o acumulador (sistema) incluir vários eventos com diferentes restrições na aposta máxima, o tamanho da aposta máxima é definido como igual ao valor mínimo. 3. O ganho máximo por uma aposta é de 2.000.000 rublos (equivalente em moedas).'4.A empresa de apostas tem o direito de limitar o valor máximo, as odds para eventos específicos, bem como limitar ou aumentar o valor máximo, as odds para um cliente específico sem aviso prévio ou explicação. Política de cancelamento. 1. No caso de a aposta ser sujeita a cancelamento, então um reembolso é feito em uma única taxa. Em acumuladores e sistemas, ao cancelar a aposta para um ou vários eventos, o cálculo dos ganhos para esses eventos não é realizado. 2. Em casos de taxas calculadas incorretamente, tais apostas são recalculadas.</p><h2>REGRAS PARA ACEITAÇÃO DE APOSTAS</h2><p class="mb-5">A empresa de apostas oferece os seguintes tipos de apostas: 1. Aposta simples - esta é uma aposta em um resultado de evento separado. Ganhar uma aposta simples é igual à multiplicação do valor da aposta pela odd estabelecida para esse resultado. 2. Acumuladores - esta é uma aposta em vários resultados independentes de eventos. A vitória do acumulador é igual à multiplicação do valor da aposta pelos coeficientes de todos os resultados incluídos no acumulador. Perder um dos resultados do acumulador significa perder todo o acumulador. 3. Sistema - esta é uma aposta em uma combinação de acumuladores de tamanho completo a partir de um número pré-selecionado de eventos. O número máximo de opções no sistema é de 924. O número máximo de eventos no sistema é de 12. Aceitação de apostas durante o jogo (apostas ao vivo) 1. As apostas ao vivo são aceitas nos principais e adicionais resultados. É possível fazer apostas ao vivo simples e combiná-las em um acumulador. 2. Uma aposta é considerada aceita depois de registrada no servidor e, em seguida, uma confirmação online será emitida. A aposta aceita não está sujeita a alterações. Em caso de ocorrência das circunstâncias especificadas na seção Resultados da partida, a data e o horário do início, o procedimento para resolver questões controversas. 3. Sob certas circunstâncias especificadas na seção 'Regras para esportes', é possível calcular uma aposta ao vivo com um coeficiente de. 4. A empresa de apostas não é responsável por imprecisões nos resultados atuais das partidas, para as quais são aceitas apostas ao vivo. Os clientes também devem usar outras fontes de informação independentes. 5. As apostas ao vivo não podem ser editadas ou excluídas.</p><h2>TIPOS DE APOSTAS</h2><p class="mb-5">1. É permitido incluir apenas um dos resultados dependentes em uma aposta acumuladora. No caso de dois ou mais eventos dependentes serem incluídos em uma aposta acumuladora ou sistema, todos os eventos com as menores odds são excluídos desta aposta acumuladora ou sistema. 2. As apostas 'A equipe marcará um pênalti Sim/Não' são consideradas perdidas se não houver cobranças de pênalti no tempo regulamentar. 3. As apostas 'Próximo gol', 'Como o gol será marcado' são consideradas perdidas se o gol cujo número foi indicado no cupom de aposta não for marcado.</p><h2>RESTRIÇÕES PARA INCLUSÃO DE ALGUNS RESULTADOS DE EVENTOS</h2><p class="mb-5">1. É possível depositar e retirar fundos da sua conta de diferentes maneiras. Todos os métodos de depósito e retirada de fundos são apresentados na página 'Depósito'.</p><p class="mb-5">• transferir dinheiro entre sistemas de pagamento;</p><p class="mb-5">• depositar e retirar fundos sem fazer apostas.</p><p class="mb-5">Nesses casos, o dinheiro será devolvido à sua conta.</p><p class="mb-5">A retirada de fundos é possível apenas para os requisitos para os quais o depósito foi realizado. Ao depositar de várias maneiras, a retirada deve ser proporcional ao valor do depósito.</p><p class="mb-5">A ValorCasino tem o direito de recusar a retirada de pagamento em sistemas de pagamento, oferecendo em vez disso pagamento por transferência bancária.</p><p class="mb-5">ATENÇÃO! A administração não recomenda depositar a conta de carteiras eletrônicas de outras pessoas. A administração tem o direito de devolver os fundos às contas dos proprietários das carteiras sem aviso prévio.</p><p class="mb-5">Em casos especiais, para algumas contas de jogos de clientes, a compensação de comissões de sistemas de pagamento para depósitos e retiradas de fundos, que geralmente é paga pela empresa de apostas ValorCasino, pode ser cancelada.</p><p class="mb-5">7. Termos e condições do serviço de depósito instantâneo 1-Click</p><p class="mb-5">• Você concorda em pagar por todos os serviços e/ou bens ou outros serviços adicionais encomendados por você no site, bem como todos os custos adicionais (se necessário), incluindo, mas não se limitando a, todos os tipos de impostos, taxas, etc. Você é totalmente responsável pelo pagamento oportuno de todos os pagamentos. O provedor de serviços de pagamento apenas garante a realização do pagamento no valor indicado pelo site e não é responsável pelo pagamento pelo usuário do site dos mencionados montantes adicionais. Após clicar no botão 'Depositar com 1 clique', você concorda que o pagamento foi processado e executado irrevogavelmente. Ao clicar no botão 'Depositar com 1 clique', você concorda que não poderá reembolsar o pagamento ou solicitar o seu reembolso. Ao fazer um pedido no site, você confirma e indica que não está violando as leis do país onde fez o pedido e efetuou o pagamento. Além disso, ao aceitar as condições destas Regras (e/ou os Termos e Condições), você, como proprietário do cartão de pagamento, confirma que tem o direito de usar os bens e/ou serviços oferecidos no site.</p><p class="mb-5">• Se você usar os serviços do site que oferecem serviços específicos, como um serviço de jogos, você fornece uma confirmação legalmente vinculativa de que atingiu ou já ultrapassou a idade legalmente permitida em sua jurisdição para usar os serviços fornecidos pelo site.</p><p class="mb-5">2. Todas as solicitações de retirada de fundos são processadas 24/7. As retiradas podem levar até 72 horas. Os reembolsos podem levar até 72 horas.</p><p class="mb-5">• Ao começar a utilizar os serviços do Website, você assume a responsabilidade legal de cumprir as leis de qualquer país onde esse serviço seja usado e confirma que o provedor de serviços de pagamento não se responsabiliza por quaisquer violações ilegais ou não autorizadas. Ao concordar em usar os serviços do Website, você compreende e aceita que o processamento de quaisquer pagamentos seus é realizado pelo provedor de serviços de pagamento e não há direito legal de devolução de serviços e/ou produtos que já tenham sido comprados ou de outras opções de cancelamento de pagamento. Se você quiser recusar o uso do serviço para a próxima compra de serviços e/ou produtos, poderá recusar o serviço usando a Conta Pessoal no Website.</p><p class="mb-5">• O provedor de serviços de pagamento não é responsável pela recusa/incapacidade de processar os dados associados ao seu cartão de pagamento, nem pela recusa associada à não recepção de permissão do banco emissor para efetuar um pagamento com o seu cartão de pagamento. O provedor de serviços de pagamento não é responsável pela qualidade, volume, preço de qualquer serviço e/ou bens oferecidos a Você ou adquiridos por Você no Website usando o seu cartão de pagamento. Ao pagar por quaisquer serviços e/ou produtos do Website, você é primeiro obrigado a cumprir as regras de uso do Website. Por favor, note que somente você, como proprietário do cartão de pagamento, é responsável pelo pagamento oportuno de quaisquer serviços e/ou bens encomendados por você através do Website e por todos os custos/comissões adicionais relacionados a este pagamento. O provedor de serviços de pagamento é apenas um executor de pagamento no valor indicado pelo Website e não é responsável por preços, preços totais e/ou quantias totais. </p><p class="mb-5">• No caso de uma situação relacionada com a sua discordância com as condições acima e/ou por outros motivos, pedimos-lhe que se recuse a efetuar o pagamento atempadamente e, se necessário, entre em contato diretamente com o administrador/suporte do Website. </p><p class="mb-5">3. Ao fazer um depósito, você confirma que tem o direito de usar os Serviços e os serviços do Website, oferecidos através do Website atual. Caso você use os Serviços através do Website, que oferece serviços específicos.</p><p class="mb-5">4. Se você deseja solicitar um reembolso, deve entrar em contato com a equipe de suporte. Podemos fazer o reembolso apenas para a conta que você usou para reabastecer sua conta. Pode ser necessário um procedimento de identificação. Nesse caso, poderá ser solicitada a apresentação de uma cópia do passaporte ou do cartão de identidade. Além disso, se você tiver feito o depósito usando um cartão bancário, deverá fornecer uma foto do cartão (ambos os lados). Os primeiros seis dígitos e os últimos quatro dígitos do número do cartão, o nome do titular do cartão devem ser visíveis e o código CVV2 deve ser ocultado.</p><p class="mb-5">Reservamos o direito de cobrar uma taxa correspondente aos nossos próprios custos para a retirada de fundos que não tenham sido usados para fazer apostas ou jogar jogos.</p><p class="mb-5">5. O serviço de segurança da ValorCasino reserva o direito de:</p><p class="mb-5">• bloquear a retirada de fundos com qualquer um dos métodos disponíveis, caso o valor das apostas seja menor que o valor dos depósitos a partir do momento do registro. Também são levadas em consideração as apostas com coeficiente de 1,3 ou superior.</p><p class="mb-5">• recusar a retirada de fundos se a conta de apostas não for usada para fins de jogo; é necessário verificar sua conta de jogo antes de retirar os fundos. Você precisa preencher o perfil corretamente para verificação, fornecer cópias e fotografias de documentos de identidade (incluindo o passaporte), bem como responder às perguntas do Serviço de Suporte.</p><p class="mb-5">6. The ValorCasino security service does not recommend: <br> List of banned jurisdictions: North Korea, Myanmar, Iran</p><h2>FUNDS DEPOSIT AND WITHDRAWAL</h2></div>
        `
    },



}

const policyContentAr = {
    'user-agreement': {
        title: 'اتفاقية المستخدم',
        subtitle: 'تحميل السياسة',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block" dir="rtl">
            <p class="mb-5">تلتزم www.Valor.Bet بحماية معلوماتك الشخصية. توضح سياسة الخصوصية هذه أنواع البيانات التي نجمعها عند استخدامك لخدماتنا، وأسباب جمعها، وكيفية استخدامها.</p>
            <p class="mb-5">يرجى ملاحظة أن سياسة الخصوصية هذه هي اتفاق بينك وبين www.Valor.Bet ("نحن"، "لنا"، "موقعنا" حسب السياق). تُعد هذه السياسة جزءًا لا يتجزأ من الشروط والأحكام الخاصة بالموقع.</p>
            <p class="mb-5">الموقع www.Valor.Bet ("الكازينو"، "الموقع"، "الشركة") يحتفظ بحق تعديل سياسة الخصوصية من حين لآخر، وسنقوم بإبلاغك عند حدوث أي تغييرات عن طريق نشر النسخة المعدّلة على موقعنا. نوصي بمراجعة هذه السياسة بانتظام.</p>

            <h2 class="text-2xl font-bold leading-8">1. الخصوصية</h2>
            <p class="mb-5">نعتبر المعلومات الشخصية هي أي بيانات يمكن من خلالها التعرف على هوية الفرد، وتشمل على سبيل المثال لا الحصر: الاسم الكامل، تاريخ الميلاد، العنوان، البريد الإلكتروني، رقم الهاتف، أو أي معلومات أخرى ذات صلة ("المعلومات الشخصية"). قد نطلب منك تزويدنا بهذه المعلومات عند استخدامك لموقعنا أو خدماتنا. تُخزَّن هذه المعلومات على خوادم آمنة في ألمانيا أو في مواقع أخرى حسب الحاجة. نقوم أيضًا بجمع بيانات تقنية مثل عنوان الـIP، الوقت والتاريخ، الصفحات التي تمت زيارتها، نوع المتصفح، وتقارير الأخطاء لتحسين جودة الخدمة. لا نقوم بجمع أي معلومات شخصية دون علمك أو موافقتك.</p>

            <h2 class="text-2xl font-bold leading-8">2. المعلومات التي نجمعها</h2>
            <p class="mb-5">قد نقوم بجمع بعض البيانات تلقائيًا كما ذكر أعلاه، بالإضافة إلى المعلومات التي تقدمها طوعًا عبر الموقع أو أثناء التواصل معنا. قد نحصل أيضًا على بيانات من مزودي خدمات خارجيين أو من قوائم عملاء تم الحصول عليها بشكل قانوني. قد نستعين بمقدمي خدمات من أطراف ثالثة لتقديم الدعم الفني، ومعالجة المعاملات، وصيانة الحسابات. نلتزم بحماية هذه المعلومات ولن نشاركها إلا وفقًا لما هو موضح في هذه السياسة.</p>

            <h2 class="text-2xl font-bold leading-8">3. جمع ومعالجة البيانات</h2>
            <p class="mb-5">نستخدم المعلومات الشخصية لتقديم الخدمات، ودعم العملاء، والتحقق من الهوية والأمان، ومعالجة المدفوعات، والمشاركة في العروض الترويجية، والامتثال للالتزامات القانونية. قد نشارك بعض المعلومات مع شركاء موثوقين أو مزودي خدمات بموجب اتفاقيات حماية بيانات.</p>
            <p class="mb-5">كما نستخدم المعلومات الشخصية في إرسال العروض الترويجية أو الإشعارات المتعلقة بخدماتنا أو بخدمات شركائنا التجاريين. من وقت لآخر، قد نطلب منك المشاركة في استبيانات أو مسابقات، ويكون ذلك اختياريًا بالكامل. المعلومات المقدمة قد تُستخدم لتحسين خدماتنا أو لأغراض تسويقية. بالموافقة على هذه السياسة، فإنك تمنحنا الإذن لاستخدام اسمك أو بياناتك في الحملات الإعلانية، ما لم تمنع القوانين ذلك.</p>

            <h2 class="text-2xl font-bold leading-8">4. استخدام المعلومات</h2>
            <p class="mb-5">قد نكشف عن المعلومات الشخصية إذا طُلب منا ذلك بموجب القانون، أو إذا رأينا بحسن نية أن هذا الإجراء ضروري: (1) للامتثال لأي إجراء قانوني؛ (2) لحماية حقوقنا وممتلكاتنا؛ أو (3) لحماية سلامة مستخدمينا أو الجمهور. إذا تبين لنا أنك قد شاركت في أي عملية احتيال، نحتفظ بالحق في مشاركة هذه المعلومات مع الكازينوهات الأخرى أو البنوك أو شركات بطاقات الائتمان أو السلطات المختصة.</p>

            <h2 class="text-2xl font-bold leading-8">5. إلغاء الاشتراك والوصول إلى المعلومات</h2>
            <p class="mb-5">يمكنك في أي وقت إلغاء الاشتراك في الرسائل الترويجية من خلال إعدادات حسابك أو بالنقر على رابط إلغاء الاشتراك الموجود في البريد الإلكتروني، أو عن طريق التواصل مع فريق الدعم.</p>
            <p class="mb-5">كما يمكنك التواصل معنا لتحديث بياناتك أو التحقق من صحتها أو طلب حذفها. سنقوم بمعالجة طلبك وفقًا للأنظمة المعمول بها، إلا في الحالات التي تتطلب فيها القوانين الاحتفاظ بالمعلومات.</p>

            <h2 class="text-2xl font-bold leading-8">6. الكوكيز (ملفات تعريف الارتباط)</h2>
            <p class="mb-5">عند استخدامك لموقعنا، قد نقوم بتخزين ملفات تعريف الارتباط (Cookies) وهي ملفات نصية صغيرة تساعدنا على تذكّر تفضيلاتك وتحسين تجربتك. نستخدم أيضًا ملفات "فلاش كوكيز" لتتبع الاستخدام وتحليل الأداء. يمكنك التحكم في استخدام الكوكيز من خلال إعدادات المتصفح.</p>

            <h2 class="text-2xl font-bold leading-8">7. معالجات الدفع</h2>
            <p class="mb-5">للعب بأموال حقيقية، يجب عليك إيداع وسحب الأموال عبر أنظمتنا، والتي قد تتضمن مزودي خدمات دفع من أطراف ثالثة. باستخدامك لخدماتنا، فإنك توافق على معالجة بياناتك ونقلها دوليًا وفقًا لهذه السياسة، ونضمن أن شركاءنا يلتزمون بأعلى معايير الأمان.</p>

            <h2 class="text-2xl font-bold leading-8">8. مراجعات الأمان</h2>
            <p class="mb-5">نحتفظ بالحق في إجراء فحوصات أمنية للتحقق من دقة بياناتك وسلوكك على الموقع. قد تشمل هذه الفحوصات مراجعات مالية أو استعلامات من أطراف ثالثة، وتوافق على تقديم أي مستندات نطلبها لتلك الأغراض.</p>

            <h2 class="text-2xl font-bold leading-8">9. الأمان</h2>
            <p class="mb-5">نقوم بتخزين جميع المعلومات الشخصية في خوادم مشفرة وآمنة باستخدام بروتوكولات SSL 128 بت وجدران حماية متقدمة. كما نلزم شركاءنا ومزودينا باتخاذ إجراءات أمان مماثلة لحماية البيانات.</p>

            <h2 class="text-2xl font-bold leading-8">10. حماية القاصرين</h2>
            <p class="mb-5">خدماتنا موجهة فقط للأشخاص الذين تجاوزوا 18 عامًا (أو السن القانوني في بلدك). أي شخص يقدم بياناته يقر بأنه فوق السن القانونية. في حال اكتشفنا أي بيانات تخص قاصر، سيتم حذفها فورًا.</p>

            <h2 class="text-2xl font-bold leading-8">11. النقل الدولي للبيانات</h2>
            <p class="mb-5">قد يتم تخزين أو معالجة بياناتك في دول أخرى. باستخدامك لخدماتنا، فإنك توافق على هذا النقل الدولي وتقر بأننا سنتخذ التدابير اللازمة لحماية بياناتك وفقًا لأفضل الممارسات.</p>

            <h2 class="text-2xl font-bold leading-8">12. الأطراف الثالثة</h2>
            <p class="mb-5">قد يحتوي موقعنا على روابط لمواقع خارجية لا نتحكم بها. نحن غير مسؤولين عن سياسات الخصوصية أو ممارسات تلك المواقع، وننصحك بمراجعتها قبل تقديم أي معلومات شخصية.</p>

            <h2 class="text-2xl font-bold leading-8">13. إخلاء المسؤولية</h2>
            <p class="mb-5">تُقدَّم خدماتنا "كما هي" و"حسب التوفر". لا نتحمل أي مسؤولية عن الأضرار المباشرة أو غير المباشرة الناتجة عن استخدام الموقع أو الكشف عن البيانات الشخصية، ولا نضمن خلو خدماتنا من الأخطاء أو الانقطاعات.</p>

            <h2 class="text-2xl font-bold leading-8">14. الموافقة على سياسة الخصوصية</h2>
            <p class="mb-5">باستخدامك لخدماتنا، فإنك تقر بقبولك لهذه السياسة. هذه النسخة تُعد النسخة الكاملة والوحيدة المعتمدة، وأي استخدام مستمر بعد التحديثات يعتبر موافقة ضمنية عليها. وفقًا للمادة 77 من اللائحة العامة لحماية البيانات (GDPR)، يحق لك تقديم شكوى إلى الجهة الرقابية في بلد إقامتك أو عملك.</p>

            <h2 class="text-2xl font-bold leading-8">15. المواقع الأخرى</h2>
            <p class="mb-5">قد يحتوي موقعنا على روابط لمواقع خارجية لا تخضع لإدارتنا، وقد تجمع هذه المواقع بيانات وفقًا لسياساتها الخاصة. نحن غير مسؤولين عن ممارسات الخصوصية أو المحتوى الخاص بها.</p>
            </div>
        `
    },
    'responsible-gambling': {
        title: 'المقامرة المسؤولة',
        subtitle: 'العب بأمان',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block" dir="rtl" style="text-align: right;">
                <p class="mb-5">آخر تحديث: 14.12.2022</p>
                <p class="mb-5">يرجى قراءة هذه المعلومات بعناية لفائدتك الشخصية.</p>
                <p class="mb-5">يتم تشغيل www.Valor.Bet بواسطة</p>

                <h2 class="text-2xl font-bold leading-8">المقامرة المسؤولة</h2>

                <ul class="list-disc list-inside space-y-3 mb-5">
                    <li class="text-gray-800 leading-relaxed">الحساب يعني حسابًا فريدًا تم إنشاؤه لك للوصول إلى خدمتنا أو إلى أجزاء منها.</li>
                    <li class="text-gray-800 leading-relaxed">الشركة (يُشار إليها باسم "الشركة" أو "نحن" أو "لنا" في هذه الاتفاقية) تشير إلى Curacao Co.</li>
                    <li class="text-gray-800 leading-relaxed">الخدمة تشير إلى الموقع الإلكتروني.</li>
                    <li class="text-gray-800 leading-relaxed">الموقع الإلكتروني يشير إلى www.Valor.Bet.</li>
                    <li class="text-gray-800 leading-relaxed">أنت تعني الفرد الذي يصل إلى الخدمة أو يستخدمها، أو الشركة أو الكيان القانوني الآخر الذي يمثله هذا الفرد، حسب الاقتضاء.</li>
                </ul>

                <h3 class="font-bold">التفسير</h3>
                <h3 class="font-bold">التعاريف</h3>
                <p class="mb-5">الكلمات التي تبدأ بحرف كبير لها معانٍ محددة في الشروط التالية.</p>
                <p class="mb-5">ستكون التعريفات التالية بنفس المعنى سواء وردت بصيغة المفرد أو الجمع.</p>

                <h2 class="text-2xl font-bold leading-8">التفسير والتعاريف</h2>

                <ul class="list-disc list-inside space-y-3 mb-5">
                    <li class="text-gray-800 leading-relaxed">حدد حدًا للإيداع: قبل أن تبدأ اللعب، فكر في المبلغ الذي يمكنك تحمله للمراهنة بناءً على وضعك المالي. العب بالمبالغ المخصصة للترفيه فقط.</li>
                    <li class="text-gray-800 leading-relaxed">لا تحاول استعادة الخسائر بأي ثمن: تجنب المخاطرة المفرطة في محاولة استعادة ما خسرته سابقًا. العب من أجل المتعة وليس لكسب المال.</li>
                    <li class="text-gray-800 leading-relaxed">حدد حدًا للوقت:</li>
                    <li class="text-gray-800 leading-relaxed">حدد وقتًا للعب ولا تتجاوزه. تذكر أن المقامرة يجب أن تكون متوازنة مع أنشطتك الأخرى ولا تكون هوايتك الوحيدة.</li>
                    <li class="text-gray-800 leading-relaxed">العب بذكاء: من الأفضل عدم اللعب عندما تكون متوترًا أو مكتئبًا أو تحت ضغط كبير. لا تلعب أثناء تناول الأدوية أو تحت تأثير المخدرات أو الكحول.</li>
                    <li class="text-gray-800 leading-relaxed">خذ فترات راحة:</li>
                    <li class="text-gray-800 leading-relaxed">خذ فترات راحة عندما تشعر بالتعب أو عدم القدرة على التركيز.</li>
                    <li class="text-gray-800 leading-relaxed">حساب واحد فقط:</li>
                    <li class="text-gray-800 leading-relaxed">للمساعدة في تتبع الوقت والمال الذي تنفقه في اللعب، نوصي بشدة بعدم إنشاء أكثر من حساب واحد لكل شخص.</li>
                </ul>

                <h3 class="font-bold">المقامرة المسؤولة</h3>
                <h3 class="font-bold">المعلومات والتواصل</h3>
                <h3 class="font-bold">حماية القُصّر</h3>
                <h3 class="font-bold">الاستبعاد الذاتي</h3>

                <p class="mb-5">بالنسبة لمعظم مستخدمينا، المقامرة هي ترفيه ومتعة وإثارة. ومع ذلك، ندرك أيضًا أنه بالنسبة لبعض المستخدمين، قد يكون للمقامرة آثار سلبية. في الطب، تم الاعتراف بالمقامرة المرضية منذ سنوات طويلة كمرض خطير.</p>

                <p class="mb-5"><a href="https://www.begambleaware.org/safer-gambling/">المقامرة الآمنة</a></p>

                <p class="mb-5">نصائح مفيدة للمقامرة المسؤولة على www.Valor.Bet</p>

                <p class="mb-5">نوصي بأن تفكر في النصائح التالية قبل اللعب لضمان بقاء المقامرة نشاطًا ممتعًا وخاليًا من الآثار السلبية:</p>

                <p class="mb-5">لاستخدام خدمتنا، يجب أن يكون عمرك أكثر من 18 عامًا. لتجنب سوء الاستخدام، حافظ على بيانات تسجيل الدخول الخاصة بك آمنة وبعيدة عن متناول القُصّر.</p>

                <p class="mb-5">نوصي باستخدام برنامج تصفية لمنع القُصّر، وخاصة الأطفال، من الوصول إلى محتوى غير مناسب على الإنترنت.</p>

                <p class="mb-5">لأولياء الأمور، نوصي بقائمة من أدوات تصفية الإنترنت التي تساعد في منع الأطفال من الوصول إلى المحتوى غير المخصص لهم:</p>

                <p class="mb-5"><a href="https://famisafe.wondershare.com/internet-filter/best-internet-filters.html">أفضل مرشحات الإنترنت</a></p>

                <p class="mb-5">إذا تم تشخيصك بإدمان المقامرة أو ترغب في الابتعاد عنها لأي سبب، فنحن نريد مساعدتك في البقاء بعيدًا عن كل ما يضرك. "الاستبعاد الذاتي" يعني أنك تستبعد نفسك طوعًا من جميع خدمات المقامرة. لا يمكن التراجع عن هذا الاستبعاد خلال الفترة المحددة. إذا كنت ترغب في الاستبعاد الذاتي، أرسل رسالة إلى دعمنا وحدد فترة تتراوح بين 6 أشهر و5 سنوات. سيوضح لك فريقنا جميع الخطوات المطلوبة.</p>

                <p class="mb-5">• البريد الإلكتروني: support@valor.bet</p>

                <p class="mb-5">منذ اليوم الأول، فكرنا في هذه المشكلة وبذلنا قصارى جهدنا للمساعدة. تحت مصطلح "المقامرة المسؤولة"، نفهم مجموعة من الإجراءات التي يمكن لمزود الألعاب اتخاذها لتقليل احتمالية ظهور آثار سلبية. وإذا ظهرت، نحاول اتخاذ إجراءات فعالة ضدها.</p>

                <p class="mb-5">يرجى ملاحظة أن الاستبعاد الذاتي دائم خلال الفترة المحددة ولا يمكن التراجع عنه لحمايتك الشخصية.</p>

                <p class="mb-5">خلال فترة الاستبعاد الذاتي، لا يُسمح لك بإنشاء حساب جديد، وأي محاولة لذلك ستُعد انتهاكًا لشروط الخدمة وقد تؤدي إلى حظر دائم لحسابك الأصلي.</p>

                <p class="mb-5">الأداة الأهم ضد الآثار السلبية للمقامرة هي المعرفة والتوعية بالمخاطر، مما يدعم ضبط النفس لدى المستخدمين ويضمن عدم تعرضهم للنتائج السلبية.</p>

                <p class="mb-5">سيساعدك فريق الدعم عبر البريد الإلكتروني في أي وقت دون أي تكلفة إضافية:</p>

                <p class="mb-5">• البريد الإلكتروني: support@valor.bet</p>

                <p class="mb-5">لن يشارك فريق الدعم معلوماتك الشخصية مع أي طرف آخر دون موافقتك.</p>

                <p class="mb-5">بالإضافة إلى ذلك، يمكنك إجراء اختبار التقييم الذاتي إذا كنت تواجه مشاكل مع المقامرة على:</p>

                <p class="mb-5"><a href="https://www.begambleaware.org/gambling-problems/do-i-have-a-gambling-problem/">هل لدي مشكلة في المقامرة؟</a></p>

                <p class="mb-5">يمكنك أيضًا العثور على مزيد من المعلومات حول إدمان المقامرة في:</p>

                <h2 class="text-2xl font-bold leading-8">المقامرة المسؤولة والاستبعاد الذاتي</h2>
            </div>
        `
    },
    'responsible-gaming': {
        title: 'Jogo Responsável',
        subtitle: 'Jogue com Segurança',
        content: `
            <div class="politics-content__wrapp">

                <div data-testid="politics-content-block" class="politics-content__block">
                    <p class="mb-5">O jogo responsável é uma parte importante da política de atendimento ao cliente da nossa empresa; por isso, damos grande atenção a questões que podem surgir em decorrência do vício em jogos de azar. Acreditamos que é nosso dever proteger os jogadores contra tendências de jogo excessivas e impedir que menores de idade participem de qualquer forma de aposta.</p>
                    <p class="mb-5">Nosso objetivo é tornar o nosso serviço o mais confortável e funcional possível, perfeitamente adequado para um lazer agradável. Infelizmente, o fato de que os jogos são uma atividade empolgante pode se tornar um problema para alguns jogadores.</p>
                    <p class="mb-5">Apoiamos e endossamos totalmente a política internacional de Jogo Responsável e fazemos tudo o que está ao nosso alcance para garantir que nossos clientes desfrutem de um jogo seguro, divertido e sob controle.</p>
                </div>

                <div data-testid="politics-content-block" class="politics-content__block">
                    <h2 class="text-2xl font-bold leading-8">Mantendo o Controle</h2>
                    <p class="mb-5">O jogo é apenas uma forma de entretenimento — uma maneira agradável de passar o tempo livre, curtir o desempenho do seu time favorito e se conectar com pessoas que compartilham dos mesmos interesses. No entanto, ao aproveitar seu lazer, assistir às partidas e participar das apostas, é essencial ter cautela.</p>
                    <p class="mb-5">Todo participante de apostas deve sempre lembrar:</p>

                    <ul class="list-disc list-inside space-y-3 mb-5">
                        <li class="text-gray-800 leading-relaxed">O jogo é apenas uma forma de lazer, não um meio de ganhar dinheiro — nunca perca o bom senso.</li>
                        <li class="text-gray-800 leading-relaxed">Se perder, não tente recuperar imediatamente — sempre haverá outra oportunidade.</li>
                        <li class="text-gray-800 leading-relaxed">Aposte apenas o valor que pode perder — nunca ultrapasse seus limites financeiros.</li>
                        <li class="text-gray-800 leading-relaxed">Preste atenção no tempo e no dinheiro que você dedica ao jogo.</li>
                    </ul>
                </div>

                <div data-testid="politics-content-block" class="politics-content__block">
                    <h2 class="text-2xl font-bold leading-8">Prevenção ao Vício em Jogos</h2>
                    <p class="mb-5">Entre a maioria das pessoas para as quais o jogo é apenas uma diversão, existe uma pequena porcentagem que desenvolve dependência. Pesquisas recentes mostram que apenas uma parte dos adultos enfrenta problemas relacionados ao vício em jogos. No entanto, nossa empresa leva este tema muito a sério e lembra aos apostadores que:</p>

                    <ul class="list-disc list-inside space-y-3 mb-5">
                        <li class="text-gray-800 leading-relaxed">O jogo baseia-se na lei das probabilidades — não existem “fórmulas” ou “sistemas” que garantam sucesso.</li>
                        <li class="text-gray-800 leading-relaxed">A vontade de jogar deve vir exclusivamente de você.</li>
                        <li class="text-gray-800 leading-relaxed">O jogo é entretenimento, não uma forma de ganhar dinheiro rápido ou quitar dívidas.</li>
                        <li class="text-gray-800 leading-relaxed">Controle sempre o quanto você gasta com jogos.</li>
                        <li class="text-gray-800 leading-relaxed">Conheça e entenda as regras antes de participar.</li>
                    </ul>

                    <p class="mb-5">Pode ser difícil distinguir entre um entusiasmo saudável e uma dependência prejudicial. No entanto, existem alguns sinais de alerta que podem indicar o início de um problema. Responda às 10 perguntas a seguir — se responder “sim” a pelo menos 5 delas, é provável que já haja um problema de jogo.</p>

                    <p class="mb-5">Fazemos todo o possível para que nossos clientes desfrutem de um jogo seguro e empolgante, sem perder o controle, e apoiamos plenamente a política internacional de Jogo Responsável.</p>

                    <ul class="list-disc list-inside space-y-3 mb-5">
                        <li class="text-gray-800 leading-relaxed">Você se envolve excessivamente com jogos?</li>
                        <li class="text-gray-800 leading-relaxed">Os valores das suas apostas aumentam constantemente?</li>
                        <li class="text-gray-800 leading-relaxed">Você já pediu dinheiro emprestado para jogar?</li>
                        <li class="text-gray-800 leading-relaxed">Costuma jogar por mais tempo do que o planejado?</li>
                        <li class="text-gray-800 leading-relaxed">As visitas frequentes a locais de apostas prejudicaram sua reputação?</li>
                        <li class="text-gray-800 leading-relaxed">Sente irritação ou frustração quando não pode apostar?</li>
                        <li class="text-gray-800 leading-relaxed">Usa o jogo como uma forma de escapar de problemas pessoais?</li>
                        <li class="text-gray-800 leading-relaxed">Sente frequentemente a necessidade de recuperar as perdas?</li>
                        <li class="text-gray-800 leading-relaxed">Já tentou controlar o tempo ou o valor das apostas e não conseguiu?</li>
                        <li class="text-gray-800 leading-relaxed">Você esconde seus hábitos de jogo da sua família?</li>
                    </ul>
                </div>
        `
    },
    'risk-disclosure': {
        title: 'إفصاح عن المخاطر',
        subtitle: 'معلومات مهمة',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block" dir="rtl">
                <p class="mb-5">أنت تدرك أنه من خلال المشاركة في الألعاب، فإنك تخاطر بخسارة الأموال المودعة في حسابك على ValorBet.</p>
                <p class="mb-5">في بعض الولايات القضائية، قد تكون المقامرة عبر الإنترنت غير قانونية. أنت تفهم وتوافق على أن ValorBet لا يمكنها تزويدك بنصائح قانونية أو ضمانات بشأن قانونية استخدامك لخدمات الموقع الإلكتروني.</p>
                <p class="mb-5">لا تدّعي الشركة أن خدمات الموقع تتوافق مع المتطلبات القانونية في ولايتك القضائية. أنت تستخدم الخدمات المقدمة من ValorBet بإرادتك الكاملة وعلى مسؤوليتك الخاصة، متحملاً المخاطر، ومتخذًا القرار بشأن ما إذا كان استخدام خدمات الموقع قانونيًا وفقًا للقوانين المعمول بها في ولايتك القضائية. تقوم بتسجيل الدخول والمشاركة في الألعاب على مسؤوليتك الخاصة.</p>
                <p class="mb-5">يتم توفير المواقع والألعاب لك بدون أي ضمانات صريحة أو ضمنية.</p>
            </div>
        `
    },
    'deposits-withdrawals': {
        title: 'الإيداع والسحب',
        subtitle: 'معلومات الدفع',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block" dir="rtl">
                <p class="mb-5">يمكنك إيداع وسحب الأموال من حسابك بعدة طرق. جميع طرق الإيداع والسحب متوفرة في صفحة الإيداع. تتم معالجة جميع طلبات السحب على مدار 24 ساعة يوميًا.</p>
                <p class="mb-5">يحق لخدمة الأمان في كازينو ValorBet عبر الإنترنت ما يلي:</p>
                <ol>
                    <li class="text-gray-800 leading-relaxed">رفض سحب الأموال بأي من الطرق المتاحة إذا لم تتطابق مبالغ الأموال المودعة أو المسحوبة مع مبالغ الرهانات الموضوعة (بالنسبة للمبالغ المودعة، يجب أن توضع رهانات بمعامل لا يقل عن 1.1؛ أو رهانات متعددة على ألعاب ذات خسارة رصيد منخفضة، مثل الرهان على أحداث متعاكسة في ألعاب الروليت أو الباكارات أو النرد).</li>
                    <li class="text-gray-800 leading-relaxed">رفض السحب إذا لم يتم استخدام حساب اللعبة لأغراض اللعب، ويلزم التحقق من الحساب قبل السحب.</li>
                </ol>
                <p class="mb-5">لا توصي خدمة الأمان في ValorBet بما يلي:</p>
                <ul class="list-disc list-inside space-y-3 mb-5">
                    <li class="text-gray-800 leading-relaxed">تحويل الأموال بين أنظمة الدفع؛</li>
                    <li class="text-gray-800 leading-relaxed">الإيداع والسحب دون وضع رهانات.</li>
                </ul>
                <p class="mb-5">في هذه الحالات، سيتم إعادة الأموال إلى حسابك.</p>
                <p class="mb-5">يمكن السحب فقط إلى نفس التفاصيل التي تم الإيداع من خلالها. إذا تم تمويل الحساب بعدة طرق، فيجب أن تكون عمليات السحب متناسبة مع مبالغ الإيداع.</p>
                <p class="mb-5">تحتفظ ValorBet بالحق في رفض الدفع إلى أنظمة الدفع أو نقدًا، وعرض الدفع عن طريق التحويل البنكي بدلاً من ذلك.</p>
                <p class="mb-5"><b>انتباه!</b> لا توصي الإدارة بالإيداع أو السحب من خلال محافظ إلكترونية لا تخص صاحب الحساب. يحق لخدمة الأمان اعتبار هذه العمليات احتيالية وحظر الحساب دون إشعار مسبق. كما تحتفظ الإدارة بالحق في رفض السحب إلى تفاصيل لا تخص صاحب الحساب.</p>
                <p class="mb-5">في بعض الحالات الخاصة، قد يتم إلغاء تعويض رسوم أنظمة الدفع الخاصة بالإيداع والسحب التي عادة ما تتحملها ValorBet.</p>
                <p class="mb-5">إذا لم يلتزم المستخدم بقواعد الشركة (انتهاك الشروط والأحكام، عدم وضع رهان قبل السحب، إلخ)، تحتفظ الشركة بالحق في رفض السحب.</p>
                <p class="mb-5">بالنسبة للحسابات بعملة "البيتكوين"، لا يتم فرض أي عمولة على الإيداع أو السحب من خلال نظام Bitcoin.</p>
            </div>
        `
    },
    'cancellation-policy': {
        title: 'سياسة الإلغاء',
        subtitle: 'شروط الإلغاء',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block" dir="rtl">
                <p class="mb-5">بمجرد تأكيد الرهان، سواء عبر الإنترنت أو عبر الهاتف، يُعتبر الرهان نهائيًا ولا يمكن تعديله أو إلغاؤه.</p>
                <p class="mb-5">لديك خيار المراهنة على الجانب الآخر لتقليل الخسائر، ولكن لا يمكن إزالة الرهان الأصلي بالكامل.</p>
                <p class="mb-5">يتم حساب جميع مدفوعات الرهانات باستخدام الاحتمالات السارية في وقت وضع الرهان. لن تؤثر أي تغييرات لاحقة في الاحتمالات على الرهانات المعلقة. لتجنب الأخطاء، نوصي بشدة بمراجعة جميع رهاناتك بعناية في تذاكر الرهان قبل تأكيدها عبر الإنترنت، والاستماع جيدًا إلى ردود الوكلاء عند وضع الرهانات عبر الهاتف.</p>
            </div>
        `
    },
    'refund-policy': {
        title: 'سياسة الاسترداد',
        subtitle: 'معلومات الاسترداد',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block" dir="rtl">
                <p class="mb-5">لا يمكن إتمام الاسترداد بمجرد استخدام الأموال المودعة (بما في ذلك المكافآت) ضمن عملية اللعب.</p>
                <p class="mb-5">لن يتم النظر في طلب الاسترداد إلا إذا تم تقديمه خلال أول أربعٍ وعشرين (24) ساعة من العملية المزعومة، أو خلال ثلاثين (30) يومًا إذا ادعى اللاعب أن شخصًا آخر (أو قاصرًا) قد وصل إلى حسابه.</p>
                <p class="mb-5">نحتفظ بالحق في حجز أي استرداد أو عملية عكسية حتى يتم التحقق من هوية صاحب الحساب بشكل مناسب وبما يرضينا. وتوافق على تقديم هوية موثقة أو أي تعريف آخر مصدق وفقًا للقوانين المعمول بها في ولاية اللاعب عند الطلب. إذا لم يتم تقديم هذه الهوية الموثقة خلال خمسة (5) أيام من طلبنا، فلن يتم تنفيذ عملية الاسترداد أو العكس، وسيتم إغلاق حسابك، وستفقد جميع الأموال الموجودة فيه. هذا القرار نهائي وملزم وغير قابل للاستئناف.</p>
                <p class="mb-5">يجب على اللاعب أن يلعب بطرق عادلة في جميع الألعاب وألا يؤثر بأي شكل على نتيجة أي لعبة. ويشمل ذلك استخدام الأدوات الحاسوبية أو المعادلات الرياضية أو أنظمة المراهنة، وغيرها.</p>
            </div>
        `
    },
    'privacy-policy': {
        title: 'سياسة الخصوصية',
        subtitle: 'حماية البيانات والسرية',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block" dir="rtl" style="text-align: right;">

            <h2 class="text-2xl font-bold leading-8 mb-4">1. الأحكام العامة</h2>
            <p class="mb-5">تحدد سياسة الخصوصية هذه كيفية جمع شركة ValorBet (ويشار إليها فيما بعد بـ "الشركة") للمعلومات المقدمة من المستخدمين لموقعها الإلكتروني، واستخدامها، ومعالجتها، وحمايتها. تلتزم الشركة بحماية خصوصية كل عميل وتضمن أن تتم معالجة جميع البيانات الشخصية بشكل آمن وشفاف ووفقًا لقوانين حماية البيانات المعمول بها.</p>

            <h2 class="text-2xl font-bold leading-8 mb-4">2. المعلومات التي نقوم بجمعها</h2>
            <p class="mb-5">قد تجمع الشركة الفئات التالية من المعلومات من المستخدمين:</p>
            <ul class="list-disc list-inside space-y-3 mb-5">
                <li>المعلومات الشخصية المقدمة أثناء التسجيل، بما في ذلك الاسم الكامل، تاريخ الميلاد، ومعلومات الاتصال.</li>
                <li>تفاصيل الدفع المستخدمة للإيداعات والسحوبات.</li>
                <li>البيانات التقنية مثل عنوان IP، نوع المتصفح، نظام التشغيل، ومعرفات الأجهزة.</li>
                <li>سجل الأنشطة في الألعاب والمعاملات والتفاعل مع الموقع والخدمات.</li>
                <li>سجل التواصل بين المستخدم وفريق دعم الشركة.</li>
            </ul>

            <h2 class="text-2xl font-bold leading-8 mb-4">3. الغرض من جمع البيانات</h2>
            <p class="mb-5">يتم استخدام جميع البيانات المجمعة لأغراض قانونية مشروعة، بما في ذلك على سبيل المثال لا الحصر:</p>
            <ul class="list-disc list-inside space-y-3 mb-5">
                <li>توفير الخدمات وصيانتها.</li>
                <li>معالجة المدفوعات ومنع الاحتيال وضمان الامتثال للوائح مكافحة غسيل الأموال.</li>
                <li>التحقق من هوية المستخدم وعمره.</li>
                <li>تحسين جودة الخدمة وتخصيص تجربة المستخدم.</li>
                <li>إرسال إشعارات مهمة ومواد ترويجية (بموافقة المستخدم).</li>
            </ul>

            <h2 class="text-2xl font-bold leading-8 mb-4">4. تخزين وأمان البيانات</h2>
            <p class="mb-5">تستخدم الشركة تدابير تقنية وتنظيمية متقدمة لحماية بيانات المستخدمين من الوصول غير المصرح به أو التغيير أو الإفشاء أو التدمير. يتم تخزين جميع البيانات الشخصية في بيئات آمنة ذات وصول محدود.</p>
            <p class="mb-5">نستخدم تقنيات التشفير وجدران الحماية وبروتوكولات المصادقة متعددة الطبقات لضمان سلامة وسرية المعلومات.</p>

            <h2 class="text-2xl font-bold leading-8 mb-4">5. مشاركة البيانات</h2>
            <p class="mb-5">قد يتم مشاركة بيانات المستخدمين فقط مع أطراف ثالثة موثوقة بموجب اتفاقيات صارمة للسرية، بما في ذلك:</p>
            <ul class="list-disc list-inside space-y-3 mb-5">
                <li>مزودي خدمات الدفع لمعالجة المعاملات المالية.</li>
                <li>شركاء التحقق من الهوية والجهات التنظيمية إذا كان ذلك مطلوبًا قانونًا.</li>
                <li>وكالات التسويق (بموافقة مسبقة من المستخدم).</li>
            </ul>
            <p class="mb-5">تضمن الشركة أن جميع شركائها الخارجيين يلتزمون بمعايير حماية البيانات المعمول بها.</p>

            <h2 class="text-2xl font-bold leading-8 mb-4">6. حقوق المستخدم</h2>
            <p class="mb-5">وفقًا لقوانين الخصوصية، يحق للمستخدمين ما يلي:</p>
            <ul class="list-disc list-inside space-y-3 mb-5">
                <li>الحق في الوصول إلى بياناتهم الشخصية والحصول على نسخة منها.</li>
                <li>الحق في تصحيح أو تحديث أي معلومات غير دقيقة أو غير مكتملة.</li>
                <li>الحق في طلب حذف بياناتهم الشخصية (“الحق في النسيان”) وفقًا للقيود القانونية.</li>
                <li>الحق في تقييد أو الاعتراض على بعض أنشطة معالجة البيانات.</li>
                <li>الحق في سحب الموافقة على الاتصالات التسويقية في أي وقت.</li>
            </ul>

            <h2 class="text-2xl font-bold leading-8 mb-4">7. سياسة ملفات تعريف الارتباط (الكوكيز)</h2>
            <p class="mb-5">يستخدم الموقع ملفات تعريف الارتباط لتحسين تجربة المستخدم وتحليل حركة المرور. الكوكيز هي ملفات نصية صغيرة يتم تخزينها على جهازك لتسجيل تفضيلاتك وتحسين أداء الموقع.</p>
            <p class="mb-5">يمكنك تعطيل الكوكيز من إعدادات متصفحك، ولكن قد يؤدي ذلك إلى تقييد بعض وظائف الموقع.</p>

            <h2 class="text-2xl font-bold leading-8 mb-4">8. فترة الاحتفاظ بالبيانات</h2>
            <p class="mb-5">يتم الاحتفاظ بالبيانات الشخصية للمدة اللازمة لتحقيق الأغراض الموضحة في هذه السياسة أو كما يقتضي القانون. بعد انتهاء فترة الاحتفاظ، يتم حذف البيانات أو جعلها مجهولة بطريقة آمنة.</p>

            <h2 class="text-2xl font-bold leading-8 mb-4">9. النقل الدولي للبيانات</h2>
            <p class="mb-5">في بعض الحالات، قد يتم نقل بيانات المستخدمين إلى خوادم أو شركاء موجودين في دول أخرى. تضمن الشركة أن هذه التحويلات تتم وفقًا لمعايير حماية البيانات الدولية، مع الحفاظ على مستويات عالية من الأمان والسرية.</p>

            <h2 class="text-2xl font-bold leading-8 mb-4">10. القُصَّر</h2>
            <p class="mb-5">لا تقوم الشركة بجمع أو معالجة معلومات من أشخاص تقل أعمارهم عن 18 عامًا. إذا تم اكتشاف مثل هذه البيانات، فسيتم حذفها على الفور وإغلاق الحساب المرتبط بها.</p>

            <h2 class="text-2xl font-bold leading-8 mb-4">11. التغييرات في هذه السياسة</h2>
            <p class="mb-5">تحتفظ الشركة بالحق في تحديث أو تعديل سياسة الخصوصية هذه في أي وقت. سيتم إخطار المستخدمين بأي تغييرات كبيرة من خلال الموقع أو البريد الإلكتروني. يشكل استمرار استخدام الموقع بعد هذه التغييرات قبولًا للشروط المعدلة.</p>

            <h2 class="text-2xl font-bold leading-8 mb-4">12. معلومات الاتصال</h2>
            <p class="mb-5">إذا كانت لديك أي أسئلة أو مخاوف بشأن سياسة الخصوصية هذه أو كيفية تعاملنا مع بياناتك، يمكنك التواصل مع فريق الدعم من خلال موقع ValorBet.</p>

            <p class="mt-8"><b>تاريخ النفاذ:</b> تدخل سياسة الخصوصية هذه حيز التنفيذ اعتبارًا من تاريخ نشرها على الموقع.</p>
            </div>
        `
    },
    'about-us': {
        title: 'Sobre nosotros',
        subtitle: 'Nuestra historia',
        content: `
            <div class="politics-content__block" dir="rtl">
                <p class="mb-5">تُعد ValorBet كازينو عبر الإنترنت يضم أفضل المزودين المرخصين من جميع أنحاء العالم. الحظ والإثارة يملآن صفحات الموقع، ويمكن لكل عميل جديد أن يشعر بذلك.</p>
                <p class="mb-5">على مدار سنوات عديدة من العمل، كنا نسترشد بالمبادئ التي تشكل مفهومنا وأعمالنا. نحافظ على هذه المبادئ عامًا بعد عام.</p>
                <p class="mb-5">🏆 الانفتاح والشفافية <br> تم إنشاء علامة ValorBet التجارية بفكرة تجسيد قصة جديدة حقًا في عالم الكازينوهات عبر الإنترنت. كان هدفنا هو أن نكون واضحين وشفافين مع عملائنا حتى تكون حياة العلامة التجارية وتطورها مرئية لكل لاعب.</p>
                <p class="mb-5">نحن نشارك في أنشطة اجتماعية، ونمنحك الفرصة للمشاركة والتأثير في حياة العلامة التجارية من خلال نشاطك على إنستغرام ووسائلنا الأخرى — وكل ذلك حتى تصبح جزءًا من علامة ValorBet التجارية الموحدة!</p>
                <p class="mb-5">🏆 سرعة الأداء <br> أخذنا في الاعتبار سرعة الإنترنت للاعبين في مناطقنا، وجمعنا تحليلات وإحصاءات عميقة لضمان سرعة ثابتة لكل من ألعاب السلوتس الخاصة بنا وموقع ValorBet. لقد نجحنا، والآن يمكنك لعب ألعاب السلوتس عبر الإنترنت مجانًا أو مقابل أموال حقيقية دون مشاكل في الوصول.</p>
                <p class="mb-5">🏆 التوفر <br> تقدم ValorBet الفرصة للعب لأي شخص يحب حقًا ألعاب السلوتس الرائعة والخدمة عالية الجودة.</p>
                <p class="mb-5">🏆 الجودة <br> مزودون مرخصون، دعم احترافي على مدار الساعة طوال أيام الأسبوع، وفريق من المتخصصين ذوي الخبرة الذين يمتلكون أكثر من 10 سنوات في صناعة الألعاب — كل هذا لضمان أن كل يوم من اللعب في كازينو ValorBet عبر الإنترنت يجلب لك المتعة والإثارة الحقيقية!</p>
                <p class="mb-5"><b>جهات الاتصال</b></p>
                <p class="mb-5">support@valor.bet</p>
            </div>
        `
    },
    'account-payments': {
        title: 'اکاؤنٹ، ادائیگیاں اور بونس',
        subtitle: '',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
    <p class="mb-5">1. اکاؤنٹ ہولڈر بننے کے لیے آپ کو پہلے کمپنی پر رجسٹر کرنا ہوگا۔</p>
    <p class="mb-5">2. ایک 'کمپنی کا اکاؤنٹ' ایک اکاؤنٹ ہے جو ایک اکاؤنٹ ہولڈر کے ذریعہ قاعدہ کاروباری
        تعاملات کے لیے محفوظ کیا گیا ہوتا ہے، جس کا اصل مقصد کمپنی کے ساتھ ایک عادی تجارتی تعلق قائم کرنا اور شرکت کے
        ساتھ بیٹنگ اور دیگر گیمنگ اور جوا کے تعاملات کرنا ہے۔</p>
    <p class="mb-5">3. 'ویب سائٹ' وہ انٹرنیٹ گیٹ وے ہے جو کمپنی/ انٹرنیٹ ایڈریس کے ذریعے قابل رسائی
        ہوتا ہے، جہاں کمپنی کی کاروباری عملیات کے بارے میں تمام موجودہ اور متعلقہ معلومات شائع کی جاتی ہے، اور جس کے
        ذریعے خدمات اکاؤنٹ ہولڈرز کو فراہم کی جاتی ہیں۔</p>
    <p class="mb-5">4. کمپنی اسپورٹس بک کے تمام کھیلوں کے لیے قواعد عام مدد سیکشن (اسپورٹس بیٹنگ) میں
        درج ہیں؛</p>
    <p class="mb-5">5. کمپنی کے فراہم کردہ ہر کھیل کے قواعد ویب سائٹ مدد سیکشن یا ہر کھیل کے موزوں حصے
        میں دیکھے جا سکتے ہیں۔</p>
    <p class="mb-5">6. بونس/ پروموشن قوانین 'پروموشنز' حصے میں بیان کیے گئے ہیں، جہاں آپ ہر بونس
        اور/یا پروموشن کے لیے لاگو شرائط دیکھ سکتے ہیں۔ جب آپ کے پاس ایک فعال کیسینو بونس ہوتا ہے تو زیادہ سے زیادہ
        شراکت کرنے کی اختیاری رقم 5 یورو (یا معادل کرنسی) فی ایک سلانٹ کھیل کی ایک چکر یا دی گئی کل بونس کی 15 فیصد ہوتی
        ہے (جو بھی پہلے آئے)۔</p>
    <p class="mb-5">7. تمام موصول کی جانے والی خدمات کو قوانین اور مسلسل حدود کے مطابق استعمال کیا
        جانا چاہیے۔</p>
    <h3>2. اپنا اکاؤنٹ کھولنا</h3>
    <h3>2.5 اپنے اکاؤنٹ کھولنے میں آپ یہ ضمانت دیتے ہیں کہ:</h3>
    <p class="mb-5">2.1 ہماری خدمات کا استعمال کر کے کوئی شرطیں لگانے یا کوئی کھیل کھیلنے کے لئے، آپ
        کو اپریٹر ("کمپنی اکاؤنٹ" یا "اکاؤنٹ") کے ساتھ ایک اکاؤنٹ کھولنا ہوگا۔</p>
    <p class="mb-5">2.5.5 آپ کو جوئی کی منعیت نہیں ملی ہے؛ اور</p>
    <p class="mb-5">2.5.6 آپ کو پہلے ہی ہم سے بند کر دیا گیا ہے اس کھاتے کی وجہ سے جس کے نقشہ ، چھل
        کاڑی ، دغا بازی ، جرمنامی ، استعمال کے شرائط کی خلاف ورزی یا آپ کے طلبہ کے تحت جوابدہ حکمت عمل کے تحت۔</p>
    <p class="mb-5">2.6 آپ کا اکاؤنٹ آپ کے اپنے، درست، نام اور ذاتی تفصیلات میں رجسٹر ہونا چاہئے اور
        یہ صرف ایک بار آپ کے لئے جاری کیا جائے گا اور کسی بھی دوسرے شخص ، خاندان ، گھرانہ ، پتہ (پوسٹل یا آئی پی) ، ای
        میل ایڈریس ، ایکسیس ڈیوائس یا کسی بھی ماحول کے ذریعہ تقسیم نہیں کیا جائے گا جہاں ایکسیس ڈیوائس شیئر کیا جاتا ہو
        (مثال کے طور پر ، اسکول ، کام کی جگہ ، عوامی کتب خانے وغیرہ) ، کمپیوٹر (یا کوئی دوسرا ایکسیس ڈیوائس) ، اور/یا
        خدمات کے حوالے سے ایک اکاؤنٹ۔ آپ جو بھی اور کھاتے ہیں، یا جو خدمات کے حوالے سے آپ کے ملک میں آپ کو فائدہ مند
        کھاتے ہیں، "ڈوپلیکیٹ اکاؤنٹس" ہوں گے۔ ہم کسی بھی ڈوپلیکیٹ اکاؤنٹ کو بند کر سکتے ہیں (لیکن ہمیں اس کرنے کا فرض
        نہیں ہوگا)۔</p>
    <p class="mb-5">اگر ہم ایک ڈوپلیکیٹ اکاؤنٹ بند کرتے ہیں:</p>
    <p class="mb-5">2.6.1 ان سارے انعامات ، مفت شرطیں اور انعامات سے حاصل سب انعامات اور مفت شرطیں آپ
        کو کھو دیں گے؛</p>
    <p class="mb-5">2.6.2 ہم اپنی مکمل اختیار کے تحت، ان تمام فائدے اور واپسی کریں گے (جو واپسی
        فائدے کے لحاظ سے امتناعی مقدار کم کرتے ہیں) جو اس ڈوپلیکیٹ اکاؤنٹ کے حوالے سے دی گئیں ہیں اور، موصول نہیں کیا
        گیا ہو ان کسی دوسرے کھاتوں (میں سے کسی بھی دوسرے ڈوپلیکیٹ اکاؤنٹ میں شامل)؛ یا</p>
    <p class="mb-5">2.6.3 ہم اپنی مکمل اختیار کے تحت، ڈوپلیکیٹ اکاؤنٹ کا استعمال درست اور اس صورت میں
        سب نقصانات اور شرطیں جو آپ کے لئے ڈوپلیکیٹ اکاؤنٹ کے ذریعہ لگائی جاتی ہیں، ہم سے قائم کی جاتی ہیں۔</p>
    <p class="mb-5">2.6.4 قانونی تشریعات اور لائسنس کے تحت، منظورہ جریں میں سے کھلاڑی یو ایس اے ،
        کیوراکو اور مالٹا کے درجہ بندیوں کے ساتھ کمپنی کے اکاؤنٹ بنانے سے ممنوع ہیں۔ کمپنی کو ان ممالک سے کھولے گئے
        اکاؤنٹس کو بند کرنے کا حق محفوظ ہے ساتھ ہی جمعات اور شراکتوں کا اعلان کرتے ہیں۔</p>
    <p class="mb-5">2.2.1 ویب سائٹ پر رجسٹر پر کلک کریں اور اسکرین کی ہدایتوں کا پیروی کریں یا</p>
    <p class="mb-5">2.2.2 اپریٹر کے طریقہ کار کی طرح کوئی دوسرا اکاؤنٹ کھولیں جیسا کہ وقت کے ساتھ ساتھ
        پیش کیا جاتا ہو؛</p>
    <p class="mb-5">2.3 آپ کا اکاؤنٹ ایٹریٹر کے ذریعہ ، یا اپنے گروپ کی دوسری کمپنی کے ذریعہ اپنے
        اور/یا ذاتی حکمات کے لئے کارروائی کی جائے گی اور/یا اس ذریعے کھاتے سے جس کے ساتھ آپ نے کنٹریکٹ پر "حروف" کیا
        ہو۔</p>
    <p class="mb-5">2.4 جب آپ اپنا اکاؤنٹ کھولیں گے تو آپ کو ہمیں ذاتی معلومات فراہم کرنی ہوگی، جیسے
        کہ آپ کا نام اور پیدائش کی تاریخ اور مناسب رابطہ کی تفصیلات، ایک پتہ ، ٹیلیفون نمبر اور ای میل ایڈریس ("ذاتی
        تفصیلات"). آپ اپنی ذاتی تفصیلات وقتا وقتا تازہ کر سکتے ہیں، کسٹمر سروس سے رابطہ کر کے؛ یا ویب سائٹ پر "میرا
        پروفائل" انتظامی صفحہ کے ذریعہ؛ یا اپریٹر کے طریقہ کار کی طرح کوئی دوسرا طریقہ پیش کیا جاتا ہو۔</p>
    <p class="mb-5">2.5.1 آپ سمجھتے ہیں اور قبول کرتے ہیں کہ، خدمات کا استعمال کرکے، آپ کو پیسے کمانے
        کے علاوہ، پیسے گوا سکتے ہیں؛</p>
    <p class="mb-5">2.5.2 آپ: (ا) 18 سال سے زیادہ عمر کے ہیں: اور (ب) ایسی عمر پر ہیں جب جوئی یا جوئی
        سرگرمیاں قانون یا ضابطہ کے تحت قانونی ہیں جو آپ کے لئے لاگو ہوتی ہے (موزوں عمر)۔</p>
    <p class="mb-5">2.5.3 جوئی حکمت عملی کی خلاف ورزی نہیں ہے جہاں آپ رہتے ہیں؛</p>
    <p class="mb-5">2.5.4 آپ قانونی طور پر معاہدہ کرنے کے قابل ہیں۔</p>
    <h3>3. کمپنی اکاؤنٹ کی انتظام</h3>
    <h3>3.2 کمپنی ہر وقت یہ یقین دلاتی ہے کہ:</h3>
    <p class="mb-5">3.1 کمپنی کو اپنی اختیاری رائے پر اور ہر وقت، منسوخ کرنے اور اختتام دینے کا حق
        محفوظ ہے، تاکہ:</p>
    <p class="mb-5">i) اگر اکاؤنٹ ہولڈر دھوکہ دہی کر رہا ہو، یا اگر کمپنی کا اندازہ ہو کہ اکاؤنٹ ہولڈر
        نے کسی نظام کا استعمال کیا ہو جو کلائنٹ اپلیکیشن اور/یا سافٹ ویئر کو شکست دینے کے لئے ڈیزائن کیا گیا ہو یا قابل
        ہو، تو کمپنی اکاؤنٹ میں موجود فنڈز کو معطل کرسکتی ہے اور/یا مصادرہ کرسکتی ہے۔</p>
    <p class="mb-5">کمپنی کا وعدہ ہے کہ وہ سافٹ ویئر پروگرام کو شناخت اور روکنے کے لئے مصنوعی ذہانت
        ('ای آئی سافٹ ویئر') کو ممکن بنانے والے سافٹ ویئر پروگرامات کو شناخت کرے گی جو اس کی ویب سائٹوں پر کھیلنے کی
        اجازت دیتے ہیں۔ </p>
    <p class="mb-5">a) اکاؤنٹ ہولڈر کے فنڈز کو ایک محفوظ اور مناسب طریقے سے انتظام دینا؛ اور/یا</p>
    <p class="mb-5">b) عقد کی جگہ پر گیمنگ اور بیٹنگ ڈیوٹی، جیسے مطابق، کا خرچ ادا کرنا؛</p>
    <p class="mb-5">c) اکاؤنٹ ہولڈر کے بارے میں ڈیٹا کا انتظام لاگو قانونوں، ڈیٹا حفاظت ایکٹس اور/یا
        مماثل کے مطابق کرنا؛ d) کسی ایسی چیز کی پیش کش کرنا جو کسی مشتری کو کسی فنڈ کی منتقلی کی طرف بڑھنے کے لئے مجبور
        کرے۔</p>
    <p class="mb-5">3.3 کمپنی اکاؤنٹ ہولڈرز کے فنڈز کو کمپنی کے اپنے فنڈز سے مختلف ایک کلائنٹ اکاؤنٹ
        میں رکھے گی، جو ریگولیٹر کی طرف سے منظور شدہ ایک مالی ادارے کے ساتھ ہوگا۔</p>
    <p class="mb-5">3.4 کمپنی کا اکاؤنٹ کوئی سود نہیں دیتا۔ اکاؤنٹ ہولڈر کو کمپنی کو ایک مالی ادارہ
        نہیں سمجھنا چاہئے۔</p>
    <p class="mb-5">3.5 ایک اکاؤنٹ ہولڈر صرف ایک کمپنی اکاؤنٹ رکھ سکتا ہے۔ اس قاعدہ کی خلاف ورزی کی
        صورت میں، کمپنی کو اختیار ہوگا کہ اکاؤنٹ ہولڈر کی خلاف ورزی کی شدت سے بلاک کرے اور/یا ہولڈر کی خلاف ورزی کے
        مطابق کسی ایک کمپنی اکاؤنٹ میں سبھی فنڈز کو دوبارہ تفویض کرے۔</p>
    <p class="mb-5">3.6 ایک کمپنی اکاؤنٹ غیر قابل منتقل ہے۔ کھلاڑیوں کو اکاؤنٹس کو بیچنا، منتقل کرنا
        یا دوسرے کھلاڑیوں کو فنڈز کو منتقل کرنا ممنوع ہے۔</p>
    <p class="mb-5">3.7 اکاؤنٹ ہولڈر کسی دوسرے فرد کو، مثلاً کسی نابالغ، کو کمپنی کے اکاؤنٹ کا استعمال
        کرنے یا دوبارہ استعمال کرنے کی اجازت نہیں دے گا، ویب سائٹ سے کسی مواد یا معلومات کو داخل کرنے یا استعمال کرنے کی
        اجازت نہیں دے گا، کوئی انعام قبول نہیں کرے گا، یا سروسز میں شرکت نہیں کرے گا۔</p>
    <p class="mb-5">a) کمپنی اکاؤنٹ کھولنے سے انکار کرنا اور/یا موجودہ کمپنی اکاؤنٹ بند کرنا بغیر کسی
        وجہ کے؛</p>
    <p class="mb-5">b) کسی وجہ کے بغیر جمع کرانے سے انکار کرنا؛</p>
    <p class="mb-5">c) دستاویزات کی درخواست کرنا تاکہ اکاؤنٹ ہولڈر کی شناخت، اس کے کارڈ کا استعمال
        کرنے کی اجازت، یا دیے گئے دیگر حقائق اور معلومات کی تصدیق کریں۔ ایسی درخواست کسی بھی دیئے گئے لمحے پر کی جا سکتی
        ہے اور کمپنی کو اختیار ہے کہ تحقیقات کے لیے اکاؤنٹ کو معطل کر دے۔</p>
    <p class="mb-5">f) اکاؤنٹ ہولڈر کے فنڈز کو نقدی انتظام کی عام قبولیت کے مطابق حاصل کرنا اور ان کا
        انتظام کرنا؛ اس میں ایک مالی ادارہ اور/یا ایک ادائیگی کا حل فراہم کرنے والے کو اکاؤنٹ ہولڈرز کے فنڈز کو رکھنے کی
        ذمہ داری دی جا سکتی ہے؛</p>
    <p class="mb-5">g) ایک کمپنی اکاؤنٹ پر دستیاب فنڈز کو مسترد اور/یا مصادرہ کرنا اور/یا کسی دعویٰ کی
        عزت نہ کرنا، اس صورت میں، سیدھی یا غیر سیدھی طریقے سے: (i) کمپنی کے قوانین کی خلاف ورزش ہوئی ہوئی ہوئی ہوئی ہوئی
        ہوئی ہوئی ہوئی ہوئی ہوئی ہوئی ہوئی ہوئی ہوئی ہو</p>
    <p class="mb-5">h) اکاؤنٹ ہولڈر کی شرکت کو گیمز، تشہیری سرگرمیوں، مقابلوں یا دیگر خدماتوں میں
        منسلک کرنے یا منسلک کرنے کی صورت میں معطل کرنا اور/یا منسلک کرنا، جب کمپنی کو یہ رائے ہو کہ کمپنی اکاؤنٹ غیر
        قانونی، فریبی یا منافقانہ عملوں کے لئے استعمال ہو رہا ہے، رہا ہے، یا ہو سکتا ہے۔</p>
    <h3>4. غیر فعال اکاؤنٹس</h3>
    <h3>4.2 کمپنی کو غیر فعال اکاؤنٹس پر چارج کرنے یا بند کرنے کا حق ہے اگر:</h3>
    <p class="mb-5">4.1 ایک "غیر فعال اکاؤنٹ" کمپنی کا اکاؤنٹ ہوتا ہے جس میں کوئی بھی لاگ ان اور/یا
        لاگ آؤٹ کا کوئی ریکارڈ نہ ہو، جو کہ چھ متواتر مہینوں سے زیادہ ہو۔</p>
    <p class="mb-5">a) کوئی بھی لین دین کمپنی اکاؤنٹ پر چھ متواتر مہینوں کے دوران درج نہیں ہوئے ہیں؛
        (ایک سونے ہوئے اکاؤنٹ وہ اکاؤنٹ ہے جو چھ مہینوں کے لئے دسترس نہیں کیا گیا ہے، جس میں حقیقی رقم کا بیلنس ہو۔ جب
        آپ کا اکاؤنٹ سونا ہوتا ہے، اگر ہم آپ سے رابطہ نہیں کر پا رہے ہوں، تو کمپنی کو آپ کے اکاؤنٹ کو بند کرنے اور</p>
    <p class="mb-5">b) کمپنی نے غیر فعال اکاؤنٹ کے اکاؤنٹ ہولڈر سے رابطہ کرنے کی معقول کوشش کی لیکن
        اکاؤنٹ ہولڈر کو اطمینان دہکر لوکیٹ نہیں کیا گیا یا درکار ادائیگی کی ہدایات دستیاب نہیں تھیں۔</p>
    <p class="mb-5">4.3 اگر ایک اکاؤنٹ بلاک یا محروم ہو اور اکاؤنٹ میں ابھی بھی بیلنس موجود ہو، تو آپ
        کو ہمارے کسٹمر سپورٹ سے رابطہ کیا جائے گا جس میں آپ کو آپ کے اکاؤنٹ میں موجود مقدار کی وصول کے لیے تفصیلات فراہم
        کرنے کی درخواست کی جائے گی۔</p>
    <p class="mb-5">4.4 کمپنی کو غیر فعال اکاؤنٹ پر مہینہ وار فیس چارج کرنے کا حق ہے جو 5 یورو (یا
        موازنہ شدہ کرنسی) فی مہینہ کے برابر ہے۔</p>
    <p class="mb-5">4.5 کسی بھی غیر فعال اکاؤنٹ پر کسی بھی بیلنس جو کیش بیک عرضی سہولت کے نتیجہ میں
        ہو، فوراً ختم ہو جائے گا۔</p>
    <h3>5. چارج بیک</h3>
    <p class="mb-5">5.1 ذیلی ذیلیوں کے تحت اور کسی بھی لاگو قانون، ریگولیشن، قانون سازی یا پالیسی، یا
        کمپنی کے قواعد کی کسی دیگر پالیسی کے تحت، کمپنی کو اختیار ہوگا کہ جب ایک چارج بیک کا درخواست کی گئی ہو، تو کمپنی
        اکاؤنٹ کو بلاک کرنے کا حق ہوگا۔</p>
    <p class="mb-5">5.2 جب ایک چارج بیک کا درخواست کیا گیا ہو، تو کمپنی اکاؤنٹ ہولڈر کو ایک "چارج بیک
        نوٹس" بھیجے گی جو کہ اکاؤنٹ ہولڈر کی تفصیلات میں ذکر شدہ ای میل ایڈریس پر، اکاؤنٹ ہولڈر کی شناخت اور اکاؤنٹ
        ہولڈر کے کریڈٹ کرنے کے استعمال شدہ اداؤ کی تصدیق کے لئے، انتظامات کونفرم کرنے کی خواہش ہوگی۔ انتظار کے بغیر
        اکاؤنٹ ہولڈر کی شناخت کی تصدیق اور انتظامات کی تصدیق کے بغیر، چارج بیک نوٹس کے بعد، کمپنی دو تحریری یادداشتیں
        اکاؤنٹ ہولڈر کو ای میل میں بھیجے گی، جن میں ہر ایک کی پراسسنگ فیس پچاس (50) یوروز ہوگی جو کہ کسی بھی Untainted
        فنڈز پر دستیاب ہوگی۔</p>
    <p class="mb-5">5.3 جب ایک کمپنی اکاؤنٹ کو چارج بیک کی وجہ سے بلاک کر دیا گیا ہے اور اکاؤنٹ ہولڈر
        نے نہ: a) تین ساتھ متواتر مہینوں کے لئے کمپنی اکاؤنٹ میں لاگ ان نہیں کیا؛ یا b) کمپنی کو اپنی شناخت اور اکاؤنٹ
        ہولڈر کے اکاؤنٹ میں Untainted فنڈز کریڈٹ کرنے کے استعمال شدہ اداؤ کی تفصیلات کی تصدیق کی اور پھر واپسی کی
        درخواست کی ہے؛ تو کمپنی اکاؤنٹ پر کسی بھی Untainted فنڈز کو اس طرح کے دلائل کے طور پر سخت اکاؤنٹ کی بیلنس کی طرح
        ہندسہ کردیں گے۔</p>
    <h3>6. کمپنی اکاؤنٹ کی بندش</h3>
    <h3>6.5 ادائیگی کے اصول</h3>
    <h3>6.8 کمپنی صرف اکاؤنٹ کے کریڈٹ بیلنس کے ساتھ کسی بھی معاملہ نہیں کرے گی مگر:</h3>
    <p class="mb-5">6.1 اکاؤنٹ ہولڈر کبھی بھی کمپنی اکاؤنٹ بند کرسکتا ہے اپنی تفصیلات میں کمپنی کی
        مشتری سپورٹ سے رابطہ کرکے ویب سائٹ پر "مدد" حصہ میں فراہم کردہ رابطہ تفصیلات کا استعمال کرتے ہوئے ای میل کے
        ذریعے۔ کمپنی اکاؤنٹ میں کوئی بھی فنڈز اکاؤنٹ ہولڈر کو واپس کر دی جائیں گی۔</p>
    <p class="mb-5">6.5.5 کمپنی اکاؤنٹ سے/کو ادائیگی/انسداد کا طریقہ۔</p>
    <p class="mb-5">6.6.1 ایک اکاؤنٹ ہولڈر کو صرف اسے اجازت ہے:</p>
    <p class="mb-5">a) اپنے ذاتی کارڈ یا کسی مالی ادارے یا ان کے لائسنس کے ساتھ بنائے گئے اپنے ذاتی
        اکاؤنٹ کے ذریعے کمپنی اکاؤنٹ میں جمع کروانے۔ اگر ہم کسی دوسرے اکاؤنٹ ہولڈر یا عموماً 3 ویں افراد کے فنڈز کا
        استعمال کرتے ہوئے اکاؤنٹ ہولڈر کو دیکھتے ہیں (جس میں شامل ہیں لیکن اس سے محدود نہیں ہیں 3 ویں افراد کی طرف سے
        فنڈز حاصل کرکے ان کے خود کمپنی اکاؤنٹ میں مستقیم جمع کر دیتے ہیں)، تو ہمیں کسی بھی جیتوں کو ناقص قرار دینے اور
        آپ کے بیٹنگ اکاؤنٹ میں کسی بھی بیلنس (جیت اور جمع کرانے) کو مسترد کرنے کا حق ہوگا، اس معاہدہ کو ختم کرنے کا حق
        یا سروسز کی فراہمی کو معطل کرنے کا حق یا آپ کے اکاؤنٹ کو غیر فعال کرنے کا حق رکھتے ہیں۔</p>
    <p class="mb-5">b) کمپنی اکاؤنٹ میں موجود فنڈز کی واپسی کی درخواست کرنے کے لئے اپنے ذاتی اکاؤنٹ کی
        تفصیلات کی تصدیق کرنا جو ایک مالی ادارے یا ان کے لائسنس کے ساتھ بنائی گئی ہے۔</p>
    <p class="mb-5">6.6.2 اکاؤنٹ ہولڈر اپنے ذاتی اکاؤنٹ کی صحیح تفصیلات کمپنی کو فراہم کرنے کے لئے ذمہ
        دار ہے تاکہ کمپنی اکاؤنٹ سے واپسیوں کے لئے۔</p>
    <p class="mb-5">6.6.3 اکاؤنٹ ہولڈر کو نہیں چاہئے کہ تیسری جماعتوں کو کمپنی اکاؤنٹ کا استعمال کرنے
        کی اجازت دے یا کمپنی اکاؤنٹ سے جمع کروانے یا واپسی کرنے کی اجازت دے۔</p>
    <p class="mb-5">6.6.4 ان اعلانات کی پالیسیوں کی پوری کرنا اکاؤنٹ ہولڈر کی ذمہ داری ہے۔</p>
    <p class="mb-5">6.7 کمپنی کسی اکاؤنٹ ہولڈر سے شرط لینے کو قبول نہیں کرے گی جب تک کمپنی اکاؤنٹ
        اکاؤنٹ ہولڈر کے نام پر قائم نہ ہو اور اس میں شرط کی رقم کو ڈھانچا کرنے کے لئے کافی فنڈ موجود نہ ہوں، یا شرط کی
        رقم کو منظور شدہ طریقے سے ڈھانچنے کی ضرورت ہو۔</p>
    <p class="mb-5">ا) اکاؤنٹ ہولڈر یا ایسی کسی گیم کی دوران جس پر وہ کھیل رہا ہو یا کھیلنے والا ہو
        اکاؤنٹ ہولڈر کی طرف سے کردہ شرط کو کمپنی اکاؤنٹ سے کاٹ لینا۔</p>
    <p class="mb-5">ب) کمپنی اکاؤنٹ میں موجود رقم کو اکاؤنٹ ہولڈر کی درخواست پر اکاؤنٹ ہولڈر کو
        بھیجنا، ریموٹ گیمنگ ریگولیشن کے 37 نصاب کی بنیاد پر۔</p>
    <p class="mb-5">6.2 اگر ایک موجودہ کمپنی اکاؤنٹ بند ہو جائے تو، پہلے ہی داخلہ کر لی گئی التزامات
        کو ادا کیا جائے گا۔</p>
    <p class="mb-5">ج) وصول کردہ جمع کرانے اور منسلک رقم نکالنے کے لئے معقول بینک کے چارجز ادا کرنا؛
        یا</p>
    <p class="mb-5">د) ریموٹ گیمنگ ریگولیشنز کی اجازت کے عین مطابق۔</p>
    <p class="mb-5">6.9 کمپنی اکاؤنٹ کا بیلنس منفی ہو سکتا ہے متنازعہ کی صورت میں۔</p>
    <p class="mb-5">6.10 کمپنی اکاؤنٹ سے نکاسیاں اکاؤنٹ ہولڈر کو ہدایت کردہ طریقہ سے پیمنٹس کے ذریعہ
        کی جاتی ہیں یا اکاؤنٹ ہولڈر کے نام پر ایک بینک اکاؤنٹ میں منتقل کی جاتی ہیں۔ جب ممکن ہو، کمپنی وداعت کو صرف اسی
        اکاؤنٹ میں محدود کرے گی جو اکاؤنٹ ہولڈر نے جمع کرانے کے لئے استعمال کیا ہو۔</p>
    <p class="mb-5">6.11 اکاؤنٹ ہولڈر کی طرف سے منتخب کردہ ادائیگی کے طریقہ کے مطابق، کم سے کم اور/یا
        زیادہ سے زیادہ جمع کرانے کی حدود لاگو ہوسکتی ہیں۔</p>
    <p class="mb-5">6.11.1 اکاؤنٹ سے رقم نکالنے کے لئے، اکاؤنٹ ہولڈر کو مندرجہ ذیل اقدامات کو مکمل
        کرنا ہوگا:</p>
    <p class="mb-5">1. اکاؤنٹ میں "نکالنا" منتخب کریں۔</p>
    <p class="mb-5">2. مناسب نکالنے کا طریقہ منتخب کریں۔</p>
    <p class="mb-5">3. درکار شخصی اعداد و شناختی ڈیٹا فراہم کریں اور رقم کا اشارہ دیں۔</p>
    <p class="mb-5">4. تصدیق کریں۔ تراکیب کی درخواست کی تصدیق کرنے والا پیغام ظاہر ہوگا۔</p>
    <p class="mb-5">6.3 وہ اکاؤنٹ ہولڈر جو بند، بلاک شدہ یا محروم اکاؤنٹ میں محفوظ دھندے کو واپس کرنا
        چاہتے ہیں، انہیں صارف سپورٹ سے رابطہ کرنے کی تجویز دی جاتی ہے۔ ان کھیچوٹیوں کو صرف اسی اکاؤنٹ میں بھیجا جائے گا
        جس سے رقم شروع ہوئی تھی۔ واپسی کے لئے محدودیتیں بھی ہوسکتی ہیں۔ کھلاڑیوں کی شناخت کو پہلے تصدیق کرنی چاہیے۔
        استعمال کنندہ کو پہلی واپسی سے کم از کم ایک دن پہلے تصدیق کے لئے دستاویزات بھیجنے ہوں گے۔</p>
    <p class="mb-5">6.12 کمپنی کو ویب سائٹ پر بیان کردہ انتظامی لاگتوں کے لئے اکاؤنٹ ہولڈر کو چارج
        کرنے کا حق محفوظ ہے جو اکاؤنٹ ہولڈر کی طرف سے کی جاتی ہوئی واپسیوں کی وجہ سے ہوں،</p>
    <p class="mb-5">6.13 اکاؤنٹ ہولڈر جو اپنی مقامت یا وطنیت میں انٹرنیٹ کے ذریعے شرط لگانا غیر قانونی
        ہو سکتا ہے؛ اگر یہ موقع پایا جائے تو، اکاؤنٹ ہولڈر کو شرط لگانے کا مقصد کارڈ استعمال کرنے کی اجازت نہیں ہوگی۔
    </p>
    <p class="mb-5">6.14 ایسے علاقوں میں جہاں قانون کی روشنی میں اشتراک ممنوع ہو، اکاؤنٹ ہولڈر کی شرکت
        کمپنی کے فائدے کے لئے کوئی رقم یا ادائیگی کو متاثر نہیں کرے گی۔</p>
    <p class="mb-5">6.15 کمپنی یا حکومتی اختیار ہو سکتا ہے کہ سب اعلیں کو نقدی دھوندنے سے روکنے یا ان
        کا جائزہ لینے کا مطالبہ کریں۔ کمپنی کی طرف سے پہچانی گئی ساری مشکوک تراکیب کو حکومتی اختیارات کو رپورٹ کیا جائے
        گا۔</p>
    <p class="mb-5">6.16 تمام لین دین کو نقدی دھوندنے سے روکنے کے لئے جائزہ لیا جاتا ہے۔</p>
    <p class="mb-5">6.17 اکاؤنٹ ہولڈر کی ذمہ داری ہے کہ اگر انعام کے لئے کوئی ٹیکس لاگو ہو، تو انعام
        پر ٹیکس کی ادائیگی اور انعام کے ساتھ تمام ضروری تحقیقات کو مکمل کرے۔</p>
    <p class="mb-5">6.18 حرام ہے حرام کے ذریعہ رقم جمع کرنا۔</p>
    <p class="mb-5">6.19 مالیہ / اکاؤنٹنگ کے ادارے کی فعالیت کے ساتھ، صارفین کو مختلف ادائیگی کے
        طریقوں پر رجوع کیا جا سکتا ہے۔</p>
    <p class="mb-5">6.4 اگر جواب دہی کی بیماری یا دھاندے کی وجہ سے ان کی کمپنی کا اکاؤنٹ بند ہو جائے،
        تو ایک فرد کو نئے کمپنی کا اکاؤنٹ نہیں کھولنا چاہئے۔ کمپنی ذمہ دار نہیں ہوگی اگر فرد نئے اکاؤنٹ کھولنے میں
        کامیاب ہو جائے، اور نہ ہی کسی قسم کے بہتریں نتیجے سے۔ کمپنی کو اس قاعدہ کے خلاف کھولے گئے اکاؤنٹ کو کسی بھی وقت
        بند کرنے کا حق محفوظ ہے۔</p>
    <p class="mb-5">کمپنی کے اکاؤنٹ میں جمع اور نکلوائی کبھی بھی فنانسیل انسٹیٹیوشن یا ایک ادائیگی حل
        فراہم کنندہ کے ذریعے کی جائے گی۔ پروسیجرز، شرائط و ضوابط، دستیابی، اور جمع/نکلوائی کی مدت مختلف ہو سکتی ہیں، ان
        پروسیجرز کو مکمل ہونے میں وقت کے مطابق، اور صارف کی رہائش کے ملک اور استعمال ہونے والے فنانسیل انسٹیٹیوشن پر
        منحصر ہوتا ہے۔ مزید معلومات ویب سائٹ پر لاگ ان کرنے پر قسموں "جمع" یا "نکالائی" کے تحت دستیاب ہے۔ یانڈیکس.منی
        کوئک ادائیگی کے بارے میں: "صارف تصدیق کرتا ہے کہ وہ خدمت "یانڈیکس.منی کوئک ادائیگی
        (https://money.yandex.ru/pay/doc.xml?offerid=default)" کی شرائط سے واقف ہے۔"</p>
    <p class="mb-5">6.5.1 کمپنی کو ادارہ دار کرنے کا حق ہے کہ اگر اکاؤنٹ ہولڈر کی شناخت، عمر اور رہائش
        کی جگہ اور فنڈ کی تصدیق کافی نہ ہو تو ادائیگی کا عمل نہیں کرے۔</p>
    <p class="mb-5">6.5.2 کمپنی ایک ادائیگی حل فراہم کنندہ کو مقرر کرسکتی ہے کہ کمپنی کے نام پر اکاؤنٹ
        میں جمع کریں، فنڈز کو رکھیں اور منظم کریں، اور/یا نکالائی کو فوراً کریں۔</p>
    <p class="mb-5">6.5.3 کمپنی کی طرف سے صاف دھن کو کمپنی یا ایک ادائیگی حل فراہم کنندہ کو بھیجا یا
        تحویل دیا نہیں جاتا ہے۔</p>
    <p class="mb-5">6.5.4 کمپنی تمام وصول ہونے والے فنڈز کو اکاؤنٹ ہولڈر کو کمپنی کے طرف سے وصول کرے
        گی، یا اکاؤنٹ ہولڈر کے لئے کمپنی کے ذمہ دار ہونے والے فنڈز کو اکاؤنٹ میں جمع کرے گی۔</p>
    <h3>7. ذمہ داری کی حد</h3>
    <p class="mb-5">7.1 آپ خود اپنے خطرے پر ویب سائٹ میں داخل ہوتے ہیں اور کھیلوں میں شرکت کرتے ہیں۔
        ویب سائٹ اور کھیل بالکل کسی بھی ضمانت کے بغیر فراہم کیے جاتے ہیں، چاہے وہ ظاہر کی جائے یا زاہر کیا جائے۔</p>
    <p class="mb-5">7.2 پیشگوئی کے فراہم کرنے والے پرانے ضابطے کی عمومیت کو خراب کرنے کے بغیر، کمپنی،
        اس کے ڈائریکٹرز، ملازمین، شراکت دار، خدمات فراہم کنندگان:</p>
    <p class="mb-5">7.2.4 یہ یقینی بناتے نہیں کرتے کہ سافٹ ویئر یا ویب سائٹ/ویب سائٹز ان کے مقصد کے
        لئے موزوں ہیں؛</p>
    <p class="mb-5">7.2.5 یہ یقینی بناتے نہیں کرتے کہ سافٹ ویئر اور ویب سائٹ معاف از خطا ہیں؛</p>
    <p class="mb-5">7.2.6 یہ یقینی بناتے نہیں کرتے کہ ویب سائٹ/ویب سائٹز اور/یا کھیل بلا انقطاع دستیاب
        ہوں گے؛</p>
    <p class="mb-5">7.2.7 آپ کی ویب سائٹ کا استعمال یا آپ کے کھیل میں شرکت کے تعلق میں کوئی بھی نقصان،
        لاگت، اخراجات یا نقصانات، چاہے وہ سیدھا، غیر مستقیم، خاص، متناسب، اتفاقی یا کچھ اور بھی ہوں، کے لئے ذمہ دار نہیں
        ہوں گے۔</p>
    <p class="mb-5">7.3 آپ اس وقت کمپنی، اس کے ڈائریکٹرز، ملازمین، شراکت دار، اور خدمات فراہم کنندگان
        کو مکمل طور پر خطرات، اخراجات، نقصانات، دعویٰ اور ذمہ داریوں سے بچانے اور ان کو بری کرنے کے لئے متعہد ہوتے ہیں
        جو آپ کے ویب سائٹ کے استعمال یا کھیل میں شرکت سے وابستہ ہو سکتے ہیں۔</p>
    <h3>8. مکر، فریب، دغا بازی اور جرمانہ فعالیت</h3>
    <h3>8.3. اگر:</h3>
    <h3>8.4. اس پیراگراف 11 کے مقصد کے لئے:</h3>
    <h3>اگر ایک معقول شک نمود ہو کہ اکاؤنٹ ہولڈر نے خود یا گروپ کے حصے کے طور پر کوئی بونس کا دغا بازی کیا ہو یا کوشش کی
        ہو، تو کمپنی کو حق ہے:</h3>
    <p class="mb-5">8.1. خدمات کے حوالے سے مندرجہ ذیل عملیات:</p>
    <p class="mb-5">ج) ہمیں علم ہو جائے کہ آپ نے اپنے اکاؤنٹ میں کی گئی خریداریوں یا جمع کی گئی رقموں
        میں سے کسی کو منسوخ کر دیا ہے یا انکار کیا ہے؛ یا</p>
    <p class="mb-5">د) آپ دیوالیہ ہو جائیں یا دنیا کے کسی بھی حصے میں مماثل پیروکاریاں جائیں، پھر، (آپ
        کے اکاؤنٹ کی کسی بھی معلومات کی سسپنشن اور/یا ختم کے ساتھ) ہمارے پاس آپ کے اکاؤنٹ کے حوالے سے پورا یا حصہ انفکار
        کرنے کا حق ہوگا اور/یا اس پیراگراف میں ذکر شدہ واقعات سے کسی بھی اکاؤنٹ کو متاثر کرنے والی جمع، ادائیگیوں، بونسز
        یا جیتوں کی رقم واپس حاصل کرنے کا حق ہوگا۔</p>
    <p class="mb-5">ا) "دغابازی کا عمل" آپ یا آپ کے مماثل کسی فرد کے ذریعہ انگیںے جانے والی کوئی بھی
        دغابازی سے متعلق ہے، اور شامل ہوں گے، بغیر کسی پابندی کے:</p>
    <p class="mb-5">- دغابازی کی سڑک کرنا اور ریک بیک کارروائی؛</p>
    <p class="mb-5">- آپ یا کوئی دوسرا شخص جو کبھی بھی آپ کے ساتھ ایک گیم میں شرکت کر رہا ہو اور جو
        کسی چوری یا غیر مجاز کریڈٹ یا ڈیبٹ کارڈ کا استعمال کر رہا ہو، جیسے فنڈ کی سورس؛</p>
    <p class="mb-5">- آپ کی دوسروں کے ساتھ مل کر غیر انصافی فائدہ حاصل کرنا (ہماری طرف سے پیش کردہ
        بونس سکیمز یا اسی طرح کے انتریز کے ذریعے؛</p>
    <p class="mb-5">- غلط یا مغالطہ اکاؤنٹ کی معلومات کی رجسٹریشن کی کوشش؛</p>
    <p class="mb-5">- آپ کی طرف سے کسی بھی واقعہ یا کوشش جو ہمیں کسی بھی لازمی اطلاقی حکومت میں غیر
        قانونی سمجھا جائے، برا فیث، یا ہمیں فریب دینے کا ارادہ رکھتا ہو اور/یا ہمیں نظامی یا قانونی پابندیوں کو دھوکا
        دینے کے ارادے سے محاذات کرنے کے لئے مناسب سمجھا جائے، چاہے اس طرح کا عمل یا کوشش کسی بھی نقصان یا ضرر کا باعث ہو
        یا نہ ہو؛</p>
    <p class="mb-5">ب) "غیر انصافی فائدہ" شامل ہوگا، بغیر کسی پابندی کے:</p>
    <p class="mb-5">- ہمارے یا کسی تیسری شخص کے سافٹ ویئر میں کوئی خرابی، خلل یا غلطی کا استفادہ جو آپ
        نے خدمات کے ساتھ استعمال کیا (کسی بھی کھیل کے لحاظ سے؛</p>
    <p class="mb-5">ا) بونس یا دیگر پروموشن کا استحصال (پیراگراف 11.4 میں معرفت کے طور پر)</p>
    <p class="mb-5">- خود کار کھلاڑیوں ('بوٹس')، یا دوسرے 3 ویں شخص کے سافٹ ویئر یا تجزیہ کاری نظامات
        کا استعمال؛ یا</p>
    <p class="mb-5">- آپ کے ذریعہ، پیراگراف 18 میں تعریف شدہ 'غلطی' کا استغلال، ہر صورت میں یا آپ کی
        فائدہ کے لئے اور/یا ہم یا دوسروں کے نقصان کے لئے۔</p>
    <p class="mb-5">ج) بونس کا استحصال شامل ہوتا ہے، مگر اس سے محدود نہیں ہے:</p>
    <p class="mb-5">ا. بونس، مفت شرطوں اور کسی بھی دوسرے پروموشنل پیشکش کی شرائط اور ضوابط کی خلاف
        ورزی</p>
    <p class="mb-5">ب. مختلف اکاؤنٹس کھولنا تاکہ مختلف بونسز کا دعوہ کیا جا سکے؛</p>
    <p class="mb-5">ج. تمام بونسز بونس انجن کی بنیاد پر بونس استعمال کی محدودیت کے ذریعے ختم ہوتے ہیں،
        اور، اگر کچھ مخصوص وجہ سے ایک انفرادی کھلاڑی کے ذریعہ کوڈ کو ذکر شدہ رقم سے زیادہ استعمال کیا جائے، تو کمپنی کو
        بونس کی مزید کھیلنے والے کا پیچھا کرنے کا حق ہوتا ہے اور بونس جیتنے کا پیشہ ور کٹا دے گا پلس تمام 3rd طرف کی
        چارجز جو کھلاڑی کی سرگرمی سے نکلتے ہیں (ادائیگی کی فیس، فراہم کنندگان کی فیس وغیرہ)</p>
    <p class="mb-5">ا. اکاؤنٹ ہولڈر کو مخصوص کردہ بونس اور اس بونس سے کوئی جیتنے والی رقم کو حذف کرتا
        ہے، اور/یا</p>
    <p class="mb-5">ب. اکاؤنٹ ہولڈر سے بونس کی پیشکش کو منسوخ، انکار، یا واپس لینا، اور/یا</p>
    <p class="mb-5">ج. خاص مصنوعات کا رسائی بند کرنا، اور/یا</p>
    <p class="mb-5">چ. اکاؤنٹ ہولڈر کو مستقبل کی کوئی بھی پروموشنل پیشکشوں سے محروم کرنا، اور/یا</p>
    <p class="mb-5">ب) ناجائز بیرونی عوامل یا دباؤ کا استعمال (جو عام طور پر دغابازی کہلاتا ہے)</p>
    <p class="mb-5">د. اکاؤنٹ ہولڈر کا اکاؤنٹ فوراً ختم کرنا۔</p>
    <p class="mb-5">ج) غیر انصافی فائدہ حاصل کرنا (پیراگراف 11.4 میں معرفت کی جاتی ہے)؛</p>
    <p class="mb-5">د) کسی بھی نقلی اکاؤنٹس کھولنا؛ اور/یا</p>
    <p class="mb-5">ے) فریبی عمل یا جرمانہ فعالیت (پیراگراف 11.4 میں معرفت کی جاتی ہے) کا انجام دینا
        "ممنوع عمل" ہے اور مجاز نہیں ہیں۔ ہم یہ سبقدر ممکن اقدامات اٹھائیں گے تاکہ ایسے عمل کی روک تھام کی جائے اور ان
        پر نظر رکھی جائے اگر یہ واقع ہوتے ہیں۔</p>
    <p class="mb-5">8.2. آپ متفق ہوتے ہیں کہ آپ خدمات تک رسائی حاصل کرنے یا ان کا استعمال کرنے کے ساتھ
        کسی بھی قسم کے ممنوع عمل میں شرکت نہیں کریں گے۔</p>
    <p class="mb-5">ا) ہم کو عقلمند سبب معلوم ہو کہ آپ نے کسی بھی قسم کے ممنوع عمل میں شرکت کی ہے یا
        ان سے منسلک ہیں (اور ہماری یقینیت کا بنیاد ہمیشہ کسی بھی دغابازی، دھاندلی اور ملوث ہونے والے ترقیاتی پر کی جائے
        گی جو موزوں وقت پر جوا اور کھیل کی صنعت میں استعمال ہوتی ہے)؛ یا</p>
    <p class="mb-5">ب) آپ نے جوا اور کھیل کی سروسز کے کسی بھی دوسرے آن لائن فراہم کنندہ کے ساتھ شرکت
        کی ہے اور (ایسے کھیل کے نتیجے میں) کسی بھی قسم کے ممنوع عمل یا دوسرے غلط یا غیر انصافی فعالیت کے شک میں مبتلا
        ہیں؛ یا</p>
    <h3>9.1 اگر آپکے اکاؤنٹ میں ہمارے کوئی باقی رقم نہیں ہوتی ہے، تو آپ ہمیشہ کے لیے اپنے اکاؤنٹ کو بند کر سکتے ہیں اور
        شرائط استعمال کو کم سے کم بیس گھنٹے کی معلومات ہمیں بتانے کا حق رکھتے ہیں۔</h3>
    <h3>ہم کی طرف سے بند کرنا اور ختم کرنا</h3>
    <h3>ہم کی طرف سے تعطیل</h3>
    <h3>9.10 کمپنی اپنی ایکل اختیار میں، آپ کے بیٹنگ اکاؤنٹ میں کوئی بھی جیت اور کسی بھی بیقان ایکاؤنٹ کے بیقان اور جیت
        میں کوئی بھی بقیہ رقم کو معطل کرنے کا حق رکھتی ہے، معاہدہ ختم کرنے کا حق رکھتی ہے اور/یا خدمات کی فراہمی کی
        تعطیل یا آپ کے اکاؤنٹ کو غیر فعال کرنے کا حق رکھتی ہے اگر:</h3>
    <p class="mb-5">9.1.1 آپکے اکاؤنٹ کو بند کرنا چاہتے ہیں؛ اور</p>
    <p class="mb-5">9.8 مندرجہ ذیل پیراگراف کم سے کم شرائط استعمال کے ختم ہونے کے بعد باقی رہیں گے:
        19، 20، 21، 22، 23، 25، 26، 28، 29، 30، 31، 32 اور 34 اور تشریح کے مقاصد کے لیے درکار کوئی اور پیراگراف؛ اس کے
        علاوہ شرطوں کے متعلق بیٹنگ رولز، متعلقہ گیم رولز اور اضافی شرائط کے کوئی متعلقہ حصے۔</p>
    <p class="mb-5">9.1.2 آپکے اکاؤنٹ کو بند کرنے کی وجوہات کا ذکر کرنا، خاص طور پر اگر آپ خدمات کے
        استعمال کی سطح کے بارے میں پریشانی کی وجہ سے ایسا کر رہے ہیں۔</p>
    <p class="mb-5">9.9 ہمیں شرائط استعمال میں صریح طور پر مختصر حالات میں آپکے اکاؤنٹ کو تعطیل کرنے
        کا حق ہوگا۔ آپ کے اکاؤنٹ کی تعطیل کے بعد: (ا) کوئی سرگرمی (جیسے جمع، نکالنا، بیٹنگ یا گیمنگ) اجازت دی گئی نہیں
        جائے گی جب تک کہ ہم اسے دوبارہ فعال نہیں کرتے؛ (ب) کوئی بونس یا وابستہ جیت آپ کے اکاؤنٹ میں منتقل نہیں کی جائے
        گی؛ اور (ج) ہم ایسی مسئلہ کا سامنا کریں گے جس نے اکاؤنٹ کی تعطیل پیدا کی ہے تاکہ اسے ممکنہ جلدی کے ساتھ حل کیا
        جا سکے کہ اکاؤنٹ فعال یا بند کیا جا سکے۔</p>
    <p class="mb-5">i) ہم نے تشخیص دی ہے کہ آپ نے ہماری سائٹ تک رسائی حاصل کرنے کے لیے استعمال کی گئی
        کسی بھی ڈیوائس کے آئی پی پتہ کے ساتھ کسی بھی طریقے سے چھپائی یا مداخلت کی ہے (جیسے کہ ورچوئل پرائیویٹ نیٹ ورک
        “VPN” کا استعمال کرنا)</p>
    <p class="mb-5">ii) ہمیں اطلاع حاصل ہوتی ہے کہ صارف نے تصدیق کی عملیات کے دوران جعلی دستاویزات
        (فوٹو، اسکینڈ دستاویزات، اسکرین شاٹس وغیرہ) استعمال کی ہیں یا معاہدہ فعال ہونے کے کسی بھی نقطہ پر</p>
    <p class="mb-5">iii) معقول شک و شبہ ہے کہ آپ نے بونس کی مسلسل یا گروہ یا اپنے اکاؤنٹ کے ساتھ کسی
        طرح کی سازش کی ہے یا اس کی کوئی کوشش کی ہے</p>
    <p class="mb-5">iv) آپ یا تیسری جانب کی شرکت کی حصہ ہیں اور فریبی، متفقہ، مرمت یا دوسری غیر قانونی
        سرگرمی کی کسی بھی صورت میں ہماری خدمات میں شرکت یا آپ کی شرکت کیا گیا ہے، یا آپ نے کسی بھی سافٹ ویئر مددگار
        طریقے یا تکنیک یا ہارڈ ویئر آلات کا استعمال کیا ہے۔</p>
    <p class="mb-5">9.11 کمپنی کو بغیر وضاحت موجودہ اکاؤنٹ بند کرنے کا حق محفوظ ہے۔ اس صورت میں، یا
        صارف کے طریقے سے اکاؤنٹ بند کرنے کی صورت میں گل رقم ادا کر دی جائے گی مگر اگر کوئی فریبی (مثلاً، ایربٹراج وغیرہ)
        کارروائی کی شک استعمال ہوتی ہے تو۔ فریبی عمل کی صورت میں، جیت بطور ناخالص قرار دی جائے گی اور جمع رقم وصول کی
        جائے گی بعد میں جب ہم متعلقہ انتظامی اور لین دینی فیسز کو کٹ کر کے اور ان فیسز کو کمپنی کو مختار ہونے والی
        اختیارات کی بنا پر دوسری شکایت کرنے والے افسران کو ادا کریں گے۔ کمپنی کو بھی اختیار ہے کہ اگر کسی صارف کو کسی
        بھی شبہ فریبی عمل میں شامل ہونے کی صورت میں مناسب انتظامات کو شائع کرے۔</p>
    <p class="mb-5">اگر کمپنی کے اکیلے فیصلے میں، کھلاڑی کو دھوکہ دہی یا کمپنی کو فریب دینے کا کوئی
        مقدورہ محسوس ہوتا ہے، کسی بھی طریقے سے مثلاً میچ کی کرکٹ، استعمال کرکے (مثلاً مارٹنگیل، انٹی-مارٹنگیل نظام) جو
        غیر ایماندار جیت یا ادائیگی کے فراڈی نیتیجے حاصل کرنے کے منصوبے کرتا ہے یا اگر وہ غلط اور/یا بدگوئی کے تبصرے
        کرتا ہے کے ساتھ کھیل کمپنی کی کارروائیوں کے متعلق، کسی بھی وسیلے یا فورم میں، یا اگر کمپنی کو کھلاڑی کو فریبی
        ادائیگی کا شک کرتا ہے، جو چوری ہوئے کریڈٹ کارڈ یا کسی اور فریبی سرگرمی کے استعمال سمیت شامل ہیں (چارج بیک یا کسی
        اور ادائیگی کی الٹ پلٹ) یا ممنوعہ لین دین (چندہ دہوکے کمائی سمیت)، تو کمپنی کو کھلاڑی کے اعمال کو ان کی شناخت
        اور ای میل ایڈریس کے ساتھ شائع کرنے کا حق محفوظ ہے، ساتھ ہی بینکوں، کریڈٹ کارڈ کمپنیوں، اور مناسب ایجنسیوں کو یہ
        معلومات دوبارہ پیش کرنے کا.</p>
    <p class="mb-5">ہمارے پاس منصفانہ وجوہات ہیں کہ جہاں ہم کسی کھلاڑی کو مواقع ہوں کہ وہ کمپنی کے
        ساتھ دھوکہ دہی یا نقصان پہنچانے کی کوشش میں موجود ہے یا کر چکا ہے اور/یا خدمات اور/یا پلیٹ فارم کے ساتھ کسی بھی
        طریقہ کار میں.</p>
    <p class="mb-5">ڈیٹا حفاظت، حفاظت اور دھوکہ دہی سے بچاؤ کے دلائل کی روشنی میں، کمپنی کسی بھی رابطہ
        کے ذریعے خدمات اور/یا پلیٹ فارم میں شامل کردہ کسی بھی رابطہ کے ذریعے کسی بھی پیشکش، مصنوعات یا خدمات (چاہے
        کھلاڑی کی ہو یا کسی تیسری شخص کی) کی پیشکش یا تشہیر کو مجاز نہیں کرتی۔ کھلاڑی کو صریحاً ممنوع کیا گیا ہے کہ وہ
        کسی بھی پیشکش، مصنوعات یا خدمات کی پیشکش یا تشہیر کے لئے معلومات پوسٹ یا ہمارے گاہکوں سے رابطہ کرے۔</p>
    <p class="mb-5">ہم آپ کی درخواست کا جواب دیں گے، آپ کے اکاؤنٹ کو بند کرنے کی تصدیق کرتے ہوئے، اور
        اس کے بند ہونے کی تاریخ کو معقول مدت میں، پیش کرتے ہیں، فراہم کیا، جب تک آپ ہمارے ذریعہ اس طرح کردی جاتی ہے (جس
        وقت سے یہ شرائط کار ٹھر جاتی ہیں).</p>
    <p class="mb-5">9.2 جب آپ فقرہ 9.1 کے تحت آپ کے اکاؤنٹ کا بند کرنے کا درخواست دیتے ہیں، فقرہ 9.3
        کے تحت، آپ کے اکاؤنٹ میں باقی رقم کو آپ کو واپس کریں۔</p>
    <p class="mb-5">9.3 اگر کسی بھی لمحے میں آپ کے اکاؤنٹ کی بندش ہو، ہم کے لئے فقرہ 9.6 کے حقوق کو
        محدود کیے بغیر، آپ کے اکاؤنٹ پر باقی رقم کی واپسی سے، کوئی فنڈ: (ا) فقرہ 8 (ملموس، دھوکہ، فریب اور جرمناک سرگرمی
        کے تحت) کے مطابق؛ (ب) فقرہ 20 (استعمال کے شرائط کی خلاف ورزی) کے مطابق؛ (ج) استعمال کے شرائط کے ذریعہ (مناسب طور
        پر، فقرہ 5.4 شامل)؛ یا (ڈ) قانون یا ریاستی نظام کے طور پر ضرورت ہے۔</p>
    <p class="mb-5">9.4 آپ کے اکاؤنٹ پر باقی رقم کی واپسی کے دوران، ہم آپ کی اکاؤنٹ کی رجسٹریشن کے
        دوران آپ نے فراہم کی گئی وہی ادائیگی کی طریقہ کار استعمال کریں گے، یا جیسا کہ ہم مناسب سمجھیں، کوئی دوسری
        ادائیگی کی طریقہ کار۔</p>
    <p class="mb-5">9.5 جب آپ اپنے اکاؤنٹ کو بند کرتے ہیں، تو کچھ مواقع میں ہم اسی طرح کے اکاؤنٹ کو
        دوبارہ کھول سکتے ہیں جیسے پہلے، اگر آپ ہم سے ایسا کرنے کی درخواست کریں۔ اس طرح کے مواقع میں، جبکہ آپ کا اکاؤنٹ
        پہلے کی طرح کے اکاؤنٹ کی تفصیلات ہوں گی، تو اس پر وہی شرائط عمل میں ہوں گی جو اس کھولنے کے تاریخ پر موجود ہوں گی
        اور کوئی قبل انتظار حقوق (مثلاً بونس یا مشروط جیت) مزید درست نہیں ہوں گے۔</p>
    <p class="mb-5">9.6 ہم، کسی بھی وقت (اور استعمال کے شرائط میں موجود کسی بھی دوسری پرچیوں کو محدود
        کیے بغیر) آپ کے اکاؤنٹ کو بند کرنے اور شرائط کے استعمال کو ترمیم کرنے کا حق رکھتے ہیں، آپ کو آپ کے رابطہ کی
        تفصیلات کا استعمال کرتے ہوئے آپ کو مکتوب یا کوشش کی گئی اطلاع میں۔ اگر ہم کسی ایسی ترمیم کے بعد اکاؤنٹ کو بند
        کرتے ہیں، تو فقرہ 12.7 کے تحت، آپ کی درخواست کے بعد، جلد سے جلد آپ کے اکاؤنٹ کے بیلنس کو واپس کرتے ہیں۔</p>
    <p class="mb-5">9.7 جہاں ہم فقرہ 11 (ملموس، دھوکہ، فریب اور جرمناک سرگرمی) یا فقرہ 20 (استعمال کے
        شرائط کی خلاف ورزی) کے تحت آپ کے اکاؤنٹ اور شرائط کی ترکیب کرتے ہیں، آپ کے اکاؤنٹ کا بیلنس غیر واپسی اور ہمیں
        کوئی ادعیہ ہو سکتی ہے کہ ہم آپ کے خلاف روایتی سیاق و سباق کے طور پر (آپ کے اکاؤنٹ کے تحت، ایک ڈپلیکیٹ اکاؤنٹ ہے
        یا کچھ مشابہ ہے)۔ آپ کے اکاؤنٹ کے بند ہونے اور شرائط کی ترکیب، فقرہ 11 یا 20 کے تحت ہے، یہ کسی بھی باقی شراکتوں
        کو متاثر نہیں کرتا، مگر کہ ان باقی شراکتوں کو معتبر اور آپ استعمال کے شرائط کی خلاف ورزی میں نہیں ہیں۔ واضحیت کے
        لئے، ہم آپ کے اکاؤنٹ میں کوئی بونس کریڈٹ نہیں کریں گے، نہ ہی آپ کو کسی بھی مشروط جیت کا حق ہوگا، اس کے بعد کسی
        بھی وقت جب یہ بند کر دیا گیا ہوگا (چاہے ہم یوس کے استعمال کے شرائط کے تحت ہو، یا آپ کی درخواست کے جواب میں)۔</p>
    <h2>استعمال کے شرائط کی ترکیب کرنا اور آپ کی طرف سے ترکیب کرنا</h2>
    <h3>10. رجسٹریشن</h3>
    <p class="mb-5">10.1 صرف رجسٹرڈ یوزرز کمپنی کے بونس پروگرام میں شرکت کرسکتے ہیں۔ رجسٹریشن کے لئے،
        یوزر کو رجسٹریشن فارم کو مکمل اور درست طریقے سے بھرنا ہوگا۔</p>
    <p class="mb-5">10.10 کمپنی کو، کسی بھی وقت، بغیر پیشگوئی کے، کھلاڑی کی شناخت کی جانچ پڑتال کرنے
        کا حق ہے، اور پے آؤٹس کی عملیات کیلئے؛ کمپنی کو بھی کھلاڑی کی شناخت کی جانچ کے لئے وقت درکار ہو سکتا ہے۔</p>
    <p class="mb-5">10.10.1 براہ کرم نوٹ فرمائیں کہ جب کل وصولیات یا نکالی جانے والی رقم 2,000 یورو تک
        پہنچ جائے، تو کھلاڑی کی تصدیق کی پروسیجر مفترض ہوگی۔ تصدیق کی پروسیجر کے دوران کھلاڑیوں سے دستاویزات فراہم کرنے
        کی ضرورت ہوگی جیسے کہ شناختی کارڈ، بینک کارڈ، بینک کی حساب کی کھات، دولت کی ماخذ، فنڈ کی ماخذ، اور یوٹلٹی بل
        وغیرہ۔ کھلاڑیوں کی طرف سے غلط شخصی معلومات فراہم کی جاتی ہیں تو نکالی کا درخواست مسترد کردی جاسکتی ہے اور یوزر
        کا اکاؤنٹ ختم کیا جا سکتا ہے۔ کھلاڑی کو ای میل کے ذریعے اس کی معلومات دی جائے گی۔ کچھ مواقع میں کمپنی سیلفی کے
        ساتھ شناختی کارڈ، شناختی کارڈ اور خاص علامت، یا حتی کال یا ویڈیو کال کا مطالبہ کر سکتی ہے۔ جب بھی کسی دستاویزات
        کی درخواست کی جاتی ہے، اکاؤنٹ ہولڈر کو اپنے اکاؤنٹ پر ان دستاویزات کو اپلوڈ کرنا ہوگا (میری پروفائل &gt;
        دستاویزات)۔ اکاؤنٹ کی تصدیق کے لئے دستاویزات کی درخواست کی جاتی ہے، تو کسی بھی انتظار میں ہونے والی نکالیاں
        منسوخ کر دی جائیں گی۔</p>
    <p class="mb-5">10.10.2 جب تصدیق مکمل ہوجاتی ہے، تو اکاؤنٹ ہولڈر نیا نکالی کا درخواست کرسکتا ہے۔
        اگر اکاؤنٹ تصدیق تینتالیس (30) دنوں میں ابتدائی درخواست کی تاریخ سے معلوم نہ ہو، تو اکاؤنٹ گیمپلے اور لین دین کے
        لئے منجمد کردیا جائے گا۔، جہاں، کسی بھی وجہ سے اکاؤنٹ ہولڈر کو کسی بھی مطلوبہ دستاویزات میں سے کوئی فراہم نہ
        کرنے کا انکار یا ناقابل ہو، کمپنی کو اکاؤنٹ کو معطل کرنے اور موجودہ فنڈ کو قبض کرنے کا حق ہوگا۔</p>
    <p class="mb-5">10.10.3 اگر کھلاڑی نظام کو چھلانگ لگانے کے لئے غلط یا جان بوجھ کر ترمیم کردہ شخصی
        معلومات فراہم کرتا ہے، تو کیسینو کی طرف سے ریفنڈ کی درخواست بھی مسترد کی جا سکتی ہے۔</p>
    <p class="mb-5">10.2 صرف 18 سال یا اس سے زیادہ عمر کے لوگوں کی رجسٹریشن اور شرط لگانا اجازت دی گئی
        ہے (یا وہ ملک جہاں سے صارف نے جمع کی جمعی اور شراکت کی ہیں کی دی گئی عمر کی مجاز عمر میں)۔ یوزرز کو جہاں وہ رہتے
        ہیں، انٹرنیٹ جوا کی قانونیت کے ساتھ معاملہ کرنے کی ذمہ داری اور/یا اپنے ملک کی موافقت یافتہ حکومت کو جیتوں کے
        بارے میں معلومات فراہم کرنے کی ذمہ داری ہوتی ہے۔ کمپنی کو عمر کی تصدیق کی ضرورت ہو سکتی ہے اور یوزر کا اکاؤنٹ
        موافقت کی درخواست پر پہلے اس دستاویزات کو حاصل کرنے سے پہلے بند کرنے کا حق محفوظ ہے۔</p>
    <p class="mb-5">10.3 رجسٹریشن کے دوران فراہم کی گئی تمام معلومات درست اور مکمل ہونی چاہئیں۔ خاص
        طور پر، کریڈٹ یا ڈیبٹ کارڈ استعمال کرتے وقت، کارڈ ہولڈر کا نام اور شہرت نام رجسٹریشن فارم میں ذکر شدہ نام اور
        شہرت نام سے مطابقت رکھنا چاہئیے، ورنہ اکاؤنٹ بلاک کر دیا جائے گا۔ اکاؤنٹ بند ہونے سے پہلے کی جانے والی تمام
        شراکتیں معترف شدہ ہوں گی۔</p>
    <p class="mb-5">10.4 کمپنی کو فراہم کی گئی جھوٹی معلومات کی گزارش کرنے والے یوزرز کے اکاؤنٹس بلاک
        کرنے کا حق ہے، اور انہیں کسی بھی جیت کی ادائیگی سے محروم کرنے کا حق ہے۔ کمپنی کی درخواست پر یوزر کو ایک افسری
        دستاویز ساتھ تصویر کے ساتھ پیش کرنا ہوگا، جو ان کی شناخت کی تصدیق کرتا ہے (پاسپورٹ کا کاپی، یا ان کا قومی شناختی
        کارڈ)، ذکر کردہ پتہ کی شناخت کی تصدیق اور ٹیلی فون اور ادائیگی کی طریقے کی ملکیت کی تصدیق۔</p>
    <p class="mb-5">10.5 ہر یوزر صرف ایک اکاؤنٹ رکھ سکتا ہے۔ رجسٹرڈ یوزر نئے نام یا نئی ای میل ایڈریس
        کے نئے کلائنٹ کے طور پر دوبارہ رجسٹر نہیں ہوسکتے۔ اس قاعدے کی خلاف ورزی کی صورت میں، کمپنی کو یوزر کی تمام
        شراکتوں کو ناکارہ قرار دینے کا حق ہے۔</p>
    <p class="mb-5">10.6 یوزر کو کسی بھی تیسری شخص کو ان کے گیم اکاؤنٹ کا استعمال کرنے کا کوئی حق نہیں
        ہے۔</p>
    <p class="mb-5">10.7 براہ کرم نوٹ کریں کہ آپ کو کریڈٹ کارڈ کے اکاؤنٹ کی تفصیلات یا دیگر حساس مالی
        معلومات کو ایک غیر رمز شدہ ای میل کے ذریعے ہمیں نہیں بھیجنا چاہئیے۔</p>
    <p class="mb-5">10.8 کمپنی اپنے تمام یوزرز کو ان کا خود کا یوزر نام اور پاس ورڈ کا اپنی مرضی کا
        انتخاب کرنے کی اجازت دیتی ہے۔ یوزرز کو اس معلومات کو خفیہ رکھنا چاہئیے۔ اگر آپ کا یوزر نام اور پاس ورڈ صحیح
        طریقے سے سائٹ تک رسائی حاصل کی جاتی ہے، تو تمام شراکتیں موثر رہتی ہیں اور یوزر کے ذریعے منسوخ یا تبدیل نہیں کی
        جا سکتیں ہیں۔ اگر آپ کو لگتا ہے کہ کسی اور کو آپ کا پاس ورڈ معلومات ہے، تو فوراً اپنی پاس ورڈ کو ہماری ویب سائٹ
        پر تبدیل کریں۔ اگر آپ پاس ورڈ یا اس کا کوئی حصہ بھول گئے ہیں، تو براہ کرم لاگ ان صفحے پر "پاس ورڈ بھول گئے؟" کے
        بٹن پر کلک کریں اور اس کو دوبارہ ترتیب دینے کی پروسیجر کو فالو کریں۔</p>
    <p class="mb-5">10.9 جو یوزرز کمپنی کے ذریعہ اپنی شراکتیں کرتے ہیں وہ یاد رکھیں کہ کمپنی کلائنٹ کے
        موبائل فون میں ڈیٹا کی کوئی کمی کے لئے ذمہ دار نہیں ہے، اور موبائل اور انٹرنیٹ آپریٹرز کی کسی بھی کمیشن کے لئے
        ذمہ دار نہیں ہے۔ رجسٹریشن کے ذریعے، کلائنٹ تصدیق کرتا ہے کہ وہ یہ شرائط قبول اور مانتا ہے۔</p>
    <h3>کرنسی</h3>
    <p class="mb-5">11.1 حالیہ وقت میں یوزرز کو مندرجہ ذیل کرنسیوں میں شراکتیں کرنے کا حق ہے: یورو، یو
        ایس ڈی، آسٹریلین ڈالر، کینیڈین ڈالر، ناروے کرون، برطانوی پاؤنڈ، روسی روبل، نیوزی لینڈ ڈالر، جاپانی ین، برازیلی
        رئیل۔ کمپنی کو مندرجہ ذیل کرنسیوں میں شراکت کی رسائی اور آپریٹنگ سرگرمیوں کی بلاک کرنے کا حق محفوظ ہے۔ اس صورت
        میں، بلاک کردہ کرنسی کے حسابوں پر ضروری تمام ادائیگیاں اس روز کے انٹربینک ایکسچینج ریٹ کے متساوی میں دوسری کرنسی
        میں رکھی جائیں گی۔</p>
    <h3>12. بونس پروگرام</h3>
    <p class="mb-5">12.1 تمام صارفوں کے بونسات ایک شخص، گھر کا پتہ، ٹیلی فون نمبر اور ای میل ایڈریس،
        ایک بل کے طور پر پیمنٹ (جیسے کارڈ نمبر یا اسکرل اکاؤنٹ)، اور استعمال ہونے والے کمپیوٹر (انسٹی ٹیوٹ، انٹرنیٹ کلب
        اور دوسرے عوامی ادارے شامل ہیں) تک محدود ہیں۔ کمپنی کو کسی بھی صارف یا صارفوں کو بونس دینے سے انکار کرنے کا حق
        ہے۔ بونس پروگرام صرف ان صارفوں کے لئے دستیاب ہیں جو نئی کرنسی میں کمپنی اکاؤنٹ میں جمع کرائیں۔</p>
    <p class="mb-5">12.3.5 بونس کو صرف ان معتبر کھیلوں پر ویجر کرنا ہوگا جو بونس کی ابتدائی پیشکش کی
        خاص کھیل کی زمرے میں آتے ہیں۔ مثال کے طور پر، ایک اسپورٹس بک بونس کو صرف اسپورٹس پر ویجر کیا جائے گا، کیسینو
        بونس کو صرف اسلوٹس پر اور لائیو کیسینو بونس کو صرف لائیو کیسینو کے کھیلوں پر۔</p>
    <p class="mb-5">12.3.6 کیسینو بونسز (اسلوٹس) کبھی کبھار خاص گیمنگ سروس پرووائیڈرز (جی ایس پیز) یا
        خاص اسلوٹس پر دستیاب ہوتے ہیں۔ لہذا، منتخب جی ایس پیز اور/یا خاص اسلوٹس پر کی ویجر کرنے والے ہی بونس کی ویجرنگ
        کی ضرورتوں کے لحاظ سے مد نظر رکھی جائے گی۔</p>
    <p class="mb-5">12.3.8 نو ڈپازٹ فری اسپنز، کیسینو چپس اور فری بیٹس جو پہلے ہی جمع نہیں کیا گیا،
        ایسے کھلاڑیوں کو عطا کیا جاتا ہے، تو ان کو نکالنے سے پہلے، ایک کم سے کم جمع کی رقم اور دپازٹ کی رقم کا ایک گنا
        (x1) ویجر کی شرط ہوتی ہے، جس سے ویننگز نکالی جا سکتی ہیں۔ وفاقت کیسینو بونس، فری اسپنز، کیسینو چپس اور وفاقت
        اسپورٹس بک بونس اور فری بیٹس صرف مکمل طور پر تصدیق شدہ کھلاڑیوں کو عطا کی جا سکتی ہیں۔ صرف ایک بونس ایک خریدار
        کے لئے، ہر گھر، ہر پتہ، ہر شئیرڈ کمپیوٹر اور شیئرڈ آئی پی ایڈریس، اور کسی بھی اکاؤنٹ کی تفصیلات جیسے کہ ای میل
        ایڈریس، بینک کا اکاؤنٹ کی تفصیلات، کریڈٹ کارڈ کی معلومات اور ادائیگی سسٹم کا اکاؤنٹ نام تک ایک ہی بونس کی اجازت
        ہے۔ بونس پیشکش کی کسی بھی غلط استعمال سے اکاؤنٹ بند کردیا جائے گا۔</p>
    <p class="mb-5">12.3.9 پیشکش کی جانے والی فری بیٹس کو فٹ بال پر لگائیں، حداقل شرطوں کے ساتھ 2.00
        کی اوڈز۔ ہینڈیکیپس اور ڈراو نو بیٹ مارکیٹس مستثنی ہیں۔</p>
    <p class="mb-5">12.3.10 کیسینو میں بونس رقم کے ساتھ لگائی جانے والی زیادہ سے زیادہ شرطی رقم 5 یورو
        (یا دوسری کرنسیوں میں معادل) یا انعام دی گئی کل بونس رقم کا 15٪ (جو پہلے آئے)۔ کوئی بھی کھیل دورے یا اسپنز زیادہ
        سے زیادہ شرطی رقم کو شامل نہیں ہوں گے اور کوئی ممکنہ جیتنے والی رقم فون ہوجائے گی۔</p>
    <p class="mb-5">12.3.11 اگر کسی کھلاڑی کو کوئی فعال بونس منسوخ کرنے کا فیصلہ کرتا ہے، تو وہ اپنے
        اکاؤنٹ سے ایسا کر سکتا ہے۔ مگر، سب بونس رقم، سب جیتنے اور بونس کے ساتھ اس کی بیٹنگ کی فعالیت سے کسی بھی طرح کی
        رقم واپس کرنے والی رقم کو ایک بار اور مکمل طور پر ضائع کر دیا جائے گا۔ بونس کی بیٹ کی حساب کتاب پہلے حقیقی رقم
        کا حساب کرتی ہے، پھر بونس رقم۔</p>
    <p class="mb-5">12.2 بونس پروگرام کی کسی بھی شرط کی خلاف ورزی کی صورت میں، اور اگر کسی گروپ کے
        صارفوں کی طرف سے ایک ہی واقعہ پر بار بار شرط لگائی جاتی ہے، یا سازش، دی گئی شرط کے نتیجے کی کوئی بھی بات کا، تو
        کمپنی کو ان صارفوں کو بونس سے محروم کرنے کا اور متناظر شرائط کو غیر جائز قرار دینے کا حق ہے۔ دھوکہ کی مخالفت کے
        اہداف کے لئے، کمپنی کو بونس منتقل کرنے سے پہلے صارف کی شناخت ثابت کرنے والے کاغذات کی مطالبہ کرنے کا حق ہے۔</p>
    <p class="mb-5">12.3.12 ای میل یا ایس ایم ایس کے ذریعہ مخصوص ایک خاص حصے کے کھلاڑیوں کے لئے خصوصی
        طور پر تشہیر شدہ پیشکشات صرف اس ای میل یا ایس ایم ایس کے منتظمین کے لئے موجود ہیں اور صرف ان کے لئے۔</p>
    <p class="mb-5">12.3.13 ای میل یا ایس ایم ایس کے ذریعہ تشہیر شدہ مخصوص پیشکشات کے لئے، کھلاڑیوں سے
        درخواست کی جاتی ہے کہ وہ ہمارے خصوصی امدادی ٹیم سے رابطہ کریں تاکہ بونس حاصل کرنے کی تمام ضروری تفصیلات فراہم
        کریں (مثلاً، بونس کوڈ، پیشکش کی قسم، موصول کنندہ کا ای میل ایڈریس، وغیرہ)۔</p>
    <p class="mb-5">12.3.14 کچھ مواقع پر ہم فری اسپنز کی شکل میں کیسینو بونس چپ فراہم کریں گے۔ منسلک
        سلٹ (سلٹس) پر مجازمن کم سرکاری شرطوں کو مد نظر میں لیا جاتا ہے۔ مثال کے طور پر، نیٹ انٹ کے گنز اینڈ روزز ویڈیو
        سلٹ پر 20 فری اسپنز کو ایک 4 یورو (یا کرنسی کا معادل) کیسینو چپ کے طور پر عطا کیا جائے گا اور یہ منسلک سلٹ پر
        کھیلا جانا مقصود ہے (بونس چپ = منسلک شرط (0.20 یورو) x مکمل دورے (20) = 4 یورو)۔</p>
    <p class="mb-5">12.3.15 اس ویب سائٹ کے ذریعہ فراہم کردہ کسی بھی فروغاتی مواد کو منتقل، ایکسچینج یا
        واپس کیا جا سکتا ہے۔ جہاں کوئی خاص فروغاتی مواد تکنیکی، جغرافیائی یا قانونی پابندیوں کی وجہ سے قابل عمل نہ ہو،
        وہاں کمپنی کو کوئی ذمہ داری نہیں ہوگی اور اس کا حق ہوگا کہ کھلاڑیوں کو تسلیم یا واپس نہ کرنے کا فیصلہ کرے۔</p>
    <p class="mb-5">12.3.16 کھلاڑیوں سے اپنے اکاؤنٹ کی تصدیق کے لئے (شناخت کا ثبوت، ادائیگی کے طریقوں
        اور رہائش کا ثبوت)، کسی بھی وقت ضروری سب کچھ KYC دستاویزات فراہم کرنے کی درخواست کی جا سکتی ہے۔</p>
    <p class="mb-5">12.3.17 اگر بونس کی باقی ویجر کی شرط میں کسی شک نہ ہو، تو کھلاڑیوں کو ہماری کسٹمر
        سپورٹ ٹیم سے رابطہ کرنے کی تجویز دی جاتی ہے۔</p>
    <p class="mb-5">12.3.18 ویجرنگ درج ذیل کھیلوں پر نہیں ہوگی۔ آپ کو صرف اس شرط کے تحت مسئولیت ہے کہ
        آپ بونس ویجرنگ کے اندر مندرجہ ذیل کھیلوں کو شامل نہیں کریں۔</p>
    <p class="mb-5">تمام ویڈیو پوکر کھیلیں، تمام رولیٹ کھیلیں، تمام تیز تر کھیلیں، تمام بلیک جیک
        کھیلیں، ہائی لو فیور، تمام باکارات کھیلیں، 3 کارڈ پوکر، یورپی رولیٹ، بلڈ سکرز، بلڈ سکرز II، د وش ماسٹر، ڈیڈ اور
        انجی، ڈیڈ اور انجی II، جیک ہیمر 2، کلاؤڈ کوئسٹ، ٹاور کوئسٹ، پرلز آف انڈیا، تریجر آئلینڈ، آئی آف دی کریکن اور
        سولر کوئین۔</p>
    <p class="mb-5">کمپنی کا حق ہے کہ اگر صارفوں نے پایا کہ انہوں نے فعال بونس کے ساتھ فوق ذکر شدہ
        کھیلوں کو کھیلا ہے، تو جیتنے کو ضائع کرنے اور کھیلی گئی رقم کو ضائع کرنے کا حق محفوظ رکھے۔</p>
    <p class="mb-5">12.3.19 ہمیں کسی بھی دی گئی وقت اور پہلے سے اطلاع دیے بغیر کسی بھی پروموشن کو
        ترتیب، منسوخ یا ختم کرنے کا حق محفوظ رکھا گیا ہے۔</p>
    <p class="mb-5">12.3 فروغاتی اصطلاحات مگر کچھ مذکور نہ ہو، ویب سائٹ، نیوز لیٹر اور ایس ایم ایس کے
        ذریعہ پیش کردہ تمام بونس، فری اسپنز، فری بیٹس، کیسینو چپس اور کسی بھی دوسرے 'فروغاتی مواد' کے لئے مندرجہ ذیل
        شرائط لاگو ہوتے ہیں۔</p>
    <p class="mb-5">12.4.1 بیلنس براہ راست آپ کے نقد بیلنس میں ادا کیا جاتا ہے، جسے آپ کیسینو پر کھیل
        سکتے ہیں یا نکال سکتے ہیں۔</p>
    <p class="mb-5">12.4.2 آپ کا دوست آپ کی ذاتی دعوت کے لنک کے ذریعہ سائن اپ کرنا لازمی ہے۔</p>
    <p class="mb-5">12.4.3 آپ کے بیلنس پر 5 USD کو حاصل کرنے کے لئے، آپ کے دوست کو کم از کم 10 USD کی
        ایک جمعی رقم جمع کرنی چاہئے (آپ کا دوست 10 USD کو کئی قسطوں میں جمع کرسکتا ہے)۔</p>
    <p class="mb-5">12.4.4 اگر آپ کوئی دوست دعوت دیتے وقت آپ کی ذاتی ملک سے نہیں ہے، تو آپ کو اپنی
        مقامی کرنسی پر فیئر ایکسچینج ریٹ پر موازنہ کیا جانے والا ایک معیاری انعام ملے گا۔</p>
    <p class="mb-5">12.4.5 آپ ایک نیا کیسینو اکاؤنٹ بنا کر اور اپنی مدد کے لنک کے ذریعہ سائن اپ کرکے
        انعام حاصل کرنے کیلئے اپنے خود کا لنک استعمال نہیں کرسکتے۔ رفر ای فرینڈ پروگرام ہمارے کھلاڑیوں کو پلیٹ فارم پر
        دوستوں کو دعوت دینے کے لئے بنایا گیا ہے۔ اس پروگرام کا کسی بھی دوسرے استعمال کو سخت ممنوع قرار دیا گیا ہے۔</p>
    <p class="mb-5">12.4.6 کیسینو کسی بھی وجہ سے کسی بھی وقت رفر ای فرینڈ پروگرام یا صارف کی اس میں
        شرکت کی صلاحیت کو معطل کرسکتا ہے ۔ ہمیں لگتا ہے کہ کسی بھی گتھ جو ہمیں تشکیل دیتی ہے، فریبی ہے، یا خدمات کی
        شرائط یا رفر ای فرینڈ کی شرائط کے خلاف ہے، اگر ہم نے کسی بھی گتھ کو دیکھا تو ہم اکاؤنٹس کو معطل کرنے یا کیش
        بیلنس کو ہٹانے کا حق رکھتے ہیں۔ ہمیں انعامات کی تفصیلات پر نظر ثانی کرنے اور تحقیقات کرنے کا حق ہے اور ہم
        اکاؤنٹس کو معطل کرنے یا ریفرلز کو اپنی ذاتی انصاف کی رائے کے مطابق ترتیب دینے کا حق رکھتے ہیں۔</p>
    <p class="mb-5">12.3.1 کیسینو 'خوش آمدید' اور 'ری لوڈ' (سلٹس)، اور اسپورٹس 'خوش آمدید' اور 'ری
        لوڈ' بونس 30 دنوں کے مدتی معتبر ہوتے ہیں، جب وہ کھلاڑیوں کے اکاؤنٹ میں شامل ہوتے ہیں۔ 30 دنوں کے دوران مذکورہ
        فروغاتی مواد ختم ہوجاتے ہیں اور ان کو دعوت یا واپسی کیا نہیں جاسکتا۔</p>
    <p class="mb-5">12.3.2 لائیو کیسینو 'خوش آمدید' اور 'ری لوڈ' بونس 14 دنوں کے مدتی معتبر ہوتے ہیں،
        جب وہ کھلاڑیوں کے اکاؤنٹ میں شامل ہوتے ہیں۔ 14 دنوں کے دوران مذکورہ فروغاتی مواد ختم ہوجاتے ہیں اور ان کو دعوت
        یا واپسی کیا نہیں جاسکتا۔</p>
    <p class="mb-5">12.3.3 تمام فری اسپنز، فری بیٹس، بونس چپس، کھلاڑیوں کے اکاؤنٹ میں شامل ہونے کے وقت
        سے 7 دنوں کے معتبر ہوتے ہیں۔ 7 دنوں کے دوران مذکورہ فروغاتی مواد ختم ہوجاتے ہیں اور ان کو دعوت یا واپسی کیا نہیں
        جاسکتا۔ کیش بیک / وفاداری بونس سے زیادہ سے زیادہ جیتنے محدود ہوتی ہیں پانچ (5x) گنا کیش بیک بونس کی ابتدائی رقم
        کی۔ اس سے زیادہ کوئی بھی جیتنے ضائع کردی جائیں گی۔ موسمی / خصوصی فروغاتی مواد (جن میں شامل ہیں، مگر ان کے محدود
        نہیں ہیں، کرسمس بونس، عید بونس، ہالووین بونس) کی زیادہ سے زیادہ جیتنے محدود ہیں 200٪ اور اس سے زیادہ بونس کی
        سیما، ابتدائی جمع کرائی گئی رقم کی چار (4x) گنا ہے۔ بونس کی سیما 150٪ سے 199٪ کے درمیان، ابتدائی جمع کرائی گئی
        رقم کی آٹھ (8x) گنا ہوتی ہے۔ بونس کی سیما 120٪ سے 149٪ کے درمیان، ابتدائی جمع کرائی گئی رقم کی دس (10x) گنا ہوتی
        ہے۔ بونس کی سیما 100٪ سے 119٪ کے درمیان، ابتدائی جمع کرائی گئی رقم کی پندرہ (15x) گنا ہوتی ہے۔ بونس کی سیما 25٪
        سے 99٪ کے درمیان، ابتدائی جمع کرائی گئی رقم کی بیس (20x) گنا ہوتی ہے۔ ان حدود کے اوپر کوئی بھی جیتنے ضائع کردی
        جائیں گی۔</p>
    <p class="mb-5">- فری اسپنز: جیتنے کی مقدار کی بیس (20x) گنا</p>
    <p class="mb-5">- کیسینو چپ: بونس کی رقم کی پچیس (25x) گنا</p>
    <p class="mb-5">- فری بیٹس: جیتنے کی مقدار کا ایک (1x) گنا</p>
    <h3>13. جمع کرنا</h3>
    <p class="mb-5">13.1 دستیاب ادائیگی کے طریقے ملک اور رجسٹریشن کے دوران منتخب کرنے والے کرنسی کی
        طرف سے مقرر کئے جاتے ہیں۔ ان پر کھرچوں کی مکمل فہرست، ان پر حدود اور دیگر اشیاء کو جمع کرنے اور نکالنے کے صفحے
        پر دکھایا جاتا ہے۔ کمپنی کو ان شرائط اور تفصیلات کو تبدیل کرنے کا حق محفوظ ہے۔</p>
    <p class="mb-5">13.2 کسی بھی مالی لین دین کرتے وقت، ضروری ہے کہ دیبٹ / کریڈٹ کارڈ یا بینک کے
        اکاؤنٹ کے مالک کا نام کمپنی کے متعلقہ اکاؤنٹ کے مالک کے نام سے بالکل موازی ہو۔ ورنہ، کمپنی کو تمام لین دین منسوخ
        کرنے اور کسی دوسرے کی اکاؤنٹ یا کریڈٹ / ڈیبٹ کارڈ کا استعمال کرتے ہوئے کی گئی تمام لین دینوں کو واپس کرنے کا حق
        محفوظ ہے۔</p>
    <h3>14. اکاؤنٹ پر پیسے ڈالنا</h3>
    <p class="mb-5">14.1 اگر کسی بھی فنڈز غلطی سے صارف کے حساب میں منتقل ہوگئے ہوں، تو صارف کو فوراً
        کمپنی کو مطلع کرنے کا فرض ہے۔ ایسی غلطی سے کلائنٹ کی کوئی بھی جیت کو ناقص سمجھا جائے گا، اور ان بیٹس کو واپس کیا
        جائے گا، چاہے غلطی کی ابتداء سے غلطی کا پتہ چلنے تک کتنی بھی دیر ہو۔</p>
    <p class="mb-5">14.2 اگر اکاؤنٹ میں جمع کی گئی رقم کو کسی دوسرے مقصد کے لئے جیسے کہ بیٹس، پوکر،
        کیسینو اور مالی بیٹنگ کے علاوہ کیا گیا ہو، تو کمپنی (خاص طور پر فراڈ کی شکایت کی صورت میں) اکاؤنٹ سے ایک جمع کو
        منسوخ کرنے اور صارف سے جمع کرنے والے تمام اخراجات وصول کرنے کا حق محفوظ رکھتی ہے۔</p>
    <p class="mb-5">14.3 اگر صارف کی جمعیت بیٹ کی رقم سے زیادہ ہوتی ہے، تو کلائنٹ کی واپسی کی درخواست
        کی صورت میں، کمپنی کو صارف سے جمع کرنے اور نکالنے کے عمل کے نتیجہ میں پیدا ہونے والی تمام اخراجات وصول کرنے کا
        حق محفوظ رکھتی ہے۔</p>
    <h3>15. مالی پابندیاں</h3>
    <p class="mb-5">15.1 کسی بھی واقعے پر کم سے کم شرط کا اندازہ گیم اکاؤنٹ کی رجسٹرڈ کرنسی میں 0.50
        یورو کا مترادف ہوتا ہے۔ "ملٹیپل" موڈ میں کم سے کم شرط اور "سسٹم" کے ایک ورژن پر کم سے کم شرط 0.50 یورو کا مترادف
        ہوتا ہے۔</p>
    <p class="mb-5">15.3 واقعے پر شرط کی زیادہ سے زیادہ رقم کسی خاص کھیل اور واقعات پر مشتمل ہوتی ہے
        اور ہر واقعہ اور ہر قسم کی شرط کے لئے بک میکر نیٹ ورک کے ذریعے خصوصی طور پر مقرر کی جاتی ہے اور بغیر پہلے لکھی
        رسمی اطلاع کے تبدیل کی جا سکتی ہے۔ کمپنی کو انفرادی واقعات پر زیادہ سے زیادہ شرط کی پابندی، اور انفرادی صارفین
        کے اکاؤنٹس پر خاص پابندیوں کی داخل اور نکالنے کا حق حاصل ہے بغیر کسی اطلاع یا وجہ کی وضاحت کے۔</p>
    <p class="mb-5">15.4 تمام مالی پابندیاں ہر صارف / گروہ کے لئے لاگو ہوتی ہیں، جو مل کر ایک ہی
        پیشگوئیوں کو شامل کرتے ہیں۔ اگر صارف ایک سے زیادہ پیشگوئیوں کو شامل کرتا ہے جن میں یکساں پیشگوئیاں ہیں، تو ان
        شرائط کی دی گئی حدود کی سائز کے لحاظ سے ان بیٹوں پر کل ادائیگی محدود ہوسکتی ہے۔</p>
    <h3>16. ادائیگیاں</h3>
    <p class="mb-5">16.1 ادائیگیوں کی پیروی 72 گھنٹے سے زیادہ وقت میں کی جاتی ہے جو لمحہ موافقت کے بعد
        شروع ہوتا ہے جب ادائیگی کے ادارے کی طرف سے درخواست کو منظوری دی جاتی ہے۔ پہلی ادائیگی کو الیکٹرانک ادائیگی
        طریقوں (اسکرل، ویب مونی، کریڈٹ یا ڈیبٹ کارڈ وغیرہ) کے ذریعہ صارف کو دی جاتی ہے، صارف کو اپنے پروفائل کے ذیلی حصے
        میں اپنی قومی شناختی کارڈ کی الیکٹرانک نسخہ اپ لوڈ کرنے کا فرض ہوتا ہے۔ کمپنی، اپنی رضاکارانہ سوچ کے مطابق، صارف
        سے ان اضافی دستاویزات (مثلاً پتہ کی تصدیق، سیلفیوں وغیرہ) کی درخواست کرسکتی ہے ان کی پہلی ادائیگی سے پہلے۔ یاد
        رہے کہ جعلی کاروبار قانون کی سخت سزا ہوتی ہے اور جعلی یا ترمیم شدہ دستاویزات کو الیکٹرانک طریقوں سے جمع کرنے کی
        شبہہ کی صورت میں، کمپنی کو ان دستاویزات کو مناسب ریاستی اتھارٹیوں کو بھیجنے کا حق محفوظ ہے۔</p>
    <p class="mb-5">16.2 ادائیگی کی پیشگوئی سے پہلے، کمپنی کے ملازمین صارف کے نام، اولاد کا نام، والد
        کا نام، پیدائش کی تاریخ اور دیگر اعداد کی مطابقت کی تصدیق کریں گے۔ اگر واقعی دیتا اور صارف کے فراہم کردہ اعداد
        میں فرق پایا جاتا ہے، تو کمپنی کو صارف کی تمام بیٹس کے لئے واپسی کرنے اور صارف کو جیت کی ادائیگی کو رد کرنے کا
        حق محفوظ ہوتا ہے جب تک وہ اپنی شناخت اور درست دی گئی ڈیٹا کی تصدیق نہ کریں۔</p>
    <p class="mb-5">16.3 اگر پتہ چلے کہ صارف نے کمپنی میں کئی اکاؤنٹ کھولے ہیں، تو کمپنی کو ان
        اکاؤنٹوں کی ادائیگی کو رد کرنے کا حق محفوظ ہے (صرف صارف کے اکاؤنٹ کی قانونی طور پر کمپنی کے اکاؤنٹ میں منتقل شدہ
        اصولوں کے بعد، ان کے جمع کردہ کل رقم کے 20٪ کا جرمانہ ادا کرنے کے بعد)۔</p>
    <p class="mb-5">16.4 واپسی کی پہلی درخواست کے ساتھ صارف کو درست پاسپورٹ یا شناختی کارڈ کی تفصیلات
        درج کرنی چاہئے، جیسا کہ دستاویز میں دکھایا گیا ہوتا ہے، ملک کی زبان میں جو جاری کی گئی ہے (یا بیرون ملکی
        دستاویزوں کی صورت میں - انگریزی میں)۔</p>
    <p class="mb-5">16.5 گروہ اور خاندانی افراد کو اپنے درمیان شخصی تعلقات کو رواست کرنا چاہئے -
        ادائیگیاں صرف متعلقہ اکاؤنٹ کے مالک کے نام پر کی جاتی ہیں۔</p>
    <p class="mb-5">16.6 صارف کو کمپنی کو اپنے بینک اکاؤنٹ کی معلومات فراہم کرنے کا اتفاق ہوتا ہے جس
        سے ان کی بیٹس کی جائیں گی، خاص طور پر ان کی جیت کو منتقل کرنے کے لئے۔</p>
    <p class="mb-5">16.7 کمپنی کو کرنسی (ایکسچینج کی شرح) کی تبدیلیوں کے ساتھ متعلق ادائیگیوں میں کوئی
        ذمہ داری نہیں ہوتی۔</p>
    <p class="mb-5">16.8 اگر صارف نے 1,000 یورو یا اس سے زیادہ کی رقم (یا انٹر بینک کی شرح پر دیگر
        کرنسی میں مترادف) میں واپسی کی درخواست کی ہو، کمپنی ان دی گئی کیلنڈر مہینے میں منتقلی اور بعد کے عملوں پر کمیشن
        دیتی ہے۔ اس کے علاوہ، کمیشن بینک کو صارف دوارہ دیتا ہے۔ 24 گھنٹے کی مدت میں زیادہ سے زیادہ واپسی کی اجازت دی
        جانے والی رقم 1,000 یورو (یا انٹر بینک کی شرح پر دیگر کرنسی میں مترادف) ہوتی ہے جو اس کی ادائیگی موفر کی خصوصی
        حدود پر مشتمل ہوتی ہے۔ 10,000 یورو سے زیادہ جیت کی صورت میں، ادائیگیوں کو برابر ماہانہ اقساط میں دی جائیں گی۔
    </p>
    <p class="mb-5">16.9 کمپنی خود کو جیتنے والے کھلاڑیوں کے لئے ادائیگی کی طریقے کا انتخاب کرنے کا حق
        محفوظ رکھتی ہے (کریڈٹ / ڈیبٹ کارڈ یا کھلاڑی کے بینک اکاؤنٹ میں)۔</p>
</div>
        `
    },
    'contact': {
        title: 'اتصال',
        subtitle: 'تواصل معنا',
        content: `
            <div class="politics-content__block" dir="rtl">
                <p class="mb-5"><b>البريد الإلكتروني:</b> support@valor.bet</p>
                <p class="mb-5"><b>تغيير البريد الإلكتروني/كلمة المرور:</b> valor.security@valor.bet</p>
            </div>
        `
    },
    'affiliate-program': {
        title: 'برنامج الشركاء',
        subtitle: 'كن شريكًا معنا',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block" dir="rtl">
                <p class="mb-5">إحدى أولوياتنا الرئيسية كمشغل ألعاب عبر الإنترنت هي ضمان اللعب النزيه.</p>
                <p class="mb-5">باستثناء المراهنات الرياضية وألعاب الكازينو المباشرة، يتم دائمًا استخدام مولد الأرقام العشوائية (RNG) لضمان نزاهة ألعاب الكازينو من خلال تحديد النتائج العشوائية لهذه الألعاب.</p>
                <p class="mb-5">هذا نظام قياسي في الصناعة يضمن نتائج عشوائية باستمرار وقد تم اختباره على نطاق واسع من خلال تشغيل وتحليل آلاف جولات اللعب. توفر عشوائية الـ RNG بيئة ألعاب موثوقة وعادلة.</p>
                <p class="mb-5">قيمة العائد إلى اللاعب (RTP) هي حساب نظري للنسبة المئوية المتوقعة من الرهانات التي سيعيدها لعبة معينة إلى اللاعب بعد عدد كبير من الجولات (مثل مئات الملايين من الألعاب). بينما تكون كل جولة فردية غير متوقعة، فإن المتوسط ​​على المدى الطويل يقترب من قيمة RTP النظرية.</p>
                <p class="mb-5">نحن نراقب بانتظام نسب دفع الأرباح للاعبين ونتعاون مع هيئات تنظيم الألعاب لضمان الامتثال للقوانين المعمول بها.</p>
            </div>
        `
    },
    'fairness': {
        title: 'طرق اختبار النزاهة و RNG',
        subtitle: 'اللعب النزيه',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block" dir="rtl">
                <h3 class="font-bold">2. النطاق</h3>
                <p class="mb-5">تهدف الأحكام الواردة في عملية مكافحة غسل الأموال هذه إلى تقليل احتمال استخدام نشاط تقديم الخدمات لشركة Mirage Corporation لأغراض إجرامية أو في خرق للأنظمة.</p>
                <p class="mb-5">يوفر هذا الإجراء إرشادات تفصيلية تحدد المسؤولية فيما يتعلق بمنع غسل الأموال وتمويل الإرهاب من منظور الإطار القانوني والأنظمة الدولية المعتمدة في هذا المجال.</p>
                <h3 class="font-bold">3. القانون والتنظيمات والقواعد</h3>
                <p class="mb-5">ينص قانون العقوبات في كوراساو على الإجراءات الخاصة بملاحقة جريمة غسل الأموال، وكذلك على الإجراءات الخاصة بمصادرة الأموال بعد الإدانة بجريمة غسل الأموال، وتجميد الأصول عندما يُتهم شخص بارتكاب جريمة غسل أموال، وإصدار أمر تفتيش و/أو حجز عند الاشتباه في ارتكاب شخص ما جريمة غسل أموال.</p>
                <p class="mb-5">تهدف السياسات والإجراءات الواردة في هذا الدليل إلى الامتثال للقواعد والإرشادات الواردة في NOPML و NORUT و NOIS، التي تشير إلى قانون العقوبات. بالإضافة إلى تلك الأنظمة، قدم المصرف المركزي في كوراساو وسن مارتن إطارًا شاملاً يتضمن أحكامًا وإرشادات لمنع ومكافحة غسل الأموال وتمويل الإرهاب (والتي يشار إليها فيما بعد بـ «الأحكام والإرشادات» أو «P&G») والتي تستند من بين أمور أخرى إلى توصيات مجموعة العمل المالي (FATF).</p>
                <p class="mb-5">ينطبق كل من NORUT و NOIS على الكيانات التي تقدم إمكانية المشاركة في المقامرة البحرية (المقامرة عبر الإنترنت) داخل أو خارج كوراساو، وهو ما ينطبق على الشركة. يحظر NOIS على الأشخاص الخاضعين إقامة علاقة تجارية أو إجراء معاملة عرضية مع مقدم طلب أعمال ما لم يكن هذا الشخص الخاضع قد طبق التدابير والإجراءات التالية فيما يتعلق بذلك العمل وفقًا لأحكام NOIS:</p>
                <p class="mb-5">• تدابير العناية الواجبة بالعملاء;</p>
                <p class="mb-5">• إجراءات حفظ السجلات؛ و</p>
                <p class="mb-5">• إجراءات التقارير الداخلية.</p>
                <p class="mb-5">تلتزم الشركة بتطبيق التدابير والإجراءات المذكورة أعلاه، حتى في الحالات التي تؤسس فيها أو تُجري علاقات أو معاملات دون حضور شخصي، مباشرة أو غير مباشرة، من خلال شركة تابعة تابعة للمجموعة.</p>
                <p class="mb-5">كما تلتزم الشركة بضمان أن الموظفين مطلعون على التشريعات المعمول بها في مجال مكافحة غسل الأموال/تمويل الإرهاب («AML/CFT») بالإضافة إلى سياسات وإجراءات الأشخاص الخاضعين في هذا الصدد. يجب أن يخضع الموظّفون لإجراءات العناية الواجبة المناسبة قبل التوظيف، ويُتوقع أيضًا أن يتلقوا تدريبًا على التعرف على المعاملات المنفّذة من قبل، أو نيابة عن، أي شخص كان أو يكون أو يبدو أنه متورط في غسل الأموال أو تمويل الإرهاب.</p>
                <h3 class="font-bold">4. السياسة</h3>
                <h3 class="font-bold">المسؤولية</h3>
                <h3 class="font-bold">خطر غسل الأموال</h3>
                <h3 class="font-bold">تستخدم Mirage Corporation التوجيهات التالية كأساس لنموذج خطر غسل الأموال الخاص بها:</h3>
                <h3 class="font-bold">عوامل خطر غسل الأموال</h3>
                <p class="mb-5">تقع المسؤولية النهائية عن سياسة مكافحة غسل الأموال في Mirage Corporation على عاتق المدير.</p>
                <p class="mb-5">سيتم الحفاظ على نظرة عامة لتقييم مخاطر الأعمال لغسل الأموال لتعيين وتتبع مكونات تصنيفات المخاطر المنفصلة. وتصنّف Mirage Corporation المخاطر العامة لغسل الأموال إلى:</p>
                <p class="mb-5">• خطر العميل</p>
                <p class="mb-5">• خطر المنتج</p>
                <p class="mb-5">• خطر الواجهة</p>
                <p class="mb-5">• خطر جغرافي</p>
                <p class="mb-5">سياسات وإجراءات غسل الأموال</p>
                <p class="mb-5">السياسات والإجراءات التي تنفذها Mirage Corporation لتلبية متطلبات التنظيم المعمول بها في مجال مكافحة غسل الأموال وتمويل الإرهاب موثّقة في هذا الدليل. وسيتم مراجعة السياسات والإجراءات بشكل دوري لضمان أنها لا تزال متوافقة مع المتطلبات التنظيمية وبيئة المخاطر المتطوّرة التي تنطبق على Mirage Corporation.</p>
                <p class="mb-5">• بيان واضح للثقافة والقيم المتّبعة في منع الجريمة المالية;</p>
                <p class="mb-5">• التزام بضمان التحقق من الهوية بشكل مُرضٍ في جميع الحالات وبمنهجية قائمة على المخاطر قبل قبول مقدّمي الأعمال كعملاء;</p>
                <p class="mb-5">• التزام بإجراء العناية الواجبة المستمرّة للعميل طوال العلاقة التجارية;</p>
                <p class="mb-5">• التزام بضمان أن يكون الموظّفون مدرّبون وعلى دراية بالقانون، والتزاماتهم القانونية، وكيفية الوفاء بها;</p>
                <p class="mb-5">• تحديد واضح للأدوار والمسؤوليات والهيكل التنظيمي، والاعتراف بأهمية أن يبلغ الموظّفون عن شكوكهم داخلياً في الوقت المناسب.</p>
                <p class="mb-5">تعكس الإجراءات الواردة في هذا الدليل سياسة غسل الأموال الشاملة الخاصة بـMirage Corporation ويجب أن يلتزم بها جميع موظّفي الشركة.</p>
                <h3 class="font-bold">5. تقييم المخاطر، الإدارة والمنهج القائم على المخاطر</h3>
                <h3 class="font-bold">تقييم المخاطر</h3>
                <h3 class="font-bold">تقييم مخاطر الجريمة المالية</h3>
                <h3 class="font-bold">تخفيف المخاطر</h3>
                <h3 class="font-bold">ضوابط المراقبة</h3>
                <p class="mb-5">تنص إجراءات التنفيذ على أن الغرض من إجراءات تقييم المخاطر هو تمكين الشركة من تحديد وتقييم مخاطر غسل الأموال/تمويل الإرهاب التي قد يتعرض لها الشخص الخاضع، وبالتالي تحديد:</p>
                <p class="mb-5">ينعكس المنهج القائم على المخاطر لمنع الجريمة المالية في منهجية شركة Mirage Corporation لتصميم وتشغيل أنظمتها وضوابطها المصمّمة لتقليل مخاطر استخدام الشركة لأغراض الجريمة المالية. المخاطر أساسية لتطوير الأعمال، المنتجات الجديدة، تطوير وظائف المنتج أو التشغيل في أسواق جديدة.</p>
                <p class="mb-5">عندما تتعامل شركة Mirage Corporation مع خدمة جديدة أو فئة عملاء أو منطقة جغرافية جديدة، سيتم تحديث تقييم مخاطر الجريمة المالية أثناء التطوير/الإطلاق (لضمان أن عمليات مكافحة غسل الأموال تدعم الأنشطة الجديدة).</p>
                <p class="mb-5">تُجرى تقييمات مخاطر الجريمة المالية بشكل مستمر، وتطبق على نحو خاص عندما يتغيّر بيئة العمل، على سبيل المثال:</p>
                <p class="mb-5">• الدخول إلى أسواق جديدة؛ و</p>
                <p class="mb-5">• تطوير منتجات جديدة أو ميزات/وظائف المنتج.</p>
                <p class="mb-5">تركز الضوابط الداخلية على:</p>
                <p class="mb-5">• العناية الواجبة بالعملاء، بما في ذلك مستويات العناية المعزّزة بناءً على تقييم مخاطر كل عميل؛</p>
                <p class="mb-5">• تقييم المخاطر ووضع التدابير لتخفيف المخاطر المحدّدة؛</p>
                <p class="mb-5">• عند الضرورة تنفيذ العناية الواجبة المعزّزة؛</p>
                <p class="mb-5">• مراقبة مؤشرات المخاطر الأساسية لإعادة تقييم خطر عميل معيّن؛</p>
            </div>
        `
    },
    'aml': {
        title: 'سياسة مكافحة غسل الأموال',
        subtitle: 'منع غسل الأموال وتمويل الإرهاب',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block" dir="rtl">
                <p class="mb-5">تلتزم شركة ValorBet التزامًا كاملاً بمنع أي شكل من أشكال غسل الأموال أو تمويل الإرهاب أو أي نشاط مالي غير قانوني على منصتها. تم تطوير سياسة مكافحة غسل الأموال (AML) ومكافحة تمويل الإرهاب (CFT) لدينا لضمان الامتثال للقوانين واللوائح الدولية، بما في ذلك توصيات مجموعة العمل المالي (FATF) والتشريعات المحلية المعمول بها.</p>

                <p class="mb-5">نراقب جميع المعاملات والأنشطة التي يقوم بها عملاؤنا بشكل مستمر للكشف عن أي سلوك مشبوه ومنعه. من خلال الحفاظ على عمليات شفافة وقابلة للتتبع، تضمن ValorBet أعلى مستوى من الثقة والنزاهة في جميع العمليات المالية.</p>

                <p class="mb-5"><b>1. التحقق من هوية العميل (KYC)</b><br>
                يجب على كل عميل اجتياز عملية "اعرف عميلك" (KYC) قبل إجراء أي إيداع أو سحب أو المشاركة في أي نشاط من أنشطة الألعاب. تتضمن عملية التحقق معرفة الهوية، تأكيد العنوان، والتحقق من العمر. قد نطلب نسخًا من المستندات مثل بطاقة الهوية أو جواز السفر أو رخصة القيادة أو فاتورة خدمات.</p>

                <p class="mb-5"><b>2. مراقبة المعاملات</b><br>
                تتم مراقبة جميع المعاملات على منصة ValorBet بشكل مستمر. أي نشاط غير عادي أو غير متسق قد يؤدي إلى تعليق مؤقت للحساب أثناء إجراء الفحوصات الإضافية. نحتفظ بالحق في الإبلاغ عن أي معاملة مشبوهة إلى السلطات المالية المختصة دون إشعار مسبق للعميل.</p>

                <p class="mb-5"><b>3. الأنشطة المحظورة</b><br>
                تحظر ValorBet بشكل صارم على العملاء استخدام حساباتهم لأي غرض يتعلق بغسل الأموال أو الاحتيال أو تمويل الإرهاب. يُحظر استخدام حسابات متعددة أو وسائل دفع تابعة لأطراف ثالثة أو أي أدوات تهدف إلى إخفاء مصدر الأموال.</p>

                <p class="mb-5"><b>4. الاحتفاظ بالسجلات</b><br>
                يتم الاحتفاظ بجميع بيانات تعريف العملاء وسجل معاملاتهم وسجلات اتصالاتهم بأمان لمدة لا تقل عن خمس (5) سنوات بعد انتهاء العلاقة مع العميل، لضمان توفر جميع البيانات اللازمة لأي تحقيق رسمي.</p>

                <p class="mb-5"><b>5. تدريب الموظفين</b><br>
                يتلقى جميع موظفي ValorBet تدريبًا دوريًا للتعرف على حالات غسل الأموال المحتملة والتعامل معها بالشكل الصحيح. نضمن أن فريقنا على دراية تامة بأحدث المعايير التنظيمية وأفضل الممارسات في هذا المجال.</p>

                <p class="mb-5"><b>6. التعاون مع السلطات</b><br>
                تتعاون ValorBet بشكل كامل مع السلطات المالية والجهات التنظيمية وأجهزة إنفاذ القانون، سواء المحلية أو الدولية. نضمن الشفافية الكاملة وتقديم المعلومات المطلوبة في الوقت المناسب عند الطلب القانوني.</p>

                <p class="mb-5"><b>7. الالتزامات بالإبلاغ</b><br>
                في حال اكتشاف أو الاشتباه بأي نشاط غير قانوني أو مشبوه، نحن ملزمون قانونيًا بالإبلاغ عن الحالة إلى السلطة المختصة. قد يتم تجميد حساب العميل حتى اكتمال التحقيق.</p>

                <p class="mb-5">من خلال التسجيل في ValorBet، يوافق العميل على الالتزام بسياسة مكافحة غسل الأموال وتمويل الإرهاب هذه، ويقر بأن تقديم معلومات خاطئة أو محاولة التحايل على إجراءات التحقق قد يؤدي إلى إغلاق دائم للحساب ومصادرة الأموال.</p>

                <p class="mb-5"><b>معلومات الاتصال</b><br>
                لأي استفسار متعلق بسياسة مكافحة غسل الأموال، يرجى التواصل عبر البريد الإلكتروني: <br>
                <b>البريد الإلكتروني:</b> compliance@valor.bet
                </p>
            </div>
        `
    },
    'self-exclusion': {
        title: 'سياسة الاستبعاد الذاتي',
        subtitle: 'اللعب المسؤول',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block" dir="rtl">
                <p class="mb-5">في ValorBet، نحن ملتزمون بتعزيز اللعب المسؤول وتزويد اللاعبين بالأدوات اللازمة للحفاظ على السيطرة على سلوكهم في اللعب. إذا شعرت في أي وقت أن نشاطك في الألعاب يؤثر سلبًا على حياتك، يمكنك طلب استبعاد ذاتي مؤقت أو دائم.</p>
                <p class="mb-5">الاستبعاد الذاتي يعني أن حسابك سيتم إغلاقه لفترة محددة أو إلى أجل غير مسمى، ولن تتمكن من الوصول إلى خدماتنا خلال تلك المدة.</p>
                <p class="mb-5">لبدء عملية الاستبعاد الذاتي، يرجى الاتصال بفريق الدعم لدينا عبر البريد الإلكتروني <b>support@valor.bet</b> وتحديد المدة التي ترغب في أن تكون مستبعدًا خلالها (على سبيل المثال: 6 أشهر، سنة واحدة أو بشكل دائم).</p>
                <p class="mb-5">بمجرد تفعيل الاستبعاد الذاتي، لا يمكن التراجع عنه حتى انتهاء الفترة المحددة. خلال هذا الوقت، لن تتلقى أي مواد ترويجية أو عروض من ValorBet.</p>
                <p class="mb-5">نوصي أيضًا بالاتصال بالمنظمات المتخصصة في علاج إدمان المقامرة إذا شعرت بأنك تفقد السيطرة. من بين الموارد المفيدة:</p>
                <ul class="mb-5 list-disc ml-6">
                    <li>GamCare (www.gamcare.org.uk)</li>
                    <li>Gambling Therapy (www.gamblingtherapy.org)</li>
                    <li>Gamblers Anonymous (www.gamblersanonymous.org)</li>
                </ul>
                <p class="mb-5">في ValorBet، تعتبر سلامتك ورفاهيتك من أولوياتنا القصوى. العب بمسؤولية.</p>
            </div>
        `
    },
    'kyc': {
        title: 'سياسة اعرف عميلك (KYC)',
        subtitle: 'التحقق من الهوية والتوثيق',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block" dir="rtl" style="text-align: right;">
                <p class="mb-5">في إطار التزام شركة Mirage Corporation N.V. بالحفاظ على بيئة آمنة وشفافة للّعب، تطبق الشركة سياسة صارمة بعنوان "اعرف عميلك" (KYC). تهدف هذه السياسة إلى ضمان التحقق من هوية جميع العملاء لمنع الاحتيال وغسل الأموال واستخدام خدماتنا لأغراض غير قانونية.</p>
                <h3 class="font-bold">1. الهدف</h3>
                <p class="mb-5">تهدف سياسة KYC إلى تحديد هوية جميع اللاعبين والتحقق من مصدر أموالهم عند الحاجة، وذلك ضمن التزامنا بمتطلبات مكافحة غسل الأموال (AML) وتمويل الإرهاب (CFT).</p>
                <h3 class="font-bold">2. التحقق من الهوية</h3>
                <p class="mb-5">يُطلب من اللاعبين تقديم معلومات دقيقة وقابلة للتحقق عند التسجيل. وتشمل هذه المعلومات الاسم الكامل، وتاريخ الميلاد، والعنوان، بالإضافة إلى مستندات هوية سارية مثل جواز السفر أو بطاقة الهوية الوطنية أو رخصة القيادة.</p>
                <p class="mb-5">تحتفظ الشركة بالحق في طلب مستندات إضافية للتحقق من الهوية أو مصدر الأموال، مثل إثبات العنوان (فاتورة خدمات أو كشف حساب بنكي) أو معلومات حول طرق الدفع المستخدمة في المنصة.</p>
                <h3 class="font-bold">3. توقيت التحقق</h3>
                <p class="mb-5">قد يتم إجراء التحقق أثناء التسجيل، أو قبل تنفيذ عمليات السحب، أو في أي وقت تراه الشركة ضروريًا للتأكد من صحة المعلومات المقدمة. يمكن تعليق الحساب مؤقتًا حتى يتم استكمال عملية التحقق بنجاح.</p>
                <h3 class="font-bold">4. حماية البيانات</h3>
                <p class="mb-5">تُعالج جميع المعلومات والمستندات المقدمة ضمن عملية KYC بسرية تامة، وفقًا لقوانين حماية البيانات المعمول بها. يتم تخزين البيانات بأمان واستخدامها فقط لأغراض التحقق والامتثال التنظيمي.</p>
                <h3 class="font-bold">5. عدم الامتثال</h3>
                <p class="mb-5">قد يؤدي عدم تقديم المستندات المطلوبة أو تقديم معلومات غير صحيحة أو مضللة إلى تعليق الحساب أو تقييد الخدمات أو حتى إخطار الجهات التنظيمية المختصة عند الضرورة.</p>
                <h3 class="font-bold">6. المراقبة المستمرة</h3>
                <p class="mb-5">تقوم شركة Mirage Corporation بمراقبة المعاملات وسلوك اللاعبين بشكل مستمر لاكتشاف أي أنشطة مشبوهة. في حال تم اكتشاف أي مخالفات، قد يتم طلب إعادة التحقق أو مراجعة الحساب.</p>
                <p class="mb-5">باستخدام خدماتنا، يقر اللاعبون بموافقتهم على الالتزام بسياسة "اعرف عميلك" كجزء من الشروط والأحكام الخاصة بشركة Mirage Corporation.</p>
            </div>
        `
    },
    'dispute-resolution': {
        title: 'حل النزاعات',
        subtitle: 'تسوية الخلافات',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block" dir="rtl">
                <p class="mb-5">يشير مصطلح حل النزاعات إلى تسوية الخلافات بين طرفين أو أكثر، سواء في القانون التجاري أو المدني.</p>
                <p class="mb-5">قد تختلف طرق الحل من حيث التكلفة والسرعة والخصوصية وسهولة الوصول، لذلك يجب اختيار الطريقة المناسبة لكل حالة.</p>
                <p class="mb-5">للتواصل مع فريق حل النزاعات لدينا، يمكنك إرسال بريد إلكتروني إلى <a href="mailto:support@valor.bet">support@valor.bet</a>.</p>
                <p class="mb-5"><span>المناقشات التمهيدية</span> – وهي الطريقة الأقل تكلفة، حيث تجتمع الأطراف قبل أي إجراء قضائي لمحاولة الوصول إلى حل ودي.</p>
                <p class="mb-5"><span>الوساطة</span> – عملية يتدخل فيها طرف ثالث محايد (الوسيط) لمساعدة الأطراف في التوصل إلى اتفاق. تظل العملية سرية وأقل رسمية من التحكيم أو التقاضي.</p>
                <p class="mb-5"><span>التحكيم</span> – إجراء قانوني رسمي أكثر من الوساطة، حيث يقدم الطرفان الأدلة إلى محكّم مستقل يتخذ قرارًا نهائيًا وملزمًا. التحكيم خاص وأسرع من التقاضي في المحاكم.</p>
                <p class="mb-5"><span>التقاضي</span> – إجراء رسمي أمام المحكمة قد يكون مكلفًا وطويلًا، لكن الحكم الصادر يكون ملزمًا للطرفين.</p>
                <p class="mb-5"><span>تسوية النزاعات البديلة (ADR)</span> – مصطلح يشير إلى أي وسيلة لحل النزاعات خارج المحاكم، مثل الوساطة أو التحكيم.</p>
                <p class="mb-5">قبل اتخاذ أي إجراء قانوني، تحقق دائمًا من بنود العقد، فقد تحتوي على شروط خاصة بطريقة حل النزاعات.</p>
            </div>
        `
    },
    'general-terms': {
        title: 'شرائط و ضوابط',
        subtitle: '',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block"><p class="mb-5">تعاریف: www.Valor.Bet</p><p class="mb-5">1Win N.V. جو ڈاکٹر ایچ. فرگوسن ویگ 1، کیوراساؤ، پر رجسٹرڈ ہے، کمپنی نمبر 147039 کے ساتھ ، اور جو کے عمل کا سرٹیفیکیٹ رکھتی ہے، جو گیمنگ لائسنس کے درخواست نمبر OGL/2024/587/0621 کے لئے کیوراساؤ گیمنگ کنٹرول بورڈ کو جاری کیا گیا ہے ، اور گیمنگ سوفٹ ویئر چلانے کا تمام حقوق. ادائیگیوں کی پروسیسنگ MFI انویسٹمنٹس لمیٹڈ (رجسٹریشن نمبر: HE 386738، ایڈریس: اولیدوس اسٹریٹ 4، میزا گتونیا، 4002، لیمسول، سائپرس) کی طرف سے کی جاتی ہے جو کہ 1Win N.V. کمپنی کی سبسیڈیاری ہے۔</p><p class="mb-5">سائٹ پر موجود معلومات سائٹ کے آپریٹر - کمپنی والور بیٹ ن.وی. کی جانب سے فراہم کی گئی ہیں، جو کہ درج ذیل ایڈریس پر رجسٹرڈ ہے: پام ایونیو 10، روز بینک، سینٹ مارٹن۔ کمپنی والور بیٹ ن.وی. کی سرگرمی کو آئی لینڈ گیمز ن.وی. کی جانب سے لائسنس اور ریگولیٹ کیا گیا ہے (لائسنس نمبر: نمبر 1234/JAZ2021-567؛ 31 دسمبر 2025 تک درست) اور سینٹ مارٹن کے قانون کے تحت۔ ادائیگیاں گلوبل انویسٹ سلوشنز لمیٹڈ (رجسٹریشن نمبر: HE 654321، ایڈریس: اوشن ڈرائیو 22، میسا ورڈے، 5678، لیماسول، قبرص) کے ذریعے پروسیس کی جاتی ہیں، جو کہ والور بیٹ ن.وی. کی ایک ذیلی کمپنی ہے۔</p><h2>عمومی شرائط اور ضوابط</h2><h3>اہم بنیادی بنیادیات</h3><h3>بنیادی تعاریف اور اصطلاحات</h3><h3>اکاؤنٹ کے قواعد</h3><h3>اکاؤنٹ بنانے کی شرائط</h3><h3>نوجوان سیاست</h3><h3>گاہک شناخت</h3><h3>متعدد رجسٹریشن</h3><h3>فاتحانہ کی ادائیگی</h3><h3>قانونی تنظیم / پابندیاں</h3><p class="mb-5">1. ValorCasino شرطیں کھیلنے والی شرکت کسی بھی دوسرے ملک میں ہونے والی کھیلوں اور دیگر واقعات پر شرطیں قبول کرتی ہے۔</p><p class="mb-5">1. 1 شرطیں منسوخ کرنا؛</p><p class="mb-5">2. 2 گاہک کے اکاؤنٹ کو بند کرنا بغیر واپسی کے؛</p><p class="mb-5">3. کوئی بھی شرط لگائی جائے وہ یہ ظاہر کرتی ہے کہ گاہک مندرجہ ذیل بیٹنگ قواعد کے ساتھ متفق ہے اور ان کو قبول کرتا ہے۔</p><p class="mb-5">6. بیٹنگ شرکت ٹیموں کے ناموں، کھلاڑیوں کے ناموں، مقابلوں کے مقامات کی حروفی تبدیلی (غیر ملکی زبانوں سے ترجمہ) کے متعلق دعویٰ قبول نہیں کرتی۔ مقابلہ کے نام میں دی گئی تمام معلومات موجودہ ہیں۔ ان معلومات میں ممکنہ غلطیاں شرط منسوخ کرنے کا بنیاد نہیں ہیں۔</p><p class="mb-5">7. تمام کھیلوں کو موقوف اور منسوخ تصور کیا جائے گا صرف اس صورت میں جب کھیل کی انجام دہی کرنے والی تنظیموں کے رسمی دستاویزات، کھیلوں کی کمپیٹیشن کرنے والے کھیلوں کی فیڈریشن کی رسمی ویب سائٹس، کھیلوں کے کلب کی ویب سائٹس اور دوسری کھیلوں کی معلومات کی منبع سے معلومات ہو اور ان کھیلوں کی موجودگی ان معلومات کے بنیاد پر درست کی جائے۔</p><p class="mb-5">8. علاقائی چیمپئن شپ کے بارے میں شرطیں (فٹ بال، فٹسال، ہاکی وغیرہ) 7 دنوں کے اندر حساب کی جائیں گی (ان چیمپئن شپ کی رسمی ویب سائٹس پر نتائج کی اشاعت کے بعد)۔ رسمی ویب سائٹس کی فہرست "اطلاعات کی اہم مکاتب" میں دی گئی ہے۔ میچ میں کسی ایک ٹیم کی عدم موجودگی کی صورت میں، تمام شرائط کو کافیشنٹ "1" (واپسی) کے ساتھ ادا کیا جائے گا۔ میچ میں شرکت نہیں کرنے والی ٹیم کو واکاور سے نوازا جاتا ہے۔</p><p class="mb-5">ویلر کیسینو کی بیٹنگ کمپنی کے یہ شرائط اور ادائیگی کے قواعد (موجودہ میں "قواعد" کہا جاتا ہے) بیٹوں کی قبولیت، ادائیگیوں، اختلافات کے حل، کچھ خاص باتوں کی وضاحت، مخصوص کھیلوں پر بیٹنگ کا نظام مقرر کرتے ہیں۔ یہ قواعد ویلر کیسینو بیٹنگ کمپنی کے شرکاء اور گاہک کے درمیان دیگر تمام تعلقات کو قانونی طور پر قابو میں رکھتے ہیں۔ یہ قواعد ویلرکیسینو.کام سائٹ کے صارفین اور ان کے متعلقہ سائٹوں کے لئے قابل اطلاق ہیں۔ بیٹ - وہ معاہدہ جو گاہک اور بیٹنگ کمپنی کے درمیان منعقد کیا جاتا ہے، مقرر شرائط کے مطابق، جبکہ اس معاہدے کا نتیجہ واقعہ پر منحصر ہوتا ہے، جس کے بارے میں یہ معلوم نہیں کہ یہ واقعہ ہو گا یا نہیں۔ گاہکوں سے شرائط پر بیٹوں کی قبولیت ہوتی ہے۔ نتیجہ - وہ نتیجہ جو واقعہ (واقعات) کا ہوتا ہے، جس پر بیٹ کی گئی ہو۔ گاہک - وہ شخص جو بیٹنگ کمپنی میں واقعہ کے نتیجے پر بیٹ کرتا ہے۔ لائن - وہ سلسلہ واقعات، ان واقعات کے ممکنہ نتائج، ان واقعات کی ممکنہ نتائج پر کوئیفیشنٹس، ان کی تاریخ اور وقت، جس کے بعد بیٹنگ کمپنی ان واقعات کی ممکنہ نتائج پر بیٹ قبول کرنا بند کرتی ہے۔ بیٹ منسوخ کرنا - وہ واقعہ جس کے لئے حساب اور ادائیگی نہیں کی جاتی ہے۔ "بیٹ منسوخ کرنے" کی صورت میں، ان قواعد کے مطابق، منظم اور گاہک کے درمیان معاملہ ناکارہ اور باطل قرار دیا جاتا ہے اور ایسی بیٹ کے لئے واپسی کی جاتی ہے۔ عام کھیلنے کا وقت - میچ کی مدت جو اس کھیل کے قواعد کے مطابق ہوتی ہے، جس میں ریفری کے ذریعہ شامل کردہ زخمی وقت شامل ہوتا ہے۔ عام کھیلنے کا وقت زخمی وقت، اوور ٹائم، پینلٹی شوٹ ، وغیرہ شامل نہیں ہوتا۔</p><p class="mb-5">1 ایک فرد رقم کے لئے کسی کھیل میں شرکت نہیں کر سکتا جب تک وہ ایک اکاؤنٹ ہولڈر نہ ہو۔ کھلاڑی کے طور پر رجسٹر ہونے کے لئے (شراکت دینے کی صلاحیت حاصل کرنے کے لئے)، ایک فرد کو رجسٹریشن کے لئے درخواست دینی ہوگی اور کم از کم مندرجہ ذیل معلومات فراہم کرنی ہوں گی: تاریخ پیدائش (ظاہر کرتے ہوئے کہ کھلاڑی اٹھارہ (18) سال سے زیادہ عمر کا ہے)؛ کھلاڑی کا پہلا اور آخری نام؛ کھلاڑی کی رہائش کا مقام؛ کھلاڑی کا درست ای میل ایڈریس؛ ایک صارف کا نام اور پاس ورڈ۔</p><p class="mb-5">2 ایک فرد جو اکاؤنٹ ہولڈر بننے کی درخواست کر رہا ہو اس کی ضمانت اور توثیق کرتا ہے: کہ وہ ایک فیزیکل شخص ہے (قانونی شخصیت کو اکاؤنٹ ہولڈر قبول نہیں کیا جائے گا)؛ کہ وہ کسی بھی ملک کا رہائشی نہیں ہے: اروبا، افغانستان، البانیا، الجیریا، انگولا، آسٹریلیا، باہاماس، بونائر، بوٹسوانا، کمبوڈیا، کیوراکاؤ، اکواڈور، اتھوپیا، فرانس، گھانا، گیانا، ہانگ کانگ، ایران، عراق، اسرائیل، اٹلی، کویت، لاؤس، میانمار، نمیبیا، نکاراگوئے، شمالی کوریا، نیدرلینڈز، پاکستان، پانامہ، پاپوا نیو گنی، فلپائن، سنگاپور، اسپین، سری لنکا، سوڈان، سوریہ، تائیوان، ٹرینیڈاڈ اور ٹوباگو، ٹونیشیا، یوگنڈا، متحدہ بادشاہت، متحدہ ریاستیں امریکہ، سابا، سٹیٹیا، سینٹ مارٹن، یمن، زمبابوے۔ (کیسینو - گیمز - لائیو کیسینو، پوکر اور بنگو کے لئے خصوصی ملکی محدودیتوں کا خبردار رہیں)؛ کہ وہ کسی بھی کھیل، مقابلہ یا لیگ میں پیشہ ور کھلاڑی نہیں ہے جہاں ویلر کیسینو بیٹنگ پیش کرتا ہے؛ کہ وہ محدود قانونی صلاحیت سے محروم نہیں ہے؛ کہ وہ کسی دوسرے شخص کے نام پر عمل نہیں کر رہا ہے؛ کہ وہ ضرورت سے زیادہ شوقین جوئی کا متعلق نہیں ہے، اور/یا (خود ارادہ سے یا غیر ارادی طور پر) محروم کھلاڑیوں کے کسی رجسٹر یا ڈیٹابیس میں شامل نہیں ہے؛ کہ وہ رقم جوڑنے کی بنیاد پر جرائم اور/یا دیگر غیر مرخصات کی مخصوص رقم وصول نہیں کر رہا ہے؛ کہ وہ رقم کا شراکت دار اس کارڈ کی بنیاد پر جرائم کا مقدار ہے جو اس کو استعمال کرنے کی اجازت نہیں ہے اور/یا ایک علاقے میں ایک کارڈ کا استعمال جہاں بیٹنگ اور گیمنگ پابند ہیں؛ کہ وہ جرائم کی کارروائیاں نہیں کر رہا ہے جس میں ویلر کیسینو اکاؤنٹ دوامیں یا غیر دوامیں شامل ہیں؛ کہ وہ اپنے ملک کے قانون کے خلاف ہے یا اس کے لئے پابند ہے کہ وہ ایک گیمنگ اکاؤنٹ کھولے، ویلر کیسینو سے خدمات خریدیں یا استعمال کریں، اور/یا ویلر کیسینو کی پیش کردہ کھیلوں میں شراکت کریں۔ وہ اکاؤنٹ ہولڈر کی ذمہ داری ہے کہ اس کا ویلر کیسینو کی ویب سائٹ اور خدمات کا استعمال قانونی ہے؛ وہ ویب سائٹ یا خدمات کو بری طرح، مخالفت آمیز، غیر منصفانہ، نازیبا نہیں سمجھتا۔ اپنے ویلر کیسینو کے اکاؤنٹ کی تفصیلات کو درج ذیل کے لحاظ سے تازہ رکھنا: پہلا اور آخری نام، رہائش کا ملک، درست ای میل ایڈریس اور فون نمبر۔ ملٹیپل اکاؤنٹس نہ بنانا۔</p><p class="mb-5">3 رجسٹریشن کے لئے درخواست دینے والے فرد کی ضمانت اور توثیق کرتا ہے کہ ان کی درخواست فارم میں فراہم کردہ کوئی بھی معلومات سچ اور درست ہیں۔ اگر یہ نہ ہو تو، ویلر کیسینو فرد کو رجسٹر نہیں کرے گا۔ اگر کسی پہلے سے موجودہ اکاؤنٹ کی ڈیٹا کی درستگی کے بارے میں شک ہو تو، ویلر کیسینو بی سی کو، شراط کمپنی کی چنائی گئی کسی بھی دستاویزات کی درخواست کرنے کا حق ہوتا ہے جو بیٹنگ شرکاء کی شناخت اور دیگر ڈیٹا کی تصدیق کرتے ہیں، اور سب ڈیٹا کی تصدیق ہونے تک تمام ادائیگیوں کو منسوخ کرنے کا حق ہوتا ہے۔ بیٹنگ کمپنی کو دستاویزات کی تصدیق کے لئے دستاویزات بھیجنے کا حق ہوتا ہے۔ دستاویزات کی تصدیق تک دستاویزات کی وصولت کے لمحہ سے 72 گھنٹے تک ہو سکتی ہے۔ اگر ثابت ہو جائے کہ موصولہ معلومات قابل اعتماد نہیں ہیں، تو کمپنی کو معمولی طور پر تمام شراکتوں کو بے انتہا منسوخ کرنے اور تمام رقمی ادائیگیوں کو معطل کرنے کا حق ہوتا ہے، اور اکاؤنٹ کی تصدیق جاری رکھنے کا حق ہوتا ہے، اس کے لئے ایک پیکیج دستاویزات کی ضرورت ہوتی ہے۔</p><p class="mb-5">2. متحدہ ریاستوں، فرانس، متحدہ بادشاہت، ہسپانیہ اور اٹلی کے صارفین کو ویلر کیسینو پر جوئے کھیلنے سے ممنوع ہے۔</p><p class="mb-5">اگر آپ 18 سال سے کم عمر ہیں تو براہ کرم ValorCasino بیٹنگ کمپنی میں رجسٹر ہونے کی کوشش نہ کریں۔ ValorCasino ایک ذمہ دارانہ جوا کمپنی ہے اور یہ 18 سال سے کم عمر کے افراد کو جوا خیلوں تک رسائی تو پابندی کا استریٹيجی کا اطلاق کرتی ہے۔ کمپنی شرط کرنے والوں کو چیک کرتی ہے ، لہذا اگر آپ BC ValorCasino کی سائٹ پر ایک اکاؤنٹ رجسٹر کرتے ہیں ، تو ہمیں آپ کی عمر اور شناخت کے ثبوت کے لئے آپ کے دستاویزات کی درخواست کرنے کا حق ہوتا ہے۔ آپ اپنے اکاؤنٹ کو دوسرے شخص کو منتقل ، بیچ ، یا گروی نہیں کر سکتے۔ اس پابندی میں اکاؤنٹس کی ملکیت ، جیت ، جمع کرائی گئی رقم ، شرطیں ، حقوق اور / یا ان اثاثے سے متعلقہ دعوے ، قانونی ، تجارتی ، یا دوسری طرح کی کسی بھی قسم کی قیمت والے اثاثے کی تبادلہ شامل ہیں۔ ان کہے جانے والے منتقلی پر پابندی کسی فوجی یا کسی دوسرے تیسرے پارٹی ، کمپنی ، قدرتی یا قانونی فرد ، فاونڈیشن اور / یا انجمن کے ساتھ معاوضہ ، گروی ، تفویض ، استعمال ، تجارت ، برکراری ، ہائپوتھیکیشن اور / یا ہدایت کرنے شامل ہیں۔</p><p class="mb-5">اندرونی AML-پالیسی کے مطابق کمپنی کمپنی کے صارفین کی ابتدائی اور موجودہ شناخت چیک کرتی ہے ،ہر صارف سے متعلقہ خطرناک سطح کے مطابق کمپنی آپ سے آپ کی شناخت کی توثیق کے لئے کم سے کم معلومات فراہم کرنے کی ضرورت ہوگی ۔ کمپنی آپ کی شناخت کی ثبوت کے اعداد و شمار اور دستاویزات کو ریکارڈ اور محفوظ کرے گی ، بالکل اس کے الاوا ان کے بارے میں معلومات کہ کون سے طریقے آپ کی شناخت کی توثیق کے لئے استعمال ہوئے تھے اور چیک کرنے کے نتائج۔ کمپنی آپ کے ذاتی اعداد و شمار کو دہشت گردی کے شک میں ملوث افراد کی فہرست کے ساتھ میچ کر سکتی ہے ، جومجاز ریاست اور آزاد جسمانیات نے تشکیل دی۔ شناخت کے اعداد و شمار کا کم سے کم مجموعہ شامل ہے: صارف کا پورا نام؛ تاریخ پیدائش (افراد کے لئے)؛ صارف کا رہائشی پتہ یا رجسٹریشن کا پتہ؛ جو فنڈز کمپنی کے اکاؤنٹ میں جمع کرنے جا رہے ہیں۔ اوپر درج کیے گئے اعداد و شمار کی توثیق اور تصدیق کرنے کے لئے ، کمپنی صارف سے درج ذیل دستاویزات مطلوب کر سکتی ہے: پاسپورٹ یا ابھرتی کارڈ ، یا انہیں تبدیل کرنے والے دیگر دستاویزات ، جو درج ذیل متطلبات کو پورا کرتے ہیں: - دستاویز کے مالک کا نام ، تاریخ پیدائش اور تصویر شامل ہے۔ - قومی حکومتی اداروں نے جاری کیا تھا ، حال ہی میں وصول ہونے والی بجلی کے بل کی ادائیگی (3 ماہ سے زیادہ پرانہ نہیں) یا دوسرا دستاویز جو صارف کے مقامی پتے کی تصدیق کر سکتا ہے۔ کمپنی ویڈیو شناخت یا متعلقہ دستاویزات کے ساتھ دوسری اضافی معلومات کی بھی درخواست کر سکتی ہے۔ کچھ صورتوں میں ، کمپنی صارف سے دستاویزات کی نوٹرائز کی گئی کاپیاں بھی مطلوب کر سکتی ہے۔</p><p class="mb-5">ہر ایک رجسٹرڈ کلائنٹ کا صرف ایک اکاؤنٹ ہو سکتا ہے۔ ویب سائٹ پر رجسٹریشن کرتے وقت ، مندرجہ ذیل قاعدہ لاگو ہوتا ہے: ایک خاندان, ایک پتہ, ای میل پتہ, کریڈٹ / ڈیبٹ کارڈ نمبر یا آئی پی پتہ. کمپنی کی انتظامیہ مکمل حق رکھتی ہے کہ وہ کلائنٹ سے زیادہ درست معلومات (پاسپورٹ کی معلومات, رہائشی اجازت نامہ, رجسٹریشن) طلب کرے اور ویڈیو کانفرنس برقرار کرے۔ ایک رجسٹر ہوا کلائنٹ نئے کلائنٹ (نئے نام کے تحت ، نیا ای میل ایڈریس وغیرہ کے ساتھ) کے طور پر دوبارہ رجسٹر نہیں ہو سکتا. رے رجسٹریشن کے حقائق کی تصدیق کی صورت میں (نئے نام کے تحت بھی), دوسرے لوگوں کی, غیر جائز, جعلی دستاویزات (دستاویزات سمیت, مختلف پروگراموں اور گرافکس ایڈیٹرز کی مدد سے ترمیم شدہ) کی فراہمی, انتظامیہ نے ایسے اکاؤنٹ سے کی گئی شرطیں منسوخ کرنے کا حق رکھتی ہے. تصدیق کے عمل سے انکار کرنے کی صورت میں ، انتظامیہ کو شرطیں منسوخ کرنے کا حق ہوتا ہے۔ انتظامیہ کو یہ بھی حق ہے کہ ایسا اکاؤنٹ (دوبارہ رجسٹر شدہ) کو پروسیڈنگز کے مدت کے دوران (2 ماہ تک) بلاک کرے۔ کسی کلائنٹ کی درخواست پر ، ویلور کیسانو کی انتظامیہ کی طرف سے انفرادی استثناء کیا جا سکتا ہے۔ </p><p class="mb-5">رجسٹر شدہ گاہک کو نیا گاہک (نئے نام کے تحت، نئی ای میل ایڈریس کے ساتھ، وغیرہ) کے طور پر دوبارہ رجسٹر نہیں کیا جا سکتا۔ اگر دوبارہ رجسٹری کے حقیقت کی تصدیق ہوتی ہے (نئے نام کے تحت بھی)، دوسرے لوگوں کے، غیر معتبر، جعلی دستاویزات کی فراہمی (مختلف پروگرام اور گرافکس ایڈیٹرز کی مدد سے ترمیم شدہ دستاویزات شامل) کی صورت میں انتظامیہ کو اس طرح کے اکاؤنٹ سے کی جانیوالی شراکتوں کو منسوخ کرنے کا حق ہوتا ہے۔ تصدیقی پروسیجر کی انکار کی صورت میں، انتظامیہ کو شراکتوں کو منسوخ کرنے کا حق ہوتا ہے۔ انتظامیہ کو اس طرح کے اکاؤنٹ (دوبارہ رجسٹر شدہ) کو معالجہ کی مدت کے دوران (حد تک 2 مہینے) بلاک کرنے کا بھی حق ہوتا ہے۔ گاہک کی درخواست پر، ویلر کیسینو انتظامیہ کی طرف سے ایک فردی استثناء کیا جا سکتا ہے۔</p><p class="mb-5">1 جوئے کرنے والے کے منافع کی حساب کتاب، آخری واقعہ کے نتائج کی آفیشل شائعات کی تاریخ سے 30 (تیس) کیلینڈری دنوں کے اندر کی جاتی ہے، جو کہ بیٹس ہسٹری میں دیکھی جا سکتی ہے۔</p><p class="mb-5">2 منافع کی حساب کتاب کے بعد، جوئے کرنے والے کو حساب کی درستگی کا جانچ کرنا لازم ہوتا ہے، اور حساب کی درستگی پر اختلاف کی صورت میں، بیٹنگ کمپنی کو اس کی معلومات فراہم کرنی ہوگی جس میں ان کے اکاؤنٹ کا نمبر، شراکت کی تاریخ، وقت، واقعہ، رقم پیسے، واقعہ کا منتخب نتیجہ، کوئیفیشنٹ، اور حساب کی درستگی کے بارے میں اختلاف کی وجوہات شامل ہوں۔ تمام دعویٰ حساب کی حساب کتاب کیلئے دس (دس) دنوں کے اندر قبول کی جاتی ہیں۔</p><p class="mb-5">3 واقعہ کے مخصوص نتیجہ پر گاہک کی طرف سے کی گئی ایک بیٹ، اگر ایسی بیٹ میں مخصوص کی گئی تمام نتائج درستی سے پیشگوئی کی گئی ہوں، تو جیتا ہوا سمجھا جاتا ہے۔</p><p class="mb-5">4 ویلر کیسینو بیٹنگ کمپنی کی سیکیورٹی سروس کو موجودہ تمام طریقوں میں سے کسی بھی طریقے کی انتقالی محدود کرنے کا حق ہوتا ہے، اگر جمع کی رقم یا گیمنگ اکاؤنٹ سے رقم نکالنے کی رقم بیٹس کی رقموں کے مطابق نہ ہو۔ انعامی رقم پر شراکت کرنے والے کو ڈپازٹ رقم پر شراکت کرنے کی ضرورت ہوگی "سپورٹ" میں اوڑز کم سے کم 1.3 کے ساتھ، "ٹوٹو"، "کیسینو"، "لائیو-گیمز"، "لائیو-کیسینو" اور "واچوئل-اسپورٹس" میں شراکت کرنی چاہئے۔ وصول کا معیار اس ڈپازٹ کے اندر کی جانے والی شراکتوں کی رقم ہوگی۔</p><p class="mb-5">شرطیں صرف ان افراد سے قبول کی جاتی ہیں جنہوں نے 18 سال کی عمر یا اپنے مقام میں اکثریت کی عمر حاصل کی ہو (عمر 18 سال سے زیادہ ہونی چاہئے) اور جو کتابی کارکن کی طرف سے پیش کردہ شرائط کو قبول کرتے ہیں۔ شرائط قبول کرنے کے لئے جوابدہ نہیں ہیں: ان افراد سے جن کی عمر شرط لگانے کے وقت 18 سال نہیں ہوئی ہو؛ ان افراد سے جو وہ واقعے میں شرکت کرتے ہیں جن پر شرط لگائی جاتی ہے (کھلاڑی، کوچ، ریفری، مالک یا کلب کے کارکن اور دیگر افراد جن کا واقعے کے نتیجے پر اثر ڈالنے کی صلاحیت ہو)، اسی طرح دوسرے افراد جو ان کے نام پر عمل کرتے ہیں؛ دوسرے بک میکر کے مفادات کی نمائندگی کرنے والے افراد؛ دیگر افراد جن کی بک میکر کمپنی کے ساتھ معاہدہ کرنا قانون کی روشنی میں ممنوع ہو۔ 3. شرط 2 کی خلاف ورزی کے لئے شرط کار ذمہ دار ہوتا ہے۔ ان شرائط کی خلاف ورزی کی صورت میں، بک میکر کو کسی بھی فتح یا جمع کردہ رقموں کو واپس نہ کرنے کا حق، اور جیمے ڈالی گئی رقموں کو منسوخ کرنے کا حق، اور کسی بھی شراکت کی شرائط کو کینسل کرنے کا حق ہوتا ہے۔ شرط لگانے والی کمپنی کو کسی بھی زمانہ پر جب یہ معلوم ہو جاتا ہے کہ کلائنٹ میں سے ان میں سے ایک شخص ہے ان لوگوں میں سے ان افراد کی کوئی ذمہ داری نہیں ہوتی ہے۔ یہ مطلب ہے کہ بک میکر کو ان تدابیر کو کسی بھی وقت اختیار کرنے کا حق ہوتا ہے جب یہ معلوم ہوتا ہے کہ کلائنٹ ان میں سے ایک مخصوص شخص ہے۔ 4. شرط لگانے والی کمپنی کو ان لوگوں کی شرائط پر عمل نہ کرنے کا حق ہوتا ہے جو ان شرائط پر عمل نہیں کرتے ہیں۔ شرط لگانے والی کمپنی کو عوامی اخلاقیات اور عوامی نظم کی خلاف ورزی کرنے والے کلائنٹ کو کسی بھی قسم کے شراکت کو قبول نہ کرنے کا حق ہوتا ہے۔ 5. شرط لگانے والی کمپنی کو کسی بھی شخص کے بارے میں کوئی وجہ بغیر کسی بھی شراکت قبول کرنے کا حق ہوتا ہے۔ 6. تمام شرطوں کی حساب کتاب پر پروسیسنگ سینٹر دوارہ فراہم کی گئی معلومات پر مبنی ہوتی ہے۔ 7. کمپنی کو یہ حق ہے کہ اگر وہ ثابت کرتی ہے کہ: شرط لگانے والے شرکاء کو شرط لگانے کے وقت واقعے کا نتیجہ معلوم ہوتا ہے؛ شرط لگانے والے شرکاء کو واقعہ کے نتیجے پر اثر ڈالنے کا موقع ملتا ہے جو میچ کے سیدھے شرکاء ہیں (کھلاڑی، ریفری، کوچ، وغیرہ) یا ان کے نام پر عمل کرنے والا شخص؛ شرط لگانے والے شرکاء کی ایک جماعت (سنڈیکیٹ) میں متحدہ طریقے سے کام کرتے ہیں جس کا مقصد کمپنی کی مقرر کردہ حدود کو پار کرنا ہے؛ ایک شرط لگانے والے شریک کے پاس کئی گیمنگ اکاؤنٹس ہوتے ہیں (متعدد رجسٹریشن)؛ شرط لگانے والے شریک کوشبھ کوڈ یا ٹیکنیکی آلات کے استعمال کا شکار شبھ ہے کہ شرط لگانے کا عمل خود بخود کریا گیا ہے؛ کمپنی کی مقرر کردہ حدود اور پابندیوں کو نظرانداز کرنے کے لئے کوئی بے ایمانانہ طریقہ حاصل کیا گیا ہو۔ 8. اوپر ذکر شدہ صورتحالات میں صارف اکاؤنٹ کا بیلنس اختیار کی گئی فیصلہ کے بعد واپسی شاید نہ ہو۔ اس صورتحال میں، بیلنس کی رقم بے ایمانانہ کمائی کو دھیان میں رکھتے ہوئے مقرر کی جاتی ہے۔ 9. کمپنی کو یہ حق ہے کہ ویلر کیسینو شرط لگانے والی کمپنی کے اکاؤنٹ میں رقم جمع کرنے اور/یا نکالنے کے دوران وصول کردہ کمیشن کا نقصان واپس نہ کریں۔ کمپنی کو صارف کی شناخت کی پروسیس کو ویڈیو کنفرنس کے ذریعے تصدیق کرنے اور شناختی دستاویزات کی درخواست کرنے کا حق ہوتا ہے۔ 10. اگر کمپنی کی سیکورٹی سروس کو شرط لگانے والے شرکاء کی شناخت یا فراہم کردہ معلومات (پتہ، کریڈٹ یا ڈیبٹ کارڈ یا دیگر معلومات) کی قابلیت پر شکوہ ہوتا ہے تو ان کو صارف سے کسی بھی دستاویزات کی درخواست کرنے کا حق ہوتا ہے، جو کمپنی کی منتخبی کے مطابق شناخت اور دیگر معلومات کی تصدیق کرتے ہیں، اور تمام معلومات کی تصدیق ہونے تک تمام ادائیگیوں کو منسوخ کرنے کا حق ہوتا ہے۔ دستاویزات کی تصدیق کا عمل دستاویزات کے وصول ہونے کے بعد 24 گھنٹے تک ہو سکتا ہے۔ اگر ثابت ہوتا ہے کہ وصول شدہ معلومات قابل اعتماد نہیں ہیں تو کمپنی کو تمام شراکتوں کو منسوخ کرنے اور تمام نقدی تراکیب کو غیر معین مدت کے لئے معطل کرنے کا حق ہوتا ہے۔ 11. اکاؤنٹ کا مالک ثابت/متفق ہوتا ہے کہ اکاؤنٹ میں کی جانے والی تمام کارروائیاں اسی کی مختیفت سے کی جاتی ہیں۔ اگر اکاؤنٹ پر تیسرے افراد کی کارروائیاں کی جاتی ہیں تو مالک صرف اکاؤنٹ تک رسائی کے لئے ذمہ دار ہوتا ہے۔ 12. اکاؤنٹ کا مالک ثابت/متفق ہوتا ہے کہ اکاؤنٹ میں اور اس کی تفصیلات کا استعمال کرتے ہوئے ہر کارروائی وہ خود کرتا ہے یا اپنے اجازت کے ساتھ۔ ان ممالک کے صارفین کے لئے جہاں کھیل کی شرط لگانا غیر قانونی ہو وہ ان کی بینک کارڈ کا استعمال کرکے سائٹ پر کوئی لین دین مکمل نہ کرنے کی پابندی ہوتی ہے۔ بینک کارڈ کے مالک کو اپنے ملک کے قانون کو جاننا لازمی ہوتا ہے مخصوص طور پر شرطوں کی فراہمی کی۔ جوانمردوں کی بینک کارڈ کا استعمال ان کی ویب سائٹ پر لین دین کرنے کی پابندی ہوتی ہے۔ 13. کمپنی کو قواعد کے متن کو اپ ڈیٹ کرنے اور نئے قواعد شامل کرنے کا حق ہوتا ہے۔ اس صورت میں، نئے قواعد یا قواعد کی نئی ایڈیشن فوراً عمل میں آتے ہیں اور انہیں سائٹ پر شائع ہونے کے بعد فوراً لاگو کیا جائے گا۔ 14. کسی بھی مسائل سے نمٹنے کے لئے ویلر کیسینو آپ کو مندرجہ ذیل رہنمائیاں فراہم کرتا ہے تاکہ آپ مسئولیت کے ساتھ کھیل سکیں: کھیل شروع کرنے سے پہلے اپنے لئے مخصوص وقت اور رقم کی حدیں مقرر کریں جو آپ خرچ کرنے والے ہیں۔ صرف اتنی رقم سے کھیلیں جو آپ کو کھونے کی برداشت ہو۔ ہارنے کے بعد براہ کرم اعادہ نہ کریں۔ 15. اگر آپ نشہ آور اشیاء یا کسی دوسری دھات کے تحت میں ہیں تو جوابدہانہ کرنا ٹالیں۔</p><p class="mb-5">3. اگر ان شرائط میں ترمیم کی جائے، تو کلائنٹ کو ان کے مطابق اعلانات کے ذریعے مطلع کیا جاتا ہے۔ اعلان میں مخصوص تاریخ سے قبول کردہ شرائط میں ترمیم کے اثرات ہوتے ہیں۔ اس تاریخ سے پہلے رکھی گئی شرائط برقرار رہتی ہیں۔</p><p class="mb-5">4. ہم کھیل کو ایک خوشگوار فری تفریحی سرگرمی کے طور پر فروغ دینے کی حوصلہ افزائی کرتے ہیں اور یقین رکھتے ہیں کہ کھیل صرف اس صورت آپ کی زندگی میں موجود ہو سکتا ہے اگر آپ خود کو کنٹرول میں رکھتے ہیں اور ذمہ داری سے کھیلتے ہیں۔</p><p class="mb-5">1. کسی بھی صورت میں ویلر کیسینو شرط لگانے والی کمپنی کو کسی بھی غیر مستقیم، اتفاقی یا غیر متعمد نقصان یا کلائنٹ (منافع کی نقصان کی بھی) کی ذمہ داری نہیں ہوگی، حتی کہ ان کو ایسے نقصان یا بے چینی کے امکان کا علم ہو۔</p><p class="mb-5">2. کلائنٹ کی شرط لگانے کی تصدیق کے لمحے میں انٹرنیٹ کنکشن کی خرابی شرط منسوخ کرنے کا بنیاد نہیں ہے۔</p><p class="mb-5">3. کسی بھی شرط لگائی گئی شرط کلائنٹ کے رضاکار ہونے اور منظور کرنے کی تصدیق کی طرح خدمت کرتی ہے۔</p><p class="mb-5">4. شرط لگانے والی کمپنی کے اعلان کردہ واقعات کے نتائج ہی شرط کی حساب کتاب اور فائدے کا تعین کرنے کا بنیاد ہیں۔ واقعات کے نتائج کے حوالے سے دعویٰ کو صرف متعلقہ کھیل کی آفیشل دستاویزات کے پیکیج میں شامل کیا جائے گا۔</p><p class="mb-5">5. اگر شک ہو کہ کسی شرط لگانے والے نے بک میکر کمپنی کے خلاف فریبی کارروائی کی ہے (متعدد اکاؤنٹ، شرطیں تیسری شخصوں کے ذریعہ کی گئی ہیں، شرطیں کو بیٹنگ خودکار بنانے کے لئے سافٹ ویئر کا استعمال، اربٹریج بیٹنگ، اگر شرط لگانے کا اکاؤنٹ شرط لگانے کے لئے استعمال نہیں کیا جاتا ہے، وفاداری کے پروگراموں کا بے انتہا استعمال، وغیرہ)، تو بک میکر کمپنی کو ایسی فریبی کارروائیوں کو روکنے کا حق ہوتا ہے:</p><h2>کمپنی کے بارے میں</h2><p class="mb-5">1. شرائط اور شرائط شرطوں کو قبول کرنے کے لئے (کوئیفیشنٹس، نتائج کے اختیارات، دستیاب شرط لواحقہ، زیادہ سے زیادہ شرطات کی حدود وغیرہ) کسی بھی وقت تبدیل کیا جا سکتا ہے اور نئے شراکت دار کی شرطوں کے لئے درست ہوتا ہے، جبکہ پہلے ہی کر دی گئی شرائط برقرار رہتے ہیں۔ ایک معاہدہ میں داخل ہونے سے پہلے، گاہک کو فی الحال لائن کی تمام تبدیلیوں کو جاننا ضروری ہے۔ 2. وقت شرط لگائے جانے والے واقعات پر شرط لگائی جا سکتی ہیں، جن کا نتیجہ شرط کے وقت معلوم ہوتا ہے۔ 3. ان ضوابط کے مطابق، جب گاہک (معاہدہ کا شراکت دار) اور شرط لیکنگ کمپنی کے درمیان معاملات پر اختلافات ہوتے ہیں جو معاہدہ کی نافذی اور انتظام سے متعلق ہوتے ہیں، معاہدہ جسے گاہک (معاہدہ کا شراکت دار) اور شرط لیکنگ کمپنی کے درمیان معاہدہ کو غیر معین یا غیر معتبر قرار دینے کے معاملات پر، انضباطی اور نفاذی امور میں، موجودہ قواعد کے مطابق، طریقہ کار کی مداخلت کریں ، جیتنے کی توقعات، دوسری اہم شرائط کی طرف بھی جیتنے کے موقعوں کے انضباطی اور نفاذی امور میں، اور معاہدہ کی تسلیم کو غیر معین یا غیر معتبر قرار دینے کے علاوہ، اندراج کی جانے والی دعویٰ کے حل کے لئے ایک لازمی دعویٰ کی پیشگوئی کی پیشگوئی (پیش کشی سے پہلے کا طریقہ کار) 4. پیش کشی اختلاف کے حل کے طریقہ کار کے حصہ کے طور پر، جو طرف یقین رکھتا ہے کہ اس کے حقوق کو خراب کیا گیا ہے وہ دوسری طرف کو متعلقہ لکھی دعویٰ کا ارسال کرنے کا فرض ہے۔ اگر دعویٰ کے موصول کا موصول ایک بیٹنگ کمپنی ہو تو، دعویٰ کمپنی کے مقام (قانونی پتا) پر کیا جائے گا جو متعلقہ بیٹنگ کمپنی کے متعلقہ ضابطین کے نامکمل دستاویزات میں بیان شدہ ہوں اور قانونی اکاؤنٹ کے رجسٹر کے مطابق تصدیق کی جاتی ہے۔ اگر دعویٰ کے موصول کا موصول کمپنی ہو تو، دعویٰ کو ان کے رہائش کی جگہ (یا رہائش کی جگہ) پر کیا جائے گا۔ تمام مقدمہ بھی ای میل کے ذریعے مکمل کیے جا سکتے ہیں: support@valor.bet 5. دعویٰ کو اس دن کے اندر پیش کیا جائے گا جب شخص کو اپنے حقوق کی خلاف ورزی کی معلومات حاصل کی گئی ہو یا حاصل کی جانی چاہیے۔ دعویٰ کو دستاویزات کے ساتھ پیش کیا جائے گا جو بیان کریں اور دعویٰ کو جستجو کریں۔ اگر دعویٰ میں درست کافی دعویٰ نہ ہو، تو دعویٰ کو مزید غور کے بغیر واپس بھیجا جائے گا۔ 6. درست دعویٰ کو معاملہ کی مدت 20 (بیس) دنوں کے درمیان سے زیادہ نہیں کیا جائے گا اس کی موصول کی تاریخ کو دعویٰ کو ملنے والی طرف سے۔ 7. اگر مقررہ مدت میں وصول کرنے والی طرف دعویٰ کا مدعی اندراج نہیں کیا جاتا ہے، تو جو طرف یقین رکھتا ہے کہ اس کے حقوق کو خراب کیا گیا ہے وہ کمپنی کے مقام (قانونی پتا) پر قانونی ادائیگی کے عدالت کو رجوع کرنے کا حق رکھتا ہے۔ 8. کمپنی شرطوں کی قبولیت اور جیت کی ادائیگی معطل کرنے کا حق محفوظ رکھتی ہے (جس میں انکار، باطل قرار دینا، ان شرطوں کی ادائیگی "1" کے ساتھ شامل ہے): غیر متوقع غلطیوں کی صورت میں (پیش کردہ ایونٹس کی فہرست میں واضح ٹائپوز، لائن میں اور شرطوں کی شرح میں عدم مطابقت)؛ اگر مقابلے کے فارمیٹ میں اصل قوانین کی نسبت تبدیلی ہو وغیرہ؛ اگر غیر کھیلوں کی کشتی کے شواہد ہوں؛ جب ایک ہی نتائج یا انحصاری نتائج پر دوبارہ شرطیں استعمال کی جائیں۔</p><h2>شرطوں کو قبول کرنے اور تنازعات کو حل کرنے کے قواعد (پری ٹرائل کا طریقہ کار) </h2><p class="mb-5">براہ کرم وصول کرنے والے اکاؤنٹ کے مالک کے مکمل نام اور خاندانی نام درج کریں جس سے پیسے بھیجے جائیں گے۔ رقبے نکالنے کے لیے دوسرے لوگوں کی ذاتی معلومات کا استعمال نہ کریں۔</p><h2>پاس ورڈ اور اکاؤنٹ کی سلامتی</h2><p class="mb-5">ویلر کیسینو کمپنی ایک قسم کے بونسات پیش کرتی ہے - "پرومو کوڈ"۔ پرومو کوڈ ایک الفاظی کوڈ ہے جو بیٹنگ کمپنی کی اپنی مرضی کے مطابق ایک شخصیت کو فراہم کیا جاتا ہے۔ پرومو کوڈ کلائنٹ کو بونس فنڈز تک رسائی فراہم کر سکتا ہے یا انشورنس / بیٹ واپسی فراہم کر سکتا ہے۔ پرومو کوڈ کے ساتھ شرط 1 کے ساتھ شرطوں کے ساتھ بیٹ حساب کی صورت میں۔ دوسری مرتبہ پرومو کوڈ کا استعمال کرنے کی سہولت برقرار رہتی ہے۔ پرومو کوڈ کی بیٹوں کو دوسری خصوصی پیشکشوں کے ساتھ ملا کر نہیں کیا جا سکتا ہے، مگر اگر پرومو کوڈ رکن کی رولز میں ذکر کیا گیا ہو۔ ملٹی اکاؤنٹ اس پروموشن میں شرکت نہیں کرتے ہیں۔ بونس صرف ایک بار ایک اکاؤنٹ، پتہ، ای میل ایڈریس، کریڈٹ / ڈیبٹ کارڈ نمبر یا آئی پی ایڈریس پر صرف ایک مرتبہ دیا جا سکتا ہے۔ کمپنی کو اگر امن سروس کو کوئی قوانین کی خلاف ورزی کے بارے میں شکوئیت ہو یا عجیب بیٹس چین کی تلاش ہو تو کسی بھی مفت بیٹس کو روک سکتی ہے۔ پرومو کوڈ ایک مشتری کے دوسری بار صرف ایک بار کا استعمال کیا جا سکتا ہے۔</p><h2>پروموشنز اور بونس</h2><p class="mb-5">1 بونس کی پیشکش ویلر کیسینو کے نئے صارفین کے لیے دستیاب ہے۔ بونس کی پیشکش مندرجہ ذیل کرنسیوں کے لیے دستیاب ہے: یورو، یو ایس ڈی، آر یو بی، بیلاروسیائی روبل، یوکرین روپیہ، کازاک روپیہ، بھارتی روپیہ، انڈونیشیائی روپیہ، تھائی بات، ویتنامی ڈانگ، ٹرکش لیرا، پولش زلوٹی، بنگلہ دیش ٹاکا، کمبوڈین ریل، ساؤتھ کورین وون، ملیشیائی رنگیٹ، برونئی ڈالر، سنگاپور ڈالر، پاکستانی روپیہ، ازبک روپیہ، کینیائن شلنگ، یوگنڈا شلنگ، گھانا شلنگ، ٹنزانیائی شلنگ، افریقی فرانک، نائجیریائی نائرا، سی ایف اے، ایکس او ایف، آذربائیجان منات، ایرانی ریال، چیک کرونا، برازیلی رئیس، فلپائین پیسو، آرمینیائی ڈرم، جارجئیائی لاری، روانڈا فرانک، مالدووین لئو، قرقیزستانی سوم، تاجکستانی سوم، نارویجن کرون،</p><p class="mb-5">10 صرف پہلا جمع کرانے کا حق بونس کے لیے حاصل ہوتا ہے۔ بونس فنڈز اور فری اسپنس پروموشنل جمع کرانے کے لمحہ سے 72 گھنٹوں کے اندر بونس بیلنس میں شامل کیے جائیں گے۔</p><p class="mb-5">11 بونس "کھیل": بونس فنڈز کو کامیابی کے ساتھ حقیقی رقموں میں تبدیل کرنے اور انہیں کھیل اکاؤنٹ سے واپس نکالنے کے لیے، پہلے جمع کرانے کے بعد 30 دن میں مندرجہ ذیل شرائط کو پورا کرنا ضروری ہے: "ایکیومیولیٹر" بیٹس کا استعمال کرتے ہوئے بونس اکاؤنٹ سے 5 گنا رقم کو وصول کریں۔ کم از کم 3 واقعات میں اکیومیولیٹر میں کم از کم 1.40 کے ضریب کے ہونے چاہیے، اکیومیولیٹر میں واقعات کی زیادہ تر تعداد لامحدود ہوتی ہے۔ اگر کھلاڑی مخصوص مدت میں پروموشن کی شرائط کو پورا نہیں کر پاتا ہے، تو بونس بیلنس منسوخ کر دیا جاتا ہے۔</p><p class="mb-5">12 بونس "کیسینو": بونس فنڈز کو حقیقی میں تبدیل کرنے اور انہیں کھیل کے اکاؤنٹ سے نکالنے کے لیے، آپ کو ملنے والے بونس کی رقم کو "کیسینو" کے "لائیو-گیمز" اور "ورچوئل اسپورٹس" سیکشنز میں x60 ضرب دینا ہوگا، پہلے ڈپازٹ کرنے کے 72 گھنٹوں کے اندر۔ براہ کرم نوٹ کریں کہ تمام گیمز میں شرط کی رقم کو بونس کو داؤ پر لگانے کے وقت مکمل طور پر شمار نہیں کیا جاتا۔</p><p class="mb-5">14 اگر کھلاڑی کے پاس حقیقی اور بونس بیلنس دونوں میں فنڈ ہیں، تو تمام بیٹس پہلے حقیقی بیلنس سے ہوتے ہیں۔ حقیقی فنڈز بیٹس کے لیے استعمال ہوتے ہیں جب تک حقیقی بیلنس صفر نہ ہوجائے۔ بونس بیلنس کے فنڈ صرف اس صورت بیٹس کے لیے استعمال کیے جائیں گے اگر حقیقی بیلنس صفر ہو۔ بونس بیلنس کھیل کی لسٹ کو جانچیں جو ضوابط و شرائط کے حصے پروموشن اور بونس میں دستیاب ہے۔</p><p class="mb-5">15 تمام شرائط پوری نہیں ہونے سے کوئی نکاسی نہیں کی جا سکتی۔ جب بونس فنڈز کی ویجرنگ میں لسٹ 10 اور 11 میں ذکر شرائط کو پورا نہ کرنے والی بیٹس لی جاتی ہیں تو وہ شرائط کو مطمئن کرنے کے لیے شمار نہیں کی جاتیں۔</p><p class="mb-5">16 30 دن (کھیل) اور 72 گھنٹے (کیسینو) کے بونس پیشکش کے فعال ہونے کے بعد کی گئی بیٹس کو حساب میں لیا نہیں جاتا۔</p><p class="mb-5">17 جب تک کم از کم ایک کھولا بونس اکاؤنٹ ہو، کھلاڑی کم از کم دو گنا بونس کی قیمت بقیہ ہو تو کل ویجر کردہ جمعی رقم کو صفر یا اس سے زیادہ منتقل کر سکتا ہے، اگر کم از کم دو گنا بونس کی قیمت گیم بیلنس پر بچے۔ کامیاب نکاسی کو وصول کرنا نکاسی درخواست کی حالت "مکمل" میں منتقل ہونے کے لیے سمجھا جاتا ہے۔ اس بنیاد پر قوانین کے اس شرط کی خلاف ورزی میں فنڈ کی نکاسی کو کھیلنے والے کی بونس سے انکار کیا جائے گا، اس صورت میں بونس بیلنس منسوخ کر دیا جائے گا۔ یہ قاعدہ بونس اکاؤنٹ کے بنائیں جاتے ہیں جب تک بونس کی رقم کھیل اکاؤنٹ پر ظاہر نہ ہو۔</p><p class="mb-5">18 بونس کی پیشکش صرف ایک بار استعمال کی جا سکتی ہے۔ رجسٹریشن کے دوران بونس منتخب کرتے وقت ہوشیار رہیں۔ اگر آپ کسی ایک اختیارات (براہ راست یا کیسینو) میں سے کوئی ایک منتخب کرتے ہیں، تو آپ خود بخود دوسرے کا استعمال کرنے سے انکار کر دیتے ہیں۔ آپ اپنی موافقت کو مستقبل میں تبدیل نہیں کر سکتے۔</p><p class="mb-5">19 رجسٹریشن کے دوران بونس کو فعال کرنے سے، گاہک خود بخود اس پروموشن کی ضوابط اور شرائط کے ساتھ متفق ہوتا ہے</p><p class="mb-5">20 بونس پروموشن میں شرکت سے انکار کی امکان صرف اس وقت دستیاب ہے جب پہلی جمع کرانے کے دوران بونس پیشکش فعال ہو یا ویجر کی شرائط کو پورا نہ کیا جاتا ہو۔</p><p class="mb-5">21 بونس فنڈز سے انکار کی ممکنہ صلاحیت صرف رجسٹریشن کے مرحلہ پر موجود ہے، بونس پیشکش کو فعال کرنے پر یا ویجر کی شرائط کے عدم مطابقت پر۔</p><p class="mb-5">22 بونس صرف ایک کھیل اکاؤنٹ فی شخص، خاندان، فلیٹ، کمپیوٹر یا آئی پی ایڈریس کے لیے دستیاب ہے۔ اگر آپ کو متعدد رجسٹریشنوں کے ذریعہ قوانین کی خلاف ورزی کا شکار ہونے کا شک ہو، تو بی سی ویلر کیسینو بونس منسوخ کر دے گی۔ اگر آپ دوسرا اکاؤنٹ رجسٹر کرتے ہیں، تو وہ حذف کر دیا جائے گا، اور تمام کھیل بونس اور جیت ممکن ہے کہ منسوخ کر دی جائے گی۔</p><p class="mb-5">23 اگر کھیل کے اکاؤنٹ کی تصدیق کے دوران کھیل کی ایمانداری میں کوئی خلاف ورزیاں یا ان کی مسلسلی کا استعمال (جو بھی اس کی رائے ہو) شناخت ہوتی ہوں، تو کمپنی کو بونس کو منسوخ کرنے اور / یا گرا دینے کی منظوری دینے کا حق محفوظ ہے بغیر کسی وجہ کے۔ بونس فنڈز کی نکاسی کو کسی بھی وقت کلائنٹ کو پہلے سے اطلاع دیے بغیر ممکن ہے، لیکن اس بونس کی تقسیم یا ویجر کرنے کے بعد نہیں۔ تنازعاتی صورتحال میں، کمپنی کے متعین افسران کا فیصلہ حتمی ہوتا ہے۔</p><p class="mb-5">24 کمپنی کو کھیل اکاؤنٹ کے مالک کی تصدیق کے طریقے کار کرنے کا حق محفوظ ہے، اس کے علاوہ، تصدیق کے دوران کھیل اکاؤنٹ پر بونس فنڈز کی وصولی کو معطل کرنے کا حق۔</p><p class="mb-5">25 اگر کمپنی کے افسر ایک گاہک کو دھوکہ دہی کی شک کا شکار سمجھتے ہیں، تو «BC ویلرکیسینو» کو موصولہ بونس کی ویجرنگ کے لیے ان فردوں کے لیے انفرادی شرائط عائد کرنے کا حق ہوتا ہے۔</p><p class="mb-5">26 موجودہ شرائط اور ضوابط کسی بھی وقت تبدیل اور اپ ڈیٹ کی جا سکتی ہیں۔</p><p class="mb-5">3 عام بونس کا حجم ایڈائیت کے رقم کا 100 فیصد ہوتا ہے۔ مثال کے طور پر، گاہک این نے رجسٹریشن کے دن بعد اپنے اکاؤنٹ میں 100 ڈالر کی جمع کرائی۔ بونس کی رقم 100 فیصد یعنی 100 ڈالر ہوگی۔</p><h2>بونس اکاؤنٹس</h2><p class="mb-5">ویجرنگ شرائط - مطلب ہوتا ہے کہ آپ کو بونس اور کسی بھی حاصل کردہ جیت کو اپنے کیش بیلنس میں منتقل کرنے اور واپس لینے سے پہلے کتنی مقدار کی شرائط لاگو ہونگی۔ ویجرنگ کوئفیشنٹ - مطلب ہوتا ہے کہ وہ کوئفیشنٹ جو مندرجہ ذیل طریقے سے حساب کیا جاتا ہے: لگانے کے لئے شرائط/نامزد بونس کی مقدار۔ کھیل کا شراکت - مطلب ہوتا ہے کہ کھیل کے اندر شرطوں کی ضربی کی فی صد۔ مثال آپ کو €100 کا بونس مل گیا ہے جس کا ویجرنگ کوئفیشنٹ x30 ہے۔ بونس بیلنس کو کیش بیلنس میں منتقل کرنے کے لئے، آپ کو €3000 کی شرائط لگانی ہوں گی (100*30)۔ €3 000 آپ کی ویجرنگ شرطات ہیں۔ اگر آپ کو 100% شراکت والا کھیل منتخب کریں، تو ویجرنگ شرطات کا حساب ذیل ہوگا: (€100*30)*100%= €3 000۔ اگر آپ کو 10% شراکت والا کھیل منتخب کریں، تو ویجرنگ شرطات کا حساب ذیل ہوگا: (€100*30)*10%= €30 000۔  https://Valor.Bet پر مندرجہ ذیل کھیل کی شراکت لاگو ہوتی ہے: کیسینو اسلات (ویڈیو پوکر کے علاوہ) – 100% پوکر، ویڈیو پوکر، رولیٹ، بکاراٹ، بلیک جیک، ٹیبل کھیلیں، قرعہ اندازی، سکریچ کارڈ، بنگو، کینو – 0% لائیو کیسینو تمام زمرے – 0% لائیو-کھیل / ٹی وی-کھیل تمام زمرے – 10% ورچوئل اسپورٹ تمام زمرے – 10% ایویاٹر – 0% </p><h2>کھیل کا ویجرنگ شراکت</h2><p class="mb-5">1. شرط لگانے والی کمپنی مختلف وجہات کے بنیاد پر شرطیں قبول کرتی ہے۔ 2. ایک ہی کھلاڑی سے ایک نتیجہ یا نتائج کے مجموعے پر بار بار بیٹس کی مصدقہ کمپنی کی فیصلہ سازی سے محدود ہوسکتی ہے۔ 3. شرط سرور پر اس کی رجسٹری اور آن لائن تصدیق کے بعد قبول کی جانے والی شرط سمجھی جاتی ہے۔ رجسٹرڈ شرطیں منسوخی یا ترمیم کے لئے نہیں ہیں۔4. شرطیں صرف ایک رقم میں قبول ہوتی ہیں جو موجودہ بیلنس سے زائد نہیں ہوتی ہے۔ شرط رجسٹر ہونے کے بعد، اس کی رقم اکاؤنٹ سے کٹ جاتی ہے۔ ہر دو حصے کے حساب کتاب کے بعد، کھلاڑی کے اکاؤنٹ میں بالغ کی رقم شامل ہوجاتی ہے۔5. مقابلے کی شروعات سے پہلے شرطیں قبول ہوتی ہیں۔ روز, شروع کا وقت اور مقابلے کو سامنے آنے والی سب سے اہم حقائق دیکھتے ہوئے، لائن میں ظاہر کیا گیا ہوتا ہے اگر کسی بھی وجہ سے، شرط شروع کے بعد مقابلہ میں شرط لگائی گئی، تو اسے غیر جائز سمجھا جاتا ہے۔ صرف میچ کے دوران لائو شرطوں پر استثنہات ہوتے ہیں۔ ایسی شرطیں مقابلے کے اختتام تک قابل ذکر ہیں۔6.  رقم کی بنیاد پہ KM درج کریں یا حذف کرنے کا احقاق خاص حالات میں QAYAD میں موجود ہے۔کم از کم برہبے ہیں چاہے RUB کی شرط ہیں۔۔۔TRY 1 / KZT 100/ UAH - 5 ہو۔ 2. کسی بھی واقعہ کے لئے زیادہ سے زیادہ شرطیں کمپنی کی جانب سے مخصوص کی جاتی ہیں۔ زیادہ سے زیادہ شرط کھیل اور واقعہ پر منحصر ہوتی ہے۔ 3. ایک شرط پر زیادہ سے زیادہ جیت 2,000,000 روبل (مختلف کرنسیوں کے مساوی) ہے۔ 4. بیٹنگ کمپنی کو یہ حق حاصل ہے کہ وہ علیحدہ ایونٹس کے لیے زیادہ سے زیادہ شرح، اوڈز کو محدود کرے، اور بغیر کسی نوٹس یا وضاحت کے کسی علیحدہ کلائنٹ کے لیے زیادہ سے زیادہ شرح، اوڈز کو محدود یا بڑھا دے۔ منسوخی کی پالیسی۔ 1. اگر شرط منسوخی کے تابع ہے، تو واپسی ایک ہی شرح میں کی جاتی ہے۔ جب ایکومیولیٹرز اور سسٹمز میں کسی ایک یا کئی ایونٹس کی شرط کو منسوخ کیا جاتا ہے، تو ان ایونٹس کے لیے جیت کی حساب کتاب نہیں کی جاتی۔ 2. غلط حساب شدہ شرحوں کی صورت میں، ایسی شرطوں کا دوبارہ حساب کیا جاتا ہے۔</p><h2>شرطیں قبول کرنے کے لئے قواعد</h2><p class="mb-5">بیٹنگ کمپنی مندرجہ ذیل اقسام کی شراکتوں کی پیشکش کرتی ہے: 1. سنگل بیٹ - یہ الگ واقعہ کے نتیجے پر شراکت ہے۔ ایک سنگل بیٹ کا جیتنا بیٹ رقم کو اس واقعہ کے لئے قائم کردہ غیر معمولی سے ضرب کے برابر ہوتا ہے۔ 2. اکمیولیٹرز - یہ کئی آزاد واقعات کے نتائج پر شراکت ہے۔ اکمیولیٹر کی فتح بیٹ رقم کو تمام نتائج کے ضرب کے برابر ہوتی ہے جو اکمیولیٹر میں شامل ہوتے ہیں۔ اکمیولیٹرز کے کسی ایک نتیجے کا ناکام ہونا مطلب ہے کہ پورے اکمیولیٹر کو نقصان ہوگا۔ 3. سسٹم - یہ ایک پر منتخب تعداد کے واقعات سے مکمل مخصوص سائز اکمیولیٹر کی شراکت ہے۔ سسٹم میں اختیارات کی زیادہ سے زیادہ تعداد 924 ہے۔ سسٹم میں واقعات کی زیادہ سے زیادہ تعداد 12 ہے۔ میچ کے دوران شراکتیں قبول ہوتی ہیں (لائیو بیٹس) 1. میچ کے مرکزی اور اضافی نتائج پر لائیو شراکتیں قبول ہوتی ہیں۔ ایک سنگل لائیو بیٹ کیسی بھی اکمیولیٹر میں جمع کی جا سکتی ہے۔ 2. بیٹ کو سرور پر اس کی رجسٹریشن کے بعد قبول کیا جاتا ہے اور پھر آن لائن تصدیق کا اعلان کیا جاتا ہے۔ قبول شدہ بیٹ میں کوئی تبدیلی نہیں ہوتی۔ جیسے کہ میچ کے نتائج کے شعبے میں مخصوص صورتحال میں، اس کی شروطات کی وقوع کے معاملے کے طریقہ کار 3. مخصوص شرائط میں، سسٹم "کے "کے قواعد میں واضح مواقع پر لائیو بیٹ کا کوئی ضریبہ حساب کیا جا سکتا ہے۔ 4. بیٹنگ کمپنی میچوں کے موجودہ نتائج میں نا قابل یقینیوں کے لئے ذمہ دار نہیں ہے، جن پر لائیو بیٹس قبول کی جاتی ہیں۔ صارفین کو بھی دوسری آزاد معلومات کے مستقل استعمال کرنا چاہئے۔ 5. لائیو بیٹس کو ترمیم یا حذف نہیں کیا جا سکتا۔</p><h2>شراکتوں کی اقسام</h2><p class="mb-5">1. ایک مربوط نتیجہ کو اکمیولیٹر بیٹ میں شامل کرنا اجازت دی جاتی ہے۔ معمول کے وقت میں ایک اکمیولیٹر یا سسٹم بیٹ میں دو یا اس سے زیادہ مربوط واقعات شامل کیے گئے ہیں، تمام واقعات کو کم اعلیت والے اعداد سے یہ اکمیولیٹر یا سسٹم بیٹ سے خارج کیا جاتا ہے۔ 2. “ٹیم کو پینالٹی مارنے کی اجازت ہے/نہیں” شراکتوں کو اس صورت ہارا ہونے کے طور پر سمجھا جاتا ہے اگر عام وقت میں کوئی پینالٹی کیکس نہیں ہوئیں۔ 3. “اگلا گول”, "گول کیسے بنایا جائے گا" شراکتوں کو اس صورت ہارا ہونے کے طور پر سمجھا جاتا ہے اگر وہ گول جس کی تعداد بیٹ سلپ میں ظاہر کی گئی تھی، نہیں بنایا گیا۔</p><h2>کچھ واقعات کے نتائج میں شاملی کے لئے پابندیاں</h2><p class="mb-5">1. آپ کو اپنے اکاؤنٹ میں فنڈ جمع کرنے اور واپس نکالنے کے مختلف طریقوں سے ممکن ہے۔ فنڈ جمع کرنے اور واپس نکالنے کے تمام طریقے "جمع" صفحے پر دیے گئے ہیں۔</p><p class="mb-5">• ادائیگی کے نظاموں کے درمیان رقوم کو منتقل کرنے کے لئے؛</p><p class="mb-5">• بغیر شراکت لگائے فنڈ جمع کرنے اور واپس نکالنے کے لئے۔</p><p class="mb-5">ان معاملات میں، رقوم آپ کے اکاؤنٹ میں واپس بھیج دی جائے گی۔</p><p class="mb-5">فنڈ کی واپسی صرف ان معیاروں کے لئے ممکن ہے جن کے تحت جمع کی گئی ہو۔ مختلف طریقوں سے جمع کرنے کے وقت، واپسی جمع کی رقم کو جمع کرنے کی رقم کے متناسب ہونی چاہئے۔</p><p class="mb-5">ویلر کیسینو کو اس کا حق ہے کہ واپسی کی ادائیگی سے انکار کریں اور بینک ٹرانسفر کی بجائے اس کی پیش کش کریں۔</p><p class="mb-5">توجہ دیں! انتظامیہ کو تجویز کی جاتی ہے کہ اکاؤنٹ کو کسی اور کے الیکٹرانک والٹ سے جمع نہ کریں۔ انتظامیہ کو کسی بھی پیشگوئی کے بغیر رقوم واپس کرنے کا حق ہے۔</p><p class="mb-5">خصوصی صورتحالوں میں، کچھ گیمنگ کی اکاؤنٹوں کے صارفین کے لئے ادائیگی کے نظاموں کی کمیشن کی تلافی، جو عموماً ویلر کیسینو بیٹنگ کمپنی دواتی ہے، منسوخ کر دی جا سکتی ہے۔</p><p class="mb-5">7. 1-کلک فوری جمع کرنے کی خدمات کی شرائط و ضوابط</p><p class="mb-5">• آپ تمام خدمات اور/یا مال یا دیگر اضافی خدمات کے لئے ادا کرنے کے لئے راضی ہوتے ہیں جو آپ نے ویب سائٹ پر آرڈر کیا ہو، اس کے علاوہ تمام اضافی لاگتوں (اگر ضرورت ہو)، جیسے کہ ٹیکس، ڈیوٹیز، وغیرہ، کی ادائیگی کے لئے، آپ کو پوری طرح ذمہ داری ہے۔ آپ تمام ادائیگیوں کی وقت پر ادائیگی کے لئے مکمل ذمہ دار ہیں۔ ادائیگی کی سروس فراہم کنندہ صرف ویب سائٹ کی طرف سے ظاہر کی گئی رقم کی ادائیگی کی ضمانت دیتا ہے اور اوپر ذکر کی گئی اضافی رقوم کی ویب سائٹ صارف کی ادائیگی کے لئے ذمہ دار نہیں ہے۔ "1 کلک کے ساتھ جمع" بٹن پر کلک کرنے کے بعد، آپ اس بات کے ساتھ راضی ہیں کہ ادائیگی کا عمل پورا ہوگیا ہے اور یہ بے رجوعی طور پر انجام دیا گیا ہے۔ "1 کلک کے ساتھ جمع" بٹن پر کلک کرکے، آپ راضی ہوتے ہیں کہ آپ اس ادائیگی کو واپس نہیں کر سکیں گے یا اس کی واپسی کی درخواست نہیں کر سکتے۔ ویب سائٹ پر آرڈر دینے کے ذریعہ، آپ تصدیق اور ظاہر کرتے ہیں کہ آپ آرڈر دینے اور ادائیگی کرنے کے ملک کے قوانین کی خلاف ورزی نہیں کر رہے ہیں۔ علاوہ ازیں، ان قواعد (اور/یا شرائط و ضوابط) کی شرائط قبول کرکے، آپ بطور ادائیگی کارڈ کے مالک، تصدیق دیتے ہیں کہ آپ کو ویب سائٹ پر فراہم کی جانے والی سامان اور/یا خدمات کا استعمال کرنے کا حق ہے۔</p><p class="mb-5">• اگر آپ ویب سائٹ کی خدمات کا استعمال کرتے ہیں جو ایک گیمنگ خدمت فراہم کرتی ہیں، تو آپ قانونی طور پر باندھنی تصدیق فراہم کرتے ہیں کہ آپ نے ان قانونی عمر کو حاصل کرلیا ہے یا پہلے ہی سے زیادہ عمر، جو آپ کے حکومتی اختیار کی حیثیت حاصل کرتی ہے، تاکہ آپ ویب سائٹ کی فراہم کردہ خدمات کا استعمال کریں۔</p><p class="mb-5">2. تمام فنڈ کی واپسی کی درخواستیں 24/7 پر عمل میں لائی جاتی ہیں۔ واپسی کی منسوخی تک 72 گھنٹے لگ سکتے ہیں۔ واپسی کو منسوخ کرنے کی درخواستیں 72 گھنٹے لگ سکتے ہیں۔</p><p class="mb-5">• ویب سائٹ کی خدمات کا استعمال شروع کرنے سے، آپ کو اس خدمت کے استعمال کے کسی بھی ملک کے قوانین کا احترام کرنے کی قانونی ذمہ داری ہوتی ہے، اور آپ تصدیق دیتے ہیں کہ ادائیگی کی سروس فراہم کنندہ کسی قانونی یا غیر قانونی خلاف ورزی کی کوئی ذمہ داری نہیں لیتا۔ ویب سائٹ کی خدمات کا استعمال کے اتفاق سے، آپ سمجھتے ہیں اور قبول کرتے ہیں کہ آپ کی کسی بھی ادائیگی کی کوئی پراسیسگ کاری، ادائیگی کر دی گئی خدمات اور/یا مال کو واپس نہیں کرنے کا قانونی حق نہیں ہے یا دی گئی ہوں یا دوسرے ادائیگی کینسلیشن اختیارات نہیں ہیں۔ اگر آپ اگلی خدمت اور/یا مال کی خریداری کے لئے خدمت کو منسوخ کرنا چاہتے ہیں، تو آپ ویب سائٹ پر شخصی اکاؤنٹ کا استعمال کرکے خدمت کو منسوخ کر سکتے ہیں۔</p><p class="mb-5">• ادائیگی کی سروس فراہم کنندہ آپ کے ادائیگی کارڈ سے منسلک ڈیٹا کی عدم قبولیت/ناقابلیت، یا آپ کے ادائیگی کارڈ کا استعمال کرکے ادائیگی کرنے کے اجازت حاصل کرنے کے لئے جاری بینک سے اجازت حاصل کرنے کی عدم قبولیت کے ساتھ منسلک انکار کے لئے ذمہ دار نہیں ہے۔ ادائیگی کی سروس فراہم کنندہ کسی بھی خدمت اور/یا مال کی معیار، حجم، قیمت کے لئے ذمہ دار نہیں ہے جو آپ کو ویب سائٹ پر فراہم کی گئی ہیں یا آپ نے اپنے ادائیگی کارڈ کا استعمال کرکے خریدا ہو۔ ویب سائٹ کی کسی بھی خدمت اور/یا مصنوعات کی ادائیگی کے لئے، آپ کو سب سے پہلے ویب سائٹ کے استعمال کے قواعد کا پیروی کرنے کا فرض ہوتا ہے۔ براہ کرم نوٹ کریں کہ صرف آپ، ادائیگی کارڈ کے مالک کے طور پر، آپ کو وقت پر کسی بھی خدمت اور/یا مصنوعات کی ادائیگی کے لئے ذمہ دار ہیں جو آپ نے ویب سائٹ کے ذریعہ آرڈر کی ہو اور اس ادائیگی سے متعلق تمام اضافی لاگتوں/کمیشنز کے لئے۔ ادائیگی کی سروس فراہم کنندہ صرف ویب سائٹ کی طرف سے ظاہر کی گئی رقم کے مطابق ایک ادائیگی اجراء کرنے والا ہے اور کسی بھی قیمت، کل قیمتوں اور/یا کل رقموں کے لئے ذمہ دار نہیں ہے۔</p><p class="mb-5">• آپ کے اس موقع سے متعلق حالت میں جو آپ کو منفی شرائط سے اور/یا دیگر وجوہات سے متعلق ہے، ہم آپ سے درخواست کرتے ہیں کہ آپ وقت پر ادائیگی کرنے سے انکار کریں اور، اگر ضرورت ہو، ویب سائٹ کے انتظامیہ/سپورٹ سے براہ راست رابطہ کریں۔</p><p class="mb-5">3. ڈپازٹ کرتے وقت آپ اس بات کی تصدیق کرتے ہیں کہ آپ اس ویب سائٹ کے ذریعے پیش کی جانے والی خدمات اور ویب سائٹ کی خدمات استعمال کرنے کے مجاز ہیں۔ اگر آپ مخصوص خدمات پیش کرنے والی ویب سائٹ کے ذریعے خدمات استعمال کرتے ہیں۔</p><p class="mb-5">4. اگر آپ کو واپسی کی درخواست کرنی ہو تو آپ کو سپورٹ ٹیم سے رابطہ کرنا چاہئے۔ ہم واپسی صرف اس اکاؤنٹ میں کر سکتے ہیں جسے آپ نے اپنے اکاؤنٹ کو دوبارہ بھرنے کے لئے استعمال کیا ہے۔ شناختی اسٹیپ کی پروسیجر ممکن ہوسکتی ہے۔ اس صورت میں، آپ سے پاسپورٹ یا شناختی کارڈ کا کاپی فراہم کرنے کا مطالبہ کیا جا سکتا ہے۔ علاوہ ازیں، اگر آپ نے بینک کارڈ کا استعمال کرکے اکاؤنٹ میں جمع کروایا ہو تو آپ کو کارڈ کی تصویر فراہم کرنی ہوگی (دونوں طرف)۔ کارڈ نمبر کی پہلی چھ ہندسوں اور آخری چار ہندسوں کو، کارڈ کے حامل کے نام کو دکھایا جانا چاہئے، CVV2 کوڈ کو بہار لکھا جانا چاہئے۔</p><p class="mb-5">ہمیں اختیار ہے کہ وہ فنڈز کی واپسی کیلئے ایک فیس وصول کریں جو کہ ہمارے خود کے اخراجات کے موازنے کرتی ہے جو شرطوں کے مطابق شراطی شرائط یا کھیلوں میں استعمال نہیں کیے گئے ہوں۔</p><p class="mb-5">5. ویلر کیسینو کی سیکیورٹی سروس کا حق ہے:</p><p class="mb-5">• کسی بھی دستیاب طریقوں کے ساتھ فنڈز کی واپسی مسدود کرنا، اگر شراطوں کے مطابق رجسٹریشن کے لمحے سے شراطوں کے مقدار سے کم میں شراطی رقم ہو۔ علاوہ ازیں، شراطی نسبت کی مقدار 1.3 یا اس سے زیادہ کونیفیشن کے ساتھ شامل کی جاتی ہے۔</p><p class="mb-5">• اگر شراطی اکاؤنٹ کو کھیلنے کے مقصد کے لئے استعمال نہیں کیا گیا ہو تو فنڈز کی واپسی سے انکار کرنا؛ فنڈز کی واپسی سے پہلے آپ کے کھیلنے کا اکاؤنٹ تصدیق کرنا ضروری ہے۔ تصدیق کے لئے درست پروفائل بھرنا، شناختی دستاویزوں (پاسپورٹ شامل) کی کاپیوں اور تصویریں فراہم کرنا، اور سپورٹ سروس کے سوالات کا جواب دینا ضروری ہے۔</p><p class="mb-5">6. ویلر کیسینو کی سیکیورٹی سروس کی مشورہ دادی نہیں کرتی:</p><p class="mb-5">ممنوعہ علاقوں کی فہرست: شمالی کوریا، میانمار، ایران</p><h2>فنڈ جمع اور واپسی</h2></div>
        `
    },
}

const policyContentFr = {
    'user-agreement': {
        title: "Accord de l'utilisateur",
        subtitle: "Télécharger la politique",
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
            <p class="mb-5">www.Valor.Bet s’engage à protéger vos informations personnelles. La présente Politique de Confidentialité explique quelles données nous collectons lorsque vous utilisez nos services, pourquoi nous les collectons et comment elles sont utilisées.</p>
            <p class="mb-5">Veuillez noter que cette Politique de Confidentialité constitue un accord entre vous et www.Valor.Bet (« Nous », « Notre », « Nos » selon le contexte). Elle fait partie intégrante des Conditions Générales d’Utilisation du site.</p>
            <p class="mb-5">Le site www.Valor.Bet (« le Casino », « le Site », « la Société », « Nous ») peut modifier cette politique à tout moment. Vous serez informé de toute mise à jour par la publication de la version révisée sur notre plateforme. Nous vous invitons à consulter régulièrement cette politique.</p>

            <h2 class="text-2xl font-bold leading-8">1. CONFIDENTIALITÉ</h2>
            <p class="mb-5">Les informations personnelles sont celles qui permettent d’identifier un individu, notamment : nom complet, date de naissance, adresse postale, e-mail, numéro de téléphone ou toute autre donnée pertinente (« Informations Personnelles »). Nous pouvons demander ces informations lors de votre inscription ou utilisation de nos services. Ces données sont stockées sur des serveurs sécurisés situés en Allemagne et dans d’autres pays selon les besoins. Nous collectons également des données techniques (adresse IP, date et heure, pages consultées, type de navigateur, rapports d’erreurs) afin d’assurer la qualité de nos services. Aucune information personnelle n’est collectée à votre insu.</p>

            <h2 class="text-2xl font-bold leading-8">2. INFORMATIONS COLLECTÉES</h2>
            <p class="mb-5">Nous pouvons collecter automatiquement certaines données comme mentionné ci-dessus et recevoir des informations personnelles que vous fournissez volontairement via nos services. Nous pouvons également obtenir des données auprès de fournisseurs tiers ou de listes clients acquises légalement. Des prestataires externes peuvent être engagés pour l’assistance technique, le traitement des transactions et la gestion des comptes. Ces informations seront utilisées uniquement conformément à la présente politique.</p>

            <h2 class="text-2xl font-bold leading-8">3. COLLECTE ET TRAITEMENT DES DONNÉES</h2>
            <p class="mb-5">Nous utilisons les informations personnelles pour fournir nos services, assurer le support client, vérifier l’identité et la sécurité, traiter les paiements et respecter nos obligations légales. Nous pouvons également partager certaines données avec des partenaires commerciaux de confiance sous réserve d’accords de confidentialité appropriés.</p>
            <p class="mb-5">Nous pouvons utiliser vos données pour : (1) vous envoyer des offres promotionnelles concernant nos produits et services ; et (2) vous informer des produits de nos partenaires afin d’améliorer nos offres. La participation à des enquêtes ou concours est volontaire, et les informations recueillies peuvent inclure votre nom, adresse, numéro de téléphone et données démographiques. En acceptant un prix, vous autorisez l’utilisation de votre nom à des fins publicitaires sauf interdiction légale.</p>

            <h2 class="text-2xl font-bold leading-8">4. UTILISATION DES INFORMATIONS</h2>
            <p class="mb-5">Nous pouvons divulguer vos informations personnelles si la loi l’exige, ou si nous estimons de bonne foi que cela est nécessaire pour : (1) se conformer à une procédure légale ; (2) protéger nos droits ou nos biens ; ou (3) assurer la sécurité de nos utilisateurs ou du public. En cas de fraude avérée, nous nous réservons le droit de partager vos informations (y compris votre identité) avec d’autres casinos en ligne, banques, opérateurs de cartes et autorités compétentes.</p>

            <h2 class="text-2xl font-bold leading-8">5. DÉSINSCRIPTION ET ACCÈS</h2>
            <p class="mb-5">Vous pouvez à tout moment vous désinscrire des communications promotionnelles via les paramètres de votre compte, en cliquant sur le lien de désinscription présent dans nos e-mails ou en contactant notre service client.</p>
            <p class="mb-5">Vous pouvez également nous contacter pour : (1) vérifier l’exactitude de vos données personnelles ; (2) les mettre à jour ; ou (3) déposer une plainte concernant leur utilisation. Nous traiterons votre demande conformément à la loi applicable.</p>

            <h2 class="text-2xl font-bold leading-8">6. COOKIES</h2>
            <p class="mb-5">Lors de votre navigation, nous utilisons des cookies – petits fichiers texte – pour enregistrer vos préférences et améliorer votre expérience. Nous utilisons également des « cookies Flash » (objets locaux partagés) à des fins similaires. Vous pouvez gérer vos préférences via les paramètres de votre navigateur.</p>

            <h2 class="text-2xl font-bold leading-8">7. TRAITEMENT DES PAIEMENTS</h2>
            <p class="mb-5">Pour effectuer des dépôts ou retraits en argent réel, nous faisons appel à des prestataires de services de paiement tiers. En acceptant cette politique, vous consentez au traitement et au transfert international de vos informations conformément aux normes de sécurité les plus élevées.</p>

            <h2 class="text-2xl font-bold leading-8">8. CONTRÔLES DE SÉCURITÉ</h2>
            <p class="mb-5">Nous nous réservons le droit d’effectuer des vérifications de sécurité pour valider vos informations ou détecter toute activité frauduleuse. Ces vérifications peuvent inclure des contrôles financiers ou des requêtes auprès de bases de données tierces. Vous acceptez de fournir tout document nécessaire à ces vérifications.</p>

            <h2 class="text-2xl font-bold leading-8">9. SÉCURITÉ</h2>
            <p class="mb-5">Toutes les données personnelles sont stockées sur des serveurs sécurisés protégés par chiffrement SSL 128 bits et pare-feu. Nous exigeons également de nos partenaires et prestataires qu’ils respectent les mêmes standards de sécurité.</p>

            <h2 class="text-2xl font-bold leading-8">10. PROTECTION DES MINEURS</h2>
            <p class="mb-5">Nos services sont strictement réservés aux personnes âgées d’au moins 18 ans (ou l’âge légal dans votre pays). Toute personne nous transmettant des données confirme avoir atteint cet âge. Les informations identifiées comme appartenant à un mineur seront immédiatement supprimées.</p>

            <h2 class="text-2xl font-bold leading-8">11. TRANSFERT INTERNATIONAL DES DONNÉES</h2>
            <p class="mb-5">Les informations collectées peuvent être stockées ou traitées dans tout pays où nous opérons. En utilisant nos services, vous consentez à ce transfert international et à la protection de vos données conformément à cette politique.</p>

            <h2 class="text-2xl font-bold leading-8">12. TIERS</h2>
            <p class="mb-5">Nous ne pouvons garantir la sécurité des informations fournies à des sites tiers liés à notre plateforme. Ces sites disposent de leurs propres politiques de confidentialité indépendantes de la nôtre.</p>

            <h2 class="text-2xl font-bold leading-8">13. LIMITATION DE RESPONSABILITÉ</h2>
            <p class="mb-5">Nos services sont fournis « tels quels » et « selon disponibilité ». Nous ne saurions être tenus responsables de tout dommage direct ou indirect résultant de l’utilisation de nos services ou de la divulgation d’informations personnelles, ni garantir un service exempt d’erreurs.</p>

            <h2 class="text-2xl font-bold leading-8">14. ACCEPTATION DE LA POLITIQUE DE CONFIDENTIALITÉ</h2>
            <p class="mb-5">En utilisant nos services, vous reconnaissez avoir lu et accepté cette politique. Elle remplace toute version antérieure. Toute utilisation continue après mise à jour vaut acceptation implicite. Conformément à l’article 77 du RGPD, vous disposez du droit de déposer une plainte auprès de l’autorité de contrôle de votre pays de résidence ou de travail.</p>

            <h2 class="text-2xl font-bold leading-8">15. AUTRES SITES</h2>
            <p class="mb-5">Notre site peut contenir des liens vers des sites tiers. Ces sites peuvent collecter des données conformément à leurs propres politiques de confidentialité. Nous déclinons toute responsabilité quant à leurs pratiques ou contenus.</p>
            </div>
        `
    },
    'responsible-gambling': {
        title: 'Jeu responsable',
        subtitle: 'Jouez en toute sécurité',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">Dernière mise à jour : 14.12.2022</p>
                <p class="mb-5">Veuillez lire attentivement ces informations pour votre propre bénéfice.</p>
                <p class="mb-5">Le site www.Valor.Bet est exploité par</p>

                <h2 class="text-2xl font-bold leading-8">Jeu responsable</h2>

                <ul class="list-disc list-inside space-y-3 mb-5">
                    <li class="text-gray-800 leading-relaxed">Compte désigne un compte unique créé pour vous afin d'accéder à notre service ou à certaines parties de celui-ci.</li>
                    <li class="text-gray-800 leading-relaxed">Société (désignée sous les termes « la Société », « nous » ou « notre » dans le présent accord) fait référence à Curacao Co.</li>
                    <li class="text-gray-800 leading-relaxed">Service fait référence au site web.</li>
                    <li class="text-gray-800 leading-relaxed">Site web fait référence à www.Valor.Bet.</li>
                    <li class="text-gray-800 leading-relaxed">Vous désigne la personne physique accédant au service ou l'utilisant, ou la société ou autre entité juridique représentée par cette personne.</li>
                </ul>

                <h3 class="font-bold">Interprétation</h3>
                <h3 class="font-bold">Définitions</h3>
                <p class="mb-5">Les mots dont la première lettre est en majuscule ont une signification définie dans les conditions suivantes.</p>
                <p class="mb-5">Les définitions suivantes ont la même signification, qu’elles apparaissent au singulier ou au pluriel.</p>

                <h2 class="text-2xl font-bold leading-8">Interprétation et définitions</h2>

                <ul class="list-disc list-inside space-y-3 mb-5">
                    <li class="text-gray-800 leading-relaxed">Fixez une limite de dépôt : avant de commencer à jouer, décidez combien vous pouvez vous permettre de miser selon votre situation financière. Jouez uniquement avec l’argent destiné au divertissement.</li>
                    <li class="text-gray-800 leading-relaxed">Ne tentez pas de récupérer vos pertes à tout prix : évitez de prendre des risques excessifs pour regagner ce que vous avez perdu. Jouez pour le plaisir, pas pour le profit.</li>
                    <li class="text-gray-800 leading-relaxed">Fixez une limite de temps :</li>
                    <li class="text-gray-800 leading-relaxed">Définissez un temps de jeu et ne le dépassez pas. Rappelez-vous que le jeu doit être équilibré avec vos autres activités et ne doit pas devenir votre unique passe-temps.</li>
                    <li class="text-gray-800 leading-relaxed">Jouez de manière réfléchie : il est préférable de ne pas jouer lorsque vous êtes stressé, déprimé ou sous pression. Ne jouez pas sous l’influence de médicaments, de drogues ou d’alcool.</li>
                    <li class="text-gray-800 leading-relaxed">Faites des pauses :</li>
                    <li class="text-gray-800 leading-relaxed">Faites des pauses régulières lorsque vous vous sentez fatigué ou distrait.</li>
                    <li class="text-gray-800 leading-relaxed">Un seul compte :</li>
                    <li class="text-gray-800 leading-relaxed">Pour mieux suivre votre temps et votre argent de jeu, nous vous recommandons fortement de ne pas créer plus d’un compte par personne.</li>
                </ul>

                <h3 class="font-bold">Jeu responsable</h3>
                <h3 class="font-bold">Information et contact</h3>
                <h3 class="font-bold">Protection des mineurs</h3>
                <h3 class="font-bold">Auto-exclusion</h3>

                <p class="mb-5">Pour la majorité de nos utilisateurs, le jeu est une activité de divertissement, de plaisir et d’excitation. Cependant, nous reconnaissons que pour certains, le jeu peut avoir des effets négatifs. Dans le domaine médical, la dépendance au jeu est reconnue depuis longtemps comme une maladie grave.</p>

                <p class="mb-5"><a href="https://www.begambleaware.org/safer-gambling/">Jeu plus sûr</a></p>

                <p class="mb-5">Conseils utiles pour un jeu responsable sur www.Valor.Bet :</p>

                <p class="mb-5">Avant de jouer, tenez compte des conseils suivants afin que le jeu reste une activité agréable et sans conséquences négatives :</p>

                <p class="mb-5">Pour utiliser notre service, vous devez avoir plus de 18 ans. Pour éviter tout abus, gardez vos identifiants de connexion en sécurité et hors de portée des mineurs.</p>

                <p class="mb-5">Nous recommandons l’utilisation d’un logiciel de filtrage pour empêcher les mineurs, en particulier les enfants, d’accéder à des contenus inappropriés en ligne.</p>

                <p class="mb-5">Pour les parents, nous recommandons la liste suivante d’outils de filtrage internet pour aider à bloquer l’accès des enfants aux contenus inadaptés :</p>

                <p class="mb-5"><a href="https://famisafe.wondershare.com/internet-filter/best-internet-filters.html">Meilleurs filtres Internet</a></p>

                <p class="mb-5">Si vous avez été diagnostiqué avec une dépendance au jeu ou souhaitez simplement vous en éloigner, nous voulons vous aider à vous protéger. L’« auto-exclusion » signifie que vous vous excluez volontairement de tous les services de jeu. Cette exclusion ne peut pas être annulée pendant la période choisie. Pour demander l’auto-exclusion, envoyez un message à notre support en précisant une période comprise entre 6 mois et 5 ans. Notre équipe vous guidera dans le processus.</p>

                <p class="mb-5">• E-mail : support@valor.bet</p>

                <p class="mb-5">Depuis le premier jour, nous avons pris ce sujet au sérieux et fait de notre mieux pour aider. Sous le terme « jeu responsable », nous entendons l’ensemble des mesures que le fournisseur de jeu peut mettre en œuvre pour réduire la probabilité d’effets négatifs. Et si ces effets apparaissent, nous agissons rapidement et efficacement.</p>

                <p class="mb-5">Veuillez noter que l’auto-exclusion est irréversible pendant la période choisie et qu’elle vise à protéger votre sécurité personnelle.</p>

                <p class="mb-5">Pendant la période d’auto-exclusion, vous n’êtes pas autorisé à créer un nouveau compte. Toute tentative de contournement sera considérée comme une violation des conditions d’utilisation et peut entraîner la suspension permanente de votre compte d’origine.</p>

                <p class="mb-5">L’outil le plus important contre les effets négatifs du jeu est la connaissance et la sensibilisation aux risques, ce qui renforce l’autocontrôle des joueurs et évite les conséquences indésirables.</p>

                <p class="mb-5">Notre équipe d’assistance vous aidera par e-mail à tout moment, gratuitement :</p>

                <p class="mb-5">• E-mail : support@valor.bet</p>

                <p class="mb-5">Notre équipe ne partagera jamais vos données personnelles avec des tiers sans votre accord.</p>

                <p class="mb-5">De plus, vous pouvez effectuer un test d’auto-évaluation si vous rencontrez des difficultés avec le jeu :</p>

                <p class="mb-5"><a href="https://www.begambleaware.org/gambling-problems/do-i-have-a-gambling-problem/">Ai-je un problème de jeu ?</a></p>

                <p class="mb-5">Vous pouvez également trouver plus d’informations sur la dépendance au jeu sur :</p>

                <h2 class="text-2xl font-bold leading-8">Jeu responsable et auto-exclusion</h2>
            </div>
        `
    },
    'responsible-gaming': {
        title: 'Jogo Responsável',
        subtitle: 'Jogue com segurança',
        content: `
            <div class="politics-content__wrapp">
                <div data-testid="politics-content-block" class="politics-content__block">
                    <p class="mb-5">O jogo responsável é uma parte essencial da política de atendimento ao cliente da nossa empresa, por isso damos muita atenção aos problemas que podem surgir como resultado da dependência de jogos de azar. Acreditamos que é nosso dever proteger os jogadores contra o comportamento excessivo e garantir que nenhum menor de idade participe de atividades de jogo.</p>
                    <p class="mb-5">Nosso objetivo é que nosso serviço seja o mais confortável e funcional possível, oferecendo uma forma divertida de lazer. Infelizmente, o fato de o jogo ser uma forma empolgante de entretenimento pode se tornar um problema para alguns jogadores.</p>
                    <p class="mb-5">Apoiamos e seguimos integralmente a política internacionalmente reconhecida de jogo responsável e fazemos todo o possível para que nossos clientes aproveitem o jogo de forma segura e equilibrada, sem perder o controle.</p>
                </div>

                <div data-testid="politics-content-block" class="politics-content__block">
                    <h2 class="text-2xl font-bold leading-8">Mantendo o Controle</h2>
                    <p class="mb-5">O jogo deve ser visto apenas como entretenimento — uma forma divertida de passar o tempo livre, aproveitar os jogos do seu time favorito e interagir com outros apostadores. No entanto, é importante manter a prudência e o autocontrole enquanto participa.</p>
                    <p class="mb-5">Todo apostador deve sempre lembrar:</p>
                    <ul class="list-disc list-inside space-y-3 mb-5">
                        <li class="text-gray-800 leading-relaxed">o jogo é apenas uma forma de lazer, não um meio de ganhar dinheiro — nunca perca o bom senso;</li>
                        <li class="text-gray-800 leading-relaxed">se perder, não tente recuperar imediatamente — haverá outras oportunidades de ganhar no futuro;</li>
                        <li class="text-gray-800 leading-relaxed">jogue apenas com o dinheiro que pode se dar ao luxo de perder;</li>
                        <li class="text-gray-800 leading-relaxed">acompanhe sempre o tempo e o valor gasto em apostas.</li>
                    </ul>
                </div>

                <div data-testid="politics-content-block" class="politics-content__block">
                    <h2 class="text-2xl font-bold leading-8">Prevenção do Jogo Compulsivo</h2>
                    <p class="mb-5">Embora a maioria das pessoas veja o jogo apenas como uma forma divertida de entretenimento, há uma pequena parcela de jogadores que desenvolve dependência. Pesquisas recentes mostram que apenas uma pequena fração dos adultos enfrenta o problema conhecido como vício em jogos de azar. Mesmo assim, nossa empresa leva esse tema muito a sério e recomenda que os apostadores sempre se lembrem de que:</p>
                    <ul class="list-disc list-inside space-y-3 mb-5">
                        <li class="text-gray-800 leading-relaxed">os jogos de azar se baseiam em probabilidades — não existem “fórmulas” nem “sistemas” garantidos para ganhar;</li>
                        <li class="text-gray-800 leading-relaxed">a vontade de jogar deve vir unicamente de você mesmo;</li>
                        <li class="text-gray-800 leading-relaxed">o jogo é entretenimento, não uma forma de pagar dívidas ou enriquecer rapidamente;</li>
                        <li class="text-gray-800 leading-relaxed">sempre monitore o valor gasto com apostas;</li>
                        <li class="text-gray-800 leading-relaxed">conheça bem as regras antes de participar de qualquer jogo.</li>
                    </ul>

                    <p class="mb-5">É difícil distinguir entre um interesse saudável e um vício prejudicial, mas há alguns sinais que podem indicar que o jogador está enfrentando problemas. Responda às seguintes 10 perguntas — se responder “sim” a pelo menos 5 delas, há uma alta probabilidade de dependência.</p>

                    <ul class="list-disc list-inside space-y-3 mb-5">
                        <li class="text-gray-800 leading-relaxed">Você se envolve seriamente em jogos de azar?</li>
                        <li class="text-gray-800 leading-relaxed">O valor das suas apostas aumenta constantemente?</li>
                        <li class="text-gray-800 leading-relaxed">Você costuma pedir dinheiro emprestado para apostar?</li>
                        <li class="text-gray-800 leading-relaxed">Você joga por mais tempo do que o planejado?</li>
                        <li class="text-gray-800 leading-relaxed">Suas idas frequentes a locais de apostas afetam sua reputação?</li>
                        <li class="text-gray-800 leading-relaxed">Você se irrita ou fica decepcionado quando não pode apostar?</li>
                        <li class="text-gray-800 leading-relaxed">Você usa o jogo como forma de escapar de problemas?</li>
                        <li class="text-gray-800 leading-relaxed">Você sente a necessidade constante de “recuperar” o que perdeu?</li>
                        <li class="text-gray-800 leading-relaxed">Você tenta controlar o tempo e o valor das apostas, mas sem sucesso?</li>
                        <li class="text-gray-800 leading-relaxed">Você esconde o hábito de apostar dos seus familiares?</li>
                    </ul>

                    <p class="mb-5">Fazemos tudo o que está ao nosso alcance para garantir que nossos clientes joguem com segurança e responsabilidade, apoiando integralmente as práticas internacionais de jogo responsável.</p>
                </div>

                <div data-testid="politics-content-block" class="politics-content__block">
                    <h2 class="text-2xl font-bold leading-8">Dicas para Controlar o Jogo</h2>
                    <p class="mb-5">Defina antecipadamente o tempo que deseja dedicar ao jogo e respeite esse limite. Determine o valor máximo que está disposto a perder e não o ultrapasse.</p>
                    <p class="mb-5">Nunca peça dinheiro emprestado para jogar.</p>
                    <p class="mb-5">Tente encontrar outros passatempos e combine-os com o jogo de forma equilibrada.</p>
                    <p class="mb-5">Evite jogar quando estiver de mau humor, deprimido ou sob estresse.</p>
                    <p class="mb-5">Se estiver desanimado, não frequente locais de jogo até se sentir melhor.</p>
                </div>

                <div data-testid="politics-content-block" class="politics-content__block">
                    <h2 class="text-2xl font-bold leading-8">Autoexclusão de Jogos</h2>
                    <p class="mb-5">O apostador tem o direito de solicitar a autoexclusão, encerrando o contrato com a empresa de apostas. A solicitação será considerada apenas se não houver atividade na conta por pelo menos três meses consecutivos. O pedido pode ser enviado para o nosso e-mail de suporte.</p>
                    <p class="mb-5">Após o encerramento do contrato, o jogador poderá solicitar um novo acordo futuramente. No entanto, a empresa se reserva o direito de recusar a abertura de uma nova conta sem a obrigação de justificar o motivo.</p>
                </div>

                <div data-testid="politics-content-block" class="politics-content__block">
                    <h2 class="text-2xl font-bold leading-8">Encontre Apoio Online</h2>
                    <p class="mb-5">Existem várias organizações e instituições que oferecem ajuda e aconselhamento para quem enfrenta problemas com jogos:</p>
                    <p class="mb-5"><a href="https://www.gamblingtherapy.org/" target="_blank">https://www.gamblingtherapy.org/</a></p>
                    <p class="mb-5"><a href="https://www.gamcare.org.uk/" target="_blank">https://www.gamcare.org.uk/</a></p>
                    <p class="mb-5"><a href="https://www.gamblersanonymous.org.uk/" target="_blank">https://www.gamblersanonymous.org.uk/</a></p>
                </div>
            </div>
        `
    },
    'risk-disclosure': {
        title: 'Divulgation des Risques',
        subtitle: 'Informations Importantes',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">Vous comprenez qu'en participant aux jeux, vous risquez de perdre l'argent déposé sur votre compte ValorBet.</p>
                <p class="mb-5">Dans certaines juridictions, les jeux d'argent en ligne peuvent être illégaux. Vous comprenez et acceptez que ValorBet ne peut pas vous fournir de conseils juridiques ni de garanties concernant la légalité de votre utilisation des services du site.</p>
                <p class="mb-5">L'entreprise ne déclare pas que les services du site Web sont conformes aux exigences légales de votre juridiction. Vous utilisez les services fournis par ValorBet de votre plein gré et à votre entière discrétion, en assumant toute responsabilité, et en déterminant si l'utilisation des services du site Web est légale selon les lois en vigueur dans votre juridiction. Vous vous connectez et participez aux jeux à vos propres risques.</p>
                <p class="mb-5">Les sites Web et les jeux sont mis à votre disposition sans aucune garantie expresse ou implicite.</p>
            </div>
        `
    },
    'deposits-withdrawals': {
        title: 'Dépôts et Retraits',
        subtitle: 'Informations sur les Paiements',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">Vous pouvez déposer et retirer des fonds de votre compte de plusieurs manières. Toutes les méthodes de dépôt et de retrait sont disponibles sur la page de recharge. Toutes les demandes de retrait sont traitées 24 heures sur 24.</p>
                <p class="mb-5">Le service de sécurité du casino en ligne ValorBet a le droit de :</p>
                <ol>
                    <li class="text-gray-800 leading-relaxed">Refuser le retrait de fonds par l'une des méthodes disponibles si les montants à déposer ou à retirer ne correspondent pas aux montants des paris effectués (pour le montant déposé, des paris doivent être placés avec une cote d'au moins 1,1 ; les paris multiples sur des jeux à faible perte de solde, tels que les événements opposés à la roulette, au baccarat ou aux dés, ne sont pas autorisés).</li>
                    <li class="text-gray-800 leading-relaxed">Refuser le retrait si le compte de jeu n’est pas utilisé à des fins de jeu, et exiger une vérification du compte avant tout retrait.</li>
                </ol>
                <p class="mb-5">Le service de sécurité de ValorBet ne recommande pas :</p>
                <ul class="list-disc list-inside space-y-3 mb-5">
                    <li class="text-gray-800 leading-relaxed">de transférer de l’argent entre systèmes de paiement ;</li>
                    <li class="text-gray-800 leading-relaxed">de déposer et retirer des fonds sans effectuer de paris.</li>
                </ul>
                <p class="mb-5">Dans ces cas, l’argent sera renvoyé sur votre compte.</p>
                <p class="mb-5">Le retrait n’est possible que vers les mêmes informations que celles utilisées pour le dépôt. En cas de dépôts multiples, les retraits doivent être proportionnels aux montants déposés.</p>
                <p class="mb-5">ValorBet se réserve le droit de refuser les paiements vers certains systèmes ou en espèces, et de proposer un virement bancaire à la place.</p>
                <p class="mb-5"><b>ATTENTION !</b> L’administration ne recommande pas d’effectuer des dépôts ou retraits via des portefeuilles électroniques n’appartenant pas au titulaire du compte. Le service de sécurité peut considérer ces transactions comme frauduleuses et bloquer le compte sans préavis. L’administration se réserve le droit de refuser tout retrait vers des coordonnées ne correspondant pas au titulaire du compte.</p>
                <p class="mb-5">Dans certains cas particuliers, la compensation des frais des systèmes de paiement pour les dépôts et retraits, habituellement couverte par ValorBet, peut être annulée.</p>
                <p class="mb-5">Si l’utilisateur ne respecte pas les règles de la société (viole les Termes et Conditions, ne place pas de pari avant un retrait, etc.), la société se réserve le droit de refuser le retrait.</p>
                <p class="mb-5">Pour les comptes en "bitcoin", aucun frais n’est appliqué pour les dépôts et retraits via le système Bitcoin.</p>
            </div>
        `
    },
    'cancellation-policy': {
        title: 'Politique d’Annulation',
        subtitle: 'Conditions d’Annulation',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">Une fois un pari confirmé, que ce soit en ligne ou par téléphone, il sera considéré comme définitif et ne pourra pas être modifié ou annulé.</p>
                <p class="mb-5">Vous avez la possibilité de parier sur le côté opposé afin de réduire vos pertes, mais le pari initial ne peut pas être entièrement supprimé.</p>
                <p class="mb-5">Tous les paiements des paris sont calculés en utilisant les cotes en vigueur au moment où le pari a été placé. Toute modification ultérieure des cotes n’affectera pas les paris en attente. Pour éviter les erreurs, nous vous recommandons vivement de vérifier attentivement tous vos paris sur vos tickets avant de les confirmer en ligne, et d’écouter attentivement les réponses des agents lors des paris par téléphone.</p>
            </div>
        `
    },
    'refund-policy': {
        title: 'Politique de Remboursement',
        subtitle: 'Informations sur les Remboursements',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">Un remboursement ne peut pas être effectué une fois que les fonds déposés (y compris les bonus) ont été utilisés dans le cadre du processus de jeu.</p>
                <p class="mb-5">Une demande de remboursement ne sera prise en considération que si elle est soumise dans les vingt-quatre (24) heures suivant la transaction présumée, ou dans les trente (30) jours si un joueur affirme qu’une autre personne (ou un mineur) a accédé à son compte joueur.</p>
                <p class="mb-5">Nous nous réservons le droit de retenir tout remboursement ou transaction inversée jusqu’à ce que l’identité du titulaire du compte joueur soit correctement vérifiée à notre satisfaction. Vous acceptez de fournir, sur demande, une pièce d’identité notariée ou toute autre identification certifiée conforme aux lois applicables de la juridiction du joueur. Si cette identification notariée ou certifiée n’est pas fournie dans un délai de cinq (5) jours suivant notre demande, le remboursement ou la transaction inversée ne sera pas effectué(e), votre compte joueur sera fermé et vous perdrez tous les fonds de votre compte. Cette décision sera finale, contraignante et sans appel.</p>
                <p class="mb-5">Le joueur doit jouer de manière équitable à tous les jeux et ne doit en aucun cas influencer le résultat d’un jeu. Cela inclut l’utilisation d’aides informatiques, d’équations mathématiques, de systèmes de paris, etc.</p>
            </div>
        `
    },
    'privacy-policy': {
        title: 'Politique de confidentialité',
        subtitle: 'Protection des données',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <ul class="list-disc list-inside space-y-3 mb-5">
                    <li class="text-gray-800 leading-relaxed">www.Valor.Bet s'engage à protéger vos informations personnelles. Cette Politique de confidentialité vous informe sur les informations que nous recueillons lorsque vous utilisez nos services, pourquoi nous les collectons et comment nous les utilisons.</li>
                    <li class="text-gray-800 leading-relaxed">Veuillez noter que cette Politique de confidentialité est conclue entre vous et www.Valor.Bet (« Nous », « Notre » ou « Nos », selon le contexte). Cette Politique de confidentialité fait partie intégrante des Termes et Conditions de www.Valor.Bet.</li>
                    <li class="text-gray-800 leading-relaxed">Le site web www.Valor.Bet (« Casino », « Site », « Société », « Nous », « Notre », « Nos »)</li>
                    <li class="text-gray-800 leading-relaxed">Nous pouvons modifier périodiquement cette Politique de confidentialité et vous informerons de ces modifications en publiant les termes mis à jour sur nos plateformes. Nous vous recommandons de consulter régulièrement cette Politique de confidentialité.</li>
                </ul>

                <h2 class="text-2xl font-bold leading-8">1. CONFIDENTIALITÉ</h2>
                <p class="mb-5">Nous considérons comme Informations Personnelles (« Informations Personnelles ») toutes les données pouvant identifier une personne, y compris, sans s'y limiter : le prénom et le nom, la date de naissance, l’adresse postale, l’adresse électronique, le numéro de téléphone, ou toute autre information pertinente. Vous pouvez être invité à fournir des Informations Personnelles lorsque vous utilisez notre site web, créez un compte ou utilisez nos services. Les Informations Personnelles que nous collectons peuvent inclure vos coordonnées (y compris le numéro de téléphone), vos informations de livraison et de facturation, l’historique de vos transactions, vos préférences d’utilisation du site web et vos commentaires sur nos Services. Ces données sont stockées sur nos serveurs situés en Allemagne et ailleurs. Lorsque vous interagissez avec nos services, nos serveurs conservent un journal d’activité unique recueillant des informations administratives et de trafic, telles que : votre adresse IP, l’heure et la date d’accès, les pages consultées, les langues utilisées, les rapports d’erreurs logicielles et le type de navigateur. Ces données sont essentielles à la qualité et à la fourniture de nos services. Nous ne collectons aucune Information Personnelle à votre insu.</p>

                <h2 class="text-2xl font-bold leading-8">2. INFORMATIONS RECUEILLIES</h2>
                <p class="mb-5">Nous pouvons recueillir automatiquement certaines données comme mentionné ci-dessus, et recevoir des Informations Personnelles lorsque vous les fournissez via nos services ou d’autres interactions sur www.Valor.Bet. Nous pouvons également obtenir des Informations Personnelles auprès de prestataires de services tiers ou de listes de clients acquises légalement. De plus, nous pouvons faire appel à des prestataires tiers pour fournir une assistance technique, traiter vos transactions en ligne et gérer votre compte. Nous aurons accès à toute information que vous fournissez à ces prestataires et utiliserons vos Informations Personnelles conformément à la présente Politique. Ces informations ne seront divulguées à des tiers qu’en accord avec cette Politique. Nous veillons à ce que nos partenaires contractuels protègent votre vie privée.</p>

                <h2 class="text-2xl font-bold leading-8">3. MÉTHODES DE COLLECTE ET DE TRAITEMENT DES DONNÉES</h2>
                <p class="mb-5">Nous utilisons les Informations Personnelles que nous recueillons auprès de vous pour fournir nos services, offrir une assistance, effectuer des vérifications d’identité et de sécurité, traiter vos transactions en ligne, vous assister dans des promotions tierces, répondre à nos obligations commerciales et assurer le bon fonctionnement de nos services. Nous pouvons partager vos Informations Personnelles avec des partenaires soigneusement sélectionnés. Nous pouvons également vous envoyer : (1) des offres promotionnelles et des informations sur nos produits et services ; et (2) des offres et informations de nos partenaires pour améliorer notre service. Vous pouvez également être invité à participer à des sondages ou concours. La participation est volontaire et les informations demandées peuvent inclure vos coordonnées et données démographiques. En acceptant un prix, vous consentez à l’utilisation de votre nom à des fins publicitaires sans compensation supplémentaire, sauf si la loi l’interdit.</p>

                <h2 class="text-2xl font-bold leading-8">4. UTILISATION DES INFORMATIONS</h2>
                <p class="mb-5">Nous pouvons divulguer vos Informations Personnelles si la loi l’exige ou si nous croyons de bonne foi qu’une telle action est nécessaire pour : (1) se conformer à une obligation légale ; (2) protéger nos droits ou notre propriété ; (3) garantir la sécurité de nos utilisateurs ou du public. En cas de fraude, de tricherie ou de manipulation suspectée, nous nous réservons le droit de partager vos informations avec d’autres casinos en ligne, banques, compagnies de cartes de crédit, agences et autorités compétentes. (4) Pour des recherches liées à la prévention des addictions, les données peuvent être anonymisées et transmises aux institutions concernées.</p>

                <h2 class="text-2xl font-bold leading-8">5. EXCLUSIONS DE DIVULGATION</h2>
                <p class="mb-5">Vous pouvez refuser de recevoir des communications promotionnelles en modifiant les paramètres de votre compte ou en nous contactant directement. Vous pouvez également nous écrire pour : (1) vérifier l’exactitude de vos informations ; (2) les mettre à jour ; ou (3) déposer une plainte concernant leur utilisation. Sur demande, nous mettrons à jour ou marquerons vos données pour en interdire l’usage futur. Rien dans cette Politique ne nous empêche de conserver vos données si la loi l’exige.</p>

                <h2 class="text-2xl font-bold leading-8">6. ACCÈS</h2>
                <h3 class="font-bold">Informations stockées sur votre appareil</h3>
                <h3 class="font-bold">Cookies strictement nécessaires</h3>
                <h3 class="font-bold">Lors de l'inscription</h3>
                <h3 class="font-bold">Sur notre site web</h3>
                <h3 class="font-bold">Cookies Flash</h3>
                <p class="mb-5">Lorsque vous accédez à nos services, nous pouvons stocker des informations sur votre appareil appelées cookies. Ce sont de petits fichiers texte enregistrant vos préférences. Nous utilisons également des « objets locaux partagés » ou cookies Flash. Ces cookies nous aident à suivre l’utilisation de nos services, à améliorer nos offres et à personnaliser votre expérience. Les cookies Flash peuvent aussi être utilisés à des fins publicitaires.</p>
                <p class="mb-5">Les cookies strictement nécessaires permettent la navigation et les transactions sécurisées. Sans eux, notre site ne fonctionnerait pas efficacement.</p>
                <p class="mb-5">Les cookies de session expirent à la fermeture du navigateur ; les cookies persistants restent sur votre appareil pour une durée déterminée. Les cookies analytiques nous aident à comprendre l’utilisation du site et à l’améliorer. Vous pouvez accepter ou refuser les cookies via les paramètres de votre navigateur.</p>

                <h2 class="text-2xl font-bold leading-8">7. COOKIES</h2>
                <p class="mb-5">Pour jouer avec de l'argent réel, vous devrez effectuer des transactions. Nous pouvons utiliser des systèmes de paiement tiers pour traiter ces paiements. En acceptant cette Politique, vous consentez à la transmission de vos informations personnelles nécessaires au traitement, y compris hors de votre pays. Nous prenons des mesures pour protéger votre vie privée dans ces cas.</p>

                <h2 class="text-2xl font-bold leading-8">8. CONSENTEMENT À L'UTILISATION DES PRESTATAIRES DE SERVICES ÉLECTRONIQUES</h2>
                <p class="mb-5">Nous nous réservons le droit d’effectuer des vérifications de sécurité à tout moment pour valider les données d’inscription et examiner l’utilisation de nos services afin de prévenir les fraudes. En utilisant nos services, vous nous autorisez à partager vos informations avec des tiers pour vérifier vos données, y compris par des transferts internationaux.</p>

                <h2 class="text-2xl font-bold leading-8">9. CONSENTEMENT AUX CONTRÔLES DE SÉCURITÉ</h2>
                <p class="mb-5">Nous comprenons l’importance de la sécurité des informations. Toutes les données personnelles que nous recevons sont stockées sur des serveurs sécurisés protégés par des mots de passe et un cryptage SSL 128 bits. Nous veillons à ce que nos partenaires appliquent également des mesures de sécurité strictes.</p>

                <h2 class="text-2xl font-bold leading-8">10. SÉCURITÉ</h2>
                <p class="mb-5">Les Informations Personnelles peuvent être stockées et traitées dans tout pays où nous, nos partenaires ou fournisseurs disposons d’installations. En utilisant nos services, vous acceptez ce transfert, même vers des pays n’ayant pas un niveau de protection équivalent. Nous garantissons toutefois le respect de nos normes de confidentialité.</p>

                <h2 class="text-2xl font-bold leading-8">11. PROTECTION DES MINEURS</h2>
                <p class="mb-5">Nos services ne sont pas destinés aux mineurs. Si nous découvrons que des informations ont été fournies par un mineur, nous les supprimerons immédiatement.</p>

                <h2 class="text-2xl font-bold leading-8">12. TRANSFERTS INTERNATIONAUX</h2>
                <p class="mb-5">Nous ne pouvons garantir la sécurité des informations fournies à des sites tiers liés à nos services. Ces sites opèrent indépendamment et leurs politiques de confidentialité s’appliquent.</p>

                <h2 class="text-2xl font-bold leading-8">13. PRATIQUES DES TIERS</h2>
                <p class="mb-5">Les services sont fournis « EN L'ÉTAT » sans garantie. Nous ne sommes pas responsables des événements hors de notre contrôle. Bien que nous protégions vos données, nous ne pouvons garantir un fonctionnement sans erreur.</p>

                <h2 class="text-2xl font-bold leading-8">14. AVIS JURIDIQUE</h2>
                <p class="mb-5">L'utilisation de nos services implique votre accord avec cette Politique de confidentialité. Elle remplace toute version antérieure. Nous pouvons la modifier périodiquement et publier les mises à jour. Votre utilisation continue constitue une acceptation des changements. Conformément à l'article 77 du RGPD, vous avez le droit de déposer une plainte auprès d'une autorité de contrôle compétente.</p>

                <h2 class="text-2xl font-bold leading-8">15. ACCEPTATION DE LA POLITIQUE DE CONFIDENTIALITÉ</h2>
                <p class="mb-5">L'utilisation continue de nos services vaut acceptation des termes de la Politique. Nous vous recommandons de la consulter régulièrement pour rester informé des mises à jour.</p>

                <h2 class="text-2xl font-bold leading-8">16. AUTRES SITES WEB</h2>
            </div>
        `
    },
    'about-us': {
        title: 'Sobre nosotros',
        subtitle: 'Nuestra historia',
        content: `
            <div class="politics-content__block">
                <p class="mb-5">ValorBet est un casino en ligne proposant les meilleurs fournisseurs agréés du monde entier. La chance et l'excitation se reflètent sur les pages du site, et chacun de nos nouveaux clients peut le ressentir.</p>
                <p class="mb-5">Depuis de nombreuses années, nous sommes guidés par des principes qui définissent notre concept et notre entreprise. Nous les portons d'année en année.</p>
                <p class="mb-5">🏆 Ouverture et transparence <br> La marque ValorBet a été créée dans le but d’incarner une véritable nouvelle histoire dans le monde des casinos en ligne. Notre mission était d’être clairs et transparents avec nos clients afin que la vie et le développement de la marque soient visibles pour chacun de nos joueurs.</p>
                <p class="mb-5">Nous menons des activités sociales, vous donnant la possibilité de participer et d’influencer la vie de la marque en étant actif sur Instagram et nos autres médias — tout cela afin que vous deveniez partie intégrante d’une seule marque de casino en ligne, ValorBet !</p>
                <p class="mb-5">🏆 Vitesse de service <br> Nous avons pris en compte la bande passante Internet des joueurs de nos régions, collecté des analyses et des statistiques approfondies pour assurer une vitesse stable pour chacune de nos machines à sous et pour le site ValorBet. Nous y sommes parvenus — vous pouvez désormais jouer en ligne gratuitement ou pour de l’argent réel sans problème d’accès.</p>
                <p class="mb-5">🏆 Accessibilité <br> ValorBet offre la possibilité de jouer à tous ceux qui aiment vraiment les excellentes machines à sous et un service de haute qualité.</p>
                <p class="mb-5">🏆 Qualité <br> Fournisseurs agréés, assistance professionnelle 24/7, équipe de spécialistes expérimentés avec plus de 10 ans d’expérience dans l’industrie du jeu — tout cela pour que chaque jour passé sur le casino en ligne ValorBet vous apporte plaisir et émotions fortes !</p>
                <p class="mb-5"><b>Contacts</b></p>
                <p class="mb-5">support@valor.bet</p>
            </div>
        `
    },
    'contact': {
        title: 'Contact',
        subtitle: 'Entrer en contact',
        content: `
            <div class="politics-content__block">
                <p class="mb-5"><b>E-mail :</b> support@valor.bet</p>
                <p class="mb-5"><b>Changement d’e-mail/mot de passe :</b> valor.security@valor.bet</p>
            </div>
        `
    },
    'affiliate-program': {
        title: 'Programme d’affiliation',
        subtitle: 'Devenez notre partenaire',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">L’une de nos principales priorités en tant qu’opérateur de jeux en ligne est de garantir un jeu équitable.</p>
                <p class="mb-5">À l’exception des paris sportifs et des jeux de casino en direct, un générateur de nombres aléatoires (RNG) est toujours utilisé pour assurer l’intégrité des jeux de casino en déterminant le résultat aléatoire de ces jeux.</p>
                <p class="mb-5">Il s’agit d’un système standard de l’industrie qui garantit des résultats véritablement aléatoires et qui a été largement testé en exécutant et en analysant des milliers de tours de jeu. L’aléatoire du RNG crée un environnement de jeu crédible et équitable.</p>
                <p class="mb-5">La valeur du retour au joueur (RTP) est un calcul théorique du pourcentage attendu des mises qu’un jeu spécifique rendra au joueur après un grand nombre de parties (par exemple, des centaines de millions). Bien que chaque partie soit imprévisible et puisse entraîner un gain ou une perte, la moyenne à long terme se rapprochera du RTP théorique.</p>
                <p class="mb-5">Nous surveillons régulièrement les taux de paiement des joueurs et coopérons avec les autorités de régulation des jeux pour garantir le respect des lois applicables.</p>
            </div>
        `
    },
    'fairness-fr': {
        title: 'Méthodes de test d’équité & RNG',
        subtitle: 'Jeu équitable',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <h3 class="font-bold">2. Portée</h3>
                <p class="mb-5">Les dispositions de ce processus de lutte contre le blanchiment d’argent ont pour objectif de réduire la possibilité que l’activité de prestation de services de Mirage Corporation soit utilisée à des fins criminelles ou en violation des réglementations.</p>
                <p class="mb-5">Ce processus fournit des orientations détaillées concernant la responsabilité en matière de prévention du blanchiment d’argent et du financement du terrorisme du point de vue du cadre juridique et des réglementations internationales acceptées dans ce domaine.</p>
                <h3 class="font-bold">3. Droit, Réglementations et Règles</h3>
                <p class="mb-5">Le Code pénal de Curaçao établit les procédures de poursuite des infractions de blanchiment d’argent, ainsi que des mesures de confiscation des biens après condamnation, des mesures de gel des actifs lorsqu’une personne est accusée d’un délit de blanchiment d’argent et des mesures d’émission d’une ordonnance de recherche et/ou de saisie lorsqu’il est soupçonné qu’une personne a commis un tel délit.</p>
                <p class="mb-5">Les politiques et procédures de ce manuel visent à se conformer aux règles et orienta­tions contenues dans le NOPML, le NORUT et le NOIS, qui se réfèrent au Code pénal. En complément de ces réglementations, la Banque centrale de Curaçao et Sint Maarten a introduit un cadre global avec des dispositions et lignes directrices pour prévenir et combattre le blanchiment d’argent et le financement du terrorisme (ci-après : les « Dispositions & Lignes directrices » ou « P&G »), reposant notamment sur les recommandations du GAFI.</p>
                <p class="mb-5">Le NORUT et le NOIS s’appliquent tous deux aux entités offrant la possibilité de participer à des jeux de hasard offshore (jeux en ligne) à l’intérieur ou à l’extérieur de Curaçao, ce qui est le cas de la Société. Le NOIS interdit aux personnes soumises d’établir une relation commerciale ou d’effectuer une transaction occasionnelle avec une personne demandeuse d’affaires à moins que cette personne soumise ne dispose des mesures et procédures suivantes concernant cette entreprise, conformément aux dispositions du NOIS :</p>
                <p class="mb-5">• Mesures de diligence raisonnable envers la clientèle ;</p>
                <p class="mb-5">• Procédures de tenue de registres ; et</p>
                <p class="mb-5">• Procédures de déclaration interne.</p>
                <p class="mb-5">La Société est tenue d’appliquer les mesures et procédures mentionnées ci-dessus, même dans les cas où elle établit ou réalise des relations ou transactions non présentielles, directement ou indirectement, via sa société affiliée du groupe.</p>
                <p class="mb-5">La Société est également tenue de veiller à ce que les employés soient informés de la législation AML/CFT applicable, ainsi que des politiques et mesures de la personne soumise à cet égard. Les employés doivent subir des procédures de diligence raisonnable appropriées avant leur embauche et sont également censés recevoir une formation sur la reconnaissance et le traitement des transactions effectuées par ou pour le compte de toute personne ayant été, étant ou semblant être impliquée dans le blanchiment d’argent ou le financement du terrorisme.</p>
                <h3 class="font-bold">4. Politique</h3>
                <h3 class="font-bold">Responsabilité</h3>
                <h3 class="font-bold">Risque AML</h3>
                <h3 class="font-bold">Mirage Corporation utilise les orientations suivantes comme fondement de son modèle de risque AML :</h3>
                <h3 class="font-bold">Facteurs de risque AML</h3>
                <p class="mb-5">La responsabilité ultime de la politique de lutte contre le blanchiment d’argent de Mirage Corporation incombe au Directeur.</p>
                <p class="mb-5">Un aperçu de l’évaluation du risque commercial en matière d’AML sera maintenu afin d’attribuer et de suivre les composantes des classifications de risque séparées. Mirage Corporation catégorise le risque AML global en :</p>
                <p class="mb-5">• Risque client</p>
                <p class="mb-5">• Risque produit</p>
                <p class="mb-5">• Risque interface</p>
                <p class="mb-5">• Risque géographique</p>
                <p class="mb-5">Politiques et procédures AML</p>
                <p class="mb-5">Les politiques et procédures mises en œuvre par Mirage Corporation pour répondre aux exigences réglementaires AML/CFT applicables sont documentées dans ce Manuel. Les politiques et procédures seront périodiquement révisées pour s’assurer qu’elles restent conformes aux exigences réglementaires et à l’environnement de risque évolutif applicable à Mirage Corporation.</p>
                <p class="mb-5">• une déclaration claire de la culture et des valeurs adoptées en faveur de la prévention de la criminalité financière ;</p>
                <p class="mb-5">• un engagement à veiller à ce que l’identité soit vérifiée de manière satisfaisante dans tous les cas et sur une base de risque, avant que les candidats commerciaux ne soient acceptés comme clients ;</p>
                <p class="mb-5">• un engagement à une diligence continue envers le client tout au long de la relation commerciale ;</p>
                <p class="mb-5">• un engagement à veiller à ce que le personnel soit formé et consciencieux quant à la loi, à ses obligations et à la manière de les respecter ;</p>
                <p class="mb-5">• une affectation claire des rôles, responsabilités et structure organisationnelle, et la reconnaissance de l’importance que le personnel signale en interne ses suspicions en temps utile.</p>
                <p class="mb-5">Les procédures contenues dans ce Manuel reflètent la politique globale AML de Mirage Corporation et doivent être respectées par tout le personnel de Mirage Corporation.</p>
                <h3 class="font-bold">5. Évaluation des risques, gestion & approche fondée sur le risque</h3>
                <h3 class="font-bold">Évaluation des risques</h3>
                <h3 class="font-bold">Évaluation des risques de criminalité financière</h3>
                <h3 class="font-bold">Atténuation des risques</h3>
                <h3 class="font-bold">Contrôles de surveillance</h3>
                <p class="mb-5">Les procédures de mise en œuvre prévoient que le but des procédures d’évaluation des risques est de permettre à la Société d’identifier et d’évaluer les risques de ML/FT auxquels la personne soumise est ou peut être exposée et ainsi déterminer :</p>
                <p class="mb-5">L’approche fondée sur le risque pour la prévention de la criminalité financière se reflète dans l’approche de Mirage Corporation quant à la conception et l’exploitation de ses systèmes et contrôles visant à minimiser le risque que Mirage Corporation soit utilisée à des fins de criminalité financière. Le risque est fondamental pour le développement des activités, des nouveaux produits, du développement de la fonctionnalité du produit ou de l’exploitation sur de nouveaux marchés.</p>
                <p class="mb-5">Lorsque Mirage Corporation aborde un nouveau service, segment de clientèle ou géographie, l’évaluation des risques de criminalité financière sera mise à jour lors du développement/lancement (pour s’assurer que les processus AML peuvent soutenir les nouvelles activités).</p>
                <p class="mb-5">Les évaluations des risques de criminalité financière sont menées en continu et s’appliquent notamment lorsque l’environnement commercial change, par exemple :</p>
                <p class="mb-5">• L’entrée sur de nouveaux marchés ; et</p>
                <p class="mb-5">• Le développement de nouveaux produits ou fonctionnalités du produit.</p>
                <p class="mb-5">Les contrôles internes se concentrent sur :</p>
                <p class="mb-5">• La diligence envers les clients, y compris des niveaux de diligence renforcée fondés sur l’évaluation du risque de chaque client ;</p>
                <p class="mb-5">• L’évaluation des risques et la mise en place de mesures pour atténuer les risques identifiés ;</p>
                <p class="mb-5">• Le cas échéant, appliquer une diligence renforcée ;</p>
                <p class="mb-5">• La surveillance des indicateurs clés de risque afin de ré-évaluer le risque d’un client spécifique ;</p>
            </div>
        `
    },
    'aml': {
        title: 'Politique LBC/FT',
        subtitle: 'Lutte contre le blanchiment d’argent et le financement du terrorisme',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">ValorBet s'engage pleinement à prévenir toute forme de blanchiment d'argent, de financement du terrorisme ou d'activité financière illégale sur sa plateforme. Notre politique de lutte contre le blanchiment d'argent (LBC) et le financement du terrorisme (FT) est conçue pour garantir le respect des lois et règlements internationaux, y compris les recommandations du Groupe d’Action Financière (GAFI) et la législation locale applicable.</p>

                <p class="mb-5">Nous surveillons en permanence toutes les transactions et activités effectuées par nos clients afin de détecter et de prévenir tout comportement suspect. Grâce à des processus transparents et traçables, ValorBet garantit le plus haut niveau de confiance et d’intégrité dans toutes les opérations financières.</p>

                <p class="mb-5"><b>1. Vérification de l’identité du client (KYC)</b><br>
                Chaque client doit passer par la procédure « Know Your Customer » (KYC) avant d’effectuer tout dépôt, retrait ou participation à une activité de jeu. Ce processus comprend la vérification de l’identité, de l’adresse et de l’âge. Nous pouvons demander des copies de documents tels qu’une pièce d’identité, un passeport, un permis de conduire ou une facture de services publics.</p>

                <p class="mb-5"><b>2. Surveillance des transactions</b><br>
                Toutes les transactions sur la plateforme ValorBet sont surveillées en continu. Toute activité inhabituelle ou incohérente peut entraîner la suspension temporaire du compte le temps d’effectuer des vérifications supplémentaires. Nous nous réservons le droit de signaler toute transaction suspecte aux autorités financières compétentes sans préavis au client.</p>

                <p class="mb-5"><b>3. Activités interdites</b><br>
                ValorBet interdit strictement l’utilisation des comptes clients à des fins de blanchiment d’argent, de fraude ou de financement du terrorisme. L’utilisation de plusieurs comptes, de moyens de paiement appartenant à des tiers ou de tout mécanisme destiné à dissimuler l’origine des fonds est interdite.</p>

                <p class="mb-5"><b>4. Conservation des données</b><br>
                Toutes les données d’identification des clients, l’historique des transactions et les registres de communication sont conservés en toute sécurité pendant au moins cinq (5) ans après la fin de la relation avec le client, afin de garantir la disponibilité des informations nécessaires à toute enquête officielle.</p>

                <p class="mb-5"><b>5. Formation du personnel</b><br>
                Tous les employés de ValorBet reçoivent une formation régulière pour identifier et gérer correctement les cas potentiels de blanchiment d’argent. Nous nous assurons que notre équipe est pleinement informée des dernières réglementations et des meilleures pratiques dans ce domaine.</p>

                <p class="mb-5"><b>6. Coopération avec les autorités</b><br>
                ValorBet coopère pleinement avec les autorités financières, les régulateurs et les forces de l’ordre, tant locales qu’internationales. Nous garantissons une transparence totale et fournissons les informations requises en temps voulu sur demande légale.</p>

                <p class="mb-5"><b>7. Obligation de déclaration</b><br>
                En cas de détection ou de suspicion d’une activité illégale ou suspecte, nous sommes légalement tenus de signaler le cas à l’autorité compétente. Le compte du client peut être gelé jusqu’à la fin de l’enquête.</p>

                <p class="mb-5">En s’inscrivant sur ValorBet, le client accepte de se conformer à cette politique de lutte contre le blanchiment d’argent et le financement du terrorisme et reconnaît que la fourniture d’informations fausses ou la tentative de contourner les procédures de vérification peut entraîner la fermeture définitive du compte et la confiscation des fonds.</p>

                <p class="mb-5"><b>Contact</b><br>
                Pour toute question concernant la politique LBC/FT, veuillez nous contacter à :<br>
                <b>E-mail :</b> compliance@valor.bet
                </p>
            </div>
        `
    },
    'self-exclusion': {
        title: 'Auto-exclusion',
        subtitle: 'Jeu responsable',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">Chez ValorBet, nous nous engageons à promouvoir le jeu responsable et à fournir aux joueurs les outils nécessaires pour garder le contrôle de leur activité de jeu. Si vous sentez à un moment donné que votre comportement de jeu a un impact négatif sur votre vie, vous pouvez demander une auto-exclusion temporaire ou permanente.</p>
                <p class="mb-5">L’auto-exclusion signifie que votre compte sera fermé pour une période déterminée ou indéterminée, et vous ne pourrez pas accéder à nos services pendant cette période.</p>
                <p class="mb-5">Pour entamer le processus d’auto-exclusion, veuillez contacter notre équipe d’assistance à l’adresse <b>support@valor.bet</b> et indiquer la durée pendant laquelle vous souhaitez être exclu (par exemple : 6 mois, 1 an ou de façon permanente).</p>
                <p class="mb-5">Une fois l’auto-exclusion activée, elle ne peut pas être annulée avant la fin de la période choisie. Pendant cette période, vous ne recevrez aucune communication promotionnelle ou offre de la part de ValorBet.</p>
                <p class="mb-5">Nous vous recommandons également de contacter des organismes spécialisés dans le soutien aux joueurs pour obtenir de l’aide si vous sentez que vous perdez le contrôle. Voici quelques ressources utiles :</p>
                <ul class="mb-5 list-disc ml-6">
                    <li>GamCare (www.gamcare.org.uk)</li>
                    <li>Gambling Therapy (www.gamblingtherapy.org)</li>
                    <li>Joueurs Anonymes (www.gamblersanonymous.org)</li>
                </ul>
                <p class="mb-5">Chez ValorBet, votre sécurité et votre bien-être sont nos priorités absolues. Jouez de manière responsable.</p>
            </div>
        `
    },
    'kyc': {
        title: 'Politique KYC',
        subtitle: 'Vérification et Identification',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">Dans le cadre de notre engagement à maintenir un environnement de jeu sûr et transparent, Mirage Corporation N.V. applique une stricte politique de Connaissance du Client (KYC). Cette politique garantit que l'identité de nos clients est vérifiée, afin de prévenir la fraude, le blanchiment d'argent et l'utilisation abusive de nos services.</p>
                <h3 class="font-bold">1. Objectif</h3>
                <p class="mb-5">L'objectif de la Politique KYC est d'établir l'identité de tous les joueurs et de vérifier la source de leurs fonds, le cas échéant. Cela fait partie de notre conformité aux obligations de Lutte contre le Blanchiment d'Argent (AML) et de Financement du Terrorisme (CFT).</p>
                <h3 class="font-bold">2. Identification et Vérification</h3>
                <p class="mb-5">Les joueurs doivent fournir des informations personnelles exactes et vérifiables lors de l'inscription. Cela inclut, sans s'y limiter, le nom complet, la date de naissance, l'adresse et des documents d'identité valides tels qu'un passeport, une carte d'identité nationale ou un permis de conduire.</p>
                <p class="mb-5">Nous nous réservons le droit de demander des documents supplémentaires pour vérifier votre identité ou la source de vos fonds, tels qu'une preuve d'adresse (facture de services publics ou relevé bancaire) ou des informations relatives aux méthodes de paiement utilisées sur la plateforme.</p>
                <h3 class="font-bold">3. Moment de la Vérification</h3>
                <p class="mb-5">La vérification peut avoir lieu lors de l'inscription, avant tout retrait ou à tout moment jugé nécessaire par la Société pour confirmer l'authenticité des informations fournies par l'utilisateur. Les comptes peuvent être temporairement suspendus jusqu'à la réussite de la vérification.</p>
                <h3 class="font-bold">4. Protection des Données</h3>
                <p class="mb-5">Toutes les informations et documents fournis dans le cadre du processus KYC sont traités avec une stricte confidentialité et conformément aux lois applicables sur la protection des données. Les données sont stockées en toute sécurité et utilisées uniquement à des fins de vérification d'identité et de conformité.</p>
                <h3 class="font-bold">5. Non-Conformité</h3>
                <p class="mb-5">Le défaut de soumettre les documents requis ou la tentative de fournir des informations fausses ou trompeuses peut entraîner la suspension du compte, la restriction des services et, si nécessaire, la notification aux autorités réglementaires.</p>
                <h3 class="font-bold">6. Surveillance Continue</h3>
                <p class="mb-5">Mirage Corporation surveille en permanence les transactions et le comportement des joueurs afin d'identifier toute activité suspecte. En cas d'irrégularité, une nouvelle vérification ou un examen du compte peut être initié.</p>
                <p class="mb-5">En utilisant nos services, les joueurs reconnaissent et acceptent de se conformer à cette Politique KYC dans le cadre des Termes et Conditions de Mirage Corporation.</p>
            </div>
        `
    },
    'dispute-resolution': {
        title: 'Résolution des litiges',
        subtitle: 'Règlement des différends',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
                <p class="mb-5">La résolution des litiges est un terme utilisé à la fois en droit commercial et en droit privé. Dans sa forme la plus simple, elle désigne le règlement d’un différend entre deux ou plusieurs parties.</p>
                <p class="mb-5">Ce qui complique souvent la résolution des litiges, c’est la méthode choisie pour parvenir à un accord, car chaque approche présente des différences en termes de coût, d’accessibilité, de confidentialité et de rapidité.</p>
                <p class="mb-5">Pour contacter notre équipe de résolution des litiges, veuillez envoyer un courriel à <a href="mailto:support@valor.bet">support@valor.bet</a> et nous vous répondrons.</p>
                <p class="mb-5"><span>Négociations préalables et discussions amiables</span> – Généralement la méthode la plus rentable. Les parties se réunissent, avec ou sans représentation juridique, pour tenter de résoudre leurs différends avant toute procédure judiciaire.</p>
                <p class="mb-5"><span>Médiation</span> – Processus au cours duquel un tiers indépendant aide les parties à parvenir à un accord. Le médiateur reste neutre et n’impose pas de décision. Ce processus est confidentiel, rapide et moins coûteux que l’arbitrage ou le contentieux.</p>
                <p class="mb-5"><span>Arbitrage</span> – Procédure plus formelle dans laquelle un ou plusieurs arbitres rendent une décision sur la base des preuves présentées. L’arbitrage est privé et souvent plus flexible et rapide que le contentieux judiciaire.</p>
                <p class="mb-5"><span>Contentieux</span> – Procédure légale formelle devant les tribunaux. Elle peut être longue et coûteuse, mais la décision du juge est exécutoire et contraignante pour les deux parties.</p>
                <p class="mb-5"><span>Modes alternatifs de règlement des différends (ADR)</span> – Terme général désignant toute méthode de résolution d’un différend sans passer par les tribunaux, comme la négociation, la médiation ou l’arbitrage.</p>
                <p class="mb-5">Avant d’engager une procédure, vérifiez toujours votre contrat : il peut contenir une clause précisant la méthode de résolution des différends.</p>
            </div>
        `
    },
    'account-payments': {
        title: 'Compte, Paiements et Bonus',
        subtitle: '',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block">
    <p class="mb-5">1. Pour devenir titulaire de compte, vous devez d'abord vous inscrire sur
        l'entreprise.</p>
    <p class="mb-5">2. Un "Compte d'entreprise" est un compte détenu par un titulaire de compte, pour
        des transactions en bonne et due forme, avec pour objectif strict d'établir une relation commerciale normale
        avec l'entreprise et dans le but strict de réaliser des paris et autres transactions de jeu et de jeu d'argent.
    </p>
    <p class="mb-5">3. Le "Site Web" est la passerelle Internet accessible par l'adresse Internet de
        l'entreprise / où toutes les informations actuelles et pertinentes concernant les opérations de l'entreprise
        sont publiées, et par lequel les Services sont fournis aux détenteurs de comptes.</p>
    <p class="mb-5">4. Les règles pour tous les paris sportifs sur le livre de paris sportifs de la
        société sont établies dans la section d'aide générale (Paris sportifs);</p>
    <p class="mb-5">5. Les règles de chaque jeu proposé par l'entreprise peuvent être trouvées sur la
        section d'aide du site Web ou dans la section appropriée de chaque jeu.</p>
    <p class="mb-5">6. Les règles des bonus / promotions sont décrites dans la partie "Promotions" du
        site Web, où vous pouvez voir les conditions appliquées pour chaque bonus et / ou promotion. Le montant maximal
        de la mise que vous pouvez placer lorsque vous avez un bonus de casino actif est de 5€ (ou l'équivalent en
        devise) par tour sur un jeu de machine à sous ou de 15% du bonus total donné (selon le premier à se produire).
    </p>
    <p class="mb-5">7. Tous les services fournis doivent être utilisés conformément aux Règles et aux
        Limites établies.</p>
    <h3>2. Ouverture de Votre Compte</h3>
    <h3>2.5 En ouvrant votre compte, vous garantissez que :</h3>
    <p class="mb-5">2.1 Pour placer un pari ou jouer à un jeu en utilisant nos services, vous devrez
        ouvrir un compte avec l'Opérateur ("Le compte de l'entreprise" ou "Compte").</p>
    <p class="mb-5">2.5.5 Vous n'avez pas été exclu des jeux de hasard; et</p>
    <p class="mb-5">2.5.6 Vous n'avez pas déjà eu un compte fermé par nous pour les raisons suivantes
        : Collusion, Tricherie, Fraude, Activité Criminelle, Violation des Conditions d'Utilisation ou à votre demande
        en vertu du paragraphe Jeu/Paris Responsable.</p>
    <p class="mb-5">2.6 Votre compte doit être enregistré à votre propre nom, avec des informations
        personnelles correctes et ne doit être émis qu'une seule fois pour vous, et non dupliqué par une autre personne,
        une famille, un ménage, une adresse (postale ou IP), une adresse e-mail, un appareil d'Accès ou tout
        environnement où les appareils d'Accès sont partagés (par exemple, écoles, lieux de travail, bibliothèques
        publiques, etc.), un ordinateur (ou autre dispositif d'accès) et/ou un compte concernant les Services. Tout
        autre compte que vous ouvrez chez nous, ou qui vous appartient bénéficiairement par rapport aux Services sera
        considéré comme des "Comptes Doubles". Nous pouvons fermer tout Compte Double (mais nous ne sommes pas obligés
        de le faire).</p>
    <p class="mb-5">Si nous fermons un Compte en Doublon :</p>
    <p class="mb-5">2.6.1 Tous les bonus, les paris gratuits et les gains accumulés à partir de tels
        bonus et paris gratuits obtenus en utilisant ce Compte Dupliqué seront annulés et confisqués par vous;</p>
    <p class="mb-5">2.6.2 Nous pouvons, à notre entière discrétion, annuler tous les gains et
        rembourser tous les dépôts (moins les montants en ce qui concerne les gains annulés) effectués en rapport avec
        ce Compte Dupliqué et, dans la mesure où nous ne les avons pas récupérés grâce à ce Compte Dupliqué, tous les
        montants à nous rembourser en rapport avec un Compte Dupliqué peuvent être récupérés par nous directement auprès
        de tout autre de vos Comptes (y compris tout autre Compte Dupliqué); ou</p>
    <p class="mb-5">2.6.3 Nous pouvons, à notre entière discrétion, permettre que l'utilisation du
        compte en double soit considérée comme valide et dans ce cas, toutes les pertes et les mises placées par vous ou
        pour vous par le biais du compte en double seront conservées par nous.</p>
    <p class="mb-5">2.6.4 En raison de la législation réglementaire et des licences, les joueurs des
        juridictions suivantes sont interdits de créer des comptes avec l'entreprise : USA, Curaçao et Malte.
        L'entreprise se réserve tous les droits de suspendre un compte ouvert à partir de ces pays ainsi que les dépôts
        et les paris effectués.</p>
    <p class="mb-5">2.2.1 Cliquez sur Inscrivez-vous sur le site Web et suivez les instructions à
        l'écran ou</p>
    <p class="mb-5">2.2.2 Ouvrir un compte par une autre méthode d'ouverture de compte qui peut, de
        temps à autre, être proposée par l'Opérateur;</p>
    <p class="mb-5">2.3 Votre compte sera soit géré par l'Opérateur, soit par une autre société de son
        Groupe pour et au nom de lui-même et/ou de la société du Groupe Opérateur avec laquelle vous avez «signé» un
        contrat.</p>
    <p class="mb-5">2.4 Lors de l'ouverture de votre compte, il vous sera demandé de nous fournir des
        informations personnelles, y compris votre nom et votre date de naissance et les coordonnées appropriées, y
        compris une adresse, un numéro de téléphone et une adresse e-mail ("Détails Personnels"). Vous pouvez mettre à
        jour vos Détails Personnels de temps en temps en contactant le Service Client ; ou via la page de gestion "Mon
        Profil" sur le Site Web ; ou par toute autre méthode qui pourrait, de temps en temps, être proposée par
        l'Opérateur.</p>
    <p class="mb-5">2.5.1 Vous comprenez et acceptez le risque qu'en utilisant les Services, vous
        pouvez, tout comme gagner de l'argent, perdre de l'argent;</p>
    <p class="mb-5">2.5.2 Vous êtes : (a) âgé de plus de 18 ans : et (b) au-dessus de l'âge à partir
        duquel les activités de jeu ou de pari sont légales en vertu de la loi ou juridiction qui vous est applicable
        (l'"Âge Pertinent") ;</p>
    <p class="mb-5">2.5.3 Les jeux d'argent ne sont pas illégaux sur le territoire où vous résidez;
    </p>
    <p class="mb-5">2.5.4 Vous êtes légalement capable de conclure des contrats;</p>
    <h3>3. Gestion du compte de l'entreprise</h3>
    <h3>3.2 La société garantit en tout temps de :</h3>
    <p class="mb-5">3.1 L'entreprise se réserve le droit, à sa seule discrétion et à tout moment, de :
    </p>
    <p class="mb-5">i) Suspendre et/ou annuler la participation du titulaire du compte aux Services,
        et/ou saisir et/ou confisquer les fonds disponibles sur leur compte de l'entreprise si le titulaire du compte
        est reconnu coupable de tricherie, ou s'il est déterminé par l'entreprise que le titulaire du compte a employé
        ou utilisé un système (y compris des machines, des robots, des ordinateurs, des logiciels ou tout autre système
        automatisé) conçu pour tromper ou capable de tromper l'application et/ou le logiciel du client.</p>
    <p class="mb-5">La société s'engage à détecter et à prévenir l'utilisation de programmes
        informatiques conçus pour permettre à l'intelligence artificielle (« Logiciel IA ») de jouer sur son/ses site(s)
        internet, incluant mais sans se limiter au profilage des adversaires, à la collusion entre joueurs ; à
        l'utilisation de robots, d'autres logiciels de 'tricherie', ou tout autre chose qui, selon notre opinion
        raisonnable, altère le déroulement normal du jeu et donne un avantage déloyal au joueur sur les autres. Vous
        reconnaissez que la société prendra des mesures pour détecter et prévenir l'utilisation de tels programmes et
        logiciels IA, en utilisant des méthodes (y compris, mais sans se limiter à, la lecture de la liste des
        programmes actuellement en cours d'exécution sur l'ordinateur d'un joueur) et le client s'engage à ne pas
        utiliser de logiciel IA et/ou de tels programmes.</p>
    <p class="mb-5">a) Gérer les fonds appartenant aux titulaires de comptes de manière sûre et
        appropriée; et/ou</p>
    <p class="mb-5">b) Absorber le coût et payer les droits de jeu et de paris, selon le cas, sur le
        lieu du contrat;</p>
    <p class="mb-5">c) Gérer les données concernant un titulaire de compte conformément aux lois
        applicables, aux lois sur la protection des données et/ou similaires ; d) Ne pas offrir de contingences aux
        clients pour procéder à un quelconque transfert de fonds entre les comptes des clients.</p>
    <p class="mb-5">3.3 La société gardera les fonds des titulaires de compte séparés de ses propres
        fonds dans un compte client détenu auprès d'une institution financière approuvée par le régulateur.</p>
    <p class="mb-5">3.4 A Le compte de l'entreprise n'accumule pas d'intérêts. Le titulaire du compte
        ne doit pas considérer l'entreprise comme une institution financière.</p>
    <p class="mb-5">3.5 Un titulaire de compte ne peut détenir qu'un seul compte de la société à la
        fois. En cas de violation de cette règle, la société se réserve le droit de bloquer et/ou de supprimer le(s)
        compte(s) superflu(s) de la société détenu(s) par le titulaire de compte en violation de cette clause, et de
        réaffecter tous les fonds à un seul compte de la société. Tout bonus accordé au(x) compte(s) superflu(s) de la
        société sera réaffecté.</p>
    <p class="mb-5">3.6 A Le compte de l'entreprise n'est pas transférable. Il est interdit aux
        joueurs de vendre, de transférer ou d'acquérir des comptes d'autres joueurs ou à d'autres joueurs. Les fonds ne
        peuvent pas être transférés entre les comptes de l'entreprise.</p>
    <p class="mb-5">3.7 Un titulaire de compte ne doit permettre à aucun autre individu, y compris à
        un mineur, d'utiliser ou de réutiliser son compte d'entreprise, d'accéder et/ou d'utiliser tout matériel ou
        information du site web, d'accepter tout prix, ou d'accéder et/ou de participer aux services.</p>
    <p class="mb-5">a) Refuser d'ouvrir le compte de l'entreprise et/ou de fermer un compte
        d'entreprise existant sans aucune explication quelconque;</p>
    <p class="mb-5">b) Refuser d'accepter des dépôts sans aucune explication;</p>
    <p class="mb-5">c) Demander des documents pour vérifier : (i) l'identité du titulaire du compte,
        (ii) son autorisation d'utiliser une carte spécifique et/ou (iii) d'autres faits et informations fournis par le
        titulaire du compte. Une telle demande peut être faite à tout moment et la société se réserve le droit de
        suspendre un compte en attente d'enquête;</p>
    <p class="mb-5">f) Détenir et gérer les fonds appartenant aux détenteurs de comptes conformément
        aux directives généralement acceptées pour la gestion de trésorerie concernant ces fonds ; cela peut inclure une
        Institution Financière et/ou un Prestataire de Solution de Paiement se voyant confier la détention de fonds au
        nom de et/ou pour le bénéfice des détenteurs de comptes ;</p>
    <p class="mb-5">g) Confisquer et/ou saisir les fonds disponibles sur un compte de La Société et/ou
        refuser d'honorer une réclamation, dans le cas où, directement ou indirectement : (i) les Règles de La Société
        ont été violées ; et/ou (ii) d'autres activités non autorisées ont eu lieu en lien avec un événement de paris
        et/ou le fonctionnement d'un compte La Société (comme, mais sans s'y limiter, violation de la loi ou d'autres
        règlementations, violation des droits d'un tiers, fraude, et tricherie) ;</p>
    <p class="mb-5">h) Suspendre et/ou annuler la participation d'un titulaire de compte aux jeux,
        activités promotionnelles, compétitions ou autres services, chaque fois que la société estime qu'il y a des
        préoccupations légitimes qu'un compte de la société est, a été, ou peut être utilisé pour des pratiques
        illégales, frauduleuses ou malhonnêtes;</p>
    <h3>4. Comptes Inactifs</h3>
    <h3>4.2 L'entreprise se réserve le droit de facturer ou de fermer les comptes inactifs si :</h3>
    <p class="mb-5">4.1 Un "Compte Inactif" est un compte de l'entreprise qui n'a aucun enregistrement
        de connexion et/ou de déconnexion pendant une période dépassant six (6) mois consécutifs.</p>
    <p class="mb-5">a) Aucune transaction n'a été enregistrée sur un compte de l'entreprise pendant
        une période de 6 mois consécutifs; (Un compte inactif est un compte qui n'a pas été utilisé pendant 6 mois, qui
        a un solde en argent réel. Une fois que votre compte est devenu inactif, si nous n'avons pas pu vous contacter,
        la société a le droit de fermer votre compte et</p>
    <p class="mb-5">b) L'entreprise a fait des efforts raisonnables pour contacter le Titulaire du
        Compte Inactif mais le Titulaire du Compte n'a pas pu être localisé de manière satisfaisante ou les instructions
        de paiement requises n'étaient pas disponibles.</p>
    <p class="mb-5">4.3 Si un compte est bloqué ou exclu et qu'un solde est toujours disponible sur le
        compte, vous serez contacté par notre Service Client vous informant qu'un solde est toujours disponible sur
        votre compte. Il vous sera demandé de fournir des détails pour le retrait de ces montants en attente.</p>
    <p class="mb-5">4.4 La société se réserve le droit de facturer une commission mensuelle sur un
        compte inactif équivalente à 5 EUR (ou son équivalent dans une autre devise) par mois.</p>
    <p class="mb-5">4.5 Tout solde sur un compte inactif résultant de l'offre de remboursement sera
        immédiatement expiré.</p>
    <h3>5. Contre-passation</h3>
    <p class="mb-5">5.1 Sous réserve des sous-clauses ci-dessous et sans préjudice du droit de la
        société de demander réparation en vertu de toute législation, réglementation, décret ou politique applicable, ou
        en vertu de toute autre disposition des règles de la société, La société aura le droit de bloquer un compte de
        la société lorsqu'une demande de chargeback a été demandée en relation avec ce compte de la société.</p>
    <p class="mb-5">5.2 Lorsqu'une demande de rétrofacturation a été faite, La société enverra un
        "Avis de Rétrofacturation" au Titulaire du Compte à l'adresse e-mail mentionnée dans les détails du Titulaire du
        Compte, afin de confirmer l'identité du Titulaire du Compte et la méthode de paiement utilisée pour créditer sur
        le Compte de la Société du Titulaire du Compte, tout fonds n'ayant aucun lien avec une rétrofacturation ("Fonds
        Incontestés"). En l'absence de confirmation par le Titulaire du Compte de son identité et de la méthode de
        paiement utilisée pour créditer les Fonds Incontestés sur le Compte de la Société du Titulaire de Compte, suite
        à un Avis de Rétrofacturation, La société enverra deux rappels écrits au Titulaire du Compte à l'e-mail
        disponible, chacun étant soumis à des frais de traitement de cinquante (50) Euros prélevés sur tout Fonds
        Incontesté.</p>
    <p class="mb-5">5.3 Lorsqu'un compte de L'entreprise a été bloqué en raison d'une rétrofacturation
        et que le titulaire du compte n'a pas : a) ouvert de session sur le compte de L'entreprise pendant une période
        de trente (30) mois consécutifs ; ou b) confirmé à L'entreprise son identité et les détails de la méthode de
        paiement utilisée pour créditer des fonds non contaminés sur le compte de L'entreprise du titulaire du compte et
        a ensuite demandé un retrait ; tous les fonds non contaminés sur le compte de L'entreprise seront traités comme
        s'ils étaient des fonds sur un compte inactif et L'entreprise remettra le solde sur le compte de L'entreprise du
        titulaire de compte.</p>
    <h3>6. Fermeture du compte de l'entreprise</h3>
    <h3>6.5 Règles de Paiement</h3>
    <h3>6.8 La société ne doit pas gérer le solde créditeur du compte de la société sauf :</h3>
    <p class="mb-5">6.1 Un titulaire de compte peut fermer le compte de l'entreprise à tout moment en
        contactant le service client de l'entreprise à l'aide des coordonnées fournies dans la section "Aide" sur le
        site Web par e-mail. Tous les fonds dans le compte de l'entreprise seront remis au titulaire du compte.</p>
    <p class="mb-5">6.5.5 Méthode de paiement/retrait de/vers le compte de l'entreprise.</p>
    <p class="mb-5">6.6.1 Un titulaire de compte n'est autorisé qu'à :</p>
    <p class="mb-5">a) Effectuer des dépôts sur le compte de l'entreprise avec sa carte personnelle ou
        via son compte personnel créé auprès de l'une des institutions financières ou de leurs licenciés. Si nous
        détectons des détenteurs de comptes utilisant des fonds provenant d'autres détenteurs de comptes ou de tiers en
        général (y compris mais sans s'y limiter, recevant des fonds de tiers sur leurs propres moyens de paiement et
        les déposant directement sur leur propre compte de l'entreprise), nous nous réservons le droit d'annuler tous
        les gains et de confisquer tout solde (gains et dépôts) sur votre compte de paris, de résilier le Contrat et/ou
        de suspendre la fourniture des Services ou de désactiver votre compte.</p>
    <p class="mb-5">b) Demander le retrait des fonds détenus sur le compte de l'entreprise vers son
        compte personnel créé auprès de l'une des Institutions Financières ou de leurs ayants droit.</p>
    <p class="mb-5">6.6.2 Un titulaire de compte est responsable de fournir à l'entreprise les détails
        corrects de son compte personnel dans le but de retraits depuis le compte de l'entreprise.</p>
    <p class="mb-5">6.6.3 Un titulaire de compte ne doit pas autoriser des tiers à utiliser le compte
        de l'entreprise pour effectuer des dépôts ou des retraits sur le compte de l'entreprise.</p>
    <p class="mb-5">6.6.4 Il incombe uniquement au titulaire du compte de s'assurer qu'il/elle se
        conforme aux dispositions ci-dessus.</p>
    <p class="mb-5">6.7 La société n'acceptera pas de pari d'un Titulaire de Compte à moins qu'un
        Compte de la société n'ait été établi au nom du Titulaire de Compte et qu'il y ait des fonds suffisants dans le
        Compte de la société pour couvrir le montant du pari, ou que les fonds nécessaires pour couvrir le montant du
        pari soient fournis de manière approuvée.</p>
    <p class="mb-5">a) de débiter du compte de la société un pari effectué par le titulaire du compte
        ou une somme que le titulaire du compte indique qu'il veut miser au cours d'un jeu auquel il joue ou qu'il
        s'apprête à jouer;</p>
    <p class="mb-5">b) pour transférer des fonds du crédit du compte de l'entreprise au titulaire du
        compte, à la demande de ce dernier, en termes de la régulation 37 des réglementations du jeu à distance;</p>
    <p class="mb-5">6.2 Si un compte de l'entreprise existant est fermé, toutes les obligations déjà
        contractées seront honorées.</p>
    <p class="mb-5">c) de payer des frais bancaires raisonnables pour les dépôts reçus et les fonds
        retirés; ou</p>
    <p class="mb-5">d) ou autrement autorisé par le Règlement sur les Jeux à Distance.</p>
    <p class="mb-5">6.9 Le solde du compte de l'entreprise peut devenir négatif en cas de
        rétrofacturation.</p>
    <p class="mb-5">6.10 Les retraits du compte de l'entreprise sont effectués par des paiements
        adressés au titulaire du compte ou transférés sur un compte bancaire au nom du titulaire du compte, comme
        conseillé par le titulaire du compte. Dans la mesure du possible, l'entreprise limitera les retraits à être
        effectués uniquement sur le même compte utilisé par le titulaire du compte pour effectuer des dépôts.</p>
    <p class="mb-5">6.11 En fonction de la méthode de paiement choisie par le titulaire du compte, des
        limites de dépôt minimum et/ou maximum peuvent s'appliquer.</p>
    <p class="mb-5">6.11.1 Pour retirer un montant du compte, le Titulaire du Compte doit effectuer
        les étapes suivantes :</p>
    <p class="mb-5">1. Choisissez "Retirer" dans la section Compte.</p>
    <p class="mb-5">2. Choisissez la méthode de retrait appropriée.</p>
    <p class="mb-5">3. Fournissez les données personnelles requises et indiquez le montant.</p>
    <p class="mb-5">4. Appuyez sur Confirmer. Un message confirmant la demande de retrait apparaîtra
        ensuite.</p>
    <p class="mb-5">6.3 Les titulaires de compte souhaitant récupérer des fonds détenus dans un compte
        fermé, bloqué ou exclu sont invités à contacter le Service Client.
        <br>
        Les retraits ne seront autorisés que vers le même compte d'origine des fonds. Il peut également y avoir des
        limitations pour les retraits. L'identité des joueurs doit d'abord être vérifiée.
        <br>
        L'utilisateur doit envoyer les documents pour vérification au moins un jour avant le premier retrait.
    </p>
    <p class="mb-5">6.12 La société se réserve le droit de facturer au Titulaire du Compte les frais
        administratifs résultant des retraits effectués par le Titulaire du Compte, comme indiqué sur le Site Web.</p>
    <p class="mb-5">6.13 Placer un pari via Internet peut être illégal dans la juridiction où le
        titulaire de compte réside et/ou est domicilié; si c'est le cas, le titulaire de compte n'est pas autorisé à
        utiliser une carte pour l'objectif de placer un pari.</p>
    <p class="mb-5">6.14 La participation d'un titulaire de compte aux Services dans une juridiction
        où une telle participation est interdite par la loi n'affecte pas les enjeux ou les paiements effectués et
        accumulés au profit de l'entreprise.</p>
    <p class="mb-5">6.15 La société, ou l'Autorité de Contrôle, peut surveiller ou demander à examiner
        toutes les transactions pour prévenir le blanchiment d'argent. Toutes les transactions suspectes détectées par
        la société seront signalées aux Autorités de Contrôle.</p>
    <p class="mb-5">6.16 Toutes les transactions sont vérifiées pour prévenir le blanchiment d'argent.
    </p>
    <p class="mb-5">6.17 Il est de la seule responsabilité du titulaire du compte de payer et de
        procéder avec toute la diligence nécessaire en ce qui concerne les taxes sur tout prix, si et là où applicable.
    </p>
    <p class="mb-5">6.18 Il est illégal de déposer de l'argent provenant de moyens mal acquis.</p>
    <p class="mb-5">6.19 Avec l'initiative du département Finance / Comptabilité, les utilisateurs
        peuvent être redirigés vers différentes méthodes de paiement.</p>
    <p class="mb-5">6.4 En cas de fermeture de leur compte d'entreprise en raison d'une addiction au
        jeu ou d'une fraude, un individu ne doit pas ouvrir un nouveau compte de l'entreprise. L'entreprise ne sera pas
        responsable si l'individu réussit à ouvrir un nouveau compte, ni pour tous dommages directs ou indirects
        consécutifs. L'entreprise se réserve le droit de fermer un compte ouvert en violation de cette règle à tout
        moment.</p>
    <p class="mb-5">Les dépôts et les retraits sur le compte de la société doivent toujours être
        effectués via une Institution Financière ou un Fournisseur de Solution de Paiement. Les procédures, les termes
        et conditions, la disponibilité et la durée des dépôts/retraits peuvent varier, en fonction du temps nécessaire
        à la réalisation de ces procédures, du pays de résidence du client et de l'Institution Financière utilisée. Des
        informations supplémentaires sont disponibles une fois connecté sur le site web, dans les sections "Dépôt" ou
        "Retrait". Concernant le paiement rapide Yandex.Money : "Le client confirme qu'il/elle est informé des
        conditions du service de paiement rapide Yandex.Money (https://money.yandex.ru/pay/doc.xml?offerid=default)."
    </p>
    <p class="mb-5">6.5.1 La société se réserve le droit de ne pas traiter un paiement si l'identité,
        l'âge et le lieu de résidence du titulaire du compte et la preuve des fonds n'ont pas été suffisamment vérifiés.
    </p>
    <p class="mb-5">6.5.2 La société peut nommer un fournisseur de solutions de paiement pour agir,
        recevoir des dépôts, détenir et gérer des fonds et / ou faciliter les retraits, au nom de la société.</p>
    <p class="mb-5">6.5.3 La société n'accepte pas les fonds en espèces envoyés ou livrés directement
        à la société ou à un fournisseur de solutions de paiement.</p>
    <p class="mb-5">6.5.4 La société créditera sur le compte de la société tous les fonds reçus par la
        société de la part ou pour le compte du titulaire du compte, ou appartenant à la société au bénéfice du
        titulaire du compte.</p>
    <h3>7. Limitation de Responsabilité</h3>
    <p class="mb-5">7.1 Vous accédez au site Web et participez aux jeux à vos propres risques. Les
        sites Web et les jeux sont fournis sans aucune garantie, qu'elle soit exprimée ou implicite.</p>
    <p class="mb-5">7.2 Sans préjudice de la généralité de la disposition précédente, la société, ses
        directeurs, employés, partenaires, fournisseurs de services :</p>
    <p class="mb-5">7.2.4 Ne garantit pas que le logiciel ou le site Web/les sites Web sont adaptés à
        leur objectif;</p>
    <p class="mb-5">7.2.5 Ne garantissent pas que le logiciel et le site Web sont exempts d'erreurs;
    </p>
    <p class="mb-5">7.2.6 Ne garantit pas que les sites Web et/ou les jeux seront accessibles sans
        interruptions;</p>
    <p class="mb-5">7.2.7 Ne sera pas responsable de toute perte, coûts, frais ou dommages, qu'ils
        soient directs, indirects, spéciaux, consécutifs, accessoires ou autres, découlant de votre utilisation des
        Sites Web ou de votre participation aux Jeux.</p>
    <p class="mb-5">7.3 Vous acceptez par la présente d'indemniser entièrement et de dégager de toute
        responsabilité l'entreprise, ses directeurs, employés, partenaires et fournisseurs de services pour tout coût,
        dépense, perte, dommages, réclamations et responsabilités, quelle qu'en soit la cause, qui pourraient survenir
        en relation avec votre utilisation du site Web ou votre participation aux Jeux.</p>
    <h3>8. Collusion, Tricherie, Fraude et Activité Criminelle</h3>
    <h3>8.3. Si :</h3>
    <h3>8.4. Aux fins de ce paragraphe 11:</h3>
    <h3>Là où il existe un soupçon raisonnable que le Titulaire du Compte a commis ou tenté de commettre un abus de
        bonus, seul ou en groupe, la société se réserve le droit de :</h3>
    <p class="mb-5">8.1. Les pratiques suivantes en relation avec les Services :</p>
    <p class="mb-5">c) Nous prenons conscience que vous avez "rétrofacturé" ou refusé l'un des achats
        ou dépôts que vous avez effectués sur votre compte; ou</p>
    <p class="mb-5">d) Vous faites faillite ou subissez des procédures analogues partout dans le
        monde, alors, (y compris en relation avec toute suspension et/ou résiliation de votre compte) nous aurons le
        droit, en ce qui concerne votre compte, de retenir la totalité ou une partie du solde et/ou de récupérer du
        compte le montant de tous les dépôts, paiements, bonus ou gains qui ont été affectés par ou sont de quelque
        manière attribuables à l'un ou plusieurs des événements décrits dans ce paragraphe.</p>
    <p class="mb-5">a) Une "pratique frauduleuse" signifie toute activité frauduleuse à laquelle vous
        participez ou à laquelle participe toute personne agissant en votre nom ou de connivence avec vous, et inclut,
        sans limitation :</p>
    <p class="mb-5">- les rétrofacturations frauduleuses et l'activité de rake-back;</p>
    <p class="mb-5">- l'utilisation par vous ou toute autre personne participant au même jeu que vous
        à n'importe quel moment, d'une carte de crédit ou de débit volée, clonée ou autrement non autorisée, comme
        source de fonds;</p>
    <p class="mb-5">- la collusion de votre part avec d'autres dans le but d'obtenir un avantage
        injuste (y compris à travers des systèmes de bonus ou des incitations similaires offertes par nous);</p>
    <p class="mb-5">- toute tentative d'enregistrement de fausses informations ou informations
        trompeuses sur un compte;</p>
    <p class="mb-5">- tout acte réel ou tenté de votre part qui est raisonnablement jugé par nous
        comme étant illégal dans toute juridiction applicable, fait de mauvaise foi, ou destiné à nous frauder et/ou à
        contourner toute restriction contractuelle ou légale, indépendamment du fait que cet acte ou tentative d'acte
        nous cause effectivement un préjudice ou un dommage;</p>
    <p class="mb-5">b) Un "avantage injuste" inclura, sans limitation :</p>
    <p class="mb-5">- l'exploitation d'une faille, d'une échappatoire ou d'une erreur dans notre
        logiciel ou celui de tout tiers utilisé par vous en lien avec les Services (y compris en ce qui concerne tout
        jeu);</p>
    <p class="mb-5">a) abus des bonus ou d'autres promotions (tel que défini au paragraphe 11.4)</p>
    <p class="mb-5">- l'utilisation de joueurs automatisés ('bots'), ou d'autres logiciels tiers ou
        systèmes d'analyse; ou</p>
    <p class="mb-5">- l'exploitation par vous, d'une 'Erreur' telle que définie au paragraphe 18, dans
        tous les cas, soit à votre avantage et/ou à notre désavantage ou celui d'autrui.</p>
    <p class="mb-5">c) L'abus de bonus comprend, sans s'y limiter :</p>
    <p class="mb-5">i. violation des termes et conditions d'un bonus, des paris gratuits ou de toute
        autre offre promotionnelle</p>
    <p class="mb-5">ii. l'ouverture de plusieurs comptes pour réclamer plusieurs bonus;</p>
    <p class="mb-5">iii. Tous les bonus sont soumis à une limitation d'utilisation des bonus basée sur
        le moteur de bonus, et, sauf indication contraire, ils ne doivent pas être utilisés plus de 6 fois par mois
        calendaire; si pour une raison quelconque un code bonus est utilisé par un joueur individuel au-delà du montant
        indiqué, la société se réserve le droit d'enquêter davantage sur le modèle d'abus de bonus et de déduire les
        gains de bonus ainsi que tous les frais de tiers résultant de l'activité du joueur (frais de paiement, frais de
        fournisseurs, etc).</p>
    <p class="mb-5">i. perd le bonus alloué au titulaire du compte et tous les gains de ce bonus,
        et/ou</p>
    <p class="mb-5">ii. révoquer, refuser ou retirer une offre de bonus du titulaire du compte, et /
        ou</p>
    <p class="mb-5">iii. bloquer l'accès à certains produits, et/ou</p>
    <p class="mb-5">iv. exclure le détenteur du compte de toute offre promotionnelle future, et/ou</p>
    <p class="mb-5">b) en utilisant des facteurs ou influences externes injustes (communément connu
        sous le nom de tricherie)</p>
    <p class="mb-5">v. mettre fin au compte du titulaire avec effet immédiat.</p>
    <p class="mb-5">c) en tirant un avantage injuste (tel que défini au paragraphe 11.4) ;</p>
    <p class="mb-5">d) ouverture de tout compte en double; et/ou</p>
    <p class="mb-5">e) se livrer à des pratiques frauduleuses ou à des activités criminelles (telles
        que définies au paragraphe 11.4), constituent des "Pratiques Interdites" et ne sont pas autorisées. Nous
        prendrons toutes les mesures raisonnables pour prévenir et détecter de telles pratiques et pour identifier les
        joueurs concernés si cela se produit.</p>
    <p class="mb-5">8.2. Vous acceptez de ne pas participer à, ni d'être lié à, une forme quelconque
        de Pratique Interdite en relation avec votre accès ou utilisation des Services.</p>
    <p class="mb-5">a) Nous avons des raisons valables de croire que vous avez participé à ou avez été
        associé à toute forme de Pratique Interdite (et la base de notre conviction comprendra l'utilisation par nous de
        toute fraude, tricherie et pratiques de détection de collusion qui sont utilisées dans l'industrie du jeu et des
        paris au moment pertinent); ou</p>
    <p class="mb-5">b) Vous avez placé des paris et/ou joué à des jeux en ligne avec un autre
        fournisseur de services de jeux en ligne et êtes soupçonné (suite à cette activité) de toute Pratique Interdite
        ou de toute autre activité incorrecte ; ou</p>
    <h3>9.1 À condition que votre compte ne montre pas qu'un solde est dû, vous avez le droit de fermer votre compte et
        de résilier les Conditions d’Utilisation en nous en informant avec un préavis de pas moins de vingt-quatre
        heures à tout moment, en nous contactant via le Service Clientèle, dont les détails peuvent être trouvés dans la
        section Contactez-nous et Aide du site internet:</h3>
    <h3>CLÔTURE ET RÉSILIATION PAR NOUS</h3>
    <h3>SUSPENSION PAR NOUS</h3>
    <h3>9.10 La Société se réserve le droit, à sa seule discrétion, d'annuler tout gain et de confisquer tout solde
        (gains et dépôts) dans votre compte de paris, de résilier le Contrat et/ou de suspendre la fourniture des
        Services ou de désactiver votre compte si :</h3>
    <p class="mb-5">9.1.1 Indiquant votre souhait de fermer votre compte ; et</p>
    <p class="mb-5">9.8 Les paragraphes suivants survivront à toute résiliation des Conditions
        d'Utilisation : 19, 20, 21, 22, 23, 25, 26, 28, 29, 30, 31, 32 et 34 et tout autre paragraphe qui est nécessaire
        pour les besoins d'interprétation ; ainsi que toutes les sections pertinentes des Règles de Pari, des Règles de
        Jeu pertinentes et des Conditions Supplémentaires.</p>
    <p class="mb-5">9.1.2 Exposant les raisons pour lesquelles vous souhaitez fermer votre compte, en
        particulier si vous le faites en raison de préoccupations concernant le niveau de votre utilisation des
        Services.</p>
    <p class="mb-5">9.9 Nous aurons le droit de suspendre Votre Compte dans les circonstances
        expressément prévues dans les Conditions d'Utilisation. Lors de la suspension de Votre Compte : (a) aucune
        activité ne sera permise (y compris les dépôts, les retraits, les paris ou les jeux) jusqu'à la date à laquelle
        il est réactivé par nous ; (b) aucun bonus ou gains éventuels ne seront crédités sur le Compte ; et (c) nous
        aborderons le problème qui a donné lieu à la suspension du Compte dans le but de le résoudre dès que
        raisonnablement possible afin que le Compte puisse, selon le cas, être soit réactivé, soit fermé.</p>
    <p class="mb-5">i) Nous identifions que vous avez dissimulé ou interféré, ou que vous avez pris
        des mesures pour dissimuler ou interférer de quelque manière que ce soit avec l'adresse IP de tout appareil
        utilisé pour accéder à notre site (comme utiliser un Réseau Privé Virtuel « VPN »)</p>
    <p class="mb-5">ii) il vient à notre attention que le client a utilisé des documents falsifiés
        (photos, documents numérisés, captures d'écran, etc.) pendant la procédure de vérification ou à n'importe quel
        moment où l'Accord est actif</p>
    <p class="mb-5">iii) il existe un soupçon raisonnable que vous ayez commis ou tenté de commettre
        une fraude à la prime, seul ou en groupe</p>
    <p class="mb-5">iv) vous êtes impliqué dans toute activité frauduleuse, collusoire, manipulatrice
        ou autre activité illégale en lien avec votre participation ou celle de tiers, ou vous utilisez des méthodes ou
        techniques assistées par logiciel, ou des dispositifs matériels pour votre participation à l'un des services
        fournis par la Société.</p>
    <p class="mb-5">9.11 L'entreprise se réserve le droit de fermer des comptes existants sans
        explication. Dans ce cas, ou en cas de clôture de compte par un client, le solde intégral sera remboursé sauf en
        cas de soupçon de comportement frauduleux (par exemple, arbitrage, etc.). En cas de comportement frauduleux, les
        gains seront annulés et les dépôts seront remboursés après déduction des frais administratifs et de transaction
        correspondants et de tous les frais que l'entreprise est tenue de payer aux autorités compétentes en raison
        d'une réclamation d'un client. L'entreprise se réserve également le droit de signaler aux autorités appropriées
        si un client est impliqué dans une forme quelconque de comportement frauduleux présumé.</p>
    <p class="mb-5">9.12 Si, selon la seule détermination de la Société, le joueur est trouvé coupable
        de triche ou a tenté de frauder la Société, de quelque manière que ce soit, y compris, mais sans s'y limiter, la
        manipulation de jeux, l'utilisation de stratégies (par exemple, système Martingale, Anti-Martingale) visant des
        gains malhonnêtes ou une fraude de paiement, ou s'il/elle fait des commentaires faux et/ou malveillants
        concernant l'exploitation de la Société dans n'importe quel média ou forum, ou si la Société soupçonne le joueur
        de paiement frauduleux, y compris l'utilisation de cartes de crédit volées ou toute autre activité frauduleuse
        (y compris mais sans s'y limiter à tout rejet de débit ou autre annulation d'un paiement) ou des transactions
        interdites (y compris mais sans s'y limiter au blanchiment d'argent), la Société se réserve le droit de publier
        les actions du joueur avec son identité et son adresse e-mail, ainsi que de diffuser ces informations aux
        banques, aux sociétés de cartes de crédit et aux agences appropriées. De plus, la Société peut fermer tous les
        comptes et confisquer tous les soldes de comptes que le joueur a avec la Société.</p>
    <p class="mb-5">Nous nous réservons le droit d'annuler et de retenir tout ou partie des gains
        réalisés par un joueur, lorsque nous avons des motifs raisonnables de croire que ledit joueur agit ou a agi en
        liaison avec une tentative de fraude ou de nuire à l'entreprise et/ou aux services et/ou à la plateforme de
        quelque manière que ce soit.</p>
    <p class="mb-5">Dans l'intérêt de la protection des données, de la sécurité et de la prévention de
        la fraude, la Société n'autorise pas l'utilisation de tous les canaux de communication inclus dans les Services
        et/ou la Plateforme pour offrir ou promouvoir toute offre, produit ou service (qu'il soit de l’usager ou d'un
        tiers). Il est expressément interdit à l’usager de poster des informations ou de contacter nos clients pour
        offrir ou promouvoir toute offre, produit ou service.</p>
    <p class="mb-5">Nous répondrons à votre demande, en confirmant la fermeture de votre compte et la
        date à laquelle cette fermeture sera effective, dans un délai raisonnable, à condition que vous continuiez à
        assumer la responsabilité de toutes les activités sur votre compte jusqu'à ce que cette fermeture ait été
        effectuée par nous (à quel point les Conditions d'Utilisation seront résiliées).</p>
    <p class="mb-5">9.2 Lorsque vous demandez la clôture de votre compte conformément au paragraphe
        9.1, sous réserve du paragraphe 9.3, nous vous rembourserons tout solde restant sur votre compte.</p>
    <p class="mb-5">9.3 En cas de résiliation de Votre Compte en vertu de ce paragraphe 9, nous serons
        en droit (sans limiter nos droits en vertu du paragraphe 9.6) de retenir, sur le remboursement du solde impayé
        sur Votre Compte, tout fonds : (a) conformément au paragraphe 8 (Collusion, Tricherie, Fraude et Activité
        Criminelle) ; (b) conformément au paragraphe 20 (Violation des Conditions d'Utilisation) ; (c) comme prévu par
        les Conditions d'Utilisation (y compris, le cas échéant, le paragraphe 5.4) ; ou (d) comme requis par la loi ou
        le règlement.</p>
    <p class="mb-5">9.4 Lors du remboursement du solde impayé de Votre Compte, nous utiliserons le
        même mode de paiement que vous avez fourni lors de l'enregistrement de votre compte, ou tout autre mode de
        paiement que nous pourrions raisonnablement choisir.</p>
    <p class="mb-5">9.5 Lorsque vous avez fermé votre compte, nous pouvons dans certaines
        circonstances être en mesure de rouvrir votre compte avec les mêmes détails de compte qu'auparavant si vous nous
        le demandez. Dans de telles circonstances, bien que votre compte aura les mêmes détails de compte qu'auparavant,
        il sera soumis aux Conditions d'Utilisation qui sont en vigueur à la date de toute telle réouverture et tout
        droit antérieur (y compris, mais sans limitation, aux bonus ou gains contingents) ne sera plus valable.</p>
    <p class="mb-5">9.6 Nous sommes, à tout moment (et nonobstant toute autre disposition contenue
        dans les Conditions d'Utilisation), en droit de fermer Votre Compte et de résilier les Conditions d'Utilisation
        par notification écrite (ou tentative de notification) en utilisant Vos Coordonnées de Contact. En cas de
        résiliation par nous, nous vous rembourserons le solde de Votre Compte, sous réserve du paragraphe 12.7, aussi
        rapidement que raisonnablement possible suite à une demande de votre part.</p>
    <p class="mb-5">9.7 Lorsque nous clôturons Votre Compte et résilions les Conditions d'Utilisation
        conformément au paragraphe 11 (Collusion, Tricherie, Fraude et Activité Criminelle) ou au paragraphe 20
        (Violation des Conditions d'Utilisation), le solde de Votre Compte sera non remboursable et considéré comme
        étant abandonné par Vous dans la mesure de toute réclamation que nous pourrions avoir contre Vous à la date de
        cette clôture (que ce soit sous Votre Compte, qu'il y ait un Compte Dupliqué ou quelque chose de similaire). La
        clôture de Votre Compte et la résiliation des Conditions d'Utilisation, autre que conformément aux paragraphes
        11 ou 20 de ces Conditions Générales, n'affecteront pas les paris en cours, à condition que ces paris en cours
        soient valides et que Vous ne violiez pas les Conditions d'Utilisation de quelque manière que ce soit. Pour
        éviter tout doute, nous n'effectuerons aucun crédit de bonus dans Votre Compte, et Vous n'aurez droit à aucun
        gain éventuel, à aucun moment après la date à laquelle il a été fermé (que ce soit par nous en vertu des
        Conditions d'Utilisation, ou en réponse à Votre demande).</p>
    <h2>RÉSILIATION DES CONDITIONS D'UTILISATION FERMETURE ET RÉSILIATION PAR VOUS</h2>
    <h3>10. Inscription</h3>
    <p class="mb-5">10.1 Seuls les utilisateurs enregistrés peuvent participer aux programmes de bonus
        de l'entreprise. Pour s'inscrire, l'utilisateur doit remplir intégralement et avec précision le formulaire
        d'inscription.</p>
    <p class="mb-5">10.10 La société se réserve le droit, à tout moment, de vérifier l'identité du
        joueur, sans préavis, et avant de traiter les paiements; la société se réserve également le droit de retenir les
        retraits pendant le temps nécessaire pour vérifier l'identité du joueur.</p>
    <p class="mb-5">10.10.1 Veuillez noter que lorsque les dépôts ou retraits cumulés atteignent 2 000
        €, la procédure de vérification du joueur deviendra obligatoire. Le processus de vérification nécessitera des
        joueurs de fournir des documents tels que, mais sans s'y limiter, des cartes d'identité, des cartes bancaires,
        des relevés bancaires, la source de richesse, la source des fonds et des factures de services publics. En cas de
        fausse information personnelle fournie par les joueurs, le retrait peut être refusé et le compte utilisateur
        peut être résilié. Le joueur en sera informé par email. Dans certains cas, l'entreprise peut demander un selfie
        avec la carte d'identité, un selfie avec la carte d'identité et un signe spécial, ou même un appel ou un appel
        vidéo. Lorsqu'un document est demandé, le titulaire du compte doit télécharger cette documentation sur leur
        compte (Mon profil &gt; Documents). Lors de la demande de documents pour une vérification de compte, tous les
        retraits en attente seront annulés.</p>
    <p class="mb-5">10.10.2 Une fois la vérification terminée, le titulaire du compte peut demander un
        nouveau retrait. Dans le cas où le compte n'est pas vérifié dans les trente (30) jours suivant la date de la
        demande initiale, le compte sera gelé pour le jeu et les transactions. Dans le cas où, pour une raison
        quelconque, un titulaire de compte refuse ou est incapable de nous fournir l'un des documents demandés, la
        société se réserve le droit de suspendre le compte et de confisquer les fonds disponibles.</p>
    <p class="mb-5">10.10.3 La demande de remboursement peut également être refusée par le casino si
        le joueur fournit de fausses données personnelles ou modifie intentionnellement ses données personnelles afin de
        contourner le système.</p>
    <p class="mb-5">10.2 L'inscription et les paris ne sont autorisés que pour les personnes de plus
        de 18 ans (ou la tranche d'âge autorisée dans le pays donné à partir duquel l'utilisateur a ouvert un dépôt et
        effectué des paris). Les utilisateurs ont la responsabilité totale en termes de gestion de la légalité des jeux
        d'argent sur Internet dans la région où ils vivent et/ou de fournir aux autorités appropriées de leur pays des
        informations sur les gains. La Société se réserve le droit d'exiger une preuve d'âge et de bloquer le compte de
        l'Utilisateur avant de recevoir la documentation appropriée.</p>
    <p class="mb-5">10.3 Toutes les informations fournies lors de l'inscription doivent être exactes
        et complètes. En particulier, lors de l'utilisation de cartes de crédit ou de débit, le nom et le prénom du
        titulaire de la carte doivent correspondre au nom et au prénom indiqués dans le formulaire d'inscription, sinon
        le compte sera bloqué. Tous les paris effectués avant le blocage du compte sont reconnus comme valides.</p>
    <p class="mb-5">10.4 La Société se réserve le droit de bloquer les comptes des utilisateurs qui
        ont fourni de fausses informations, ainsi que de leur refuser le paiement de tous gains. À la demande de la
        société, l'utilisateur doit présenter un document officiel avec une photographie, confirmant son identité (une
        copie du passeport ou de sa carte d'identité nationale), une preuve d'authenticité des données d'adresse
        indiquées et de numéro de téléphone et une preuve de propriété du moyen de paiement.</p>
    <p class="mb-5">10.5 Chaque utilisateur peut n'avoir qu'un seul compte. Les utilisateurs
        enregistrés ne peuvent pas se réinscrire en tant que nouveau client avec un nouveau nom ou une nouvelle adresse
        e-mail. En cas de violation de cette règle, la société a le droit d'annuler tous les paris effectués par
        l'utilisateur.</p>
    <p class="mb-5">10.6 L'utilisateur n'a pas le droit d'autoriser un tiers à utiliser leur compte de
        jeu.</p>
    <p class="mb-5">10.7 Veuillez noter que vous ne devez pas nous envoyer les détails de votre compte
        de carte de crédit ou d'autres informations financières sensibles via un e-mail non crypté.</p>
    <p class="mb-5">10.8 La société permet à tous ses utilisateurs de choisir leur propre combinaison
        de nom d'utilisateur et de mot de passe. Les utilisateurs doivent garder ces informations secrètes. Si votre nom
        d'utilisateur et votre mot de passe sont correctement saisis lors de l'accès au site, tous les paris restent en
        vigueur et ne peuvent être annulés ou modifiés par l'utilisateur. Si vous soupçonnez que quelqu'un, autre que
        vous, connaît votre mot de passe, changez-le immédiatement sur notre site web. Si vous avez oublié le mot de
        passe ou une partie de celui-ci, veuillez cliquer sur le bouton "Mot de passe oublié ?" sur la page de connexion
        et suivez la procédure pour le réinitialiser.</p>
    <p class="mb-5">10.9 Les utilisateurs qui placent leurs paris dans la société via un téléphone
        portable doivent se rappeler que la société n'est pas responsable de toute perte de données dans le téléphone
        portable du client, et n'est pas responsable de toute commission des opérateurs mobiles et internet. En
        s'inscrivant, le client confirme qu'il accepte et est d'accord avec ces Termes.</p>
    <h3>Devise</h3>
    <p class="mb-5">11.1 Actuellement, les utilisateurs ont le droit de placer des paris dans les
        devises suivantes: EUR, USD, AUD, CAD, NOK, GBP, RUB, NZD, JPY, BRL. L'entreprise se réserve le droit de bloquer
        la réception des paris et les activités opérationnelles dans l'une des devises indiquées. Dans ce cas, tous les
        paiements nécessaires sur les comptes de la devise bloquée seraient effectués dans une autre devise équivalente
        au taux de change interbancaire de ce jour-là.</p>
    <h3>12. Le Programme de Bonus</h3>
    <p class="mb-5">12.1 Les bonus de tous les utilisateurs sont individuellement limités à une
        personne, une adresse postale, un numéro de téléphone et une adresse e-mail, un justificatif de paiement (tel
        qu'un numéro de carte ou un compte Skrill), ainsi que l'ordinateur utilisé (y compris l'institut, le club
        Internet et autres institutions publiques). La société se réserve le droit de refuser le bonus à tout
        utilisateur ou groupe d'utilisateurs. Les programmes de bonus sont disponibles uniquement pour les utilisateurs
        qui ont effectué un dépôt en devise réelle sur le compte de l'entreprise.</p>
    <p class="mb-5">12.3.5 Les bonus doivent être misés exclusivement sur des jeux valides qui
        appartiennent à la catégorie de jeu spécifique sous laquelle le bonus a été initialement offert. Par exemple, un
        bonus de Paris Sportifs doit être misé exclusivement sur les Sports, un bonus de Casino exclusivement sur les
        Machines à Sous, et un bonus de Casino en Direct exclusivement sur les jeux de Casino en Direct.</p>
    <p class="mb-5">12.3.6 Les bonus de casino (Machines à sous) sont parfois offerts sur des
        Fournisseurs de Services de Jeu (FSJ) spécifiques ou sur des machines à sous spécifiques. Par conséquent, seuls
        les paris effectués sur les FSJ sélectionnés et/ou sur des machines à sous spécifiques seront pris en compte
        pour les exigences de mise du bonus.</p>
    <p class="mb-5">12.3.8 Pour les tours gratuits sans dépôt, les jetons de casino et les paris
        gratuits attribués aux joueurs n'ayant jamais effectué de dépôt, un dépôt minimum ainsi qu'une mise de x1 (une
        fois) le montant du dépôt sont requis, avant de pouvoir retirer les gains. Les bonus de fidélité du casino, les
        tours gratuits, les jetons de casino et les bonus de fidélité du bookmaker sportif et les paris gratuits ne
        peuvent être attribués qu'aux joueurs entièrement vérifiés. Un seul bonus est autorisé par client, par foyer,
        par adresse, par ordinateur partagé et par adresse IP partagée, et par tous les détails de compte comme une
        adresse e-mail, les détails du compte bancaire, les informations de la carte de crédit et le numéro de compte du
        système de paiement. Tout abus de l'offre de bonus entraînera la fermeture du compte.</p>
    <p class="mb-5">12.3.9 Les paris gratuits offerts doivent être placés sur le Football avec une
        cote minimale de 2,00. Les marchés de handicap et de pari nul (Draw-no-bet) sont exclus.</p>
    <p class="mb-5">12.3.10 Le montant maximal de mise autorisé à placer avec de l'argent bonus au
        Casino est de 5 EUR (ou l'équivalent dans d'autres devises) ou 15% du montant total du bonus attribué (selon la
        première éventualité). Tous les tours de jeu ou rotations dépassant le montant de la mise maximale ne compteront
        pas pour les exigences de mise du bonus et tous les gains potentiels seront perdus.</p>
    <p class="mb-5">12.3.11 Si un joueur décide d'annuler un Bonus actif, il peut le faire depuis son
        compte. Cependant, tout l'argent bonus, tous les gains et toute somme misée résultant de son activité de paris
        avec le bonus seront définitivement perdus. Les paris bonus calculent d'abord l'argent réel puis le montant du
        bonus.</p>
    <p class="mb-5">12.2 En cas de violation de toute exigence des programmes de bonus, et aussi s'il
        existe des preuves de paris récurrents sur un même événement par un groupe de clients, ou de conspiration, quel
        que soit le résultat des paris en question, la société se réserve le droit de priver ces utilisateurs d'un bonus
        et de considérer les paris correspondants comme invalides. À des fins de protection contre la fraude, la société
        a le droit d'exiger un document prouvant l'identité du client avant de transférer un bonus.</p>
    <p class="mb-5">12.3.12 Les offres personnalisées communiquées exclusivement à un segment
        spécifique de joueurs par e-mail ou SMS sont uniquement disponibles pour les destinataires prévus de l'e-mail ou
        du SMS et pour eux seulement.</p>
    <p class="mb-5">12.3.13 Pour des offres personnalisées communiquées par email ou SMS, les joueurs
        sont invités à contacter notre équipe de support client afin de réclamer le bonus en fournissant tous les
        détails nécessaires (par exemple, code bonus, type d'offre, adresse e-mail du destinataire, etc.).</p>
    <p class="mb-5">12.3.14 À certaines occasions, nous offrirons des tours gratuits sous forme de
        jeton bonus de casino. Le montant crédité prend en compte la mise minimale autorisée sur le(s) slot(s)
        spécifique(s). Par exemple, 20 tours gratuits sur la machine à sous vidéo Guns N’ Roses de NetEnt seront
        attribués sous forme de Jeton de casino de 4 EUR (ou équivalent en devise) et sont destinés à être joués sur le
        slot spécifique (Jeton Bonus = Mise Min. (0,20 EUR) x nombre de tours (20) = 4 EUR).</p>
    <p class="mb-5">12.3.15 Aucun des matériaux promotionnels proposés via ce site Web n'est
        transférable, échangeable ou remboursable. Dans le cas où un certain matériel promotionnel n'est pas
        opérationnel en raison de restrictions techniques, géographiques ou légales, l'entreprise n'assume aucune
        responsabilité et se réserve le droit de ne pas indemniser ou rembourser les joueurs.</p>
    <p class="mb-5">12.3.16 Les joueurs peuvent être invités à fournir à tout moment tous les
        documents KYC nécessaires pour la vérification de leur compte (preuve d'identité, méthode(s) de paiement et
        résidence).</p>
    <p class="mb-5">12.3.17 En cas de doute concernant l'exigence de mise restante pour les bonus, les
        joueurs sont invités à contacter notre équipe de support client.</p>
    <p class="mb-5">12.3.18 Les paris ne seront pas comptés sur les jeux suivants. Vous êtes le seul
        responsable de ne pas inclure les jeux suivants dans votre pari bonus:</p>
    <p class="mb-5">Tous les jeux de vidéo poker, tous les jeux de roulette, tous les jeux "Quick
        Play", tous les jeux de blackjack, Hi Lo Fever, tous les jeux de baccarat, Poker 3 cartes, Roulette européenne,
        Blood Suckers, Blood Suckers II, The WishMaster, Dead or Alive, Dead or Alive II, Jack Hammer 2, Cloud Quest,
        Tower Quest, Pearls of India, Treasure Island, Eye of the Kraken et Solar Queen.</p>
    <p class="mb-5">La société se réserve le droit d'annuler les gains et tout montant misé si les
        clients découvrent qu'ils ont réussi à jouer aux jeux susmentionnés avec un bonus actif.</p>
    <p class="mb-5">12.3.19 Nous nous réservons le droit de modifier, annuler ou mettre fin à
        n'importe laquelle des promotions à tout moment et sans préavis.</p>
    <p class="mb-5">12.3 CONDITIONS PROMOTIONNELLES Sauf indication contraire, les conditions
        suivantes s'appliquent à tous les Bonus, Tours gratuits, Paris gratuits, Jetons de casino et tout autre
        "matériel promotionnel" proposé via le site web, les newsletters et les SMS.</p>
    <p class="mb-5">12.4.1 Le solde est directement payé dans votre solde en espèces, avec lequel vous
        pouvez jouer au Casino ou retirer.</p>
    <p class="mb-5">12.4.2 Votre ami doit s'inscrire via votre lien d'invitation personnel.</p>
    <p class="mb-5">12.4.3 Pour recevoir 5 USD sur votre solde, votre ami doit effectuer un dépôt d'au
        moins 10 USD (votre ami peut déposer 10 USD en plusieurs versements).</p>
    <p class="mb-5">12.4.4 Si un ami que vous avez invité n'est pas du même pays que vous, vous
        recevrez une récompense par défaut convertie en votre monnaie locale au taux de change équitable.</p>
    <p class="mb-5">12.4.5 Vous ne pouvez pas créer de nouveaux comptes de casino et vous inscrire via
        votre propre lien pour recevoir la récompense. Le programme "Parrainez un ami" est conçu pour nos joueurs afin
        d'inviter leurs amis sur la plateforme. Toute autre utilisation de ce programme est strictement interdite.</p>
    <p class="mb-5">12.4.6 Le Casino peut suspendre ou terminer le programme Parrainez un Ami ou la
        capacité de l'utilisateur à y participer à tout moment pour quelque raison que ce soit. Nous nous réservons le
        droit de suspendre des comptes ou de retirer le Solde en espèces si nous remarquons une activité que nous
        croyons abusive, frauduleuse ou en violation des Conditions de Service ou des Conditions du programme Parrainez
        un Ami. Nous nous réservons le droit d'examiner et d'enquêter sur toutes les activités de parrainage et de
        suspendre des comptes ou de modifier des parrainages à notre seule discrétion, comme jugé équitable et
        approprié.</p>
    <p class="mb-5">12.3.1 Les bonus de 'Bienvenue' et de 'Rechargement' du Casino (slots) et des
        Sports sont valables pour une période de 30 jours à compter du moment où ils sont crédités sur le compte des
        joueurs. Après la période de 30 jours, les matériaux promotionnels mentionnés ci-dessus expirent et ne sont plus
        réclamables ou remboursables.</p>
    <p class="mb-5">Le bonus de bienvenue et de rechargement du Casino en Direct 12.3.2 est valable
        pour une période de 14 jours à partir du moment où ils sont crédités sur le compte des joueurs. Après la période
        de 14 jours, lesdits matériaux promotionnels expirent et ne peuvent être réclamés ou remboursés.</p>
    <p class="mb-5">12.3.3 Tous les tours gratuits, paris gratuits, jetons bonus, sont valables pour
        une période de 7 jours à partir du moment où ils sont crédités sur le compte des joueurs. Après une période de 7
        jours, les matériaux promotionnels susmentionnés expirent et ne peuvent être réclamés ou remboursés. Les gains
        maximums provenant du Cashback / Bonus de fidélité sont limités à cinq (5x) fois le montant initial du bonus de
        Cashback donné. Tous les gains supérieurs à cela seront confisqués. Les gains maximums des promotions de
        saison/spéciales (y compris, mais sans s'y limiter, les bonus de Noël, les bonus de Pâques, les bonus
        d'Halloween) pour un seuil de bonus de 200% et plus, sont limités à quatre (4x) fois le montant du dépôt
        initial. Les gains maximums pour les bonus entre 150% - 199% du seuil de bonus, sont limités à huit (8x) fois le
        montant du dépôt initial. Les gains maximums pour les bonus entre 120% - 149% du seuil, sont limités à dix (10x)
        fois le montant du dépôt initial. Les gains maximums pour les bonus entre 100% - 119% du seuil, sont limités à
        quinze (15x) fois le montant du dépôt initial. Les gains maximums pour les bonus entre 25% - 99% du seuil, sont
        limités à vingt (20x) fois le montant du dépôt initial. Tous les gains supérieurs à ces limites seront
        confisqués.</p>
    <p class="mb-5">- Tours gratuits : x20 (vingt fois) le montant des gains</p>
    <p class="mb-5">Puce de Casino : x25 (vingt fois) le montant du bonus</p>
    <p class="mb-5">- Freebets : x1 (fois un) le montant des gains</p>
    <h3>13. Dépôts</h3>
    <p class="mb-5">13.1 Les méthodes de paiement disponibles sont déterminées par le pays et la
        devise sélectionnés lors de l'inscription. Une liste complète des frais, des limites à ceux-ci et d'autres
        éléments est affichée sur la page Dépôts et retraits. L'entreprise se réserve le droit de modifier ces termes et
        détails.</p>
    <p class="mb-5">13.2 Lors de toute transaction financière, il est nécessaire que le nom du
        propriétaire de la carte de crédit / débit ou du compte bancaire corresponde exactement au nom du propriétaire
        du compte approprié de l'entreprise. Sinon, l'entreprise se réserve le droit d'annuler toutes les transactions
        et de rembourser tous les paris effectués en utilisant le compte ou la carte de crédit / débit de quelqu'un
        d'autre.</p>
    <h3>14. Versement d'argent sur le compte</h3>
    <p class="mb-5">14.1 Si des fonds ont été transférés à l'Utilisateur par erreur, l'Utilisateur est
        tenu de notifier immédiatement l'entreprise. Tous les gains du client découlant d'une telle erreur seront
        considérés comme invalides, et ces paris sont remboursables, indépendamment du délai entre l'origine de l'erreur
        et le moment où elle a été constatée.</p>
    <p class="mb-5">14.2 Si les dépôts sur le compte ont été effectués dans un autre but que les
        paris, le poker, le casino et les paris financiers, la société (particulièrement en cas de soupçon de fraude) se
        réserve le droit d'annuler un dépôt et de recouvrer auprès de l'utilisateur tous les coûts engagés en
        conséquence du traitement du dépôt.</p>
    <p class="mb-5">14.3 Si le dépôt de l'utilisateur dépasse le montant du pari, à la demande de
        retrait du client, l'entreprise se réserve le droit de facturer à l'utilisateur tous les frais engagés suite à
        la gestion des dépôts et des retraits.</p>
    <h3>15. Contraintes Financières</h3>
    <p class="mb-5">15.1 La mise minimale sur n'importe quel événement est l'équivalent de 0,50 Euro
        dans la devise enregistrée du compte de jeu. La mise minimale en mode "Multiple" et la mise minimale sur une
        version du "Système" est l'équivalent de 0,50 Euros.</p>
    <p class="mb-5">15.3 Le montant maximum de la mise sur l'événement dépend du sport et des
        événements et est défini par le réseau de bookmakers spécifiquement pour chaque événement et chaque type de pari
        et peut être modifié sans préavis écrit. L'entreprise se réserve le droit de limiter le pari maximum sur des
        événements individuels, ainsi que l'introduction et la suppression de restrictions spécifiques sur les comptes
        des utilisateurs individuels sans préavis ni explication de motifs.</p>
    <p class="mb-5">15.4 Toutes les limites financières sont applicables à chaque utilisateur/groupe
        agissant ensemble, faisant des paris contenant les mêmes prédictions. Si l'utilisateur fait plusieurs paris
        contenant les mêmes prédictions, le paiement total sur ces paris peut être limité par la taille d'un paiement
        maximum régulé par les limites données.</p>
    <h3>16. Paiements</h3>
    <p class="mb-5">16.1 Les paiements sont traités dans un délai ne dépassant pas 72 heures à partir
        du moment où la demande a été approuvée par le département des paiements. Avant que le premier paiement ne soit
        effectué à l'utilisateur par des méthodes de paiement électroniques (Skrill, Webmoney, carte de crédit ou de
        débit, etc.), le client est tenu de télécharger une copie électronique de son passeport ou de sa carte
        d'identité nationale dans la section appropriée sous son profil. La société, à sa discrétion, peut demander au
        client des documents supplémentaires (par exemple, une preuve d'adresse, des selfies, etc.) avant leur premier
        paiement. N'oubliez pas que la contrefaçon est sévèrement punie par la loi et en cas de soupçon de placement
        d'une contrefaçon ou d'une copie modifiée des documents par des méthodes électroniques, la société se réserve le
        droit d'envoyer de tels documents aux autorités réglementaires appropriées.</p>
    <p class="mb-5">16.2 Avant d'effectuer le paiement, les employés de l'entreprise vérifieront la
        correspondance du nom, du prénom, du nom du père, des dates de naissance du client ainsi que d'autres données.
        Si des différences sont trouvées entre les données réelles et les données fournies par le client, l'entreprise
        se réserve le droit de rembourser tous les paris de l'utilisateur et de refuser de payer les gains à
        l'utilisateur à moins qu'il ne prouve son identité et l'exactitude des données saisies.</p>
    <p class="mb-5">16.3 Si il s'avère que l'utilisateur a ouvert plusieurs comptes au sein de
        l'entreprise, l'entreprise se réserve le droit de refuser de payer ces comptes (à l'exception des actifs de
        l'utilisateur légitimement transférés sur le compte de l'entreprise, après son paiement d'une amende de 20% du
        montant total des dépôts).</p>
    <p class="mb-5">16.4 Lors de la première demande de retrait, l'utilisateur doit entrer des détails
        de passeport ou d'ID personnel valides, exactement comme ils apparaissent sur le document, dans la langue du
        pays qui l'a émis (ou dans le cas de documents étrangers - en anglais).</p>
    <p class="mb-5">16.5 Les membres du groupe et de la famille doivent réguler leurs relations
        personnelles entre eux - les paiements sont effectués UNIQUEMENT au nom du propriétaire du compte approprié.</p>
    <p class="mb-5">16.6 L'utilisateur accepte de fournir à l'entreprise des informations sur son
        compte bancaire à partir duquel les paris seront effectués en particulier, afin de transférer ses gains.</p>
    <p class="mb-5">16.7 La société n'est pas responsable des modifications du nombre de paiements
        liées aux fluctuations de la monnaie (taux de change).</p>
    <p class="mb-5">16.8 Si l'Utilisateur a demandé un retrait d'un montant de 1 000 Euros ou plus (ou
        l'équivalent dans une autre devise au taux interbancaire), la Société paye une commission sur le transfert et
        les opérations ultérieures de retraits dans le mois calendaire donné. Sinon, la commission est payée à la banque
        par l'Utilisateur. Le montant maximum de retrait sur une période de 24 heures est de 1 000 Euros (ou
        l'équivalent dans une autre devise au taux interbancaire) sous réserve des limites spécifiques de son
        fournisseur de paiement. Pour les gains supérieurs à 10 000 Euros, les paiements seront effectués en versements
        mensuels égaux.</p>
    <p class="mb-5">16.9 La Société se réserve le droit de retrait des fonds en utilisant une méthode
        de paiement prioritaire pour elle-même pour les joueurs gagnants (y compris la carte de crédit/débit ou vers le
        compte bancaire du joueur).</p>
</div>
        `
    },
    'general-terms': {
        title: '',
        subtitle: '',
        content: `
            <div data-testid="politics-content-block" class="politics-content__block"><p class="mb-5">Introduction : www.Valor.Bet</p><p class="mb-5">1Win N.V., qui est enregistré à l'adresse Dr. H. Fergusonweg 1, Curacao, avec le numéro d'entreprise 147039, et détenteur d'un certificat d'exploitation, délivré pour une demande de licence de jeu numéro OGL/2024/587/0621 par le Curaçao Gaming Control Board, et tous les droits d'exploiter le logiciel de jeu. Les paiements sont traités par MFI INVESTMENTS LIMITED (numéro d'enregistrement : HE 386738, adresse : Avlidos St. 4, Mesa Geitonia, 4002, Limassol, Chypre), une filiale de la société 1Win N.V.</p><p class="mb-5">Les informations sur le site sont fournies par l'opérateur du site - la société ValorBet N.V., enregistrée à l'adresse : Palm Avenue 10, Rosebank, Sint Maarten. L'activité de la société ValorBet N.V. est licenciée et régulée par IslandGames N.V. (numéro de licence : No. 1234/JAZ2021-567 ; valide jusqu'au 31 décembre 2025) et par la législation de Sint Maarten. Les paiements sont traités par Global Invest Solutions Ltd (numéro d'enregistrement : HE 654321, adresse : Ocean Drive 22, Mesa Verde, 5678, Limassol, Chypre), une filiale de ValorBet N.V.</p><h2>Conditions Générales de Vente</h2><h3>LES PRINCIPALES DISPOSITIONS</h3><h3>DÉFINITIONS ET TERMES DE BASE</h3><h3>RÈGLES DU COMPTE</h3><h3>CRÉATION DE COMPTE</h3><h3>POLITIQUE DES MINEURS</h3><h3>IDENTIFICATION DU CLIENT</h3><h3>INSCRIPTIONS MULTIPLES</h3><h3>PAIEMENT DES GAINS</h3><h3>RÉGLEMENTATION LÉGALE / RESTRICTIONS</h3><p class="mb-5">1. L'entreprise de paris ValorCasino accepte des paris sur des événements sportifs et d'autres événements se déroulant dans tous les pays du monde</p><p class="mb-5">1. 1 annulation des paris;</p><p class="mb-5">2. 2 fermeture du compte du client sans remboursement ultérieur;</p><p class="mb-5">3. Tout pari placé sert de confirmation que le client est d'accord avec et accepte les règles de pari suivantes.</p><p class="mb-5">6. La société de paris n'accepte pas de réclamations concernant les divergences textuelles dans la translittération (traduction à partir de langues étrangères) des noms d'équipe, des noms de joueurs, des sites de compétition. Toutes les informations données dans le nom du tournoi sont informatives. Les erreurs éventuelles dans ces informations ne constituent pas une base pour l'annulation des paris.</p><p class="mb-5">7. Tous les événements sportifs seront considérés comme reportés et annulés uniquement s'il y a des informations provenant de documents officiels des organisations organisant les compétitions sportives, des sites web officiels des fédérations sportives, des sites web des clubs sportifs et d'autres sources d'informations sportives, et si les événements sportifs spécifiés dans la ligne de paris sont corrigés sur la base de ces données.</p><p class="mb-5">8. Les paris sur les championnats régionaux (football, futsal, hockey, etc.) sont calculés dans un délai de 7 jours (après la publication des résultats sur les sites web officiels de ces championnats). La liste des sites web officiels peut être trouvée dans la section "Principales sources d'information". En cas d'absence d'une des équipes lors du match, tous les paris seront remboursés avec un coefficient "1" (retour). L'équipe qui n'a pas participé au match est déclarée gagnante par forfait.</p><p class="mb-5">Ces Règles de Paris et de Paiement de la société de paris ValorCasino (ci-après dénommées les "Règles") déterminent l'ordre de l'acceptation des paris, des paiements, de la résolution des litiges, des aspects spécifiques des paris sur certains sports. Ces Règles régissent toutes les autres relations entre les participants de la société de paris ValorCasino et le client. Ces Règles s'appliquent aux clients du site ValorCasino.com et des sites affiliés. Paris - un accord sur le gain conclu entre le client et la société de paris, conformément aux Règles établies, tandis que le résultat de cet accord dépend de l'événement, à propos duquel il est inconnu s'il se produira ou non. L'acceptation des paris des clients se fait aux conditions proposées par la société de paris. Résultat - un résultat de l'événement (événements) sur lequel le pari a été placé. Client - une personne qui place un pari sur le résultat de l'événement dans la société de paris. Ligne - un ensemble d'événements, de résultats possibles de ces événements, de coefficients sur les résultats possibles de ces événements, leur date et heure, après quoi la société de paris cesse d'accepter des paris sur les résultats de ces événements. Annulation de pari - un événement pour lequel le calcul et le paiement ne sont pas effectués. En cas d'"annulation de pari", conformément à ces Règles, la transaction entre l'organisateur et le client est considérée comme nulle et non avenue et un remboursement est effectué pour un tel pari. Temps de jeu normal - la durée du match conformément aux règles de ce sport, y compris le temps additionnel ajouté par l'arbitre. Le temps de jeu normal n'inclut pas le temps additionnel, les prolongations, les tirs au but, etc.</p><p class="mb-5">1 Un individu ne peut pas participer à un jeu d'argent à moins d'être un titulaire de compte. Pour être enregistré en tant que joueur (et pouvoir placer des paris), un individu doit soumettre une demande d'inscription et fournir au moins les informations suivantes : date de naissance (prouvant que le joueur a plus de dix-huit (18) ans) ; prénom et nom de famille du joueur ; lieu de résidence du joueur ; adresse e-mail valide du joueur ; un nom d'utilisateur et un mot de passe</p><p class="mb-5">2 Une personne demandant à devenir titulaire de compte garantit en outre et déclare : être une personne physique (une entité légale ne sera pas acceptée en tant que titulaire de compte) ; ne pas résider dans : Aruba, Afghanistan, Albanie, Algérie, Angola, Australie, Bahamas, Bonaire, Botswana, Cambodge, Curaçao, Équateur, Éthiopie, France, Ghana, Guyana, Hong Kong, Iran, Irak, Israël, Italie, Koweït, Laos, Myanmar, Namibie, Nicaragua, Corée du Nord, Pays-Bas, Pakistan, Panama, Papouasie-Nouvelle-Guinée, Philippines, Singapour, Espagne, Sri Lanka, Soudan, Syrie, Taïwan, Trinité-et-Tobago, Tunisie, Ouganda, Royaume-Uni, États-Unis d'Amérique, Saba, Statia, St. Martin, Yémen, Zimbabwe. (veuillez noter les exclusions particulières pour les jeux de casino en direct, le poker et le bingo) ; ne pas être un joueur professionnel dans un sport, une compétition ou une ligue où ValorCasino propose des paris ; ne pas être limité par une capacité juridique restreinte ; ne pas agir au nom d'une autre partie ; ne pas être classé comme joueur compulsif ayant un problème de jeu, et/ou être inclus (volontairement ou involontairement) dans un registre ou une base de données de joueurs exclus ; ne pas déposer d'argent provenant d'activités criminelles et/ou non autorisées ; ne pas déposer d'argent via une carte que le titulaire de compte n'est pas autorisé à utiliser et/ou en utilisant une carte dans une juridiction où les paris et les jeux sont interdits ; ne pas mener d'activités criminelles dans lesquelles un compte ValorCasino est directement ou indirectement impliqué ; ne pas utiliser les Services s'il est illégal dans son pays de résidence ou s'il est autrement interdit pour lui d'ouvrir un compte de jeu, d'acheter ou d'utiliser des services de ValorCasino et/ou de participer aux jeux proposés. Il incombe au titulaire de compte de s'assurer que son utilisation du site Web et des services de ValorCasino est légale ; ne pas considérer le site Web ou les services comme offensants, répréhensibles, injustes ni indécents ; maintenir à jour ses informations de compte ValorCasino concernant les éléments suivants : nom et prénom, pays de résidence, adresse e-mail valide et numéro de téléphone. Ne pas créer de multiples comptes.</p><p class="mb-5">3 Une personne souhaitant s'inscrire garantit et déclare que toutes les informations fournies dans son formulaire de demande sont véridiques et correctes. À défaut, ValorCasino n'inscrira pas l'individu. En cas de doute sur l'exactitude des données d'un compte déjà créé, ValorCasino BC se réserve le droit de demander au parieur tout document de son choix confirmant son identité et les autres données transmises par le parieur, ainsi que d'annuler tout paiement en attendant la vérification de toutes les informations. La société de paris a le droit de demander l'envoi de documents par courrier. La vérification des documents peut prendre jusqu'à 72 heures à partir du moment de la réception des documents. Si l'on prouve que les informations reçues ne sont pas fiables, la société a le droit d'annuler indéfiniment tous les paris et de suspendre tous les paiements en espèces, ainsi que de continuer à vérifier le compte en demandant un ensemble de documents nécessaires pour une vérification fiable du compte.</p><p class="mb-5">2. Les utilisateurs des États-Unis, de la France, du Royaume-Uni, de l'Espagne et de l'Italie sont interdits de jouer sur ValorCasino.</p><p class="mb-5">Si vous avez moins de 18 ans, veuillez ne pas essayer de vous inscrire sur le site de paris de ValorCasino. ValorCasino est un opérateur de jeu socialement responsable et applique la stratégie de restreindre l'accès aux jeux de hasard aux personnes de moins de 18 ans. L'entreprise vérifie les parieurs, donc si vous créez un compte sur le site de ValorCasino, nous avons le droit de vous demander vos documents pour prouver votre âge et votre identité. Vous ne pouvez pas transférer, vendre ni donner en gage votre compte à une autre personne. Cette interdiction comprend le transfert de tout actif de valeur de quelque nature que ce soit, y compris, mais sans s'y limiter, la propriété de comptes, les gains, les dépôts, les paris, les droits et/ou les réclamations liées à ces actifs, qu'ils soient légaux, commerciaux ou autres. L'interdiction desdits transferts comprend également, sans s'y limiter, l'aliénation, le nantissement, la cession, l'usufruit, la négociation, la médiation, l'hypothèque et/ou le don en coopération avec un fiduciaire ou tout autre tiers, entreprise, personne physique ou morale, fondation et/ou association de quelque manière que ce soit.</p><p class="mb-5">Conformément à sa politique interne de lutte contre le blanchiment d'argent (AML), la société effectue des vérifications d'identité initiales et continues des utilisateurs de la société en fonction du niveau de risque potentiel associé à chaque utilisateur. La société vous demandera de fournir des informations minimales pour vérifier votre identité. La société enregistrera et conservera les données et les documents prouvant votre identité, ainsi que des informations sur les méthodes utilisées pour vérifier votre identité et les résultats des vérifications. La société peut vérifier vos données personnelles pour détecter des correspondances avec la liste des personnes suspectées de terrorisme établie par des organismes autorisés de l'État et des organismes indépendants. L'ensemble minimal de données d'identification comprend : le nom complet de l'utilisateur ; la date de naissance (pour les particuliers) ; l'adresse de résidence ou l'adresse d'enregistrement de l'utilisateur ; la source des fonds qui seront déposés sur le compte de la société. Afin de vérifier et de confirmer l'authenticité des données ci-dessus, la société peut demander les documents suivants à l'utilisateur : passeport ou carte d'identité, ou tout autre document les remplaçant, qui répond aux critères suivants : - contient le nom, la date de naissance et la photo du titulaire du document ; - a été délivré par des organismes gouvernementaux nationaux, facture récemment reçue pour le paiement des services publics (datant de moins de 3 mois) ou tout autre document pouvant confirmer l'adresse de résidence de l'utilisateur. La société peut également demander une identification vidéo ou d'autres informations supplémentaires, étayées par des documents pertinents. Dans certains cas, la société peut également demander des copies notariées des documents à l'utilisateur.</p><p class="mb-5">Chaque client enregistré peut avoir uniquement un compte. Lors de l'inscription sur le site web, la règle suivante s'applique : une famille, une adresse, une adresse e-mail, un numéro de carte de crédit/débit ou une adresse IP. L'administration de la société se réserve le droit de demander des données plus précises au client (données du passeport, permis de séjour, certificat de résidence) et de tenir une vidéoconférence. Un client enregistré ne peut pas être réenregistré en tant que nouveau client (sous un nouveau nom, avec une nouvelle adresse e-mail, etc.). En cas de confirmation du fait de la réinscription (y compris sous un nouveau nom), de la fourniture de documents frauduleux, invalides ou falsifiés (y compris des documents modifiés à l'aide de divers programmes et éditeurs graphiques), l'administration se réserve le droit d'annuler les paris effectués à partir d'un tel compte. En cas de refus de se soumettre à la procédure de vérification, l'administration se réserve le droit d'annuler les paris. L'administration se réserve également le droit de bloquer un tel compte (réenregistré) pendant la durée de la période d'examen (jusqu'à 2 mois). À la demande d'un client, une exception individuelle peut être faite par l'administration de ValorCasino.</p><p class="mb-5">Un client enregistré ne peut pas être réenregistré en tant que nouveau client (sous un nouveau nom, avec une nouvelle adresse e-mail, etc.). En cas de confirmation de la réinscription (y compris sous un nouveau nom), de la fourniture de documents appartenant à d'autres personnes, de documents invalides ou falsifiés (y compris des documents modifiés à l'aide de divers programmes et éditeurs graphiques), l'administration se réserve le droit d'annuler les paris effectués à partir d'un tel compte. En cas de refus de se soumettre à la procédure de vérification, l'administration a le droit d'annuler les paris. L'administration se réserve également le droit de bloquer un tel compte (réenregistré) pendant la durée de la période d'examen (jusqu'à 2 mois). À la demande d'un client, l'administration de ValorCasino peut accorder une exception individuelle.</p><p class="mb-5">1 Le calcul des profits du parieur est effectué dans un délai de 30 (trente) jours calendaires à compter de la date de publication officielle des résultats de l'événement le plus récent, qui peut être suivi dans l'historique des paris.</p><p class="mb-5">2 Après le calcul des profits, le parieur est tenu de vérifier l'exactitude du paiement calculé, et en cas de désaccord sur le paiement calculé, de notifier à la société de paris en indiquant le numéro de leur compte, la date du pari, l'heure, l'événement, le montant d'argent, le résultat sélectionné de l'événement, le coefficient, ainsi que les raisons du désaccord avec le paiement calculé. Toutes les réclamations concernant les paiements calculés sont acceptées dans un délai de 10 (dix) jours.</p><p class="mb-5">3 Un pari placé par le client sur un certain résultat d'un événement est considéré comme gagné si tous les résultats spécifiés dans ce pari sont prédits correctement.</p><p class="mb-5">4 Le service de sécurité de la société de paris ValorCasino a le droit de restreindre un retrait par l'un des moyens disponibles si le montant du dépôt ou du retrait de fonds du compte de jeu ne correspond pas aux montants des paris placés (le client doit effectuer des paris sur le montant du dépôt sur "Sport" avec des cotes d'au moins 1,3, des paris dans "TOTO", "Casino", "Live-games", "Live-Casino" et "Virtual-sports"). Le critère de retrait sera le montant des paris effectués avec ce dépôt</p><p class="mb-5">Les paris sont acceptés des personnes ayant atteint l'âge de 18 ans ou l'âge de la majorité dans leur juridiction (l'âge doit être supérieur à 18 ans) et qui acceptent les règles de prise de paris proposées par le bookmaker. Les paris ne sont pas acceptés : des personnes qui n'ont pas atteint l'âge de 18 ans au moment de la prise du pari ; des personnes qui participent aux événements sur lesquels les paris sont effectués (athlètes, entraîneurs, arbitres, propriétaires ou fonctionnaires de clubs et autres personnes ayant la capacité d'influencer le résultat de l'événement), ainsi que d'autres personnes agissant en leur nom ; des personnes représentant les intérêts d'autres bookmakers ; d'autres personnes dont la participation à l'accord avec la société de bookmaker est interdite par la loi applicable. 3. Le participant au pari assume la responsabilité de la violation de l'article 2 de ces règles. En cas de violation de ces règles, le bookmaker se réserve le droit de refuser de payer tout gain ou de rembourser les montants déposés, ainsi que d'annuler tout pari. La société de paris ne porte aucune responsabilité quant au moment où elle a connaissance du fait que le client appartient à l'une des catégories de personnes énumérées. Cela signifie que le bookmaker a le droit de prendre ces mesures à tout moment après avoir eu connaissance du fait que le client est l'une des personnes désignées. 4. La société de paris a le droit de ne pas accepter de paris de clients qui ne se conforment pas à ces règles. La société de paris se réserve le droit de refuser au client d'accepter tout type de paris si le client viole les normes de comportement public et l'ordre public. 5. La société de paris se réserve le droit de refuser d'accepter un pari à toute personne sans donner de raison. 6. Tous les calculs de paris sont basés sur les informations fournies par le centre de traitement. 7. La société se réserve le droit de fermer le compte de jeu et d'annuler tous les paris placés sur ce compte si elle a établi que : le participant au pari, au moment de la prise de paris, avait des informations sur le résultat de l'événement ; le participant au pari avait la possibilité d'influencer le résultat de l'événement en tant que participant direct au match (athlètes, arbitres, entraîneurs, etc.) ou en tant que personne agissant en leur nom ; les paris sont effectués par un groupe de participants au pari agissant de concert (un syndicat) dans le but de dépasser les limites fixées par la société ; un participant au pari a plusieurs comptes de jeu (enregistrement multiple) ; le participant au pari est suspecté d'utiliser un logiciel spécial ou des moyens techniques pour automatiser le processus de pari ; tout moyen malhonnête d'obtention d'informations ou de contournement des limites et des restrictions fixées par la société a été utilisé. 8. Le solde du compte du client dans les situations décrites ci-dessus peut ne pas être remboursable après la clôture de la procédure à la discrétion de la société de paris. Dans ce cas, le montant du solde est déterminé sans tenir compte des revenus obtenus de manière malhonnête. 9. La société se réserve le droit de ne pas compenser les pertes du joueur liées aux commissions des systèmes de paiement lors du dépôt et/ou du retrait de fonds sur le compte (à partir du compte) de la société de paris ValorCasino. La société se réserve le droit de procéder à la confirmation de l'identité du propriétaire par vidéoconférence et de demander des documents d'identité. 10. Si le service de sécurité de la société de paris a des doutes sur l'identité du participant au pari ou sur la fiabilité des informations fournies (adresse, carte de crédit ou de débit ou autres données), il a le droit de demander au participant au pari tout document de son choix, confirmant l'identité et les autres données transmises par le client, ainsi que d'annuler tout paiement jusqu'à ce que toutes les informations aient été vérifiées. La vérification des documents peut prendre jusqu'à 24 heures à partir du moment où les documents sont reçus. Si l'on prouve que les informations reçues ne sont pas fiables, la société se réserve le droit d'annuler tous les taux et de suspendre tous les règlements en espèces pour une durée indéterminée. 11. Le propriétaire du compte confirme/accepte que toutes les actions effectuées sur le compte sont effectuées par lui-même. Si des actions sur le compte sont effectuées par des tiers, le propriétaire est seul responsable de l'accès au compte. 12. Le propriétaire du compte confirme/accepte que toutes les actions effectuées sur le compte et utilisant ses données sont effectuées par lui-même ou avec son autorisation. Les utilisateurs de pays où les paris sportifs sont illégaux sont interdits d'utiliser la carte bancaire de ce pays pour effectuer une transaction sur le site. Le propriétaire de la carte bancaire est tenu de connaître la législation de son pays en ce qui concerne les activités de paris. La participation aux jeux de hasard par des personnes mineures n'est pas autorisée, tout comme l'utilisation de cartes bancaires de ces personnes pour effectuer des transactions sur le site Web du bureau de bookmaker. 13. La société se réserve le droit de mettre à jour le texte des règles et d'ajouter de nouvelles règles à tout moment. Dans ce cas, les nouvelles règles ou une nouvelle édition des règles entrent en vigueur et seront appliquées immédiatement après leur publication sur le site. 14. Pour éviter tout problème, ValorCasino vous donne les directives suivantes à suivre pour vous assurer que vous jouez de manière responsable : Avant de commencer le jeu, fixez-vous des limites de temps et d'argent que vous êtes prêt à dépenser. Jouez uniquement avec de l'argent que vous pouvez vous permettre de perdre. N'essayez pas de récupérer après une perte. 15. Évitez de jouer si vous êtes sous l'influence de l'alcool ou de toute autre substance</p><p class="mb-5">3. En cas de modifications apportées à ces règles, les clients en sont informés par le biais des annonces correspondantes. Les paris acceptés à partir de la date spécifiée dans l'annonce sont soumis aux règles modifiées. Les conditions des paris effectués avant cette date restent inchangées.</p><p class="mb-5">4. Nous encourageons le jeu en tant qu'activité de loisir agréable et croyons que le jeu peut faire partie de votre vie uniquement si vous vous maîtrisez et jouez de manière responsable.</p><p class="mb-5">1. En aucun cas, la société de paris ValorCasino ne saurait être tenue responsable de quelque perte ou dommage indirect, accessoire ou accidentel du client (y compris la perte de bénéfices), même si elle a été informée de la possibilité de tels pertes ou dommages.</p><p class="mb-5">2. Une défaillance de la connexion Internet au moment de la réception de la confirmation du pari placé par le client ne constitue pas un motif d'annulation du pari.</p><p class="mb-5">3. Tout pari placé sert de confirmation que le client est d'accord avec et accepte les règles de paris suivantes.</p><p class="mb-5">4. Seuls les résultats des événements annoncés par la société de paris servent de base au calcul des paris et à la détermination des gains. Les réclamations concernant les résultats des événements ne seront prises en compte qu'avec les documents officiels des fédérations sportives pertinentes.</p><p class="mb-5">5. Si des soupçons existent quant à des actions frauduleuses commises par un parieur à l'encontre de la société de paris (multiples comptes, paris effectués par des tiers, utilisation de logiciels pour l'automatisation des paris, paris d'arbitrage, non-utilisation du compte de paris pour parier, abus des programmes de fidélité, etc.), la société de paris se réserve le droit de prévenir de telles actions frauduleuses en:</p><h2>À PROPOS DE L'ENTREPRISE</h2><p class="mb-5">1. Les termes et conditions d'acceptation des paris (coefficients, options de résultat, combinaisons de types de paris disponibles, limites de mise maximales, etc.) peuvent être modifiés à tout moment et sont valables pour les nouveaux paris du client, tandis que les conditions des paris précédemment placés restent inchangées. Avant de conclure un accord, le client doit prendre connaissance de toutes les modifications apportées à la ligne actuelle. 2. Les paris placés sur des événements dont le résultat est connu au moment du pari peuvent être calculés avec le coefficient. 3. Conformément à ces règles, en cas de désaccord entre le client (le participant à l'accord) et la société de paris concernant des questions liées à l'exécution et à la mise en œuvre de l'accord conclu entre le client (le participant à l'accord) et la société de paris, y compris des questions concernant les paiements, le résultat des événements, les cotes des gains, les autres conditions essentielles de l'accord, ainsi que sur la reconnaissance de l'accord comme non conclu ou invalide, les parties établiront une procédure de réclamation obligatoire pour le règlement des litiges (procédure préalable à un procès). 4. Dans le cadre de la procédure de règlement des litiges préalable à un procès, une partie estimant que ses droits ont été violés est tenue de présenter une réclamation écrite correspondante à l'autre partie. Si le destinataire de la réclamation est une société de paris, la réclamation doit être faite à son lieu de résidence (adresse légale) qui est spécifié dans les documents constitutifs pertinents de la société de paris et confirmé par l'extrait pertinent du registre des entités juridiques. Si le destinataire de la réclamation est le client (le participant à l'accord), la réclamation doit être faite à son lieu de résidence (ou lieu de séjour). Toute réclamation peut également être faite par correspondance par e-mail : support@valor.bet 5. La réclamation doit être soumise dans un délai de 10 (dix) jours à compter du jour où la personne a été informée ou aurait dû être informée de la violation de ses droits. La réclamation doit être accompagnée de documents confirmant et justifiant les demandes formulées. En l'absence de demandes valides suffisantes dans la réclamation, la réclamation sera renvoyée sans autre examen. 6. Une réclamation valide fait l'objet d'un examen dans un délai de 20 (vingt) jours à compter de la date de sa réception par la partie. 7. Si la réclamation n'est pas examinée par la partie réceptrice dans le délai spécifié, la partie estimant que ses droits ont été violés a le droit de saisir un tribunal à l'adresse (adresse légale) de la société de paris. 8. La société se réserve le droit de suspendre l’acceptation des paris et le paiement des gains (y compris le refus, l’invalidation, le paiement de ces paris est effectué avec les cotes "1") : En cas d’erreurs imprévues (fautes de frappe évidentes dans la liste des événements proposés, incohérence des cotes dans la ligne et les taux) ; En cas de modification du format de la compétition par rapport aux règlements initiaux, etc. ; S’il y a des preuves de lutte antisportive ; Lors de l’utilisation de paris répétés sur les mêmes issues ou sur des issues dépendantes.</p><h2>RÈGLES D'ACCEPTATION DES PARIS ET DE RÈGLEMENT DES LITIGES (PROCÉDURE PRÉLIMINAIRE)</h2><p class="mb-5">Veuillez entrer le nom complet et le prénom du propriétaire du compte de paiement à partir duquel l'argent sera transféré. N'utilisez pas les informations personnelles d'autres personnes pour retirer de l'argent.</p><h2>SÉCURITÉ DU MOT DE PASSE ET DU COMPTE</h2><p class="mb-5">La société ValorCasino propose l'un des types de bonus, appelé "Code promotionnel". Le code promotionnel est un code alphanumérique fourni au client de manière individuelle à la discrétion de la société de paris. Le code promotionnel peut accorder au client l'accès à des fonds bonus ou offrir une assurance/remboursement de pari. En cas de calcul de pari avec un code promotionnel avec un coefficient de 1 (push/annulation), le code promotionnel reste disponible pour une utilisation ultérieure par le client. Les paris avec code promotionnel ne peuvent pas être combinés avec d'autres offres spéciales, sauf si cela est spécifié dans les règles de placement du code promotionnel. Les comptes multiples ne participent pas à cette promotion. Le bonus ne peut être attribué qu'une seule fois par compte, adresse, adresse e-mail, numéro de carte de crédit/débit ou adresse IP. La société se réserve le droit de retenir tout pari gratuit si le service de sécurité a des préoccupations concernant la violation des règles ou la découverte de paris inhabituels. Un code promotionnel ne peut être utilisé qu'une seule fois par un seul client.</p><h2>PROMOTIONS ET BONUS</h2><p class="mb-5">1 L'offre de bonus est disponible pour les nouveaux clients de ValorCasino. L'offre de bonus est disponible pour les devises suivantes : EUR, USD, RUB, BYN, UAH, KZT, INR, IDR, THB, VND, TRY, PLN, BDT, KHR, KRW, MYR, BND, SGD, PKR, UZS, KES, UGX, GHS, TZS, XAF, NGN, CFA, XOF, AZN, IRR, CZK, BRL, PHP, AMD, GEL, RWF, MDL, KGS, TJS, NOK.</p><p class="mb-5">10 Seul le premier dépôt donne droit au bonus. Les fonds bonus et les tours gratuits seront crédités sur le solde bonus dans les 72 heures suivant le moment du dépôt promotionnel.</p><p class="mb-5">11 Bonus "Sport" : afin de convertir avec succès les fonds bonus en argent réel et de les retirer du compte de jeu, il est nécessaire de remplir les conditions suivantes dans les 30 jours suivant la réalisation du premier dépôt : placer le bonus reçu en cinq fois la somme à partir du compte bonus en utilisant des paris "accumulateurs". Au moins 3 événements dans l'accumulateur doivent avoir des coefficients d'au moins 1,40, le nombre maximum d'événements dans l'accumulateur est illimité. Si un joueur ne parvient pas à remplir les conditions de la promotion dans le délai spécifié, le solde du bonus est annulé.</p><p class="mb-5">12 Bonus "Casino" : pour convertir avec succès les fonds bonus en fonds réels et les retirer d’un compte de jeu, vous devez multiplier le montant du bonus reçu par x60 dans les sections "Casino" des "Jeux en direct" et "Sports virtuels", dans les 72 heures suivant le premier dépôt. Veuillez noter que, dans certains jeux, le montant du pari n’est pas entièrement pris en compte lors de la mise du bonus.</p><p class="mb-5">14 Si un joueur a des fonds à la fois sur le solde réel et sur le solde bonus, alors toutes les mises sont d'abord effectuées à partir des fonds du solde réel. Les fonds réels sont utilisés pour les paris jusqu'à ce que le solde réel soit de 0. Les fonds du solde bonus ne seront utilisés pour les paris que si le solde réel est de 0. Veuillez vérifier la liste des jeux disponibles pour le solde bonus dans les Termes et Conditions, section Promotions et Bonus.</p><p class="mb-5">15 Aucun retrait ne peut être effectué avant que toutes les conditions de l'offre ne soient remplies. Les paris qui ne répondent pas aux conditions énoncées aux clauses 10 et 11 de ces règles ne sont pas pris en compte lors de la mise en jeu des fonds bonus.</p><p class="mb-5">16 Les paris calculés après plus de 30 jours (pour les paris sportifs) et 72 heures (pour le casino) après l'activation de l'offre bonus ne sont pas pris en compte.</p><p class="mb-5">17 Tant qu'il existe au moins un compte bonus ouvert, le joueur peut effectuer un retrait d'un montant de 0 ou plus jusqu'à concurrence du total des dépôts misés, à condition que le solde de jeu contienne au moins deux fois la valeur nominale du bonus. Un retrait réussi est considéré comme le passage de la demande de retrait à l'état "Complété". Le retrait de fonds en violation des termes de cette clause des règles sera considéré comme le refus du joueur du bonus, auquel cas le solde bonus sera annulé. Cette règle est en vigueur à partir de la création du compte bonus jusqu'à ce que le montant du bonus apparaisse sur le compte de jeu.</p><p class="mb-5">18 L'offre de bonus ne peut être utilisée qu'une seule fois. Soyez attentif lors de la sélection d'un bonus lors de l'inscription. En choisissant l'une des options (pour les paris sportifs ou les casinos), vous renoncez automatiquement à utiliser la seconde. Vous ne pouvez pas changer votre choix à l'avenir.</p><p class="mb-5">19 En activant le bonus lors de l'inscription, le client accepte automatiquement les termes et conditions de cette promotion</p><p class="mb-5">20 La possibilité de refuser de participer à la promotion de bonus n'est disponible qu'à l'étape de la création du premier dépôt lorsque l'offre de bonus est activée, ou si les conditions de mise en jeu ne sont pas remplies.</p><p class="mb-5">21 La possibilité de refuser des fonds bonus n'est disponible qu'à l'étape de l'inscription, lors de l'activation de l'offre de bonus, ou en cas de non-respect des conditions de mise en jeu.</p><p class="mb-5">22 Le bonus est disponible uniquement pour un compte de jeu par personne, famille, appartement, ordinateur ou adresse IP. Si vous êtes suspecté de violer les règles par le biais de multiples inscriptions (comptes frauduleux, groupes de jeu), BC ValorCasino annulera le bonus. Si vous créez un deuxième compte, il sera supprimé, et tous les bonus de jeu et les gains pourraient être annulés.</p><p class="mb-5">23 La société se réserve le droit d'annuler le bonus et/ou de refuser de le fournir au client sans indiquer de raisons, si lors de la vérification du compte de jeu, des violations de l'honnêteté du jeu et/ou l'utilisation de stratégies considérées comme malveillantes à sa discrétion sont constatées. Le retrait des fonds bonus est possible à tout moment sans préavis au client, mais pas après le retrait et/ou la mise en jeu de ce bonus. En cas de litige, la décision des responsables autorisés de la société est définitive.</p><p class="mb-5">24 La société se réserve le droit d'effectuer la procédure de vérification du propriétaire du compte de jeu, ainsi que de suspendre la réception des fonds bonus sur le compte de jeu pendant la durée de la procédure de vérification.</p><p class="mb-5">25 En cas de suspicion de tricherie de la part d'un client par les responsables de la société, «BC ValorCasino» se réserve le droit d'appliquer des conditions individuelles pour la mise en jeu du bonus reçu à cette catégorie de clients.</p><p class="mb-5">26 Les conditions générales actuelles peuvent être modifiées et mises à jour à tout moment.</p><p class="mb-5">3 La taille du bonus standard est de 100% du montant du dépôt. Par exemple, le client N a effectué un dépôt de 100 USD le lendemain de son inscription. Le montant du bonus sera de 100%, c'est-à-dire 100 USD.</p><h2>COMPTES BONUS</h2><p class="mb-5">Exigences de mise - signifie le montant total des paris que vous devez engager avant que le Bonus et les gains éventuels ne soient transférés dans votre Solde en espèces et puissent être retirés. Coefficient de mise - signifie le coefficient calculé comme suit : montant des paris à placer / montant du bonus attribué. Contribution des jeux - signifie le pourcentage des paris effectués dans le jeu qui contribuent aux exigences de mise. Exemple : Vous avez reçu un bonus de 100 € avec un coefficient de mise de x30. Pour transférer le solde du bonus en solde en espèces, vous devez placer 3 000 € de paris (100 * 30). 3 000 € constituent votre Exigence de mise. Si vous choisissez le jeu avec une contribution de 100 %, alors le calcul de l'Exigence de mise est le suivant : (100 € * 30) * 100 % = 3 000 €. Si vous choisissez le jeu avec une contribution de 10 %, alors le calcul de l'Exigence de mise est le suivant : (100 € * 30) * 10 % = 30 000 €. Sur https://Valor.Bet, les contributions suivantes s'appliquent aux jeux : Machines à sous de casino (à l'exception du vidéo poker) - 100 % Poker, vidéo poker, roulette, baccarat, blackjack, jeux de table, loteries, cartes à gratter, bingo, keno - 0 % Casino en direct Toutes les catégories - 0 % Jeux en direct / Jeux TV Toutes les catégories - 10 % Sport virtuel Toutes les catégories - 10 % Aviateur - 0 %</p><h2>CONTRIBUTION DE MISE DU JEU</h2><p class="mb-5">1. La société de paris accepte des paris basés sur la liste des événements avec certaines cotes de gain. 2. La réception de paris répétés sur un résultat ou une combinaison de résultats d'un joueur peut être limitée par la décision de la société de paris. 3. Un pari est considéré comme accepté après son enregistrement sur le serveur et sa confirmation en ligne. Les paris enregistrés ne peuvent pas être annulés ni corrigés. 4. Les paris ne sont acceptés que dans la limite du solde actuel du compte du client. Après l'enregistrement d'un pari, son montant est débité du compte. Après le calcul des cotes, le montant gagnant est crédité sur le compte du client. 5. Les paris sont acceptés avant le début de l'événement ; la date de l'événement, l'heure de début et les commentaires qui y sont associés, indiqués dans la liste, sont indicatifs. Si, pour une raison quelconque, le pari est fait après le début réel de l'événement, le pari est considéré comme invalide. L'exception concerne uniquement les paris sur les événements en direct, c'est-à-dire les paris pendant le match. De tels paris sont considérés comme valides jusqu'à la fin de l'événement. 6. Les paris en LIGNE et en DIRECT ne peuvent pas être modifiés ou supprimés, sauf dans les cas spéciaux décrits dans les Règles pour les Sports. Enchère minimale et maximale : 1. La mise minimale sur n'importe quel événement est de USD - 0,2 / EUR - 0,2 / RUB – 10 / TRY – 1 / KZT - 100 / UAH - 5. 2. La mise maximale est fixée par la société de paris pour chaque événement séparément. La mise maximale dépend du sport et de l'événement. Si le combiné (système) comprend plusieurs événements avec des restrictions différentes sur la mise maximale, la taille de la mise maximale est fixée égale à la valeur minimale. 3. Le gain maximum par pari est de 2 000 000 de roubles (équivalent en devises). 4. La société de paris a le droit de limiter la mise maximale, les cotes pour des événements séparés, ainsi que de limiter ou d'augmenter la mise maximale, les cotes pour un client séparé sans préavis ni explication. Politique d'annulation : 1. En cas d’annulation du pari, un remboursement est effectué à un taux unique. Dans les accumulateurs et les systèmes, lors de l’annulation du pari pour un ou plusieurs événements, le calcul des gains pour ces événements n’est pas effectué. 2. En cas de taux mal calculés, ces paris sont recalculés.</p><h2>RÈGLES D'ACCEPTATION DES PARIS</h2><p class="mb-5">La société de paris propose les types de paris suivants : 1. Pari simple - Il s'agit d'un pari sur le résultat d'un événement unique. Gagner un pari simple équivaut à la multiplication du montant du pari par la cote établie pour ce résultat. 2. Accumulateurs - Il s'agit d'un pari sur les résultats de plusieurs événements indépendants. La victoire de l'accumulateur équivaut à la multiplication du montant du pari par les coefficients de tous les résultats inclus dans l'accumulateur. Perdre l'un des résultats des accumulateurs signifie perdre tout l'accumulateur. 3. Système - Il s'agit d'un pari sur une combinaison complète d'accumulateurs de taille définie à partir d'un nombre présélectionné d'événements. Le nombre maximum d'options dans le système est de 924. Le nombre maximum d'événements dans le système est de 12. Paris acceptés pendant le match (paris en direct) 1. Les paris en direct sont acceptés sur les résultats principaux et supplémentaires. Il est possible de faire des paris en direct simples et de les combiner en un accumulateur. 2. Un pari est considéré comme accepté après son enregistrement sur le serveur, puis une confirmation en ligne est émise. Le pari accepté n'est pas modifiable. En cas de survenance des circonstances spécifiées dans la section Résultats des matchs, la date et l'heure de leur début, la procédure de résolution des litiges 3. Dans certaines circonstances spécifiées dans la section "Règles pour les sports", il est possible de calculer un pari en direct avec un coefficient de. 4. La société de paris n'est pas responsable des inexactitudes dans les résultats actuels des matchs pour lesquels des paris en direct sont acceptés. Les clients doivent également utiliser d'autres sources indépendantes d'information. 5. Les paris en direct ne peuvent pas être modifiés ou supprimés.</p><h2>TYPES DE PARIS</h2><p class="mb-5">1 Il est autorisé d'inclure seulement un des résultats dépendants dans un pari accumulateur. Si deux événements dépendants ou plus sont inclus dans un même pari accumulateur ou système, tous les événements ayant les cotes les plus basses sont exclus de ce pari accumulateur ou système. 2 Les paris "L'équipe marquera un penalty Oui/Non" sont considérés comme perdus s'il n'y a pas eu de tirs au but pendant le temps réglementaire. 3 Les paris "Prochain but", "Comment le but sera marqué" sont considérés comme perdus si le but dont le numéro a été indiqué sur le bulletin de pari n'a pas été marqué.</p><h2>RESTRICTIONS POUR L'INCLUSION DE CERTAINS RÉSULTATS D'ÉVÉNEMENTS</h2><p class="mb-5">1. Il est possible de déposer et de retirer des fonds de votre compte de différentes manières. Toutes les méthodes de dépôt et de retrait de fonds sont présentées sur la page "Dépôt".</p><p class="mb-5">• Pour transférer de l'argent entre les systèmes de paiement;</p><p class="mb-5">• Pour déposer des fonds et retirer des fonds sans placer de paris.</p><p class="mb-5">Dans ces cas, l'argent sera retourné sur votre compte.</p><p class="mb-5">Le retrait de fonds n'est possible que pour les coordonnées avec lesquelles le dépôt a été effectué. Lors du dépôt de différentes manières, le retrait doit être proportionnel au montant du dépôt.</p><p class="mb-5">ValorCasino a le droit de refuser le retrait sur les systèmes de paiement en offrant plutôt un paiement par virement bancaire.</p><p class="mb-5">ATTENTION! L'administration ne recommande pas de déposer de l'argent sur le compte à partir de portefeuilles électroniques appartenant à quelqu'un d'autre. L'administration se réserve le droit de retourner les fonds sur les comptes du propriétaire du portefeuille sans préavis.</p><p class="mb-5">Dans des cas particuliers, pour certains comptes de jeu de clients, la compensation des commissions des systèmes de paiement pour le dépôt et le retrait de fonds, normalement prise en charge par la société de paris ValorCasino, pourrait être annulée.</p><p class="mb-5">7. Termes et conditions du service de dépôt instantané en 1 clic</p><p class="mb-5">• Vous acceptez de payer tous les services et/ou biens ou autres services supplémentaires commandés par Vous sur le Site Web, ainsi que tous les coûts supplémentaires (si nécessaire), y compris, mais sans s'y limiter, toutes sortes de taxes, de droits, etc. Vous êtes entièrement responsable du paiement en temps voulu de toutes les sommes dues. Le fournisseur de services de paiement garantit uniquement l'exécution du paiement pour le montant indiqué par le Site Web et n'est pas responsable du paiement par l'utilisateur du Site Web desdits montants supplémentaires mentionnés. Après avoir cliqué sur le bouton "Déposer en 1 clic", vous acceptez le fait que le paiement a été traité et qu'il a été irrévocablement exécuté. En cliquant sur le bouton "Déposer en 1 clic", vous acceptez que vous ne pourrez pas demander le remboursement du paiement ni solliciter son remboursement. En passant une commande sur le Site Web, vous confirmez et indiquez que vous ne violez pas les lois du pays où vous passez la commande et effectuez le paiement. De plus, en acceptant les conditions de ces Règles (et/ou les Conditions générales), vous, en tant que titulaire de la carte de paiement, confirmez que vous avez le droit d'utiliser les biens et/ou services offerts sur le Site Web.</p><p class="mb-5">• Si vous utilisez les services du Site Web qui offrent des services spécifiques tels qu'un service de jeux, vous fournissez une confirmation légalement contraignante que vous avez atteint ou déjà dépassé l'âge légal, tel que légalement autorisé dans votre juridiction, afin d'utiliser les services fournis par le Site Web.</p><p class="mb-5">2. Toutes les demandes de retrait de fonds sont traitées 24 heures sur 24, 7 jours sur 7. Les retraits peuvent prendre jusqu'à 72 heures. Les remboursements peuvent également prendre jusqu'à 72 heures.</p><p class="mb-5">• En commençant à utiliser les services du Site Web, vous assumez la responsabilité légale de vous conformer aux lois de tout pays où ce service est utilisé, et vous confirmez que le fournisseur de services de paiement n'assume aucune responsabilité pour toute violation illégale ou non autorisée. En acceptant d'utiliser les services du Site Web, vous comprenez et acceptez que le traitement de vos paiements est effectué par le fournisseur de services de paiement, et qu'il n'existe aucun droit légal de retourner les services et/ou les biens qui ont déjà été achetés, ni d'autres options d'annulation de paiement. Si vous souhaitez refuser l'utilisation du service pour un prochain achat de service et/ou de biens, vous pouvez le faire en utilisant le Compte Personnel sur le Site Web.</p><p class="mb-5">• Le fournisseur de services de paiement n'est pas responsable du refus/de l'incapacité à traiter les données associées à votre carte de paiement, ni du refus lié au fait de ne pas avoir obtenu l'autorisation de la banque émettrice pour effectuer un paiement avec votre carte de paiement. Le fournisseur de services de paiement n'est pas responsable de la qualité, de la quantité, du prix de tout service et/ou bien qui vous sont offerts ou que vous achetez sur le Site Web en utilisant votre carte de paiement. En payant pour tout service et/ou produit du Site Web, vous êtes d'abord tenu de respecter les règles d'utilisation du Site Web. Veuillez noter que vous, en tant que propriétaire de la carte de paiement, êtes seul responsable du paiement en temps voulu de tout service et/ou bien que vous avez commandé via le Site Web, ainsi que de tous les coûts/commissions supplémentaires liés à ce paiement. Le fournisseur de services de paiement n'est qu'un exécutant de paiement pour le montant indiqué par le Site Web et n'est pas responsable de la tarification, des prix totaux et/ou des montants totaux. </p><p class="mb-5">• En cas de situation liée à votre désaccord avec les conditions susmentionnées et/ou pour d'autres raisons, nous vous demandons de refuser le paiement en temps opportun et, si nécessaire, de contacter directement l'administrateur ou le support du Site Web.</p><p class="mb-5">Liste des juridictions interdites : Corée du Nord, Myanmar, Iran</p><p class="mb-5">3. En effectuant un dépôt, vous confirmez que vous avez le droit d’utiliser les Services et les services du Site, offerts via le site actuel. Dans le cas où vous utilisez les Services via le Site, offrant des services spécifiques.</p><p class="mb-5">4. Si vous souhaitez demander un remboursement, vous devez contacter l'équipe de support. Nous ne pouvons effectuer un remboursement que sur le compte que vous avez utilisé pour recharger votre compte. Une procédure d'identification peut être requise. Dans ce cas, il peut vous être demandé de fournir une copie de votre passeport ou de votre carte d'identité. De plus, si vous avez effectué un dépôt à l'aide d'une carte bancaire, vous devrez fournir une photo de la carte (des deux côtés). Les six premiers chiffres et les quatre derniers chiffres du numéro de carte, le nom du titulaire de la carte doivent être visibles, le code CVV2 doit être masqué.</p><p class="mb-5">Nous nous réservons le droit de facturer des frais correspondant à nos propres coûts pour le retrait de fonds qui n'ont pas été utilisés pour effectuer des paris ou jouer à des jeux.</p><p class="mb-5">5. Le service de sécurité de Valor Casino se réserve le droit de:</p><p class="mb-5">• bloquer le retrait des fonds avec l'un des moyens disponibles, dans le cas où le montant des paris est inférieur au montant des dépôts depuis le moment de l'inscription. De plus, les paris avec un coefficient de 1,3 ou plus sont pris en compte.</p><p class="mb-5">• refuser de retirer des fonds si le compte de paris n'est pas utilisé à des fins de jeu ; Il est nécessaire de vérifier votre compte de jeu avant de retirer des fonds. Vous devez remplir correctement votre profil pour la vérification, fournir des copies et des photos de documents d'identité (y compris le passeport), ainsi que répondre aux questions du service de support.</p><p class="mb-5">6. Le service de sécurité de ValorCasino ne recommande pas: <br> Liste des juridictions interdites: Corée du Nord, Myanmar, Iran.</p><h2>FUNDS DEPOSIT AND WITHDRAWAL</h2></div>
        `
    },




}

const policyTranslations = {
    es: policyContent,
    en: policyContentEn,
    pt: policyContentPr,
    ar: policyContentAr,
    fr: policyContentFr,
};

function PoliciesContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState('user-agreement');

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab && policyTabs.find(t => t.id === tab)) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        router.push(`/policies?tab=${tabId}`);
    };

    const currentContent = (policyTranslations[language as keyof typeof policyTranslations] as typeof policyContent)[activeTab as keyof typeof policyContent];

    return (
        <div className="min-h-screen bg-[#f5f6fa]">
            {/* Mobile Header */}
            <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
                <h1 className="text-lg font-semibold text-gray-900">{t('page.policies')}</h1>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-start lg:m-8 bg-white lg:py-24 lg:rounded-2xl">
                {/* Mobile Sidebar - Collapsible */}
                <div className="lg:hidden bg-white border-b border-gray-200">
                    <div className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                            {policyTabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    className={`px-3 py-2 rounded-full text-xs font-medium transition-colors ${activeTab === tab.id
                                            ? 'bg-[#202040] text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {t(tab.labelKey)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Desktop Sidebar */}
                <aside className="hidden lg:block w-3/12 bg-[#8888a6] border-r border-gray-200 px-3 py-5 rounded-2xl">
                    <div className="space-y-2">
                        {policyTabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-black transition-colors ${activeTab === tab.id
                                        ? 'bg-[#202040] text-white'
                                        : 'text-white hover:bg-gray-100 hover:text-gray-800'
                                    }`}
                            >
                                {t(tab.labelKey)}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 lg:p-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-6">
                            <p className="text-orange-500 text-sm font-medium mb-2">{currentContent.subtitle}</p>
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{currentContent.title}</h1>
                        </div>

                        <div>
                            <div
                                className="prose prose-gray max-w-none prose-sm lg:prose-base"
                                dangerouslySetInnerHTML={{ __html: currentContent.content }}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default function PoliciesPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        }>
            <PoliciesContent />
        </Suspense>
    );
}
