document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const messageInput = document.getElementById('message');
    const shiftInput = document.getElementById('shift');
    const encodeBtn = document.querySelector('.encode-btn');
    const decodeBtn = document.querySelector('.decode-btn');
    const clearBtn = document.querySelector('.clear-btn');
    const resultDiv = document.getElementById('result');
    const historyDiv = document.getElementById('history');

    // Carregar histórico do localStorage
    loadHistory();

    // Event Listeners
    encodeBtn.addEventListener('click', () => processMessage('encode'));
    decodeBtn.addEventListener('click', () => processMessage('decode'));
    clearBtn.addEventListener('click', clearAll);

    // Suporte para tecla Enter no campo de deslocamento
    shiftInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            processMessage('encode');
        }
    });

    // Função para exibir mensagens de erro
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        errorDiv.style.position = 'fixed';
        errorDiv.style.top = '20px';
        errorDiv.style.right = '20px';
        errorDiv.style.background = 'rgba(255, 77, 77, 0.9)';
        errorDiv.style.color = '#fff';
        errorDiv.style.padding = '1rem';
        errorDiv.style.borderRadius = '10px';
        errorDiv.style.zIndex = '2000';
        errorDiv.style.opacity = '0';
        errorDiv.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            errorDiv.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
            errorDiv.style.opacity = '0';
            setTimeout(() => errorDiv.remove(), 300);
        }, 3000);
    }

    // Função para processar a mensagem (codificar/decodificar)
    function processMessage(action) {
        const message = messageInput.value.trim();
        const shift = parseInt(shiftInput.value);

        if (!message) {
            showError('Por favor, digite uma mensagem.');
            return;
        }

        if (isNaN(shift) || shift < 1 || shift > 25) {
            showError('O deslocamento deve ser um número entre 1 e 25.');
            return;
        }

        let result;
        if (action === 'encode') {
            result = caesarCipher(message, shift);
        } else {
            result = caesarCipher(message, -shift);
        }

        resultDiv.textContent = result;
        resultDiv.style.animation = 'fadeIn 0.5s ease-out';
        saveToHistory(message, result, action, shift);
    }

    // Implementação da Cifra de César
    function caesarCipher(str, shift) {
        return str.split('').map(char => {
            if (char.match(/[a-z]/i)) {
                const code = char.charCodeAt(0);
                let shiftAmount = shift % 26;
                
                // Maiúsculas (A-Z)
                if (code >= 65 && code <= 90) {
                    return String.fromCharCode(((code - 65 + shiftAmount + 26) % 26) + 65);
                }
                // Minúsculas (a-z)
                else if (code >= 97 && code <= 122) {
                    return String.fromCharCode(((code - 97 + shiftAmount + 26) % 26) + 97);
                }
            }
            return char; // Mantém caracteres não alfabéticos
        }).join('');
    }

    // Salvar no histórico e localStorage
    function saveToHistory(original, result, action, shift) {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.style.opacity = '0';
        historyItem.style.transform = 'translateY(20px)';
        historyItem.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        const actionText = action === 'encode' ? 'Codificado' : 'Decodificado';
        const time = new Date().toLocaleTimeString('pt-BR', { hour12: false });

        historyItem.innerHTML = `
            <strong>${actionText} (chave: ${shift})</strong><br>
            <span class="original">${original}</span> → 
            <span class="result">${result}</span><br>
            <small>${time}</small>
        `;

        historyDiv.prepend(historyItem);

        // Animação de entrada
        setTimeout(() => {
            historyItem.style.opacity = '1';
            historyItem.style.transform = 'translateY(0)';
        }, 10);

        // Salvar no localStorage
        const history = JSON.parse(localStorage.getItem('enigmaHistory') || '[]');
        history.unshift({
            original,
            result,
            action,
            shift,
            time: new Date().toISOString()
        });

        // Limitar a 10 itens
        if (history.length > 10) {
            history.pop();
        }

        localStorage.setItem('enigmaHistory', JSON.stringify(history));
    }

    // Carregar histórico do localStorage
    function loadHistory() {
        const history = JSON.parse(localStorage.getItem('enigmaHistory') || '[]');
        history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            const actionText = item.action === 'encode' ? 'Codificado' : 'Decodificado';
            const time = new Date(item.time).toLocaleTimeString('pt-BR', { hour12: false });

            historyItem.innerHTML = `
                <strong>${actionText} (chave: ${item.shift})</strong><br>
                <span class="original">${item.original}</span> → 
                <span class="result">${item.result}</span><br>
                <small>${time}</small>
            `;

            historyDiv.appendChild(historyItem);
        });
    }

    // Limpar tudo
    function clearAll() {
        const confirmClear = confirm('Deseja limpar a mensagem, resultado e histórico?');
        if (confirmClear) {
            messageInput.value = '';
            shiftInput.value = '1';
            resultDiv.textContent = '';
            historyDiv.innerHTML = '';
            localStorage.removeItem('enigmaHistory');
            messageInput.focus();
        }
    }
});