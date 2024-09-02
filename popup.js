document.getElementById('extractButton').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "buscarElemento", elementoId: "tr_cotacao_carro" }, function (response) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
            } else {
                console.log("Mensagem enviada com sucesso");
            }

            console.log("Resposta recebida:", response);
            if (response && response.elementoHTML) {
                document.getElementById('result').innerHTML = response.elementoHTML;

                // Cria??o do cabe?alho
                var headerDiv = `
                <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; background-color: black; padding: 10px;">
                    <div style="flex: 1; text-align: left;">
                        <img src="https://github.com/caioteodoro/mobilityFormatter/blob/main/centurionLogo.jpg?raw=true" alt="Centurion" style="max-width: 50%; height: auto;">
                    </div>
                    <div style="flex: 1; text-align: right;">
                        <img src="https://github.com/caioteodoro/mobilityFormatter/blob/main/centurionCartao.jpg?raw=true" alt="Cartão Centurion" style="max-width: 50%; height: auto;">
                    </div>
                </div>
                `;

                var footerDiv = `
                    <div style="width: 80%; background-color: black; color: white; padding: 10px 20px 10px 20px; box-sizing: border-box; font-family: Calibri, Arial, sans-serif; font-size: 9pt;">
                        <div style="display: flex; justify-content: space-between;">
                            <div style="flex: 1; text-align: left;">
                                <img src="https://github.com/caioteodoro/mobilityFormatter/blob/main/footerImage.png?raw=true" alt="Imagem Footer" style="max-width: 100%; height: auto;">
                            </div>
                            <div style="flex: 1; text-align: right;">
                                <p>Em caso de dúvidas, contate seu Lifestyle Manager: +55 (11) 4862 1500.</p>
                            </div>
                        </div>
                        <div style="margin-top: 10px; text-align: justify;">
                            <p>Atendimento personalizado 24h: +55 (34) 3253 4451. Acesso do exterior: +55 (34) 2102 6266. Solicite uma ligação a cobrar para a operadora local. SAC Deficiência Auditiva ou de Fala: 0800 722 0099. Atendimento 24 horas, 7 dias por semana. Reclamações, cancelamentos e informações gerais. Se não ficar satisfeito com a solução apresentada contate a Ouvidora: 0800 727 9933. Atendimento das 9h às 18h, de 2ª a 6ª, exceto feriados.
                            </p>
                        </div>
                    </div>
                `;

                const conditionsDiv = `
                    <div style="margin: 20px 0; font-family: Calibri, Arial, sans-serif; font-size: 11pt; padding: 0px 20px 0px 20px;">
                        <p><b>Pagamento:</b> em reais à vista ou em até 10x sem juros (com parcelas mínimas de R$ 200,00) com seu The Centurion Card.</p>
                        <p><b>Políticas e restrições:</b> não reembolsável.</p>
                    </div>
                `;

                var formatTableScript = "<script>var elementos = document.querySelectorAll('*'); elementos.forEach(function(elemento) { elemento.style.width = 'auto'; }); const elementoAncora = document.getElementById('ancoraAtualizarCotacao'); if (elementoAncora) { elementoAncora.parentNode.removeChild(elementoAncora); } const linhasTabela = document.querySelectorAll('table tr'); linhasTabela.forEach((linha) => { const celulas = linha.querySelectorAll('td, th'); if (celulas.length > 8) { const ultimaCelula = celulas[celulas.length - 1]; linha.removeChild(ultimaCelula); } });</script>";
                const conteudo = `
                    <!DOCTYPE html>
                    <html lang="pt-BR">
                    <head>
                        <meta charset="UTF-8">
                    </head>
                    <body>` 
                    + headerDiv + response.elementoHTML + conditionsDiv + footerDiv + formatTableScript + `
                    </body>
                    </html>
                `;
                const nomeArquivo = 'Locacao de Veiculo.html';

                const encoder = new TextEncoder();
                const conteudoCodificado = encoder.encode(conteudo);
                const blob = new Blob([conteudoCodificado], { type: 'text/html;charset=utf-8' });

                const url = window.URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = url;
                a.download = nomeArquivo;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);

            }
        });
    });
});
