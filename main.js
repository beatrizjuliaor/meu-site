// Função para carregar tarefas ao abrir a página
window.onload = () => {
    carregarTarefas();
};

// Função para adicionar uma tarefa
function adicionarTarefa(dia) {
    const input = document.getElementById(`input-${dia}`);
    const tarefaTexto = input.value.trim();

    if (tarefaTexto !== "") {
        const tarefas = JSON.parse(localStorage.getItem('tarefasSemana')) || {};

        // Adicionar nova tarefa no dia correspondente
        if (!tarefas[dia]) {
            tarefas[dia] = [];
        }
        tarefas[dia].push({ texto: tarefaTexto, concluida: false });

        localStorage.setItem('tarefasSemana', JSON.stringify(tarefas));
        input.value = "";  // Limpar o campo de input

        carregarTarefas();
    }
}

// Função para carregar as tarefas do localStorage e exibir
function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem('tarefasSemana')) || {};

    ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'].forEach(dia => {
        const tarefasDia = tarefas[dia] || [];
        const container = document.getElementById(`${dia}-tarefas`);
        container.innerHTML = ""; // Limpar conteúdo existente

        tarefasDia.forEach((tarefa, index) => {
            const li = document.createElement('li');
            if (tarefa.concluida) {
                li.classList.add('completed');
            }

            li.innerHTML = `
                <span>${tarefa.texto}</span>
                <div>
                    <input type="checkbox" ${tarefa.concluida ? 'checked' : ''} onclick="toggleConcluida('${dia}', ${index})">
                    <button onclick="removerTarefa('${dia}', ${index})">Remover</button>
                </div>
            `;
            container.appendChild(li);
        });
    });
}

// Função para marcar uma tarefa como concluída ou não
function toggleConcluida(dia, index) {
    const tarefas = JSON.parse(localStorage.getItem('tarefasSemana')) || {};
    tarefas[dia][index].concluida = !tarefas[dia][index].concluida;
    localStorage.setItem('tarefasSemana', JSON.stringify(tarefas));
    carregarTarefas();
}

// Função para remover uma tarefa
function removerTarefa(dia, index) {
    const tarefas = JSON.parse(localStorage.getItem('tarefasSemana')) || {};
    tarefas[dia].splice(index, 1);
    localStorage.setItem('tarefasSemana', JSON.stringify(tarefas));
    carregarTarefas();
}
