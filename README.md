# Presente Cailane

Um aplicativo web interativo e romântico para celebrar momentos especiais de Gustavo e Cailane. Inclui animações, contadores, galeria de fotos, árvore de memórias, detector de amor e linha do tempo.

## Tecnologias Utilizadas

| Categoria           | Ferramenta/Biblioteca               |
|---------------------|-------------------------------------|
| Framework Front-end | React.js                            |
| Estilização         | Tailwind CSS                        |
| Animações Canvas    | API Canvas                          |
| Visualização SVG    | SVG nativo + D3.js                  |
| Controle de Estado  | React Hooks (useState, useEffect)   |
| Roteiro de Build    | Create React App                    |
| Gerenciador de Pacotes | npm                             |

## Componentes Principais

1. **RosaPerfeita**  
   - SVG interativo com gradientes e filtros  
   - Tilt no movimento do mouse  
   - Efeito de escala ao clicar  
   - Toca música romântica em loop (via `<audio>` em `public/audio`)  

2. **TulipasLaterais, PetalasCaindo, BorboletasAnimadas**  
   - Animações de flores, pétalas e borboletas em canvas/SVG  

3. **ContadorTempo**  
   - Conta dias, horas, minutos e segundos desde data de início  

4. **ContadorCasamento**  
   - Contagem regressiva até data de casamento  
   - Fundo animado de partículas brilhantes (canvas)  

5. **GaleriaFotos**  
   - Grid responsivo de 52 fotos em `public/fotos`  
   - Moldura estilo Polaroid com rotação aleatória  
   - Lightbox para visualização ampliada  

6. **LinhaDoTempo**  
   - Timeline horizontal com scroll-snap  
   - Fundo animado de estrelas em canvas  
   - Destaque do item central  

7. **PortalDesejos**  
   - Fundo espacial em canvas com estrelas e asteroides  
   - Envio de desejos que viram estrelas cadentes  

8. **ArvoreMemoria**  
   - Árvore radial gerada com D3.js  
   - Frutos emoji representando memórias  
   - Fundo de fogos de artifício (canvas)  

9. **CartasSecretas**  
   - Cartas flip 3D com mensagens de amor  
   - Fundo de partículas cintilantes (canvas)  

10. **DetectorAmor**  
    - Cursor customizado em ping  
    - Detecção de "tesouros" ao mover cursor  
    - Fundo animado de corações flutuantes (canvas)  

## Estrutura de Pastas

```
client/
├── public/
│   ├── audio/
│   │   └── musica-romantica.mp3
│   └── fotos/              # 52 imagens: foto1.jpg … foto52.jpg
├── src/
│   ├── audio/              # Áudio de pétalas, trilha adicional
│   ├── assets/             # Imagens e ícones estáticos
│   ├── components/
│   │   ├── ArvoreMemoria.jsx
│   │   ├── BorboletasAnimadas.jsx
│   │   ├── CartasSecretas.jsx
│   │   ├── ContadorCasamento.jsx
│   │   ├── ContadorTempo.jsx
│   │   ├── DetectorAmor.jsx
│   │   ├── GaleriaFotos.jsx
│   │   ├── LinhaDoTempo.jsx
│   │   ├── ModoNoturno.jsx
│   │   ├── ParticularsBrilho.jsx
│   │   ├── PetalasCaindo.jsx
│   │   ├── PortalDesejos.jsx
│   │   ├── RosaPerfeita.jsx
│   │   └── TulipasLaterais.jsx
│   ├── App.js
│   └── index.css
├── package.json
└── README.md
```

## Instalação e Execução

na raiz do projeto
cd client
npm install
npm start

Acesse em `http://localhost:3000`.

## Funcionalidades

- **Modo Noturno**: Alterna tema claro/escuro.  
- **Interatividade**: Tilt, cliques, hover, scroll snaps.  
- **Animações**: Canvas e SVG personalizados.  
- **Personalização**: Mensagens, fotos e datas facilmente editáveis.  

## Tabelas de Configuração

| Componente              | Props Principais                                     |
|-------------------------|------------------------------------------------------|
| RosaPerfeita            | `open: bool`, `onClick: func`, `modoNoturno: bool`   |
| ContadorTempo           | `dataInicio: Date`                                   |
| ContadorCasamento       | `dataCasamento: Date`                                |
| GaleriaFotos            | —                                                    |
| LinhaDoTempo            | `eventos: [{date, title}]`                          |
| PortalDesejos           | —                                                    |
| ArvoreMemoria           | —                                                    |
| CartasSecretas          | —                                                    |
| DetectorAmor            | —                                                    |

## Créditos e Licenças

- Desenvolvido por **Gustavo Mimoso** como presente para **Cailane**.  
- MIT License.


