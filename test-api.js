// Teste rápido da API
const fetch = require('node-fetch');

async function testAPI() {
    try {
        const response = await fetch('http://localhost:4001/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    { role: 'user', content: 'Olá, você está funcionando?' }
                ],
                temperature: 0.7,
                max_tokens: 100
            })
        });

        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Resposta:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Erro:', error.message);
    }
}

testAPI();
