const API_URL = "/atividades";
const formAtividade = document.getElementById("formAtividade");
const inputId = document.getElementById("id");
const inputTitulo = document.getElementById("titulo");
const inputDescricao = document.getElementById("descricao");
const inputData = document.getElementById("data");
const inputHorario = document.getElementById("horario");
const inputPrioridade = document.getElementById("prioridade");
const inputStatus = document.getElementById("status");
const listaAtividades = document.getElementById("listaAtividades");

// read 
async function carregarAtividades() {
    const resposta = await fetch(API_URL);
    const atividades = await resposta.json();

    listaAtividades.innerHTML = "";
    atividades.forEach((atividade) => {
        const card = document.createElement("div");
        card.className = "info"
        card.innerHTML = `
<h3>${atividade.titulo}</h3>
<p>${atividade.descricao}</p>
<p><strong><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
            <path
                d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-188.5-11.5Q280-423 280-440t11.5-28.5Q303-480 320-480t28.5 11.5Q360-457 360-440t-11.5 28.5Q337-400 320-400t-28.5-11.5ZM640-400q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-188.5-11.5Q280-263 280-280t11.5-28.5Q303-320 320-320t28.5 11.5Q360-297 360-280t-11.5 28.5Q337-240 320-240t-28.5-11.5ZM640-240q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" />
        </svg></strong> ${atividade.data}</p>
<p><strong><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
            <path
                d="M582-298 440-440v-200h80v167l118 118-56 57ZM440-720v-80h80v80h-80Zm280 280v-80h80v80h-80ZM440-160v-80h80v80h-80ZM160-440v-80h80v80h-80ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
        </svg></strong> ${atividade.horario}</p>
<p><strong><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
            <path
                d="M200-120v-680h360l16 80h224v400H520l-16-80H280v280h-80Zm300-440Zm86 160h134v-240H510l-16-80H280v240h290l16 80Z" />
        </svg></strong> ${atividade.prioridade}</p>
<p><strong><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
            <path
                d="M281.5-281.5Q200-363 200-480t81.5-198.5Q363-760 480-760t198.5 81.5Q760-597 760-480t-81.5 198.5Q597-200 480-200t-198.5-81.5Z" />
        </svg></strong> ${atividade.status}</p>
<button onclick="editarAtividade(${atividade.id})"><svg xmlns="http://www.w3.org/2000/svg" height="24px"
        viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
        <path
            d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
    </svg>Editar</button>
<button onclick="excluirAtividade(${atividade.id})"><svg xmlns="http://www.w3.org/2000/svg" height="24px"
        viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
        <path
            d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
    </svg>Excluir</button>`;
        listaAtividades.appendChild(card);
    });
}

// create e update 
formAtividade.addEventListener("submit", async (event) => {
    event.preventDefault();
    const atividade = {
        titulo: inputTitulo.value,
        descricao: inputDescricao.value,
        data: inputData.value,
        horario: inputHorario.value,
        prioridade: inputPrioridade.value,
        status: inputStatus.value
    };
    if (inputId.value) {
        await fetch(`${API_URL}/${inputId.value}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(atividade)
        });
    } else {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },

            body: JSON.stringify(atividade)
        });
    }
    limparFormulario();
    carregarAtividades();
});

// editar 
async function editarAtividade(id) {
    const resposta = await fetch(API_URL);
    const atividades = await resposta.json();
    const atividade = atividades.find((item) => item.id === id);
    inputId.value = atividade.id;
    inputTitulo.value = atividade.titulo;
    inputDescricao.value = atividade.descricao;
    inputData.value = atividade.data;
    inputHorario.value = atividade.horario;
    inputPrioridade.value = atividade.prioridade;
    inputStatus.value = atividade.status;
}

// delete 
async function excluirAtividade(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
    carregarAtividades();
}

// limpar 
function limparFormulario() {
    inputId.value = "";
    inputTitulo.value = "";
    inputDescricao.value = "";
    inputData.value = "";
    inputHorario.value = "";
    inputPrioridade.value = "";
    inputStatus.value = "";
}
document.getElementById("btnLimpar").addEventListener("click", limparFormulario);
carregarAtividades();

