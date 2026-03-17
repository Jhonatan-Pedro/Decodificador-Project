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
        errorDiv.style.position = 'fixed';
        errorDiv.style.top = '100px';
        errorDiv.style.right = '20px';
        errorDiv.style.background = 'rgba(139, 38, 53, 0.95)';
        errorDiv.style.color = '#fff';
        errorDiv.style.padding = '1rem 1.5rem';
        errorDiv.style.borderRadius = '8px';
        errorDiv.style.zIndex = '2000';
        errorDiv.style.opacity = '0';
        errorDiv.style.transform = 'translateX(100px)';
        errorDiv.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        errorDiv.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        errorDiv.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        errorDiv.style.maxWidth = '300px';
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.style.opacity = '1';
            errorDiv.style.transform = 'translateX(0)';
        }, 10);
        
        setTimeout(() => {
            errorDiv.style.opacity = '0';
            errorDiv.style.transform = 'translateX(100px)';
            setTimeout(() => errorDiv.remove(), 400);
        }, 3500);
    }

    // Função para exibir mensagem de sucesso
    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.position = 'fixed';
        successDiv.style.top = '100px';
        successDiv.style.right = '20px';
        successDiv.style.background = 'rgba(45, 90, 61, 0.95)';
        successDiv.style.color = '#fff';
        successDiv.style.padding = '1rem 1.5rem';
        successDiv.style.borderRadius = '8px';
        successDiv.style.zIndex = '2000';
        successDiv.style.opacity = '0';
        successDiv.style.transform = 'translateX(100px)';
        successDiv.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        successDiv.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        successDiv.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.style.opacity = '1';
            successDiv.style.transform = 'translateX(0)';
        }, 10);
        
        setTimeout(() => {
            successDiv.style.opacity = '0';
            successDiv.style.transform = 'translateX(100px)';
            setTimeout(() => successDiv.remove(), 400);
        }, 2500);
    }

    // Função para processar a mensagem (codificar/decodificar)
    function processMessage(action) {
        const message = messageInput.value.trim();
        const shift = parseInt(shiftInput.value);

        if (!message) {
            showError('Por favor, digite uma mensagem.');
            messageInput.focus();
            return;
        }

        if (isNaN(shift) || shift < 1 || shift > 25) {
            showError('O deslocamento deve ser um número entre 1 e 25.');
            shiftInput.focus();
            return;
        }

        let result;
        if (action === 'encode') {
            result = caesarCipher(message, shift);
            showSuccess('Mensagem codificada com sucesso!');
        } else {
            result = caesarCipher(message, -shift);
            showSuccess('Mensagem decodificada com sucesso!');
        }

        // Animação do resultado
        resultDiv.style.opacity = '0';
        resultDiv.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            resultDiv.textContent = result;
            resultDiv.style.transition = 'all 0.4s ease-out';
            resultDiv.style.opacity = '1';
            resultDiv.style.transform = 'translateY(0)';
            resultDiv.classList.add('result-highlight');
            
            setTimeout(() => {
                resultDiv.classList.remove('result-highlight');
            }, 2000);
        }, 100);

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
        historyItem.style.transform = 'translateX(-20px)';

        const actionText = action === 'encode' ? 'Codificado' : 'Decodificado';
        const actionColor = action === 'encode' ? '#2d5a3d' : '#3d5a80';
        const time = new Date().toLocaleTimeString('pt-BR', { hour12: false });

        historyItem.innerHTML = `
            <strong style="color: ${actionColor};">${actionText} (chave: ${shift})</strong><br>
            <span class="original">${escapeHtml(original)}</span> → 
            <span class="result">${escapeHtml(result)}</span><br>
            <small>${time}</small>
        `;

        historyDiv.prepend(historyItem);

        // Animação de entrada
        requestAnimationFrame(() => {
            historyItem.style.transition = 'all 0.4s ease-out';
            historyItem.style.opacity = '1';
            historyItem.style.transform = 'translateX(0)';
        });

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
            const actionColor = item.action === 'encode' ? '#2d5a3d' : '#3d5a80';
            const time = new Date(item.time).toLocaleTimeString('pt-BR', { hour12: false });

            historyItem.innerHTML = `
                <strong style="color: ${actionColor};">${actionText} (chave: ${item.shift})</strong><br>
                <span class="original">${escapeHtml(item.original)}</span> → 
                <span class="result">${escapeHtml(item.result)}</span><br>
                <small>${time}</small>
            `;

            historyDiv.appendChild(historyItem);
        });
    }

    // Limpar tudo
    function clearAll() {
        const confirmClear = confirm('Deseja limpar a mensagem, resultado e histórico?');
        if (confirmClear) {
            // Animação de saída
            resultDiv.style.transition = 'all 0.3s ease';
            resultDiv.style.opacity = '0';
            
            setTimeout(() => {
                messageInput.value = '';
                shiftInput.value = '3';
                resultDiv.textContent = '';
                resultDiv.style.opacity = '1';
                historyDiv.innerHTML = '';
                localStorage.removeItem('enigmaHistory');
                messageInput.focus();
                showSuccess('Tudo foi limpo com sucesso!');
            }, 300);
        }
    }

    // Função para escapar HTML (segurança)
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Focar no campo de mensagem ao carregar
    messageInput.focus();
});