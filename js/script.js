function trackOrder() {
    const orderId = document.getElementById('order-id').value;
    const resultDiv = document.getElementById('tracking-result');

    if (orderId.trim() === "") {
        resultDiv.innerHTML = "<p style='color: red;'>Por favor ingresa un código de pedido.</p>";
        return;
    }

    // Simulación de búsqueda
    resultDiv.innerHTML = `<p>Buscando pedido <strong>${orderId}</strong>...</p>`;
    
    setTimeout(() => {
        // Aquí iría la lógica real para conectar con el backend
        resultDiv.innerHTML = `
            <div style="margin-top: 20px; text-align: left; border: 1px solid #ddd; padding: 15px; border-radius: 5px;">
                <h3>Estado del Pedido: ${orderId}</h3>
                <p><strong>Estado:</strong> En proceso de tapizado</p>
                <p><strong>Fecha estimada:</strong> 30 de Noviembre</p>
                <div style="background: #eee; height: 10px; width: 100%; margin-top: 10px; border-radius: 5px;">
                    <div style="background: #e67e22; height: 100%; width: 60%; border-radius: 5px;"></div>
                </div>
                <p style="font-size: 0.8rem; margin-top: 5px;">Progreso: 60%</p>
            </div>
        `;
    }, 1000);
}
