// Estructura de datos para simular diferentes conversaciones
const chatData = {
    // Chat 1: Mariana González (Activo por defecto)
    '1': {
        name: 'Mariana González',
        avatar: '👤',
        messages: [
            { type: 'received', text: 'Mariana González', time: '14:45 PM', isHeader: true }, // Encabezado de la burbuja
            { type: 'received', text: 'Buenas tardes.', time: '14:45 PM' },
            { type: 'received', text: '¿Cuándo pueden venir a medir el sofá?', time: '14:45 PM' }
            // Nota: El indicador '...' no se guarda en los datos, se añade dinámicamente.
        ]
    },
    // Chat 2: Hotel Plaza
    '2': {
        name: 'Hotel Plaza',
        avatar: '🏨',
        messages: [
            { type: 'received', text: 'Hotel Plaza', time: '13:10 PM', isHeader: true },
            { type: 'received', text: 'Hola, Hotel Plaza al habla. ¿Qué tipo de telas tienes disponibles?', time: '13:10 PM' }
        ]
    },
    // Chat 3: Restaurantes Mystic
    '3': {
        name: 'Restaurantes Mystic',
        avatar: 'R',
        messages: [
            { type: 'received', text: 'Restaurantes Mystic', time: '11:56 AM', isHeader: true },
            { type: 'received', text: 'Buenas tardes. Quisiera saber si tienen tela para muebles ignífuga.', time: '11:56 AM' },
            { type: 'sent', text: 'Claro, tenemos varias opciones que cumplen esa normativa. ¿Le gustaría ver el catálogo?', time: '11:58 AM' }
        ]
    },
    // Añadir el resto de chats simulados
    '4': { name: 'Wilmar Clavijo', avatar: 'W', messages: [{ type: 'received', text: 'Wilmar Clavijo', time: '10:15 AM', isHeader: true }, { type: 'sent', text: 'Recibido. Muchas gracias por mostrar el estado de mi pedido.', time: '10:15 AM' }] },
    '5': { name: 'Thomas Velasquez', avatar: 'T', messages: [{ type: 'received', text: 'Thomas Velasquez', time: '9:20 AM', isHeader: true }, { type: 'sent', text: 'Allí podrás observar el catálogo completo de colores.', time: '9:20 AM' }] },
    '6': { name: 'Valery Rivera', avatar: 'V', messages: [{ type: 'received', text: 'Valery Rivera', time: '9:09 AM', isHeader: true }, { type: 'sent', text: 'Claro, tenemos diferentes telas disponibles. ¿Buscas algo en específico?', time: '9:09 AM' }] },
    '7': { name: 'Camilo Perez', avatar: 'C', messages: [{ type: 'received', text: 'Camilo Perez', time: '8:40 AM', isHeader: true }, { type: 'sent', text: 'Si señor, su pedido ya está en manos del equipo de logística.', time: '8:40 AM' }] },
};


document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener elementos del DOM
    const chatItems = document.querySelectorAll('.chat-list .chat-item');
    const chatContent = document.querySelector('.chat-content');
    const chatNameDisplay = document.querySelector('.chat-name-display');
    const chatAvatarDisplay = document.querySelector('.chat-header-display .chat-avatar');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.querySelector('.send-button');

    // Inicializar los IDs en los items del chat (necesario para el JS)
    chatItems.forEach((item, index) => {
        // Asigna un ID basado en su posición para que coincida con chatData
        item.setAttribute('data-chat-id', (index + 1).toString()); 
    });

    // Función para crear una burbuja de mensaje
    const createMessageBubble = (msg) => {
        const newMessage = document.createElement('div');
        newMessage.classList.add('chat-message-bubble', msg.type);
        
        // El primer mensaje recibido tiene el nombre como encabezado
        const header = msg.type === 'received' && msg.isHeader ? `<p>${msg.text}</p>` : '';
        const body = msg.type === 'received' && msg.isHeader ? '' : `<p>${msg.text}</p>`;

        newMessage.innerHTML = `
            ${header}
            ${body}
            <span class="chat-time">${msg.time}</span>
        `;
        return newMessage;
    };
    
    // Función para renderizar el contenido del chat
    const loadChat = (chatId) => {
        const data = chatData[chatId];
        if (!data) return;

        chatNameDisplay.textContent = data.name;
        chatAvatarDisplay.textContent = data.avatar;

        // Limpiar contenido
        chatContent.innerHTML = '<div class="date-separator">HOY</div>';

        // Renderizar mensajes
        data.messages.forEach(msg => {
            if (!msg.isHeader) { // Ignoramos el mensaje 'header' que ya se usa
                chatContent.appendChild(createMessageBubble(msg));
            }
        });
        
        // Añadir el indicador '...' si estamos en el chat de Mariana (simulación)
        if (chatId === '1') {
            const typingIndicator = document.createElement('div');
            typingIndicator.classList.add('typing-indicator');
            typingIndicator.textContent = '...';
            chatContent.appendChild(typingIndicator);
        }

        // Desplazar al final
        chatContent.scrollTop = chatContent.scrollHeight;
    };

    // Función para manejar el envío de mensajes
    const sendMessage = () => {
        const messageText = messageInput.value.trim();
        const activeItem = document.querySelector('.chat-list .chat-item.active-list-item');
        
        if (messageText === "" || !activeItem) {
            messageInput.value = '';
            return;
        }

        const time = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        
        // Crear la burbuja de mensaje enviado
        const newMessageData = { type: 'sent', text: messageText, time: time };
        const newMessageBubble = createMessageBubble(newMessageData);
        newMessageBubble.classList.remove('received'); // Asegura que no tenga la clase 'received'
        newMessageBubble.classList.add('sent'); // Añadir clase 'sent' (aunque no esté estilizada en chat.css, es buena práctica)

        // Remover el indicador '...' si existe antes de añadir el nuevo mensaje
        const indicator = chatContent.querySelector('.typing-indicator');
        if (indicator) indicator.remove();
        
        // Añadir al contenedor de mensajes
        chatContent.appendChild(newMessageBubble);
        
        // Actualizar datos del chat (simulación de guardado)
        const chatId = activeItem.getAttribute('data-chat-id');
        chatData[chatId].messages.push(newMessageData);

        // Limpiar input y desplazar al final
        messageInput.value = '';
        chatContent.scrollTop = chatContent.scrollHeight;

        // Opcional: Simular respuesta de "KanView"
        setTimeout(() => {
            const botText = "Su mensaje ha sido recibido por KanView. Pronto le responderemos.";
            const botTime = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
            
            // Crear una nueva burbuja como si fuera un mensaje del bot/sistema
            const botResponseData = { type: 'received', text: botText, time: botTime };
            const botResponse = createMessageBubble(botResponseData);
            
            chatContent.appendChild(botResponse);
            chatData[chatId].messages.push(botResponseData);

            chatContent.scrollTop = chatContent.scrollHeight;
        }, 1500);
    };

    // 2. Event Listeners para el Cambio de Chat
    chatItems.forEach(item => {
        item.addEventListener('click', () => {
            const chatId = item.getAttribute('data-chat-id');
            
            // Remover 'active-list-item' de todos y añadirlo al seleccionado
            chatItems.forEach(i => i.classList.remove('active-list-item'));
            item.classList.add('active-list-item');
            
            loadChat(chatId);
        });
    });
    
    // 3. Event Listeners para el Envío de Mensajes
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // 4. Cargar el chat por defecto al iniciar (el primero de la lista)
    if (chatItems.length > 0) {
        // Asegurarse de que el primer item esté activo visualmente
        chatItems[0].classList.add('active-list-item'); 
        loadChat(chatItems[0].getAttribute('data-chat-id'));
    }
});